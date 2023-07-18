
import { Box, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import CardOutside from 'views/components/layout/CardOutside';
import TableSticky from 'views/components/layout/TableSticky';
import Pagination from 'views/components/layout/Pagination';
import Select from 'views/components/base/Select';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

export interface ListRecordsCommitmentProps {
  className?: string;
  isHideBtn?: boolean
}
type Order = 'asc' | 'desc';
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
}
const ListRecordsCommitment: FC<ListRecordsCommitmentProps> = props => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('los_id');
  const { className, isHideBtn = false } = props;
  const docURL = `/loan/normal/init/'001_03042021_00000001'/product`;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
      a: { [key in Key]: number | string },
      b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
    console.log('SORT=>>>>>>', orderBy, order, onRequestSort);

    return (
      <TableHead>
        <TableRow>
          <TableCell key='stt' width='5%' sx={{ whiteSpace: 'nowrap' }} align='center'>
            STT
          </TableCell>
          <TableCell key='los_id' width='15%' sx={{ whiteSpace: 'nowrap' }} align='center' sortDirection={orderBy === 'los_id' ? order : false}>
            <TableSortLabel
              active={orderBy === 'los_id'}
              direction={orderBy === 'los_id' ? order : 'asc'}
              onClick={createSortHandler('los_id')}>
              Mã LOS
            </TableSortLabel>
          </TableCell>
          <TableCell key='name' width='15%' sx={{ whiteSpace: 'nowrap' }} align='center' sortDirection={orderBy === 'name' ? order : false}>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={orderBy === 'name' ? order : 'asc'}
              onClick={createSortHandler('name')}>
              Họ Tên khách hàng vay
            </TableSortLabel>

          </TableCell>
          <TableCell key='text_id' width='7%' align='center' sortDirection={orderBy === 'text_id' ? order : false}>
            <TableSortLabel
              active={orderBy === 'text_id'}
              direction={orderBy === 'text_id' ? order : 'asc'}
              onClick={createSortHandler('text_id')}>
              Mã soạn thảo
            </TableSortLabel>
          </TableCell>
          <TableCell key='commitment_id' width='7%' align='center' sortDirection={orderBy === 'commitment_id' ? order : false}>
            <TableSortLabel
              active={orderBy === 'commitment_id'}
              direction={orderBy === 'commitment_id' ? order : 'asc'}
              onClick={createSortHandler('commitment_id')}>
              Mã công chứng
            </TableSortLabel>
          </TableCell>
          <TableCell key='unit_id' width='7%' sx={{ whiteSpace: 'wrap' }} align='center' sortDirection={orderBy === 'unit_id' ? order : false}>
            <TableSortLabel
              active={orderBy === 'unit_id'}
              direction={orderBy === 'unit_id' ? order : 'asc'}
              onClick={createSortHandler('unit_id')}>
              Mã đơn vị
            </TableSortLabel>
          </TableCell>
          <TableCell key='by_user' width='7%' align='center' sortDirection={orderBy === 'by_user' ? order : false}>
            <TableSortLabel
              active={orderBy === 'by_user'}
              direction={orderBy === 'by_user' ? order : 'asc'}
              onClick={createSortHandler('by_user')}>
              User thực hiện
            </TableSortLabel>
          </TableCell>
          <TableCell key='major' width='15%' sx={{ whiteSpace: 'nowrap' }} align='center' sortDirection={orderBy === 'major' ? order : false}>
            <TableSortLabel
              active={orderBy === 'major'}
              direction={orderBy === 'major' ? order : 'asc'}
              onClick={createSortHandler('major')}>
              Nghiệp vụ
            </TableSortLabel>
          </TableCell>
          <TableCell key='sec' width='15%' sx={{ whiteSpace: 'nowrap' }} align='center' sortDirection={orderBy === 'sec' ? order : false}>
            <TableSortLabel
              active={orderBy === 'sec'}
              direction={orderBy === 'sec' ? order : 'asc'}
              onClick={createSortHandler('sec')}>
              Hình thức ĐKBPBĐ
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead >
    );
  }

  return <>
    <Box className={className} sx={{ position: 'relative' }}>
      <CardOutside label="Danh sách hồ sơ công chứng" className={`dashboard-loan mt-3`}>
        <TableSticky
          className="mscb-table mscb-table-border"
          sx={{
            // maxWidth: '700px',
            maxHeight: 'calc(100% - 60px)',
            height: 'calc(100% - 60px)',
            borderBottom: '1px solid #d8d8d8',
            "& .MuiTable-root": {
              tableLayout: "fixed"
            }
          }}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {/* {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => { */}
            <TableRow key='1'>
              <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} className="font-medium">
                1
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Link to={docURL} className="font-medium text-primary">
                  001_03042021_00000001
                </Link>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                {'Lê Nguyễn Trung Nhân'.toUpperCase()}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <span className="font-medium">
                  ST0001
                </span>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                CC1234561
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                DV012
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                danhnv1
              </TableCell>
              <TableCell className="font-medium">
                Công chứng và đăng ký biện pháp bảo đảm
              </TableCell>
              <TableCell className="font-medium">
                Đăng ký Online (Không Công chứng)
              </TableCell>
            </TableRow>
            <TableRow key='5'>
              <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} className="font-medium">
                5
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Link to={docURL} className="font-medium text-primary">
                  001_03042021_00000005
                </Link>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                {'Lê Nguyễn Trung Nhân'.toUpperCase()}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <span className="font-medium">
                  ST0001
                </span>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                CC1234561
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                DV012
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                danhnv1
              </TableCell>
              <TableCell className="font-medium">
                Công chứng và đăng ký biện pháp bảo đảm
              </TableCell>
              <TableCell className="font-medium">
                Đăng ký Online (Không Công chứng)
              </TableCell>
            </TableRow>
            <TableRow key='2'>
              <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} className="font-medium">
                2
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Link to={docURL} className="font-medium text-primary">
                  001_03042021_00000002
                </Link>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                {'Lê Nguyễn Trung Nhân'.toUpperCase()}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <span className="font-medium">
                  ST0001
                </span>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                CC1234561
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                DV012
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                danhnv1
              </TableCell>
              <TableCell className="font-medium">
                Công chứng và đăng ký biện pháp bảo đảm
              </TableCell>
              <TableCell className="font-medium">
                Đăng ký Online (Không Công chứng)
              </TableCell>
            </TableRow>
            <TableRow key='3'>
              <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }} className="font-medium">
                3
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Link to={docURL} className="font-medium text-primary">
                  001_03042021_00000003
                </Link>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                {'Lê Nguyễn Trung Nhân'.toUpperCase()}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <span className="font-medium">
                  ST0001
                </span>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                CC1234561
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                DV012
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                danhnv1
              </TableCell>
              <TableCell className="font-medium">
                Công chứng và đăng ký biện pháp bảo đảm
              </TableCell>
              <TableCell className="font-medium">
                Đăng ký Online (Không Công chứng)
              </TableCell>
            </TableRow>
          </TableBody>
        </TableSticky>
        <Pagination
          totalPage={10}
          currentPage={1}
          limit={10}
          className="dashboard-loan-paging mt-5"
        />

      </CardOutside>
      {!isHideBtn ? (
        <Box sx={{
          position: 'absolute',
          top: '0%',
          left: '296px',
          transform: "translate(-4px, -1%)",
        }}>
          <Select
            className='flex-row items-center '
            options={[{ value: '1', label: 'TẤT CẢ TIẾN ĐỘ' }]}
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
    </Box>
  </>

}

export default ListRecordsCommitment;
