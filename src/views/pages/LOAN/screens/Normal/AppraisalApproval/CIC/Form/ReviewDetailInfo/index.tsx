import ErrorIcon from '@mui/icons-material/Error';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Tooltip from "@mui/material/Tooltip";
import useMasterData from "app/hooks/useMasterData";
import { getSummaryPersonActiveDetail } from "features/loan/normal/storageApproval/cic/selectors";
import { FC, Fragment, useEffect } from "react";
import { RiBankFill } from 'react-icons/ri';
import { useSelector } from "react-redux";
import { IPersonCICInfo, IPersonCICInfoDetail } from 'types/models/loan/normal/storageApproval/CIC';
import { formatNumber, generateUUID, intToAlphabet } from "utils";
import { dateToTimestamp } from "utils/date";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Empty from 'views/components/layout/Empty';
import ReviewDetailInfoStyles from "./style";



export interface ModalReviewDetailInfoCICProps {
  open: boolean;
  onClose?: () => void;
  labelName: string;
}
const ReviewDetailsInfo: FC<ModalReviewDetailInfoCICProps> = (props) => {
  const classes = ReviewDetailInfoStyles();

  const { open, onClose, labelName } = props;

  const handleClose = () => {
    onClose && onClose()
  };
  const { DebtClassification, CreditInstitution , TypeTermLoan, CifIfType, register} = useMasterData()
  
  useEffect(() => {
    register('debtClassification')
    register('creditInstitution')
    register('typeTermLoan')
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getCifIfTypeName = (id: string) => {
    return CifIfType.find(e => e.id === id)?.name ?? id
  }

  const personDetail = useSelector(getSummaryPersonActiveDetail)
  const getDebitClassName = (id : string) => {
    return DebtClassification.find(e => e.id === id)?.name ?? id
  }
  const getNameCreditInstitution = (id: string) => {
    return CreditInstitution.find(e => e.id === id)?.name ?? id
  }
  const getNameTermLoan = (id: string) => {
    return TypeTermLoan.find(e => e.id === id)?.name ?? id
  }
  const checkTimeOver30Day = (time: number | null) => {
    if(time){
      const current = new Date()
      return dateToTimestamp(current.toISOString()) - time > 30*24*3600
    }
    return false
  }
  const checkCardisExistinNormalLoan = (id: string, cicInfo : IPersonCICInfoDetail) => {
    const normalInst = cicInfo.cic_normal_loan.institution?.find(int => int.institution_id === id)
    if(normalInst && normalInst.institution_detail){
      if (normalInst.institution_detail.length > 0) {
        return true
      }
    }
    return false
  }
  const checkNormalLoanExist = (cic : IPersonCICInfo) => {
    return cic.cic_information_detail.cic_normal_loan 
    && cic.cic_information_detail?.cic_normal_loan?.institution?.some(int => int?.institution_detail?.length > 0)
  }
  const checkExistCard = (cic : IPersonCICInfo) => {
    return cic?.cic_information_detail?.cic_credit?.institution?.some(int => int.institution_detail.length > 0) 
  }
  const totalCollateral = (cicInfo : IPersonCICInfoDetail) => {
    const totalNormal = cicInfo?.cic_normal_loan?.institution?.reduce((prev, cur) => {
      return prev + cur.institution_total
    },0)
    
    // const totalCard =  cicInfo.cic_credit.institution.reduce((prev, cur) => {
    //       return prev + (checkExistNormalLoan(cur.institution_id, cicInfo) ? 0 : cur.institution_total)
    //     },0)

    return totalNormal
  }

  const THeader = () => {
    return (
      <TableRow>
        <TableCell sx={{ width: "4%" }} align="center">STT</TableCell>
        <TableCell sx={{ width: "14%" }} align="center">TÊN TỔ CHỨC TÍN DỤNG</TableCell>
        <TableCell sx={{ width: "12%" }} align="center">THỜI HẠN VAY <span className="text-lowercase fw-normal">(tháng)</span></TableCell>
        <TableCell sx={{ width: "16%" }} align="center">SỐ TIỀN CẤP TÍN DỤNG THỰC TẾ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "16%" }} align="center">DƯ NỢ THỰC TẾ<span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "11%" }} align="center">GIÁ TRỊ TSBĐ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "26%" }} align="center">NGÀY TRA CIC</TableCell>
      </TableRow>
    )
  }

  return <Dialog open={open} onClose={handleClose} maxWidth={"xl"} fullWidth={true}>

    <DialogTitle className={classes.title} style={{ color: 'var(--mscb-primary)' }}>
      THÔNG TIN CHI TIẾT CIC
      <IconButton
          className={classes.iconClose}
          aria-label="close"
          onClick={handleClose}
          style={{ color: "#eb0029" }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <i className="fas fa-times"></i>
        </IconButton>
    </DialogTitle>
    <DialogContent>
    <Grid container columnSpacing="20px" rowSpacing="20px">
      <Grid className={`${classes.disabledInput} ${classes.disabledTextUpper}`} item xl={4} lg={4} md={4}>
        <Input label="1. Tên khách hàng" disabled value={personDetail?.detail.full_name.toUpperCase()} />
      </Grid>
      <Grid className={`${classes.disabledInput} ${classes.disabledTextError}`} item xl={4} lg={4} md={4}>
        <Input format type="number" label="2. Tổng dư nợ (VND)" disabled value={personDetail?.detail.total_loan.toString()} />
      </Grid>
      <Grid className={`${classes.disabledInput} ${classes.disabledTextError}`} item xl={4} lg={4} md={4}>
        <Input  format type="number"  label="3. Tổng giá trị TSBĐ (VND)" disabled value={personDetail?.detail.total_collateral.toString()} />
      </Grid>
    </Grid> 
      {
        personDetail?.detail?.cic_information?.map((cic, cicIndex) => (
          <Fragment key={cic.uuid ?? generateUUID()}>
            <div className={classes.root}>
              <div className={classes.cicHeaderTitle}>
              <p className="title">
                {`${intToAlphabet(cicIndex)} THÔNG TIN CIC - ${getCifIfTypeName(cic.cic_information_name)} - ${cic.cic_information_code}`}
              </p>
              {
                !!cic.debit_group_highest &&  <p className="font-medium text-secondary" >
                {`Nhóm nợ cao nhất: ${getDebitClassName(cic.debit_group_highest)}`}
              </p>
              }
             
              </div>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead className="table__header">
                    <THeader />
                  </TableHead>
                  {
                    !checkNormalLoanExist(cic) && !checkExistCard(cic) ? 
                    <TableBody className="table__body">
                      <TableCell align='center' colSpan={10}>
                      Khách hàng chưa từng phát sinh quan hệ tín dụng 
                    </TableCell></TableBody>
                 : <TableBody className="table__body">
                  { !checkNormalLoanExist(cic) 
                    && !cic?.cic_information_detail?.cic_credit 
                    && !cic?.cic_information_detail?.cic_credit?.institution.some(int => int.institution_detail.length > 0) 
                    &&
                        <TableRow>
                          <TableCell colSpan={7}>
                            <Empty>Không có dữ liệu</Empty>
                          </TableCell>
                        </TableRow>
                  }
                  { checkNormalLoanExist(cic) && <Fragment>
                  <TableRow>
                    <TableCell sx={{
                      backgroundColor: '#1825aa',
                      color: '#fff !important'
                    }} className="text-center font-bold" width={60}>I</TableCell>
                    <TableCell sx={{
                      backgroundColor: '#1825aa',
                      color: '#fff !important'
                    }} className="font-bold" width={198}>VAY THÔNG THƯỜNG</TableCell>
                    <TableCell className="text-center" colSpan={3}></TableCell>
                    <TableCell align="right" className="bg-danger font-medium" scope="row" >
                      {formatNumber(totalCollateral(cic.cic_information_detail).toString() )}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <Grid 
                      className={classes.disabledInput}
                      item 
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        maxHeight: '27px',
                        '& .MuiFormControl-root':{
                          maxWidth: 140
                        },
                        '& .MuiOutlinedInput-root':{
                          height: 24
                        },
                        '& .MuiOutlinedInput-root input':{
                          height: 24
                        },
                        '& .MuiInputAdornment-root':{
                          height: 24
                        }
                      }} 
                      >
                        <p className="text-danger m-0 font-medium mr-2">Ngày cập nhật CIC mới nhất</p>
                        <InputDate 
                          value={(cic.cic_information_detail.cic_normal_loan.date_of_latest_CIC_results ?? 0)*1000}
                          disabled 
                          />
                        {checkTimeOver30Day(cic.cic_information_detail.cic_normal_loan.date_of_latest_CIC_results) && <Tooltip arrow title='CIC tra cứu đã quá thời hạn 30 ngày'>
                          <IconButton color="error" sx={{paddingRight: '4px'}}>
                            <ErrorIcon sx={{fontSize: 18}}/>
                          </IconButton>
                        </Tooltip>}
                      </Grid>
                    </TableCell>
                  </TableRow>
                  {
                    checkNormalLoanExist(cic) 
                      && cic?.cic_information_detail?.cic_normal_loan?.institution?.filter(int => int.institution_detail.length > 0)?.map((institution, instIndex) => (
                      <Fragment key={institution.uuid}>
                      <TableRow>
                        <TableCell align="center" className="font-bold text-secondary" >{instIndex+1}</TableCell>
                        <TableCell align="left" colSpan={4} className="font-bold text-secondary" >
                        <div className={classes.bankInfo}>
                              <Avatar
                                className="image"
                                children={<RiBankFill/>}
                              />
                            {getNameCreditInstitution(institution.institution_id)}
                          </div>
                        </TableCell>
                        <TableCell align="right" className='mscb-input-table px-5 font-medium text-error'>
                          {formatNumber(institution.institution_total.toString())}
                        </TableCell>
                        <TableCell align="right">
                        </TableCell>
                      </TableRow>
                      {
                        institution?.institution_detail?.map((instChild, childIndex) => (
                          <Fragment key={instChild.institution_detail_id}>
                            <TableRow>
                              <TableCell align="center" scope="row" className="font-medium text-secondary">{`${instIndex+1}.${childIndex+1}`}</TableCell>
                              <TableCell align="left" scope="row" className="font-bold text-secondary">{getNameTermLoan(instChild.institution_detail_id)}</TableCell>
                              <TableCell align="left" scope="row" className="font-medium text-secondary px-5">
                               {instChild.monthly_loan_term}
                              </TableCell>
                              <TableCell align="right" className="font-medium px-5">
                               {formatNumber(instChild.credit_grant_amount.toString())}
                              </TableCell>
                              <TableCell align="right" className="font-medium px-5">
                                {formatNumber(instChild.actual_balance_converted.toString())}
                              </TableCell>
                              <TableCell align="right">
                              </TableCell>
                              <TableCell align="right">
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        ))
                      }
                      </Fragment>
                    ))
                  }
                </Fragment>
                }  
                {/* Creditcard */}
                {
                  cic?.cic_information_detail?.cic_credit && cic?.cic_information_detail?.cic_credit?.institution?.some(int => int.institution_detail.length > 0)
                  && <Fragment>
                    <TableRow>
                      <TableCell sx={{
                        backgroundColor: '#1825aa',
                        color: '#fff !important'
                      }} className="text-center font-bold" width={60}>{checkNormalLoanExist(cic) ? "II" : "I"}</TableCell>
                      <TableCell sx={{
                        backgroundColor: '#1825aa',
                        color: '#fff !important'
                      }} width={198} className="font-bold">THẺ TÍN DỤNG</TableCell>
                      <TableCell className="text-center" colSpan={3}></TableCell>
                      {
                        checkNormalLoanExist(cic) ? 
                          <TableCell align="right" className="font-bold px-5" scope="row" >
                          </TableCell> 
                          : <TableCell align="right" className="bg-danger font-bold px-5" scope="row" >
                          {
                            formatNumber(totalCollateral(cic.cic_information_detail).toString())
                          }
                          {/* {formatNumber(cic.cic_information_detail.cic_credit.collateral_value.toString())} */}
                        </TableCell>
                      }
                      <TableCell align="left" scope="row">
                        <Grid 
                        className={classes.disabledInput}
                        item 
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          maxHeight: '27px',
                          '& .MuiFormControl-root':{
                            maxWidth: 140
                          },
                          '& .MuiOutlinedInput-root':{
                            height: 24
                          },
                          '& .MuiOutlinedInput-root input':{
                            height: 24
                          },
                          '& .MuiInputAdornment-root':{
                            height: 24
                          }
                        }} >
                          <p className="text-danger m-0 font-medium mr-2">Ngày cập nhật CIC mới nhất</p>
                          <InputDate
                            value={(cic.cic_information_detail.cic_credit.date_of_latest_CIC_results ?? 0)*1000}
                            disabled />
                          {checkTimeOver30Day(cic.cic_information_detail.cic_credit.date_of_latest_CIC_results) 
                            && <Tooltip arrow title='CIC tra cứu đã quá thời hạn 30 ngày'>
                                <IconButton color="error" sx={{paddingRight: '4px'}}>
                                  <ErrorIcon sx={{fontSize: 18}}/>
                                </IconButton>
                              </Tooltip>
                          }
                        </Grid>
                      </TableCell>
                    </TableRow>
                    {
                     cic?.cic_information_detail?.cic_credit?.institution.some(int => int.institution_detail.length > 0) 
                     && cic?.cic_information_detail?.cic_credit?.institution?.filter(int => int.institution_detail.length > 0)?.map((institution, instIndex) => (
                        <Fragment key={institution.uuid}>
                          <TableRow>
                            <TableCell align="center" className="text-secondary font-bold">{instIndex + 1}</TableCell>
                            <TableCell align="left" colSpan={4} className="font-bold text-secondary">
                            <div className={classes.bankInfo}>
                              <Avatar
                                className="image"
                                children={<RiBankFill/>}
                              />
                            {getNameCreditInstitution(institution.institution_id)}
                          </div>
                            </TableCell>
                            <TableCell align="right" className='mscb-input-table px-5 font-medium text-danger'>
                              {checkCardisExistinNormalLoan(institution.institution_id, cic.cic_information_detail) ? null : formatNumber(institution.institution_total.toString())}
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                          </TableRow>
                          {
                            institution?.institution_detail?.map((instChild, childIndex) => (
                              <TableRow className="mscb-table-row-label" key={instChild.institution_detail_id}>
                                <TableCell align="center" scope="row" className="text-secondary">{`${instIndex + 1}.${childIndex + 1}`}</TableCell>
                                <TableCell align="left" scope="row" className="text-secondary">{`Thẻ tín dụng ${childIndex + 1}`}</TableCell>
                                <TableCell align="left" scope="row" className="px-5" >
                                  {instChild?.monthly_loan_term ?? ""}
                                </TableCell>
                                <TableCell align="right" scope="row" className="px-5" >
                                  {formatNumber(instChild?.credit_grant_amount?.toString())}
                                </TableCell>
                                <TableCell align="right" className="px-5">
                                  {formatNumber(instChild?.actual_balance_converted?.toString())}
                                </TableCell>
                                <TableCell align="left" className="text-danger px-5">
                                </TableCell>
                                <TableCell align="right" scope="row">
                                </TableCell>
                              </TableRow>
                            ))
                          } 
                        </Fragment>
                      ))
                    }
                  </Fragment>
                }
                  </TableBody>
                } 
                </Table>
              </TableContainer>
            </div>
          </Fragment>
        ))
      }
    </DialogContent>
  </Dialog>
}
export default ReviewDetailsInfo;