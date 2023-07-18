import { makeStyles } from "@mui/styles";

const exceptionRowStyle = makeStyles(() => ({
    root: {
        '& .mscb-exception-row-grid':{
            borderBottom: '2px solid rgba(234,234,234,1)',
            borderTop: '2px solid rgba(234,234,234,1)',
            '& .mscb-exception-row-left':{
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding:'17px 0',
                '& .MuiTypography-h5':{
                    fontSize: '18px',
                    fontWeight: 500
                },
                '& .exception-stt-label':{
                    width: '10%',
                    paddingLeft: '10px'
                },
                '& .exception-type-label':{
                    width: '45%',
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent:'space-between',
                    alignItems: 'center',
                    '& .exception-legal-select':{
                        maxWidth: '200px',
                        height: '40px'
                    },
                    '& .MuiSelect-select':{
                        backgroundColor: 'var(--mscb-primary)!important',
                        color: '#fff'
                    },
                    '& .Mui-disabled': {
                        background: '#182592!important',
                        WebkitTextFillColor: '#fff'
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#fff'
                    },
                    '& .exception-add-new-label':{
                        maxWidth: '85px',
                        padding: '0 10px',
                    }
                },
                '& .exception-quantity-label':{
                    width: '45%',
                    '& .exception-quantity-input':{
                        maxWidth: '187px',
                        height: '40px',
                        '& .icon-check':{
                            marginRight: '10px'
                        },
                        '& .icon-delete':{
                            marginRight: '10px'
                        }
                    }
                },
            },
            '& .mscb-exception-row-right':{
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                padding: '17px 0',
                '& .exception-action-box':{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    paddingLeft: '14.5px',
                    height: '20px',
                    '& .icon-add-box':{
                        width: '20px',
                        height: '20px'
                    },
                    '& .icon-trash-box':{
                        width: '20px',
                        height: '20px',
                        marginLeft: '9px'
                    },
                    '& .icon-pen-box':{
                        width: '20px',
                        height: '20px',
                        marginLeft: '9px'
                    },
                    '& .icon-collapse-box':{
                        width: '20px',
                        height: '20px',
                        marginLeft: '9px'
                    }
                }
            },
        }
    }
})) as Function;

export default exceptionRowStyle;
