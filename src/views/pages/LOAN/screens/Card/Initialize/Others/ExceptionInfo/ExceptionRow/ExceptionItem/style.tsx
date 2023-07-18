import { makeStyles } from "@mui/styles";

const exceptionItemStyle = makeStyles(() => ({
    root: {
        padding: '19px 0',
        '& .MuiTypography-subtitle2':{
            fontSize: '14px',
        },
        '& .mscb-exception-item-left':{
                paddingLeft: '5%',
            '& .exception-legal-title':{
                width: '49%'
            },
            '& .exception-code-box':{
                width: '61%',
                paddingLeft: '20px',
                '& .exception-code-label':{
                   marginBottom: '6px',
                },
                '& .MuiSelect-select':{

                },
                '& .MuiSvgIcon-root': {

                },
                '& .exception-code-select':{

                }
            },
        },
        '& .mscb-exception-item-right':{
            paddingLeft: '2.5%',
            '& .mscb-exception-input-box':{
                width: '100%',
                '& .exception-explain-grid':{
                    marginBottom: '20px',
                },
                '& .exception-explain-box':{
                    '& .exception-explain-label':{
                        marginBottom: '6px'
                    },
                    
                },
                '& .exception-explain-reality-box':{
                    '& .exception-explain-reality-label':{

                    },
                    '& .exception-explain-reality-input':{

                    }
                },
            }
        },
        '& .mscb-exception-action-box':{
            display: 'flex',
            flexDirection: "row",
            marginTop: '35px',
            height: '20px',
            '& .icon-pen-box':{
                width: '20px',
                height: '20px',
                marginLeft: '9px'
            },
            '& .icon-trash-box':{
                width: '20px',
                height: '20px',
                marginLeft: '9px'
            },
        }
    }
})) as Function;

export default exceptionItemStyle;
