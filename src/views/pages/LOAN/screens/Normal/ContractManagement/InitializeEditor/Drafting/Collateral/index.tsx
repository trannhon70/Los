import { Collapse, IconButton, styled, Switch, SwitchProps, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { FC, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { ImSigma } from 'react-icons/im';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import Carousel from 'views/pages/LOAN/widgets/Carousel';
import { CarouselOption } from 'views/pages/LOAN/widgets/Carousel/Item';
import CollateralMachine from '../../../CollateralCommon/Machine';
import CollateralRealEstate from '../../../CollateralCommon/RealEstate';
import CollateralTransport from '../../../CollateralCommon/Transport';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(19px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#069549',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Collateral: FC = () => {

  const [open, setOpen] = useState(true);

  const [carousels, setCarousels] = useState<CarouselOption[]>([
    {
      quantity: 2,
      name: "Bất động sản",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 5,
      name: "Phương tiện vận tải / Động sản",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 10,
      name: "Máy móc thiết bị / Dây chuyền công nghệ",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 2,
      name: "Vật tư hàng hóa",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 3,
      name: "Quyền tài sản",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 3,
      name: "Chứng khoán",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 3,
      name: "Tài sản khác",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 3,
      name: "Tổng số tài sản bảo đảm",
      type: "NHAN",
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />
    },
    {
      quantity: 0,
      type: 'ALL',
      name: 'Tổng số TSBD',
      icon: <ImSigma style={{ fontSize: '1.625rem', color: 'var(--mscb-danger)' }} />,
      className: "bd-danger",
      sx: { '& .MuiBox-root>.mscb-carousel-quantity': { color: 'var(--mscb-danger)' } }
    }
  ]);

  const clickToggle = () => setOpen(!open);

  return <Box>
    <Box className="mt-6">
      <Carousel
        current={0}
        items={carousels}
        className="list-collateral"
        sx={{
          '&.list-collateral': {
            '& .MuiTabs-scroller': {
              '& .MuiTabs-flexContainer': {
                width: '100%',
                transform: 'unset',
                '& .MuiButtonBase-root': {
                  '& .mscb-carousel-quantity': {
                    fontWeight: '500',
                  }
                }
              }
            }
          }
        }}
      />
    </Box>
    <Box className='flex mt-6'>
      <Typography variant="h6" className="text-14 flex items-center" sx={{ color: '#eb0029', whiteSpace: 'nowrap' }}>
        Tổng số lượng tài sản thế chấp:
      </Typography>
      <Input value='1' 
        sx={{
          marginLeft: '8px',
          '&.mscb-input': {
            width: '10%'
          }
        }}
      />
    </Box>
    <Box className="mt-6" sx={{
      // "& .MuiTableContainer-root": {
      //   overflowX: 'hidden'
      // }
    }}>
      <Box className='flex' sx={{ borderBottom: 'solid 1px #353535', paddingTop: '10px', paddingBottom: '10px' }}>
        <Box component="div" width="3%" className="flex items-center" sx={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#353535'
        }}>
          STT
        </Box>
        <Box component="div" className="flex items-center" width="94%" sx={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#353535'
        }}>
          TÀI SẢN BẢO ĐẢM
        </Box>
        <Box component="div" width="3%" >
          <IconButton onClick={clickToggle}>
            <BiChevronDownCircle style={{ fontSize: '24px', color: '#eb0029', fontWeight: '900' }} />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={open} sx={{ width: '100%' }}>
        <Box className='flex' sx={{ borderBottom: 'solid 1px #d5d5d5', paddingTop: '10px', paddingBottom: '10px' }}> 
          <Box component='div' width='3%' className="flex-center text-16 font-medium">
            I
          </Box>
          <Box component="div" width="94%">
            <Select 
              options={[]}
              sx={{
                "&.mscb-input": {
                  width: '25%',
                  '& .MuiFormControl-root': {
                    '& .MuiInput-root': {
                      backgroundColor: '#1825aa !important',
                      '& .MuiSelect-select': {
                        backgroundColor: '#1825aa !important',
                      },
                      '& svg': {
                        color: '#fff'
                      }
                    }
                  }
                }
              }}
            />
          </Box>
          <Box component="div" width="3%">
            <IconButton>
              <BiChevronDownCircle style={{ fontSize: '24px', color: '#1825aa', fontWeight: '900' }} />
            </IconButton>
          </Box>
        </Box>
        <CollateralRealEstate />
        <Box className='flex' sx={{ borderBottom: 'solid 1px #d5d5d5', paddingTop: '10px', paddingBottom: '10px' }}> 
          <Box component='div' width='3%' className="flex-center text-16 font-medium">
            II
          </Box>
          <Box component="div" width="94%">
            <Select 
              options={[]}
              sx={{
                "&.mscb-input": {
                  width: '25%',
                  '& .MuiFormControl-root': {
                    '& .MuiInput-root': {
                      backgroundColor: '#1825aa !important',
                      '& .MuiSelect-select': {
                        backgroundColor: '#1825aa !important',
                      },
                      '& svg': {
                        color: '#fff'
                      }
                    }
                  }
                }
              }}
            />
          </Box>
          <Box component="div" width="3%">
            <IconButton>
              <BiChevronDownCircle style={{ fontSize: '24px', color: '#1825aa', fontWeight: '900' }} />
            </IconButton>
          </Box>
        </Box>
        <CollateralTransport />
        <Box className='flex' sx={{ borderBottom: 'solid 1px #d5d5d5', paddingTop: '10px', paddingBottom: '10px' }}> 
          <Box component='div' width='3%' className="flex-center text-16 font-medium">
            II
          </Box>
          <Box component="div" width="94%">
            <Select 
              options={[]}
              sx={{
                "&.mscb-input": {
                  width: '25%',
                  '& .MuiFormControl-root': {
                    '& .MuiInput-root': {
                      backgroundColor: '#1825aa !important',
                      '& .MuiSelect-select': {
                        backgroundColor: '#1825aa !important',
                      },
                      '& svg': {
                        color: '#fff'
                      }
                    }
                  }
                }
              }}
            />
          </Box>
          <Box component="div" width="3%">
            <IconButton>
              <BiChevronDownCircle style={{ fontSize: '24px', color: '#1825aa', fontWeight: '900' }} />
            </IconButton>
          </Box>
        </Box>
        <CollateralMachine />
      </Collapse>
    </Box>
  </Box>
}

export default Collateral;

