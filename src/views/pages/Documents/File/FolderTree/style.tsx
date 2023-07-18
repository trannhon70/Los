import { makeStyles } from "@mui/styles";

const ListTemplateStyle = makeStyles(() => ({
  root: {
    
    "& .tree-label-text":{
      whiteSpace:"nowrap",
      textOverflow:"ellipsis",
      overflow:"hidden"
    },
    "&::-webkit-scrollbar": {
      width: "5px",
      height:"5px"
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "20px",
      backgroundColor: "#d5d5d5",
    },
    "& .tree-label-text-template": {
      color: "var(--mscb-black)",
    },
    height: "100% !important",

    "& .MuiTreeItem-root": {
      "& .MuiCollapse-root": {
        marginLeft: "25px",

        // '& .MuiCollapse-wrapperInner': {

        // },
      },

      "& .MuiTreeItem-content": {
        height: "45px",
        borderBottom: "solid 1px #9ea7ff",
        backgroundColor: "unset",
        padding: "0px",
        "& .MuiTreeItem-label": {
          paddingLeft: 0,

          "& .tree-label": {
            "& .MuiTypography-root": {
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: 500,
              color: "#353535",
            },
          },
        },

        "&:hover": {

            backgroundColor: "rgba(0, 0, 0, 0.04)",

        },
      },

      "& .Mui-selected": {
        "&:hover": {
          "& .MuiTreeItem-content": {
            backgroundColor: "unset",
          },
        },

        "&.Mui-focused": {
          backgroundColor: "unset !important",
        },

        "& .MuiTreeItem-label": {
          "& .MuiTypography-root": {
            color: "#1825aa !important",
          },
        },
      },
    },
    '& .custom-selected': {
      "& .tree-label.parent-folder": {
        "& .MuiTypography-root": {
          color: "#1825aa !important",
        },
      },
    }
  },
  subchildlist: {
    '& .custom-selected': {
      "& .tree-label": {
        "& .MuiTypography-root": {
          color: "#1825aa !important",
        },
      },
    },
    "& .MuiTreeItem-label": {
      "& .tree-label": {
        "& .MuiTypography-root": {
          textTransform: "capitalize !important",
        },
      },
    },
  },
  subchilditem: {
    "& .MuiTreeItem-content": {
      borderBottom: "unset !important",
      height: "auto !important",

      "&.Mui-selected": {
        "&:hover": {
          backgroundColor: "unset",
        },

        "& .MuiTreeItem-label": {
          "& .tree-label": {
            "& .folderImg": {
              "& svg": {
                fill: "#1825aa",
              },
            },

            "& .MuiTypography-root": {
              color: "#1825aa !important",
            },
          },
        },
      },

      "& .MuiTreeItem-label": {
        "& .tree-label": {
          alignItems: "center",
          padding: "6px 0",

          "& .folderImg": {
            margin: '0 7px 0 5px !important',
            width: '18px',
            height: '18px',
            "& svg": {
              fontSize: "18px",
              color: "#353535",
            },
          },

          "& .MuiTypography-root": {
            textTransform: "capitalize !important",
            color: "#353535 !important",
          },
        },
      },
    },
  },

}));

export default ListTemplateStyle;