import { SxProps, Theme } from '@mui/system';

export const SxSteps: SxProps<Theme> = {
  '&.mscb-loan-normal-legal': {
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ':{
        justifyContent: 'center'
      },
      '& .MuiFormLabel-root': {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    }
  }
};