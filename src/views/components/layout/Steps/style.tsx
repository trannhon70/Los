import { SxProps, Theme } from "@mui/system";

export const SxSteps = (sx: SxProps<Theme> = {}): SxProps<Theme> => ({
  "&>.MuiTabs-root": {
    
    "& .MuiTabs-indicator": {
      display: "none"
    },
    "& .MuiTab-root": {
      justifyContent: "flex-start",
      position: "relative",
      p: "0 30px 20px",
      "&:not(:last-child)": {
        "&::after": {
          right: 0
        }
      },
      "&:not(:first-of-type)": {
        "&::before": {
          left: 0
        }
      },
      "&:not(:last-child)::after,&:not(:first-of-type)::before": {
        content: '""',
        top: "20px",
        borderTop: "1px solid #9ea7ff",
        position: "absolute",
        width: "calc(50% - 20px)"
      },
      "&.Mui-disabled": {
        "& .mscb-step-node": {
          borderColor: "#9ea7ff",
          opacity: 0.5
        },
        "& .mscb-step-label": {
          opacity: 0.5
        }
      }
    },
    ".Mui-selected": {
      opacity: 1
    },
    "& .completed": {
      "& .mscb-step-node": {
        bgcolor: 'success.main',
        borderColor: 'success.main',
        color: "#fff"
      },
      "& .mscb-step-text": {
        color: 'secondary.main'
      }
    },
    "& .mscb-step-text": {
      color: 'var(--mscb-disable)',
    },
    "& .Mui-selected": {
      "& .mscb-step-text": {
        color: '#1825aa ',

      },
      "& .mscb-step-node": {
        bgcolor: 'primary.main',
        color: "#fff"
      },
      "&.has-sub": {
        opacity: 1,
        "& .mscb-step-item": {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-20px",
            height: "20px",
            borderLeft: "1px dashed #707070",
            left: "50%"
          }
        }
      },
      '& .MuiFormLabel-root': {
        color: 'primary.main'
      }
    },
    "& .MuiTabScrollButton-root.Mui-disabled": {
      opacity: 0.2
    }
  },
  
  "&.mscb-steps-alternative": {
    "&>.MuiTabs-root": {
      "& .mscb-step-item": {
        flexDirection: "row",
        alignItems: "center"
        //flex: 1
      },
      "& .mscb-step-node": {
        mr: "12px",
        mb: 0
      },
      "& .mscb-step-text": {
        textAlign: "left",
      },
      "& .mscb-step-attach": {
        justifyContent: "flex-start",
        mt: "6px",
      },
      "& .MuiTab-root": {
        pt: "20px",
        "&::before": {
          left: "50px",
          top: 0,
          borderTop: 0,
          borderLeft: "1px dashed #707070",
          height: "20px",
          width: 0
        },
        "&:not(:last-child)": {
          "&::after": {
            width: "100%",
            top: 0,
            borderTopStyle: "dashed",
            borderTopColor: "#707070"
          }
        },
        "&:first-of-type": {
          "&::before": {
            content: '""',
            position: "absolute",
            left: "50px",
            top: 0,
            borderTop: 0,
            borderLeft: "1px dashed #707070",
            height: "20px",
            width: 0
          },
          "&::after": {
            content: '""',
            top: 0,
            left: "50px",
            borderTop: "1px dashed #707070",
            position: "absolute",
            right: 0
          }
        },
        "&:last-child::after": {
          content: '""',
          top: 0,
          left: 0,
          borderTop: "1px dashed #707070",
          position: "absolute",
          width: "50px"
        },
        "&.Mui-selected": {
          opacity: 1,
          "&.has-sub": {
            "& .mscb-step-item": {
              "&::after": {
                left: "20px"
              }
            }
          }
        },
        "&.has-extra": {
          pb: "66px",
          "& .mscb-step-item": {
            "&::after": {
              bottom: "-66px"
            },

            "& .mscb-step-extra": {
              position: "absolute",
              bottom: "-46px",
              height: "36px",
              left: "-50%",
              transform: "translateX(50%)",
              bgcolor: 'error.main',
              color: "#fff",
              lineHeight: "36px",
              minWidth: "147px",
              textAlign: "center",
              padding: "0 12px"
            }
          }
        },
        "& .step-income-extra":{
          transform: "translateX(0%)",
          width: "150px",
          background: "red",
          height: "35px",
          marginTop: "10px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }
    }
  },
  ...sx
});

export const SxTab: SxProps<Theme> = {
  textTransform: "revert"
};

export const SxNode: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexBasis: "40px",
  width: "40px",
  minWidth: "40px",
  height: "40px",
  minHeight: "40px",
  borderRadius: "50%",
  color: 'primary.main',
  fontSize: "18px",
  fontWeight: "bold",
  mb: "13px",
  border: "1px solid",
  borderColor: 'primary.main'
};

export const SxItem: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

export const SxAttach: SxProps<Theme> = {
  textTransform: "revert",
  fontSize: "13px",
  color: "#747792",
  fontWeight: "400",
  textDecoration: "underline",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& img": {
    mr: "6px"
  }
};
