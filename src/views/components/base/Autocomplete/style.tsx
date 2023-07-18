import { makeStyles } from "@mui/styles";

const AutocompleteStyles = makeStyles(() => ({
    root: {
        '& .MuiFormControl-root': {
            '& .MuiFormControl-root': {
                height: '36px',

                '& .MuiOutlinedInput-root': {
                    height: '36px',

                    '& input': {
                        // height: '22px'
                    }

                },
            }
        },
        "&[role='tooltip']": {
            height: '36px',
            "& .MuiTooltip-tooltip":{
                background: 'red'
            }
        }
        
    },
    auto: {
        "&[role='tooltip']": {
            height: '36px',
            "& .MuiTooltip-tooltip":{
                background: 'red'
            }
        }
    }
})) as Function;

export default AutocompleteStyles;
