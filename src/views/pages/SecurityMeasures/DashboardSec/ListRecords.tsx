
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import CardOutside from 'views/components/layout/CardOutside';
import TableSticky from 'views/components/layout/TableSticky';
import Pagination from 'views/components/layout/Pagination';

export interface ListRecordProps {
  className?: string;
}

const ListRecord: FC<ListRecordProps> = props => {

  const { className } = props;
  const docURL = `/loan/normal/init/'001_03042021_00000001'/product`;

  return <CardOutside label="Danh sách hồ sơ" className={`dashboard-loan mt-7`}>
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
          <TableCell width='5%' sx={{ whiteSpace: 'nowrap' }} align='center'>STT</TableCell>
          <TableCell width='20%' sx={{ whiteSpace: 'nowrap' }} align='center'>Mã hồ sơ</TableCell>
          <TableCell width='20%' sx={{ whiteSpace: 'nowrap' }} align='center'>Tên khách hàng</TableCell>
          <TableCell width='13%' sx={{ whiteSpace: 'nowrap' }} align='center'>Trạng thái</TableCell>
          <TableCell width='17%' sx={{ whiteSpace: 'nowrap' }} align='center'>Đơn vị kinh doanh</TableCell>
          <TableCell width='15%' sx={{ whiteSpace: 'nowrap' }} align='center'>Ngày cập nhật</TableCell>
          <TableCell width='10%' sx={{ whiteSpace: 'nowrap' }} align='center'>Chi tiết</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>


        <TableRow key='1' className="mscb-table-row-label">
          <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} >
            1
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            <Link to={docURL} className="text-primary">
              001_03042021_00000001
            </Link>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            {'Lê Nguyễn Trung Nhân'.toUpperCase()}
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            <span className="text-success ">
              Khởi tạo
            </span>
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            SCB SÀI GÒN
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }} >
            09:00 - 10/05/2021
          </TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>
            <Link to={docURL} className="text-decor">
              Xem chi tiết
            </Link>
          </TableCell>
        </TableRow>

      </TableBody>
    </TableSticky>
    <Pagination
      totalPage={10}
      currentPage={1}
      limit={10}
      className="dashboard-loan-paging"
    // onLimit={handleChangeLimit}
    // onChange={handleChangePage}
    />

  </CardOutside>

}

export default ListRecord;
