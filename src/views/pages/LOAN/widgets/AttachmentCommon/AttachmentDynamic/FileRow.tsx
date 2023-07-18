import { FileUpload } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { downloadLegalFileMulti } from "features/loan/normal/storage/legal/actions";
import { Fragment, useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { ILOANModalDynamicFile } from "types/models/loan/normal/configs/Document";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";

import {
  ATTACHMODAL,
  getTemplatePrefix,
  TYPE_MODAL_DELETE,
  TYPE_MODAL_UPDATE,
  useAttachContext,
} from "./hook";
import { PREFIX_LOCAL, renderAccept } from "utils";
type FileRowProps = {
  index: number;
  doc_uuid: string;
  data: ILOANModalDynamicFile;
  disabled?: boolean;
  typeDoc?: string;
};
const FileRow = ({
  data,
  index,
  doc_uuid = "",
  disabled = false,
  typeDoc = "",
}: FileRowProps) => {
  // const { valueModify } = useStorage("BORROWER");
  const isLocal = !data.content_type;
  const currentUuids = doc_uuid + ATTACHMODAL.PREFIX_UUIDS + data.uuid;
  const attachContext = useAttachContext();
  const [enabledEditDesc, setEnabledEditDesc] = useState<boolean>(false);
  const enabledEditModel = !data?.uuid?.includes(PREFIX_LOCAL);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.uuid) return;
    if (data.uuid.includes(PREFIX_LOCAL)) {
      setEnabledEditDesc(true);
    }
  }, [data.uuid]);
  
  if (!attachContext) return null;

  const handleOnchangeDescriptionFile = (value: string) => {
    if (!value) return;
    const arr = ["FILE" as TYPE_MODAL_UPDATE, currentUuids, "description"];
    const template = getTemplatePrefix(ATTACHMODAL.PREFIX_UPDATE, arr);
    attachContext.update({ template, value });
  };
  return (
    <Fragment>
      <Box className="flex-center">
        <Box
          sx={{
            width: "3%",
            fontSize: "14px",
            color: "#353535",
          }}
          className="flex justify-center"
        >
          {index + 1}
        </Box>
        <Box
          sx={{
            width: "22%",
            marginRight: "3%",
            wordBreak: "break-all",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "25px",
            }}
            sx={{
              textAlign: "left",
              color: "var(--mscb-primary)",
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
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      attachContext.chooseFile(event, currentUuids);
                      setTimeout(() => {
                        event.target.value = "";
                      }, 1000);
                    }}
                    accept={renderAccept(typeDoc)}
                  />
                </label>
              </>
            ) : (
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: "14px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(downloadLegalFileMulti([data?.uuid ?? ""]));
                }}
              >
                {data?.name ?? ""}
              </span>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "40%",
            textAlign: "center",
            "& .mscb-input": {
              "& .MuiFormControl-root": {
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(94, 191, 255, 0.14)!important",
                },
              },
            },
          }}
        >
          {enabledEditDesc ? (
            <>
              <Input
                placeholder="Nhập nội dung"
                sx={{ width: "60%" }}
                value={data.description ?? ""}
                onChange={handleOnchangeDescriptionFile}
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
                {" "}
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
                <span
                  style={{
                    color: "#808080",
                    fontSize: "12px",
                  }}
                >
                  {timestampToDate(
                    data?.updated_at ?? 0,
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
              <IconButton
                onClick={() =>
                  attachContext.remove(
                    getTemplatePrefix("<PREFIX>", [
                      "FILE" as TYPE_MODAL_DELETE,
                      currentUuids,
                    ])
                  )
                }
              >
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
          borderColor: "#c6c5d1",
        }}
      />
    </Fragment>
  );
};
export default FileRow;
