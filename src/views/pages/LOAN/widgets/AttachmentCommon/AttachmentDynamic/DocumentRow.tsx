import { Collapse, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import useNotify from "app/hooks/useNotify";
import * as _ from 'lodash';
import { Fragment, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronRightCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile
} from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import Select from "views/components/base/Select";
import FileRow from "./FileRow";
import {
  ATTACHMODAL, findDocumentOptions,
  IDocDynamicOption, TYPE_MODAL_ADD, TYPE_MODAL_DELETE, TYPE_MODAL_UPDATE, useAttachContext
} from "./hook";

type DocumentRowProps = {
  node?:string;
  index: number;
  data: ILOANModalDynamicDocument;
  doc_uuids: string;
  doc_id: string;
  allData: ILOANModalDynamicDocument[];
  options: IDocDynamicOption[];
  openCollapsed?: boolean;
  docsOpen?: string[];
  levelsColor?: string[];
  colorBorder?: string;
  disabled?:boolean;
};
const DocumentRow = ({
  node,
  data,
  allData = [],
  index,
  doc_uuids = "",
  doc_id = "",
  options = [],
  openCollapsed = false,
  disabled = false,
  docsOpen = [],
  levelsColor = [],
  colorBorder = "#1825aa",
}: DocumentRowProps) => {
  const notify = useNotify();
  const [collapsed, setCollapsed] = useState<boolean>(openCollapsed);
  const attachContext = useAttachContext();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if(!collapsed) {
      attachContext?.openDocs(data.document_id?.toString() ?? "")
    }
    else attachContext?.closeDocs(data.document_id?.toString() ?? "")
  }

  const currentDoc_uuids = doc_uuids + ATTACHMODAL.PREFIX_UUIDS + (!!data.document_id ? data.document_id.toString() : data.uuid) ;

  useEffect(() => {
    setCollapsed(openCollapsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollapsed]);
  
  useEffect(() => {
    if(collapsed) {
      attachContext?.openDocs(data.document_id?.toString() ?? "")
    }
    else attachContext?.closeDocs(data.document_id?.toString() ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
    const label = _.get(
      options?.find((it) => it.value.toString() === value.toString()),
      "label",
      ""
    );
    attachContext.update({ template, value, option: { label, value } });
  };
  const getTypeDoc = ()=>_.get(options.find(op => op?.value?.toString() === data?.document_id?.toString()), 'type', '');
  const typeDoc = getTypeDoc();

  const handleAdd = () => {
    
    setCollapsed(true);
    attachContext?.openDocs(data.document_id?.toString() ?? "")
    attachContext.add(
      ((data.hasSubDoc ? "DOCUMENT" : "FILE") as TYPE_MODAL_ADD) +
        ATTACHMODAL.PREFIX_ADD +
        currentDoc_uuids,
    );
  }

  return (
    <Fragment>
      <Box className="flex-center" key={data.uuid ?? data.document_id}>
        <Box
          sx={{
            width: "3%",
            fontSize: "14px",
            fontWeight: "500",
            color: "#353535",
          }}
          className="flex justify-center"
        >
          {node ?? (index+1)}
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
                    color: `${colorBorder} !important`,
                    border: `1px solid ${colorBorder}`,
                  },
                },
              },
            }}
            handleValidValueBeforeOnChange={handleValidValueBeforeOnChange}
            onChange={(val) => onChangeSelect(val, currentDoc_uuids ?? "")}
            options={options}
            disabled={data.childs?.length > 0}
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
          {!disabled ? (
            <>
              <IconButton
                disabled={!Boolean(data.document_id ?? "")}
                onClick={handleAdd}
              >
                <AiOutlinePlusSquare style={{ fontSize: "1.5rem" }} color="#1825aa" />
              </IconButton>
              <IconButton
                disabled={disabled}
                onClick={() =>
                  attachContext.remove(
                    `${"DOCUMENT" as TYPE_MODAL_DELETE}<PREFIX>${
                      currentDoc_uuids ?? ""
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
                ...(!collapsed ? {} : { transform: "rotate(90deg)" }),
                fontSize: "16px",
                "&:hover": {
                  color: "var(--mscb-primary)",
                },
              },
            }}
            onClick={toggleCollapse}
          >
            <BiChevronRightCircle style={{ fontSize: "1.5rem" }} color="#1825aa" />
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
        {data.hasSubDoc ? (
          <>
            {(data.childs as ILOANModalDynamicDocument[])?.map(
              (dataDoc, idx) => {
                return (
                  <DocumentRow
                    node={node+'.'+(idx+1)}
                    key={dataDoc.uuid ?? dataDoc.document_id}
                    openCollapsed={docsOpen.includes(
                      dataDoc.uuid.replace(PREFIX_LOCAL, "")
                    ) || (!!dataDoc.document_id && docsOpen.includes(dataDoc.document_id?.toString()))}
                    levelsColor={levelsColor.slice(1)}
                    colorBorder={_.first(levelsColor) ?? "#1825aa"}
                    disabled={disabled}
                    doc_uuids={currentDoc_uuids}
                    doc_id={dataDoc.document_id?.toString() ?? ""}
                    data={dataDoc}
                    allData={data.childs as ILOANModalDynamicDocument[]}
                    index={idx}
                    options={findDocumentOptions(
                      options,
                      data.document_id ?? ""
                    )}
                  />
                );
              }
            )}
          </>
        ) : (
          <>
            {(data.childs as ILOANModalDynamicFile[])?.map((file, idx) => (
              <FileRow
                key={file.uuid}
                data={file}
                doc_uuid={currentDoc_uuids}
                index={idx}
                disabled={disabled}
                typeDoc={typeDoc}
              />
            ))}
          </>
        )}
      </Collapse>
    </Fragment>
  );
};
export default DocumentRow;
