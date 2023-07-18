import { makeStyles } from "@mui/styles";


const pdfViewStyle = makeStyles(() => ({
  root: {
    '& .function-button': {
      minWidth: "32px",
      backgroundColor: '#f2f3f9',
      borderRadius: '0',
      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.11)'
    },
  },
  border: {
    borderBottom: "2px solid",
    width: "80%"
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end"
  },
  folder: {
    display: "flex",
    alignItems: "center",
    "& span": {
      marginRight: "10px"
    },
    "& .folder-icon-text": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }


}));

export default pdfViewStyle;