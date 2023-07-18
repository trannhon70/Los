import { makeStyles } from "@mui/styles";

const ratingsReviewStyles = makeStyles(() => ({
  root: {
    '& .css-control': {
      width: '100%',
      '& span': {
        fontFamily: 'Roboto',
        fontSize: '18px',
        fontWeight: '500',
        color: '#353535',
      }
    },

    '& .control-number': {
      textAlign: 'left',
    },

    '& .control-label': {
      paddingLeft: '21px'
    },
    '& .hr-style': {
      marginTop: '14px',
      marginBottom:'0px',
      border: 'solid 1px #707070b8',
    },
    "& .type-person": {
      "& span": {
        fontSize: '16px',
        fontWeight: '500',
        marginRight: '34px',
      },
    },
    "& .info-cic": {
      flexWrap: 'nowrap',

      "& .cic-stt": {
        fontSize: '16px',
        fontWeight: '500',
        marginRight: '36px',
      },
      "& .cic-title": {
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--mscb-primary)'
      },
      "& .cic-customer": {
        marginLeft: '44px'
      },
      "& .buttonReview": {
        marginTop: '15px',
        marginLeft: '44px',
        width: '185px',
        borderRadius: 'unset !important',
        textTransform: 'initial',
        boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)',
        // "& span": {
        //   margin: '0px 2px 0px 6px'
        // },
        "& svg": {
          height: '16px',
          width: '16px',
        },

      },

    },

    '@media screen and (max-width: 1400px)': {
      '& .info-cic': {
        flexWrap: 'wrap',
      }
    },
    '& .colorWhite':{
      "& .Mui-disabled": {
        height: '30px',
        width: '357px',
        paddingLeft: '17px',
        backgroundColor: 'var(--mscb-primary)!important',
        WebkitTextFillColor: "var(--mscb-white)!important",
        fontWeight: 500,
        fontSize:'16px !important'
      },
    }
    

  },


  colorWhite: {
    "& .Mui-disabled": {
      height: '30px',
      width: '357px',
      paddingLeft: '17px',
      backgroundColor: 'var(--mscb-primary)!important',
      WebkitTextFillColor: "var(--mscb-white)!important",
      fontWeight: 500,
      fontSize:'16px !important'
    },
  },
  userListClass: {
    marginTop: '16px',

    '& .ObjectListLabel': {
      display: 'none',
    },

    '& .ObjectListContent': {
      marginTop: 0,
      alignItems: "center",
      height: '100%',
      '& .MuiTabs-root': {
        height: "100%",
        '& .MuiTabs-scrollButtons': {
          alignItems: 'center',
          '& svg': {
            marginTop: 0,
          },
        }
      },
      '& .object-list-box': {
        width: '185px',
        display: 'flex',
        flexDirection: 'row',
        padding: '0px 14px',
        boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
        border: 'solid 1px #707070',
        justifyContent: 'flex-start',
        '& .object-list-circle': {
          marginRight: '8px',
          border: 'none',
        },
        '& .object-list-box-name': {
          textTransform: 'capitalize',
          color: 'var(--mscb-secondary)',
          marginLeft: 4,
          '& .empty-name': {
            fontSize: '10px',
            opacity: 0.7,
          },
        },
        '& div:last-child':{
          marginLeft: 54
        }
      },

      '& .object-list-box.active': {
        boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
        border: 'solid 1px #707070',
        '&:hover': {
          '& .object-list-box-name': {
            color: 'var(--mscb-secondary)'
          },
          '& .object-list-circle': {
            border: 'none',
            backgroundColor: 'none'
          },
        }
      },
    },
    '& .object-list-add': {
      display: 'none',
    }
  },

})) as Function;

export default ratingsReviewStyles;