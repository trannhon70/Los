import { Box, Collapse, Divider, IconButton } from "@mui/material";
import useNotify from "app/hooks/useNotify";
import { setDataLOANNormalStorageLOANDoc } from "features/loan/normal/storage/loan/actions";
import { getCodeDocumentTypeChildList } from "features/loan/normal/storage/loan/selectors";
import * as _ from "lodash";
import { FC, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ILOANNormalDocumentGroup } from "types/models/loan/normal/storage/LOAN";
import { pathKeyStore } from "utils";
import Select from "views/components/base/Select";
import ModalConfirm from "views/components/layout/ModalConfirm";
import {
  PREFIX_LOAN_ATTACH_FILE,
  TYPE_DOC_LOAN,
  TYPE_REMOVE_DOC_LOAN,
  useAttachContext
} from ".";
import Detail from "./Detail";
interface TypeDetailProps {
  data: ILOANNormalDocumentGroup;
  indexType: number;
  indexGroup: number;
  groupId?: string;
  allData?: ILOANNormalDocumentGroup[];
  groupDocData?: { document_id: string | number | null; document_name: string };
  disabled?: boolean;
}

const TypeDetail: FC<TypeDetailProps> = ({
  data,
  indexType,
  indexGroup,
  groupId = "",
  groupDocData = { document_id: "", document_name: "" },
  allData = [],
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const notify = useNotify();
  const [openDetailChild, setOpenDetailChild] = useState(true);

  const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);
  const [isModalConfirmFile, setIsModalConfirmFile] = useState<boolean>(false);
  // const handleAddFiles = () => {
  //   documentTypeCode[indexType].document_code.length > 0 &&
  //   dispatch(addNewChildFiles({indexGroup, indexType}));
  // }

  const ChildList = useSelector(
    getCodeDocumentTypeChildList(
      pathKeyStore({
        document_group_type: "PHUONG_AN_&_NHU_CAU_CTD",
        type_loan: "LOAN",
      }),
      groupDocData?.document_id?.toString() ?? ""
    )
  );

  const options =
    ChildList?.map((c) => ({ value: c.id.toString(), label: c.name })) ?? [];

  const changeDocumentType = (value: string) => {
    if (!value) return;
    const label = _.get(
      options?.find((it) => it.value === value),
      "label",
      ""
    );
    dispatch(
      setDataLOANNormalStorageLOANDoc(value, {
        parentDoc_uuid: groupId ?? "",
        doc_uuid: data.uuid ?? "",
        currentData: {
          label,
          value,
        },
      })
    );
  };
  const AttachCICdata = useAttachContext();
  if (!AttachCICdata) return null;

  const handleConfirmDeleteGroup = () => {
    AttachCICdata.remove(
      `${
        TYPE_REMOVE_DOC_LOAN.DOC
      }${PREFIX_LOAN_ATTACH_FILE}${groupId}${PREFIX_LOAN_ATTACH_FILE}${
        data.uuid ?? ""
      }`
    );
    setIsModalConfirmFile(!isModalConfirmFile);
  };

  const onHandleCancelConfirmFile = () =>
    setIsModalConfirmFile(!isModalConfirmFile);

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
              const exist = allData.find((item) => item?.document_id === value);
              if (!exist) return true;
              notify("Danh mục này đã tồn tại", "warning");
              return false;
            }}
            disabled={disabled || (data?.child_files?.length ?? 0) > 0}
            onChange={(value: string) => changeDocumentType(value)}
            value={data.document_id?.toString() ?? ""}
            required
          />
        </Box>
        <Box sx={{ width: "40%" }}></Box>
        <Box sx={{ width: "25%" }}></Box>
        <Box sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}>
          {!disabled ? (
            <>
              <IconButton
                onClick={AttachCICdata.add(
                  `${TYPE_DOC_LOAN.FILE}${PREFIX_LOAN_ATTACH_FILE}${groupId}${PREFIX_LOAN_ATTACH_FILE}${data.uuid}`
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
                fontSize: "24px",
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
        {data?.child_files &&
          data?.child_files?.map((f, i) => {
            return (
              <Detail
                key={i}
                indexFile={i}
                indexType={indexType}
                indexGroup={indexGroup}
                data={f}
                parentDocId={groupId}
                docId={data.uuid ?? ""}
                disabled={disabled}
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
