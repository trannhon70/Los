import { makeStyles } from "@mui/styles";

const infoStyle = makeStyles(() => ({
    root: {
        bottom: '26px',
        '& .btnSaveInfo':{
            marginTop:'24px',
            display: 'flex',
            justifyContent:'flex-end'
        }
     
    },
    label: {
        display: 'inline-flex',
        height: '40px',
        lineHeight: '40px',
        marginTop: '9px',
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft:'13px',
    },
    rowLine: {
        display: 'flex',
        height: '2px',
        width:'100%',
        backgroundColor: '#eee',
    },

    colorPath: {
        width: '15%',
        height: 'inherit',
        backgroundColor: '#1825aa',
    },
    codeContract:{
        marginTop: '21px'
    },

})) as Function;

export default infoStyle;
