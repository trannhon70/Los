import {makeStyles} from '@mui/styles';

const statisticTwoLineStyle = makeStyles(() => ({
    root: {
        marginTop: '20px', 
        display: 'flex',
        alignItems: 'center',
        '&.outlined': {
            padding: '16px',
            backgroundColor: 'white',
            '& .icon-box': {
                fontSize: '23px',
                width: '54px',
                height: '54px',
                padding: '15px !important',
                borderRadius: '4px',
            },
            '& .content-box': {

            }
        },
        '& .icon-box': {
            display: 'flex',
            width: '66px',
            height: '66px',
            padding: '18px',
            marginRight: '16px',
            borderRadius: '8px',
            position: 'relative',
        },
        '& .icon-box:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom:0,
            left: 0,
            borderRadius: 'inherit',
            backgroundColor: 'currentcolor',
            opacity: 0.1,
        },
        '& .content-box': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '54px',
            width: '100%',

            '& .label': {
                fontSize: '16px',
                fontWeight: '500',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.19',
                letterSpacing: 'normal',
                textAlign: 'left',
            },
            '& .value': {
                fontSize: '24px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.21',
                letterSpacing: 'normal',
                textAlign: 'left',
            },
        }
    }
}));
export default statisticTwoLineStyle;