import { makeStyles } from '@mui/styles';

const othersStyle = makeStyles(() => ({
  root: {
    paddingTop: '20px',
    "& Steps.steps": {
      "& .title-folder-step": {
        "& .title-folder-step": {
          display:"none",
        }
      },
    },
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      textTransform: 'uppercase'
    },
    '&.othersStep':{
      '& .MuiStep-horizontal':{
        '& .MuiStepLabel-label':{
          fontWeight:'600 !important',
          display: 'block',
          whiteSpace: 'nowrap',
          '&::after': {
            top: '70% !important',
            height: '20px !important',
          }
        },
      },
    },
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ':{
        justifyContent: 'center'
      },
      '& .mscb-step-label': {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    }
  },
}));

export default othersStyle;