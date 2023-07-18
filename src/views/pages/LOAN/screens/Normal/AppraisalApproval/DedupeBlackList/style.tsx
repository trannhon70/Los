import { makeStyles } from "@mui/styles";
import { SxProps, Theme } from '@mui/system';

const BlacklistStyle = makeStyles(() => ({
    root: {
        paddingTop: '20px',
        "& Steps.steps": {
            "& .title-folder-step": {
                "& .title-folder-step": {
                    display: "none",
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
        '&.loanStep': {
            '& .MuiStep-horizontal': {
                '& .MuiStepLabel-label': {
                    fontWeight: '600 !important',
                    width: '200px',
                    display: 'block',
                    whiteSpace: 'normal',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    '&::after': {
                        top: '22% !important',
                    }
                },
            },
        },
        '&>.MuiTabs-root': {
            '& .MuiTabs-flexContainer ': {
                justifyContent: 'center'
            },
            '& .mscb-step-label': {
                textTransform: 'uppercase',
                fontWeight: 'bold'
            }
        }
    },

})) 
export default BlacklistStyle;

export const SxHeaderRow: SxProps<Theme> = { 
    '& .MuiTableCell-root':{
      backgroundColor: '#1825aa',
      color: '#fff!important',
      borderRightColor: '#fff!important',
      borderLeftColor: '#fff!important',
      '&:first-child': {
        borderLeftColor: '#353535!important',
      },
      '&:last-child':{
        borderRightColor: '#353535!important',
      }
    }
  }
  
  export const SxTable : SxProps<Theme> = {
    '& .MuiTableCell-root':{ 
      color: '#353535',
    }
  }