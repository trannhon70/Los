import { makeStyles } from '@mui/styles';

const formsStyle = makeStyles(() => ({
  root: {
    '& .history-card-outside': {
      '& .mscb-outside-card-content': {
        overflow: 'auto',
        paddingLeft: '12px !important',
        height: '250px',
      },
      '& .list-container': {
        paddingBottom: '0 !important',
        '& .MuiListSubheader-root': {
          margin: 0,
          fontSize: '14px',
          color: "#000",
          fontWeight: 500,
          padding: 0,
          lineHeight: '40px',
        },
        '& .full-name': {
          color: "#000",
          fontSize: '14px'
        },
        '& .MuiListItemSecondaryAction-root': {
          top: "25px",
          '& button': {
            color: 'var(--mscb-primary)',
            fontSize: '14px',
          }
        },
        '& .MuiListItem-container': {
          '& .MuiListItem-root': {
            paddingLeft: 0,
            paddingRight: 30,
          },
        },
        "& .item-text": {
          "& .full-name-label": {
            color: '#353535'
          },
          "& .content-label": {
            fontStyle: 'italic',
            color: '#707070'
          },
        }
      },
    },
    "& .pdf-viewer-container": {
      "& .metadata-info": {
        "& .title": {
          display: 'inline-flex',
          height: '40px',
          lineHeight: '40px',
          marginTop: '20px',
          fontSize: '16px',
          fontWeight: 500,
          paddingLeft: '5px',
        },
        "& .row-line": {
          display: 'flex',
          height: '1px',
          width: '100%',
          backgroundColor: '#eee',
          marginBottom: '20px',
        },
        "& .color-path": {
          width: '15%',
          height: 'inherit',
          backgroundColor: '#1825aa',
        },
        "& .input-info": {
          marginBottom: '24px',
          maxHeight: 250,
          overflow: 'auto',
          "& label": {
            marginBottom: '5px !important'
          },
          "& .mscb-input": {
            marginBottom: '8px',
            "&:last-child": {
              marginBottom: 0
            },
          }
        },
        "& .btn-save-info": {
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }
      }
    }
  }
}));

export default formsStyle;