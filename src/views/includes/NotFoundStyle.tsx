import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const NotFoundStyle = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        "& .system_span_34": {
            width: 'auto',
            height: '42px',
            margin: '40px 0 10px',
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '0.59',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#1825aa',
        },
        "& .system_span_20": {
            width: '284px',
            height: '24px',
            margin: '10 90 36px',
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#0c1257',
        },
        "& .MuiButton-root": {
            width: '282px',
            height: '56px',
            margin: '36px 91px 0',
            padding: '16px 98px',
            backgroundColor: '#1825aa',
            "& .button_span": {
                width: '86px',
                height: '24px',
                fontFamily: 'Roboto',
                fontSize: '20px',
                fontWeight: '500',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                textAlign: 'center',
                color: '#fff',
            },
        },
    }, 
})) as Function;

export default NotFoundStyle;