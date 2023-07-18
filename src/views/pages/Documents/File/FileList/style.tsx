import { SxBaseApp } from "types/app";

export const SxFileList: SxBaseApp = {
    padding:'19px 5px 19px 19px',
    "& .file_DS":{
        maxHeight:"36px",
        // textTransform:'uppercase',
        fontSize:'16px',
        // color:'#353535',
        // textAlign:'left',
        // fontWeight:'bold',
        display:'flex',
        alignItems:'center',
        // flexWrap:"nowrap",
        "& .MuiBreadcrumbs-separator":{
            margin: '0 5px'
        },
        "& .MuiBreadcrumbs-li":{
            // maxWidth:"220px"
        }
    },
    "& .file_Sort":{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        "& .icon":{
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
        },
        "& .file_Sort_Text":{
            display: 'flex',
            alignItems: 'center',
            fontSize:'14px',
            fontWeight:500,
            color:'#353535',
            
        },
    },
   
  };
  export const SxTable: SxBaseApp = {
  
    // padding:'0px',
    "& .text_Title":{
        fontSize:'18px !important',
        fontWeight:500,
    },
    "& .text_Contract":{
        fontSize:'14px',
        fontWeight:'bold',
        textAlign:'left',
        color:'#eb0029',
        padding:'16px 0px',
       display:'flex',
       width:'100%',
    },
    "& .textName":{
        fontSize:'14px',
        fontWeight:500,
        color:'#1825aa',
        display:'flex',
        alignItems:'center',
        "& .textIcon":{
            width:'20px',
            height:'16px',
            color:'#688fdb',
            marginRight:'10px',
        },
    },
    "& .text_Initiated":{
        fontSize:'14px',
        fontWeight:500,
        color:'#353535',
    },
    "& .text_Time":{
        fontSize:'12px',
        color:'#808080',
    },
    "& .MuiTableRow-root.MuiTableRow-hover:hover":{
        backgroundColor:'rgba(44, 141, 237, 0.1)',
        cursor:'pointer',
    },
  }