import { makeStyles } from '@mui/styles';

const dropdownStyle = makeStyles(() => ({
  MenuIcon: {
    backgroundColor: 'rgba(17, 28, 139, 0.05)!important',
    color: 'var(--mscb-primary)',
    '& svg': {
      color: 'var(--mscb-primary)',
      fontSize: '30px'
    }
  },
  IconButton: {
    position: 'relative'
  },
  Counter: {
    position: 'absolute',
    backgroundColor: 'var(--mscb-danger)',
    color: '#fff',
    fontSize: '10px',
    display: 'inline-block',
    width: '14px',
    height: '14px',
    textAlign: 'center',
    lineHeight: '14px',
    borderRadius: '50%',
    top: '2px',
    right: '5px'
  }
}));

export default dropdownStyle;