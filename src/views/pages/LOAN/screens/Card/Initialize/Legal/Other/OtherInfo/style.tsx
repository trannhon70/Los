import { makeStyles } from "@mui/styles";

const otherInfoStyle = makeStyles(() => ({
  root: {},
  basicInfoCard: {
    height: "calc(100% - 20px)",
    "& .card-inside-body": {
      padding: "20px",
    },
    "& legend": {
      fontSize: "16px !important",
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
  textarea: {
    "& textarea": {
      height: "100px !important",
      padding: 10,
      overflowY: "scroll!important ",
      overflowX: "hidden!important",
      marginBottom: "23px!important",

      border: "none",
      resize: "none",
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontSize: "14px",
    },
    "& textarea::-webkit-scrollbar": {
      width: "5px",
      "border-radius": "50px",
    },

    "& textarea::-webkit-scrollbar-thumb": {
      background: "#d5d5d5",
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
    },
    "& textarea:focus": {
      outline: "none",
    },
  },
  update: {
    position: "absolute",
    right: 0,
  },
  updateLabel: {
    fontSize: "12px",
    color: "#707070",
  },
  nameLabel: {
    fontSize: "12px",
    color: "#1825aa",
  },
})) as Function;

export default otherInfoStyle;
