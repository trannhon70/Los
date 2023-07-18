import { TableHead, TableCell, TableBody, TableRow, Table, IconButton, Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { FC } from "react"
import { IoTrashOutline } from "react-icons/io5"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import AddIcon from '@mui/icons-material/Add';
import Radio from "views/components/base/Radio"

const CreditRelations: FC = () => {
  return <>
    <Box><InputDate label=' Ngày thông tin tra cứu CIC' required /></Box>
    <Typography className='text-upper font-medium mt-5'>A. Bảng quan hệ tín dụng</Typography>
    <Table className='mscb-table mscb-table-border mt-5 ' >
      <TableHead className='mscb-table-row-title' >
        <TableCell width='5%' align="center"> STT</TableCell>
        <TableCell width='20%' align="center">TÊN TỔ CHỨC TÍN DỤNG</TableCell>
        <TableCell width='15%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Số tiền cấp tín dụng
          (triệu đồng)</TableCell>
        <TableCell width='15%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Số dư thực tế quy đổi
          (triệu đồng)</TableCell>
        <TableCell width='10%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Loại khoản vay</TableCell>
        <TableCell width='10%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Nhóm nợ</TableCell>
        <TableCell width='20%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Ghi chú</TableCell>
        <TableCell width='5%' align="center" sx={{ borderRight: '1px solid #353535!important' }}></TableCell>
      </TableHead>
      <TableBody className='mscb-table-border' >
        <TableRow >
          <TableCell align="center"> 1</TableCell>
          <TableCell align="left" className='mscb-input-table'>
            <Select options={[{ value: 1, label: 'Techcombank' }]} value='Techcombank' />
          </TableCell>
          <TableCell className='mscb-input-table mscb-input-right' >
            <Input value='1.000.000.000' />
          </TableCell>
          <TableCell className='mscb-input-table mscb-input-right'>
            <Input value='1.000.000.000' />
          </TableCell>
          <TableCell className='mscb-input-table'>
            <Input value='VAY' />
          </TableCell>
          <TableCell className='mscb-input-table'>
            <Select options={[]} />
          </TableCell>
          <TableCell className='mscb-input-table'>
            <Input value='Khách hàng đã tất toán khoản vay' />
          </TableCell>
          <TableCell align="center">
            <IconButton className='text-primary'>
              <IoTrashOutline
                size="1rem"
                color="var(--mscb-primary)"
                cursor="pointer"
              />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell className='font-medium' sx={{ color: "#006dfe" }} colSpan={8}>
            <IconButton sx={{ color: "#006dfe", fontSize: '14px' }}>
              <AddIcon sx={{ color: "#006dfe", fontSize: '14px' }} />
              Thêm dòng</IconButton>
          </TableCell>
        </TableRow>

      </TableBody>
    </Table>
    <Typography className='text-upper font-medium mt-5 mb-3'>B. Tình hình trả nợ tại SCB</Typography>
    <Grid container spacing={3}>
      <Grid item xl={3} md={3} sm={3}>
        <Radio label='1. Tình hình trả nợ kỳ gần nhất tại SCB'
          options={[
            { value: '1', label: 'Đầy đủ và đúng hạn' },
            { value: '2', label: 'Đang quá hạn', checked: true }
          ]} required />


      </Grid>
      <Grid item xl={3} md={3} sm={3}>
        <InputDate label='2. Số ngày quá hạn' />
      </Grid>
    </Grid>
    <Typography className='text-upper font-medium mt-5 mb-3'>C. Lịch sử nhóm nợ</Typography>
    <Grid container spacing={3}>
      <Grid item xl={3} md={3} sm={3}>
        <Input label='1. Nhóm nợ hiện tại' required />
      </Grid>
      <Grid item xl={3} md={3} sm={3}>
        <Radio label='2. Tình trạng lịch sử phát sinh chuyển nhóm nợ'
          options={[
            { value: 'Y', label: 'Có' },
            { value: 'N', label: 'Không', checked: true }
          ]} required />


      </Grid>
    </Grid>
    <Box className='pt-3 pb-3'>
      <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
      <span className='ml-1 text-14 font-medium text-primary text-upper'>Bảng Lịch sử phát sinh chuyển nhóm nợ</span>
    </Box>
    <Table className='mscb-table mscb-table-border mt-3  ' >
      <TableHead className='mscb-table-row-title' >
        <TableCell width='10%' align="center"> Lần thứ</TableCell>
        <TableCell width='20%' align="center">Ngày chuyển Nhóm nợ</TableCell>
        <TableCell width='30%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Tên tổ chức tín dụng</TableCell>
        <TableCell width='30%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>Dư nợ chuyển nhóm nợ (Đồng)</TableCell>
        <TableCell width='10%' align="center" sx={{ borderRight: '1px solid #353535!important' }}></TableCell>
      </TableHead>
      <TableBody className='mscb-table-border' >
        <TableRow >
          <TableCell align="center"> 1</TableCell>
          <TableCell className='mscb-input-table mscb-input-right date-loan' sx={{
            '& .MuiInputAdornment-outlined': {
              backgroundColor: 'rgba(94, 191, 255, 0.14)',
              height: '24px'
            }
          }}>
            <InputDate value={1653376286000} />
          </TableCell>
          <TableCell align="left" className='mscb-input-table'>
            <Select options={[{ value: 1, label: 'Techcombank' }]} value='Techcombank' />
          </TableCell>

          <TableCell className='mscb-input-table mscb-input-right'>
            <Input value='253.000.  000' />
          </TableCell>
          <TableCell align="center">
            <IconButton className='text-primary'>
              <IoTrashOutline
                size="1rem"
                color="var(--mscb-primary)"
                cursor="pointer"
              />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell className='font-medium' sx={{ color: "#006dfe" }} colSpan={8}>
            <IconButton sx={{ color: "#006dfe", fontSize: '14px' }}>
              <AddIcon sx={{ color: "#006dfe", fontSize: '14px' }} />
              Thêm dòng</IconButton>
          </TableCell>
        </TableRow>

      </TableBody>
    </Table>
  </>
}
export default CreditRelations