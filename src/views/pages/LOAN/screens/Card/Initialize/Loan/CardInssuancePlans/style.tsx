import { SxProps, Theme } from '@mui/system';

export const SxSteps: SxProps<Theme> = {
  '&.mscb-loan-card-loan': {
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ': {
        justifyContent: 'flex-end'
      },
    },
    '& .step-child': {
      '&>.MuiTabs-root': {
        '& .MuiTabs-flexContainer ': {
          justifyContent: 'flex-end',
          transform: 'translateX(-18%)',
        },
      }
    }
  }
};