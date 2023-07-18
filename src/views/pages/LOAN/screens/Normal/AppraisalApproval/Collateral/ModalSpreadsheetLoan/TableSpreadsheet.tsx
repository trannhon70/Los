import { Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FunctionComponent, useState } from 'react';
import Input from 'views/components/base/Input';
import TableSticky from 'views/components/layout/TableSticky';
// import { BsCheck2Circle } from 'react-icons/bs';
import CloseIcon from '@mui/icons-material/Close';
import useApprovalCollarteralSpreadsheetMessage from 'app/hooks/useApprovalCollarteralSpreadsheetMessage';
import useNotify from 'app/hooks/useNotify';
import {
  addSpreadSheetCollateralApproval, deleteSpreadSheetCollateralApproval,
  onChangeSpreadSheetCollateralApproval,
  postCollateralsApprovalLVT
} from 'features/loan/normal/storageApproval/collateral/actions';
import { ETypeValidateCollateralApproval } from 'features/loan/normal/storageApproval/collateral/case';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ILoanNormalApprovalLogRows, ILOANNormalApprovalSpreadSheet } from 'types/models/loan/normal/storageApproval/Collateral';
import { formatNumber, formatRoundNumber } from 'utils';
import { timestampToDate } from 'utils/date';
import Select from 'views/components/base/Select';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableCellEllipsis from 'views/components/layout/TableCellEllipsis';
import useStorageCollateral from '../useStorageCollateral';
import { SxInputModal, SxInputRightModal, SxSelectModal } from './style';

export interface ITableSpreadsheetProps {
  onClose?(): void;
}

