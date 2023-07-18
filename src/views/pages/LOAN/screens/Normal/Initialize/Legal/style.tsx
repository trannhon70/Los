import { SxProps, Theme } from '@mui/system';
import { SxBaseApp } from 'types/app';

export const SxSteps: SxProps<Theme> = {
  '&.mscb-loan-normal-legal': {
    '& .MuiTab-root': {
      opacity: "unset !important",
      pointerEvents: "unset !important",
    },
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ': {
        justifyContent: 'center'
      },

      '& .MuiFormLabel-root': {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    }
  }
};

// export const SxSelectDisiable: SxBaseApp = {
//   "& .Mui-disabled":{
//     "& .MuiInput-input":{
//       fontWeight: "500",
//       backgroundColor: "#d7d8e4 !important"
//     }
//   }
// }
export const SxSelectDisabled: SxBaseApp = {
  "& .MuiFormHelperText-root.Mui-disabled":{
    WebkitTextFillColor: 'var(--mscb-danger)',
  },
  "& .Mui-disabled": {
    WebkitTextFillColor: 'var(--mscb-disable)',
    "& .MuiInput-input": {
      backgroundColor: "#d7d8e4 !important",
      color: "#353535",
      fontWeight: 500
    }
  }
}

export const SxDateDisabled: SxBaseApp = {
  "& .Mui-disabled": {
    WebkitTextFillColor: 'var(--mscb-disable)',
    fontWeight: 500,
    "& .MuiInput-input": {
      backgroundColor: "#d7d8e4 !important",
      color: "#353535",
    }
  }
}
export const SxTextAreaDisabled: SxBaseApp = {
  "& .Mui-disabled": {
    WebkitTextFillColor: 'var(--mscb-disable)',
    fontWeight: 500,
    "& .MuiInput-input": {
      backgroundColor: "#d7d8e4 !important",
      color: "#353535",
    }
  }
}

export const SxAutoCompleteDisabled: SxBaseApp = {
  "& .MuiAutocomplete-option": {
    fontSize: "10px !important"
  },
  '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
    padding: '0 30px 0 12px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  '& .MuiAutocomplete-endAdornment': {
    pr: '9px',
    top: 'unset !important',
      '& .MuiAutocomplete-popupIndicator': {
      '& .Mui-disabled': {
        bgcolor: 'transparent!important'
      }
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px'
    }
  },
  '& .MuiAutocomplete-clearIndicator': {
    bgcolor: '#f2f3f9',
    '&:hover': {
      bgcolor: '#f2f3f9',
    }
  },
  "& .Mui-disabled": {
    WebkitTextFillColor: 'var(--mscb-disable) !important',
    color: "#353535 !important",
    fontWeight: "500 !important",
    "& .MuiInput-input": {
      backgroundColor: "#d7d8e4 !important",
      color: "#353535 !important",
      fontWeight: "500 !important",
    }
  }
}

export const SxTextDisiable: SxBaseApp = {
  "& .Mui-disabled": {
    "& .MuiInput-input": {
      backgroundColor: "#d7d8e4 !important"
    }
  }
}

export const SxTextAreaNote: SxBaseApp = {
  "& textarea": {
    height: "100px !important",
    // padding: 10,
    overflowY: "scroll!important ",
    overflowX: "hidden!important",
    marginBottom: "23px!important",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    border: "none",
    resize: "none",
    fontSize: "14px",
    "background-color": "#f2f3f9",
    "padding": "10px",
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
}

export const sxCardInsideOther: SxBaseApp = {
  height: "calc(100% - 20px)",

  "& .card-inside-body": {
    padding: "20px",
  },

  "& legend": {
    fontSize: "16px !important",
  },
}

export const sxObjectList: SxBaseApp = {
  '& .MuiButtonBase-root': {
    marginLeft: '14px!important',
  },
  '& .object-list-label-container': {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'transparent',
    marginTop: 'unset !important',
    paddingLeft: 'unset !important',
    color: '#1e1d27',
    paddingRight: '5px',
    '& .object-list-label': {
      textDecoration: 'underline',
    },
    '& .object-list-number': {
      mt: 0,
      fontSize: 'var(--mscb-fontsize)',
      color: '#1e1d27',
      fontWeight: 400,
      textDecoration: 'underline',
    }
  },
  '& .object-list-box': {
    flexDirection: 'row',
    width: '215px',
    justifyContent: 'flex-start',
    border: '1px solid #707070',
    pt: 0,
    px: 2,
    marginLeft: 0,
    '& div:last-child': {
      marginLeft: "57px",
      marginBottom: "13px"
    },
    '& .object-list-box-name': {
      '& div:last-child':{
        marginLeft:"0px !important",
        marginBottom:"0px !important"
      },
    },
  },
  '& .object-list-box-name': {
    ml: 2,
    marginBottom: "18px"
  },
  '& .Mui-selected': {
    '& .object-list-box': {
      borderColor: 'var(--mscb-danger)'
    }
  },

  '& .object-list-add': {
    marginLeft: '14px', 
    maxWidth: '215px',
    minWidth: '215px',
    justifyContent: 'center',
    '& .object-list-box': {
      width: '100%',
      justifyContent: 'center',
      borderColor: 'var(--mscb-primary)',
    },
    '& .object-list-box-name': {
      display: 'none'
    },
    '& .object-list-circle': {
      backgroundColor: 'transparent!important',
      borderColor: 'transparent!important',
      '& svg': {
        color: 'var(--mscb-primary)'
      }
    }
  }
}