import { makeStyles } from "@mui/styles";

const mscbStyle = makeStyles(() => ({
  "@global": {
    ".input-text-upper": {

      "& input": {
        textTransform: 'uppercase',
      },

    },
    ".mscb-input": {
      marginBottom: '16px',
      '& input': {
        fontSize: '14px',
        paddingLeft: '12px !important'
      },
      "& label": {
        fontWeight: 500,
        position: "relative",
        color: 'var(--mscb-secondary)',
        marginBottom: '8px',
        transform: 'none'
      },

      '& .MuiInput-root, & .MuiSelect-select, & .MuiInputBase-root': {
        backgroundColor: '#f2f3f9!important',
        display: 'flex',
        color: 'var(--mscb-secondary)',

        '&:hover::before': {
          borderBottom: 'none'
        },

        '&:hover::after': {
          borderBottom: 'none'
        },

        '&::before': {
          borderBottom: 'none!important'
        },

        '&::after': {
          borderBottom: 'none'
        },

        '& .MuiIconButton-edgeEnd': {
          marginRight: 0,
          padding: '0 10px',
          backgroundColor: 'transparent'
        },

        '& .MuiSvgIcon-root': {
          color: 'var(--mscb-primary)'
        },

        '& .MuiSelect-icon': {
          fontSize: '18px'
        },

        '& input::placeholder': {
          fontStyle: "italic",
          fontFamily: "Roboto",
          fontSize: "14px"
        }
      },

      '& .MuiFormLabel-asterisk': {
        color: 'var(--mscb-danger)'
      },

      '& .MuiInputBase-root': {
        padding: '0!important',
        borderRadius: 0,
        backgroundColor: 'var(--secondary)',
        fontSize: 'var(--mscb-fontsize)',
      },

      '& .MuiInput-input.MuiInputBase-input,& .MuiAutocomplete-input': {
        whiteSpace: 'nowrap',
        display: 'unset',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        // color:"#f61f1f",
        height: '36px',
        lineHeight: '36px',
        padding: '0 12px'
      },
      '& .MuiInputBase-input.MuiSelect-select': {
        height: '36px',
        lineHeight: '36px',
        padding: '0 30px 0 12px'
      },

      '& fieldset': {
        border: 'none'
      },

      '& .MuiAutocomplete-endAdornment': {
        right: '0!important'
      },

      '& .MuiInputAdornment-root': {
        height: '36px',
        marginLeft: 0,
        maxHeight: '36px'
      },


      '& .Mui-disabled': {
        '& input,& .MuiInputAdornment-root,& .MuiSelect-select': {
          backgroundColor: '#d7d8e4'
        },
        WebkitTextFillColor: 'var(--mscb-disable)'
      },
      '& .Mui-disabled input': {
        WebkitTextFillColor: 'var(--mscb-disable)'
      },
      '& textarea': {
        '&:disabled': {
          backgroundColor: '#d7d8e4!important'
        }
      }

    },

    '.mscb-form-row': {
      alignItems: 'flex-end',

      '& .MuiFormControl-root': {
        marginBottom: '0!important'
      },

      '& .MuiTextField-root': {
        position: 'relative',
        marginBottom: '18px!important'
      },

      '& .MuiFormHelperText-root': {
        position: 'absolute',
        bottom: '-25px',
        margin: 0
      },
      '& .error': {
        marginBottom: '31px!important'
      }
    },

    '.language': {

      '& .MuiSvgIcon-root': {
        right: '8px'
      },

      '& .MuiInput-input': {
        borderRadius: '18px!important',
        paddingRight: '36px!important',
        paddingLeft: '18px'
      }

    },

    '.mscb-init-tab': {
      '& .MuiTabs-root': {
        borderBottom: '0.5px solid #d5d5d5',
        minHeight: '43px',
      },
      '& .MuiTabs-scroller': {

        height: '43px'
      },
      '& .MuiTabs-flexContainer': {
        height: '43px',
        borderBottom: '.5px solid #d5d5d5',
        width: 'max-content'
      },
      '& .MuiTab-root': {
        padding: '0 16px',
      },

      '& .MuiTabScrollButton-root': {
        borderBottom: '1px solid #d5d5d5',
        opacity: '1!important'
      }
    },

    '.product-group': {
      '& label': {
        fontWeight: 500
      }
    },

    '.mscb-table': {
      '& th, & td': {
        minHeight: '42px',
        padding: '8px 15px'
      },
      '& th': {
        textTransform: 'uppercase',
        color: 'var(--mscb-primary)',
        fontWeight: 'bold'
      }
    },

    '.mscb-table-border': {
      '& th, & td': {
        borderTop: '1px solid #353535',
        borderLeft: '1px solid #353535',
        borderBottom: 'none',
        borderRight: 'none'
      },
      '& tr': {
        '&:last-child': {
          '& td': {
            borderBottom: '1px solid #353535',
          }
        },
        '& th, & td': {
          '&:last-child': {
            borderRight: '1px solid #353535',
          }
        }
      }
    },

    '.b-line': {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '3rem',
        bottom: '0.75rem',
        left: '1.5rem',
        borderLeft: '1px solid #d5d5d5'
      }
    },
    '.mscb-table-row-title': {
      '& td': {
        color: 'var(--mscb-primary)',
        textTransform: 'uppercase',
        fontWeight: 500
      }
    },
    '.mscb-table-row-label': {
      '& td': {
        fontWeight: 500
      }
    },
    '.mscb-input-table': {
      '& input': {
        backgroundColor: 'rgba(94, 191, 255, 0.14)',
        height: '24px!important',
        lineHeight: '24px!important',
        fontWeight: 500
      }
    },
    '.mscb-input-right': {
      '& input': {
        textAlign: 'right'
      }
    },

    '.mscb-pointer': {
      cursor: 'pointer !important',
    },

    'mscb-un-pointer': {
      cursor: 'unset !important',
    },

    ".swiper": { width: "100%", height: "100%" },
    ".swiper-slide": {
      textAlign: "center",
      fontSize: "18px",
      background: "#fff",
      display: ["-webkit-box", "-ms-flexbox", "-webkit-flex", "flex"],
      WebkitBoxPack: "center",
      msFlexPack: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      WebkitBoxAlign: "center",
      msFlexAlign: "center",
      WebkitAlignItems: "center",
      alignItems: "center"

    },
    ".swiper-slide img": {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    ".swiper-pagination-bullet-active":{
      background:'var(--swiper-pagination-color,#fff) !important'
    },

  }
})) as Function;

export default mscbStyle;