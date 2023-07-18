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
        'justify-content': 'flex-start',

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
      opacity: '0.4',
      'pointer-events': 'none',

      '& .object-list-box': {
        padding: 0,
        justifyContent: 'center',
        margin: 0,
        width: '100%',
        border: '1px solid #9ea7ff',
        marginLeft: '14px',

        '& .object-list-circle': {
          backgroundColor: 'transparent!important',
          border: 'none!important',

          '& svg': {
            color: '#1825aa',
          }
        }
      }
    }
  },
})) as Function;
export default basicInfoStyle;
