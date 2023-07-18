import { SxProps, Theme } from "@mui/material/styles";

export const root: SxProps<Theme> = {

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
  "& .icon": {
    transform: "translateY(3px)",
    marginRight: "5px",
  },
  "& .Avatar_GuestProfile":{
    width: "68px", 
    height: "68px",
  },

  "@media screen and (max-width: 1600px)":{
    "& .Avatar_GuestProfile":{
      width: "50px !important", 
      height: "50px !important",
    },
    "& .Avatar_GuestProfile_container":{
      paddingLeft:'16px !important'
    },
    "& .use_GuestProfile":{
      paddingLeft:'16px !important',
    },
  },

  "@media screen and (max-width: 1400px)":{
    "& .Avatar_GuestProfile":{
      width: "40px !important", 
      height: "40px !important",
    },
    "& .Avatar_GuestProfile_container":{
      paddingLeft:'16px !important'
    },
    "& .use_GuestProfile":{
      paddingLeft:'16px !important',
    },
  },

  "":{
    "& .Avatar_GuestProfile_container":{
      paddingLeft:'10px !important'
    },
    "& .use_GuestProfile":{
      paddingLeft:'10px !important',
    },
    "& .text-16":{
      fontSize:'13px !important'
    }
  },

};

export const UserGroupContainer: SxProps<Theme> = {};

