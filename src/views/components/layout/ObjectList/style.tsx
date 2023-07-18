import { makeStyles } from "@mui/styles";

const objectListStyle = makeStyles(() => ({
  ObjectList: {
    gridAutoRows: '1fr',
    height: '77px',
    maxWidth: '100%',

    '& .object-list-circle': {
      width: '42px',
      height: '42px',
      backgroundColor: '#d5d5d5',
      border: '1px solid #eeeff5',
      transition: 'all 0.3s ease'
    },

    '& .object-list-box': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      marginLeft: '14px',
      cursor: 'pointer',
      paddingTop: '10px',
      paddingRight: '14px',
      zIndex: "2",
      position: 'relative',
      minWidth:'105px',
      // backgroundColor: '#dfdfdf',

      '& .object-list-box-name': {
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        verticalAlign: 'text-bottom',
        fontSize: '13px',
        fontWeight: 500,
        textTransform: 'uppercase',
        textDecoration: 'underline',
        minHeight: '1px',
        transition: 'all 0.3s ease',
        zIndex: "3",
      },

      '& .object-list-menu': {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'none',

        '& svg': {
          fontSize: '16px'
        }
      },

      '&.active': {
        '& .object-list-box-name': {
          color: 'var(--mscb-danger)'
        },
        '& .object-list-circle': {
          border: '1px solid var(--mscb-danger)',

          '&.bg-primary': {
            border: '1px solid var(--mscb-primary)',
          }
        },
        '&:hover': {
          '& .object-list-box-name': {
            color: 'var(--mscb-primary)'
          },
          '& .object-list-circle': {
            border: '1px solid var(--mscb-primary)',
            backgroundColor: 'var(--mscb-primary)'
          },
        }
      },
      '&:hover': {
        '& .object-list-box-name': {
          color: 'var(--mscb-primary)'
        },
        '& .object-list-circle': {
          border: '1px solid var(--mscb-primary)',
          backgroundColor: 'var(--mscb-primary)'
        },

        '& .object-list-menu': {
          display: 'block'
        }
      }
    },

    '&.disabled-length': {
      '& .object-list-box': {
        marginLeft: 0
      }
    }

  },
  ObjectListContent: {
    height: '100%',
    display: 'flex',
    // flex: '1 1 auto',
    overflow: 'hidden',

    '& .MuiTabs-flexContainer,& .MuiTabs-scroller': {
      height: '100%',
      borderColor: 'transparent'
    },

    '& .MuiTab-root': {
      padding: 0,
      height: '100%'
    },
    '& .MuiTabs-indicator,& .MuiTabScrollButton-root.Mui-disabled': {
      display: 'none'
    },
    '& .MuiTabScrollButton-root': {
      alignItems: 'flex-start',
      '& svg': {
        marginTop: '17px',
        fontSize: '28px',
        color: 'var(--mscb-primary)'
      }
    },

  },
  ObjectListLabel: {
    marginTop: '10px',
    padding: '10px 15px',
    border: '1px solid var(--mscb-danger)',
    height: 'calc(100% - 10px)',
    flex: '0 0 auto',

    '& .object-list-label': {
      height: '16px',
      lineHeight: '16px',
      fontSize: '12px',
      whiteSpace: 'nowrap'
    },

    '& .object-list-number': {
      marginTop: '5px',
      height: '24px',
      lineHeight: '24px',
      fontSize: '18px',
      color: 'var(--mscb-danger)',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  },
  ObjectListAdd: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
    maxWidth: '56px',
    minWidth: '56px',
    flex: '0 0 auto',

    '& .object-list-box': {
      marginRight: 0
    }
  },
  buttonDelete: {
    position: 'absolute',
    zIndex: '1000',
    top: 2,
    right: 28,
    backgroundColor:"#fee8e8 !important",
    borderRadius: '50%',
    color: '#f61f1f !important',
    fontSize: '18px',
  }
}));

export default objectListStyle;