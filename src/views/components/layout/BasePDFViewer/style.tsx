import { makeStyles } from "@mui/styles";

const pdfViewStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    "& .own--rpv-core__viewer": {
      "& >div": {
        "& >div": {
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "20px",
            backgroundColor: "#d5d5d5",
          },
        },
      },
    },
  },

  toolbar: {
    '& .function-button': {
      minWidth: "32px",
      backgroundColor: '#f2f3f9',
      borderRadius: '0',
      boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.11)'
    },
    '& .border': {
      borderBottom: "2px solid",
      width: 'fit-content',
      color: "#1825aa",
      fontWeight: 500,
      'font-size': '14px',
    },
    '& .icon': {
      display: "flex",
      justifyContent: "flex-end"
    },
    '& .folder': {
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
  },
}));
export default pdfViewStyle;
