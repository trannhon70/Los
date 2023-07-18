import { Box, Collapse, Divider, IconButton } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import { setDataLOANNormalStorageLOANParentDoc } from "features/loan/normal/storage/loan/actions";
import {
  getDataConfigDocument
} from "features/loan/normal/storage/loan/selectors";
import * as _ from "lodash";
import { FC, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocumentInfoList } from "types/models/loan/normal/storage/LOAN";
import { intToRoman } from "utils";
import Select from "views/components/base/Select";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_LOAN_ATTACH_FILE,
  TYPE_DOC_LOAN,
  TYPE_REMOVE_DOC_LOAN,
  useAttachContext
} from ".";
import TypeDetail from "./TypeDetail";
export interface GroupTypeProps {
  data: ILOANNormalDocumentInfoList;
  indexGroup: number;
  allData?: ILOANNormalDocumentInfoList[];
  disabled?: boolean;
}

const GroupType: FC<GroupTypeProps> = ({
  data,
  indexGroup,
  allData = [],
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const notify = useNotify();
  const documentGrpConfigs = useSelector(getDataConfigDocument());

  const [openDetail, setOpenDetail] = useState(true);

  const clickCollapse = () => setOpenDetail(!openDetail);
  const [isModalConfirmFile, setIsModalConfirmFile] = useState<boolean>(false);

  const options =
    documentGrpConfigs?.map((c) => ({
      value: c.code.toString(),
      label: c.name,
    })) ?? [];

  const changeGrpListFile = (value: string) => {
    if (!value) return;
    const label = _.get(
      options?.find((it) => it.value === value),
      "label",
      ""
    );

    dispatch(
      setDataLOANNormalStorageLOANParentDoc(value, {
        parentDoc_uuid: data.uuid ?? "",
        currentData: { label, value },
      })
    );
  };

  const AttachContext = useAttachContext();
  if (!AttachContext) return null;

  const handleConfirmDeleteGroup = () => {
    AttachContext.remove(
      `${TYPE_REMOVE_DOC_LOAN.PARENT_DOC}${PREFIX_LOAN_ATTACH_FILE}${
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
              const exist = allData.find((item) => item.document_id === value);
              if (!exist) return true;
              notify("Danh mục này đã tồn tại", "warning");
              return false;
            }}
            disabled={disabled || (data?.document_group?.length ?? 0) > 0}
            onChange={(value: string) => changeGrpListFile(value)}
            value={data?.document_id?.toString() ?? ""}
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
                onClick={AttachContext.add(
                  `${TYPE_DOC_LOAN.DOC}${PREFIX_LOAN_ATTACH_FILE}${data.uuid}`
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
                fontSize: "24px",
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
        {data?.document_group &&
          data?.document_group?.map((a, i) => {
            return (
              <TypeDetail
                key={i}
                indexType={i}
                indexGroup={indexGroup}
                data={a}
                groupId={data.uuid ?? ""}
                groupDocData={{
                  document_id: data.document_id ?? "",
                  document_name: data.document_name ?? "",
                }}
                allData={data.document_group ?? []}
                disabled={disabled}
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
