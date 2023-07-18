import LogoBg from 'assets/images/logo/scb-sidebar.svg';
import { makeStyles } from "@mui/styles";

const sidebarStyle = makeStyles(() => ({

  root: {
    backgroundColor: 'var(--mscb-primary)',
    backgroundImage: `url(${ LogoBg })`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 100%',
    backgroundSize: '100% auto',
    color: '#fff',
    width: 'var(--mscb-sidebar-width)',
    transition: 'all ease 0.3s',
    zIndex: 1200,

    '& .mscb-sidebar-brand': {
      '& img': {
        objectFit: 'cover',
        objectPosition: 'left top',
        transition: 'all ease 0.3s'
      }
    },
  },

  sidebar: {
    height: 'calc(100% - var(--mscb-topbar-height) - 151px)',

    '& .scrollX': {
      '& div:first-child': {
        overflowX: 'unset !important',
      },
      '&:nth-child(2)':{
        display: 'none !important'
      }
    }
  },

  navigation: {
    padding: '10px var(--mscb-sidebar-padding)',

    '& .sidebar-icon-nav': {
      width: '20px',
      height: '20px',
      border: 'solid 1px rgba(245, 245, 245, 0.09)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',

      '& span': {
        display: 'inline-block',
        width: '2px',
        height: '10px',
        backgroundColor: '#fff',
        marginTop: '4px',
        position: 'relative',
        transition: 'all ease 0.3s',

        '&::before': {
          content: '""',
          position: 'absolute',
          display: 'block',
          width: '10px',
          height: '2px',
          backgroundColor: '#fff',
          top: '5px',
          left: '-5px',
          transform: 'translate(1px, -1px)',
          transition: 'all ease 0.3s',
        }
      }
    },

    '& .mscb-sidebar-icon': {
      width: '30px',
      height: '30px',
      backgroundColor: '#070c46',
      boxShadow: '0 0 6px 0 rgba(244, 101, 101, 0.32)',
      marginRight: '8px',
      transition: 'all ease 0.3s',

      '& svg':{
        color: '#fff',
        fontSize: '14px'
      }
    },

    '& .sidebar-non-icon': {
      fontSize: '7px',
      marginRight: '9px',
      marginLeft: '12px'
    },

    '& .mscb-sidebar-item': {
      height: '50px',
      maxWidth: '100%',

      '&.has-submenu': {
        '& .sidebar-navbar-left': {
          width: 'calc(100% - 20px)'
        }
      },

      '&.open': {
        '& > .flex > span': {
          color: 'var(--mscb-danger)',
          '& svg': {
            color: 'var(--mscb-danger)'
          }
        },
        '& > .item-arrow .sidebar-icon-nav span':{
          transform: 'rotate(-90deg)',
          '&::before': {
            opacity: 0
          }
        }
      },

      '&.active': {
        color: 'var(--mscb-danger)',
        fontWeight: 500,

        '& .mscb-sidebar-icon': {
          boxShadow: '0 0 6px 0 rgba(244, 101, 101, 0.32)',
    
          '& svg':{
            color: 'var(--mscb-danger)',
          }
        },
      }
    },

    '& .mscb-sidebar-navbar-name': {
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '& .submenu': {
      backgroundColor: '#000753',
      marginLeft: 'calc(0px - var(--mscb-sidebar-padding))',
      marginRight: 'calc(0px - var(--mscb-sidebar-padding))',
      paddingLeft: 'var(--mscb-sidebar-padding)',
      paddingRight: 'var(--mscb-sidebar-padding)',
      transition: 'all ease 0.3s',

      '& .submenu': {
        marginLeft: '0!important',
      }
    }

  },

  copyright: {
    height: '50px',
    lineHeight: '50px',
    overflow: 'hidden',
    padding: '0 var(--mscb-sidebar-padding)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  panel: {
    overflow: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
  },

  '@global': {
    '.mscb-sidebar-collapsed': {
      '& .mscb-content-wrapper': {
        width: 'calc(100% - var(--mscb-sidebar-collapsed-width))',
        marginLeft: 'var(--mscb-sidebar-collapsed-width)'
      },

      '& .mscb-topbar': {
        width: 'calc(100% - var(--mscb-sidebar-collapsed-width))',
        left: 'var(--mscb-sidebar-collapsed-width)'
      },

      '& .mscb-sidebar-brand': {
        '& img': {
          width: '30px',
        }
      },

      '& .mscb-sidebar-navbar-name': {
        display: 'none'
      },

      '& .mscb-sidebar-icon': {
        marginRight: 0
      },

      '& .mscb-sidebar-branch': {
        height: 0,
        overflow: 'hidden'
      },

      '& .mscb-sidebar-avatar': {
        width: '34px!important',
        height: '34px!important'
      },

      '& .mscb-sidebar-user-info': {
        pointerEvents: 'none',
        
        '&>div': {
          height: 0,
          width: 0,
          overflow: 'hidden'
        }
      },

      '& .mscb-sidebar-copyright': {
        display: 'none!important'
      },

      '& .mscb-sidebar-navbar': {
        height: 'calc(100% - var(--mscb-topbar-height) - 34px)'
      },

      '& .item-arrow': {
        opacity: 0,
        pointerEvents: 'none'
      },

      '& .submenu': {
        '& .submenu': {
          marginLeft: 'calc(0px - var(--mscb-sidebar-padding))!important',
        }
      },

      '& .mscb-sidebar': {
        width: 'var(--mscb-sidebar-collapsed-width)',

        '&:hover':{
          width: 'var(--mscb-sidebar-width)',

          '& .mscb-sidebar-navbar': {
            height: 'calc(100% - var(--mscb-topbar-height) - 151px)',
          },

          '& .mscb-sidebar-brand': {
            '& img': {
              width: 'auto',
            }
          },
    
          '& .mscb-sidebar-navbar-name': {
            display: 'block'
          },
    
          '& .mscb-sidebar-icon': {
            marginRight: '8px'
          },
    
          '& .mscb-sidebar-branch': {
            height: '38px',
            overflow: 'hidden'
          },
    
          '& .mscb-sidebar-avatar': {
            width: '54px!important',
            height: '54px!important'
          },
    
          '& .mscb-sidebar-user-info': {
            '&>div': {
              height: 'auto',
              width: '100%',
              overflow: 'hidden'
            }
          },

          '& .item-arrow': {
            opacity: 1
          },
  
          '& .submenu': {
            '& .submenu': {
              marginLeft: '0!important',
            }
          },

          '& .mscb-sidebar-copyright': {
            display: 'flex!important'
          },
        }
      },
    }
  }

}));

export default sidebarStyle;