import { FileUpload } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { downloadLegalFileMulti } from "features/loan/normal/storage/legal/actions";
import { getBranchCodeUser } from "features/loan/normal/storage/legal/selectors";
import { Fragment } from "react";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import useStorage from "views/pages/LOAN/screens/Normal/Initialize/Legal/useStorage";
import { IAttachModalFile } from "../type";
import {
  ATTACHMODAL, getTemplatePrefix, TYPE_MODAL_DELETE, TYPE_MODAL_UPDATE, useAttachContext
} from "./hook";

type FileRowProps = {
  index: number;
  doc_uuid: string;
  data: IAttachModalFile;
  ruleDisabled?: boolean;
  viewOnly?: boolean;
};
const FileRow = ({
  data,
  index,
  doc_uuid = "",
  ruleDisabled = false,
  viewOnly = false,
}: FileRowProps) => {
  const dataName = useSelector(getBranchCodeUser);
  const { valueModify } = useStorage("BORROWER");
  const isLocal = !data.type;

  const attachContext = useAttachContext();
  const dispatch = useDispatch();
  if (!attachContext) return null;

  const handleOnchangeDescriptionFile =
    (doc_uuid: string | number, file_uud: string) => (value: string) => {
      if (!value) return;
      const arr = [
        "FILE" as TYPE_MODAL_UPDATE,
        doc_uuid as string,
        file_uud as string,
        "description",
      ];
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
                      attachContext.chooseFile(event, doc_uuid, data.uuid);
                      setTimeout(() => {
                        event.target.value = "";
                      }, 1000);
                    }}
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
                  dispatch(downloadLegalFileMulti([data?.uuid]));
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
          {!viewOnly ? (
            <>
              <Input
                placeholder="Nhập nội dung"
                sx={{ width: "60%" }}
                value={data.description ?? ""}
                onDebounce={handleOnchangeDescriptionFile(doc_uuid, data.uuid)}
              />
            </>
          ) : (
            <>
              <span
                style={{
                  fontSize: "14px",
                  color: "#353535",
                  fontWeight: "500",
                }}
              >
                {data.description ?? ""}
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
            {isLocal ? (
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
                  {data?.updated_by_name ?? ""}
                </span>
                <span
                  style={{
                    color: "#808080",
                    fontSize: "12px",
                  }}
                >
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
          {!viewOnly ? (
            <>
              <IconButton>
                <BsPencil style={{ fontSize: "1.3rem" }} color="#1825aa" />
              </IconButton>
              <IconButton
                onClick={() =>
                  attachContext.remove(
                    getTemplatePrefix("<PREFIX>", [
                      "FILE" as TYPE_MODAL_DELETE,
                      doc_uuid ?? "",
                      data.uuid ?? "",
                    ])
                  )
                }
              >
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
          borderColor: "#c6c5d1",
        }}
      />
    </Fragment>
  );
};
export default FileRow;
