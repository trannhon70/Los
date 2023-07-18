import { TableHead, TableCell, TableBody, TableRow, IconButton, Table } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box"
import { FC } from "react"
import { IoTrashOutline } from "react-icons/io5"
import Input from "views/components/base/Input"
import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';
import CardInside from "views/components/layout/CardInside"

const DisCondEvaluate: FC = () => {
  const justifyCenter = {
    justifyContent: 'center'
  }
  return <>
    <Box className='pt-3'>
      <Typography className='text-black text-upper text-19 font-bold'>
        đánh giá điều kiện giải ngân
      </Typography>
      <Table className='mscb-table mscb-table-border mt-3  ' >
        <TableHead className='mscb-table-row-title' >
          <TableRow>
            <TableCell rowSpan={2} width='5%' align="center"> STT</TableCell>
            <TableCell rowSpan={2} width='35%' align="center">Điều kiện</TableCell>
            <TableCell colSpan={2} width='30%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>đánh giá của Đơn vị kinh doanh</TableCell>
            <TableCell colSpan={2} width='30%' align="center" sx={{ borderRight: '1px solid #353535!important' }}>đánh giá của Hỗ trợ kinh doanh</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>Hoàn thiện </TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>Lý Do</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>Phù Hợp</TableCell>
            <TableCell align="center" sx={{ borderRight: '1px solid #353535!important' }}>Lý Do</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='mscb-table-border' >
          <TableRow className='mscb-table-row-label'>
            <TableCell align="center"> 1</TableCell>
            <TableCell  >
              Đảm bảo thời gian rút vốn
            </TableCell>
            <TableCell align="center" className='mscb-input-table'>
              <Checkbox sx={justifyCenter}
                key='1' checked={true}
              />
            </TableCell>

            <TableCell className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
            <TableCell align="center">
              <Checkbox sx={justifyCenter}
                key='2' checked={true}
              />
            </TableCell>
            <TableCell align="center" className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-label'>
            <TableCell align="center">2</TableCell>
            <TableCell  >
              Đảm bảo thời gian rút vốn/Thời hạn hiệu lực của hạn mức
            </TableCell>
            <TableCell align="center" className='mscb-input-table'>
              <Checkbox sx={justifyCenter}
                key='3' checked={true}
              />
            </TableCell>

            <TableCell className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
            <TableCell align="center">
              <Checkbox sx={justifyCenter}
                key='4' checked={true}
              />
            </TableCell>
            <TableCell align="center" className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-title'>
            <TableCell rowSpan={2} colSpan={2} align='center'>KẾT LUẬN VỀ VIỆC GIẢI NGÂN</TableCell>
            <TableCell rowSpan={2} align="center">
              <Checkbox sx={justifyCenter}
                key='All' checked={true}
              />
            </TableCell>
            <TableCell rowSpan={2} className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
            <TableCell rowSpan={2} align="center">
              <Checkbox sx={justifyCenter}
                key='All2' checked={true}
              />
            </TableCell>
            <TableCell rowSpan={2} className='mscb-input-table'>
              <Input placeholder='Lý do...' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    <Box className='py-3'>
      <Typography className='text-black text-upper text-19 font-bold'>
        Trao đổi
      </Typography>
      <CardInside
        title="I. Đánh giá tại đơn vị kinh doanh"
        classBody="h-full p-5"
        sx={{ height: "calc(100% - 20px)" }}
        fieldsetClass="px-4"
        titleClass="px-2 text-16">

      </CardInside>
    </Box>
  </>
}
export default DisCondEvaluate