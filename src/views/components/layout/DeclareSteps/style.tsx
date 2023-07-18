import { makeStyles } from "@mui/styles";

const labelStyle = makeStyles(() => ({
  stepLabel: {
    "& img": {
      paddingRight: 5,
      maxWidth: 18,
      minHeight:12
    },
    "& .title-p": {
      display: "inline-block",
      fontSize: '12px',
      textDecoration: 'underline'
    }
  },
  stepLabelText: {
    whiteSpace: 'nowrap'
  }
}));

export default labelStyle;
