import { makeStyles } from "@mui/styles";

const otherStyle = makeStyles(() => ({
  root: {
    marginBottom: "20px",
    "& .card-inside-body": {
      padding: "20px",
    },
    "& legend": {
      fontSize: "15px !important",
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
})) as Function;

export default otherStyle;
