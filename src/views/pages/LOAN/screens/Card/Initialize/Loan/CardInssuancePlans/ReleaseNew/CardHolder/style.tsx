import { makeStyles } from "@mui/styles";

const CardHolderStyle = makeStyles(() => ({
  root: {

  },

  collaretalObjList: {
    marginLeft: '16px',

    "& .object-list-add": {
      marginLeft: "6px!important",
    },
    '& .MuiTabs-root': {
      width: '100%',
      border: 'none !important',
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    '& .object-list-box-name': {
      textDecoration: 'none !important',
      width: "100%",
      '& .text-secondary.font-normal': {
        fontSize: '10px',
      }
    },
    "& .object-list-box": {
      "&.active .MuiAvatar-root": {
        border: 'none',
        backgroundColor: 'var(--mscb-primary)'
      }
    },
    "& .MuiButtonBase-root": {
      borderBottom: 'none'
    },
    "& button": {
      display: 'flex',
      'align-items': 'flex-start'
    },


  },
  labelRadio: {
    "& .mscb-radio-base": {
      "& label": {
        marginBottom: "0px"
      },
      "& .MuiFormGroup-root":{
        "& .MuiFormControlLabel-root":{
          "& .MuiFormControlLabel-label":{
            fontSize:"13px"
          }
        }
      }
    }
  },

  inputLabel: {
    "& label": {
      fontSize: "14px",
      color: 'var(--mscb-secondary)',
      fontWeight: '500',
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    },
    '&.line': {
      '&::before': {
        content: '""',
        width: '20px',
        height: '1px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '77%',
        left: '0%',
      }
    },
    '&.other-line': {
      '&::before': {
        content: '""',
        width: '20px',
        height: '1px',
        backgroundColor: '#707070',
        position: 'absolute',
        top: '40%',
        left: '-8%',
      }
    },
    '& .checkbox-card-holder': {
      '& .MuiFormControlLabel-root': {
        width: '33.3%',
        marginRight: '0px',

        '& .MuiTypography-root': {
          fontSize: '13px',
        }

      }
    }
  },

  labelObjectList: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0px !important',

    '& .MuiGrid-root': {
      display: 'flex',
      flexWrap: 'nowrap',
    },

    '& h6': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#353535',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
    },

  },

  CardInfo: {

    '& .card-inside-body': {
      padding: '20px',
    }

  },

  inputGroup: {
    display: 'flex',

    '& h6': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 20px 5px 0px',
      height: '36px',
      whiteSpace: 'nowrap',
    }
  },

  radioBoxSelect: {
    display: 'flex',

    '& .MuiFormControl-root': {
      '& .MuiFormControlLabel-root': {
        '& .MuiTypography-root': {
          fontSize: '13px',
          color: 'var(--mscb-secondary)',
          whiteSpace: 'nowrap',
        }
      }
    },

    '& .other': {
      width: '90px',

      '& .MuiFormGroup-root': {
        height: '100%',
        alignItems: 'flex-end',

        '& .MuiFormControlLabel-root': {
          marginBottom: 0,
        }

      }

    },

    '& .scb': {
      width: '210px',
    },
  },

})) as Function;

export default CardHolderStyle;
