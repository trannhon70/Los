import { SxBaseApp } from "types/app";

export const SxInnputSearchDate: SxBaseApp = {
  display: "contents",
  marginRight: "18px",
  "& label":{
    marginBottom: "0",
    lineHeight: 3,
    marginRight: "11px"
  },
  "& .MuiFormControl-root": {
    paddingRight: "11px"
  }
}

export const SxCorrdinatorTitle: SxBaseApp = {
  display: "grid",
  "& .corrdinator-status":{
    color: "#6d6d6d !important",
    paddingTop: "10px"
  },
  "& .corrdinator-status-chile":{
    color: "#000" 
  },
  "& .corrdinator-status-chile::after":{
    width: "14px",
    height: "14px",
    backgroundColor: "#1a9b06"
  },
  "& .corrdinator-status-chile-success":{
    width: "14px",
    height: "14px",
    backgroundColor: "#1a9b06",
    margin:' 0.5px 6px 2px 16px',
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-stop":{
    width: "14px",
    height: "14px",
    backgroundColor: "#f1b513",
    margin:' 0.5px 6px 2px 16px',
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-late":{
    width: "14px",
    height: "14px",
    backgroundColor: "#eb0029",
    margin:' 0.5px 6px 2px 16px',
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-borber": {
    borderRight: '2px solid #d8d8d8',
    borderLeft: '2px solid #d8d8d8',
  }
}

export const SxSelectTableCell: SxBaseApp = {
  "& input": {
    backgroundColor: "rgba(94, 191, 255, 0.14) !important",
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16) !important"
  }
}

export const SxInputTableCell: SxBaseApp = {
  "& .MuiInput-root": {
    backgroundColor: "rgba(94, 191, 255, 0.14) !important",
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16) !important"
  },
  "& input:disabled": {
    backgroundColor: "unset !important",
    boxShadow: "unset !important"
  },
  "& .icon-dropdown":{
    paddingRight: "9px !important"
  },
  "& .icon-dropdown>svg":{
    fontSize: "18px !important",
    cursor: "pointer !important"
  },
  "& .icon-close>svg":{
    cursor: "pointer !important",
    color: " var(--mscb-primary)"
  }
}

export const SxCorrdinatorInputSearch: SxBaseApp = {
  backgroundColor: "#426fe9",
  padding: "5px 0px 0px 9px",
  height: "40px",
  maxWidth: "272px",
  width: "100% !important",
  "& .corrdinator-input-search": {
    "& input":{
      height: "30px !important",
     
    },

    "& input::placeholder":{
      fontSize: "16px",
      fontStyle: "italic",
      fontWeight: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: "normal"
    }
  },
  "& .corrdinator-icon-search":{
    fontSize: "19px",
    color: "#fff",
  }
}

export const SxCorrdinatorBtn: SxBaseApp = {
  bottom: 0,
  display: 'flex',
  alignItems: 'flex-end !important',
  maxWidth: '140px !important',
  width: "100% !important",

  "& button":{
    height: '36px !important',
    width: "100% !important"
  }
}

export const SxSelectFilter: SxBaseApp = {
  "& .MuiSelect-select":{
    height: "40px !important",
    backgroundColor: "#1825aa !important",
    color: "#fff !important",
    paddingRight: "37px !important",
    lineHeight: "42px !important"
  },
 
  "& .MuiSvgIcon-root":{
    color: "#fff !important"
  }
}

export const  SxTableProfile: SxBaseApp = {
  "& .table-corrdinator-profile-head":{
    "& .sort-icon":{
      color: "var(--mscb-primary) !important",
      "& svg":{
        fontSize: '12px'
      }
    },
    "& .sort-icon:hover":{
      color: "var(--mscb-primary) !important",
      "& svg":{
        fontSize: '12px'
      }
    }
  }
}