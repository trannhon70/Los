import { makeStyles } from '@mui/styles';
import { SxProps, Theme } from '@mui/system';

const incomeStyle = makeStyles(() => ({
  root: {
    paddingTop: '20px',
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      textTransform: 'uppercase',
    },
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ':{
        justifyContent: 'center',
      },
      '& .mscb-step-label': {
        textTransform: 'uppercase',
        fontWeight: 'bold',
      }
    },
    '& .declare-normal-income': {
      '&>.MuiTabs-root': {
        '& .MuiTabs-flexContainer ': {
          transform: 'translateX(-10%)',
          justifyContent: 'center',
        },
        '& .MuiFormLabel-root': {
          fontWeight: 'bold',
        }
      },
      '& .mscb-step-extra': {
        transform: 'translateX(45px) !important',
        padding: '0px',
        left: '-64%'
      },
      '& .step-user-normal-income': {
        '&>.MuiTabs-root': {
          '& .MuiTabs-flexContainer ': {
            justifyContent: 'center',
          },
          '& .MuiFormLabel-root': {
            fontWeight: 'bold'
          }
        }
      }
    }
  },
  stepActivities: {
    marginBottom:'20px',
    marginLeft: '-15em',
    '& .MuiStepLabel-label': {
      whiteSpace: 'normal',
      width: '221px',
      fontWeight: '500',
      paddingLeft: '10px !important',
    },
  },
  inputSteps: {
    // width: '147px !important',
    // marginTop: '10px !important',
    '& input.MuiInput-input': {
      backgroundColor: 'var(--mscb-danger) !important',
      color: '#fff',
      fontWeight: '500',
      fontSize: '16px',
      '-webkit-text-fill-color': 'white',
      textAlign: 'center',
    },
    '& .MuiFormControl-root.MuiFormControl-fullWidth.mscb-input': {
      top: '-19px',
      alignItems: 'center',
    },
  },
  rowTitle: {
    '& td': {
      color: '#fff !important',
      fontWeight: '500',
      backgroundColor: 'var(--mscb-primary)',
      textTransform: 'uppercase',
      borderLeft: 'solid 1px #fff important',
      borderRight: 'solid 1px #fff important',
      '&:first-child': {
        borderLeft: 'unset'
      }
    }
  },
  rowParent: {
    '& td': {
      color: 'var(--mscb-danger) !important',
      textTransform: 'uppercase',
      fontWeight: '500',
      borderColor: 'solid 1px var(--mscb-danger) !important'
    }
  },
  rowUser: {
    '& td': {
      fontWeight: '500',
      color: '#1825aa',
      borderColor: 'solid 1px #1825aa !important'
    }
  },
  rowChild: {
    '& td': {
      fontWeight: '500',

      '&.row-child-title': {
        paddingLeft: '24px',
      }
    }
  },
  rowDetail: {
    '& td': {

      '&.row-detail-title': {
        paddingLeft: '36px',
      }

    }
  }
}));


export const SxSteps: SxProps<Theme> = {
  "& .declare-normal-income":{
    "& .mscb-steps-panes-swiper":{
      "& .react-swipeable-view-container":{
        "& [data-swipeable='true']":{
          overflowY:"hidden !important"
        }
      }
    }
  },
  '&.mscb-loan-normal-income': {
    '&>.MuiTabs-root': {
      '& .MuiTabs-flexContainer ': {
        justifyContent: 'center'
      },
      '& .mscb-step-text': {
        textTransform: 'uppercase',
        fontWeight: 'bold',

      },
      
     
    },
    '& .declare-normal-income': {
      '&>.MuiTabs-root': {
        '& .MuiTabs-flexContainer ': {
          "@media screen and (max-width: 1440px)": {
            transform: 'translateX(0%)',
          },
          transform: 'translateX(-10%)',
          justifyContent: 'center',

        },
        '& .MuiFormLabel-root': {
          // textTransform: 'uppercase',
          fontWeight: 'bold'
        }
      },
      '& .mscb-step-extra': {
        // transform: 'translateX(45px) !important',
        padding: '0px',
        left: '-64%'
      },
      '& .mscb-step-item::after': {
        left: '50px !important',
      },
      '& .step-user-normal-income': {
        '&>.MuiTabs-root': {
          '& .MuiTabs-flexContainer ': {
            justifyContent: 'center',

          },
          '& .MuiFormLabel-root': {
            // textTransform: 'uppercase',
            fontWeight: 'bold'
          }
        }
      }
    }
  }
};

export default incomeStyle;
                    
export const SxHeaderRow: SxProps<Theme> = { 
  '& .MuiTableCell-root':{
    fontWeight: '500',
    backgroundColor: '#1825aa',
    color: '#fff!important',
    textTransform: 'uppercase',
    borderRightColor: '#fff!important',
    borderLeftColor: '#fff!important',
    '&:first-child': {
      borderLeftColor: '#353535!important',
    },
    '&:last-child':{
      borderRightColor: '#353535!important',
    }
  }
}

export const SxHeaderRowTopBorderWhite: SxProps<Theme> = { 
  '& .MuiTableCell-root':{
    backgroundColor: '#1825aa',
    color: '#fff!important',
    borderRightColor: '#fff!important',
    borderLeftColor: '#fff!important',
    borderTopColor: '#fff!important',
    '&:first-child': {
      borderLeftColor: '#353535!important',
    },
    '&:last-child':{
      borderRightColor: '#353535!important',
    }
  }
}
