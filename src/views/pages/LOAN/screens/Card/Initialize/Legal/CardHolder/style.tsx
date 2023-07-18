import { makeStyles } from "@mui/styles";

const CardLegalHolderStyle = makeStyles(() => ({
  root: {
    // padding: '0px 20px 0px 20px ',

    "& .checkbox-card-holder": {
      marginTop: "8px",
      display: "flex",
      flexFlow: "row",
      "& .MuiFormControlLabel-label": {
        fontSize: "13px",
      },
    },
    inputLabel: {
      "& label": {
        fontSize: "14px",
      },
    },
    "& .mscb-other-info": {
      display: "flex",
    },
    "& .card-inside-body": {
      padding: "20px",
      width: "100%",
    },
    "& legend": {
      fontSize: "16px !important",
    },
    "& label.MuiInputLabel-root": {
      fontWeight: "500!important",
      fontSize: "14px",
    },

    "& .mid-content-wrap": {
      display: "flex",
      flexDirection: "column",
      // height: "calc(100% - 20px)",
    },
    "& .mscb-identification-info": {
      display: "flex",
      flexBasis: "100%",
    },
    "& button": {
      borderRadius: "unset",
      textTransform: "initial",
    },
  },
})) as Function;
export default CardLegalHolderStyle;
