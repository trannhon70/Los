import { SxBaseApp } from "types/app";
import { makeStyles } from '@mui/styles';

export const SxModalComfirm: SxBaseApp = {
  marginTop: "10px",
  display: "grid",
  "& .corrdinator-status-chile": {
    color: "#1825aa"
  },
  "& .corrdinator-status-chile::after": {
    width: "14px",
    height: "14px",
    backgroundColor: "#1a9b06"
  },
  "& .corrdinator-status-chile-success": {
    width: "14px",
    height: "14px",
    backgroundColor: "#1825aa",
    marginRight: "10px",
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-stop": {
    width: "14px",
    height: "14px",
    backgroundColor: "#f1b513",
    margin: ' 0.5px 6px 2px 16px',
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-late": {
    width: "14px",
    height: "14px",
    backgroundColor: "#eb0029",
    margin: ' 0.5px 6px 2px 16px',
    padding: '0px 8.5px 0px 7.5px'
  },
  "& .corrdinator-status-chile-borber": {
    borderRight: '2px solid #d8d8d8',
    borderLeft: '2px solid #d8d8d8',
  }
}

const collapsibleTablePermissionStyle = makeStyles(() => ({
  root: {
    "border-bottom": " 1px solid black !important",
    '& .MuiTableHead-root': {
      width: '100%',
      display: 'flex',
    },
    "& .checked-date": {
      display: 'flex',
      justifyContent: 'center !important',
    },
    '& .MuiTableRow-root': {
      width: '100%',
      display: 'flex',
    },
    "& .MuiTableBody-root": {
      "& .level1": {
        "& .MuiTableCell-root": {
          fontSize: "14px !important",
          color: "#1825aa !important",
          textTransform: "uppercase !important",
          fontWeight:500,
        }
      },
      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          "display": "flex",
          "align-items": "center",
          "justify-content": "end",
          "border-bottom": "none",
        }
      }
    },
    "& .MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignCenter.MuiTableCell-sizeMedium.date-modal": {
      display: 'flex',
      color: "#353535 !important",
      fontWeight: 500,
      justifyContent: 'center !important',
    },

    '& .MuiTableCell-root': {
      // width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&.MuiTableCell-head': {
        // borderBottom: '#353535 solid 1px',
        color: 'var(--mscb-secondary)',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    },
    '& .MuiCollapse-root': {
      width: '100%',
    },
    '& .level1': {
      '&.childless': {

      },
    },
    "tr:last-child td": {
      "border-bottom": "none",
    },
    '& .level2': {
      '& .MuiTableCell-root': {
        "& button": {
          marginLeft: "15px"
        },
      },
      '&.childless': {
        '& div:nth-child(2)': {
          paddingLeft: '66px',
        },
      },
    },
    '& .level3': {
      '& .MuiTableCell-root': {
        "& button": {
          marginLeft: "30px"
        }
      },
      '&.childless': {
        '& div:nth-child(2)': {
          paddingLeft: '88px',
        },
      },
    },
  
    '& .level4': {
      '& .MuiTableCell-root': {
        "& button": {
          marginLeft: "45px"
        }
      },
      '&.childless': {
        '& div:nth-child(2)': {
          paddingLeft: '118px',
        },
      },
    },
    '& .level5': {
      '& div:nth-child(1)': {
        "& button": {
          marginLeft: "60px"
        }
      },
      '&.childless': {
      },
    },
  },

})) as Function;

export default collapsibleTablePermissionStyle;
