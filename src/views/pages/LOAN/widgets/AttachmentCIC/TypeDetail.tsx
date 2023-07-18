import { Box, Collapse, Divider, IconButton } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import { getCodeDocumentTypeChildListCICV2 } from "features/loan/normal/configs/document-type/selectors";
import { setDocumentType } from "features/loan/normal/storage/cic/actions";
import { FC, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalStorageCICDocumentListDetail } from "types/models/loan/normal/storage/CIC";
import { pathKeyStore } from "utils";
import Select from "views/components/base/Select";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_CIC_ATTACH_FILE,
  TYPE_DOC_CIC,
  TYPE_REMOVE_DOC_CIC,
  TYPE_UPDATE_DOC_CIC,
  useAttachCICContext
} from ".";
import Detail from "./Detail";
import * as _ from 'lodash';
interface TypeDetailProps {
  data: ILOANNormalStorageCICDocumentListDetail;
  indexType: number;
  indexGroup: number;
  groupId?: string;
  groupCode?: string;
  allData?: ILOANNormalStorageCICDocumentListDetail[];
  disabled?: boolean;
  opendocs?:string[];
  credit?:string;
}

const TypeDetail: FC<TypeDetailProps> = ({
  data,
  indexType,
  indexGroup,
  groupId = "",
  groupCode = "",
  allData = [],
  disabled = false,
  opendocs = [],
  credit = ""
}) => {
  const dispatch = useDispatch();
  const notify = useNotify();
  const [openDetailChild, setOpenDetailChild] = useState(false);
  const AttachCICdata = useAttachCICContext();

  const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);
  const [isModalConfirmFile, setIsModalConfirmFile] = useState<boolean>(false);

  // set default open doc
  useEffect(()=>{
    const defaultOpen = opendocs.includes(data?.uuid ?? '');
    if(!defaultOpen) return;
    setOpenDetailChild(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[opendocs]);
  

  const ChildListCIC = useSelector(
    getCodeDocumentTypeChildListCICV2(
      pathKeyStore({
        document_group_type: "LICH_SU_QUAN_HE_TIN_DUNG",
        type_loan: "LOAN",
      }),
      groupCode
    )
  );

  const changeDocumentType = (value: string) => {
    
    AttachCICdata?.update(
      `${value}${PREFIX_CIC_ATTACH_FILE}${TYPE_UPDATE_DOC_CIC.TYPEDETAIL}${PREFIX_CIC_ATTACH_FILE}${groupId ?? ""}${PREFIX_CIC_ATTACH_FILE}${data.uuid ?? ""}`)
      // dispatch(
      //   setDocumentType(value, {
      //     parentDoc_uuid: groupId ?? "",
      //     doc_uuid: data.uuid ?? "",
      //   })
      // );
  };

  const options =
    ChildListCIC?.map((c) => ({ value: c.id, label: c.name, type: c.type })) ?? [];
  if (!AttachCICdata) return null;

  const onHandleCancelConfirmFile = () =>
    setIsModalConfirmFile(!isModalConfirmFile);
  const handleConfirmDeleteGroup = () => {
    // dispatch(deleteDocumentGroup(indexGroup));
    AttachCICdata.remove(
      `${TYPE_REMOVE_DOC_CIC.DOC}${PREFIX_CIC_ATTACH_FILE}${groupId ?? ""
      }${PREFIX_CIC_ATTACH_FILE}${data.uuid ?? ""}`
    );
    setIsModalConfirmFile(!isModalConfirmFile);
  };
  const getTypeDoc = () =>_.get(options.find(op => op.value.toString() === data.document_code.toString()), 'type', '');
  const typeDoc = getTypeDoc();
  return (
    <>
      <Box className="flex-center" sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "3%",
            fontSize: "14px",
            fontWeight: "500",
            color: "#353535",
          }}
          className="flex justify-center"
        >
          {indexType + 1}
        </Box>
        <Box sx={{ width: "22%", marginRight: "3%" }}>
          <Select
            sx={{
              "& .MuiFormControl-root": {
                "& .MuiInputBase-formControl": {
                  "& .MuiInputBase-input": {
                    backgroundColor: "white !important",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "var(--mscb-danger)!important",
                    border: "1px solid var(--mscb-danger)!important",
                  },
                },
              },
            }}
            options={options}
            handleValidValueBeforeOnChange={(value) => {
              const exist = allData.find(
                (item) => item.document_code === value
              );
              if (!exist) return true;
              notify("Danh mục này đã tồn tại", "warning");
              return false;
            }}
            disabled={disabled || data.document_child_files.length > 0}
            onChange={(value: string) => changeDocumentType(value)}
            value={Number(data.document_code)}
            required
          />
        </Box>
        <Box sx={{ width: "40%" }}></Box>
        <Box sx={{ width: "25%" }}></Box>
        <Box sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}>
          {!disabled ? (
            <>
              <IconButton
                disabled={!Boolean(data.document_code ?? "")}
                onClick={AttachCICdata.add(
                  `${TYPE_DOC_CIC.FILE}${PREFIX_CIC_ATTACH_FILE}${groupId}${PREFIX_CIC_ATTACH_FILE}${data.uuid}`
                )}
              >
                <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa" />
              </IconButton>
              <IconButton
                onClick={() => {
                  setIsModalConfirmFile(!isModalConfirmFile);
                }}
              >
                <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa" />
              </IconButton>
            </>
          ) : null}

          <IconButton
            sx={{
              "& svg": {
                transition: "all ease 0.3s",
                ...(openDetailChild ? {} : { transform: "rotate(-90deg)" }),
                fontSize: "16px",
                "&:hover": {
                  color: "var(--mscb-primary)",
                },
              },
            }}
            onClick={clickCollapseChild}
          >
            <BiChevronDownCircle style={{ fontSize: "1.5rem" }} color="#1825aa" />
          </IconButton>
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
      <Collapse in={openDetailChild} sx={{ width: "100%" }}>
        {data.document_child_files &&
          data.document_child_files?.map((f, i) => {
            return (
              <Detail
                key={f.uuid}
                indexFile={i}
                credit={credit}
                indexType={indexType}
                indexGroup={indexGroup}
                data={f}
                parentDocId={groupId}
                docId={data.uuid}
                disabled={disabled}
                typeDoc={typeDoc}
              />
            );
          })}
        <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#c6c5d1",
          }}
        />
      </Collapse>
      <ModalConfirm
        open={isModalConfirmFile}
        onClose={onHandleCancelConfirmFile}
        onConfirm={handleConfirmDeleteGroup}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá file này
        </Box>
      </ModalConfirm>
    </>
  );
};
export default TypeDetail;
