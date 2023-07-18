import { makeStyles } from "@mui/styles";
import { SxBaseApp } from "types/app";

const stepStyleIncome = makeStyles(() => ({
  root: {
    '&.disable': {
      opacity: 0.4,
    }
  },
  step: {
    "& .MuiTabs-root":{
      "@media screen and (min-width: 1900px)": {
        "& .MuiTabScrollButton-root": {
          display:"none", 
        },
      },
      "& .MuiTabs-scrollableX":{
        "& .MuiTabs-flexContainer":{
          "& .MuiTab-root:first-of-type::before":{
            left: "25px",
          },
          "& .MuiTab-root::before":{
            left: "25px",
          },
          "& .MuiTab-root:first-of-type::after":{
            left: "25px",
          },
          "& .MuiTab-root:last-child::after":{
            content: "",
            top: 0,
            left: 0,
            bordeTop: "1px dashed #707070",
            position: "absolute",
            width: "25px",
          },
          "& .MuiButtonBase-root":{
            padding: "20px 5px 20px",
            "& .mscb-step-item":{
              "& .mscb-step-label":{
                width: "130px",
              }
            }
          },
          "& .MuiButtonBase-root:first-of-type":{
            marginLeft:"3px",
            "& .mscb-step-item":{
              "& .mscb-step-label":{
                width: "110px",
              }
            }
          },
          "& .MuiButtonBase-root:last-child":{
            "& .mscb-step-item":{
              "& .mscb-step-label":{
                width: "120px",
              }
            }
          },
          "& .MuiButtonBase-root:nth-of-type(4)":{
            "& .mscb-step-item":{
              "& .mscb-step-label":{
                width: "145px",
              }
            }
          }
        }
      },
    },
 
    "& ~div": {
      "& .react-swipeable-view-container": {
        "& >div": {
          overflow: "hidden !important",
        },
      },
    },
  },
  stepIncome: {
    '& .MuiTabs-root': {
      '& .MuiTabs-scroller': {
        '& .MuiTabs-flexContainer': {
          '& .MuiTab-root.has-sub': {
            paddingBottom: '0',
            alignItems: 'flex-start',
            '& .mscb-step-item': {
              '& .mscb-step-extra': {
                left: '-85%'
              }
            }
          },
          '&::before, &::after': {
            content: '""',
            left: '68px',
          }
        }
      }
    }
  },
  stepUserCoBrw: {
    '& .MuiStepLabel-iconContainer .MuiSvgIcon-root': {
      color: '#d5d5d5'
    },
    '&.step-user': {
      '& .MuiTabs-root': {
        '& .MuiTabs-scroller': {
          '& .MuiTabs-flexContainer': {
            display: 'inline-block',
            transform: 'translateX(192%)',
            width: '275px',
            '& .MuiButtonBase-root': {
              p: "15px 0 20px 30px",
              '& .mscb-step-item': {
                // width: '150px',
                '&::after': {
                  content: '""',
                  left: '100px !important',
                },
              }
            }
          }
        },
        "& .MuiTab-root":{
          "&:not(:last-child)::after, &:not(:first-of-type)::before": {
            borderTop: '1px dashed #707070 !important',
            top: '0',
          },
          "&.mscb-step-item::before": {
            borderLeft: "1px dashed #707070 !important"
          },
        },
      },
      '& .mscb-steps-panes': {
        '& .MuiTabs-root': {
          '& .MuiTabs-scroller': {
            '& .MuiTabs-flexContainer': {
              transform: 'translateX(0%) !important',
              border: 'none',
              '& .MuiButtonBase-root': {
                '& .mscb-step-item': {
                  '&::before': {
                    border: "none",
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  stepUserCoBrwLength2: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(145%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoBrwLength3: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(98%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoBrwLength4: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(50%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoBrwMore: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(0) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserItem: {
    paddingBottom: '20px !important',
   '& .mscb-step-text': {
      width: '200px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    '&:not(:last-child)::after, &:not(:first-of-type)::before': {
      width: '50% !important'
    }
  },
  stepUserCoPayer: {
    '& .MuiStepLabel-iconContainer .MuiSvgIcon-root': {
      color: '#d5d5d5'
    },
    '&.step-user': {
      '& .MuiTabs-root': {
        '& .MuiTabs-scroller': {
          '& .MuiTabs-flexContainer': {
            display: 'inline-block',
            transform: 'translateX(300%)',
            '& .MuiButtonBase-root': {
              '& .mscb-step-item': {
                '&::after': {
                  content: '""',
                  left: '100px !important',
                }
              }
            }
          }
        },
        "& .MuiTab-root":{
          "&:not(:last-child)::after, &:not(:first-of-type)::before": {
            borderTop: '1px dashed #707070 !important',
            top: '0',
          },
          "&.mscb-step-item::before": {
            borderLeft: "1px dashed #707070 !important"
          },
          '.has-sub': {
            paddingBottom: '20px',
          }
        },
      },
      '& .mscb-steps-panes': {
        '& .MuiTabs-root': {
          '& .MuiTabs-scroller': {
            '& .MuiTabs-flexContainer': {
              transform: 'translateX(0%) !important',
              border: 'none',
              '& .MuiButtonBase-root': {
                '& .mscb-step-item': {
                  '&::before': {
                    border: "none",
                  }
                }
              }
            }
          },
        }
      }
    },
  },
  stepUserCoPayerLength2: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(124%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoPayerLength3: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(67%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoPayerLength4: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(38%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  },
  stepUserCoPayerMore: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(0) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      }
    }
  }
}));
export default stepStyleIncome;


export const SxSelectDisiable: SxBaseApp = {
  "& .Mui-disabled":{
    WebkitTextFillColor: 'var(--mscb-disable)',
    "& .MuiInput-input":{
      backgroundColor: "#d7d8e4 !important",
      color:"#353535",
     
    }
  }
}