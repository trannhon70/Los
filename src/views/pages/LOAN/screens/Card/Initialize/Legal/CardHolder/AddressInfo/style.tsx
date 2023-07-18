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
