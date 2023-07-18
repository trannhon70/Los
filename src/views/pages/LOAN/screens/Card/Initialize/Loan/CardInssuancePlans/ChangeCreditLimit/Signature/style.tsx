import { makeStyles } from "@mui/styles";

const SignatureStyle = makeStyles(() => ({
  root: {
    height: 'calc(100% - 20px)',
    '& .card-inside-body': {
      paddingRight: 'unset !important',
    },
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
    "& .file-info": {
      width: "44px",
      height: "44px",
      "& img": {
        width: "100%",
        height: "100%",
      }
    }
  },
  addsign: {
    display: 'flex',
    justifyContent:'flex-end',
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

  Pointer: {
    cursor: 'pointer',
  }

})) as Function;

export default SignatureStyle;
