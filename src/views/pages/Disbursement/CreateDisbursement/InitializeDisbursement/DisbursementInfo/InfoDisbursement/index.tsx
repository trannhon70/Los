import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box"
import { FC } from "react"
import { FaUser } from "react-icons/fa"
import Input from "views/components/base/Input"
import Radio from "views/components/base/Radio"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"
import ObjectList from "views/components/layout/ObjectList"
import Interest from "./Interest"
import InterestPaymentSchedule from "./InterestPaymentSchedule"
import RootPaymentSchedule from "./RootPaymentSchedule"

const InfoDisbursement: FC = () => {
  return <>
    <Box className='py-3'>
      <CardInside
        title="I. Thông tin cơ bản"
        classBody="h-full p-5"
        sx={{ height: "calc(100% - 20px)" }}
        fieldsetClass="px-4"
        titleClass="px-2 text-16">
        <Grid container spacing={3}>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='1. Loại hình cấp tín dụng' disabled />
          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='1. Loại hình cấp tín dụng' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='3. Loại tiền' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='4. Số tiền vay' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='5. Mục đích sử dụng vốn vay thực tế (Mô tả chi tiết)  ' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='6. Thời hạn vay (tháng)' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='7. Thời hạn vay tối đa của từng TTCV cụ thể (tháng)' disabled />
          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='8. Thời hạn vay của từng TTCV cụ thể thực tế (tháng)' disabled />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='9. Dư nợ vay thực tế' disabled required />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='10. Số tiền còn được giải ngân' disabled required />

          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Input label='11. Số tiền đề nghị giải ngân lần này' disabled required />

          </Grid>
        </Grid>
      </CardInside>
    </Box>
    <Box>
      <CardInside
        title="II. Phương thức giải ngân"
        classBody="h-full p-5"
        sx={{ height: "calc(100% - 20px)" }}
        fieldsetClass="px-4"
        titleClass="px-2 text-16">
        <Grid container spacing={3} >
          <Grid item xl={3} md={3} sm={12}>
            <Select label='1. Phương thức giải ngân' required options={[]} />
          </Grid>
          <Grid item xl={3} md={3} sm={12}>
            <Select label='2. Đối tượng bên thụ hưởng' required options={[]} />
          </Grid>
        </Grid>
        <Divider className='my-6' />
        <Box className='py-5'>
          <Typography className='text-upper text-17 font-bold text-black' >thông tin tiền mặt</Typography>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={12}>
              <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
              <span className='ml-1 text-14 font-medium text-primary text-upper'>Thông tin khách hàng vay</span>
              <ObjectList
                className='my-3'
                avatar
                current={0}
                enableNumber={false}
                enableMenu={false}
                enableAdd={false}
                sx={{
                  '& .ObjectListContent': {
                    '& .MuiTabs-flexContainer': {
                      width: '100%',
                      transform: 'unset'
                    }
                  },
                  '& .object-list-label-container': {
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: 'transparent',
                    marginTop: 'unset !important',
                    paddingLeft: 'unset !important',
                    color: '#1e1d27',
                    '& .object-list-label': {
                      textDecoration: 'underline',
                    },
                    '& .object-list-number': {
                      mt: 0,
                      fontSize: 'var(--mscb-fontsize)',
                      color: '#1e1d27',
                      fontWeight: 400,
                      textDecoration: 'underline'
                    }
                  },
                  '& .object-list-box': {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    pt: 0,
                    px: 2,
                    '& .object-list-box-name': {
                      mt: '5px'
                    },
                  },

                  '& .Mui-selected': {
                    '& .object-list-box': {
                      borderColor: 'var(--mscb-danger)'
                    }
                  },
                }}
                labelLength='Khách hàng vay:'
                options={[{ circle: <FaUser />, label: 'Nguyen Vu' },
                { circle: <FaUser />, label: 'Le Luan' }]}
              />
              <Grid container spacing={3}>
                <Grid item xl={12} md={12} sm={12}>
                  <Input label='1. Nội dung thanh toán' disabled required />
                </Grid>
                <Grid item xl={12} md={12} sm={12}>
                  <Input label='2. Số tiền thanh toán' disabled required />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xl={8} md={8} sm={12} className='relative pl-10'>
              <div className="absolute bottom" style={{
                marginRight: '20px',
                width: 0,
                top: '30px',
                left: '20px',
                borderLeft: '1px solid #d5d5d5'
              }} />
              <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
              <span className='ml-1 text-14 font-medium text-primary text-upper'>Thông tin người thụ hưởng</span>
              <ObjectList
                className='my-3'
                avatar
                current={0}
                enableNumber={false}
                enableMenu={false}
                enableAdd={false}
                sx={{
                  '& .ObjectListContent': {
                    '& .MuiTabs-flexContainer': {
                      width: '100%',
                      transform: 'unset'
                    }
                  },
                  '& .object-list-label-container': {
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: 'transparent',
                    marginTop: 'unset !important',
                    paddingLeft: 'unset !important',
                    color: '#1e1d27',
                    '& .object-list-label': {
                      textDecoration: 'underline',
                    },
                    '& .object-list-number': {
                      mt: 0,
                      fontSize: 'var(--mscb-fontsize)',
                      color: '#1e1d27',
                      fontWeight: 400,
                      textDecoration: 'underline'
                    }
                  },
                  '& .object-list-box': {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    pt: 0,
                    px: 2,
                    '& .object-list-box-name': {
                      mt: '5px'
                    },
                  },

                  '& .Mui-selected': {
                    '& .object-list-box': {
                      borderColor: 'var(--mscb-danger)'
                    }
                  },
                }}
                enableLength={true}
                labelLength='Thông tin người thụ hưởng: '
                options={[{ circle: <FaUser />, label: 'Nguyen Vu' },
                { circle: <FaUser />, label: 'Le Luan' }]}
              />
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='1. Nội dung thanh toán' disabled required />
                </Grid>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='2. Số tiền thanh toán' disabled required />
                </Grid>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='3. Họ và tên người thụ hưởng' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='4. Số CMND/CCCD' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='5. Ngày cấp' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='6. Ngày hết hạn' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Select options={[]} label='7. Nơi cấp' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='8. Số hộ chiếu' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='9. Ngày cấp' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Input label='10. Ngày hết hạn' disabled required />
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                  <Select options={[]} label='11. Nơi cấp' disabled required />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider className='my-6' />
        <Box className='py-5'>
          <Typography className='text-upper text-17 font-bold text-black' >thông tin chuyển khoản</Typography>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={12}>
              <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
              <span className='ml-1 text-14 font-medium text-primary text-upper'>Thông tin khách hàng vay</span>
              <ObjectList
                className='my-3'
                avatar
                current={0}
                enableNumber={false}
                enableMenu={false}
                enableAdd={false}
                sx={{
                  '& .ObjectListContent': {
                    '& .MuiTabs-flexContainer': {
                      width: '100%',
                      transform: 'unset'
                    }
                  },
                  '& .object-list-label-container': {
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: 'transparent',
                    marginTop: 'unset !important',
                    paddingLeft: 'unset !important',
                    color: '#1e1d27',
                    '& .object-list-label': {
                      textDecoration: 'underline',
                    },
                    '& .object-list-number': {
                      mt: 0,
                      fontSize: 'var(--mscb-fontsize)',
                      color: '#1e1d27',
                      fontWeight: 400,
                      textDecoration: 'underline'
                    }
                  },
                  '& .object-list-box': {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    pt: 0,
                    px: 2,
                    '& .object-list-box-name': {
                      mt: '5px'
                    },
                  },

                  '& .Mui-selected': {
                    '& .object-list-box': {
                      borderColor: 'var(--mscb-danger)'
                    }
                  },
                }}
                labelLength='Khách hàng vay:'
                options={[{ circle: <FaUser />, label: 'Nguyen Vu' },
                { circle: <FaUser />, label: 'Le Luan' }]}
              />
              <Grid container spacing={3}>
                <Grid item xl={12} md={12} sm={12}>
                  <Input label='1. Nội dung thanh toán' disabled required />
                </Grid>
                <Grid item xl={12} md={12} sm={12}>
                  <Select options={[]} label='2. Đơn vị SCB mở tài khoản thanh toán' disabled required />
                </Grid>
                <Grid item xl={6} md={6} sm={12}>
                  <Input label='3. Số tài khoản thanh toán' disabled required />
                </Grid>
                <Grid item xl={6} md={6} sm={12}>
                  <Select options={[]} label='4. Số tiền thanh toán' disabled required />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xl={8} md={8} sm={12} className='relative pl-10'>
              <div className="absolute bottom" style={{
                marginRight: '20px',
                width: 0,
                top: '30px',
                left: '20px',
                borderLeft: '1px solid #d5d5d5'
              }} />
              <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
              <span className='ml-1 text-14 font-medium text-primary text-upper'>Thông tin người thụ hưởng</span>
              <ObjectList
                className='my-3'
                avatar
                current={0}
                enableNumber={false}
                enableMenu={false}
                enableAdd={false}
                sx={{
                  '& .ObjectListContent': {
                    '& .MuiTabs-flexContainer': {
                      width: '100%',
                      transform: 'unset'
                    }
                  },
                  '& .object-list-label-container': {
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: 'transparent',
                    marginTop: 'unset !important',
                    paddingLeft: 'unset !important',
                    color: '#1e1d27',
                    '& .object-list-label': {
                      textDecoration: 'underline',
                    },
                    '& .object-list-number': {
                      mt: 0,
                      fontSize: 'var(--mscb-fontsize)',
                      color: '#1e1d27',
                      fontWeight: 400,
                      textDecoration: 'underline'
                    }
                  },
                  '& .object-list-box': {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    pt: 0,
                    px: 2,
                    '& .object-list-box-name': {
                      mt: '5px'
                    },
                  },

                  '& .Mui-selected': {
                    '& .object-list-box': {
                      borderColor: 'var(--mscb-danger)'
                    }
                  },
                }}
                enableLength={true}
                labelLength='Thông tin người thụ hưởng: '
                options={[{ circle: <FaUser />, label: 'Nguyen Vu' },
                { circle: <FaUser />, label: 'Le Luan' }]}
              />
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='1. Nội dung thanh toán' disabled required />
                </Grid>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='2. Số tiền thanh toán' disabled required />
                </Grid>
                <Grid item xl={4} md={4} sm={12}>
                  <Input label='3. Họ và tên người thụ hưởng' disabled required />
                </Grid>
                <Grid item xl={12} md={12} sm={12}>
                  <span className='mscb-input'>4. Tài khoản thụ hưởng</span>
                  <Box width='100%' className='flex text-13' >
                    <Box width='20%' className='text-13'>
                      <Radio sx={{
                        fontSize: '13px!important',
                        width: 'fit-content',
                      }} options={[{ value: 'Y', label: 'Trong SCB' }]} />
                    </Box>
                    <Box width='40%' className='flex inSCBCheck'
                      sx={{
                        '&.inSCBCheck::before': {
                          content: "''",
                          position: 'absolute',
                          zIndex: 1,
                          width: '48px',
                          height: "1px",
                          top: '71%',
                          left: '198px',
                          transform: ' translate(-44px, 0)',
                          backgroundColor: 'var(--mscb-black)!important'
                        }
                      }}>
                      <span style={{ marginRight: '10px', alignSelf: 'center' }}>Số tài khoản người thụ hưởng</span>
                      <Input sx={{ width: '200px' }} />
                    </Box>
                  </Box>
                  <Box width='100%' className='flex text-13' >
                    <Box width='20%' className='text-13'>
                      <Radio sx={{
                        width: 'fit-content',
                      }} options={[{ value: 'Y', label: 'Ngoài SCB' }]} />
                    </Box>
                    <Box width='40%' className='flex outCheck'
                      sx={{
                        '&.outCheck::before': {
                          content: "''",
                          position: 'absolute',
                          zIndex: 1,
                          width: '48px',
                          height: "1px",
                          top: '82%',
                          left: '198px',
                          transform: ' translate(-44px, 0)',
                          backgroundColor: 'var(--mscb-black)!important'
                        }
                      }}>
                      <span style={{ marginRight: '10px', alignSelf: 'center' }}>Số tài khoản người thụ hưởng</span>
                      <Input sx={{ width: '200px' }} />

                    </Box>
                    <Box width='40%' className='flex outCheck'
                      sx={{
                        '&.outCheck::before': {
                          content: "''",
                          position: 'absolute',
                          zIndex: 1,
                          width: '40px',
                          height: "1px",
                          top: '82%',
                          right: '47%',
                          transform: ' translate(82px, 0)',
                          backgroundColor: 'var(--mscb-black)!important'
                        }
                      }}>
                      <span style={{ width: '350px', marginRight: '10px', alignSelf: 'center' }}>Ngân hàng người thụ hưởng</span>
                      <Select options={[]} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardInside>
    </Box>
    <Box className='pt-3'>
      <Interest />
    </Box>
    <Box className='pt-3'>
      <Grid container spacing={3}>
        <Grid item xl={6} md={6} sm={12}>
          <InterestPaymentSchedule />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <RootPaymentSchedule />
        </Grid>
      </Grid>
    </Box>

  </>
}
export default InfoDisbursement