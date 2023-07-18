import { makeStyles } from "@mui/styles";

const OtherIncomeStyle = makeStyles(() => ({
  root: {
    "& .title-salary": {
      display: 'flex',
      alignItems: 'center',
    },
    "& .input-red": {
      "& input": {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '500',
        color: "var(--mscb-danger) !important",
        WebkitTextFillColor: 'unset !important'
      }
    },
  },

  inputLabel: {
    "& label": {
      fontSize: "14px",
      color: 'var(--mscb-secondary)',
      fontWeight: '500',
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    },
    '&.line': {
      '&::before': {
        content: '""',
        width: '20px',
        height: '1px',
        backgroundColor: 'black',
        position: 'absolute',
        top: '77%',
        left: '0%',
      }
    },
    '&.other-line': {
      '&::before': {
        content: '""',
        width: '20px',
        height: '1px',
        backgroundColor: '#707070',
        position: 'absolute',
        top: '40%',
        left: '-8%',
      }
    },
    '& .checkbox-card-holder': {
      '& .MuiFormControlLabel-root': {
        width: '33.3%',
        marginRight: '0px',

        '& .MuiTypography-root': {
          fontSize: '13px',
        }

      }
    },
  },
  title: {
    paddingLeft: '5px',
    color: 'var(--mscb-primary)',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  groupListIncome: {
    '& ul.MuiList-root.MuiList-padding': {
      '& li.MuiListItem-root': {
        marginBottom: '1px',
        backgroundColor: 'transparent',
      }
    }
  }
})) as Function;

export default OtherIncomeStyle;
