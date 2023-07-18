import { makeStyles } from "@mui/styles";

const GiftsInfoStyle = makeStyles(() => ({
  root: {
      
  },

  inputLabel:{
    "& label":{
      fontSize:"14px",
      color: 'var(--mscb-secondary)',
      fontWeight: '500',
    },
    "& .MuiInput-root":{
      "& svg":{
        marginRight:"8px"
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
    '&.line-contact': {
      '&::before': {
        content: '""',
        width: '15px',
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
        top: '50%',
        left: '-11%',
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

  GiftsInfo: {
    // height: 'calc(100% - 20px)',

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
        marginRight:'30px',
        '& .MuiTypography-root': {
          fontSize: '13px',
          color: 'var(--mscb-secondary)',
          // whiteSpace: 'nowrap',
        }
      }
    },
  },
  radioBoxSelectGift: {
    display: 'flex',
    '& .MuiFormControl-root': {
      '& .MuiFormControlLabel-root': {
        width:'50%',
        marginRight:'0px',
        '& .MuiTypography-root': {
          fontSize: '13px',
          color: 'var(--mscb-secondary)',
          // whiteSpace: 'nowrap',
        }
      }
    },
  },

})) as Function;

export default GiftsInfoStyle;
