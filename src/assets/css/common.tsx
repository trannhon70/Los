import { makeStyles } from "@mui/styles";

const commonStyle = makeStyles(() => ({
  "@global": {
    '*::-webkit-scrollbar': {
      width: '6px',
      // borderRadius: '5px',

      position: 'absolute',
      marginTop: '60px',
      marginRight: '5px',
      right: '5px'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      // position: 'absolute',
      // marginTop: '40px',
      // marginRight: '5px',
      // right: '5px'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.15)',
      borderRadius: '4px',
      cursor: 'pointer',
      // marginRight: '5px',
      // right: '5px'
    },
    "body, #root": {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      color: 'var(--mscb-secondary)',
      fontSize: 'var(--mscb-fontsize)',
      backgroundColor: 'var(--mscb-gray)',

    },
    // CSS SELECT
    ".MuiList-root":{
      maxHeight:"40vh !important",
    },
    ".wh-full": {
      width: "100%",
      height: "100%"
    },
    ".w-full": {
      width: "100%"
    },
    '.shadow': {
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)'
    },
    '.rounded-0': {
      borderRadius: '0!important'
    },
    '.border-top-1': {
      borderTop: '1px solid var(--mscb-gray)'
    },
    '.MuiFormHelperText-root': {
      marginLeft: '0!important',
      color: 'var(--mscb-danger)!important'
    },
    '.underline': {
      textDecoration: 'underline'
    }
  }
})) as Function;

export default commonStyle;
