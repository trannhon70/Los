import { makeStyles } from '@mui/styles';

const uploadFileInComeStyle = makeStyles(() => ({
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
    "& .file-name": {
      fontSize: "14px",
      color: "#1825aa",
    },
    "& .icon-filetype":{
      display:"flex",
      alignItems: "center !important",
      paddingTop: "6px",
    },
    "& .file-update": {
      "display": "flex",
      "flex-direction": "column",
      "& .file-name": {
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        width: "180px",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical"
      },
    },
    "& .file-info": {
      width: "44px",
      height: "44px",
      "& img": {
        width: "100%",
        height: "100%",
      }
    },
    "& .action-file": {
      display: 'flex',
      justifyContent: 'flex-end',
      cursor: 'pointer',
      "& span:first-child": {
        marginRight: "10px"
      }
    },
    "& .file__type": {
      display: 'flex',
      justifyContent: 'center',
      color: "#1825aa"
    },
    "& .drop-container-basic-header": {
      "background-color": "#f2f3f9",
      padding: "10px 10px 10px 20px",
      '& .select-all-checkbox': {
        '& span.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label': {
          fontSize: '14px',
          color: 'var(--mscb-secondary)',
        },
      },
    },
    "& .card-inside-body": {
      padding: "unset"
    },
    "& .drop-container-download": {
      display: 'flex',
      paddingRight:"15px",
      justifyContent: 'flex-end',
      "align-items": "center",
      "& span": {
        color: "#1825aa",
        textDecoration: "underline",
        marginLeft: "5px",
        fontSize: '13px',
      }
    },
    "& .drop-container-basic": {
      padding: "10px 10px 0px 20px"
    }
  },
  checkboxlabel: {
    "& .MuiTypography-root": {
      fontWeight: 500,
      fontSize: '14px',
      color: 'var(--mscb-secondary)',
    },
  },

  addsign: {
    paddingRight:"10px",
    cursor:"pointer",
    display: 'flex !important',
    justifyContent: 'flex-end !important',
    alignItems: "center !important",
    "& span": {
      marginLeft: "5px",
      marginRight: "10px",
      "text-decoration": "underline",
      "border-right": "1px solid",
      "padding-right": "10px",
      "height": "20px",
      fontSize: '13px',
    },
    "& svg": {
      "& path": {
        stroke: 'var(--mscb-primary)',
      },
    },
  },
  fileDisplayContainers: {

    width: "100%",
    "& .file-status-bar": {
      width: '100%',
      verticalAlign: 'top',
      lineHeight: '25px',
      paddingRight: '20px',
      paddingLeft: '10px',
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
}));

export default uploadFileInComeStyle;