import { makeStyles } from "@mui/styles";

const ChangeCreditLimitStyles = makeStyles(() => ({
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

  titleCard: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#1825aa',
    marginLeft: '5px',
  },

  CardInfo: {
    height: "calc(100% - 20px)",
    '& .card-inside-body': {
      padding: '20px',
    }

  },
  inputLabel: {
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    },
    '& .MuiFormControl-root': {
      "& .MuiFormControlLabel-label": {
        fontSize: '13px',
      },
      "& .Mui-focused": {
        color: 'var(--mscb-black) !important',
      },
      '& label': {
        fontSize: "14px !important",
      }
    },
    '& .MuiFormGroup-root': {
      '& .MuiFormControlLabel-root': {
        '& .MuiTypography-root': {
          fontSize: '13px',
        }
      }
    }
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
    }
  },
})) as Function;
export default ChangeCreditLimitStyles