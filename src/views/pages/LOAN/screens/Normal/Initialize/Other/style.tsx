import { makeStyles } from "@mui/styles";

const OtherStyle = makeStyles(() => ({
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
                        top: '70% !important',
                        height: '20px !important',
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
export default OtherStyle