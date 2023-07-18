import { makeStyles } from "@mui/styles";

const emptyStyle = makeStyles(() => ({
  root: {
    color: '#707070',
    fontSize: '16px',
    // fontStyle: 'italic',

    '& img': {
      marginBottom: '14px'
    }
  }
})) as Function;

export default emptyStyle;