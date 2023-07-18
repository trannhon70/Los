import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { FC } from "react"
import Input from "views/components/base/Input"
import Radio from "views/components/base/Radio"
const CusGroupRelate: FC = () => {
  return <>
    <Box className='pt-3 pb-3'>
      <Radio label='1. Tình trạng' options={[{ value: 'Y', label: 'Có phát sinh', checked: true }, { value: 'N', label: 'Không phát sinh' }]} />
    </Box>
    <Typography className='font-bold text-19 text-upper'>
      Nhóm khách hàng liên quan theo quy định pháp luật
    </Typography>
    <Box className='pt-3 pb-3'>
      <Table className='mscb-table mscb-table-border'>
        <TableHead>
          <TableCell align='center' width='5%'>STT</TableCell>
          <TableCell align='center' width='20%'>Tên nhóm khách hàng liên quan</TableCell>
          <TableCell align='center' width='10%'>ĐKKD/CMND</TableCell>
          <TableCell align='center' width='15%'>Hạn mức được cấp</TableCell>
          <TableCell align='center' width='15%'>Dư nợ hiện tại (triệu đồng)</TableCell>
          <TableCell align='center' width='25%'>Mối quan hệ với Khách hàng vay</TableCell>
          <TableCell align='center' width='10%' sx={{ borderRight: '1px solid #353535!important' }}>SCB cấp hạn mức</TableCell>
        </TableHead>
        <TableBody>
          <TableRow className='mscb-table-row-label' >
            <TableCell align='center' >1</TableCell>
            <TableCell >Nhóm khách hàng A</TableCell>
            <TableCell >285673258</TableCell>
            <TableCell className='mscb-input-table mscb-input-right' >
              <Input value='1.000.000.000' />
            </TableCell>
            <TableCell className='mscb-input-table mscb-input-right' >
              <Input value='500.000.000' />
            </TableCell>
            <TableCell >Mối quan hệ với khách hàng vay</TableCell>
            <TableCell >
              <Radio sx={{
                '& .MuiFormGroup-row': {
                  alignSelf: 'center',
                  label: {
                    marginRight: '0!important',
                    marginLeft: '0!important',
                  }
                },
              }} options={[{ value: 'Y', checked: true }]} value='1' checked={true} />
            </TableCell>
          </TableRow>
          <TableRow className='mscb-table-row-label' >
            <TableCell align='center' >2</TableCell>
            <TableCell >Nhóm khách hàng B</TableCell>
            <TableCell >212321456</TableCell>
            <TableCell className='mscb-input-table mscb-input-right' >
              <Input value='1.000.000.000' />
            </TableCell>
            <TableCell className='mscb-input-table mscb-input-right' >
              <Input value='500.000.000' />
            </TableCell>
            <TableCell >Mối quan hệ với khách hàng vay</TableCell>
            <TableCell >
              <Radio sx={{
                '& .MuiFormGroup-row': {
                  alignSelf: 'center',
                  label: {
                    marginRight: '0!important',
                    marginLeft: '0!important',
                  }
                },
              }} options={[{ value: 'Y', checked: false }]} value='2' checked={false} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  </>
}
export default CusGroupRelate