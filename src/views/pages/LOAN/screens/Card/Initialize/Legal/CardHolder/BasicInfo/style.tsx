import { makeStyles } from "@mui/styles";

const basicInfoStyle = makeStyles(() => ({
  root: {},
  basicInfoCard: {
    height: "calc(100% - 20px)",
    "& .card-inside-body": {
      padding: "20px",
    },
    "& legend": {
      fontSize: "15px !important",
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

export default basicInfoStyle;
