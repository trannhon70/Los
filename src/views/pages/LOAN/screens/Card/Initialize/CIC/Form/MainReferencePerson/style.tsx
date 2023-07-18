import { makeStyles } from "@mui/styles";

const basicInfoStyle = makeStyles(() => ({
  root: {
    marginTop: "3px !important",
    "& .MuiTabs-flexContainer ": {
      transform: "translateX(0%) !important",
    },

    "& .basicInfo": {
      display: "grid !important",
      gridTemplateColumns: "repeat(5, 1fr) !important",
    },
    "@media screen and (max-width: 1360px)": {
      "& .basicInfo": {
        display: "grid !important",
        gridTemplateColumns: "none !important",
      },
    },
  },
  title: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1825aa",
    marginLeft: "5px",
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
  relative: {
    position: "relative",
    cursor: "pointer",
    "& button": {
      position: "absolute",
      right: "0",
      padding: "0",
      backdropFilter: "blur(50px)",
      backgroundColor: "rgba(246, 31, 31, 0.1)",
      width: "24px",
      height: "24px",

      "& svg": {
        color: "#f61f1f",
        fontSize: "15px",
        transform: "rotate(180deg)",
      },
    },
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
export default basicInfoStyle;
