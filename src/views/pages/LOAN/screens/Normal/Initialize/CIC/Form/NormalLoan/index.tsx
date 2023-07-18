import { Box, Divider, Grid, Typography } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalCICMessage from "app/hooks/useNormalCICMessage";
import useNotify from "app/hooks/useNotify";
import clsx from "clsx";
import { deleteCreditDetailCIC, setActiveTerm, setCICDetailLoanInfo, setCICValidate, setLOANNormalDate } from "features/loan/normal/storage/cic/actions";
import { getActiveLOANTerm, getActiveOrgan, getCreditLoanData, getDeclareActive, getLOANCICDetails, getLOANNormalCredit, getLOANNormalStorageCICIdentityActive, getLOANNormalStorageCICPosition, getValidateLOANNormalStorageCIC } from "features/loan/normal/storage/cic/selectors";
import { generateTypeParams } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, FocusEvent, useEffect, useState } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalCreditDetailDeleteInfo, ILOANNormalStorageCICCreditDetailGroup, ILOANNormalStorageCICOrgan, ILOANNormalStorageCICOrganData, ILOANNormalStorageCICOther, ILOANNormalStorageIdentityData } from "types/models/loan/normal/storage/CIC";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Numberbox from "views/components/base/Numberbox";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";
import ModalAlert from "views/components/layout/ModalAlert";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, { ObjectListOption } from "views/components/layout/ObjectList";
import NormalLoanStyle from "./style";


export interface NormalLoanProps {
}

