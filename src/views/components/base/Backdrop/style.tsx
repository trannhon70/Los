import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo/logo.png";


const loadingStyle = makeStyles(() => ({
  backdrop:{
    // background: 'rgb(255, 255, 255, 0.2)!important',
    // zIndex: 999
  },
	root: {

        width: "60px",
        height: "60px",
        borderRadius: "50%",
        position: "relative",
        animation: "$rotate 1s linear infinite",
        "&::after": {
            content: '""',
            boxSizing: "border-box",
            position: "absolute",
            inset: "0px",
            borderRadius: "50%",
            border: "2px solid #FFF",
            animation: "$prixClipFix 2s linear infinite"
          },
       zIndex: 2  
	},
    logoImage:{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: '#FFF',
        zIndex: "9999",
        position: "absolute",
        "&::before": {
            content: "''",
            borderRadius: "50%",
            position: "absolute",
            width: "50px",
            height: "50px",
            backgroundImage:`url(${logo})`,

        },
    },
    "@keyframes rotate": { "100%": { transform: "rotate(360deg)" } },
    "@keyframes prixClipFix": {
        "0%": { clipPath: "polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)" },
        "25%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)" },
        "50%": {
          clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)"
        },
        "75%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)" },
        "100%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)" }
      }
})) as Function;


export default loadingStyle;