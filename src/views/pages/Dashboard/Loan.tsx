import { FC, useEffect, useRef, Fragment } from 'react';
import { Button, Grid, TableBody, TableCell, TableHead, TableRow,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { timestampToDate } from 'utils/date';
import { APP_DATE_FORMAT } from 'utils/constants';
import { 
  dashboardFetchLOANList,
  dashboardLOANGoToPage,
  dashboardLOANUpdateLimit,
  getDashboardLOANBranch_code,
  getDashboardLOANCustomer_name,
  getDashboardLOANLimit,
  getDashboardLOANList,
  getDashboardLOANLos_id,
  getDashboardLOANOrderBy,
  getDashboardLOANPage,
  getDashboardLOANTotalPage,
  getFetchedLOANList, 
  getFetchingLOANList, 
  updateLOANSearch
} from 'features/dashboard/store/slice';
import querystring from 'querystring'
import CardOutside from 'views/components/layout/CardOutside';
import TableSticky from 'views/components/layout/TableSticky';
import Empty from 'views/components/layout/Empty';
import Pagination from 'views/components/layout/Pagination';
import { InputRef } from 'views/components/base/Input';
import Input from 'views/components/base/Input';
import useMasterData from 'app/hooks/useMasterData';
import { DocumentStatusColor } from 'types/models/dashboard/LOANs';
import SkeletonRow from 'views/components/layout/SkeletonTable';
import TooltipBase from 'views/components/base/Tooltip';

const buildQuery = (page: number, limit: number,los_id?: string,customer_name?: string, branch_code?: string): string => {
  const url: string[] = [];

  page > 1 && url.push('page=' + page);
  limit > 10 && url.push('limit=' + limit);
  los_id && url.push('los_id=' + los_id)
  customer_name && url.push('customer_name=' + customer_name)
  branch_code && url.push('branch_code=' + branch_code)

  return url.join('&');
}

const Loan: FC = () => {

  const fetching = useSelector(getFetchingLOANList);
  const fetched = useSelector(getFetchedLOANList);
  const loans = useSelector(getDashboardLOANList);
  const page = useSelector(getDashboardLOANPage);
  const totalPage = useSelector(getDashboardLOANTotalPage);
  const limit = useSelector(getDashboardLOANLimit);
  const los_id = useSelector(getDashboardLOANLos_id);
  const branch_code = useSelector(getDashboardLOANBranch_code);
  const customer_name = useSelector(getDashboardLOANCustomer_name);
  const order_by = useSelector(getDashboardLOANOrderBy);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const customerNameRef = useRef<InputRef>(null)
  const losIdRef = useRef<InputRef>(null)
  const branchRef = useRef<InputRef>(null)
  const { DocumentStatus, register } = useMasterData()
  
  useEffect(() => {
    register('documentStatus')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  useEffect(() => {
    const searchUrl = querystring.parse(search.replace('?', ''));
    const searchPage = +searchUrl.page || 1;

    if (searchPage > 0 && searchPage !== page){
      dispatch(dashboardLOANGoToPage(searchPage));
      return;
    }

    const searchLimit = +searchUrl.limit || 10;

    if (searchLimit > 0 && searchLimit !== limit){
      dispatch(dashboardLOANUpdateLimit(searchLimit));
      return;
    }

    if (!fetched && !fetching){
      dispatch(dashboardFetchLOANList({ page, limit, order_by, los_id, customer_name,branch_code }));
    }
    
  })

  const getNameDocumentStatus = (id: string) => {
      return DocumentStatus.find(e => e.id === id)?.name ?? id
  }
  const getDescriptionDocumentStatus = (id: string) => {
    return DocumentStatus.find(e => e.id === id)?.description ?? id
  }

  const handleChangeLimit = (value: number) => {
    navigate('?' + buildQuery(1, value, los_id, customer_name,branch_code));
  }

  const handleChangePage = (value: number) => {
    navigate('?' + buildQuery(value, limit, los_id, customer_name,branch_code));
  }
  const handleSearch = () =>{
    const los_id = losIdRef.current?.getValue()
    const customer_name = customerNameRef.current?.getValue()
    const branch_code = branchRef.current?.getValue()
    dispatch(dashboardFetchLOANList({ page:1, limit, order_by, los_id, customer_name, branch_code }));
    (los_id || customer_name) && dispatch(updateLOANSearch({los_id,customer_name, branch_code}))
    navigate('?' + buildQuery(1, limit,los_id,customer_name, branch_code));
  }
  const generateDocUrl = (status : string ,id: string) => {
    if(status.slice(0,2) === 's1'){
      return `/loan/normal/init/${ id }/product`;
    }
    else if(status.slice(0,2) === 's2') {
      return `/loan/normal/appraisal-approval/${ id }/cic-app/main/borrower`
    }
    else return '/'
  }

  return <Fragment>
    <CardOutside label="Tìm kiếm" className="dashboard-filter">
      <Grid  container spacing={2}>
        <Grid item xl={3} lg={3} md={13} sm={6} xs={6} >
          <Input
            label="1. Mã hồ sơ"
            ref={losIdRef}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={13} sm={6} xs={6} >
          <Input
            label="2. Tên khách hàng"
            ref={customerNameRef}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={13} sm={6} xs={6} >
          <Input
            label="2. Đơn vị kinh doanh"
            ref={branchRef}
          />
        </Grid>
        {/* <Grid item xl={3} lg={3} md={13} sm={6} xs={6} >
          <Input
            label="4. Số điện thoại bàn"
            type="number"
          />
        </Grid> */}
        <Grid item xl={12}>
          <Button className='text-upper font-medium text-13 rounded-0'
           sx={{
            backgroundColor:'var(--mscb-primary)',
            color:'var(--mscb-white)',
            width: '120px',
            height: '36px',
            "&:hover":{
              backgroundColor: 'rgb(16, 25, 118) !important',    
            }
          }}
          onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Grid>

      </Grid>
    </CardOutside>
    <CardOutside label="Danh sách hồ sơ" className={`dashboard-loan`}>
      <TableSticky 
        className="mscb-table mscb-table-border"
        sx={{ 
          maxHeight: 'calc(100% - 60px)',
          height: 'calc(100% - 60px)',
          borderBottom: '1px solid #d8d8d8'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>STT</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Mã hồ sơ</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Tên khách hàng</TableCell>
            <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>Trạng thái</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Đơn vị kinh doanh</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Ngày cập nhật</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {(() => {
            if (fetching){
              return <SkeletonRow cellNumber={6} rowNumber={10}/>
            }

            if (!loans.length){
              return <TableRow>
                <TableCell colSpan={ 7 }>
                  <Empty>
                    <p>Không có dữ liệu để hiển thị</p>
                  </Empty>
                </TableCell>
              </TableRow>
            }

            return loans.map((loan, i) => {
              
              const docURL = generateDocUrl(loan.status.id, loan.document.id)

              return <TableRow key={ loan.document.code }>
                <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                  { (page - 1) * limit + i + 1 }
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Link to={ docURL } className="font-medium text-primary">
                    { loan.document.code }
                  </Link>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                  { loan.customer_name !== null && loan.customer_name.toUpperCase() }
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', maxWidth: 230, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {/* <Tooltip title={getDescriptionDocumentStatus(loan.status.id)} placement="top" arrow> */}
                    <span style={{
                      color: `${DocumentStatusColor[loan.status.id] ?? '#353535'}`
                    }} 
                    className={"font-medium"}>
                      <TooltipBase title={getDescriptionDocumentStatus(loan.status.id)} placement="top" arrow>
                        <Fragment>
                          { getNameDocumentStatus(loan.status.id) }
                        </Fragment>
                      </TooltipBase>
                    </span>
                  {/* </Tooltip> */}
                  
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                  { loan.business_unit.name }
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} className="font-medium">
                  { timestampToDate(loan.update_date, 'HH:mm ' + APP_DATE_FORMAT) }
                </TableCell>
              </TableRow>
            });
          })()}
  
        </TableBody>
      </TableSticky>
      {
        !fetching ? (
          <Pagination
          totalPage={totalPage}
          currentPage={page}
          limit={limit}
          className="dashboard-loan-paging"
          onLimit={handleChangeLimit}
          onChange={handleChangePage}
        />
        ) : (
          <Pagination
          totalPage={totalPage}
          currentPage={page}
          limit={limit}
          className="dashboard-loan-paging"
          // onLimit={handleChangeLimit}
          // onChange={handleChangePage}
        />
        )
      }
    </CardOutside>
  </Fragment>

}

export default Loan;
