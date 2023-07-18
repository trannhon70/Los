import { SxBaseApp } from "types/app";

export const SxStaffInformationDetail: SxBaseApp = {
  width: "100%",
  borderRadius: 0,
  "& > .mscb-tabs": {
    "& > .MuiTabs-root": {
      textTransform: "unset",
      "& > .MuiTabs-scroller": {
        "& > .MuiTabs-flexContainer": {
          borderBottom: "2px solid #d5d5d5",
          width: "100%",
          "&  button": {
            textTransform: "none",
            fontSize: "16px",
          },
        },
      },
    },
  },

  "& .Mui-selected": {
    fontSize: "16px",
  },
}

export const SxSteps: SxBaseApp = {
  "& .MuiTabs-flexContainer":{
    width: '100%',
    display: 'flex',
    justifyContent: "center",
    paddingTop: '30.5px',
    paddingBottom: '37px'
  }
};