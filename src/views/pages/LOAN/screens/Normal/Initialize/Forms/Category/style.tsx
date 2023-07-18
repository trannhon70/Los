import { SxProps, Theme } from "@mui/material/styles";

export const root: SxProps<Theme> = (theme: Theme) => ({
  "& .scroll-container": {
    height: "100%",
    "& .wh-full": {
      "& .MuiAvatar-root:not(.ava-root)": {
        color: "#707070",
      },
      "& .wh-full > .wh-full": {
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
      },
    },
    "& .MuiList-padding": {
      border: "unset",
    },
    "& .MuiListItem-root": {
      marginTop: "2px !important",
    },
  },
  '& .container': {
    height: '395px',
    minHeight: '395px',
  },
  '& .label': {
    
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.36',
    textAlign: 'left',
    color: '#1825aa',
    marginTop: '8px',
    borderBottom: 'solid 1px #eee',
    // marginRight:'21px'
  },

  '& .label-checkbox': {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding:'5px',
    "& label":{
      alignItems: 'center'
    },
    "& input":{
      borderRadius:'0',
      msTransform: "scale(1.3)",
      MozTransform: "scale(1.3)",
      WebkitTransform: "scale(1.3)",
      OTransform: "scale(1.3)",
      transform: "scale(1.3)",
      padding: "10px"

    },
    "& input:disabled":{
      background: 'red'
    }

  },
  '& .radio-icon': {
    margin: '0px 5px',
    verticalAlign: 'middle',
    marginBottom: '5px',
  },
  '& .iconCollapse': {
    marginRight: '8px',
    marginLeft: '-2px',
    width: '34px',
    marginBottom: '6px',
  },
  '& .MuiTreeItem-iconContainer': {
    marginLeft: '10px',
    color: 'blue',
    fontSize: '24px',
  },

  '& .MuiFormControlLabel-root': {
    marginLeft: '9px',
    justifyContent: 'space-between',
    color: '#353535',
    focus: {
      color: 'blue',
    }
  },
  '& .MuiTreeView-root': {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'auto'
  },
  '& .MuiTreeView-root-selected': {
    backgroundColor: 'rgba(24, 37, 170, 0.08)'
  },
  '& .MuiTreeItem-label': {
    marginLeft: '7px'
  },

  '& .totalApproved': {
    color: 'var(--mscb-primary)',
    fontSize: '14px',
    padding: '10px 0px 10px 0px',
    textAlign: 'inherit',
    fontWeight: 500,
  },
  '& .boxResult': {
    border: '1px solid #eb0029',
    display: 'block',
    color: '#eb0029',
    width: 'fit-content',
    paddingLeft: '30px',
    paddingRight: '4px',
    height: '21px',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.31',
    letterSpacing: 'normal',
    textAlign: 'left',
    marginLeft: '20px',
    // marginTop: '8px'
  },
})

export const rowLine: SxProps<Theme> = {
  display: "flex",
  height: "2px",
  width: "100%",
  backgroundColor: "#eee",

}

export const colorPath: SxProps<Theme> = {
  width: "55%",
  height: "inherit",
  backgroundColor: "#1825aa",
}