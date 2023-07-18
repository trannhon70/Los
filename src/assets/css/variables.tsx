import { Theme } from '@mui/material';
import { makeStyles } from "@mui/styles";

const variablesStyle = makeStyles((theme: Theme) => ({
  "@global": {
    ":root": {
      "--mscb-primary": theme.palette.primary.main,
      "--mscb-secondary": theme.palette.secondary.main,
      "--mscb-danger": theme.palette.error.main,
      "--mscb-success": theme.palette.success.main,
      "--mscb-warning": theme.palette.warning.main,
      "--mscb-bg-input": "#f2f3f9",
      "--mscb-bg-input-disabled": "#d7d8e4",
      "--mscb-placeholder": "rgb(133, 133, 133)",
      "--mscb-info": "#209cee",
      "--mscb-gray": "#eeeff5",
      "--mscb-red": "#ff0000",
      "--mscb-disable": "#353535",
      "--mscb-yellow": "#f8ad08",
      "--mscb-pink": "#5b6bff",
      "--mscb-black": "#33375d",
      "--mscb-white": "#fff",
      "--mscb-fontsize": "14px",
      "--mscb-sidebar-width": "288px",
      "--mscb-sidebar-collapsed-width": "70px",
      "--mscb-sidebar-padding": "20px",
      "--mscb-topbar-height": "66px"
    }
  }
})) as Function;

export default variablesStyle;