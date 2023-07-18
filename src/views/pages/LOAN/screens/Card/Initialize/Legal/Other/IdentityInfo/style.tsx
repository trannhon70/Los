import { makeStyles } from "@mui/styles";

const identificationStyle = makeStyles(() => ({
  root: {
    height: "calc(100% - 20px)",

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

    "& label.MuiInputLabel-root": {
      fontWeight: "500 !important",
      fontSize: "14px",
    },
  },

  buttonList: {
    "& button": {
      borderRadius: "unset",
    },
  },
})) as Function;

export default identificationStyle;
