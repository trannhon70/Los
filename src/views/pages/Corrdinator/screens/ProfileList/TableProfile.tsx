import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import _ from "lodash";
import { FunctionComponent, memo, useEffect, useState } from 'react';
import { FaSort, FaUserEdit } from "react-icons/fa";
import { ICorrdinatorDocumentList } from 'types/models/corrdinator';
import { formatNumber } from 'utils';
import { APP_DATE_FORMAT } from 'utils/constants';
import { timestampToDate } from 'utils/date';
import Empty from 'views/components/layout/Empty';
import SkeletonRow from 'views/components/layout/SkeletonTable';
import TableSticky from 'views/components/layout/TableSticky';
import { SxTableProfile } from './style';

export interface ITableProfileProps {
  data?: ICorrdinatorDocumentList[]
  isLoading?: boolean;
  onNavigateUuid?(document_los_uuid: string): void;
  onSortDocument?(): void;
  onSortProductName?(): void;
  onSortLoanAmount?(): void;
  onSortCKS1?(): void;
  onSortCKS2?(): void;
  onSortCPD?(): void;
  onOpenModalUser?(val: string, document: string, field: string): void;
  onClearData?(document: string, field: string): void;
  onChangeUser?(val: string | boolean, field: keyof ICorrdinatorDocumentList, document: string): void;
  onChangeIsEdit?(val: string | boolean, document: string, data: ICorrdinatorDocumentList): void;
}

const TableProfile: FunctionComponent<ITableProfileProps> = (props) => {

  const {
    data = [],
    isLoading = false,
    onNavigateUuid,
    onChangeIsEdit,
  } = props

  const [loading, setLoading] = useState<boolean>(isLoading);

  const [dataDefault, setDataDefault] = useState<ICorrdinatorDocumentList[]>(data);

  const [sort,setSort] = useState<'asc' | 'desc'>('asc')
  useEffect(() => {
    if (isLoading !== loading) {
      setLoading(isLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    setDataDefault(data)
  }, [data])

  const onHandleClickUuid = (document_los_uuid: string) => {
    onNavigateUuid && onNavigateUuid(document_los_uuid);
  }

  const handleChangeEdit = (val: string | boolean, document: string, data: ICorrdinatorDocumentList) => {
    onChangeIsEdit && onChangeIsEdit(val, document, data);
  }

  const _LoadEmptyData = () => {
    return (
      <TableRow sx={{ height: "100%" }}>
        <TableCell colSpan={10}>
          <Empty>Không có dữ liệu</Empty>
        </TableCell>
      </TableRow>
    )
  }

  const _LoadingData = () => {
    return (
      <SkeletonRow cellNumber={9} rowNumber={10}/>
      // <TableRow sx={{ height: "100%" }}>
      //   <TableCell colSpan={10}>
      //     <Loading />
      //   </TableCell>
      // </TableRow>
    )
  }
  const handleSort = (key: string) =>{
    sort === 'asc'? setSort('desc') : setSort('asc')
    return setDataDefault(_.orderBy(dataDefault, [key],[sort]))
  }
  const handleSortObj = () =>{
    sort === 'asc'? setSort('desc') : setSort('asc')
    return setDataDefault(_.orderBy(dataDefault, [function(o) { return o.reappraise_headquarter?.employee_name; }],[sort]))
  }
  const _LoadData = () => {
    return dataDefault.map((d, index, s) => {
      return (
        <TableRow key={index}>
          <TableCell align='center' className="text-14 font-medium">
            {index + 1}
          </TableCell>
          <TableCell
            align='center'
            className="text-14 font-medium underline text-primary mscb-pointer"
            onClick={() => onHandleClickUuid(d.document_los_uuid)}
          >
            {d.document}
          </TableCell>
          <TableCell align='left' className="text-14 font-medium text-secondary">
            {d.customer_name}
          </TableCell>
          <TableCell>
            <div className='inline-grid w-full'>
              <span className='text-14 font-medium text-secondary text-left'>{d.state_name}</span>
            </div>
          </TableCell>
          <TableCell align='left' className="text-14 font-medium text-secondary">
            {d.product_name}
          </TableCell>
          <TableCell align='right' className='text-14 font-medium text-danger'>
            {formatNumber(d.loan_amount?.toString() ?? "0")}
          </TableCell>
          <TableCell align='right' className='text-14 font-medium'>
            {d.reappraise_headquarter?.employee_name}
          </TableCell>
          <TableCell align='right' className='text-14 font-medium'>
            {timestampToDate(d.update_date, 'HH:mm ' + APP_DATE_FORMAT)}
          </TableCell>
          <TableCell align='center'>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleChangeEdit(true, d.document, d)}
              disabled={d.isEdit}
            >
              <FaUserEdit />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  }
  return (
    <TableSticky
      className="mscb-table mscb-table-border table-cordinator"
      
      sx={{...SxTableProfile,
      "& .MuiTable-root":{
        height:loading || data.length === 0 ? '100%' :"initial"}
      }}
    >
      <TableHead className='table-corrdinator-profile-head'>
        <TableRow>
          <TableCell align='center' width='1%' >STT</TableCell>
          <TableCell align='center' width='8%'>
            <TableSortLabel
              onClick={()=>{
                handleSort('document')
              }}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
            MÃ HS
              <span>
                <FaSort />
              </span>
            </ TableSortLabel>
          </TableCell>
          <TableCell align='center' width='15%'>TÊN KHÁCH HÀNG</TableCell>
          <TableCell align='center' width='11%'>TRẠNG THÁI</TableCell>
          <TableCell align='center' width='9%'>
            <TableSortLabel
              onClick={()=>{
                handleSort('product_name')
              }}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
              SẢN PHẨM
              <span>
                <FaSort />
              </span>
            </TableSortLabel>
          </TableCell>
          <TableCell align='center' width='10%'>
            <TableSortLabel
              onClick={()=>{
                handleSort('loan_amount')
              }}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
            HẠN MỨC / SỐ TIỀN VAY (VNĐ)
            <span>
                <FaSort />
              </span>
            </TableSortLabel>
          </TableCell>
          <TableCell align='center' width='15%'>
            <TableSortLabel
              onClick={()=>{
                handleSortObj()
              }}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
            NGƯỜI THỰC HIỆN
            <span>
                <FaSort />
              </span>
            </TableSortLabel>
          </TableCell>
          <TableCell align='center' width='10%'>
            <TableSortLabel
              onClick={()=>{
                handleSort('update_date')
              }}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
            THỜI GIAN CẬP NHẬT
            <span>
                <FaSort />
              </span>
            </TableSortLabel>
          </TableCell>
          <TableCell align='center' width='2%' ></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          (() => {
            if (loading) {
              return _LoadingData();
            }
            if (data.length === 0) {
              return _LoadEmptyData();
            }
            else {
              return _LoadData()
            }
          })()
        }
      </TableBody>

    </TableSticky>
  )
}

export default memo(TableProfile);