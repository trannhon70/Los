import { makeStyles } from "@mui/styles";

const identificationStyle = makeStyles(() => ({
  root: {
    "& .identity-button": {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },

    "& .card-inside-body": {
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& legend": {
      fontSize: "15px !important",
    },
    "& label.MuiInputLabel-root": {
      fontWeight: "500!important",
      fontSize: "14px",
    },
  },
})) as Function;

export default identificationStyle;
