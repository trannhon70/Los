import { SxProps, Theme } from '@mui/system';

export const CICSteps: SxProps<Theme> = {
  '&.mscb-loan-card-cic': {
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ':{
        justifyContent: 'center'
      },

      '& .mscb-step-label': {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    },

  }
};