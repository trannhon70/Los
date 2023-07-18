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
            transform: 'translateX(221%)',
            width: '275px',
            '& .MuiButtonBase-root': {
              p: "15px 0 20px 30px",
              '& .mscb-step-item': {
                // width: '150px',
                '&::after': {
                  content: '""',
                  left: '20px !important',
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
      transform: 'translateX(163%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
        }
      }
    }
  },
  stepUserCoBrwLength3: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(107%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
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
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
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
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
        }
      }
    }
  },
  stepUserItem: {
    paddingBottom: '20px !important',
    paddingTop: '0 !important',
   '& .mscb-step-text': {
      width: '200px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    '& .mscb-step-item::before': {
      borderLeft: 'none !important'
    },
    '&::before': {
      borderLeft: 'none !important',
      height: '0 !important'
    },
    '&::after': {
      border: 'none !important'
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
            transform: 'translateX(275%)',
            '& .MuiButtonBase-root': {
              '& .mscb-step-item': {
                '&::after': {
                  content: '""',
                  left: '20px !important',
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
      transform: 'translateX(112%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
        }
      }
    }
  },
  stepUserCoPayerLength3: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(58%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
        }
      }
    }
  },
  stepUserCoPayerLength4: {
    '& .MuiTabs-flexContainer': {
      transform: 'translateX(28%) !important',
      '& .mscb-step-item': {
        '&::before': {
          content: '""',
          borderLeft: "1px dashed #707070",
          height: '20px'
        }
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
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
      },
      '& .MuiTab-root': {
        paddingTop: '20px !important',
        '&::before':{
          borderLeft: "1px dashed #707070 !important",
          height: '20px !important'
        },
        '&::after': {
          borderTop: "1px dashed #707070 !important",
        }
      }
    }
  }
}));
export default stepStyleIncome;


export const SxSelectDisabled: SxBaseApp = {
  "& .Mui-disabled":{
    WebkitTextFillColor: 'var(--mscb-disable)',
    "& .MuiInput-input":{
      backgroundColor: "#d7d8e4 !important",
      color:"#353535",
      fontWeight: 500
    }
  }
}
export const SxInputDisabled: SxBaseApp = {
  "& .Mui-disabled":{
    WebkitTextFillColor: 'var(--mscb-disable)',
    "& .MuiInput-input":{
      backgroundColor: "#d7d8e4 !important",
      color:"#353535",
      fontWeight: 500
    }
  }
}
export const SxInputRedDisabled: SxBaseApp = {
  "& .Mui-disabled":{
    WebkitTextFillColor: 'var(--mscb-danger)',
    "& .MuiInput-input":{
      backgroundColor: "#d7d8e4 !important",
      //color:"#353535",
      fontWeight: 500
    }
  }
}