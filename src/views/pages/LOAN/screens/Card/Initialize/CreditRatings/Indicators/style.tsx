import { makeStyles } from '@mui/styles';

const IndicatorsStyle = makeStyles(() => ({
    root: {
       '& .tittle-indicator':{
        fontSize: '19px',
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#353535',
        marginBottom: '13px',
        display: 'block'
       },
       '& .card-inside-body': {
            padding: '20px',
        },
    },
    inputLabel: {
        '& .MuiFormControl-root': {
            '& label': {
                fontSize: "14px",
            }
        },
        "& .MuiInput-root": {
            "& svg": {
                marginRight: "8px"
            }
        },
        '& .inputDisabled': {
            '& input.MuiInput-input.MuiInputBase-input.Mui-disabled': {
                '-webkit-text-fill-color': 'var(--mscb-secondary)',
                fontWeight: '500',
            },
        },
        '& .inputDisabled-red': {
            '& input.MuiInput-input.MuiInputBase-input.Mui-disabled': {
                '-webkit-text-fill-color': 'var(--mscb-danger)',
                fontWeight: '500',
            },
        },
    },
    
})) as Function

export default IndicatorsStyle;
