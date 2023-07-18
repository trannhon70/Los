import { makeStyles } from "@mui/styles";

const categoryStyle = makeStyles(() => ({
  root: {
    height: "100%",
    "& .container": {
      height: "700px",
    },
    "& .MuiTreeItem-content": {
      backgroundColor: "unset !important",
      paddingLeft: "25px",
      borderBottom: "1px solid #9ea7ff",
      paddingBottom: "10px",
      "& .MuiTreeItem-content.Mui-expanded.Mui-selected": {
        backgroundColor: "unset !important"
      }
    },
    "& .MuiTreeItem-label": {
      paddingLeft: "20px !important",
      color: "#1825aa",
      marginTop: "10px",
      fontWeight: "500 !important"
    },
    "& .MuiFormGroup-row": {
      flexDirection: 'column'
    },
    "& .MuiFormControlLabel-root": {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& .totalApproved': {
      borderTop: 'solid 1px #eee',
      marginTop: '60px',
      fontSize: '16px',
      paddingTop: '10px',
      textAlign: 'inherit',
    },
    '& .boxResult': {
      border: '1px solid #eb0029',
      display: 'block',
      color: '#eb0029',
      width: 'fit-content',
      paddingLeft: '30px',
      paddingRight: '4px',
      height: '21px',
      fontSize: '16px',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.31',
      letterSpacing: 'normal',
      textAlign: 'left',
      marginLeft: 'auto',
      marginTop: '8px'
    },

  }
})) as Function;

export default categoryStyle;