const TableSpreadsheet: FunctionComponent<ITableSpreadsheetProps> = (props) => {
  const { onClose } = props;

  const dispatch = useDispatch();
  const notify = useNotify();
  const getMessage = useApprovalCollarteralSpreadsheetMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const onAddTypeSpreadsheet = () => dispatch(addSpreadSheetCollateralApproval())
  const [alertModal, setAlertModal] = useState<string | null>(null)
  
  const onChangeDataSpreadSheet = (val:string | number | null,key: keyof ILoanNormalApprovalLogRows,uuid:string) =>{
    dispatch(onChangeSpreadSheetCollateralApproval(val,{key:key, uuid:uuid}))
  }

  const onSave =()=>{
    dispatch(postCollateralsApprovalLVT(""))
  }

  const [deleteSperadSheet, setDeleteSperadSheet] = useState<ILoanNormalApprovalLogRows | null>(null);
  // const [openModalClear, setOpenModalClear] = useState<boolean>(false);

  const onHandleCancelConfirm = () => setDeleteSperadSheet(null);
  // const onHandleCancelClearModal= () => setOpenModalClear(false);

  const onHandleConfirmCer = () => {
      const dataUUID = deleteSperadSheet?.uuid ?? ""
      dispatch(deleteSpreadSheetCollateralApproval(dataUUID))
      // dispatch(postCollateralsApprovalLVT("DELETE"))
      onHandleCancelConfirm();
  };
  // const onHandleConfirmClearTable = () => {
  //   dispatch(clearSpreadSheet())
  //   notify("Xóa thành công", "success")
  //   onHandleCancelClearModal();
  // };
  const handleDeleteSperad = (sp: ILoanNormalApprovalLogRows) => () => {
    setDeleteSperadSheet(sp)
  }

  const { AllDataSpreadSheet, dataSelectSpreadSheet, dataCollateral } = useStorageCollateral("ALL")

  const SpreadSheetData = AllDataSpreadSheet
  const totalTempCalcValue = SpreadSheetData.rows?.reduce((prev, next) => { return prev + (next.temp_calc_value ?? 0)},0)
  const totalMaxLVT = SpreadSheetData.rows?.reduce((prev, next) => { return prev + (next.max_ltv_value ?? 0)},0)
  const totalMaxLoanCredit = SpreadSheetData.rows?.reduce((prev, next) => { return prev + (next.max_loan_credit ?? 0)},0)
  const totalSafelyDebit = SpreadSheetData.rows?.reduce((prev, next) => { return prev + (next.safely_debit ?? 0)},0)
  const totalLtvValue = SpreadSheetData.rows?.reduce((prev, next) => { return prev + (next.ltv_value ?? 0)},0)


  const handleClose = () =>  onClose && onClose();
  const handleFocusOutDeptInput = (index: number) => () => {
    const rowData = SpreadSheetData.rows[index]
    const maxLoan = SpreadSheetData.rows[index]?.max_loan_credit ?? 0
    if(rowData && ((rowData.safely_debit ?? 0) > (maxLoan ?? 0))){
      setAlertModal("Dư nợ đảm bảo tài sản cao hơn Số tiền vay tối đa!!!")
    } 
  }

  const handleFocusOutValueProvisionalInput = (index: number) => () => {
    const rowData = SpreadSheetData.rows[index]
    const collateralValue = dataCollateral.data?.find(e => e.price_cert_uuid === rowData.coll_price_cert_uuid)?.collateral_value ?? 0

    if(rowData.temp_calc_value !== collateralValue){
      setAlertModal("Giá trị tài sản KHÔNG BẰNG Tổng giá trị định giá của tài sản, kiểm tra lại!")
    }
  }
  
  const handleOnCloseModal = () => {
    setAlertModal(null)
  }
  return (
    <>
      <Grid className="flex justify-between pb-3">
        <p className='flex my-0 text-upper text-primary font-medium text-18'>BẢNG TÍNH KHOẢN VAY TRÊN GIÁ TRỊ TÀI SẢN</p> 
        {
          <div className='flex'>
            {AllDataSpreadSheet.updated_at && <p className='flex my-0 pr-7 text-12 style-iatalic'>Cập nhật:&nbsp; <span className='text-primary'>{`${AllDataSpreadSheet.updated_by_fullname ?? "-"} - ${timestampToDate(AllDataSpreadSheet.updated_at, 'HH:mm - DD/MM/YYYY') }`}</span></p>}
            <IconButton onClick={handleClose} color="error" sx={{width: '14px', height: "14px"}}>
              <CloseIcon />
            </IconButton>
          </div>
        }
        
      </Grid>
      <Grid container >
        <Grid item xl={12} md={12} xs={12} >
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table mscb-table-border"
              sx={{
                "& .MuiTable-root":{
                  tableLayout:"fixed"
                }
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCellEllipsis width="60px" align="center">STT</TableCellEllipsis>
                  <TableCellEllipsis width="20%" align="center">LOẠI TÀI SẢN</TableCellEllipsis>
                  <TableCellEllipsis width="10%" align="center">KHOẢN VAY</TableCellEllipsis>
                  <TableCellEllipsis width="15%" align="center"> GIÁ TRỊ TÀI SẢN <span>(VNĐ)</span></TableCellEllipsis>
                  <TableCellEllipsis width="10%" align="center">MAX LTV <span>(%)</span></TableCellEllipsis>
                  <TableCellEllipsis width="15%" align="center">SỐ TIỀN VAY TỐI ĐA <span>(VNĐ)</span></TableCellEllipsis>
                  <TableCellEllipsis width="15%" align="center">DƯ NỢ ĐẢM BẢO <span>(VNĐ)</span></TableCellEllipsis>
                  <TableCellEllipsis width="6%"align="center">LTV <span>(%)</span></TableCellEllipsis>
                  <TableCellEllipsis align="center" width="8%">THAO TÁC</TableCellEllipsis>
                </TableRow>
              </TableHead>
              <TableBody >
                {SpreadSheetData.rows?.map((item, idx) => {
                  return <TableRow key={idx}>
                    <TableCellEllipsis width="50px" className="font-medium" align="center">{idx + 1}</TableCellEllipsis>
                    <TableCellEllipsis align="center" width="280px"
                     className={`font-medium ${getMessage('price_cert_uuid', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET }) ? "pb-5" : ""}`}
                     >
                      <Select 
                        sx={SxSelectModal}  
                          options={
                            dataSelectSpreadSheet?.map(item=>({
                              label:item.nameChildType,
                              value:item.price_cert_uuid
                            }))
                          }
                        message={getMessage('price_cert_uuid', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET })}
                        value={item.coll_price_cert_uuid}
                        onChange={(val)=>onChangeDataSpreadSheet(val,'coll_price_cert_uuid',item.uuid)}/>
                  </TableCellEllipsis>
                    <TableCellEllipsis align="center" className="font-medium " width="170px">
                      <Input sx={SxInputModal} 
                        value={item.loan_credit ?? ""}
                        onDebounce={(val)=>onChangeDataSpreadSheet(val,"loan_credit",item.uuid)}
                        message={getMessage('loan', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET })}
                      />
                    </TableCellEllipsis>
                    <TableCellEllipsis align="center" className="font-medium" width="200px">
                      <Input sx={SxInputRightModal}
                        value={item.temp_calc_value?.toString()}
                        type="number"
                        onBlur={handleFocusOutValueProvisionalInput(idx)}
                        onDebounce={(val)=>onChangeDataSpreadSheet(+val,"temp_calc_value",item.uuid)} 
                        format
                        message={getMessage('valueProvisional', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET })}
                      />
                    </TableCellEllipsis>
                    <TableCellEllipsis align="center" className="font-medium" width="150px">
                      <Input
                        sx={SxInputRightModal} 
                        value={item.max_ltv_value?.toString()}
                        type="number"
                        onDebounce={(val)=>onChangeDataSpreadSheet(+val,"max_ltv_value",item.uuid)} 
                        format
                        message={getMessage('maxLVT', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET })}
                      />
                    </TableCellEllipsis>
                    <TableCellEllipsis align="right" className="font-medium" width="200px">
                      {formatNumber((item.max_loan_credit ?? 0).toString())}
                    </TableCellEllipsis>
                    <TableCellEllipsis align="center" className="font-medium" width="200px">
                      <Input 
                        sx={SxInputRightModal} 
                        value={item.safely_debit?.toString()}
                        onBlur={handleFocusOutDeptInput(idx)}
                        type="number"
                        onDebounce={(val)=>onChangeDataSpreadSheet(+val,"safely_debit",item.uuid)}
                        format
                        message={getMessage('debt', { agree: idx, position: item.uuid, type: ETypeValidateCollateralApproval.SPREADSHEET })}
                      />
                    </TableCellEllipsis>
                    <TableCellEllipsis align="right" className="font-medium" width="150px">
                      {item.ltv_value}
                    </TableCellEllipsis>
                    <TableCell align="center" className="font-medium" width="100px">
                      {/* <IconButton
                        color="primary"
                        size="small"
                      >
                        <BsCheck2Circle className='text-18' />
                      </IconButton> */}
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={handleDeleteSperad(item)}
                      >
                        <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                })
                }
                <TableRow>
                  <TableCell align="left" className="font-medium" colSpan={9}>
                    {!ruleDisabled ?
                    <p 
                      onClick={onAddTypeSpreadsheet}
                      style={{
                        margin: '2px 0px',
                        cursor: 'pointer',
                        color: '#eb0029',
                      }}>+ Thêm dòng</p> : null }
                    {/* <Button
                      variant="outlined"
                      onClick={onAddTypeSpreadsheet}
                      // startIcon={<RiAddFill className='text-12' />}
                      sx={{
                        border: 'none',
                        ":hover": {
                          border: 'none',
                          background: 'none'
                        },
                        maxHeight: '24px',
                        textTransform: 'none',
                        color: '#eb0029',
                      }}
                    >
                      + Thêm dòng
                    </Button> */}
                  </TableCell>
                </TableRow>
                <TableRow sx={{
                  "td": {
                    borderColor: '#1825aa !important',
                  }
                }}>
                  <TableCellEllipsis align="left" className="font-medium text-primary text-14" colSpan={3}>TỔNG</TableCellEllipsis>
                  <TableCellEllipsis align="right" className="font-medium text-danger text-14" color='var(--mscb-red)' >{formatNumber(totalTempCalcValue.toString())}</TableCellEllipsis>
                  <TableCellEllipsis align="center" className="font-medium text-danger text-14" color='var(--mscb-red)' >{formatNumber(totalMaxLVT.toString())}</TableCellEllipsis>
                  <TableCellEllipsis align="right" className="font-medium text-danger text-14" color='var(--mscb-red)'>{formatNumber(totalMaxLoanCredit.toString()) ?? ""}</TableCellEllipsis>
                  <TableCellEllipsis align="right" className="font-medium text-danger text-14" color='var(--mscb-red)'>{formatNumber(totalSafelyDebit.toString())}</TableCellEllipsis>
                  <TableCellEllipsis align="right" className="font-medium text-danger text-14" color='var(--mscb-red)'>{formatNumber(totalLtvValue.toString())}</TableCellEllipsis>
                  <TableCell align="center" className="font-medium"></TableCell>
                </TableRow>
              </TableBody>
            </TableSticky>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid className='text-right my-6'>
        {!ruleDisabled ? <> 
        <Button
          variant="contained"
          className="ml-4 rounded-0"
          color="error"
          sx={{ minWidth: '100px' }}
          onClick={onClose}
        >ĐÓNG</Button>

        <Button
          variant="contained"
          className="ml-4 rounded-0"
          color="primary"
          onClick={onSave}
          sx={{ minWidth: '100px' }}
        >LƯU</Button>
        </> : null }
      </Grid>

      {/* <ModalConfirm
        open={openModalClear}
        onClose={onHandleCancelClearModal}
        onConfirm={onHandleConfirmClearTable}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn hủy
        </Box>
      </ModalConfirm> */}
      <ModalConfirm
        open={deleteSperadSheet !== null}
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirmCer}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa
        </Box>
      </ModalConfirm>
      <ModalConfirm
        open={alertModal !== null}
        disabledActions={["close"]}
        onConfirm={handleOnCloseModal}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
        {alertModal}
        </Box>
    </ModalConfirm>
    </>
  )
}

export default TableSpreadsheet;