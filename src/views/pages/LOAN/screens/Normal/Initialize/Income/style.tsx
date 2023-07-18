import { SxProps, Theme } from '@mui/system';

export const SxSteps: SxProps<Theme> = {
  "& .declare-normal-income":{
    "& .mscb-steps-panes-swiper":{
      "& .react-swipeable-view-container":{
        "& [data-swipeable='true']":{
          overflowY:"hidden !important"
        }
      }
    }
  },
  '&.mscb-loan-normal-income': {
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ': {
        justifyContent: 'center'
      },
      '& .mscb-step-text': {
        textTransform: 'uppercase',
        fontWeight: 'bold',

      },
      
     
    },
    '& .declare-normal-income': {
      '&>.MuiTabs-root': {
          '& .MuiTabs-flexContainer ': {
            "@media screen and (max-width: 1440px)": {
              transform: 'translateX(0%)',
            },
          transform: 'translateX(-10%)',
          justifyContent: 'center',

        },
        '& .MuiFormLabel-root': {
          // textTransform: 'uppercase',
          fontWeight: 'bold'
        }
      },
      '& .mscb-step-extra': {
        // transform: 'translateX(45px) !important',
        padding: '0px',
        left: '-64%'
      },
      '& .mscb-step-item::after': {
        left: '50px !important',
      },
      '& .step-user-normal-income': {
        '&>.MuiTabs-root': {
          '& .MuiTabs-flexContainer ': {
            justifyContent: 'center',

          },
          '& .MuiFormLabel-root': {
            // textTransform: 'uppercase',
            fontWeight: 'bold'
          }
        }
      }
    }
  }
};