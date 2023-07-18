import { makeStyles } from "@mui/styles";

const CreditCardStyle = makeStyles(() => ({
  root: {
    height: '100%',
    "& .card-inside-body": {
      padding: "20px"
    },
    "& legend": {
      fontSize: "15px !important",
    },

  },
  headerTitleCard: {
    fontSize: "14px !important",
    fontWeight: "500 !important"
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
          "-webkitTextFillColor": "#fff",
        }
      }
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
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    }
  },

  infoBadge: {
    marginBottom: '0px !important',
    paddingLeft: '16px !important',
    "&>div": {
      width: '100%!important',
      flexGrow: 1,
    },
    "& .object-list-add": {
      marginLeft: "0px!important",
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

  cardInsise: {
    height: 'calc(100% - 20px) !important',
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
      'white-space': 'nowrap',
    }
  }

})) as Function;
export default CreditCardStyle;