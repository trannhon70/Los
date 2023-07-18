import { makeStyles } from '@mui/styles';

const uploadFileOtherStyle = makeStyles(() => ({
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
    "& .icon-filetype": {
      display: "flex",
      alignItems: "center !important",
    },
    "& .file-name-icon": {
      marginTop: "2px",
      marginLeft: "10px"
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
    },
    "& .file__type": {
      display: 'flex',
      justifyContent: 'center',
      color: "#1825aa"
    },
    "& .drop-container-basic-header": {
      "background-color": "#f2f3f9",
      padding: "10px 10px 10px 20px"
    },
    "& .card-inside-body": {
      padding: "unset"
    },
    "& .drop-container-download": {
      display: 'flex',
      justifyContent: 'flex-end',
      "align-items": "center",
      "& span": {
        color: "#1825aa",
        textDecoration: "underline",
        marginLeft: "5px"
      }
    },
    "& .drop-container-basic": {
      padding: "10px 10px 0px 20px",
    }
  },
  checkboxlabel: {
    "& .MuiTypography-root": {
      fontWeight: 500
    }
  },

  addsign: {
    cursor:"pointer",
    display: 'flex !important',
    justifyContent: 'flex-end !important',
    alignItems: "center !important",
    "& span": {
      margin: "0px 10px",
      "text-decoration": "underline",
      "border-right": "1px solid",
      "padding-right": "10px",
      "height": "20px"
    }
  },
  fileDisplayContainers: {

    width: "100%",
    "& .file-status-bar": {
      width: '100%',
      verticalAlign: 'top',
      marginBottom: '20px',
      lineHeight: '25px',
      height: '50px',
      alignItems: 'center',
      padding: "10px 30px 65px 40px",

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

export default uploadFileOtherStyle;