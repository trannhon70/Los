import { makeStyles } from "@mui/styles";

const customerStyle = makeStyles(() => ({
  Customer: {
    '& .mscb-outside-card-content': {
      minHeight: '438px',
      maxHeight: '438px'
    }
  },
  LoadingBackground:{
    '& .mscb-outside-card-content': {
      backgroundColor: '#330a0a0a!important',
    }
  },
  CustomerInfo: {
    '& .mscb-outside-card-content': {
      paddingBottom: 0,
    },

    '& .MuiTab-root': {
      whiteSpace: 'nowrap'
    },

    '& .card-tabs-info': {
      minHeight: '201px',
      maxHeight: '201px'
    },

    '& .number-tabs-info': {
      fontSize: '1.125rem'
    },

    '& .fieldset-tabs-info': {
      top: '20px!important'
    },

    '& .mscb-tabpanel-container': {
      // height: '221px'
    },

    '& .staff-join-info': {
      backgroundColor: '#f5f5f5',
      height: '67px',
      marginLeft: '-21px',
      marginRight: '-21px'
    },

    '& .search-btn':{
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      backgroundColor: '#f2f3f9!important',
      minWidth: 'unset',
      borderRadius: 0
    }
  },

  CustomerHistory: {
    "&.no-data":{
      "& .mscb-outside-card-content":{
        padding: '0 21px'
      }
    },
    '& .mscb-customer-history-container': {
      marginLeft: '-21px',
      marginRight: '-21px',
      height: '396px'
    },

    '& .mscb-customer-history-scrollable': {
      paddingLeft: '21px',
      paddingRight: '21px',
      height: "100%"
    },

    '& .mscb-customer-history-scrollable-height': {
      height: "100%"
    },

    '& .mscb-customer-history-time': {
      whiteSpace:"nowrap",
      '&::after': {
        position: 'absolute',
        content: '""',
        width: '11px',
        height: '11px',
        borderRadius: '50%',
        backgroundColor: 'var(--mscb-primary)',
        top: '4px',
        right: '-6px'
      }
    },

    '& .mscb-customer-history-info': {
      '&::before': {
        position: 'absolute',
        content: '""',
        width: 0,
        top: '15px',
        left: 0,
        bottom: 0,
        borderLeft: '2px dashed #b5b5b5'
      }
    },

    '& .mscb-customer-history-item': {
      '&:last-child': {
        '& .mscb-customer-history-info': {
          '&::before': {
            display: 'none'
          }
        }
      }
    },

    '& .mscb-customer-history-group': {
      '&:last-child': {
        '& .mscb-customer-history-item': {
          '&:last-child': {
            '& .mscb-customer-history-info': {
              paddingBottom: '0!important'
            }
          }
        }
      }
    }
  },

  CustomerDiscuzz: {
    '& .mscb-outside-card-content': {
      paddingTop: 0,
      paddingBottom: 0
    },

    '& .MuiTabs-root': {
      minHeight: '18px',
    },

    '& .MuiTab-root': {
      minHeight: '35px',
      padding: '9px 16px',
      borderBottom: '2px solid #d8d8d8',
      whiteSpace: 'nowrap'
    },

    '& .mscb-tabs': {
      height: '438px'
    },

    '& .mscb-tabpanel-container': {
      height: '401px',
      marginLeft: '-21px',
      marginRight: '-21px',
    },

    '& .mscb-customer-discuzz-panel': {
      padding: '0px 21px 21px 12px'
    },

    '& .mscb-customer-discuzz-list': {
      height: 'calc(100% - 36px)',
      '& > div > div':{
        scrollBehavior: 'smooth'
      }
    },

    '& .mscb-customer-discuzz-activity-date': {
      borderBottom: '2px solid #d8d8d8',
      paddingBottom: '10px',
      paddingTop: '10px'

    },

    '& .mscb-customer-discuzz-activity-info': {
      paddingTop: '10px'
    },

    '& .mscb-customer-discuzz-activity-line': {
      marginTop: '14px',
      marginLeft: '54px',
      border: '1px solid #d8d8d8'
    },
    '& .mscb-customer-discuzz-activity-content':{
      display: 'flex',
      flexWrap: 'wrap',
      wordBreak: 'break-word'
    },
    '& .mscb-customer-discuzz-activity-user': {
      wordBreak: 'break-word',
      '& .MuiAvatar-root': {
        width: '42px',
        height: '42px',
        marginRight: '12px'
      }
    },

    '& .mscb-customer-discuzz-message': {
      height: '36px',
      backgroundColor: 'var(--mscb-gray)!important',
      // border: 'solid 1px #d8d8d8',
      // boxShadow: '-3px -3px 6px 0 rgba(116, 119, 146, 0.07)',

      '& .mscb-customer-discuzz-input': {
        width: '100%',
        '& .MuiInput-root': {
          backgroundColor: 'transparent!important'
        },
        '& input': {
          height: '36px',
          backgroundColor: 'transparent'
        },
        '& input:placeholder-shown':{
          fontStyle: 'italic'
        }
      },

      '& .MuiSvgIcon-root': {
        color: 'var(--mscb-primary)',
        fontWeight: 'bold'
      }
    }
  },
  // chatInput: {
  //   transform: "translate(-21px,35px)",
  //   width: "calc(100% + 42px) !important",
  //   height: "44px !important",
  //   "& .MuiFormControl-root": {
  //     paddingTop: "5px",
  //     // borderTop: "1px solid var(--mscb-gray)",
  //     "& .MuiInput-root": {
  //       backgroundColor: "var(--mscb-gray)!important",
  //     },
  //   },
  //   "& input": {},
  //   "& input:placeholder-shown": {
  //     fontStyle: "italic",
  //   },
  //   "& .MuiInputAdornment-root": {
  //     "& button": {
  //       height: "40px",
  //     },
  //   },
  //   "& button": {
  //     color: "var(--mscb-primary)",
  //   },
  // },
  icon: {
    backgroundColor: "var(--mscb-primary)!important",
    borderRadius: "2px!important",
    height: 36,
    width: 36
  },
}));

export default customerStyle;