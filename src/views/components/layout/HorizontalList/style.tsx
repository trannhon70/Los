import { makeStyles } from "@mui/styles";

const listStyle = makeStyles(() => ({
  HorizontalList: {
    height: '36px',

    '& .MuiTabs-root,& .MuiTab-root': {
      minHeight: '36px',
      height: '36px',
      "& .MuiTabs-scrollableX .MuiTabs-flexContainer .MuiButtonBase-root":{
            padding: '0 !important',
      }
    },
    
    '& .object-list-circle': {
      width: '20px',
      height: '20px',
      backgroundColor: 'transparent',
      border: 'none!important',

      '& svg': {
        fontSize: '24px',
        color: 'var(--mscb-black)'
      }
    },

    '& .object-list-box-name': {
      textDecoration: 'none!important',
      marginLeft: '8px'
    },

    '& .object-list-menu': {
      paddingTop: '2px',
      right: '-6px'
    },

    '& .object-list-box': {
      backgroundColor: '#d5d5d5',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 0,
      paddingLeft: '12px',
      paddingRight: '20px',
      color: 'var(--mscb-disable)',
      '&.active': {
        backgroundColor: 'var(--mscb-primary)',
        '& svg .bds':{
          fill: '#fff'
        },
        '& svg .ptvt':{
          fill: '#fff'
        },
        '& svg .taisan':{
          fill: '#fff'
        },
        '& .object-list-circle': {
          backgroundColor: 'transparent',
          '& svg': {
            color: '#fff',
          }
        },

        '& .object-list-box-name': {
          color: '#fff!important',
          marginRight:'8px'
        },

        '& .object-list-menu': {
          height: '100%',
          display: 'block',
          '& svg': {
            color: '#fff',
            fontSize: 22,
          },

          '& .MuiButtonBase-root': {
            padding: 0,
            height: '100%',
            marginTop: '-2px',
          }
        },
      },
      '&:hover': {
        backgroundColor: 'var(--mscb-primary)',

        '& .object-list-circle': {
          backgroundColor: 'transparent',
    
          '& svg': {
            color: '#fff'
          }
        },

        '& .object-list-box-name': {
          color: '#fff!important'
        },

        '& .object-list-menu': {
          display: 'none',
        }
      }
    },

    '& .MuiTabScrollButton-root': {
      '& svg': {
        marginTop: '4px'
      }
    },

    '& .object-list-add': {
      '& .object-list-box': {
        backgroundColor: '#fff!important',
        border: '1px solid var(--mscb-primary)',
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'center',
        flexBasis: '36px'
      },

      '& .object-list-circle': {
        backgroundColor: 'transparent!important',

        '& svg': {
          color: 'var(--mscb-primary)!important'
        }
      },

      '& .object-list-box-name': {
        display: 'none'
      }
    }
  }
}));

export default listStyle;