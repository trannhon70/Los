import { makeStyles } from "@mui/styles";

const ReviewDetailInfoStyles = makeStyles(() => ({
  root: {
    "& .title": {
      fontSize: "19px",
      fontWeight: "bold",
      color: "var(--mscb-primary)",
      marginTop: "25px",
      marginBottom: "16px",
      textTransform: 'uppercase',
      '& span': {
        color: "var(--mscb-secondary)",
      }
    },
    '& .text-lowercase': {
      textTransform: 'lowercase'
    },
    '& .fw-normal': {
      fontWeight: "normal"
    }
  },
  table: {
    borderRadius: '0',
    '& thead': {
      '& th': {
        border: "solid 1px var(--mscb-secondary)",
        paddingTop: '5px',
        paddingBottom: '5px',
        color: 'var(--mscb-primary)',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        height: "42px"
      }
    },

    '& tbody': {
      '& th': {
        borderBottom: "solid 1px var(--mscb-secondary)",
        paddingTop: '10px',
        paddingBottom: '10px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        backgroundColor: "#1825aa",
        height: "42px",
      },
      '& td': {
        paddingTop: '5px',
        paddingBottom: '5px',
        border: "solid 1px var(--mscb-secondary)",
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--mscb-secondary)',
        fontFamily: 'Roboto',
        height: "42px",
        overflowWrap: 'break-word',
      },
      "& .danger": {
        color: '#fff',
        backgroundColor: '#f61f1f'
      },
      "& .text-danger": {
        color: "#f61f1f",
        fontWeight: 'bold'
      },
      "& .dept-group": {
        minHeight: "30px",
        alignItems: "center",
        "& p": {
          margin: "unset"
        },
        "& input": {
          textAlign: "center !important",
          height: "30px !important"
        }
      },
      "& .bank-info": {
        display: "flex",
        alignItems: "center",
        '& .MuiAvatar-root': {
          boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
          border: 'solid 1px #eb0029',
          backgroundColor: 'var(--mscb-primary)',
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
    }
  },
  inputLabel: {
    "& label": {
      fontSize: "14px"
    },
    "& .MuiInput-root": {
      "& svg": {
        marginRight: "8px"
      }
    },
    "& .currency-amount": {
      "& input": {
        WebkitTextFillColor: "red",
        fontWeight: 500
      }
    }
  }
})) as Function;
export default ReviewDetailInfoStyles;