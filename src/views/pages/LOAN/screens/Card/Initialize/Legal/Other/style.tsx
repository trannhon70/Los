import { makeStyles } from "@mui/styles";

const OtherCardStyle = makeStyles(() => ({
  root: {
    inputLabel: {
      "& label": {
        fontSize: "14px",
      },
    },

    "& .card-inside-body": {
      padding: "20px",
    },

    "& legend": {
      fontSize: "16px !important",
    },

    "& label.MuiInputLabel-root": {
      fontWeight: "500!important",
      fontSize: "14px",
    },

    "& .mscb-identification-info": {
      display: "flex",
      flexBasis: "100%",
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
        marginLeft: "0px",
        "justify-content": "flex-start",

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
})) as Function;
export default OtherCardStyle;
