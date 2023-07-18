import { SxBaseApp } from "types/app";

export const SxInformation: SxBaseApp = {
    "& .pdf":{
        width:'100%',
        height:'180px', 
        border:'1px solid #c6c5d1',
        borderRadius:'4px',
        padding:'8px'
    },
    "& .icon_Zoom":{
        position:'absolute',
        top:'154px',
        right:'25px',
        backgroundColor:'#1825aa',
        color:'#fff',
        width:'27px',
        height:'27px',
        padding:'4px',
    },
    "& .icon":{
        backgroundColor:'#f2f3f9',
        borderRadius:'0px',
        borderRight:'1px solid rgba(181, 181, 181, 0.17)',
        color:'#1825aa', 
        fontSize:'12.5px',
    },
    "& .text_TL":{
        fontSize:'14px',
        fontWeight:'bold',
        color:'#353535',
    }, 
    "& .text_Color":{
        color:'#1825aa',
    },
}