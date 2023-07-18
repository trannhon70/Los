import { makeStyles } from '@mui/styles';

const langStyle = makeStyles(() => ({
  '@global': {
    '.lang-code': {
      marginLeft: '8px'
    }
  },
  root: {
    '& .MuiInputBase-root': {
      borderRadius: '18px!important',
    },
    '& .mscb-flag-icon': {
      marginRight: '8px'
    },
    '& .MuiSelect-icon': {
      marginRight: 'unset !important',
    },
    '&.language': {
      '&.outlined':{
        '& .MuiSelect-select': {
          paddingRight: '30px!important',
          height: '40px!important'
        },
        '& .MuiSelect-root': {
          borderRadius: '20px!important'
        },
        '& .lang-code': {
          marginLeft: '0!important'
        },
        '& .lang-item': {
          height: '100%',
          lineHeight: '40px',

          '& .lang-sep, & .lang-name': {
            display: 'none'
          }
        }
      }
    }
  }
})) as Function;

export default langStyle;