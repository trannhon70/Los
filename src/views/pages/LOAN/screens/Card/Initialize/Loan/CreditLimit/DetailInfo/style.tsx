import { makeStyles } from '@mui/styles';

const DetailInfoStyle = makeStyles(() => ({
    inputLabel: {
        '& .MuiFormControl-root': {
            '& label': {
                fontSize: "14px",
            }
        },
        "& .MuiInput-root": {
            "& svg": {
                marginRight: "8px"
            }
        },
        '& .inputDisabled': {
            '& input.MuiInput-input.MuiInputBase-input.Mui-disabled': {
                '-webkit-text-fill-color': 'var(--mscb-secondary)',
                fontWeight: '500',
            },
        },
        '& .inputDisabled-red': {
            '& input.MuiInput-input.MuiInputBase-input.Mui-disabled': {
                '-webkit-text-fill-color': 'var(--mscb-danger)',
                fontWeight: '500',
            },
        },
        '& .hasException': {
            "& .MuiInput-root": {
                "& svg": {
                    marginRight: '0',
                    fontSize: '16px',
                    color: 'var(--mscb-danger)',
                },
            },
        },
        '& .edit-casa': {
            position: 'relative',
        },
        '& .edit': {
            position: 'absolute',
            color: 'var(--mscb-primary)',
            right: '0',
            cursor: 'pointer',
            zIndex: 2,
            fontSize: '13px',
        },
    },
    root: {
        height: 'calc(100% - 20px)',
        '& .card-inside-body': {
            padding: '20px',
        },
        '& label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd': {
            alignItems: 'flex-start',
            '& span.MuiTypography-root': {
                fontSize: '14px',
                color: 'var(--mscb-secondary)',
            },
            '& span.MuiRadio-root.MuiRadio-colorPrimary.MuiButtonBase-root.MuiRadio-root': {
                marginTop: '-9px',
                '& svg.MuiSvgIcon-root': {
                    fontSize: '20px',
                },
            },
        },
    },
    textarea: {
        "& textarea": {
          height: '83px !important',
          padding: 10,
          overflowY: "scroll!important",
          overflowX: "hidden!important",
          backgroundColor: "#f2f3f9",
          marginBottom: '0!important',
          border: "none",
          resize: "none",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            fontSize: '14px'
        },
        "& textarea::-webkit-scrollbar": {
          width: '5px',
          "border-radius": "50px"
        },
        "& textarea::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        },
        "& textarea::-webkit-scrollbar-thumb": {
          'background': '#d5d5d5',
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)"
        },
        "& textarea:focus": {
          outline: "none"
        }
    },
    objectListClass: {
        '& .ObjectListLabel': {
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          border: 'none',
          borderBottom: '1px solid var(--mscb-secondary)',
          height: 'auto',
          marginTop: 0,
          marginRight:'5px',
          '& .object-list-number': {
            marginTop: 0,
            marginLeft: '2px',
            fontSize: '12px',
            color: 'var(--mscb-secondary)',
            fontWeight: 'normal',
            height: 'auto',
            lineHeight: 1
          },
        },
        "& .object-list-box": {
            "&.active .MuiAvatar-root": {
              border: 'none',
              backgroundColor: 'var(--mscb-primary)'
            }
        },
    }
}));

export default DetailInfoStyle;