import { makeStyles } from "@mui/styles";

const basicInfoStyle = makeStyles(() => ({
  root: {},
  basicInfoCard: {
    height: "calc(100% - 20px)",
    "& .card-inside-body": {
      padding: "20px",
    },
    "& legend": {
      fontSize: "16px !important",
    },

    "& .question": {
      display: "flex",
      alignItems: "center",
      "& .tio-square": {
        width: "8px",
        height: "8px",
        backgroundColor: "#eb0029",
      },
      "& .tio-square:before": {
        content: "none",
      },
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
    "&.red-label": {
      "& .MuiFormControl-root": {
        "& label": {
          color: "red",
        },
      },
    },
  },
})) as Function;

export default basicInfoStyle;
