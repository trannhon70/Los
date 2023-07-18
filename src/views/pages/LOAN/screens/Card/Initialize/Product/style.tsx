import { makeStyles } from "@mui/styles";

const CardProductGroupStyle = makeStyles(() => ({
    root: {

        marginLeft: '0 !important',
        width: '100% !important',
        paddingBottom: '1.5rem !important',
        // paddingLeft: '20px !important',
        paddingTop: '14px !important',
        // marginTop: '0 !important',
        "& .card-product-title": {
            color: '#071180',
        },
        '& .grouplist-box': {
            "& .height-group": {
                height: 'calc(100% - 40px)',
            },
            paddingLeft: '0 !important',
            '& ul.MuiList-root': {
                backgroundColor: '#f2f3f9',
                padding: '16px',
                minHeight: '285px',
            },
            '& .mscb-option-list-checked': {
                '& span.MuiTypography-root': {
                    color: 'var(--mscb-danger)',
                    fontWeight: '500',
                },
            },
            '& h3.MuiTypography-root': {
                color: 'var(--mscb-black) !important',
            }
        },
        "& .label-product": {
            marginTop: '3px',
            "& .MuiFormControl-root": {
                '& label': {
                    fontSize: 'var(--mscb-fontsize) !important',
                    marginBottom: '0px',
                    lineHeight: 'normal',
                },
                '& .MuiFormControl-root.MuiTextField-root': {
                    marginTop: '8px',
                },
                "& .Mui-focused": {
                    color: 'var(--mscb-black) !important',
                },
                "& .MuiFormControlLabel-label": {
                    fontSize: '13px',
                },
                "& svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium": {
                    fontSize: '22px',
                }
            }
        },

        '& .MuiGrid-root': {
            '&.right-product': {
                paddingLeft: '77px !important',
                // paddingRight: '77px !important',
                borderLeft: 'solid 1px #d5d5d5',
            },
            '&.left-product': {
                paddingRight: '47px',
                paddingTop: '0',
                // paddingLeft: '27px',
                width: '100%'
            },
            '@media screen and (max-width: 1535px)': {
                '&.right-product': {
                    marginTop: '24px',
                    paddingLeft: '24px !important',
                    paddingRight: '24px !important',
                    border: 'none',
                },
                // '&.left-product': {
                //     paddingRight: '27px',
                // },
            }
        },
        '& > .MuiGrid-root.MuiGrid-item': {
            paddingLeft: '0px !important ',
        },

        '& .disabled': {
            '& .MuiFormControl-root': {
                '& .MuiInputLabel-root': {
                    opacity: '0.5',
                },
                '& .MuiFormControl-root': {
                    pointerEvents: 'none',
                    opacity: '0.5',
                }
            }
        }
    },
    inputLabel: {
        "& .MuiInput-root": {
            "& svg": {
                marginRight: "8px"
            }
        }
    },
    arrow: {
        margin: 'auto',
        '& svg': {
            color: 'var(--mscb-primary)'
        }
    }
})) as Function;

export default CardProductGroupStyle;