import { SxBaseApp } from "types/app";
import { makeStyles } from "@mui/styles";
export const SXTypeUserList: SxBaseApp = {
  "&[role='listbox']":{
    height:"300px !important"
  },
  "& svg": {
    mr: '9px'
  },
}

const approvalStyle = makeStyles(() => ({
  approval:{
    "&.select-user.Mui-disabled":{
      color:"var(--mscb-primary) !important",
      opacity:"1 !important",
      marginLeft:"0 !important",
      fontWeight:"500 !important"
    },
    "&[role='option']":{
      marginLeft:"20px",
    },
    "& .MuiMenuItem-root":{
      fontWeight: '500 !important',
      color: 'var(--mscb-primary) !important',
  
      "& .MuiListSubheader-root":{
        color: 'var(--mscb-secondary) !important',
        paddingLeft: '10px !important'
      }
    },
    
  }
})) as Function;
export default approvalStyle;