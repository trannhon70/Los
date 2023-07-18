import { makeStyles } from "@mui/styles";

const exceptionInfoStyle = makeStyles(() => ({
    root: {
        '& .mscb-exception-info-grid':{
            borderBottom: '1px solid #000'
        },
        '& .mscb-exception-header-left':{
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            '& .MuiTypography-h5':{
                fontSize: '18px',
                fontWeight: 500
            },
            '& .exception-stt-label':{
                width: '10%'
            },
            '& .exception-type-label':{
                width: '45%'
            },
            '& .exception-quantity-label':{
                width: '45%'
            },
        },
        '& .mscb-exception-header-right':{
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            '& .exception-check-box':{
                padding: '7px 14.5px 7px 0',
                display: 'flex',
                alignItems: 'center',
                '& .exception-check-btn':{
                    width: '140px',
                    height: '32px',
                    backgroundColor: '#fff',
                    border: '1px solid var(--mscb-primary)'
                }
            },
            '& .exception-action-box':{
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center',
                paddingLeft: '14.5px',
                borderLeft: '1px solid #EAEAEA',
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
})) as Function;

export default exceptionInfoStyle;
