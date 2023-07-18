import { makeStyles } from '@mui/styles';


const ModalConfirmStyle = makeStyles({
  root:{
    backgroundColor: '#FFFF',  
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '24px',
    border:'solid 1px #707070',
    outline: 'unset !important',
    padding: '30px 52px 36px 52px',
    textAlign: 'center',

    '& :focus':{
      outline: 'unset !important'
    },

    '& .MuiAvatar-root': {
      width: '100px',
      height: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'rgba(24, 37, 170, 0.1)',

      '& svg':{
        color: 'var(--mscb-primary)',
        fontSize: '72px',
        fontWeight: 500,
      }
    },

    '& .title':{
      paddingTop: '20px',
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 500,
      color: 'var(--mscb-primary)',
    },

    '& .decription':{
      paddingTop: '6px',
      fontFamily: 'Roboto',
      fontSize: '14px',
      color: 'var(--mscb-secondary)',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'italic'
    },

    '& .action':{
      paddingTop: '28px',

      '& button':{
        minWidth:"99px",
        height: '36px',
        padding: '10px 36px 10px 37px',
        borderRadius: 'unset',
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: '13px',
        fontWeight: 500,

        '& :focus':{
          outline: 'unset !important'
        }
      },

      '& .cancel':{
        backgroundColor: '#eb0029'
      },

      '& .success':{
        marginLeft: '18px',
        backgroundColor: 'var(--mscb-primary)'
      },

    }
  }
}) as Function;

export default ModalConfirmStyle;