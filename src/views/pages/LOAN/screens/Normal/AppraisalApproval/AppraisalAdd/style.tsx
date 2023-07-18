import { makeStyles } from "@mui/styles";
import { SxBaseApp } from "types/app";

const AppraisalAddStyle = makeStyles(() => ({
  root: {
    paddingTop: "20px",
    "& Steps.steps": {
      "& .title-folder-step": {
        "& .title-folder-step": {
          display: "none",
        },
      },
      "& .subSteps": {
        transform: "translateX(10%)",
      },
    },
    "& .MuiStepLabel-label": {
      whiteSpace: "normal",
      textTransform: "uppercase",
    },
    "&.loanStep": {
      "& .MuiStep-horizontal": {
        "& .MuiStepLabel-label": {
          fontWeight: "600 !important",
          width: "200px",
          display: "block",
          whiteSpace: "normal",
          paddingLeft: "24px",
          paddingRight: "24px",
          "&::after": {
            top: "70% !important",
            height: "20px !important",
          },
        },
      },
    },
    "&>.MuiTabs-root": {
      "& .MuiTabs-flexContainer ": {
        justifyContent: "center",
      },
      "& .mscb-step-label": {
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
  },
  title: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1825aa",
    marginLeft: "5px",
  },
  inputHeight: {
    height: '100%',
    //justifyContent: 'space-between'
  },
  controlOpinion:{
    fontSize:'19px',
    fontWeight: 'bold',
    color:'#353535'
  },
  control:{
    width:'358px',
    height:'36px',
    backgroundColor:'#1825aa',
    color:'#fff',
    fontSize:'14px',
    fontWeight:500,
    padding: '10px 12px',
    textTransform:'uppercase',
  }
}));
export default AppraisalAddStyle;

export const SxTextAreaNoteH60 : SxBaseApp = {
  "& textarea": {
    height: "60px !important",
    padding: "10px",
    overflowY: "scroll!important ",
    overflowX: "hidden!important",
    border: "none",
    resize: "none",
    fontSize: "14px",
    background: "#f2f3f9 !important",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },
  "& textarea::-webkit-scrollbar": {
    width: "5px",
    borderRadius: "50px",
  },
  "& textarea::-webkit-scrollbar-thumb": {
    WebkitBoxShadow:
      "inset 0 0 6px rgba(0,0,0,0.5) !important",
  },
  "& textarea:focus": {
    outline: "none",
  },
}

export const SxTextAreaNoteH180 : SxBaseApp = {
  "& textarea": {
    height: "230px !important",
    padding: "10px",
    overflowY: "scroll!important ",
    overflowX: "hidden!important",
    border: "none",
    resize: "none",
    fontSize: "14px",
    background: "#f2f3f9 !important",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },
  "& textarea::-webkit-scrollbar": {
    width: "5px",
    borderRadius: "50px",
  },
  "& textarea::-webkit-scrollbar-thumb": {
    WebkitBoxShadow:
      "inset 0 0 6px rgba(0,0,0,0.5) !important",
  },
  "& textarea:focus": {
    outline: "none",
  },
}