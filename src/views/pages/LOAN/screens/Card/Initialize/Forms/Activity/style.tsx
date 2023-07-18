import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const ActivityStyle = makeStyles((theme: Theme) => ({
    root: {
        height: "374px",
        '& .list-container': {
            paddingRight: '10px',
            '& .MuiListSubheader-root': {
                fontSize: '15px',
                color: "#000",
                fontWeight: 500,
            },
            '& .MuiListItemSecondaryAction-root': {
                top: "25%",
                '& button': {
                    color: 'var(--mscb-primary)',
                }
            },
        },
    },
    rowLine: {
        display: 'flex',
        height: '2px',
        backgroundColor: '#eee',
        marginRight: '-16px',
        marginLeft: '-16px',
    },

    colorPath: {
        width: '65%',
        height: 'inherit',
        backgroundColor: '#1825aa',
    },
    label: {
        display: 'inline-flex',
        height: '40px',
        lineHeight: '40px',
        marginTop: '9px',
        fontSize: '16px',
        fontWeight: 500,
    },
    inline: {
        display: 'inline',
        fontStyle: "italic",
        color: '#070c46',

    },
    profilehistory: {
        height: "321px",
    },
    owner: {
        '& .MuiListItemText-secondary': {
            marginLeft: '-58px',
            marginTop: '8px',
        }
    },
    openDate: {
        fontStyle: "italic",
        color: "#707070",
        fontWeight: 300,
    },
    content: {
        display: "flex",
        flexWrap: "nowrap",
    },
    scrollbar: {
        scrollBehavior: "auto",
    },

})) as Function;

export default ActivityStyle;
