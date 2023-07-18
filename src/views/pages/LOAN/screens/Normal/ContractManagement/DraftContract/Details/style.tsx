import { SxBaseApp } from "types/app";

export const SxCollateralType: SxBaseApp = {
  "&.mscb-input": {
    width: '25%',
  },
  "& .MuiSelect-select": {
    backgroundColor: 'var(--mscb-primary)!important',
  },
  "& svg": {
    color: "var(--mscb-white) !important",
    mải: '12px',
    mr: '9px'
  },
  "& .MuiInput-input": {
    color: "var(--mscb-white)!important",
    fontWeight: "500!important",
    fontSize: "16px!important",
    '-webkit-text-fill-color': 'var(--mscb-white)!important',
    "& .Mui-disabled": {
      color: "var(--mscb-white)!important",
      fontWeight: "500!important",
      fontSize: "16px!important",
      '-webkit-text-fill-color': 'var(--mscb-white)!important',
    }
  },

}