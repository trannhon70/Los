import { makeStyles } from "@mui/styles";

const SpouseBasicStyle = makeStyles(() => ({
  root: {
    height: "calc(100% - 20px)",
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

export default SpouseBasicStyle;
