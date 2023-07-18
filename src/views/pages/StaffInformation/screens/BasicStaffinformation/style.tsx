import { SxProps, Theme } from "@mui/material/styles";

export const EmptyClass: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const IdLabel: SxProps<Theme> = {
  position: "absolute",
  width: "139px",
  height: "31px",
  backgroundColor: "#07a791",
  color: "#fff",
  left: "100%",
  transform: "translate(-139px,33px)",
  padding: "5px",
  textAlign: "center",
};
export const root: SxProps<Theme> = {
  
  backgroundColor:'#eff2fe',
  padding:"1rem",
 
  "& .BasicContainer":{
   
  

  },
  "& .color-primary": {
    color: "var(--mscb-primary)",
  },
  "& .color-orange": {
    color: "#f29423",
  },
  "& .emailAddress": {
    color: "#0c1257",
    fontSize: "13px",
  },
  "& .telephone": {
    color: "#0c1257",
    fontSize: "13px",
  },
  "& .staffid": {
   paddingTop:'5px!important',
  fontSize: "14px",
  },
  "& .icon": {
    transform: "translateY(3px)",
    marginRight: "5px",
  },

  "& .avatar": {
    width: "100px",
    height: "100px",
  },
  "& .full-name": {
    textTransform: "uppercase",
    fontSize: "20px",
    fontWeight:'bold'
  },
};

export const UserGroupContainer: SxProps<Theme> = {};

