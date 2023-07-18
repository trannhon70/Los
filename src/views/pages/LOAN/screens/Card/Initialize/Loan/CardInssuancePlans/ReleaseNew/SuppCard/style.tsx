import { makeStyles } from '@mui/styles';

const suppCardStyle = makeStyles(() => ({
  root: {
    "& .Mui-focused": {
      color: '#353535 !important',
    },
    "& .file-img": {
      "width": '44px',
      "height": "44px",
      "background": "aqua",
      "border-radius": "1px solid #fff",
    },
    "& .file-input": {
      display: 'none',
    },
    "& .upload-icon-basic":{
      display:"flex",
      alignItems: 'end',
      justifyContent: 'flex-end',
    },
    "& .file-name":{
      fontSize:"14px",
      color:"#1825aa",
      marginLeft:"10px",
      width: '100px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: "ellipsis",
    },
    '& .file-type': {
      width: '75px',
    },
    "& .file-update":{
      display: "flex",
      flexDirection: "column",
      width: '190px',
      marginRight: '10px',

      '& span, & i': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: "ellipsis",
      }
    },
    "& .file-info":{
      width:"44px",
      height:"44px",
      "& img":{
        width:"100%",
        height:"100%",
      }
    }
  },
  labelObjectList: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0px !important',

    '& h6': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#353535',
      width: '9%',
      whiteSpace: 'nowrap',
    },

  },
  Suppcard: {
    height: 'calc(100% - 20px)',

    '& .card-inside-body': {
      padding: '20px',
    },

  },

  SuppCardSignature: {
    height: 'calc(100% - 20px)',

    '& .card-inside-body': {
      padding: '20px',
      // paddingRight: '0px !important',

      '& .scrollBar-input-file': {
        height: 'unset !important',
        minHeight: 'unset !important',
      }

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
  infoBadge: {
    display: 'flex',
    "& h6": {
      'display': 'flex',
      'align-items': 'center',
      fontWeight: '500',
      paddingLeft:'5px'
    },
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
  inputLabel: {
    "& label": {
      fontSize: "14px"
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    }
  },
  supcardobj: {
    "& .object-list-box": {
      "&.active .MuiAvatar-root": {
        border: 'none',
        backgroundColor: 'var(--mscb-primary)'
      }
    },
    "& .MuiButtonBase-root": {
      borderBottom: 'none'
    },
    "& .ObjectListLabel":{
      border:'none',
      height:'unset',
      padding:'0px',
      marginTop:'0px',
      display:'flex',
      alignItems:'center',
      fontWeight:'500',
      '& .object-list-number':{
        color:'unset',
        marginTop:'0px',
        marginLeft:'5px',
        fontSize:'14px',
        fontWeight:'500',
      },
      '& .object-list-label':{
        fontSize:'14px',
      }
    }
  },
  fileDisplayContainers: {
    width: "100%",
    "& .file-status-bar": {
      width: '100%',
      verticalAlign: 'top',
      marginTop: '10px',
      marginBottom: '20px',
      lineHeight: '25px',
      height: '50px',
      alignItems: 'center',
    
      "& .file-type-logo": {
        width: '28px',
        height: '45px',
        background: `no-repeat center center`,
        "& svg": {
          width: "100%",
          height: "100%",
        },
      },
      "& .file-remove": {
        top: '20px',
        right: '10px',
        cursor: "pointer",
        marginLeft: "auto",
      },
    },
  },
  relative: {
    position: 'relative',

    '& button': {
      position: 'absolute',
      right: '0',
      padding: '0',
      backdropFilter: 'blur(50px)',
      backgroundColor: 'rgba(246, 31, 31, 0.1)',
      width: '24px',
      height: '24px',

      '& svg': {
        color: '#f61f1f',
        fontSize: '15px',
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
    "& button":{
      display:'flex',
      'align-items': 'flex-start'
    },

  },
  Pointer: {
    cursor: 'pointer',
  },
  addsign: {
    display: 'flex',
    justifyContent:'flex-end',
    "& span": {
      width:'100px',
      fontSize:'13px',
      "text-decoration": "underline",
      "padding-left": "10px",
      "height": "20px"
    }
  },
}));

export default suppCardStyle;