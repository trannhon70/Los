import { FileUpload } from "@mui/icons-material";
import { generateLOCALUUID, generateUUID, PREFIX_LOCAL, renderAccept } from "utils";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Divider, IconButton } from "@mui/material";
import { downloadSingleFile } from "features/loan/normal/configs/actions";
import {
  setAddttacmentFileCIC,
  setFileDescription,
} from "features/loan/normal/storage/cic/actions";
import { getBranchCodeUser } from "features/loan/normal/storage/legal/selectors";
import _ from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalStorageCICDocumentChildFile } from "types/models/loan/normal/storage/CIC";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_CIC_ATTACH_FILE,
  TYPE_REMOVE_DOC_CIC,
  TYPE_UPDATE_DOC_CIC,
  useAttachCICContext,
} from ".";
import useNotify from "app/hooks/useNotify";
import useMasterData from 'app/hooks/useMasterData';

interface ChildFileProps {
  indexType: number;
  indexGroup: number;
  indexFile: number;
  data: ILOANNormalStorageCICDocumentChildFile;
  parentDocId?: string;
  docId?: string;
  disabled?: boolean;
  typeDoc?: string;
  credit?: string;
}

const Detail: FC<ChildFileProps> = ({
  indexFile,
  indexType,
  indexGroup,
  data,
  parentDocId = "",
  docId = "",
  disabled = false,
  typeDoc = "",
  credit="",
}) => {
  const inputChooseFileElement = useRef<HTMLInputElement>(null);
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const user = useSelector(getBranchCodeUser);
  const [isModalConfirmChildFile, setIsModalConfirmChildFile] =
    useState<boolean>(false);
  const [enabledEditDesc, setEnabledEditDesc] = useState<boolean>(false);
  const enabledEditModel = !data?.uuid?.includes(PREFIX_LOCAL);
  useEffect(() => {
    if (!data?.uuid) return;
    if (data.uuid.includes(PREFIX_LOCAL)) {
      setEnabledEditDesc(true);
    }
  }, [data.uuid]);
  const dispatch = useDispatch();
  const AttachCICdata = useAttachCICContext();
  if (!AttachCICdata) return null;

  const onHandleDeleteChildFile = () => {
    setIsModalConfirmChildFile(!isModalConfirmChildFile);
  };
  const isLocal = data?.file_upload?.length === 0 && data?.isLocal;
  const onHandleCancelConfirmChildFile = () =>
    setIsModalConfirmChildFile(!isModalConfirmChildFile);

  const onConfirmDeleteChildFile = () => {
    AttachCICdata.remove(
      `${TYPE_REMOVE_DOC_CIC.FILE}${PREFIX_CIC_ATTACH_FILE}${
        parentDocId ?? ""
      }${PREFIX_CIC_ATTACH_FILE}${docId ?? ""}${PREFIX_CIC_ATTACH_FILE}${
        data.uuid
      }`
    );
    setIsModalConfirmChildFile(!isModalConfirmChildFile);
  };

  const changeChooseFile = async (_event: any, uuidChildFile: string) => {
    const fileList = await _event.target.files;

    if (fileList && fileList?.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let dataFile: ILOANNormalStorageCICDocumentChildFile[] = [];
        const date = Number(new Date())/1000;
        const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
        if((fileList[i].size) > size){
          notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')
        }else{
          await encodeBase64File(fileList[i] as File).then((data) => {
            dataFile.push({
              file_id: i,
              uuid: uuidChildFile,
              name: fileList[i]?.name.toString() ?? "",
              display_order: i,
              description: "",
              content_type: fileList[i]?.type,
              created_by: "",
              created_by_name: "",
              updated_by: "",
              updated_by_name: "",
              created_at: date,
              updated_at: date,
              file_upload: String(data as string),
              size:fileList[i].size / 1024 as number
            });
          });
          
          AttachCICdata?.chooseFile(dataFile,`${parentDocId ?? ""}${PREFIX_CIC_ATTACH_FILE}${docId ?? ""}`)

          // dispatch(
          //   setAddttacmentFileCIC(dataFile, {
          //     parentDoc_uuid: parentDocId ?? "",
          //     doc_uuid: docId ?? "",
          //     file_uuid: data.uuid,
          //   })
          // );
        }
      }
    }
  };

  const encodeBase64File = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result?.toString());
      };
      reader.onerror = reject;
    });
  };

  const handleAddDescription = (value: string) => {
    AttachCICdata?.update(
      `${value}${PREFIX_CIC_ATTACH_FILE}${TYPE_UPDATE_DOC_CIC.DESCRIPTION}${
        PREFIX_CIC_ATTACH_FILE
      }${parentDocId ?? ""}${PREFIX_CIC_ATTACH_FILE}${docId ?? ""}${PREFIX_CIC_ATTACH_FILE}${data.uuid ?? ""}`)
      // dispatch(
      //   setFileDescription(value, { 
      //     parentDoc_uuid: parentDocId ?? "",
      //       doc_uuid: docId ?? "",
      //       file_uuid: data.uuid,
      //   })
      // );
  };

  return (
    <>
      <Box className="flex-center" sx={{ width: "100%" }}>
        <Box
          sx={{ width: "3%", fontSize: "14px", color: "#353535" }}
          className="flex justify-center"
        >
          {indexType + 1}.{indexFile + 1}
        </Box>
        <Box sx={{ width: "22%", marginRight: "3%", wordBreak: "break-all" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "25px",
            }}
          >
            {isLocal ? (
              <>
                <FileUpload className="mr-1" />
                <label className="flex items-center">
                  <span
                    style={{
                      textDecoration: "underline",
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    Tải lên tập tin
                  </span>
                  <input
                    ref={inputChooseFileElement}
                    type="file"
                    className="hidden"
                    onChange={(event) => changeChooseFile(event, data.uuid)}
                    accept={renderAccept(typeDoc)}
                  />
                </label>
              </>
            ) : (
              <>
                <ImageIcon />
                <span
                  style={{
                    marginLeft: "5px",
                    color: "#1825aa",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(downloadSingleFile([data?.uuid]));
                  }}
                >
                  {data.name}
                </span>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "40%",
            fontSize: "14px",
            color: "#353535",
            fontWeight: "500",
          }}
        >
          {enabledEditDesc ? (
            <>
              <Input
                placeholder="Nhập nội dung"
                sx={{ width: "60%" }}
                value={data.description ?? ""}
                onChange={(value) => handleAddDescription(value)}
              />
            </>
          ) : (
            <Box sx={{ textAlign: "left" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#353535",
                  fontWeight: "500",
                }}
              >
                {data.description ?? ""}
              </span>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "25%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLocal ? (
              <span
                style={{
                  fontSize: "14px",
                  color: "#353535",
                  fontWeight: "500",
                }}
              >
                {" "}
                -{" "}
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#353535",
                    fontWeight: "500",
                  }}
                >
                  {data?.updated_by_name ?? ""}
                </span>
                <span style={{ color: "#808080", fontSize: "12px" }}>
                  {timestampToDate(
                    data.updated_at ?? 0,
                    "HH:mm " + APP_DATE_FORMAT
                  )}
                </span>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "10%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          {!disabled ? (
            <>
              {enabledEditModel && (
                <IconButton
                  onClick={() => setEnabledEditDesc(!enabledEditDesc)}
                >
                  <BsPencil style={{ fontSize: "1.3rem" }} color="#1825aa" />
                </IconButton>
              )}
              <IconButton onClick={() => onHandleDeleteChildFile()}>
                <IoTrashOutline
                  style={{ fontSize: "1.5rem" }}
                  color="#1825aa"
                />
              </IconButton>
            </>
          ) : null}
        </Box>
      </Box>
      <Divider
        sx={{
          borderBottomWidth: "2px",
          margin: "10px 0px",
          width: "97%",
          float: "right",
          borderColor: "#c6c5d1",
        }}
      />
      <ModalConfirm
        open={isModalConfirmChildFile}
        onClose={onHandleCancelConfirmChildFile}
        onConfirm={onConfirmDeleteChildFile}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá file này
        </Box>
      </ModalConfirm>
    </>
  );
};
export default Detail;
