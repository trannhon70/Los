import { FC, useEffect, useState } from "react";
import { Box, Collapse, Divider, IconButton } from "@mui/material";
import Select from "views/components/base/Select";
import { BiChevronDownCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getDataConfigDocument } from "features/loan/normal/storage/cic/selectors";
import { ILOANNormalStorageCICDocumentList } from "types/models/loan/normal/storage/CIC";
import TypeDetail from "./TypeDetail";
import { intToRoman } from "utils";
export interface GroupTypeProps {
  data: ILOANNormalStorageCICDocumentList;
  indexGroup: number;
  allData?: ILOANNormalStorageCICDocumentList[];
  openDocs?: string[];
}

const GroupType: FC<GroupTypeProps> = ({
  data,
  indexGroup,
  openDocs = [],
}) => {
  const documentGrpConfigs = useSelector(getDataConfigDocument());

  const [openDetail, setOpenDetail] = useState(false);

  const clickCollapse = () => setOpenDetail(!openDetail);

  const options =
    documentGrpConfigs?.map((c) => ({
      value: c.code?.toString(),
      label: c.name,
    })) ?? [];
  
  useEffect(() => {
    const defaultOpen = openDocs.includes(data?.uuid ??'');
    if(!defaultOpen) return;
    setOpenDetail(defaultOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDocs]);

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
            disabled={data.document_list.length > 0}
            value={data.document_type_code?.toString()}
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
          <IconButton
            sx={{
              "& svg": {
                transition: "all ease 0.3s",
                ...(openDetail ? {} : { transform: "rotate(-90deg)" }),
                fontSize: "16px",
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
                key={i}
                indexType={i}
                indexGroup={indexGroup}
                data={a}
                groupId={data.uuid ?? ""}
                allData={data.document_list ?? []}
                groupCode={data?.document_type_code?.toString()}
                openDocs={openDocs}
              />
            );
          })}
      </Collapse>
    </>
  );
};

export default GroupType;
