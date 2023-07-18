import { makeStyles } from "@mui/styles";

const CreditCardStyle = makeStyles(() => ({
  root: {
    height: '100%',
    "& .card-inside-body": {
      padding: "0px"
    },
    "& legend": {
      fontSize: "14px !important",
    },

  },
  headerTitleCard: {
    fontSize: "14px !important",
    fontWeight: "500 !important",
    color: '#353535'
  },

  inputTotal: {
    // marginBottom: "16px !important",
    "& label": {
      fontFamily: "Roboto",
      fontSize: "var(--text-14)",
      fontWeight: "500",
      textAlign: "left",
      color: "var(--mscb-secondary)",
    },
    "& div": {
      "& div": {
        maxWidth: "227px",
        "& input.MuiInput-input.Mui-disabled": {
          backgroundColor: "#f61f1f !important",
          WebkitTextFillColor: "#fff",
        }
      }
    }
  },
  item:{
    alignItems: 'flex-start',
    padding: '12px  12px 0px 12px',
    '& .MuiFormHelperText-root': {
      position: 'relative',
      bottom: '0px',
      margin: "3px 0px 0px"
    },
    '& .error':{
      marginBottom: '5px!important'
    }
  },
  inputLabelLastUpdateDate: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
   
    "& label": {
      fontSize: "14px",
      fontWeight: "500",
    },
    "& span": {
      position: "absolute",
      fontSize: "12px",
      fontWeight: "500",
      fontStretch: "normal",
      fontStyle: "italic",
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    }
  },

  inputLabel: {
    "& label": {
      fontSize: "14px",
      fontWeight: "500",
      color: "#353535",
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    }
  },
  textArea:{
    "& textarea":{
      minHeight: '165px!important',
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      // marginBottom: 5
    } 
  },
  infoBadge: {
    marginBottom: '0px !important',
    "&>div": {
      width: '100%!important',
      flexGrow: 1,
    },
    "& .object-list-add": {
      marginLeft: "0px!important",
      "& .object-list-box": {
        minWidth: 'unset',
        "&.active .MuiAvatar-root": {
          border: 'none',
          backgroundColor: '#1825aa30!important',
        },
        "& .object-list-circle": {
          color: 'var(--mscb-primary)',
        }
      },
    },
    "& .object-list-box:hover .object-list-circle": {
      border: "none!important",
      backgroundColor: 'var(--mscb-primary)',
      color: '#fff'
    },
    '& .MuiTabs-root': {
      width: '100%',
      border: 'none !important',
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between !important",

    },
    '& .object-list-box-name': {
      textDecoration: 'none !important',
      width: "100%",
      color: "#353535",
      '& .text-secondary.font-normal': {
        fontSize: '10px',
      }
    },
    "& .object-list-box": {
      minWidth: 'unset',
      padding:'0px',
      "&.active .MuiAvatar-root": {
        border: 'none',
        color: '#fff',
        backgroundColor: 'var(--mscb-primary)',
      },
      "& .object-list-circle": {
        color: '#707070',
        width: 50,
        height: 50,
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

  cardInsise: {
    height: 'calc(100% - 20px) !important',
    borderBottom: 'unset !important',
    marginTop: 24
  },
  amountTitle: {
    display: 'flex',

    "& .amount-label": {
      height: "36px",
      display: "flex",
      alignItems: "center",
      border: "0.5px solid #eb0029",
      justifyContent: "center",
      fontWeight: "500",
      fontSize: "14px",
      padding: "5px 8px",
      color:"#eb0029",
      whiteSpace: 'nowrap',
    }
  },
  addObjectDisabled:{
    "& .object-list-add": {
      "& .object-list-box": {
        "&.active .MuiAvatar-root": {
          opacity: 0.5
        },
      },
    },
  }
})) as Function;
export default CreditCardStyle;