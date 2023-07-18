import { makeStyles } from '@mui/styles';

const gListStyle = makeStyles(() => ({
  root: {
  },
  item: {
    width: '100%',
    height: '50px',
    border: '1px solid #eee'
  },
  active: {
    '& .ava-root': {
      backgroundColor: '#1825aa',
      color: '#ffffff'
    },
    '& .tex-root': {
      color: '#1825aa',
      fontWeight: 'bold'
    }
  },
  total: {
    color: 'blue',
    alignItems: 'center',
    border: '1px solid #eee',
    height: '50px',
    width: '100%',
    fontWeight: 'bold'
    // border: '1px solid #eee',
    // display: 'flex',
    // justifyContent: 'space-between'
  }
})) as Function;

export default gListStyle;