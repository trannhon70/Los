import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Divider, Grid, Typography } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalCICMessage from "app/hooks/useNormalCICMessage";
import useNotify from "app/hooks/useNotify";
import clsx from "clsx";
import {
  addCICCreditCard, deleteCreditDetailCIC, setActiveTerm, setCICDetailLoanInfo,
  setCICValidate,
  setLOANCardDate
} from "features/loan/normal/storage/cic/actions";
import {
  getActiveCardUUID,
  getActiveOrgan,
  getCreditLoanData,
  getDeclareActive,
  getListExistData,
  getLOANCICDetails,
  getLOANNormalCredit,
  getLOANNormalStorageCICIdentityActive,
  getLOANNormalStorageCICPosition,
  getValidateLOANNormalStorageCIC
} from "features/loan/normal/storage/cic/selectors";
import { generateTypeParams } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, FocusEvent, useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  ILOANNormalCreditDetailDeleteInfo, ILOANNormalStorageCICCreditDetailGroup,
  ILOANNormalStorageCICOrgan,
  ILOANNormalStorageCICOrganData,
  ILOANNormalStorageCICOther,
  ILOANNormalStorageIdentityData
} from "types/models/loan/normal/storage/CIC";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Numberbox from "views/components/base/Numberbox";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";
import ModalAlert from "views/components/layout/ModalAlert";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListOption
} from "views/components/layout/ObjectList";
import CreditCardStyle from "./style";

export interface CreditCardProps {}

