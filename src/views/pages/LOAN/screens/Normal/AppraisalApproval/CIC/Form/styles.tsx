import { makeStyles } from '@mui/styles';
import theme from 'app/theme';
import { SxBaseApp } from "types/app";
const tableStyles = makeStyles(() => ({
  cicHeaderTitle:{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontSize: '19px',
    '& > p':{
      marginBottom: '16px'
    }
  },
  tableHead: {
    '& .MuiTableCell-root': {
      lineHeight: 'normal !important'
    }
  },
  disabledInput: {
    '& .Mui-disabled': {
      color: '#353535',
      '-webkit-text-fill-color': 'unset!important',
      fontWeight: 500
    }
  },
  disabledSelectInput: {
    '& .MuiFormLabel-root': {
      color: '#353535 !important'
    },
    '& .mscb-input .MuiSelect-select': {
      backgroundColor: '#d7d8e4 !important'
    },
    '& .MuiSvgIcon-root': {
      display: 'none'
    },
    '& .Mui-disabled ': {
      color: theme.palette.error.main,
      '-webkit-text-fill-color': 'unset!important',
      fontWeight: 500
    }
  },
  disabledTextUpper: {
    '& .Mui-disabled': {
      textTransform: 'uppercase',
    }
  },
  disabledTextError: {
    '& .Mui-disabled': {
      color: `${theme.palette.error.main}!important`
    }
  },
  inputDateMedium: {
    '& .mscb-input input': {
      fontWeight: 500
    }
  },
  inputTextAlignEnd: {
    '& .mscb-input .MuiInput-input.MuiInputBase-input': {
      textAlign: 'end'
    }
  },
  inputTextAlignStart: {
    '& .mscb-input .MuiInput-input.MuiInputBase-input': {
      textAlign: 'start'
    }
  },
  switchLabel: {
    color: theme.palette.secondary.main,
    fontWeight: '500!important',
  },
  bankInfo: {
    display: "flex",
    alignItems: "center",
    '& .MuiAvatar-root': {
      boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
      border: 'solid 1px #eb0029',
      backgroundColor: 'var(--mscb-primary)',
      marginRight: 8
    },
    "& .image": {
      width: 32,
      height: 32,
      // border: "solid 1px #d5d5d5"
    },
    "& p": {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: "bold",
      margin: "unset",
      marginLeft: "8px"
    }
  }
}))


export default tableStyles


export const SXstyleInput: SxBaseApp = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  maxHeight: '27px',
  '& .mscb-input input': {
    backgroundColor: 'rgba(94, 191, 255, 0.14)',
  },
  '& .mscb-input .MuiInputAdornment-root': {
    backgroundColor: 'rgba(94, 191, 255, 0.14)',
    maxHeight: '27px',
  },
}
