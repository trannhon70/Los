import { makeStyles } from '@mui/styles';
import { SxBaseApp } from 'types/app';


export const sxPaperMap: SxBaseApp = {
  width: '100%',
  maxWidth: '100%',
  height: "100%",
  borderRadius: 0,
  position: 'relative',
  boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.14)",
  '&>div>div': {
    zIndex: 99,
  },
  '&>div>div>div:nth-of-type(2n)': {
    height: '100% !important',
    width: '100% !important',
  },
  '& .mapboxgl-control-container': {
    '& .mapboxgl-ctrl-bottom-right': {
      display: 'none',
    }
  }
}

const dashboardSecStyle = makeStyles(() => ({
  statistic: {
    padding:'21px',
    height: '110px',
    marginBottom: '24px'
  },
  second: {
    marginBottom: '24px'
  },
  map: {
    '& .mscb-outside-card-content': {
      padding: 0,
      height: '770px'
    }
  },
  loan: {
    '& .dashboard-filter': {
      marginBottom: '24px',

      '& .mscb-outside-card-content': {
        height: '158px'
      }
    },

    '& .dashboard-loan': {
      // marginBottom: '24px',

      '& .mscb-outside-card-content': {
        height: '548px'
      }
    },

    '& .dashboard-loan-paging': {
      paddingTop: '20px'
    },

    '& .limit-10': {

      '& .mscb-outside-card-content': {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },

    },

  },
  charts: {
    '& .mscb-outside-card-content': {
      height: '512px'
    }
  },
  MapBox: {
    minHeight: '1149px',
    '& + div': {
      padding: '20px',
      zIndex: 99,
      '& .overlays': {
        position: 'inherit !important',

        '&>div': {
          height: '100%',
          '& .right-component': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

            '& .mscb-input': {
              '& .MuiTextField-root': {
                boxShadow: '0 2px 5px 0 rgba(0, 72, 132, 0.13)',
                '&>div>svg': {
                  marginRight: '8px'
                }
              }
            },
            '& .detail-container':{
              width: '496px',
              maxWidth: '100%',
              height: "192px",
              borderRadius: 0,
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              backdropFilter: 'blur(15px)',
              padding: '19px 10px 18px 20px',
              '& .header':{
                color: 'var(--mscb-danger)',
                margin: '0 0 15px 0',
                display: 'flex',
                alignItems: 'center'
              },
              '& .detail':{
                '& .title':{
                  fontWeight: '500',
                },
                '& .info-icon':{
                  position: 'relative',
                  '& svg':{
                    position: 'absolute',
                    margin: '3px'

                  }
                },
                '& .contact-mark':{
                  paddingLeft: '20px',
                  position: 'relative',
                  '&::before':{
                      fontSize: '22px',
                      lineHeight: '1.32',
                      content: '"*"',
                      position: 'absolute',
                      display: 'inline-block',
                      left: 0,
                      top: '0',
                      transform: 'translate(15% , -15%)',
                      width: '20px',
                      height: '20px',
                      fontFamily: 'FontAwesome5Free-Solid',
                      color: '#989898'
                  }
                },
                '& svg':{
                  alignSelf: 'center',
                  margin: '0px 5px 4px 0',
                  color: 'var(--mscb-primary)'
                }
              }
            }
          }
        }
      },
    },

    '& .left-component': {
      position: 'relative',
      display: 'flex',

      '& .chart': {
        height: '200px',
        '&>div:nth-of-type(1)': {
          justifyContent: 'flex-start',
        },
      },
    },
  }
}));

export default dashboardSecStyle;
