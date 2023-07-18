import { SxProps, Theme } from '@mui/system';
import { makeStyles } from "@mui/styles";

const basicInfoStyle = makeStyles(() => ({
  root:{
    marginTop:'3px !important',
    '& .MuiTabs-flexContainer ':{
      transform: 'translateX(0%) !important', 
    },
    "& .basicInfo": {
      display: "grid !important",
      gridTemplateColumns: "repeat(5, 1fr) !important",
    },
    "@media screen and (max-width: 1360px)": {
      "& .basicInfo": {
        display: "grid !important",
        gridTemplateColumns: "none !important",
      },
    },
    '& .MuiFormHelperText-root': {
      position: 'relative',
      bottom: '0px',
      margin: "3px 0px 0px"
    },
    '& .error':{
      marginBottom: '5px!important'
    }
  },
  title:{
    fontSize:'14px',
    fontWeight:500,
    color:'#1825aa',
    marginLeft:'5px',
  },
  inputLabel: {
    '& .MuiFormControl-root': {
      '& label': {
        fontSize: "14px",
      }
    },
    "& .MuiInput-root":{
      "& svg":{
        marginRight:"8px"
      }
    }
  },
  relative: {
    position: 'relative',
    cursor:'pointer',
    '& button': {
      position: 'absolute',
      right: '0',
      padding: '0',
      backdropFilter: 'blur(50px)',
      backgroundColor: 'rgba(246, 31, 31, 0.1)',
      width: '24px',
      height: '24px',

      '& svg': {
        color: '#f61f1f',
        fontSize: '15px',
        transform: 'rotate(180deg)'
      }
    },
    '& .MuiFormControl-root': {
      '& label': {
        fontSize: "14px",
      }
    },
    "& .MuiInput-root":{
      "& svg":{
        marginRight:"8px"
      }
    }
  },
  userListClass: {
    marginTop: '16px',
    '& .MuiTabs-flexContainer ':{
      transform: 'translateX(0%) !important', 
    },
    '& .ObjectListLabel': {
      textTransform: 'uppercase',
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      border: 'none',
    //   borderBottom: '1px solid var(--mscb-secondary)',
      height: 'auto',
      marginTop: 0,
      marginRight: '5px',
      '& .object-list-label':{
        fontSize: '14px !important',
        fontWeight: '500',
      },
      '& .object-list-number': {
          display:'none',
      }
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
        width: '215px',
        display: 'flex',
        flexDirection: 'row',
        padding: '0px 14px',
        boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
        border: 'solid 1px #707070',
        justifyContent: 'flex-start',

        '& .object-list-circle': {
          marginRight: '8px',
        },

        '& .object-list-box-name': {
          '& .empty-name': {
            fontSize: '10px',
            opacity: 0.7,
          },
        },

      },

      '& .object-list-box.active': {
        boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
        border: 'solid 1px #eb0029',
      }

    },

    '& .object-list-add': {
      minWidth: '230px',
      maxWidth: '230px',
      alignItems: 'center',
      justifyContent: 'center',
      '& .object-list-box': {
        padding: 0,
        justifyContent: 'center',
        margin: 0,
        width: '100%',
        border: '1px solid #9ea7ff',
        marginLeft: '14px',
      }
    }
  },
  listCredit: {
    '& .object-list-box':{
      minWidth: 'unset'
    },
    '& .ObjectListContent': {
      '& .object-list-box.active': {
        '& .MuiAvatar-root': {
          boxShadow: '0 2px 10px 0 rgba(204, 204, 204, 0.2)',
          border: 'solid 1px #eb0029',
          backgroundColor: 'var(--mscb-primary)',
        }
      }
    },
    '& .ObjectListAdd': {
      '& .object-list-box': {
        '&.active': {
          '& .object-list-circle': {
            backgroundColor : '#1825aa30!important',
            border: '#eeeff5 !important',
            '& svg': {
              color: '#1825aa'
            }
          }
        }
      }
    }
  },
  disabledTextError :{
    '& .Mui-disabled':{ 
      WebkitTextFillColor: '#f61f1f!important'
    }
  },
})) as Function;
export default basicInfoStyle;

export const UserListSx: SxProps<Theme> = {
  '& .MuiButtonBase-root': {
    marginLeft: '14px!important',
  },
  '& .object-list-label-container': {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'transparent',
    marginTop: 'unset !important',
    paddingLeft: 'unset !important',
    color: '#1e1d27',
    '& .object-list-label': {
      textDecoration: 'underline'
    },
    '& .object-list-number': {
      mt: 0,
      fontSize: 'var(--mscb-fontsize)',
      color: '#1e1d27',
      fontWeight: 400,
      textDecoration: 'underline'
    }
  },
  '& .object-list-box': {
    marginLeft: 0,
    flexDirection: 'row',
    width: '215px',
    justifyContent: 'flex-start',
    border: '1px solid #707070',
    pt: 0,
    px: 2,
    '& div:last-child':{
      marginLeft:"57px",
      marginBottom:"13px"
    },
    '& .object-list-box-name': {
      '& div:last-child':{
        marginLeft:"0px !important",
        marginBottom:"0px !important"
      },
    },
  },
  '& .object-list-box-name': {
    ml: 2,
    marginBottom:"18px"
  },
  '& .Mui-selected': {
    '& .object-list-box': {
      borderColor: 'var(--mscb-danger)'
    }
  },

  '& .object-list-add': {
    maxWidth: '230px',
    minWidth: '230px',
    justifyContent: 'center',
    '& .object-list-box': {
      width: '100%',
      justifyContent: 'center',
      borderColor: 'var(--mscb-primary)',
    },
    '& .object-list-box-name': {
      display: 'none'
    },
    '& .object-list-circle': {
      backgroundColor: 'transparent!important',
      borderColor: 'transparent!important',
      '& svg': {
        color: 'var(--mscb-primary)'
      }
    }
  }
};