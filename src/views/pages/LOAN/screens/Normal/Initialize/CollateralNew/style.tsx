import { SxBaseApp } from "types/app";
import { makeStyles } from "@mui/styles";

const collateralStyle = makeStyles(() => ({
  groupListBase: {
    height: "400px !important",
    maxHeight: "400px !important",
    // paddingTop:"unset !important",
    "& .group-list>.scroll-groupList": {
      height: "335px !important",
      "& .MuiList-root": {
        maxHeight: "335px !important"
      }
    }
  },
  typeRealEstate:{
    "&.Mui-disabled":{
      color:"var(--mscb-primary) !important",
      opacity:"1 !important",
      marginLeft:"0 !important",
      fontWeight:"500 !important",
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
    objectList: {
      "& .ObjectList-certificate":{
        "& .MuiAvatar-root":{
          backgroundColor: "#d5d5d5 !important",
          border: "unset",
          "& svg":{
            color: "#707070 !important"
          }
        },
        
        "& .object-list-box: active":{
          "& .object-list-circle":{
            backgroundColor: "var(--mscb-primary) !important",
  
            "& svg":{
              color: "var(--mscb-white) !important"
            }
          }
        }
      }
    }
  }
})) as Function;
export default collateralStyle;

export const SxCardInline: SxBaseApp = {
  '& legend': {
    fontSize: '16px !important'
  }
}

export const SxTable: SxBaseApp = {
  "& .active": {
    backgroundColor: "#f2f3f9"
  },
  '& th, & td': {
    borderTop: ' solid 1px #d5d5d5',
    borderLeft: 'solid 1px #d5d5d5',
    '& .customer_icon': {
      color: "var(--mscb-white)",
      backgroundColor: "var(--mscb-danger)",
      borderRadius: "50%",
    }
  },
  '& tr': {
    '&:last-child': {
      '& td': {
        borderBottom: 'solid 1px #d5d5d5',
      }
    },
    '& th, & td': {
      '&:last-child': {
        borderRight: 'solid 1px #d5d5d5',
      }
    }
  }
}

export const SxCollateralCheck: SxBaseApp = {
  marginBottom: '24px',
  backgroundColor: 'rgba(24, 37, 170, 0.1)',
  borderRadius: '4px'
}

export const SxObjectListTypeCollateral: SxBaseApp = {
  '& .ObjectListLabel': {
    border: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  '& .object-list-label-container': {
    paddingLeft: '0'
  },
  '& .object-list-label': {
    fontWeight: 500,
    fontSize: "14px"
  },
  '& .object-list-number': {
    display: 'none'
  },
  '& .MuiTab-root': {
    textTransform: 'unset'
  },
  '& .object-list-box': {
    transition: 'all ease 0.3s',
    '& .object-list-box-name': {
      textTransform: 'unset',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 'unset !important',
    },
    '& .object-list-circle': {
      color: '#707070'
    },
    '&.active,&:hover': {
      '& .object-list-circle': {
        border: '1px solid var(--mscb-primary)',
        bgcolor: 'var(--mscb-primary)',
        color: '#fff'
      },
      '& .object-list-box-name': {
        color: 'var(--mscb-primary)',
      }
    }
  }
}

export const SxObjectListUser: SxBaseApp = {
  maxWidth:"60vw !important",
  '& .MuiTabs-scroller':{
    borderBottom:'hidden'
  },
  '& .object-list-label-container': {
    paddingLeft: 0,
    fontSize: "14px",
    display: 'flex',
    alignItems: 'center',
    borderColor: 'transparent',

    '& .object-list-label': {
      textDecoration: 'underline',
      fontSize: '14px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      color: "#1e1d27"
    },
    '& .object-list-number': {
      mt: 0,
      fontSize: 'var(--mscb-fontsize)',
      color: 'var(--mscb-secondary)',
      textDecoration: 'underline',
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 'unset'
    }
  },
  
  '& .object-list-box': {
    flexDirection: 'row',
    width: '215px',
    justifyContent: 'flex-start',
    border: '1px solid #707070',
    pt: 0,
    px: 2,
    marginLeft:'0px',
  },
  '& .object-list-box-name': {
    ml: 2,
    marginTop: "-13px"
  },
  '& .Mui-selected': {
    '& .object-list-box': {
      borderColor: 'var(--mscb-danger)',
    },
  },
  '& .object-list-add': {
    maxWidth: '230px',
    minWidth: '230px',
    justifyContent: 'center',
    marginLeft:'14px',
    '& .object-list-box': {
      width: '100%',
      justifyContent: 'center',
      borderColor: 'var(--mscb-primary)',
    },
    '& .object-list-box-name': {
      display: 'none',
      
    },
    '& .object-list-circle': {
      backgroundColor: 'transparent!important',
      borderColor: 'transparent!important',
      '& svg': {
        color: 'var(--mscb-primary)'
      }
    }
  },
  '& .MuiTab-root':{
    marginLeft:'14px'
  }
}


export const SxRadio: SxBaseApp = {
  '& label': {
    color: 'var(--mscb-secondary) !important'
  },
  "& .MuiFormControlLabel-root.Mui-disabled":{
    "& .MuiTypography-root":{
      fontWeight:500,
      color:"#353535"
    }
  }
}

export const SxCollateralCheckTableFull: SxBaseApp = {
  flexDirection: "row",
  alignItems: "center",
  "& label": {
    paddingRight: "20px",
    color: 'var(--mscb-secondary) !important'
  }
}

export const SxRealEstateStatus: SxBaseApp = {
  flexDirection: "row",
  alignItems: "center",
  "& .MuiSelect-select": {
  },
  "& label": {
    paddingRight: "20px"
  }
}

export const SxCollateralType: SxBaseApp = {
  "& .MuiSelect-select.MuiSelect-standard": {
    backgroundColor: 'var(--mscb-primary) !important',
  },
  "& svg": {
    color: "var(--mscb-white) !important",
    // mải: '12px',
    mr: '9px'
  },
  "& .MuiInput-input": {
    color: "var(--mscb-white)!important",
    fontWeight: "500!important",
    fontSize: "16px!important",
    WebkitTextFillColor: 'var(--mscb-white)!important',
    "& .Mui-disabled": {
      color: "var(--mscb-white)!important",
      fontWeight: "500!important",
      fontSize: "16px!important",
      WebkitTextFillColor: 'var(--mscb-white)!important',
    }
  },

}

export const SxCollateralQSH: SxBaseApp = {
  "& .MuiSelect-select": {
    border: '1px solid var(--mscb-primary)!important',
    backgroundColor: "var(--mscb-white)!important",
    // width: "368px!important",
    // maxWidth: "368px!important",
  },
  "& svg": {
    color: 'var(--mscb-primary)!important',
    mải: '12px',
    mr: '9px'
  },
  "& .MuiInput-input": {
    color: 'var(--mscb-primary)!important',
    fontWeight: "500!important",
    fontSize: "16px!important",
    backgroundColor: "var(--mscb-white)!important",
  },
  '& .Mui-disabled .MuiInput-input':{
    backgroundColor: "var(--mscb-white)!important",
  }
}

export const SxSelectCollateralType: SxBaseApp = {
  "& .MuiSelect-select": {
    border: '1px solid var(--mscb-primary)!important',
    backgroundColor: "var(--mscb-white)!important",
    // width: "368px!important",
    // maxWidth: "368px!important",
  },
  "& svg": {
    color: 'var(--mscb-primary)!important',
    mải: '12px',
    mr: '9px'
  },
  "& .MuiInput-input": {
    color: 'var(--mscb-primary)!important',
    fontWeight: "500!important",
    fontSize: "16px!important"
  },
  "& .Mui-disabled":{
    "& .MuiSelect-select": {
      border: '1px solid var(--mscb-primary)!important',
      backgroundColor: "var(--mscb-white)!important",
      // width: "368px!important",
      // maxWidth: "368px!important",
    },
    "& svg": {
      display: "none"
    },
    "& .MuiInput-input": {
      color: 'var(--mscb-primary)!important',
      fontWeight: "500!important",
      fontSize: "16px!important",
      WebkitTextFillColor: 'var(--mscb-primary)!important'
    },
  }
}

export const SxCollatertalCommon: SxBaseApp = {
  width: "360px",
  height: "40px",
  padding: "7px 0px 10px 12px",
  border: "solid 1px #1825aa",
  backgroundColor: "#fff",
  color: "var(--mscb-primary)",
  fontWeight: "500!important",

}

export const SxCollateralSubtypeTypography: SxBaseApp = {
  border: "solid 1px var(--mscb-primary)",
  color: "var(--mscb-primary)",
  fontSize: '16px',
  padding: "5px",
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
}

export const SxCollateralTabs: SxBaseApp = {
  "& .MuiTabs-scroller": {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },
  "& .MuiButtonBase-root": {
    backgroundColor: "#f6f6f6",
    color: "#353535",
    fontSize: "16px"
  },
  "& .Mui-selected": {
    color: "#1825aa",
    backgroundColor: "#f0f2fc"
  }
}

export const SxCollateralTabsStock: SxBaseApp = {
  "& .MuiTabs-scroller": {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },

  "& .MuiButtonBase-root": {
    backgroundColor: "#f6f6f6",
    color: "#353535",
    fontSize: "16px",
  },

  "& .MuiButtonBase-root:first-child":{
    borderRight: "solid 1px #b5b5b5",
  },
  
  "& .Mui-selected": {
    color: "#1825aa",
    backgroundColor: "#f0f2fc"
  }
}

export const SxCollateralTabsTransportType: SxBaseApp = {
  "& .MuiTabs-scroller": {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },

  "& .MuiButtonBase-root .MuiTab-root": {
    backgroundColor: "#f6f6f6",
    color: "#353535",
    fontSize: "16px",
  },

  "& .MuiButtonBase-root .MuiTab-root:first-child":{
    borderRight: "solid 1px #b5b5b5",
  },
  
  "& .Mui-selected": {
    color: "#1825aa",
    backgroundColor: "#f0f2fc"
  }
}

export const SxCollateralTabsGoodType: SxBaseApp = {
  "& .MuiTabs-scroller": {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },

  "& .MuiButtonBase-root": {
    backgroundColor: "#f6f6f6",
    color: "#353535",
    fontSize: "16px",
  },

  "& .MuiButtonBase-root:first-child":{
    borderRight: "solid 1px #b5b5b5",
  },
  
  "& .Mui-selected": {
    color: "#1825aa",
    backgroundColor: "#f0f2fc"
  }
}

export const SxOnjectListLandAssets: SxBaseApp = {
  maxWidth:'59vw !important',
  '& .ObjectListLabel': {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingTop: 0,

    '& .object-list-label': {
      fontSize: "14px",
      fontStretch: 'normal',
      fontStyle: 'normal',
      color: 'var(--mscb-secondary)',
      fontWeight: 'normal',
      paddingLeft: 0,
      textDecoration: 'underline',
    },
    '& .object-list-number': {
      fontStretch: 'normal',
      fontStyle: 'normal',
      fontWeight: 'normal',
      mt: 0,
      fontSize: 'var(--mscb-fontsize)',
      color: 'var(--mscb-secondary)',
      textDecoration: 'underline',
      // lineHeight: '22px'
    },
  },
  
  '& .MuiTab-root': {
    textTransform: 'unset'
  },
  '& .object-list-box': {
    transition: 'all ease 0.3s',
    '& .object-list-box-name': {
      textTransform: 'unset',
      textDecoration: 'none'
    },
    '& .object-list-circle': {
      color: '#707070'
    },
    '&.active,&:hover': {
      '& .object-list-circle': {
        border: '1px solid var(--mscb-primary)',
        bgcolor: 'var(--mscb-primary)',
        color: '#fff'
      },
      '& .object-list-box-name': {
        color: 'var(--mscb-primary)'
      }
    }
  }
}

export const SxAutoCompleteTag: SxBaseApp = {
  "& .MuiOutlinedInput-root":{
    height: '36px'
  },
  "& .MuiButtonBase-root":{
      height: '30px',
      margin: '0px 5px 15px 10px !important'
  },
  "& .MuiInputLabel-root":{
    fontSize: "14px"
  }
}

export const SxAutoCompleteTagUsePurposes: SxBaseApp = {
  "& .MuiOutlinedInput-root":{
    height: '36px'
  },
  "& .MuiButtonBase-root":{
      height: '30px',
      margin: '3px 5px 15px 10px !important'
  },
  "& .MuiInputLabel-root":{
    fontSize: "14px"
  },
  "& input": {
    padding: "0 4px 7.5px 6px !important"
  },
  "& .MuiAutocomplete-endAdornment": {
    top: 'calc(50% - 18px) !important'
  }
}

export const SxTabBorder: SxBaseApp = {
  borderRight: "solid 1px #b5b5b5",
  borderLeft: "solid 1px #b5b5b5"
}

export const SxObjectUnsetPointer: SxBaseApp= {
  "& .object-list-add":{
    cursor: "unset"
  }
}

export const SxSelectDisiable: SxBaseApp = {
  "& .Mui-disabled":{
    "& .MuiInput-input":{
      backgroundColor: "#d7d8e4 !important"
    }
  }
}

export const SxInputPlaceholder: SxBaseApp ={
  "& input::placeholder":{
    fontStyle: "italic",
    fontWeight: 300,
    fontStretch: 'normal',
    letterSpacing: 'normal',
    fontSize: "14px"
  }
}