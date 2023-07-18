import { FileUpload } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Divider, IconButton } from "@mui/material";
import { downloadSingleFile } from "features/loan/normal/configs/actions";
import { getBranchCodeUser } from "features/loan/normal/storage/legal/selectors";
import { setDataLOANNormalStorageLOANFile, setDescriptionLOANNormalStorageLOANFile } from "features/loan/normal/storage/loan/actions";
import * as _ from "lodash";
import { FC, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalChildfile } from "types/models/loan/normal/storage/LOAN";
import { PREFIX_LOCAL } from "utils";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_LOAN_ATTACH_FILE,
  TYPE_REMOVE_DOC_LOAN,
  useAttachContext
} from ".";
interface ChildFileProps {
  indexType: number;
  indexGroup: number;
  indexFile: number;
  data: ILOANNormalChildfile;
  parentDocId?: string;
  docId?: string;
  disabled?: boolean;
}

const Detail: FC<ChildFileProps> = ({
  indexFile,
  indexType,
  indexGroup,
  data,
  parentDocId = "",
  docId = "",
  disabled = false,
}) => {
  const user = useSelector(getBranchCodeUser);
  const inputChooseFileElement = useRef<HTMLInputElement>(null);
  const [isModalConfirmChildFile, setIsModalConfirmChildFile] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const AttachCICdata = useAttachContext();
  if (!AttachCICdata) return null;

  const onHandleDeleteChildFile = () => {
    setIsModalConfirmChildFile(!isModalConfirmChildFile);
  };
  const isEmpty = data?.uuid?.includes(PREFIX_LOCAL) && !data?.file_upload;
  const onHandleCancelConfirmChildFile = () =>
    setIsModalConfirmChildFile(!isModalConfirmChildFile);

  const onConfirmDeleteChildFile = () => {
    AttachCICdata.remove(
      `${TYPE_REMOVE_DOC_LOAN.FILE}${PREFIX_LOAN_ATTACH_FILE}${
        parentDocId ?? ""
      }${PREFIX_LOAN_ATTACH_FILE}${docId ?? ""}${PREFIX_LOAN_ATTACH_FILE}${
        data.uuid
      }`
    );
    setIsModalConfirmChildFile(!isModalConfirmChildFile);
  };

  const changeChooseFile = async (_event: any, uuidChildFile: string) => {
    const fileList = await _event.target.files;

    if (fileList && fileList?.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const date = Number(new Date());
        await encodeBase64File(fileList[i] as File).then((dataBase64) => {
          const result: ILOANNormalChildfile = {
            ...data,
            name: fileList[i]?.name.toString() ?? "",
            type: fileList[i]?.type,
            created_at: date,
            created_by: _.get(user, "full_name", ""),
            file_upload: String(dataBase64 as string),
          };
          dispatch(
            setDataLOANNormalStorageLOANFile(result, {
              parentDoc_uuid: parentDocId ?? "",
              doc_uuid: docId ?? "",
              file_uuid: data.uuid ?? "",
            })
          );
        });
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

  const handleOnChangeDescription = (value: string) => {
    if (!value) return;
    // const result: ILOANNormalChildfile = {
    //   ...data,
    //   description: value,
    // };
    dispatch(
      setDescriptionLOANNormalStorageLOANFile(value, {
        parentDoc_uuid: parentDocId ?? "",
        doc_uuid: docId ?? "",
        file_uuid: data.uuid ?? "",
      })
    );
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
            {isEmpty ? (
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
                    onChange={(event) =>
                      changeChooseFile(event, data.uuid ?? "")
                    }
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
                    if (!data?.uuid) return;
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
          {!disabled ? (
            <>
              <Input
                placeholder="Nhập nội dung"
                sx={{ width: "60%" }}
                value={data?.description ?? ""}
                onDebounce={(value) => handleOnChangeDescription(value)}
              />
            </>
          ) : (
            <>
              <span
                style={{
                  marginLeft: "5px",
                  color: "#1825aa",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {data.description}
              </span>
            </>
          )}
        </Box>
        <Box sx={{ width: "25%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isEmpty ? (
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
                  {data.updated_by_name}
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
              <IconButton>
                <BsPencil style={{ fontSize: "1.3rem" }} color="#1825aa" />
              </IconButton>
              <IconButton onClick={() => onHandleDeleteChildFile()}>
                <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa" />
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
