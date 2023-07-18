import { makeStyles } from "@mui/styles";

const AbilityRepayingStyles = makeStyles(() => ({
  inputLabel: {
    '& .MuiFormControl-root': {
      "& .MuiFormControlLabel-label": {
        fontSize: '14px',
      },
      "& .Mui-focused": {
        color: 'var(--mscb-black) !important',
      },
      '& label': {
        fontSize: "14px !important",
      }
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    },
  },
  inputRed: {
    "& input:disabled": {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: '500',
      color: "var(--mscb-danger) !important",
      WebkitTextFillColor: 'unset !important'
    }
  },

  textArea: {
    "& textarea": {
      height: "100px !important",
      overflowY: "scroll!important ",
      overflowX: "hidden!important",

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

  title: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#1825aa',
    marginLeft: '5px',
  },
})) as Function;
export default AbilityRepayingStyles