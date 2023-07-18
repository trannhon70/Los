import { makeStyles } from "@mui/styles";

const colorStyle = makeStyles(() => ({
  "@global": {
    ".bg-input": {
      backgroundColor: "var(--mscb-bg-input)!important"
    },
    ".bg-input-disabled": {
      backgroundColor: "var(--mscb-bg-input-disabled)!important"
    },
    ".bg-primary,.btn-primary": {
      backgroundColor: "var(--mscb-primary)!important",
      color: "#fff"
    },
    ".bg-secondary,.btn-secondary": {
      backgroundColor: "var(--mscb-secondary)!important",
      color: "#fff"
    },
    ".bg-success,.btn-success": {
      backgroundColor: "var(--mscb-success)!important",
      color: "#fff"
    },
    ".bg-info,.btn-info": {
      backgroundColor: "var(--mscb-info)!important",
      color: "#fff"
    },
    ".bg-danger,.bg-error,.btn-danger,.btn-error": {
      backgroundColor: "var(--mscb-danger)!important",
      color: "#fff!important"
    },
    ".bg-warning,.btn-warning": {
      backgroundColor: "var(--mscb-warning)!important",
      color: "#fff"
    },
    ".bg-white,.btn-white": {
      backgroundColor: "#fff!important",
      color: "var(--mscb-black)"
    },
    ".bg-gray,.btn-gray": {
      backgroundColor: "var(--mscb-gray)!important",
      color: "var(--mscb-black)"
    },
    ".bg-black,.btn-black": {
      backgroundColor: "var(--mscb-black)!important",
      color: "#fff"
    },
    ".bg-yellow,.btn-yellow": {
      backgroundColor: "var(--mscb-yellow)!important",
      color: "#fff"
    },
    ".bg-pink,.btn-pink": {
      backgroundColor: "var(--mscb-pink)!important",
      color: "#fff"
    },
    ".bd-primary": {
      borderColor: "var(--mscb-primary)!important",
    },
    ".bd-secondary": {
      borderColor: "var(--mscb-secondary)!important",
    },
    ".bd-success": {
      borderColor: "var(--mscb-success)!important",
    },
    ".bd-info": {
      borderColor: "var(--mscb-info)!important",
    },
    ".bd-error,.bd-danger": {
      borderColor: "var(--mscb-danger)!important",
    },
    ".bd-warning": {
      borderColor: "var(--mscb-warning)!important",
    },
    ".bd-white": {
      borderColor: "#fff!important",
    },
    ".bd-gray": {
      borderColor: "var(--mscb-gray)!important",
    },
    ".bd-black": {
      borderColor: "var(--mscb-black)!important",
    },
    ".bd-yellow": {
      borderColor: "var(--mscb-yellow)!important",
    },
    ".bd-pink": {
      borderColor: "var(--mscb-pink)!important",
    },
  }
})) as Function;

export default colorStyle;