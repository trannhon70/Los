import { Box, Collapse, Divider, IconButton } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import {
  setDocumentGroupType
} from "features/loan/normal/storage/cic/actions";
import {
  getDataConfigDocument
} from "features/loan/normal/storage/cic/selectors";
import { FC, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalStorageCICDocumentList } from "types/models/loan/normal/storage/CIC";
import { intToRoman } from "utils";
import Select from "views/components/base/Select";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_CIC_ATTACH_FILE,
  TYPE_DOC_CIC,
  TYPE_REMOVE_DOC_CIC,
  TYPE_UPDATE_DOC_CIC,
  useAttachCICContext
} from ".";
import TypeDetail from "./TypeDetail";

export interface GroupTypeProps {
  data: ILOANNormalStorageCICDocumentList;
  indexGroup: number;
  allData?: ILOANNormalStorageCICDocumentList[];
  disabled?: boolean;
  opendocs?:string[];
  credit?: string;
  // onChangeGroupType(value: string, parentDoc_uuid: string): void;
}

const GroupType: FC<GroupTypeProps> = ({
  data,
  indexGroup,
  allData = [],
  disabled = false,
  opendocs=[],
  credit = "",
  // onChangeGroupType
}) => {
  const dispatch = useDispatch();
  const notify = useNotify();
  const AttachCICdata = useAttachCICContext();
  const documentGrpConfigs = useSelector(getDataConfigDocument());

  const [openDetail, setOpenDetail] = useState(false);

  const clickCollapse = () => setOpenDetail(!openDetail);
  const [isModalConfirmFile, setIsModalConfirmFile] = useState<boolean>(false);

  
  // set default open doc
  useEffect(()=>{
    const defaultOpen = opendocs.includes(data?.uuid ?? '');
    if(!defaultOpen) return;
    setOpenDetail(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[opendocs]);

  const changeGrpListFile = (value: string) => {
    // value && onChangeGroupType(value, data.uuid ?? "")
    AttachCICdata?.update(
      `${value}${PREFIX_CIC_ATTACH_FILE}${TYPE_UPDATE_DOC_CIC.GROUPTYPE}${PREFIX_CIC_ATTACH_FILE}${data.uuid ?? ""}`)
  };

  const options =
    documentGrpConfigs?.map((c) => ({
      value: c.code.toString(),
      label: c.name,
    })) ?? [];
  if (!AttachCICdata) return null;

  const handleConfirmDeleteGroup = () => {
    // dispatch(deleteDocumentGroup(indexGroup));
    AttachCICdata.remove(
      `${TYPE_REMOVE_DOC_CIC.PARENT_DOC}${PREFIX_CIC_ATTACH_FILE}${
        data.uuid ?? ""
      }`
    );
    setIsModalConfirmFile(!isModalConfirmFile);
  };

  const onHandleCancelConfirmFile = () =>
    setIsModalConfirmFile(!isModalConfirmFile);

  return (
    <>
      <Box className="flex-center">
        <Box
          sx={{
            width: "3%",
            fontSize: "14px",
            fontWeight: "500",
            color: "#353535",
          }}
          className="flex justify-center"
        >
          {intToRoman(indexGroup + 1)}
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
                    color: "#1825aa !important",
                    border: "1px solid #1825aa",
                  },
                },
              },
            }}
            options={options}
            handleValidValueBeforeOnChange={(value) => {
              const exist = allData.find(
                (item) =>
                  item.document_type_code.toString() === value.toString()
              );
              if (!exist) return true;
              notify("Danh mục này đã tồn tại", "warning");
              return false;
            }}
            disabled={disabled || data.document_list.length > 0}
            onChange={(value: string) => changeGrpListFile(value)}
            value={data.document_type_code.toString()}
            required
          />
        </Box>
        <Box sx={{ width: "40%" }}></Box>
        <Box sx={{ width: "25%" }}></Box>
        <Box
          sx={{
            width: "10%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          {!disabled ? (
            <>
              <IconButton
                disabled={!Boolean(data.document_type_code ?? "")}
                onClick={AttachCICdata.add(
                  `${TYPE_DOC_CIC.DOC}${PREFIX_CIC_ATTACH_FILE}${data.uuid}`
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
                ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                "&:hover": {
                  color: "var(--mscb-primary)",
                },
              },
            }}
            onClick={clickCollapse}
          >
            <BiChevronDownCircle style={{ fontSize: "1.5rem" }} color="#1825aa" />
          </IconButton>
        </Box>
      </Box>
      <Divider
        sx={{
          borderBottomWidth: "2px",
          margin: "10px 0px",
          borderColor: "#c6c5d1",
        }}
      />
      <Collapse in={openDetail} sx={{ width: "100%" }}>
        {data.document_list &&
          data.document_list?.map((a, i) => {
            return (
              <TypeDetail
                key={a.uuid}
                indexType={i}
                indexGroup={indexGroup}
                data={a}
                groupId={data.uuid ?? ""}
                allData={data.document_list ?? []}
                groupCode={data?.document_type_code?.toString()}
                disabled={disabled}
                opendocs={opendocs}
                credit={credit}
              />
            );
          })}
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

export default GroupType;
