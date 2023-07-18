import { makeStyles } from "@mui/styles";

const stepArrowStyle = makeStyles(() => ({
  StepArrow: {
    '&>.MuiTabs-root': {
      minHeight: '44px',

      '&>.MuiTabs-scroller': {

        '&>.MuiTabs-indicator': {
          display: 'none'
        },

        '&>.MuiTabs-flexContainer':{

          '&>.MuiTab-root':{
            position: 'relative',
            height: '44px',
            minHeight: '44px',
            padding: 0,
            backgroundColor: 'var(--mscb-primary)',
            

            '&>.step-arrow-item': {
              height: '44px',
              backgroundColor: '#fff',
              //paddingRight: '22px',
              borderTop: '1px solid var(--mscb-primary)',
              borderBottom: '1px solid var(--mscb-primary)',

              '&::before': {
                content: '""',
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeft: '22px solid var(--mscb-primary)',
                borderTop: '22px solid transparent',
                borderBottom: '22px solid transparent',
                left: 0,
                top: 0,
              },
  
              '&::after': {
                content: '""',
                position: 'absolute',
  
                width: 0,
                height: 0,
                borderLeft: '21px solid #fff',
                borderTop: '21px solid transparent',
                borderBottom: '21px solid transparent',
                left: 0,
                bottom: '1px'
              },

              '&>.flex': {
                width: '100%',
                height: '100%',
                padding: '0 12px 0 34px',
                alignItems: 'center',
                backgroundColor: '#fff',

                '&>.mscb-circle-box': {
                  width: '22px',
                  height: '22px',
                  lineHeight: '22px',
                  marginRight: '8px',
                  border: '1px solid #9ea7ff'
                },
  
                '&>.steps-arrow-label': {
                  lineHeight: '22px',
                  color: 'var(--mscb-secondary)',

                }
              },
            },

            '&:first-child': {
              '&>.step-arrow-item': {
                '&::before, &::after': {
                  display: 'none'
                },
                '&>.flex': {
                  borderLeft: '1px solid var(--mscb-primary)',
                  paddingLeft: '12px'
                }
              }
              
            },

            '&:last-child': {
              backgroundColor: 'transparent',
              paddingRight: '22px',
              '&>.step-arrow-item': {
                '&>.flex': {
                  paddingRight: '12px',
                    '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    borderLeft: '22px solid var(--mscb-primary)',
                    borderTop: '22px solid transparent',
                    borderBottom: '22px solid transparent',
                    right: 0
                  },
      
                  '&::after': {
                    content: '""',
                    position: 'absolute',
      
                    width: 0,
                    height: 0,
                    borderLeft: '21px solid #fff',
                    borderTop: '21px solid transparent',
                    borderBottom: '21px solid transparent',
                    right: '1px',
                    bottom: '1px'
                  },
                }
              }
            },

            '&.Mui-selected': {
              '&>.step-arrow-item': {
                backgroundColor: '#fff',
                paddingRight: 0,
                '&::after': {
                  borderLeftColor: '#fff',
                },
                '&>.flex':{
                  backgroundColor: 'var(--mscb-primary)',
                  height: '44px',

                  '&>.steps-arrow-label':{
                    color: '#fff',
                    fontWeight: '500 !important'
                  }
                }
              },
              '&+.MuiTab-root>.step-arrow-item':{
                '&::after': {
                  borderLeftColor: 'var(--mscb-primary)'
                }
              },
              '&:last-child>.step-arrow-item>.flex::after':{
                borderLeftColor: 'var(--mscb-primary)'
              }
            }
          }
        }
      },

      '&>.MuiTabScrollButton-root': {
        minHeight: '44px',
        height: '44px',
        transition: 'all ease 0.3s',

        '& svg':{
          fontSize: '30px'
        },

        '&.Mui-disabled': {
          width: 0
        }
      }
    }
  }
}));

export default stepArrowStyle;