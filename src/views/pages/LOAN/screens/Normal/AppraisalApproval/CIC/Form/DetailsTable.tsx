import ErrorIcon from '@mui/icons-material/Error';
import { Avatar } from '@mui/material';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMasterData from "app/hooks/useMasterData";
import useNormalApprovalCICMessage from 'app/hooks/useNormalApprovalCICMessage';
import clsx from 'clsx';
import {
  addNormalAgreement, saveLOANNormalApprovalCIC, toggleEvaluateHistory, updateCardAgreementContent, updateCardInstitutionContent, updateEvaluateNote, updateFlexcubeDateCIC, updateLatestDateUpdateCIC, updateNormalAgreementContent, updateNormalAgreementSwitchContent
} from 'features/loan/normal/storageApproval/cic/actions';
import { getActivePersonDetail } from "features/loan/normal/storageApproval/cic/selectors";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from 'react-icons/io5';
import { RiBankFill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import {
  ICardAgreementPosition,
  ICardPosition,
  INormalAgreementDeletePosition, INormalAgreementPosition, IPersonCICInfo, IPersonCICInfoDetail
} from 'types/models/loan/normal/storageApproval/CIC';
import { formatNumber, intToAlphabet } from "utils";
import { dateToTimestamp, timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import IOSSwitch from "views/components/base/IOSSwitch";
import Radio, { RadioRef } from "views/components/base/Radio";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";
import Empty from 'views/components/layout/Empty';
import ModalConfirm from "views/components/layout/ModalConfirm";
import TableSticky from "views/components/layout/TableSticky";
import SelectRelationship from "views/components/widgets/SelectRelationship";
import CreditScoreInfo from "./CreditScoreInfo";
import tableStyles, { SXstyleInput } from "./styles";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
export interface DetailTableProps {
  additional?: boolean
  label: string;
  dataPosition: string
}

const DetailTable: FC<DetailTableProps> = (props) => {
  const { label, additional, dataPosition } = props;
  const classes = tableStyles()
  const { CollateralType, TypeTermLoan, CreditInstitution, DebtClassification, CifIfType, register} = useMasterData()
    
  useEffect(() => {
    register('collateralType')
    register('typeTermLoan')
    register('creditInstitution')
    register('debtClassification')
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dispatch = useDispatch()
  const personDetail = useSelector(getActivePersonDetail)
  const checkboxRef = useRef<RadioRef>(null);
  const [deleteAgreement, setDeleteAgreement] = useState<INormalAgreementDeletePosition | null>(null)
  const getMessage = useNormalApprovalCICMessage()
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const getNameCollataralType = (id: string) => {
    return CollateralType.find(e => e.id === id)?.name ?? id
  }
  const getNameTermLoan = (id: string) => {
    return TypeTermLoan.find(e => e.id === id)?.name ?? id
  }
  const getNameCreditInstitution = (id: string) => {
    return CreditInstitution.find(e => e.id === id)?.name ?? id
  }
  const getDebitClassName = (id : string) => {
    return DebtClassification.find(e => e.id === id)?.name ?? id
  }
  const getCifIfTypeName = (id: string) => {
    return CifIfType.find(e => e.id === id)?.name ?? id
  }

  const checkTimeOver30Day = (time: number | null) => {
    if(time){
      const current = new Date()
      return dateToTimestamp(current.toISOString()) - time > 30*24*3600
    }
    return false
  }
 
  const handleChangeNormalAgreement = (position: INormalAgreementPosition) => (value: string) =>  {
    dispatch(updateNormalAgreementContent({...position, value: value}))
  }
  const handleChangeCardAgreement = (position: ICardAgreementPosition) => (value:string) => {
    dispatch(updateCardAgreementContent({...position, value: value}))
  }
  
  const handleNormalAgreement = (position: {cic: string, inst: string, child: string}) => () => {
    dispatch(addNormalAgreement(position))
  }
  const handleDeleteNormalAgreement = (position: INormalAgreementDeletePosition) => () => {
    setDeleteAgreement(position)
  }
  const onCloseDeleteAgreement = () => {
    setDeleteAgreement(null)
  }
  const onConfirmDeleteAgreement = () => {
    if(deleteAgreement){
      dispatch(saveLOANNormalApprovalCIC(true, {type: 'delete', position: deleteAgreement , dataPosition}))
      setDeleteAgreement(null)
    } 
  }
  const handleChangeEditAgreement = (position: INormalAgreementPosition) => () => {
    dispatch(updateNormalAgreementContent({...position, isEdit: true}))
  }
  const handleChangeCardInstitution = (position: ICardPosition) => (value:string) => {
    dispatch(updateCardInstitutionContent({...position, value}))
  }
  
  const handleChangeSwitch = (position: {cic: string,inst: string,child: string, agree: string }) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNormalAgreementSwitchContent({...position, value: event.target.checked}))
  }
  const handleChangeEvaluateHistory = () => {
    dispatch(toggleEvaluateHistory(checkboxRef.current?.getValue().value ?? ''))
  }

  const handleChangeEvaluateNote = (value: string) => {
    dispatch(updateEvaluateNote(value))
  }
  const handleChangeLatestDateCIC = (loanType: 'normal' | 'card', cic: string) => (val : number | null) => {
    dispatch(updateLatestDateUpdateCIC({loanType, cic, val}))
  }
  const handleChangeFlexcubeDateCIC = (val : number | null) => {
    dispatch(updateFlexcubeDateCIC(val))
  }
  const checkCardisExistinNormalLoan = (id: string, cicInfo : IPersonCICInfoDetail) => {
    const normalInst = cicInfo.cic_normal_loan.institution.find(int => int.institution_id === id)
    if(normalInst && normalInst.institution_detail){
      if (normalInst.institution_detail.length > 0) {
        return true
      }
    }
    return false
  }
  const checkNormalLoanExist = (cic : IPersonCICInfo) => {
    return cic.cic_information_detail?.cic_normal_loan?.institution?.some(int => int.institution_detail.length > 0)
    
  }
  const checkCreditCardExist = (cic : IPersonCICInfo) => {
    return cic.cic_information_detail?.cic_credit?.institution?.some(inst => inst.institution_detail.length > 0)
    
  }
 
  const totalCollateral = (cicInfo : IPersonCICInfoDetail) => {
    const totalNormal = cicInfo?.cic_normal_loan?.institution?.reduce((prev, cur) => {
      return prev + cur.institution_total
    },0)
    return totalNormal
  }

  if(personDetail === null) return <Empty sx={{
    minHeight: 400,
    "& img": {
      width: "23%"
    },
    fontSize: '20px',
    fontWeight: 300,
    // fontStyle: 'italic',
  }}>
    Chưa có dữ liệu
  </Empty>

  return <Fragment>
    <div className='pt-5'>
      <Grid container columnSpacing="20" rowSpacing="20" >
        <Grid className={`${classes.disabledInput} ${classes.disabledTextUpper}`} item xl={3} lg={12} md={12} sm={12} xs={12} >
          <Input className='text-upper' label={`1. ${label}`} disabled value={personDetail?.full_name.toUpperCase()}/>
        </Grid>
        {
          additional && <Grid className={classes.disabledSelectInput} item xl={3} lg={12} md={12} sm={12} xs={12} >
            <SelectRelationship label='2. Mối quan hệ với người vay' disabled value={personDetail?.borrower_relationship_id ?? ''} otherValueFlag={"Y"}/>
          </Grid>
        }
        <Grid className={`${classes.disabledInput} ${classes.disabledTextError}`} item xl={3} lg={12} md={12} sm={12} xs={12} >
          <Input type='number' format label={`${additional ? '3' : '2'}. Tổng dư nợ (VND)`} disabled value={personDetail?.total_loan.toString()} />
        </Grid>
        <Grid className={`${classes.disabledInput} ${classes.disabledTextError}`} item xl={3} lg={12} md={12} sm={12} xs={12} >
          <Input type='number' format label={`${additional ? '4' : '3'}. Tổng giá trị TSBĐ (VND)`} disabled value={personDetail?.total_collateral.toString()} />
        </Grid>
        <Grid className={classes.disabledInput} item xl={3} lg={12} md={12} sm={12} xs={12} >
          <Input label={`${additional ? '5' : '4'}. Nhóm nợ cao nhất`} disabled  value={getDebitClassName(personDetail?.debit_group_highest ?? '')} />
        </Grid>
        <Grid className={classes.inputDateMedium} item xl={3} lg={12} md={12} sm={12} xs={12} >
          <InputDate 
            label={`${additional ? '6' : '5'}. Flexcube ngày`} 
            value={personDetail?.flexcube_day} 
            onChange={handleChangeFlexcubeDateCIC}
            disabled={ruleDisabled}
            message={getMessage('flexcube_day', personDetail.person_uuid)}
            required
            />
        </Grid>
        {
          personDetail?.cic_information?.map((cic , cicIndex) => (
            <Grid className="mt-2" item xl={12} lg={12} md={12} sm={12} xs={12} key={cic.uuid}>
              <div className={classes.cicHeaderTitle}>
              <Typography
                variant="h4"
                component="h4"
                className="font-bold text-upper mt-0 mb-4"
                sx={{
                  fontSize: '19px'
                }}
              >
              {`${intToAlphabet(cicIndex)} Thông tin CIC - ${getCifIfTypeName(cic.cic_information_name)} - ${cic.cic_information_code}`}
              </Typography>
                {
                  !!cic.debit_group_highest &&  <p className="font-medium mt-0 text-secondary" >
                  {`Nhóm nợ cao nhất: ${getDebitClassName(cic.debit_group_highest)}`}
                </p>
                }
              </div>
            <TableSticky className="mscb-table mscb-table-border">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className="text-center" width={'2%'}>STT</TableCell>
                  <TableCell className="text-center" width={'13%'}>TÊN TỔ CHỨC TÍN DỤNG</TableCell>
                  <TableCell className="text-center" width={'7%'}>
                    THỜI HẠN VAY
                    <span className="font-normal"> (tháng)</span>
                  </TableCell>
                  <TableCell className="text-center" width={'12%'}>
                    SỐ TIỀN CẤP TÍN DỤNG THỰC TẾ
                    <span className="font-normal"> (VNĐ)</span>
                  </TableCell>
                  <TableCell className="text-center" width={'12%'}>
                    DƯ NỢ THỰC TẾ 
                    <span className="font-normal"> (VNĐ)</span>
                  </TableCell>
                  <TableCell className="text-center" width={'10%'}>
                    NHÓM NỢ
                  </TableCell>
                  <TableCell className="text-center" width={'10%'}>
                    TÊN TSBĐ
                  </TableCell>
                  <TableCell className="text-center" width={'12%'}>
                    GIÁ TRỊ TSBĐ
                    <span className="font-normal"> (VNĐ)</span>
                  </TableCell>
                  <TableCell className="text-center" width={'12%'}>
                    NGHĨA VỤ TRẢ NỢ THÁNG
                    <span className="font-normal"> (VNĐ)</span>
                  </TableCell>
                  <TableCell className="text-center" width={'5%'}>
                    TẤT TOÁN TRƯỚC GIẢI NGÂN
                    <span className="font-normal"> (VNĐ)</span>
                  </TableCell>
                  <TableCell className="text-center" sx={{ minWidth: '110px' }}>
                    THAO TÁC
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table__body">
                  {!checkNormalLoanExist(cic) && !checkCreditCardExist(cic)
                  // && !cic?.cic_information_detail?.cic_normal_loan?.institution?.some(int => int.institution_detail.length > 0) 
                  // && !cic?.cic_information_detail?.cic_credit 
                  &&
                    <TableRow>
                      <TableCell colSpan={11}>
                        <Empty>Không có dữ liệu</Empty>
                      </TableCell>
                    </TableRow>
                  }
                {/* Normal Loan */}
                {  
                 checkNormalLoanExist(cic) && <Fragment>
                  <TableRow>
                    <TableCell sx={{
                      backgroundColor: '#1825aa',
                      color: '#fff'
                    }} className="text-center font-bold" width={60}>I</TableCell>
                    <TableCell sx={{
                      backgroundColor: '#1825aa',
                      color: '#fff'
                    }} className="font-bold" width={198}>VAY THÔNG THƯỜNG</TableCell>
                    <TableCell className="text-center" colSpan={5}></TableCell>
                    <TableCell align="right" className="bg-danger font-medium pr-5" scope="row" >
                      {/* {formatNumber(cic.cic_information_detail.cic_normal_loan.collateral_value.toString())} */}
                      {formatNumber(totalCollateral(cic.cic_information_detail).toString() )}
                    </TableCell>
                    <TableCell align="left" scope="row" colSpan={3}>
                      <Grid 
                      className={classes.disabledInput}
                      item 
                      sx={!ruleDisabled ? 
                        SXstyleInput : {
                          ...SXstyleInput,
                          '& .mscb-input input': {
                            backgroundColor: 'unset',
                          },
                          '& .mscb-input .MuiInputAdornment-root': {
                            backgroundColor: 'unset',
                            maxHeight: '27px',
                          },
                        }} >
                        <p className="text-danger m-0 font-medium mr-2">Ngày cập nhật CIC mới nhất</p>
                        <InputDate sx={{
                          maxWidth: '140px',
                          '& .MuiOutlinedInput-root': {
                            height: '27px',
                            '& input': {
                              height: '27px',
                              color: '#353535',
                              fontWeight: 500
                            }
                          }
                        }}
                          disabled={ruleDisabled}
                          value={(cic.cic_information_detail.cic_normal_loan.date_of_latest_CIC_results ?? 0)*1000}
                          onChange={handleChangeLatestDateCIC('normal', cic.uuid)}
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
                    cic?.cic_information_detail?.cic_normal_loan?.institution?.filter(int=> int.institution_detail.length > 0)?.map((institution, instIndex) => (
                      <Fragment key={institution.uuid}>
                      <TableRow>
                        <TableCell align="center" className="font-bold text-secondary" >{instIndex+1}</TableCell>
                        <TableCell align="left" colSpan={6} className="font-bold text-secondary">
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
                        <TableCell align="right" colSpan={3}>
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
                              <TableCell align="right" className="text-danger font-medium px-5">
                               {formatNumber(instChild?.credit_grant_amount?.toString())}
                              </TableCell>
                              <TableCell align="right" className="text-danger font-medium px-5">
                                {formatNumber(instChild?.actual_balance_converted?.toString())}
                              </TableCell>
                              <TableCell align="left" className="text-danger font-medium px-5">
                                {getDebitClassName(instChild.group_debt)}
                              </TableCell>
                              <TableCell align="right" colSpan={5} scope="row">
                                <IconButton 
                                  disabled={ruleDisabled}
                                  onClick={handleNormalAgreement({
                                    cic: cic.uuid,
                                    inst: institution.institution_id,
                                    child: instChild.institution_detail_id,
                                  })} 
                                  className="p-2px rounded-0">
                                  {!ruleDisabled && <AiOutlinePlusSquare fontSize='1.5rem' color="var(--mscb-primary)" />}
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            {
                              instChild?.credit_agreement?.map((agreement, agreeIndex) => (
                                <TableRow key={agreement.uuid}
                                className={classes.disabledInput} >
                                  <TableCell align="center" scope="row" className="text-secondary">{`${instIndex+1}.${childIndex+1}.${agreeIndex+1}`}</TableCell>
                                  <TableCell align="left" scope="row" className="font-medium text-secondary">{agreement.credit_agreement_name}</TableCell>
                                  <TableCell align="left" scope="row" className='mscb-input-table px-2 text-secondary'>
                                    <Input format required type="number" value={agreement.monthly_loan_term.toString()} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'monthly_loan_term'
                                      })}
                                      message={getMessage('monthly_loan_term', 
                                        personDetail.person_uuid,
                                        cic.uuid,
                                        institution.institution_id,
                                        instChild.institution_detail_id,
                                        agreement.uuid,
                                      )}
                                      disabled={!agreement.isEdit}
                                      />
                                  </TableCell>
                                  <TableCell align="right" className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')}>
                                    <Input format type="number" value={agreement?.credit_grant_amount?.toString()} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'credit_grant_amount'
                                      })}
                                      message={getMessage('credit_grant_amount', 
                                        personDetail.person_uuid,
                                        cic.uuid,
                                        institution.institution_id,
                                        instChild.institution_detail_id,
                                        agreement.uuid,
                                      )}
                                      disabled={!agreement.isEdit}/>
                                  </TableCell>
                                  <TableCell align="right" className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')}>
                                    <Input format type="number" value={agreement.actual_balance_converted?.toString()} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'actual_balance_converted'
                                      })}
                                      message={getMessage('actual_balance_converted', 
                                        personDetail.person_uuid,
                                        cic.uuid,
                                        institution.institution_id,
                                        instChild.institution_detail_id,
                                        agreement.uuid,
                                    )}
                                    disabled={!agreement.isEdit}
                                    />
                                  </TableCell>
                                  <TableCell align="left" className="mscb-input-table px-2">
                                    <Input format value={getDebitClassName(agreement.group_debt)} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'group_debt'
                                      })}
                                      message={getMessage('group_debt', 
                                        personDetail.person_uuid,
                                        cic.uuid,
                                        institution.institution_id,
                                        instChild.institution_detail_id,
                                        agreement.uuid,
                                    )}
                                    disabled={!agreement.isEdit}
                                    />
                                  </TableCell>
                                  <TableCell align="left" className="mscb-input-table px-2">
                                    <Input format value={getNameCollataralType(agreement.collateral_id)} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'collateral_id'
                                      })}
                                    //   message={getMessage('collateral_id', 
                                    //   cicIndex,
                                    //   instIndex,
                                    //   childIndex,
                                    //   agreeIndex,
                                    // )}
                                    disabled={!agreement.isEdit}
                                    />
                                  </TableCell>
                                  <TableCell align="left" className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')}>
                                    <Input format type="number" value={agreement.collateral_value?.toString()} 
                                      onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'collateral_value'
                                      })}
                                    //   message={getMessage('collateral_value', 
                                    //   cicIndex,
                                    //   instIndex,
                                    //   childIndex,
                                    //   agreeIndex,
                                    // )}
                                    disabled={!agreement.isEdit}
                                    />
                                  </TableCell>
                                  <TableCell align="left" className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')}>
                                    <Input format type="number" value={agreement.monthly_debt_payment_obligation?.toString()} 
                                       onDebounce={handleChangeNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'monthly_debt_payment_obligation'
                                      })}
                                      message={getMessage('monthly_debt_payment_obligation', 
                                        personDetail.person_uuid,
                                        cic.uuid,
                                        institution.institution_id,
                                        instChild.institution_detail_id,
                                        agreement.uuid,
                                    )}
                                    disabled={!agreement.isEdit}
                                    />
                                  </TableCell>
                                  <TableCell align="left">
                                    <FormControlLabel 
                                      disabled={!agreement.isEdit || ruleDisabled}
                                      classes={{ label: classes.switchLabel }} 
                                      label={agreement.settlement_before_disbursement ? "Có" : "Không"}
                                      control={<IOSSwitch 
                                        onChange={handleChangeSwitch({
                                          cic: cic.uuid,
                                          inst: institution.institution_id,
                                          child: instChild.institution_detail_id,
                                          agree: agreement.uuid,
                                        })}
                                        sx={{ mx: 2 }} 
                                        checked={agreement.settlement_before_disbursement} 
                                      />} 
                                    />
                                  </TableCell>
                                  <TableCell align="right" colSpan={5} scope="row">
                                    <IconButton 
                                      className='mr-2 p-4px' 
                                      onClick={handleChangeEditAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        field: 'isEdit'
                                      })} 
                                      disabled={agreement.isEdit || ruleDisabled}
                                    >
                                      <BsPencil fontSize='1.3rem' color={agreement.isEdit || ruleDisabled ? 'var(--mscb-disabled)' :"var(--mscb-primary)" }/>
                                    </IconButton>
                                    <IconButton 
                                      className="p-2px"  
                                      onClick={handleDeleteNormalAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        agree: agreement.uuid,
                                        uuid: agreement.uuid
                                        })}
                                        disabled={ruleDisabled}
                                      >
                                      <IoTrashOutline style={{fontSize: '1.5rem', color: `${ruleDisabled ? 'var(--mscb-disabled)' :'var(--mscb-primary)'}`}}/>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            }
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
                  checkCreditCardExist(cic) 
                  && <Fragment>
                    <TableRow>
                      <TableCell sx={{
                        backgroundColor: '#1825aa',
                        color: '#fff'
                      }} className="text-center font-bold" width={60}>{checkNormalLoanExist(cic) ? 'II' : "I"}</TableCell>
                      <TableCell sx={{
                        backgroundColor: '#1825aa',
                        color: '#fff'
                      }} width={198} className="font-bold">THẺ TÍN DỤNG</TableCell>
                      <TableCell className="text-center" colSpan={5}></TableCell>
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
                      <TableCell align="left" scope="row" colSpan={3}>
                        <Grid 
                        className={classes.disabledInput}
                        item 
                        sx={!ruleDisabled ? 
                        SXstyleInput : {
                          ...SXstyleInput,
                          '& .mscb-input input': {
                            backgroundColor: 'unset',
                          },
                          '& .mscb-input .MuiInputAdornment-root': {
                            backgroundColor: 'unset',
                            maxHeight: '27px',
                          },
                        }} >
                          <p className="text-danger m-0 font-medium mr-2">Ngày cập nhật CIC mới nhất</p>
                          <InputDate sx={{
                            maxWidth: '140px',
                            '& .MuiOutlinedInput-root': {
                              height: '27px',
                              '& input': {
                                height: '27px',
                                color: '#353535',
                                fontWeight: 500
                              }
                            }
                          }}
                            disabled={ruleDisabled}
                            value={(cic.cic_information_detail.cic_credit.date_of_latest_CIC_results ?? 0)*1000}
                            onChange={handleChangeLatestDateCIC('card', cic.uuid)}
                            />
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
                     cic?.cic_information_detail?.cic_credit?.institution?.filter(int => int.institution_detail.length > 0).map((institution, instIndex) => (
                        <Fragment key={institution.uuid}>
                          <TableRow>
                            <TableCell align="center" className="text-secondary font-bold">{instIndex + 1}</TableCell>
                            <TableCell align="left" colSpan={6} className="font-bold text-secondary">
                              <div className={classes.bankInfo}>
                                <Avatar
                                  className="image"
                                  children={<RiBankFill/>}
                                />
                                {getNameCreditInstitution(institution.institution_id)}
                              </div>
                              </TableCell>
                            <TableCell align="right" className='mscb-input-table px-5 font-medium text-danger'>
                              {/* {formatNumber(institution.institution_total.toString())} */}
                              {checkCardisExistinNormalLoan(institution.institution_id, cic.cic_information_detail) ? null : formatNumber(institution.institution_total.toString())}
                            </TableCell>
                            <TableCell align="right" colSpan={3}>
                            </TableCell>
                          </TableRow>
                          {
                            institution?.institution_detail?.map((instChild, childIndex) => (
                              <Fragment key={instChild.institution_detail_id}>
                                <TableRow className="mscb-table-row-label">
                                  <TableCell align="center" scope="row" className="text-secondary">{`${instIndex+1}.${childIndex+1}`}</TableCell>
                                  <TableCell align="left" scope="row" className="text-secondary">{`Thẻ tín dụng ${childIndex + 1}`}</TableCell>
                                  <TableCell align="left" className={clsx(classes.inputTextAlignStart, 'mscb-input-table px-2')} >
                                    <Input 
                                      value={instChild?.monthly_loan_term} 
                                      onDebounce={handleChangeCardAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        field: 'monthly_loan_term'
                                      })}
                                      disabled={ruleDisabled}
                                    />
                                  </TableCell>
                                  <TableCell align="right" scope="row" className="text-danger px-5" >
                                    {formatNumber(instChild?.credit_grant_amount.toString())}
                                  </TableCell>
                                  <TableCell align="right" className="text-danger px-5">
                                    {formatNumber(instChild.actual_balance_converted.toString())}
                                  </TableCell>
                                  <TableCell align="left" className="text-danger px-5">
                                    {getDebitClassName(instChild.group_debt)}
                                  </TableCell>
                                  <TableCell align="right" className={clsx(classes.inputTextAlignStart, 'mscb-input-table px-2')}>
                                  <Input 
                                      value={instChild?.collateral_name} 
                                      onDebounce={handleChangeCardAgreement({
                                        cic: cic.uuid,
                                        inst: institution.institution_id,
                                        child: instChild.institution_detail_id,
                                        field: 'collateral_name'
                                      })}
                                      disabled={ruleDisabled}
                                    />
                                  </TableCell>
                                  <TableCell align="right" colSpan={4} scope="row">
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))
                          }
                        </Fragment>
                      ))
                    }
                    <TableRow className="mscb-table-row-title">
                      <TableCell className="font-bold" align="left" scope="row" rowSpan={2} colSpan={3} 
                        sx={{borderBottom: '1px solid #353535 !important'}}
                        >
                        Dư nợ cao nhất trong 12 tháng gần nhất
                        <span style={{ fontWeight: 400 }}> (VND)</span>
                      </TableCell>
                      <TableCell 
                        className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')} 
                        align="right" 
                        scope="row" 
                        rowSpan={2}  
                        sx={{borderBottom: '1px solid #353535 !important'}}
                          >
                        {/* {formatNumber(instChild?.highest_outstanding_balance_last_12_months?.credit_grant_amount.toString())} */}
                        <Input format type="number" value={cic?.cic_information_detail?.cic_credit?.highest_outstanding_balance_last_12_months?.credit_grant_amount?.toString()} 
                            onDebounce={handleChangeCardInstitution({
                            cic: cic.uuid,
                            field: 'credit_grant_amount'
                          })}
                          disabled={ruleDisabled}
                        />
                      </TableCell>
                      <TableCell className="font-bold" align="left" scope="row" colSpan={4}>Nghĩa vụ thẻ tín dụng&nbsp;
                        <span style={{ fontWeight: 400 }}>(VND)</span>
                      </TableCell>
                      <TableCell align="left" className={clsx(classes.inputTextAlignEnd, 'mscb-input-table px-2')} >
                        <Input 
                          format 
                          type="number" 
                          value={cic?.cic_information_detail?.cic_credit?.credit_card_obligations?.toString() ?? '0'} 
                          onDebounce={handleChangeCardInstitution({
                            cic: cic.uuid,
                            field: 'credit_card_obligations'
                          })}
                          disabled={ruleDisabled}
                        />
                      </TableCell>
                      <TableCell align="left" scope="row" colSpan={2}></TableCell>
                    </TableRow>
                    <TableRow className="mscb-table-row-title">
                      <TableCell className="font-bold" align="left" scope="row" colSpan={4}>Ghi chú&nbsp;
                        <span style={{ fontWeight: 400, textTransform: 'lowercase' }}>
                          (cách tính theo hạn mức và dư nợ)
                        </span>
                      </TableCell>
                      <TableCell align="left" scope="row" colSpan={3} className="mscb-input-table px-2">
                        <Input 
                          value={cic?.cic_information_detail?.cic_credit.note} 
                          disabled={ruleDisabled}
                          onDebounce={handleChangeCardInstitution({
                            cic: cic.uuid,
                            field: 'note'
                          })}/>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                }
                {/* Summary */}
              </TableBody>
            </TableSticky>
            <Grid item xl={12} md={12} xs={12}>
              <CreditScoreInfo 
                disabled
                data={cic.credit_score_infor.risk_info}
                titleCard={`Rủi ro tín dụng - ${getCifIfTypeName(cic.cic_information_name)} - ${cic.cic_information_code}`} 
               />
            </Grid>
          </Grid>
          ))
          
        }
        {/**D. Đánh giá */}
        <Grid item xl={12} md={12} xs={12}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography
              variant="h4"
              component="h4"
              className="font-bold text-upper mr-7"
              sx={{
                fontSize: '19px'
              }}
            >
              {`${intToAlphabet(personDetail?.cic_information.length ?? 0)} ĐÁNH GIÁ`}
            </Typography>
            {/* <Button variant="outlined" sx={{
              boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)',
              border: 'solid 0.5px #1825aa',
              textTransform: 'capitalize'
            }}>Export file (.PDF)
            </Button> */}
          </Box>
          <CardInside
            title="I. Nội dung"
            classBody="h-full p-6"
            // sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <Grid container spacing={3}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Radio
                  ref={checkboxRef}
                  disabled={ruleDisabled}
                  onChange={handleChangeEvaluateHistory}
                  label="1. Lịch sử quan hệ tín dụng thỏa quy định sản phẩm"
                  options={[{ value: 'true', label: 'Có', checked: personDetail?.evaluate.history_credit_relation_satisfy_product_rules === 'true' },
                  { value: 'false', label: 'Không', checked: personDetail?.evaluate.history_credit_relation_satisfy_product_rules === 'false' }]}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="pt-0">
                {personDetail?.evaluate?.created_by && <Box sx={{
                  fontSize: 12,
                  display: 'flex',
                  position: 'absolute',
                  right: '25px',
                  '& span': {
                    color: 'var(--mscb-primary)!important',
                  }
                }}>
                  <em>Cập nhật: &nbsp;<span>{`${personDetail?.evaluate.created_by ?? ''} - ${personDetail?.evaluate.created_at ? timestampToDate(personDetail?.evaluate.created_at ?? 0, "HH:mm - DD/MM/YYYY"): ''}`}</span></em>
                </Box>}
                <TextArea label="Ghi chú" placeholder="Nhập nội dung" value={personDetail?.evaluate.note} timeout={300} onDebounce={handleChangeEvaluateNote} disabled={ruleDisabled}/>
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </div >
    <ModalConfirm
        open={deleteAgreement !== null}
        onClose={onCloseDeleteAgreement}
        onConfirm={onConfirmDeleteAgreement}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá HĐTD này ?
        </Box>
        <Box className="text-center">
          Các thông tin của HĐTD này sẽ mất hoàn toàn!
        </Box>
      </ModalConfirm>
  </Fragment >
}
export default DetailTable