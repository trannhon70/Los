import { SxBaseApp } from "types/app";

export const SxSecurity: SxBaseApp = {
   
    "& .CheckBox":{
        padding: '13px 14px 0px 14px', 
        border: '0.5px solid #707070', 
        borderTop: '0px',
        "& .CheckBox_label":{
            display: 'flex !important', 
            alignItems: 'center !important',
        }
    },
    "& .text_DS":{
        fontSize:'16px',
        fontWeight:'bold',
        color:'#353535',
        textAlign:'left',
        textTransform:'uppercase',
        
    },
    "& .edit":{
        cursor:'pointer'
    },
    "& .icon":{
        fontSize:'1rem',
        color:'#1825aa',
        opacity:0.5,
        
    },
    "& .icon:hover":{
        opacity:1,
        transition:"0.6s",
    }
   
}