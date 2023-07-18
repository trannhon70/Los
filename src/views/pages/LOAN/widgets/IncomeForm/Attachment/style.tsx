import { makeStyles } from "@mui/styles";

const attachmentStyleIncome = makeStyles(() => ({
  downloadMulti: {
    cursor: 'pointer',
    opacity: '1'
  },
  disabledDownloadMulti: {
   cursor: 'not-allowed',
   opacity: '0.5',
   pointerEvents: 'none'
  },
}));
export default attachmentStyleIncome;