const NormalLoan: FC<NormalLoanProps> = (props) => {
  const classes = NormalLoanStyle();
  const cardInLineClasses = clsx(classes.root, "h-full");
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  const termSelectClasses = clsx(classes.termSelect);
  const [deleteCreditLoanInfo, setDeleteCreditLoanInfo] = useState<ILOANNormalCreditDetailDeleteInfo | null>(null);
  const [validMinValue, setValidMinValue] = useState(true)
  const { TypeTermLoan, EnvGlobal, register } = useMasterData();
    
  useEffect(() => {
    register('typeTermLoan')
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getMessage =  useNormalCICMessage();
  const ruleDisabled = useSelector(getRuleDisbled);
  const notify = useNotify();
  const validateCIC = useSelector(getValidateLOANNormalStorageCIC)
  const dispatch = useDispatch();
  const activeLoanTerm = useSelector(getActiveLOANTerm);
  const [currentPos, setCurrentPos] = useState<number>(0);
  const params = useParams() as unknown as ILOANURLParams;
  const isDisableForm = !useSelector(getCreditLoanData(params.organ as keyof ILOANNormalStorageCICOther, params.declare?.toString() ?? 'borrower'))?.length;

  //handle maximun render date
  const organActive = useSelector(getActiveOrgan());
  const declareActive = useSelector(getDeclareActive());

  const organ = params.organ as keyof ILOANNormalStorageCICOther;
  const declare =
    (params.declare as keyof ILOANNormalStorageCICOrganData) ?? "borrower";

  const position = useSelector(
    getLOANNormalStorageCICPosition(organ, declare.toString())
  );
  const identity = useSelector(
    getLOANNormalStorageCICIdentityActive(organ, declare)
  );

  const LOANDetailInfo = useSelector(getLOANCICDetails());
  const tempOptions: ObjectListOption[] = TypeTermLoan.map((loan) => ({
    label: loan.name,
    circle: <FaHandHoldingUsd />,
  }));

  const CurrentCreditGroup = useSelector(
    getLOANNormalCredit()
  );

  const handleChangeTerm = (current: number) => {
    // setTimeout(() => {
      setCurrentPos(current);
      dispatch(setActiveTerm(TypeTermLoan[current].code, 'loan'));
    // }, 400)
  }

  // const handleChangeInfo = (value: string | number | null, key: string, typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup) => {
  //   value?.toString().length && dispatch(setAmountDateInfo(value, { key, typeLoan }));
  // }

  const creditUUIDActive = CurrentCreditGroup?.activeCredit;

  const setCreditLoanNormal = (value: string, position : {
    key: string, 
    typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup,
    organ: keyof ILOANNormalStorageCICOther,
    declare: keyof ILOANNormalStorageCICOrgan,
    personUuid: string,
    identityUuid: string,
    creditUuid: string,
    loanActive: string,
  }) => {
    if(position.key === "note"){
      dispatch(setCICDetailLoanInfo(value, position));
    }
    else {
      dispatch(setCICDetailLoanInfo(Number(value), position));
    }
    // if(key === 'balance'){
    //   const Total = CurrentCreditGroup?.credit
    //   ?.find(x => x.uuid === creditUUIDActive)?.detail.loan.list
    //   ?.map((l) => l.balance ?? 0)
    //   .reduce((a, b) => Number(a) + Number(b), 0) ?? 0;

    //   dispatch(setAmountDateInfo(Total, { key: "total_amount", typeLoan: "loan" }));
    // }
  }
  const checkExistData = () => {
    const active = CurrentCreditGroup?.credit.find(cre => cre.uuid === CurrentCreditGroup.activeCredit)?.detail?.loan?.active ?? "";
    const current = CurrentCreditGroup?.credit.find(cre => cre.uuid === CurrentCreditGroup.activeCredit)?.detail?.loan.list.find(detail => detail.code === active)

    if(current){
      return current.amount !== null || current.balance !== null || current.expired !== null
    }

    return false
  } 

  useEffect(() => {
    if (!!activeLoanTerm) {
      setCurrentPos(TypeTermLoan?.findIndex(term => term.code === activeLoanTerm))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLoanTerm])
  
  const handleChangeDate = (val: number | null) => {
    dispatch(setLOANNormalDate(val ?? null))
  }

  const countCreditDetail = (credit?: ILOANNormalStorageIdentityData) => {
    const cardCount = credit?.detail?.card?.list?.length ?? 0
    const loanCount = credit?.detail?.loan?.list?.reduce((pre, cur) => {
      return pre + ((cur.amount !== null || cur.balance !== null || cur.expired !== null || cur.uuid !== null) ? 1 : 0)
    },0) ?? 0
    return cardCount + loanCount
  } 
  const dataPosition = generateTypeParams(`cic/${organActive}/${declareActive}`) ?? ""

  const handleOpenDeleteCreditDetail = () => {
    setDeleteCreditLoanInfo({
      organ: organActive, 
      declare: declareActive,
      personUuid : position,
      identityNum: identity,
      creditUuid: creditUUIDActive ?? "",
      creditId: CurrentCreditGroup?.credit.find(cre => cre.uuid === CurrentCreditGroup.activeCredit)?.id ?? null,
      type: 'loan',
      detailUuid: LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.uuid ?? null,
      index: LOANDetailInfo?.loan.list.findIndex(e => e.code === LOANDetailInfo.loan.active) ?? 0,
      position: dataPosition
    })
  };

  const onHandleConfirmDelete = () => {
    if(countCreditDetail(CurrentCreditGroup?.credit?.find((x) => x.uuid === creditUUIDActive)) > 1){
      if(deleteCreditLoanInfo){
        dispatch(deleteCreditDetailCIC("", deleteCreditLoanInfo));
      }
      setDeleteCreditLoanInfo(null)
    }
    else {
      notify("Bắt buộc tồn tại ít nhất 1 khoản vay", "error")
      setDeleteCreditLoanInfo(null)
    }
  };
  const creditLimit = EnvGlobal.find(e => e.code === "VALUE_CHECK_CREDIT_LIMIT")?.value ?? "0"
  
  const handleValidateMinValue = (field: string) => (event: FocusEvent<HTMLInputElement>) => {
    let valueInputed = Number(event.target.value.replaceAll(".", ""))
    if(valueInputed  < Number(creditLimit) && valueInputed > 0){
      // notify("Giá trị nhập liệu không hợp lệ", "error")
      setValidMinValue(false)
      if(validMinValue){
        event.target.focus()
      }
      dispatch(setCICValidate({
        valid: false,
        role: "minValue",
        field: field,
        identity: identity ?? '',
        credit: CurrentCreditGroup?.activeCredit ?? '',
        loan: activeLoanTerm ?? "",
        organ: organActive,
        declare: declareActive as keyof ILOANNormalStorageCICOrgan,
        position: position ,
      }))
    }
    else {
      if(validateCIC.role === "minValue"){
        dispatch(setCICValidate({valid: true}))
      }
    }
  }

  const handleCloseAlert = () => {
    setValidMinValue(true)
  }

  return <>
    <Grid container className={cardInLineClasses}>
      <Grid item xl={12} style={{ height: '65px' }}>
        <Typography className={clsx(classes.headerTitleCard, 'font-medium text-14 mb-2')}>
          A. Tổng dư nợ vay thông thường
        </Typography>
        <Input
          className={classes.inputTotal}
          format
          type='number'
          disabled
          value={CurrentCreditGroup?.credit?.find((x) => x.uuid === creditUUIDActive)?.detail.loan.total_amount?.toString() ?? '0'}
          // onChange={(value) => handleChangeInfo(value, 'total_amount', 'loan')} 
        />
      </Grid>
      <Grid item xl={12} style={{ height: 'calc(100% - 65px)' }}>
        <CardInside title="Vay thông thường" className={classes.cardInside}>
          <Grid container className={clsx(gridContainerClasses, 'pt-6')} >
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabelLastUpdateDate}>
              <span>
                {`Lần cuối: ${organActive === params.organ ? (LOANDetailInfo?.loan.date ? timestampToDate(Number(LOANDetailInfo?.loan.date) / 1000) : `-`) : `-`}`}
              </span>
              <InputDate
                className={classes.inputLabel}
                label="I. Ngày cập nhật CIC"
                value={(organActive === params.organ && declareActive === params.declare) ? (Number(LOANDetailInfo?.loan.date) ?? 0): 0}
                onChange={(value) => handleChangeDate(value)}
                disabled={isDisableForm || ruleDisabled}
                message={getMessage('loanDate', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                })}
              />
            </Grid>
          </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>
          <Grid container className={gridContainerClasses}>
            {/* LoanTerm II */}
            <Grid item lg={12} md={12} sm={12} xs={12} className={`${classes.inputLabel} flex justify-between`}>
              <label className={classes.inputLabel}>II. Chọn khoản vay</label>
              <div
                className="flex-center"
                onClick={!isDisableForm && !ruleDisabled && checkExistData() ? handleOpenDeleteCreditDetail : undefined}
                style={{ cursor: "pointer" }}
              >
                <FiTrash2 style={{ fontSize: 15, color: "#f61f1f" , marginRight: 5}}/>
                <span style={{ color: "#f61f1f", fontSize: 13 }}>
                  Xóa dữ liệu
                </span>
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.infoBadge}>
              <ObjectList
                className={ termSelectClasses }
                enableLength={false}
                enableAdd={false}
                options={tempOptions}
                enableMenu={false}
                onChange={handleChangeTerm}
                // current={currentPos}
                current={ !!~currentPos ? currentPos : 0 }
                isDisable={isDisableForm}
                // enableDelete={active}
                // onDelete={(val) => onHandleOpenConfirmCer(val)}
              />
            </Grid>
            <Grid container columnSpacing='20px'>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Numberbox
                integer
                comma
                label="1. Thời hạn cấp tín dụng (tháng)"
                className={classes.inputLabel}
                type="number"
                timeout={500}
                onDebounce={(value) => setCreditLoanNormal(value, {
                  key: 'expired', 
                  typeLoan: 'loan',
                  organ:organActive,
                  declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                  personUuid: position,
                  identityUuid: identity,
                  creditUuid: creditUUIDActive ?? "",
                  loanActive: activeLoanTerm ?? ""
                })}
                disabled={isDisableForm || ruleDisabled}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.expired?.toString() ?? ''}
                message={getMessage('expired', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  loan: activeLoanTerm ?? ""
                })}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Numberbox
                integer
                comma
                label="2. Số tiền CTD thực tế (VND)"
                className={classes.inputLabel}
                onBlur={handleValidateMinValue('amount')}
                // disabled={!CurrentCreditIdState.length}
                timeout={500}
                type="number"
                format={true}
                disabled={isDisableForm || ruleDisabled}
                onDebounce={(value) => setCreditLoanNormal(
                  value, {
                  key: 'amount', 
                  typeLoan: 'loan',
                  organ:organActive,
                  declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                  personUuid: position,
                  identityUuid: identity,
                  creditUuid: creditUUIDActive ?? "",
                  loanActive: activeLoanTerm ?? ""
                })}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.amount?.toString() ?? ''}
                message={getMessage('amount', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  loan: activeLoanTerm ?? ""
                })}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Numberbox
                integer
                comma
                label="3. Dư nợ thực tế (VND)"
                onBlur={handleValidateMinValue('balanceLoan')}
                className={classes.inputLabel}
                timeout={500}
                type="number"
                format={true}
                disabled={isDisableForm || ruleDisabled}
                onDebounce={(value) => setCreditLoanNormal(
                  value, 
                  {
                    key: 'balance', 
                    typeLoan: 'loan',
                    organ:organActive,
                    declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                    personUuid: position,
                    identityUuid: identity,
                    creditUuid: creditUUIDActive ?? "",
                    loanActive: activeLoanTerm ?? ""
                  })}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.balance?.toString() ?? ''}
                message={getMessage('balanceLoan', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  loan: activeLoanTerm ?? ""
                })}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Numberbox
                integer
                comma
                label="4. Số tiền CTD theo CIC (VND)"
                onBlur={handleValidateMinValue('amountCIC')}
                className={classes.inputLabel}
                // disabled={!CurrentCreditIdState.length}
                timeout={500}
                type="number"
                format={true}
                disabled={isDisableForm || ruleDisabled}
                onDebounce={(value) => setCreditLoanNormal(
                  value, {
                  key: 'amountCIC', 
                  typeLoan: 'loan',
                  organ:organActive,
                  declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                  personUuid: position,
                  identityUuid: identity,
                  creditUuid: creditUUIDActive ?? "",
                  loanActive: activeLoanTerm ?? ""
                })}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.amountCIC?.toString() ?? ''}
                message={getMessage('amountCIC', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  loan: activeLoanTerm ?? ""
                })}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Numberbox
                integer
                comma
                onBlur={handleValidateMinValue('balanceCICLoan')}
                label="5. Dư nợ theo CIC (VND)"
                className={classes.inputLabel}
                timeout={500}
                type="number"
                format={true}
                disabled={isDisableForm || ruleDisabled}
                onDebounce={(value) => setCreditLoanNormal(
                  value, 
                  {
                    key: 'balanceCIC', 
                    typeLoan: 'loan',
                    organ:organActive,
                    declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                    personUuid: position,
                    identityUuid: identity,
                    creditUuid: creditUUIDActive ?? "",
                    loanActive: activeLoanTerm ?? ""
                  })}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.balanceCIC?.toString() ?? ''}
                // ref={refBalance}
                message={getMessage('balanceCICLoan', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  loan: activeLoanTerm ?? ""
                })}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="6. Ghi chú"
                className={clsx(classes.inputLabel, classes.textArea)}
                maxlength={255}
                disabled={isDisableForm || ruleDisabled}
                onDebounce={(value) => setCreditLoanNormal(
                  value, 
                  {
                    key: 'note', 
                    typeLoan: 'loan',
                    organ:organActive,
                    declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                    personUuid: position,
                    identityUuid: identity,
                    creditUuid: creditUUIDActive ?? "",
                    loanActive: activeLoanTerm ?? ""
                  })}
                value={LOANDetailInfo?.loan.list?.find(x => x.code === activeLoanTerm)?.note ?? ''}
                // ref={refBalance}
                // message={getMessage('note', {
                //   identity: identity ?? '',
                //   credit: CurrentCreditGroup?.activeCredit ?? '',
                //   loan: activeLoanTerm ?? ""
                // })}
              />
            </Grid>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
    <ModalAlert 
      open={!validMinValue} 
      onClose={handleCloseAlert}
      message="Giá trị nhập liệu không hợp lệ"
    />
    <ModalConfirm
      open={deleteCreditLoanInfo !== null}
      onClose={() => setDeleteCreditLoanInfo(null)}
      onConfirm={onHandleConfirmDelete}
    >
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa khoản vay này?
      </Box>
    </ModalConfirm>
  </>

}
export default NormalLoan;
