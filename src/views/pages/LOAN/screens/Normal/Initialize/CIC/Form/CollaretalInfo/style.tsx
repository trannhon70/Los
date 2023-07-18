import { makeStyles } from "@mui/styles";

const collaretalInfoStyle = makeStyles(() => ({
  root: {
    height: 'calc(100% - 20px)',
    "& .card-inside-body": {
      padding: "0px"
    },
    "& legend": {
      fontSize: "14px !important",
    },

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
  collaretalObjList: {
    "& .object-list-add": {
      marginLeft: "6px!important",
      "& .object-list-box": {
        "&.active .MuiAvatar-root": {
          border: 'none',
          backgroundColor: '#1825aa30!important',
        },
        "& .object-list-circle": {
          color: 'var(--mscb-primary)',
        }
      },
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
      minWidth: 'unset',
      padding:'0px',
      "& .object-list-circle": {
        width: 50,
        height: 50
      },
      "&.active .MuiAvatar-root": {
        border: 'none',
        backgroundColor: 'var(--mscb-primary)'
      }
    },
    "& .MuiButtonBase-root": {
      borderBottom: 'none'
    },
    "& button":{
      display:'flex',
      'align-items': 'flex-start'
    },
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
  infoBadge: {
    marginBottom: '0px !important',
    '& h6': {
      textTransform: 'capitalize',
    },
    "& .object-list-box.active .object-list-circle": {
      border: "none!important",
      backgroundColor: 'var(--mscb-primary)',
      '& svg': {
        color: '#1825aa !important'
      }
    },
    "& .object-list-box": {
      "& .object-list-circle": {
        color: '#707070',
      }
    },
    '& .object-list-box-name': {
      textDecoration: 'none !important',
      width: "100%",
      color: "#353535",
      '& .text-secondary.font-normal': {
        fontSize: '10px',
      }
    },
    "& .object-list-box:hover .object-list-circle": {
      border: "none!important",
      backgroundColor: 'var(--mscb-primary)',
      color: '#fff'
    },
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
  cardInside: {
    height: 'calc(100% - 20px) !important',
    borderBottom: 'unset !important',
    marginTop: 24
  },
  headerTitleCard: {
    color: '#353535'
  },
  addObjectDisabled:{
    '& .object-list-box':{
      minWidth: 'unset'
    },
    "& .object-list-add": {
      "& .object-list-box": {
        "&.active .MuiAvatar-root": {
          opacity: 0.5
        },
      },
    },
  }
})) as Function;

export default collaretalInfoStyle;