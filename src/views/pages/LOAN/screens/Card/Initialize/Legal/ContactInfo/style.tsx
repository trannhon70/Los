import { makeStyles } from "@mui/styles";

const contactInfoStyle = makeStyles(() => ({
  root: {
    "& .autocomplete__root": {
      background: "#f2f3f9",

      "& .MuiFormControl-root": {
        "& .MuiOutlinedInput-root": {
          height: "36px",
          padding: 0,
          borderRadius: "unset",

          "&:hover": {
            border: 0,
          },

          "& .MuiButtonBase-root": {
            margin: "4px !important",
            height: "28px",
          },

          "& input": {
            padding: "6px !important",
            height: "22px !important",
          },

          "& .MuiAutocomplete-endAdornment": {
            top: "unset",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "unset",
            borderWidth: 0,
          },
        },
      },

      "&.Mui-focused": {},
    },
    "& .css-wb57ya-MuiFormControl-root-MuiTextField-root": {
      "& .css-vec12z-MuiInputBase-root-MuiOutlinedInput-root": {
        "& .css-1q60rmi-MuiAutocomplete-endAdornment": {
          "& .MuiButtonBase-root": {
            marginRight: "0px !important",
          },
        },
      },
    },
    "& .MuiAutocomplete-tag": {
      margin: "5px 5px 4px 10px !important",
      borderRadius: "unset",
      height: "36px",
      backgroundColor: "#fff",

      "& span": {
        fontFamily: "Roboto",
        fontSize: "13px",
        fontWeight: 500,
        color: "#070c46",
        backgroundColor: "#fff",
      },

      "& svg": {
        fontSize: "16px",
        color: "#747792",
      },
    },
    "& .select-multiple-user": {
      display: "flex",
      paddingBottom: "20px",
      "& label": {
        width: "230px",
        display: "inline-block",
        color: "red !important",
        fontWeight: "500",
        fontSize: "14px",
      },
      "&>div": {
        width: "467px",
        height: "36px",
      },
      "& .multipe-select": {
        width: "467px",
        display: "table",
        "& div": {
          height: "36px",
          "& div": {
            backgroundColor: "#f2f3f9",
            "& div": {
              paddingTop: "0px",
              borderRadius: "0px",
              "& .MuiAutocomplete-endAdornment": {
                backgroundColor: "#f2f3f9",
              },
              "& div": {
                height: "27px",
                borderRadius: "0px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "& span ": {
                  fontSize: "13px",
                  fontWeight: "500",
                },
              },
            },
          },
        },
      },
    },
  },
  userListClass: {
    marginTop: "16px",

    "& .ObjectListLabel": {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      padding: 0,
      border: "none",
      borderBottom: "1px solid var(--mscb-secondary)",
      height: "auto",
      marginTop: 0,
      marginRight: "5px",

      "& .object-list-number": {
        marginTop: 0,
        marginLeft: "2px",
        fontSize: "12px",
        color: "var(--mscb-secondary)",
        fontWeight: "normal",
        height: "auto",
        lineHeight: 1,
      },
    },

    "& .ObjectListContent": {
      marginTop: 0,
      alignItems: "center",
      height: "100%",

      "& .MuiTabs-root": {
        height: "100%",

        "& .MuiTabs-scrollButtons": {
          alignItems: "center",

          "& svg": {
            marginTop: 0,
          },
        },
        "& .MuiTabs-scroller": {
          "& .MuiTabs-flexContainer": {
            "& .MuiButtonBase-root": {
              marginLeft: "14px",
            },
          },
        },
      },
      "& .object-list-box": {
        width: "215px",
        display: "flex",
        flexDirection: "row",
        padding: "0px 14px",
        boxShadow: "0 2px 10px 0 rgba(204, 204, 204, 0.2)",
        border: "solid 1px #707070",
        "justify-content": "flex-start",
        marginLeft: "0px",

        "& .object-list-circle": {
          marginRight: "8px",
        },

        "& .object-list-box-name": {
          "& .empty-name": {
            fontSize: "10px",
            opacity: 0.7,
          },
        },
      },

      "& .object-list-box.active": {
        boxShadow: "0 2px 10px 0 rgba(204, 204, 204, 0.2)",
        border: "solid 1px #eb0029",
      },
    },

    "& .object-list-add": {
      minWidth: "230px",
      maxWidth: "230px",
      alignItems: "center",
      justifyContent: "center",
      opacity: "0.4",


      "& .object-list-box": {
        padding: 0,
        justifyContent: "center",
        margin: 0,
        width: "100%",
        border: "1px solid #9ea7ff",
        marginLeft: "14px",

        "& .object-list-circle": {
          backgroundColor: "transparent!important",
          border: "none!important",

          "& svg": {
            color: "#1825aa",
          },
        },
      },
    },
  },
  icon: {
    color: "#1825aa",
  },
})) as Function;

export default contactInfoStyle;
