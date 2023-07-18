import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { FunctionComponent, memo, useEffect, useState } from 'react';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import Loading from "views/components/base/Loading";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { formatNumber } from 'utils';
import { FaSort } from "react-icons/fa";
import { SxInputTableCell, SxTableProfile } from './style';
import { timestampToDate } from 'utils/date';
import { APP_DATE_FORMAT } from 'utils/constants';
import Input from "views/components/base/Input";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { GrFormClose } from 'react-icons/gr';
import { ICorrdinatorLOANDocumentList } from 'types/models/loan/corrdinator';


export interface ITableProfileProps{
  data?: ICorrdinatorLOANDocumentList[]
  isLoading?: boolean;
  onNavigateUuid?(document_los_uuid: string): void;
  onSortDocument?() : void;
  onSortProductName?() : void;
  onSortLoanAmount?() : void;
  onSortCKS1?() : void;
  onSortCKS2?() : void;
  onSortCPD?() : void;
  onOpenModalUser?(val: string, document: string, field: string): void;
  onClearData?(document: string, field: string): void;
  onChangeIsEdit?(val: string | boolean, field: keyof ICorrdinatorLOANDocumentList, document: string): void;
}

const TableProfile: FunctionComponent<ITableProfileProps> = (props) => {

  const {
    data = [], 
    isLoading = false, 
    onNavigateUuid, 
    onSortDocument,
    onSortProductName, 
    onSortLoanAmount,
    onSortCKS1,
    onSortCKS2,
    onSortCPD,
    onChangeIsEdit,
    onOpenModalUser,
    onClearData
  } = props

  const [ loading , setLoading ] = useState<boolean>(isLoading);
  
  const [ dataDefault , setDataDefault ] = useState<ICorrdinatorLOANDocumentList[]>(data);


  useEffect(() => {
    if(isLoading !== loading){
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

  const onHandleSortDocument = () => {
    onSortDocument && onSortDocument();
  }

  const onHandleSortProductName = () => {
    onSortProductName && onSortProductName();
  }

  const onHandleSortLoanAmount = () => {
    onSortLoanAmount && onSortLoanAmount();
  }

  const onHandleSortCKS1 = () => {
    onSortCKS1 && onSortCKS1();
  }

  const onHandleSortCPD = () => {
    onSortCPD && onSortCPD();
  }

  const handleChangeEdit = (val: string | boolean, field: keyof ICorrdinatorLOANDocumentList, document: string) => {
    onChangeIsEdit && onChangeIsEdit(val, field, document);
  }


  const onHandleOpenModalUser = (val: string, document: string, field: keyof ICorrdinatorLOANDocumentList, isDisabled: boolean) => {
    !isDisabled && onOpenModalUser && onOpenModalUser(val, document, field)
  }

  const onHandleClearData = (document: string, field: keyof ICorrdinatorLOANDocumentList, isDisabled: boolean) => {
    !isDisabled && onClearData && onClearData(document, field)
  }
  
  const _LoadEmptyData = () => {
    return (
      <TableRow sx={{height: "300px"}}>
        <TableCell colSpan={10}>
          <Empty>Không có dữ liệu</Empty>
        </TableCell>
      </TableRow>
    )
  }

  const _LoadingData = () => {
    return (
      <TableRow sx={{height: "300px"}}>
        <TableCell colSpan={10}>
          <Loading/>
        </TableCell>
      </TableRow>
    )
  }

  const _LoadData = () => {
    return dataDefault.map((d, index) => {
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
              {/* Trạng thái hiện tại back end chưa map kiệp tạm thời hard code Khởi tạo hồ sơ */}
              <span className='text-14 font-medium text-secondary text-left'>{d.status === null ? "Khởi tạo hồ sơ" : 1}</span>
              <span className='text-12 font-medium text-danger text-right'>{timestampToDate(d.update_date, 'HH:mm ' + APP_DATE_FORMAT)}</span>
            </div>
          </TableCell>
          <TableCell>
            <Input
              sx={SxInputTableCell}
              value={d?.controller_1 === null ? "" : `${d?.controller_1?.employee_code ?? ""} - ${d.controller_1?.employee_name ?? ""} - ${d.controller_1?.position ?? ""} - ${d.controller_1?.title ?? ""}`}
              fullWidth
              disabled={!d.isEdit}
              suffix={
                <>
                  {(d.controller_1 !== undefined && d.controller_1 !== null && d.controller_1.toString().length > 0) ? <span className="icon-close" onClick={() => onHandleClearData(d.document, "controller_1", !d.isEdit)}><GrFormClose /></span> : null }
                  <span className='icon-dropdown' onClick={() => onHandleOpenModalUser(d.controller_1?.employee_code?.toString() ?? "", d.document, "controller_1", !d.isEdit)}><KeyboardArrowDownIcon /></span>
                </>
              }
              isTooltip
            />
          </TableCell>
          <TableCell>
            {/* <SelectCorrdinatorLOANUser 
              sx={SxSelectTableCell}
              disabled={!d.isEdit}
              value={d.approver?.toString()}
              onChange={(val) => handleChangeUser(val, "approver", d.document)}
              isFullName
            /> */}
            <Input
              sx={SxInputTableCell}
              value={d.approver === null ? "" : `${d.approver?.employee_code ?? ""} - ${d.approver?.employee_name ?? ""} - ${d.approver?.position ?? ""} - ${d.approver?.title ?? ""}`}
              fullWidth
              disabled={!d.isEdit}
              suffix={
                <>
                  {(d.approver !== undefined && d.approver !== null && d.approver.toString().length > 0) ? <span className="icon-close" onClick={() => onHandleClearData(d.document, "approver", !d.isEdit)}><GrFormClose /></span> : null }
                  <span className='icon-dropdown' onClick={() => onHandleOpenModalUser(d.approver?.employee_code?.toString() ?? "", d.document, "approver", !d.isEdit)}><KeyboardArrowDownIcon /></span>
                </>
              }
              isTooltip
            />
          </TableCell>
          <TableCell align='left' className="text-14 font-medium text-secondary">
            {d.product_name}
          </TableCell>
          <TableCell align='right' className='text-14 font-medium text-danger'>
            {formatNumber(d.loan_amount?.toString() ?? "0")}
          </TableCell>
          <TableCell align='center'>
            <IconButton 
              color="primary" 
              size="small" 
              onClick={() => handleChangeEdit(true , "isEdit", d.document )} 
              disabled={d.isEdit}
            >
              <ModeEditOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <TableSticky
      className="mscb-table mscb-table-border"
      sx={SxTableProfile}
    >
      <TableHead className='table-corrdinator-profile-head'>
        <TableRow>
          <TableCell align='center' width='2%' >STT</TableCell>
          <TableCell align='center' width='8%'>
            {/* <TableSortLabel
              onClick={onHandleSortDocument}
              hideSortIcon
              active={false}
              className="sort-icon"
            > */}
              MÃ HS
              {/* <span>
                <FaSort />
              </span> */}
            {/* </ TableSortLabel> */}
          </TableCell>
          <TableCell align='center' width='10%'>TÊN KHÁCH HÀNG</TableCell>
          <TableCell align='center' width='12%'>TRẠNG THÁI HỒ SƠ</TableCell>
          <TableCell align='center' width='25%'>
            <TableSortLabel
              onClick={onHandleSortCKS1}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
              CKS 1
              <span>
                <FaSort />
              </span>
            </ TableSortLabel>
          </TableCell>
          <TableCell align='center' width='25%'>
            <TableSortLabel
              onClick={onHandleSortCPD}
              hideSortIcon
              active={false}
              className="sort-icon"
            >
              CPD
              <span>
                <FaSort />
              </span>
            </ TableSortLabel>
          </TableCell>
          <TableCell align='center' width='9%'>
            <TableSortLabel
              onClick={onHandleSortProductName}
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
              onClick={onHandleSortLoanAmount}
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
          <TableCell align='center' width='2%'></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          (() => {
            if(loading){
              return _LoadingData();
            }
            if(data.length === 0) {
              return _LoadEmptyData();
            }
            else{
              return _LoadData()
            }
          })()
        }
      </TableBody>

    </TableSticky>
  )
}

export default memo(TableProfile);