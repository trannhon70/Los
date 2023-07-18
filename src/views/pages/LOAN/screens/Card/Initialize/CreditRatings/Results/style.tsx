import { makeStyles } from '@mui/styles';

const resultsStyle = makeStyles(() => ({
	title: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '8px',
        '& h5': {
            fontSize: '19px',
        },
        '&>button': {
            borderRadius: 0,
            marginLeft: '24px',
            padding: '8px 15px',
            boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)',
            textTransform: 'none',
            lineHeight: 0,
        }
    },
    cardRoot: {
        height: 'calc(100% - 20px)',
        '& .card-inside-body': {
            padding: '20px',
        },
        '& .mscb-input': {
            '&>label': {
                fontSize: '14px',
                fontWeight: '500',
            },
            '& .MuiInput-input': {
                fontWeight: '500',
                color: 'red',
                '-webkit-text-fill-color': 'unset',
            },
        },
        '& .update-info': {
            fontStyle: 'italic',
            fontSize: '12px',
            fontWeight: 'normal',
            letterSpacing: 'normal',
            marginTop: '17px',
            display: 'flex',
            justifyContent: 'flex-end',
            '&>.label': {
                color: '#707070',
            },
            '& .count': {
                color: 'var(--mscb-primary)',
                textDecoration: 'underline',
            },
            '&>.updated-at': {
                color: 'var(--mscb-primary)',
            },
        },
        '& .disable-black': {
            '& .MuiInput-input': {
                color: 'var(--mscb-secondary) !important',
            },
        },
        '& .edit': {
            position: 'absolute',
            color: 'var(--mscb-primary)',
            right: '0',
            cursor: 'pointer',
            zIndex: 2,
            fontSize: '13px',
        },
        '& .rating-grid': {
            position: 'relative',
        },
    },
    textarea: {
        "& textarea": {
          height: '83px !important',
          padding: 10,
        //   overflowY: "scroll!important",
          overflowX: "hidden!important",
          backgroundColor: '#d7d8e4 !important',
          marginBottom: '0!important',
          border: "none",
          resize: "none",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            fontSize: '14px'
        },
        // "& textarea::-webkit-scrollbar": {
        //   width: '5px',
        //   "border-radius": "50px"
        // },
        // "& textarea::-webkit-scrollbar-track": {
        //   "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        // },
        // "& textarea::-webkit-scrollbar-thumb": {
        //   'background': '#d5d5d5',
        //   "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)"
        // },
        // "& textarea:focus": {
        //   outline: "none"
        // },
    },
}));

export default resultsStyle;
