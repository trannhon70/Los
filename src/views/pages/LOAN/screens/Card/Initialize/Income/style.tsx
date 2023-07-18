import { makeStyles } from '@mui/styles';

const incomeStyle = makeStyles(() => ({
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
      textTransform: 'uppercase'
    },
    '&.incomeStep':{
      '& .MuiStep-horizontal':{
        '& .MuiStepLabel-label':{
          fontWeight:'600 !important',
          width: '152px',
          display: 'block',
          whiteSpace: 'normal',
          paddingLeft: '0',
          paddingRight: '0',
          marginLeft: '24px',
          marginRight: '24px',
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
  stepActivities: {
    marginBottom:'20px',
    marginLeft: '-15em',
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      width: '221px',
      fontWeight: '500',
      paddingLeft: '10px !important',
    },
  },
  inputSteps: {
    // width: '147px !important',
    // marginTop: '10px !important',
    '& input.MuiInput-input': {
      backgroundColor: 'var(--mscb-danger) !important',
      color: '#fff',
      fontWeight: '500',
      fontSize: '16px',
      '-webkit-text-fill-color': 'white',
      textAlign: 'center',
    },
    '& .MuiFormControl-root.MuiFormControl-fullWidth.mscb-input': {
      top: '-19px',
      alignItems: 'center',
    },
  },

}));

export default incomeStyle;