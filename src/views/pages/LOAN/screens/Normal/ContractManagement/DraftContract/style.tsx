import { SxProps, Theme } from '@mui/system';

export const DraftContractStyle: SxProps<Theme> = {
  '&.draft-contract': {
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
export default DraftContractStyle;