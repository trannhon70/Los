
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import CardOutside from 'views/components/layout/CardOutside';
import TableSticky from 'views/components/layout/TableSticky';
import Pagination from 'views/components/layout/Pagination';
import Select from 'views/components/base/Select';

export interface ListRecordProps {
  className?: string;
  isHideBtn?: boolean;
}

const ListRecordsDraft: FC<ListRecordProps> = props => {

  const { className, isHideBtn = true  } = props;
  const docURL = `/loan/normal/init/'001_03042021_00000001'/product`;

  return <CardOutside label="Danh sách hồ sơ soạn thảo" className={`dashboard-loan mt-7`}>
    <TableSticky
      className="mscb-table mscb-table-border"
      sx={{
        maxHeight: 'calc(100% - 60px)',
        height: 'calc(100% - 60px)',
        borderBottom: '1px solid #d8d8d8',
        "& .MuiTable-root": {
          tableLayout: "fixed"
        }
      }}
    >
      <TableHead >
        <TableRow>
          <TableCell width='5%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            STT
          </TableCell>
          <TableCell width='18%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            Mã LOS
          </TableCell>
          <TableCell width='20%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            Họ tên khách hàng vay
          </TableCell>
          <TableCell width='10%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            Mã Giải ngân
          </TableCell>
          <TableCell width='10%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            Ngày trình
          </TableCell>
          <TableCell width='10%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            Trạng thái
          </TableCell>
          <TableCell width='9%' sx={{ whiteSpace: 'wrap' }} align='center'>
            SLA tổng của hồ sơ</TableCell>
          <TableCell width='9%' sx={{ whiteSpace: 'wrap' }} align='center'>
            SLA tại P. nghiệp vụ xử lý</TableCell>
          <TableCell width='9%' sx={{ whiteSpace: 'wrap' }} align='center'>
            SLA tại nhân viên nghiệp vụ xử lý</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key='1' className="mscb-table-row-label">
          <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} >
            1
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Link to={docURL} className="text-primary">
              001_03042021_00000001
            </Link>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            {'Lê Nguyễn Trung Nhân'.toUpperCase()}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            ST0001
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            15:00 - 30/01/2020
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' className=" text-danger">
            Chờ bổ sung
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-yellow text-center'>6 giờ</Box>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-yellow text-center'>6 giờ</Box>

          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Box sx={{ padding: '2.5px' }} className='bg-yellow text-center'>6 giờ</Box>

          </TableCell>
        </TableRow>
        <TableRow key='2' className="mscb-table-row-label">
          <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} >
            2
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Link to={docURL} className="text-primary">
              001_03042021_00000002
            </Link>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            {'Nguyễn Đông Nhựt'.toUpperCase()}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            ST0002
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            15:00 - 30/01/2020
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            Đã hoàn thành
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-danger text-center'>-1 giờ</Box>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-danger text-center'>-1 giờ</Box>

          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Box sx={{ padding: '2.5px' }} className='bg-danger text-center'>-1 giờ</Box>

          </TableCell>
        </TableRow>
        <TableRow key='3' className="mscb-table-row-label">
          <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} >
            3
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Link to={docURL} className="text-primary">
              001_03042021_00000003
            </Link>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            {'Nguyễn Đình Khoa'.toUpperCase()}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            ST0003
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            15:00 - 30/01/2020
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap', color: '#b11ab7' }} align='center' >
            Chờ phân bổ
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-success text-center'>-1 giờ</Box>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center' >
            <Box sx={{ padding: '2.5px' }} className='bg-success text-center'>-1 giờ</Box>

          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} align='center'>
            <Box sx={{ padding: '2.5px' }} className='bg-success text-center'>-1 giờ</Box>

          </TableCell>
        </TableRow>

      </TableBody>
    </TableSticky>
    <Pagination
      totalPage={10}
      currentPage={1}
      limit={10}
      className="dashboard-loan-paging pt-5"
    />
    {!isHideBtn ? (
      <Box sx={{
        position: 'absolute',
        top: '0px',
        left: '283px',
        transform: "translate(-4px, -1%)",
      }}>
        <Select
          className='flex-row items-center '
          options={[{ value: '1', label: 'T                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ẤT CẢ TIẾN ĐỘ' }]}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "& .MuiSelect-select": {
              width: "201px!important",
              color: '#fff',
              height: '36px!important',
              backgroundColor: 'var(--mscb-primary)!important',
              '&.MuiInputBase-input': {
                padding: '4px 30px 0 12px',
              }
            },
            "& svg": {
              color: '#fff!important',
            }

          }} />
      </Box>) : null}
  </CardOutside>

}

export default ListRecordsDraft;
