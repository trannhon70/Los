import { makeStyles } from "@mui/styles";

const SpouseInfoStyle = makeStyles(() => ({
  root: {
    paddingTop: "40px !important ",
    "& .card-inside-body": {
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& legend": {
      fontSize: "16px !important",
    },

    "& .label-radio": {
      marginBottom: "10px !important",
      "& .MuiFormControl-root": {
        "& label": {
          fontSize: "var(--mscb-fontsize) !important",
          marginBottom: "0px",
          marginRight: "54px",
        },
        "& .Mui-focused": {
          color: "var(--mscb-black) !important",
        },
        "& .MuiFormControlLabel-label": {
          fontSize: "13px",
        },
      },
    },
    "& .mscb-identification-info": {
      height: "calc(100% - 20px)",
    },

    "& .identity-button": {
      fontWeight: "500",
      fontSize: "14px",
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
      "& button": {
        borderRadius: "unset !important",
        textTransform: "initial",
      },
      "& .add-identity": {
        boxShadow: "0 3px 6px 0 rgba(24, 37, 170, 0.2)",
        "& span": {
          margin: "0px 2px 0px 6px",
        },
        "& svg": {
          height: "16px",
          width: "16px",
        },
      },
    },
    "& label.MuiInputLabel-root": {
      fontWeight: "500!important",
      fontSize: "14px",
    },
  },
  inputLabel: {
    "& label": {
      fontSize: "14px",
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px",
      },
    },
  },
})) as Function;

export default SpouseInfoStyle;
