import { makeStyles } from "@mui/styles";

const addressInfoStyle = makeStyles(() => ({
  root: {
    height: "calc(100% - 20px)",

    "& fieldset": {
      "& legend": {
        fontSize: "16px !important",
      },
    },
    "& .model-copy": {
      display: "flex",
      flexDirection: "row-reverse",
      "& span": {
        zIndex: "1000",
        position: "absolute",
      },
    },
    "& .address-button": {
      fontWeight: "500",
      fontSize: "14px",
      display: "flex",
      justifyContent: "flex-end",
      "& button": {
        borderRadius: "unset !important",
        textTransform: "initial",
      },
      "& .add-address": {
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
  },

  inputLabel: {
    "& .MuiFormControl-root": {
      "& label": {
        fontSize: "14px",
      },
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px",
      },
    },
  },
})) as Function;

export default addressInfoStyle;
