import { FC, useState, useEffect } from "react";
import { Box, Collapse, Divider, IconButton } from "@mui/material";
import Select from "views/components/base/Select";
import { BiChevronDownCircle } from "react-icons/bi";
import {  useSelector } from "react-redux";
import Detail from "./Detail";
import {
  ILOANNormalStorageCICDocumentListDetail,
} from "types/models/loan/normal/storage/CIC";
import {
  getCodeDocumentTypeChildListCICV2
} from "features/loan/normal/configs/document-type/selectors";
import {  pathKeyStore } from "utils";
interface TypeDetailProps {
  data: ILOANNormalStorageCICDocumentListDetail;
  indexType: number;
  indexGroup: number;
  groupId?: string;
  groupCode?:string;
  allData?:ILOANNormalStorageCICDocumentListDetail[];
  openDocs?:string[];
}

const TypeDetail: FC<TypeDetailProps> = ({
  data,
  indexType,
  indexGroup,
  groupId = "",
  groupCode ='',
  openDocs = [],
}) => {
  const [openDetailChild, setOpenDetailChild] = useState(false);
  const clickCollapseChild = () => setOpenDetailChild(!openDetailChild);

  const ChildListCIC = useSelector(
    getCodeDocumentTypeChildListCICV2(
      pathKeyStore({
        document_group_type: "LICH_SU_QUAN_HE_TIN_DUNG",
        type_loan: "LOAN",
      }),
      groupCode
    )
  );
  const options =
    ChildListCIC?.map((c) => ({ value: c.id.toString(), label: c.name })) ?? [];

  useEffect(()=>{
    const defaultOpen = openDocs.includes(data?.uuid ?? '');
    if(!defaultOpen) return;
    setOpenDetailChild(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[openDocs]);
  
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
            disabled={data.document_child_files.length > 0}
            value={data.document_code?.toString()}
            required
          />
        </Box>
        <Box sx={{ width: "40%" }}></Box>
        <Box sx={{ width: "25%" }}></Box>
        <Box sx={{ width: "10%", justifyContent: "flex-end", display: "flex" }}>
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
                key={i}
                indexFile={i}
                indexType={indexType}
                indexGroup={indexGroup}
                data={f}
                parentDocId={groupId}
                docId={data.uuid}
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
    </>
  );
};
export default TypeDetail;
