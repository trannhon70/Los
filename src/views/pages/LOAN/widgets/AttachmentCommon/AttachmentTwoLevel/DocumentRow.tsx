import { Collapse, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import useNotify from "app/hooks/useNotify";
import { Fragment, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import Select from "views/components/base/Select";
import { IAttachModalDocument } from "../type";
import FileRow from "./FileRow";
import {
  ATTACHMODAL,
  TYPE_MODAL_ADD, TYPE_MODAL_DELETE, TYPE_MODAL_UPDATE, useAttachContext
} from "./hook";
type DocumentRowProps = {
  index: number;
  data: IAttachModalDocument;
  allData: IAttachModalDocument[];
  options: { label: string; value: string | number }[];
  ruleDisabled?: boolean;
  openCollapsed?: boolean;
  viewOnly?: boolean;
};
const DocumentRow = ({
  data,
  allData = [],
  index,
  options = [],
  openCollapsed = false,
  ruleDisabled = false,
  viewOnly = false,
}: DocumentRowProps) => {
  const notify = useNotify();
  const [collapsed, setCollapsed] = useState<boolean>(openCollapsed);
  const toggleCollapse = () => setCollapsed(!collapsed);

  useEffect(() => {
    setCollapsed(openCollapsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollapsed]);

  const attachContext = useAttachContext();
  if (!attachContext) return null;

  const handleValidValueBeforeOnChange = (value: string | number) => {
    const currentDoc = allData?.find(
      (item) => item?.document_id?.toString() === value?.toString()
    );
    if (!currentDoc) return true;
    notify("Danh mục này đã tồn tại", "warning");
    return false;
  };

  const onChangeSelect = (value: string | number, uuid: string) => {
    const template =
      ("DOCUMENT" as TYPE_MODAL_UPDATE) + ATTACHMODAL.PREFIX_UPDATE + uuid;
    attachContext.update({ template, value });
  };

  return (
    <Fragment>
      <Box className="flex-center" key={index + 1}>
        <Box
          sx={{
            width: "3%",
            fontSize: "14px",
            fontWeight: "500",
            color: "#353535",
          }}
          className="flex justify-center"
        >
          {index + 1}
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
            handleValidValueBeforeOnChange={handleValidValueBeforeOnChange}
            onChange={(val) => onChangeSelect(val, data.uuid ?? "")}
            options={options}
            disabled={data.child_files?.length > 0}
            value={data.document_id?.toString() ?? ""}
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
          {!viewOnly ? (
            <>
              <IconButton
                disabled={!Boolean(data.document_id ?? "")}
                onClick={() =>
                  attachContext.add(
                    ("FILE" as TYPE_MODAL_ADD) +
                      ATTACHMODAL.PREFIX_ADD +
                      (data?.uuid ?? "")
                  )
                }
              >
                <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa" />
              </IconButton>
              <IconButton
                disabled={ruleDisabled}
                onClick={() =>
                  attachContext.remove(
                    `${"DOCUMENT" as TYPE_MODAL_DELETE}<PREFIX>${
                      data.uuid ?? ""
                    }`
                  )
                }
              >
                <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa" />
              </IconButton>
            </>
          ) : null}
          <IconButton
            sx={{
              "& svg": {
                transition: "all ease 0.3s",
                ...(!collapsed ? {} : { transform: "rotate(-90deg)" }),
                fontSize: "16px",
                "&:hover": {
                  color: "var(--mscb-primary)",
                },
              },
            }}
            onClick={toggleCollapse}
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
      <Collapse unmountOnExit in={collapsed}>
        {data.child_files?.map((file, idx) => (
          <FileRow
            key={file.uuid}
            data={file}
            doc_uuid={data.uuid}
            index={idx}
            viewOnly={viewOnly}
            ruleDisabled={ruleDisabled}
          />
        ))}
      </Collapse>
    </Fragment>
  );
};
export default DocumentRow;
