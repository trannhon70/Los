import { makeStyles } from '@mui/styles';

const inputDateStyle = makeStyles(() => ({
    InputDateClass: {

        '& .MuiOutlinedInput-root': {

            height: '36px',

            '& input': {
                height: '36px',
                padding: '0px 0px 0px 8px',
            },
            
        },
        '& button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium': {
            color: 'var(--mscb-primary)',
            fontSize: '16px',
            padding: '8px',
            marginRight: '2px',
        },
        '& .Mui-disabled':{
            WebkitTextFillColor:  'var(--mscb-disable)!important',
        }
    }
}));

export default inputDateStyle;