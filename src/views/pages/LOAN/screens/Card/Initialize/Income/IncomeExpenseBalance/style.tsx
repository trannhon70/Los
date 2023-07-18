import { makeStyles } from "@mui/styles";

const incomeExpenseBalanceStyle = makeStyles(() => ({
  root: {
    marginTop: '3px !important',

    '& .basicInfo': {
      display: "grid !important",
      gridTemplateColumns: "repeat(5, 1fr) !important",

    },
    '@media screen and (max-width: 1360px)': {
      '& .basicInfo': {
        display: "grid !important",
        gridTemplateColumns: 'none !important',
      },
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
    "& .detail-balance": {
      display: 'flex',
      alignItems: 'center',
      "& span": {
        paddingLeft: '5px',
        color: 'var(--mscb-primary)',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'uppercase',
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

})) as Function;
export default incomeExpenseBalanceStyle;
