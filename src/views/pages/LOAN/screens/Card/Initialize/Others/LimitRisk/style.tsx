import { makeStyles } from "@mui/styles";

const LimitRiskStyle = makeStyles(() => ({
  root: {
    '& .card-inline': {
      height: 'calc(100% - 20px)',
    },

    '& fieldset': {
      '& legend': {
        fontSize: '16px',
      }
    },
    '& .card-inside-body': {
      padding: '20px',
    },
    "& .MuiFormControl-root": {
      '& label': {
        fontSize: 'var(--mscb-fontsize) !important',
        marginBottom: '0px',
        lineHeight: 'normal',
        marginRight: '100px',
      },
      '& .MuiFormControl-root.MuiTextField-root': {
        marginTop: '8px',
      },
      "& .Mui-focused": {
        color: 'var(--mscb-black) !important',
      },
      "& .MuiFormControlLabel-label": {
        fontSize: '13px',
      },
      "& svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium": {
        fontSize: '22px',
      }
    }

  },
  textArea: {
    "& label": {
      fontSize: "14px",
      marginBottom: "5px !important",
    },
    "& textarea": {
      height: '100px !important',
      padding: 10,
      overflowY: "scroll!important",
      overflowX: "hidden!important",
      marginBottom: "0px!important",
      border: "none",
      resize: "none",
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontSize: '14px'
    },
    "& textarea::-webkit-scrollbar": {
      width: '5px',
      "border-radius": "50px"
    },
    "& textarea::-webkit-scrollbar-thumb": {
      'background': '#d5d5d5',
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)"
    },
    "& textarea:focus": {
      outline: "none"
    }
  },
  buttonAddRisk: {
    paddingLeft: '20px',
    width: '75% !important',
    fontSize: '14px !important',
    color: '#1825aa !important',
    marginLeft: '44px !important',
    borderRadius: 'unset !important',
    boxShadow: ' 0 3px 6px 0 rgba(24, 37, 170, 0.2)',
    marginTop: '0px !important',
    "& .MuiButton-startIcon": {
      "& svg": {
        fontSize: '16px',
      }
    }
  },

  cardInputDe: {
    '& .MuiTextField-root': {
      width: '98%'
    },
  },
  cardbtn: {
    paddingRight: '15px',
    marginTop: '10px',
    marginLeft: '-10px',
    '& svg': {
      color: 'var(--mscb-primary)',
      cursor: 'pointer',
      fontSize: '21px!important',

    }
  },
  cardRad: {
    '& label': {
      paddingRight: '95px',
      fontSize: '14px'
    },
    '& span': {
      fontSize: 'unset'
    }
  },
  inlineBottom: {
    height: '2px',
    width: '96.5%',
    marginLeft: '2%',
    background: '#d8d8d8',
    right: '0',
    marginTop: '20px'
},

})) as Function;

export default LimitRiskStyle;