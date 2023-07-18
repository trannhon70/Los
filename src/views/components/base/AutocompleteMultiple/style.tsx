import { makeStyles } from "@mui/styles";

const AutocompleteMultipleStyles = makeStyles(() => ({
  root: {
    "& .css-wb57ya-MuiFormControl-root-MuiTextField-root": {
      "& .css-vec12z-MuiInputBase-root-MuiOutlinedInput-root": {
        "& .css-1q60rmi-MuiAutocomplete-endAdornment": {
          "& .MuiButtonBase-root": {
            marginRight: "0px !important",
          },
        },
      },
    },

    "& .MuiAutocomplete-tag": {
      margin: "5px 5px 4px 10px !important",
      borderRadius: "unset",
      height: "36px",
      backgroundColor: "#fff",

      "& span": {
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: 500,
        color: "#070c46",
        backgroundColor: "#fff",
      },

      "& svg": {
        fontSize: "16px",
        color: "#747792",
      },
    },
    "& .Mui-disabled":{
      backgroundColor:"#d7d8e4!important",
      "& input":{
        backgroundColor: "unset !important"
      },
      "& .MuiAutocomplete-tag":{
        backgroundColor: "#fff !important"

      }
    }
  },
})) as Function;

export default AutocompleteMultipleStyles;
