import { makeStyles } from "@mui/styles";
import { SxBaseApp } from "types/app";
export const SxDocumentsInputSearch: SxBaseApp = {
  backgroundColor: "#426fe9",
  padding: "5px 0px 0px 9px",
  height: "40px",
  maxWidth: "272px",
  width: "272px !important",
  "& .corrdinator-input-search": {
    "& input": {
      height: "30px !important",

    },

    "& input::placeholder": {
      fontSize: "16px",
      fontStyle: "italic",
      fontWeight: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal"
    }
  },
  "& .corrdinator-icon-search": {
    fontSize: "19px",
    color: "#fff",
  }
}
const FileStyle = makeStyles(() => ({
  root: {
    "& .guest": {
      height: "auto"
    },
    "& .folder": {
      height: "calc(100vh - 275px)",
      "& .MuiTreeView-root": {
        maxWidth: "100% !important"
      },
      "& .mscb-outside-card-content": {
        height: "calc(100% - 25px)"
      },
      "@media screen and (max-width: 1600px) ": {
        "& .mscb-outside-card-content": {
          height: "calc(100% - 13px) !important"
        },
      },
      "@media screen and (max-width: 1500px) ": {
        "& .mscb-outside-card-content": {
          height: "calc(100% - 10px) !important"
        },
      },
    },
    "& .table": {
      height: "100%",
      "& .mscb-outside-card-content": {
        height: "calc(100vh - 150px)"
      },
    },
    "@media screen and (max-width: 1600px)": {
      "& .makeStyles-label": {
        padding: '0px 15px !important',
      },
      "& .makeStyles-content-42": {
        padding: '16px !important',
      },
    },
    "@media screen and (max-width: 1500px)": {
      "& .makeStyles-label": {
        padding: '0px 10px !important',
      },
      "& .makeStyles-content-42": {
        padding: '14px !important',
      },
    },

  }
}))


export default FileStyle