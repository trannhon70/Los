import { makeStyles } from "@mui/styles";

const modalReviewImageStyle = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '0 !important',
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
  },
  identity_image: {
    backgroundColor:"#fff",
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "& img": {
      width: '100%',
      height: '100%'
    },
    "@media(max-width: 1100px)": {
      width: '644px',
      height: 'auto',
    }
  },
})) as Function;

export default modalReviewImageStyle;
