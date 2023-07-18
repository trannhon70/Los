import { makeStyles } from "@mui/styles";

const pagingStyle = makeStyles(() => ({
  root: {

  },
  label: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  limit: {
    width: '72px',
    marginRight: '25px!important'
  },
  current: {
    // width: '36px',
    margin: '0 10px!important',
    textAlign: 'center',
    transition: 'all ease 0.3s'
  },
  total: {
    marginRight: '10px'
  },
  button: {
    width: '36px',
    minWidth: '36px!important',
    border: '1px solid #d5d5d5!important',
    borderRadius: '0!important',
    padding: '0!important',

    '& svg': {
      fontSize: '18px'
    }
  }
}));

export default pagingStyle;