import { makeStyles } from "@mui/styles";
import bg from "assets/images/bg/login.png";

const loginStyle = makeStyles(() => ({
  
  page: {
    // backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
  },
  title: {
    borderBottom: "5px solid var(--mscb-primary)!important"
  },
  scrollLogin: {
    '& div:first-child': {
      overflowX:'unset !important'
    }
  }
})) as Function;

export default loginStyle;
