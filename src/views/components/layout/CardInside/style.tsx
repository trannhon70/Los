import { makeStyles } from "@mui/styles";

const cardStyle = makeStyles(() => ({

  CardInside: {
    marginTop:20,
    // minHeight:434,
    position: 'relative',
    borderBottom:'1px solid #d5d5d5',
    '& .card-inside-body': {
      
      padding: '20px 20px 0px 0px'
    },

    '& > fieldset': {
      position: 'absolute',
      top:'-10px',
      left:'0',
      right:'0',
      bottom:'0',
      border: '1px solid #d5d5d5',
      overflow: 'hidden',
      margin: 0,
      padding: '0 14px',
      pointerEvents: 'none',

      '& legend': {
        color: '#071180',
        fontWeight:'500',
        height: '20px',
        fontSize: '14px',
        padding: '0 7px',
        lineHeight: '20px'
      }
    },
    '&.empty-title': {
      '&>fieldset':{
        top: 0
      }
    }

  }

}));

export default cardStyle;
