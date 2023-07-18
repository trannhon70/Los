import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const angles = ["", "t", "b", "l", "r", "x", "y"];
const propSuff = [
  "",
  "Top",
  "Bottom",
  "Left",
  "Right",
  "LeftRight",
  "TopBottom",
];
const mp = { m: "margin", p: "padding" };

const generateMarginPadding = (
  start = 0,
  end = 25,
  increment = 0.25,
  unit = "rem"
) => {
  let classList: Record<string, any> = {};

  for (let i = start; i <= end; ++i) {
    let mg = `${i * increment}${unit}!important`;

    // eslint-disable-next-line array-callback-return
    angles.map((a, p) => {
      for (let x in mp) {
        let name = mp[x as keyof typeof mp];
        let akey = `.${x}${a}-${i}${unit === "px" ? "px" : ""}`;
        let aprop = `${name}${propSuff[p]}`;
        classList[akey] = { [aprop]: mg };

        if (a === "x") {
          classList[akey] = {
            [`${name}Left`]: mg,
            [`${name}Right`]: mg,
          };
        } else if (a === "y") {
          classList[akey] = {
            [`${name}Top`]: mg,
            [`${name}Bottom`]: mg,
          };
        }
      }
    });
  }

  return classList;
};

const generateHeightWidth = (
  start = 0,
  end = 400,
  increment = 4,
  unit = "px"
) => {
  let classList: Record<string, any> = {};

  for (let i = start; i <= end; i += increment) {
    classList[`.w-${i}`] = {
      width: `${i}${unit}!important`,
    };
    classList[`.min-w-${i}`] = {
      minWidth: `${i}${unit}!important`,
    };
    classList[`.max-w-${i}`] = {
      maxWidth: `${i}${unit}!important`,
    };
    classList[`.h-${i}`] = {
      height: `${i}${unit}!important`,
    };
    classList[`.min-h-${i}`] = {
      minHeight: `${i}${unit}!important`,
    };
    classList[`.max-w-${i}`] = {
      maxHeight: `${i}${unit}!important`,
    };
  }

  return classList;
};

const spacingStyle = makeStyles((theme: Theme) => ({
  "@global": {
    ".px-80": {
      paddingRight: "80px",
      paddingLeft: "80px",
      [theme.breakpoints.down("sm")]: {
        paddingRight: "16px",
        paddingLeft: "16px",
      },
    },
    ".px-sm-30": {
      padding: "0px 30px",
      [theme.breakpoints.down("sm")]: {
        padding: "0px 16px",
      },
    },
    ".p-sm-24": {
      padding: "24px !important",
      [theme.breakpoints.down("sm")]: {
        padding: "16px !important",
      },
    },
    ".px-sm-24": {
      padding: "0px 24px !important",
      [theme.breakpoints.down("sm")]: {
        padding: "0px 12px !important",
      },
    },
    ".pt-sm-24": {
      paddingTop: "24px !important",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "16px !important",
      },
    },
    ".pl-sm-24": {
      paddingLeft: "24px !important",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "16px !important",
      },
    },
    ".m-auto": { margin: "auto !important" },
    ".mx-auto": {
      marginLeft: "auto !important",
      marginRight: "auto !important",
    },
    ".my-auto": {
      marginTop: "auto !important",
      marginBottom: "auto !important",
    },
    ".m-sm-30": {
      margin: "30px",
      [theme.breakpoints.down("sm")]: {
        margin: "16px",
      },
    },
    ".mb-sm-30": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "16px",
      },
    },
    ".max-w-full": { maxWidth: "100%!important" },
    ".min-w-full": { minWidth: "100%!important" },
    ".min-w-full-screen": { minWidth: "100vw!important" },
    ".w-full-screen": { width: "100vw" },
    ".min-w-600": { minWidth: "600px" },
    ".min-w-750": { minWidth: "750px" },
    ".min-w-1050": { minWidth: "1050px" },
    ".max-w-450": { maxWidth: "450px" },
    ".max-w-550": { maxWidth: "550px" },
    ".max-h-500": { maxHeight: "500px" },
    ".max-w-600": { maxWidth: "600px" },
    ".max-w-770": { maxWidth: "770px" },
    ".max-w-800": { maxWidth: "800px" },
    ".max-w-850": { maxWidth: "850px" },
    ".max-w-900": { maxWidth: "900px" },
    ".max-w-1340": { maxWidth: "1340px" },
    ".h-full": { height: "100%!important" },
    ".min-h-full": { minHeight: "100%!important" },
    ".h-auto": { height: "auto" },
    ".h-full-screen": { height: "100vh" },
    ".min-h-full-screen": { minHeight: "100vh!important" },
    ".h-150px": { height: "150px!important" },
    ".size-36": { height: "36px!important", width: "36px!important" },
    ".size-24": { height: "24px!important", width: "24px!important" },
    ...generateMarginPadding(0, 25, 0.25, "rem"),
    ...generateMarginPadding(1, 16, 1, "px"),
    ...generateMarginPadding(-25, -1, 0.25, "rem"),
    ...generateMarginPadding(-16, -1, 1, "px"),
    ...generateHeightWidth(),
  },
})) as Function;

export default spacingStyle;
