import { makeStyles } from '@mui/styles';
import { SxBaseApp } from 'types/app';

const loanStyle = makeStyles(() => ({
  root: {
    paddingTop: '20px',
    "& Steps.steps": {
      "& .title-folder-step": {
        "& .title-folder-step": {
          display:"none",
        }
      },
      '& .subSteps': {
        transform: "translateX(10%)",
      }
    },
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      textTransform: 'uppercase',
    },
    '&.loanStep':{
      '& .MuiStep-horizontal':{
        '& .MuiStepLabel-label':{
          fontWeight:'600 !important',
          width: '200px',
          display: 'block',
          whiteSpace: 'normal',
          paddingLeft: '24px',
          paddingRight: '24px',
          '&::after': {
            top: '70% !important',
            height: '20px !important',
          },
         
        },
      },
    },
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ':{
        justifyContent: 'center',
      },
      '& .mscb-step-label': {
        textTransform: 'uppercase',
        fontWeight: 'bold',
      }
    },
    '& .mscb-step-attach':{
      '& .MuiBox-root':{
        textTransform: 'lowercase'
      }
    }
  },
  stepActivities: {
    marginBottom:'20px',
    marginLeft: '47em',
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      width: '221px',
      fontWeight: '500',
      paddingLeft: '10px !important',
      '&::after': {
        top: '160% !important',
        height: '20px !important',
      }
    },
  },
  stepSubActivities: {
    marginBottom:'35px',
    marginLeft: '27em',
    '& .MuiStepLabel-label': {
        whiteSpace: 'normal',
        width: '221px',
        fontWeight: '500',
        paddingLeft: '10px !important',
    },
  }   
}));

export default loanStyle;

export const SxInputRedDisabled: SxBaseApp = {
  '& .Mui-disabled input': { 
    color: 'var(--mscb-danger)!important', 
    WebkitTextFillColor: 'var(--mscb-danger)!important',
    fontWeight: 'bold' 
  }
}