import { makeStyles } from "@mui/styles";

const CardOutsideCustomStyle = makeStyles(() => ({
  root: {
    "& .card-out-side-label":{
      width: "235px !important"
    }
  },
  label: {
    display: 'inline-flex',
    height: '40px',
    lineHeight: '40px',
    padding: '0 21px',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.06)',
    fontSize: '16px',
    fontWeight: 500,

    backgroundColor: '#1825aa',
    color: '#fff'
  },

  
  
  extra: {
    
  },
  content: {
    padding: '21px'
  },

  SelectArea:{
    display: 'inline-flex',
    width: 'fit-content !important',
    minWidth: '260px',
    marginLeft: '4px',
    '& .MuiInputBase-input':{
      backgroundColor: '#fff !important',
      height: '38.32px !important',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      fontWeight: 500,
      color: '#1825aa',
      textTransform: 'uppercase',
      lineHeight: '40px',
      padding: '1.7px 30px 0px 21px !important',
    },
    '& .select-input':{

    }
  },

  SelectAreaAtEnd:{
    display: 'inline-flex',
    float: 'right',
    width: 'fit-content !important',
    minWidth: '335px',
    '& .MuiInputBase-input':{
      backgroundColor: '#fff !important',
      height: '38.32px !important',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      fontWeight: 500,
      color: '#1825aa',
      textTransform: 'uppercase',
      lineHeight: '40px',
      padding: '1.7px 30px 0 21px !important',
    },
    '& .select-input':{

    }
  }

})) as Function;

export default CardOutsideCustomStyle;