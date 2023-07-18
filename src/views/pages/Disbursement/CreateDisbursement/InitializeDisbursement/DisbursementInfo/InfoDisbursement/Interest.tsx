import { Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { FC } from "react"
import { FaUser } from "react-icons/fa"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Radio from "views/components/base/Radio"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"
import ObjectList from "views/components/layout/ObjectList"

const Interest: FC = () => {
  return <>
    <CardInside
      title="III. Lãi suất"
      classBody="h-full p-5"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16">
      <Grid item xl={12} md={12} sm={12}>
        <span className='mscb-input'>1. Loại lãi suất áp dụng</span>
        <Box width='100%' className='flex text-13' >
          <Box width='10%' className='text-13'>
            <Radio sx={{
              fontSize: '13px!important',
              width: 'fit-content',
            }} options={[{ value: 'Y', label: 'Theo gói' }]} />
          </Box>
          <Box width='20%' className='flex interest-package'
            sx={{
              '&.interest-package::before': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '40px',
                height: "1px",
                top: '65px',
                left: '160px',
                backgroundColor: 'var(--mscb-black)!important',
                transform: ' translate(-44px, -2px)',
              }
            }}>
            <span style={{ marginRight: '10px', whiteSpace: 'nowrap', alignSelf: 'center' }}>Gói lãi suất</span>
            <Input sx={{ width: '161px' }} />
          </Box>
          <Box width='20%' className='flex details'
            sx={{
              '&.details::before': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '40px',
                height: "1px",
                top: '65px',
                right: '78%',
                transform: ' translate(120px, -2px)',
                backgroundColor: 'var(--mscb-black)!important'
              }
            }}>
            <span style={{ width: 'fit-content', marginRight: '10px', alignSelf: 'center' }}>Chi tiết gói</span>
            <Select sx={{ width: '161px' }} options={[]} />
          </Box>
        </Box>
        <Box width='100%' className='flex text-13' >
          <Box width='10%' className='text-13'>
            <Radio sx={{
              width: 'fit-content',
            }} options={[{ value: 'Y', label: 'Ngoại lệ' }]} />
          </Box>
          <Box width='20%' className='flex exception'
            sx={{
              '&.exception::before': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '40px',
                height: "1px",
                top: '105px',
                left: '160px',
                transform: ' translate(-44px, -1px)',
                backgroundColor: 'var(--mscb-black)!important'
              }
            }}>
            <span style={{ marginRight: '7px', whiteSpace: 'nowrap', alignSelf: 'center' }}>Mã ngoại lệ</span>
            <Input sx={{ width: '161px' }} />

          </Box>
          <Box width='70%' className='flex exception-describe'
            sx={{
              '&.exception-describe::before': {
                content: "''",
                position: 'absolute',
                zIndex: 1,
                width: '40px',
                height: "1px",
                top: '105px',
                right: '78%',
                transform: ' translate(120px,-1px)',
                backgroundColor: 'var(--mscb-black)!important'
              }
            }}>
            <span style={{ width: 'fit-content', whiteSpace: 'nowrap', marginRight: '22px', alignSelf: 'center' }}>Diến giải</span>
            <Select options={[]} />
          </Box>
        </Box>
      </Grid>
      <Divider className='my-6' />
      <Box>
        <Grid container spacing={3}>
          <Grid item xl={6} md={6} sm={12}>
            <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
            <span className='ml-1 text-14 font-medium text-primary text-upper '>Lãi suất sản phẩm</span>
            <Grid container spacing={3} className='mt-1'>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='1. Lãi suất cho vay (%/năm)' disabled required />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='2. Thời gian được hưởng ưu đãi lãi suất (tháng)' disabled required />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='3. Biên độ lãi suất sau thời gian ưu đãi (%/năm)' disabled required />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='4. Lãi suất cơ sở' disabled required />
              </Grid>
              <Grid item xl={12} md={12} sm={12}>
                <Select options={[]} label='5. Định kỳ điều chỉnh lãi suất' disabled required />
              </Grid>
              <Grid item xl={12} md={12} sm={12}>
                <span className='mscb-input font-medium '>6. Phí phạt trả nợ trước hạn</span>
                <Table className='mscb-table mscb-table-border mt-3 ' >
                  <TableHead className='mscb-table-row-title' >
                    <TableCell align="center"> STT</TableCell>
                    <TableCell align="center">Phí phạt trả nợ trước hạn</TableCell>
                    <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>phí phạt (%)</TableCell>
                  </TableHead>
                  <TableBody >
                    <TableRow className='mscb-input-table'>
                      <TableCell align="center"> 1</TableCell>
                      <TableCell align="left">Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                    <TableRow className='mscb-input-table'>
                      <TableCell align="center"> 2</TableCell>
                      <TableCell align="left">Từ trên một năm đến hết năm thứ hai</TableCell>
                      <TableCell align="right">0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xl={6} md={6} sm={12} className='relative pl-10'>
            <div className="absolute bottom" style={{
              marginRight: '20px',
              width: 0,
              top: '30px',
              left: '20px',
              borderLeft: '1px solid #d5d5d5'
            }} />
            <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
            <span className='ml-1 text-14 font-medium text-primary text-upper'>Lãi suất áp dụng</span>
            <Grid container spacing={3} className='mt-1'>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='1. Lãi suất cho vay (%/năm)' disabled required />
              </Grid>
              <Grid item xl={8} md={8} sm={12}>
                <Typography variant="h6" className="text-14 mb-2">
                  2. Thời gian được hưởng ưu đãi lãi suất (tháng)
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xl={6} className="flex">
                    <Typography
                      variant="h6"
                      className="text-14"
                      sx={{
                        whiteSpace: "nowrap",
                        lineHeight: "36px",
                        marginRight: "6px",
                      }}
                    >
                      Từ
                    </Typography>
                    <InputDate />
                  </Grid>
                  <Grid item xl={6} className="flex relative">
                    <Typography
                      variant="h6"
                      className="text-14"
                      sx={{
                        whiteSpace: "nowrap",
                        lineHeight: "36px",
                        marginRight: "6px",

                        "&::before": {
                          content: "''",
                          width: "18px",
                          height: "1px",
                          position: "absolute",
                          top: "68%",
                          left: "2px",
                          backgroundColor: "#707070",
                        },
                      }}
                    >
                      Đến
                    </Typography>
                    <InputDate />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='3. Biên độ lãi suất sau thời gian ưu đãi (%)' disabled required />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='4. Lãi suất cơ sở' disabled required />
              </Grid>
              <Grid item xl={12} md={12} sm={12}>
                <Input label='5. Định kỳ điều chỉnh lãi suất' disabled required />
              </Grid>
              <Grid item xl={12} md={12} sm={12}>
                <span className='mscb-input font-medium '>6. Phí phạt trả nợ trước hạn</span>
                <Table className='mscb-table mscb-table-border mt-3 ' >
                  <TableHead className='mscb-table-row-title' >
                    <TableCell align="center"> STT</TableCell>
                    <TableCell align="center">Phí phạt trả nợ trước hạn</TableCell>
                    <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>phí phạt (%)</TableCell>
                  </TableHead>
                  <TableBody >
                    <TableRow className='mscb-input-table'>
                      <TableCell align="center"> 1</TableCell>
                      <TableCell align="left">Đến hết năm đầu tiên</TableCell>
                      <TableCell align="right">5</TableCell>
                    </TableRow>
                    <TableRow className='mscb-input-table'>
                      <TableCell align="center"> 2</TableCell>
                      <TableCell align="left">Từ trên một năm đến hết năm thứ hai</TableCell>
                      <TableCell align="right">0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CardInside>
  </>
}
export default Interest