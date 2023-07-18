import { makeStyles } from "@mui/styles";

const NormalLoanStyle = makeStyles(() => ({
  root: {
    "& .card-inside-body": {
      padding: "0px"
    },
    "& legend": {
      fontSize: "14px !important",
    },

  },
  inputTotal: {
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
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      minHeight: '80px!important',
      marginBottom: 5
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
      color: '#fff'
    },
    "& .object-list-box:hover .object-list-circle": {
      border: "none!important",
      backgroundColor: 'var(--mscb-primary)',
      color: '#fff'
    },
    "& .object-list-box": {
      minWidth: 'unset',
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
  },
  termSelect: {
    width: '100%!important',
    marginTop: 12,
    marginBottom: 24,
    "&>div": {
      width: '100%!important',
      flexGrow: 1,
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
    },
    '& .object-list-box':{
      padding:'0px'
    },
    '& svg': {
      right: '14px !important',
    },
    '& .object-list-circle':{
      width: 50,
      height: 50,
    }
  },

  cardInside: {
    height: 'calc(100% - 20px) !important',
    marginTop: 24,
    borderBottom: 'unset !important',
  },

  headerTitleCard: {
    color: '#353535'
  }
})) as Function;
export default NormalLoanStyle;