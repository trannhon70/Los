import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const HistoryStyle = makeStyles( (theme: Theme)  => ({
    root: {
        height: "374px",
        '& .list-container':{
            paddingRight: '10px',
            '& .MuiListSubheader-root':{ 
                fontSize: '15px',
                color: "#000",
                fontWeight: 500,
            },
            '& .full-name':{
                color: "#000",
            },
            '& .MuiListItemSecondaryAction-root':{ 
                top: "25%",
                '& button':{ 
                    color: 'var(--mscb-primary)',
                }
            }
        },
    },
    inline: {
        display: 'inline',
        fontStyle: "italic",
        color: 'var(--mscb-primary)',
       
      },
    profilehistory :{
        height: "321px",
    },
    owner :{
        '& .MuiListItemText-secondary':{ 
            transform: 'translate(-15%, 5px)'
        }
    },
    openDate :{
        fontStyle: "italic",
        color: "#707070",
        fontWeight: 300,
        fontSize: "12px",
    },
    content: {
        display: "flex",
        flexWrap: "nowrap",
    },
    scrollbar:{
        scrollBehavior: "auto",
    },

})) as Function;

export default HistoryStyle;