const CreditCard: FC = (props) => {
  const classes = CreditCardStyle();
  const cardInLineClasses = clsx(classes.root);
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  const amountTitleClasses = clsx(classes.amountTitle);
  const [deleteCreditCardInfo, setDeleteCreditCardInfo] = useState<ILOANNormalCreditDetailDeleteInfo | null>(null);
  const [active, setActice] = useState(false);
  const [validMinValue, setValidMinValue] = useState(true)

  const handleActive = () => {
    setActice(!active);
  };
  const { EnvGlobal, register } = useMasterData();
  
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const notify = useNotify();
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled);
  const LOANDetailInfo = useSelector(getLOANCICDetails());
  const activeCard = useSelector(getActiveCardUUID());
  const params = useParams() as unknown as ILOANURLParams;
  //handle maximun render date
  const organActive = useSelector(getActiveOrgan());
  const declareActive = useSelector(getDeclareActive());
  const validateCIC = useSelector(getValidateLOANNormalStorageCIC)

  const getMessage =  useNormalCICMessage();
  const organ = params.organ as keyof ILOANNormalStorageCICOther;
  const declare =
    (params.declare as keyof ILOANNormalStorageCICOrganData) ?? "borrower";

  const position = useSelector(
    getLOANNormalStorageCICPosition(organ, declare.toString())
  );
  const identity = useSelector(
    getLOANNormalStorageCICIdentityActive(organ, declare)
  );

  const isDisableForm = !useSelector(
    getCreditLoanData(
      params.organ as keyof ILOANNormalStorageCICOther,
      params.declare?.toString() ?? "borrower"
    )
  )?.length;
  const isNOTExistList = !useSelector(getListExistData("card"))?.length;

  const [currentPos, setCurrentPos] = useState<number>(0);
  // const refBalance = useRef<InputRef>(null);

  const tempOptions: ObjectListOption[] =
    LOANDetailInfo?.card.list.map((loan, i) => ({
      label: "Thẻ TD " + (i + 1),
      circle: <FaCreditCard />,
    })) ?? [];

  const handleAdd = () => {
    // setTimeout(() => {
      dispatch(addCICCreditCard());
      setCurrentPos(LOANDetailInfo?.card.list.length ?? 0);
    // }, 400)
  };

  const handleChangeCard = (current: number) => {
    // setTimeout(() => {
      setCurrentPos(current);
      dispatch(setActiveTerm(LOANDetailInfo?.card.list[current]?.uuid ?? "", "card"));
    // }, 400)
  };


  // const handleChangeInfo = (value: string | number | null, key: string, typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup) => {
  //   value?.toString().length &&
  //     dispatch(setAmountDateInfo(value, { key, typeLoan }));
  // };

  const CurrentCreditGroup = useSelector(getLOANNormalCredit());
  
  const creditUUIDActive = CurrentCreditGroup?.activeCredit;
  
  const countCreditDetail = (credit?: ILOANNormalStorageIdentityData) => {
    const cardCount = credit?.detail?.card?.list?.length ?? 0
    const loanCount = credit?.detail?.loan?.list?.reduce((pre, cur) => {
      return pre + ((cur.amount !== null || cur.balance !== null || cur.expired !== null || cur.uuid !== null) ? 1 : 0)
    },0) ?? 0
    return cardCount + loanCount
  } 

  const handleChangeDate = (val: number | null) => {
    dispatch(setLOANCardDate(val ?? null));
  };

  const handleChangeDetails = (value:  string | number | null, position : {
    key: string, 
    typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup,
    organ: keyof ILOANNormalStorageCICOther,
    declare: keyof ILOANNormalStorageCICOrgan,
    personUuid: string,
    identityUuid: string,
    creditUuid: string,
    cardActive: string,
  }) => {
    if(position.key === "note"){
      dispatch(setCICDetailLoanInfo(value, position));
    }
    else {
      dispatch(setCICDetailLoanInfo(Number(value), position));
    }
  }

  const cardPosition = LOANDetailInfo?.card.list.findIndex(
    (c) => c.uuid === LOANDetailInfo.card.active
  ) ?? 0;

  const dataPosition = generateTypeParams(`cic/${organActive}/${declareActive}`) ?? ""

  const handleOpenDeleteCreditDetail = (val: number) => {
    setCurrentPos(val);
    dispatch(setActiveTerm(LOANDetailInfo?.card.list[val]?.uuid ?? "", "card"));
    
    setDeleteCreditCardInfo({
      organ: organActive, 
      declare: declareActive,
      personUuid : position,
      identityNum: identity,
      creditUuid: creditUUIDActive ?? "",
      creditId: CurrentCreditGroup?.credit.find(cre => cre.uuid === CurrentCreditGroup.activeCredit)?.id ?? null,
      type: 'card',
      detailUuid: LOANDetailInfo?.card.list[val]?.uuid ?? null,
      index: val,
      position: dataPosition
    })  
  };


  const onHandleConfirmDelete = () => {
    if(countCreditDetail(CurrentCreditGroup?.credit?.find((x) => x.uuid === creditUUIDActive)) > 1){
      if(deleteCreditCardInfo){
        dispatch(deleteCreditDetailCIC("card", deleteCreditCardInfo));
      }
      setDeleteCreditCardInfo(null)
    }
    else {
      notify("Bắt buộc tồn tại ít nhất 1 khoản vay", "error")
      setDeleteCreditCardInfo(null)
    }
  };
  
  const creditLimit = EnvGlobal.find(e => e.code === "VALUE_CHECK_CREDIT_LIMIT")?.value ?? "0"

  const handleValidateMinValue = (field: string) => (event: FocusEvent<HTMLInputElement>) => {
    let valueInputed = Number(event.target.value.replaceAll(".", ""))

    if(valueInputed < Number(creditLimit) && valueInputed > 0){
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
        card: activeCard ?? "",
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

  return (
    <>
      <Grid container className={cardInLineClasses}>
        <Grid item xl={12} style={{ height: '65px' }}>
          <Typography
            className={clsx(classes.headerTitleCard, "font-medium text-14 mb-2")}
          >
            B. Tổng dư nợ thẻ tín dụng
          </Typography>
          <Grid container>
            <Grid item xl={6} className={amountTitleClasses}>
              <Input
                format
                className={classes.inputTotal}
                disabled
                type="number"
                value={CurrentCreditGroup?.credit?.find((x) => x.uuid === creditUUIDActive)?.detail.card.total_amount?.toString() ?? '0'}
                // onChange={(value) => handleChangeInfo(value, "total_amount", "card")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12} style={{ height: 'calc(100% - 65px)' }}>
          <CardInside title="Thẻ tín dụng" className={classes.cardInsise}>
            <Grid container className={clsx(gridContainerClasses, 'pt-6')}>
              <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabelLastUpdateDate} >
                <span>
                  {`Lần cuối: ${
                    organActive === params.organ
                      ? LOANDetailInfo?.card.date
                        ? timestampToDate(
                            Number(LOANDetailInfo?.card.date) / 1000
                          )
                        : `-`
                      : `-`
                  }`}
                </span>
                <InputDate
                  className={classes.inputLabel}
                  label="I. Ngày cập nhật CIC"
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  value={
                    organActive === params.organ &&
                    declareActive === params.declare
                      ? Number(LOANDetailInfo?.card.date) ?? 0
                      : 0
                  }
                  onChange={(value) => handleChangeDate(value)}
                  message={getMessage('cardDate', {
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
              <Grid item lg={12} md={12} sm={12} xs={12} className={`${classes.inputLabel} flex justify-between`}>
                <label
                  className={classes.inputLabel}
                >II. Chọn thẻ tín dụng</label>
                <div
                  className="flex-center"
                  onClick={handleActive}
                  style={{ cursor: "pointer" }}
                >
                  {active ? (
                    <>
                      <CheckCircleOutlineIcon
                        style={{ fontSize: 18, color: "#1a9b06", marginRight : 5}}
                      />
                      <span style={{ color: "#1a9b06", fontSize: 13 }}>
                        Lưu
                      </span>
                    </>
                  ) : (
                    <>
                      <FiTrash2 style={{ fontSize: 15, color: "#f61f1f" , marginRight : 5}} />
                      <span style={{ color: "#f61f1f", fontSize: 13 }}>
                        Xóa
                      </span>
                    </>
                  )}
                </div>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.infoBadge}
              >
                <ObjectList
                  className={clsx(isDisableForm && classes.addObjectDisabled, 'mt-3 mb-6')}
                  enableLength={false}
                  enableAdd={!ruleDisabled}
                  options={tempOptions}
                  enableDelete={active && !ruleDisabled }
                  enableMenu={false}
                  onAdd={handleAdd}
                  onChange={handleChangeCard}
                  current={!!~cardPosition ? cardPosition : 0}
                  isDisable={isDisableForm}
                  onDelete={!isDisableForm && !ruleDisabled ? (val) => handleOpenDeleteCreditDetail(val) : undefined}
                />
              </Grid>
              <Grid container columnSpacing='20px'>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Numberbox
                  integer
                  comma
                  label="1. Hạn mức thẻ thực tế (VND)"
                  onBlur={handleValidateMinValue("limited")}
                  className={classes.inputLabel}
                  timeout={500}
                  type="number"
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  format={true}
                  value={
                    LOANDetailInfo?.card.list
                      ?.find((x) => x.uuid === activeCard)
                      ?.limited?.toString() ?? ""
                  }
                  onDebounce={(value) =>
                    handleChangeDetails(value, {
                      key: 'limited', 
                      typeLoan: 'card',
                      organ:organActive,
                      declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                      personUuid: position,
                      identityUuid: identity,
                      creditUuid: creditUUIDActive ?? "",
                      cardActive: activeCard ?? ""
                    })}
                  message={getMessage('limited', {
                    identity: identity ?? '',
                    credit: CurrentCreditGroup?.activeCredit ?? '',
                    card:  activeCard ?? ""
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Numberbox
                  integer
                  comma
                  label="2. Dư nợ thẻ thực tế (VND)"
                  onBlur={handleValidateMinValue("balanceCard")}
                  className={classes.inputLabel}
                  timeout={500}
                  type="number"
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  format={true}
                  value={
                    LOANDetailInfo?.card.list
                      ?.find((x) => x.uuid === activeCard)
                      ?.balance?.toString() ?? ""
                  }
                  onDebounce={(value) =>
                    handleChangeDetails(value, {
                      key: 'balance', 
                      typeLoan: 'card',
                      organ:organActive,
                      declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                      personUuid: position,
                      identityUuid: identity,
                      creditUuid: creditUUIDActive ?? "",
                      cardActive: activeCard ?? ""
                    })
                  }
                  // ref={refBalance}
                  message={getMessage('balanceCard', {
                    identity: identity ?? '',
                    credit: CurrentCreditGroup?.activeCredit ?? '',
                    card:  activeCard ?? ""
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Numberbox
                  integer
                  comma
                  label="3. Hạn mức thẻ theo CIC (VND)"
                  onBlur={handleValidateMinValue("limitedCIC")}
                  className={classes.inputLabel}
                  timeout={500}
                  type="number"
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  format={true}
                  value={
                    LOANDetailInfo?.card.list
                      ?.find((x) => x.uuid === activeCard)
                      ?.limitedCIC?.toString() ?? ""
                  }
                  onDebounce={(value) =>
                    handleChangeDetails(value, {
                      key: 'limitedCIC', 
                      typeLoan: 'card',
                      organ:organActive,
                      declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                      personUuid: position,
                      identityUuid: identity,
                      creditUuid: creditUUIDActive ?? "",
                      cardActive: activeCard ?? ""
                    })}
                  message={getMessage('limitedCIC', {
                    identity: identity ?? '',
                    credit: CurrentCreditGroup?.activeCredit ?? '',
                    card:  activeCard ?? ""
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Numberbox
                  integer
                  comma
                  label="4. Dư nợ thẻ theo CIC (VND)"
                  className={classes.inputLabel}
                  onBlur={handleValidateMinValue("balanceCICCard")}
                  timeout={500}
                  type="number"
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  format={true}
                  value={
                    LOANDetailInfo?.card.list
                      ?.find((x) => x.uuid === activeCard)
                      ?.balanceCIC?.toString() ?? ""
                  }
                  onDebounce={(value) =>
                    handleChangeDetails(value, {
                      key: 'balanceCIC', 
                      typeLoan: 'card',
                      organ:organActive,
                      declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                      personUuid: position,
                      identityUuid: identity,
                      creditUuid: creditUUIDActive ?? "",
                      cardActive: activeCard ?? ""
                    })
                  }
                  // ref={refBalance}
                  message={getMessage('balanceCICCard', {
                    identity: identity ?? '',
                    credit: CurrentCreditGroup?.activeCredit ?? '',
                    card:  activeCard ?? ""
                  })}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextArea
                  label="5. Ghi chú"
                  maxlength={255}
                  className={clsx(classes.inputLabel, classes.textArea)}
                  disabled={isDisableForm || isNOTExistList || ruleDisabled}
                  value={
                    LOANDetailInfo?.card.list
                      ?.find((x) => x.uuid === activeCard)
                      ?.note ?? ""
                  }
                  onDebounce={(value) =>
                    handleChangeDetails(value, {
                      key: 'note', 
                      typeLoan: 'card',
                      organ:organActive,
                      declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                      personUuid: position,
                      identityUuid: identity,
                      creditUuid: creditUUIDActive ?? "",
                      cardActive: activeCard ?? ""
                    })
                  }
                  // ref={refBalance}
                  // message={getMessage('balanceCICCard', {
                  //   identity: identity ?? '',
                  //   credit: CurrentCreditGroup?.activeCredit ?? '',
                  //   card:  activeCard ?? ""
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
        open={deleteCreditCardInfo !== null}
        onClose={() => setDeleteCreditCardInfo(null)}
        onConfirm={onHandleConfirmDelete}
      >

        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa thẻ tín dụng?
        </Box>
      </ModalConfirm>
    </>
  );
};
export default CreditCard;
