import { makeStyles } from "@mui/styles";

const GroupListStyle = makeStyles(() => ({
  root: {
    "& .swiper-button-prev": {
      display: "flex",
      alignItem: "center",
      top: "0",
      left: "0",
      transform: "translate(-22%, 2%)",
      height: "36px",
      color: "var(--mscb-secondary)",
      cursor: "pointer",
      zIndex: "1000",
      position: "absolute",
    },
    "& .value_money": {
      display: "flex",
      "justify-content": "center",
    },
    "& .swiper-button-next": {
      display: "flex",
      alignItem: "center",
      color: "var(--mscb-secondary)",
      right: "0",
      cursor: "pointer",
      zIndex: "1000",
      top: "0",
      position: "absolute",
      marginTop: "unset",
      transform: "translate(22%, 7%)",
    },
    "& .scroll-groupList": {
      height: "unset !important",
      minHeight: "unset !important",
      "& div:first-child": {
        position: "unset !important",
      },
    },
  },

  vertical: {
    padding: "0px !important",
    maxHeight: "300px",
    "& .item": {
      overflow: "hidden",
      cursor: "pointer",
      border: "solid 1px #eee",
      backgroundColor: "#fafafa",
      "& .item-value-money": {
        height: "50px",
      },
      "& .item-value": {
        width: "100%",
        marginBottom: "1px",
        padding: "9px 12px",
        display: "flex",
        alignItems: "center",
        "& .icon": {
          backgroundColor: "#d5d5d5",
          fontSize: "12px",
          borderRadius: "50%",
          color: "#707070",
          minWidth: "25px",
          minHeight: "25px",
          textAlign: "center",
          lineHeight: "25px",
        },

        "& .label": {
          fontSize: "14px",
          letterSpacing: "normal",
          color: "#353535",
          marginLeft: "10px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },

      "& .button-delete": {
        height: "39px",
        padding: "9px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& svg": {
          color: "#aaa",
          fontSize: "18px",
        },
        "& :hover": {
          backgroundColor: "var(--mscb-gray)",
          borderRadius: "50%",
        },
      },
    },

    "& .item.active": {
      boxShadow: "0 4px 8px 0 rgba(53, 53, 53, 0.16)",
      border: "solid 1px #d5d5d5",
      backgroundColor: "#fff",
      marginBottom: "2px",

      "& .item-value": {
        "& .icon": {
          backgroundColor: "#1825aa",
          color: "#fff",
        },

        "& .label": {
          fontWeight: "500",
          color: "#1825aa",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },

  horizontal: {
    position: "relative",
    display: "flex",
    height: "36px",
    padding: "0 24px !important",

    "& .horizontal-list": {
      "& .react-swipeable-view-container": {
        height: "36px",

        "& div": {
          width: "auto !important",
          marginRight: "1px",
        },
      },
    },

    "& .item": {
      marginLeft: "1px",
      display: "flex",
      "white-space": "nowrap !important",
      cursor: "pointer",
      backgroundColor: "#d5d5d5",
      padding: "9px 24px 9px 12px",

      "&:first-child": {
        marginLeft: "unset",
      },

      "& .icon": {
        color: "#353535",
      },

      "& .label": {
        marginLeft: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#353535",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },

      "& .icon-more": {
        height: "24px",
        width: "24px",
        position: "absolute",
        minWidth: "unset",
        right: "0",
      },
    },

    "& .item.active": {
      backgroundColor: "#1825aa",

      "& .icon": {
        color: "#fff",
      },

      "& .label": {
        fontWeight: "500",
        color: "#fff",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },

      "& .icon-more": {
        color: "#fff",
      },
    },

    "& .button-add": {
      width: "36px !important",
      height: "36px !important",
      minWidth: "unset !important",
      padding: "unset",
      justifyContent: "center",
      borderTop: "unset !important",

      "& svg": {
        width: "36px",
        height: "36px",
        padding: "8.5px 8px",
        border: "solid 1px #1825aa",
        backgroundColor: "#fff",
      },
    },
  },

  buttonAdd: {
    paddingLeft: "20px",
    width: "100% !important",
    border: "unset !important",
    borderTop: "solid 2px rgba(0, 0, 0, 0.16) !important",
    borderRadius: "unset !important",
    justifyContent: "start !important",

    "& .labelAdd": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: '20px,'
    },
  },
})) as Function;

export default GroupListStyle;
