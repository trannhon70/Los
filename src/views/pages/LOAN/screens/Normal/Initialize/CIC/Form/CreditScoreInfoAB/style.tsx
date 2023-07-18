import { makeStyles } from '@mui/styles';

const creditScoreInfoStyles = makeStyles(() => ({
  root: {
    // height: 'calc(100% - 20px)',
    borderBottom: 'unset !important',
    '& .card-inside-body': {
      padding: '24px 12px',
      borderBottom: 'unset',
    },
    '& .type_customer': {
      height: 'calc(100% - 20px)',
      '& .checkbox_type_customer': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '6px',
        height: 'calc(100% - 6px)',
        backgroundColor: '#f2f3f9',
        paddingLeft: '17px',
        '& .mscb-option-list-checked': {
          '& .MuiListItemText-dense': {
            color: '#f61f1f',
            '& span': {
              fontWeight: '500',
            },
          },
        },
        '& label': {
          borderBottom: 'solid 1px #b6b6b6',
          height: '40px',
          width: '100%',
        },
        '& .Mui-checked + span': {
          color: '#f61f1f !important',
          fontWeight: '500 !important',
        },
        '& .MuiFormControlLabel-root': {
          '& .MuiFormControlLabel-label': {
            '&.Mui-disabled': {
              color: '#353535',
              fontWeight: 400,
            },
          },
        },
      },
      '& .MuiTypography-root': {
        fontSize: '14px',
        color: '#353535',
      },
    },
    '& .mscb-table-border-score': {
      '& .active': {
        backgroundColor: '#f2f3f9',
      },
      '& th, & td': {
        borderTop: ' solid 1px #d5d5d5',
        borderLeft: 'solid 1px #d5d5d5',
        color: '#353535',
        '& .customer_icon': {
          color: 'var(--mscb-white)',
          backgroundColor: 'var(--mscb-danger)',
          borderRadius: '50%',
        },
      },
      '& tr': {
        '&:last-child': {
          '& td': {
            borderBottom: 'solid 1px #d5d5d5',
          },
        },
        '& th, & td': {
          '&:last-child': {
            borderRight: 'solid 1px #d5d5d5',
          },
        },
      },
    },
  },
  checkboxTypeCustomerDisabled: {
    '& .checkbox_type_customer': {
      backgroundColor: '#d7d8e4 !important',
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#1825aa',
    marginLeft: '5px',
  },

  inputLabel: {
    '& .MuiFormControl-root': {
      '& label': {
        fontSize: '14px !important',
      },
    },
    '& .MuiInput-root': {
      '& svg': {
        marginRight: '8px',
      },
    },
  },
  disabledInput: {
    '& .Mui-checked': {
      color: '#1825aa !important',
    },
    '& .Mui-disabled .MuiSelect-select': {
      backgroundColor: '#d7d8e4 !important',
    },
    '& .Mui-disabled': {
      color: '#353535',
      WebkitTextFillColor: 'unset!important',
      fontWeight: 500,
    },
  },
})) as Function;

export default creditScoreInfoStyles;
