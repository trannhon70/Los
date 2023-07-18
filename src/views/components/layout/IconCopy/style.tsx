import { makeStyles } from "@mui/styles";

const iconStyle = makeStyles(() => ({
  IconCopy: {
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(246, 31, 31, 0.1)',
    borderRadius: '50%',
    cursor: 'pointer',
    
    '& svg': {
      fontSize: '0.8rem'
    }
  }
}));

export default iconStyle;