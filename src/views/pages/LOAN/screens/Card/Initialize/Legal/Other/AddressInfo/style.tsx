import { makeStyles } from "@mui/styles";

const addressInfoStyle = makeStyles(() => ({
  root: {
    height: "calc(100% - 20px)",

    "& fieldset": {
      "& legend": {
        fontSize: "16px",
      },
    },
    "& .card-inside-body": {
      padding: "20px",
      height: "100%",
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
    "& .model-copy": {
      display: "flex",
      flexDirection: "row-reverse",
      "& span": {
        zIndex: "1000",
        position: "absolute",
      },
    },
  },

  buttonList: {
    "& button": {
      borderRadius: "unset",
    },
  },
})) as Function;

export default addressInfoStyle;
