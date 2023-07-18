import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMasterData from 'app/hooks/useMasterData';
import useNormalCICMessage from 'app/hooks/useNormalCICMessage';
import clsx from 'clsx';
import {
  addCICCreditCollateral,
  deleteCreditDetailCIC,
  setActiveTerm, setCICCollateralCode, setCICDetailLoanInfo,
  setCICValidate,
  setLOANCollateralDate
} from 'features/loan/normal/storage/cic/actions';
import {
  getActiveCollateral,
  getActiveOrgan,
  getCreditLoanData,
  getDeclareActive,
  getListExistData,
  getLOANCICDetails,
  getLOANNormalCredit,
  getLOANNormalStorageCICIdentityActive,
  getLOANNormalStorageCICPosition,
  getValidateLOANNormalStorageCIC
} from 'features/loan/normal/storage/cic/selectors';
import { generateTypeParams } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, FocusEvent, useEffect, useState } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  ILOANNormalCreditDetailDeleteInfo,
  ILOANNormalStorageCICCreditDetailGroup,
  ILOANNormalStorageCICOrgan,
  ILOANNormalStorageCICOrganData,
  ILOANNormalStorageCICOther
} from 'types/models/loan/normal/storage/CIC';
import { timestampToDate } from 'utils/date';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import Numberbox from 'views/components/base/Numberbox';
import CardInside from 'views/components/layout/CardInside';
import ModalAlert from 'views/components/layout/ModalAlert';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import SelectCollateralType from 'views/components/widgets/SelectCollateralType';
import collaretalInfoStyle from './style';

const CollaretalInfo: FC = () => {

  const classes = collaretalInfoStyle();
  const cardInLineClasses = clsx(classes.root, "h-full");
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled);
  const activeCollateral = useSelector(getActiveCollateral());
  const LOANDetailInfo = useSelector(getLOANCICDetails());
  const params = useParams() as unknown as ILOANURLParams;
  //handle maximun render date
  const organActive = useSelector(getActiveOrgan());
  const declareActive = useSelector(getDeclareActive());
  const [validMinValue, setValidMinValue] = useState(true)

  const isDisableForm = !useSelector(getCreditLoanData(params.organ as keyof ILOANNormalStorageCICOther, params.declare?.toString() ?? 'borrower'))?.length;
  const isNOTExistList = !useSelector(getListExistData('collateral'))?.length;
  const { EnvGlobal, register } = useMasterData();
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
  const [deleteCreditCollateralInfo, setDeleteCreditCollateralInfo] = useState<ILOANNormalCreditDetailDeleteInfo | null>(null);

  const [currentPos, setCurrentPos] = useState<number>(0);

  const [active, setActice] = useState(false);

  const handleActive = () => {
    setActice(!active);
  }

  const collateralPosition = LOANDetailInfo?.collateral.list.findIndex(
    (c) => c.uuid === LOANDetailInfo.collateral.active
  ) ?? 0;

  const handleAdd = () => {
    // setTimeout(() => {
      dispatch(addCICCreditCollateral());
      setCurrentPos(LOANDetailInfo?.collateral.list.length ?? 0)
    // }, 400)
  }

  const handleChangeCollateral = (current: number) => {
    // setTimeout(() => {
      setCurrentPos(current);
      dispatch(setActiveTerm(LOANDetailInfo?.collateral.list[current]?.uuid ?? '', 'collateral'));
    // }, 400)
  }

  const tempOptions: ObjectListOption[] = LOANDetailInfo?.collateral.list.map((loan, i) => ({
    label: 'Tài sản ' + (i + 1),
    circle: <FaHandHoldingUsd />,
  })) ?? [];


  const handleChangeCollateralCode = (value: string, key: string, typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup) => {
    dispatch(setCICCollateralCode(value, { key, typeLoan }));
  }
  // const handleChangeInfo = (value: string | number | null, key: string, typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup) => {
  //   value?.toString().length && dispatch(setAmountDateInfo(value, { key, typeLoan }));
  // }

  const CurrentCreditGroup = useSelector(
    getLOANNormalCredit()
  );

  const creditUUIDActive = CurrentCreditGroup?.activeCredit;
  
  const handleChangeDetails = (value: string | number, position : {
    key: string, 
    typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup,
    organ: keyof ILOANNormalStorageCICOther,
    declare: keyof ILOANNormalStorageCICOrgan,
    personUuid: string,
    identityUuid: string,
    creditUuid: string,
    collateralActive: string,
  }) => {
    dispatch(setCICDetailLoanInfo(Number(value), position));
  }

  const handleChangeDate = (val: number | null) => {
    dispatch(setLOANCollateralDate(val ?? null))
  }
  const dataPosition = generateTypeParams(`cic/${organActive}/${declareActive}`) ?? ""

  const handleOpenDeleteCreditDetail = (val: number) => {
    setCurrentPos(val);
    dispatch(setActiveTerm(LOANDetailInfo?.collateral.list[val]?.uuid ?? "", "collateral"));
    
    setDeleteCreditCollateralInfo({
      organ: organActive, 
      declare: declareActive,
      personUuid : position,
      identityNum: identity,
      creditUuid: creditUUIDActive ?? "",
      creditId: CurrentCreditGroup?.credit.find(cre => cre.uuid === CurrentCreditGroup.activeCredit)?.id ?? null,
      type: 'collateral',
      detailUuid: LOANDetailInfo?.collateral.list[val]?.uuid ?? null,
      index: val,
      position: dataPosition
    })
  };

  const onHandleConfirmDelete = () => {
    if(deleteCreditCollateralInfo){
      dispatch(deleteCreditDetailCIC("card", deleteCreditCollateralInfo));
    }
    setDeleteCreditCollateralInfo(null)
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
        collateral: activeCollateral ?? "",
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
        <Typography className={clsx(classes.headerTitleCard, "font-medium text-14 mb-2")}>
          C. Tổng giá trị tài sản bảo đảm
        </Typography>
        <Input
          className={classes.inputTotal}
          format
          type='number'
          disabled
          value={CurrentCreditGroup?.credit?.find((x) => x.uuid === creditUUIDActive)?.detail.collateral.total_amount?.toString() ?? '0'}
          // onChange={(value) => handleChangeInfo(value, 'total_amount', 'collateral')}
        />
      </Grid>
      {/* <Grid item xl={12}>
      </Grid> */}
      <Grid item xl={12} md={12} xs={12} style={{ height: 'calc(100% - 65px)' }}>
        <CardInside title="Tài sản bảo đảm" className={classes.cardInside}>
          <Grid container className={clsx(gridContainerClasses, 'pt-6')}>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabelLastUpdateDate}>
              <span>
                {`Lần cuối: ${organActive === params.organ ? (LOANDetailInfo?.collateral.date ? timestampToDate(Number(LOANDetailInfo?.collateral.date) / 1000) : `-`) : `-`}`}
              </span>
              <InputDate
                className={classes.inputLabel}
                label='I. Ngày cập nhật CIC'
                value={(organActive === params.organ && declareActive === params.declare) ? (Number(LOANDetailInfo?.collateral.date) ?? 0) : 0}
                disabled={isDisableForm || isNOTExistList || ruleDisabled}
                onChange={(value) => handleChangeDate(value)}
                message={getMessage('collateralDate', {
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
              <label className={classes.inputLabel}>II. Chọn tài sản</label>
              <div className='flex-center' onClick={handleActive} style={{ cursor: 'pointer' }}>
                {
                  active ? (
                    <>
                      <CheckCircleOutlineIcon style={{ fontSize: 18, color: '#1a9b06', marginRight : 5 }} />
                      <span style={{ color: '#1a9b06', fontSize: 13 }}>Lưu</span>
                    </>
                  ) : (
                    <>
                      <FiTrash2 style={{ fontSize: 15, color: '#f61f1f' , marginRight: 5}} />
                      <span style={{ color: '#f61f1f', fontSize: 13 }}>Xóa</span>
                    </>
                  )
                }
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <ObjectList
                options={tempOptions}
                className={clsx(classes.collaretalObjList, isDisableForm && classes.addObjectDisabled, 'mt-3 mb-6')}
                enableLength={false}
                enableMenu={false}
                enableAdd={!ruleDisabled}
                onAdd={handleAdd}
                enableDelete={active && !ruleDisabled}
                current={!!~collateralPosition ? collateralPosition : 0}
                isDisable={isDisableForm}
                onChange={handleChangeCollateral}
                onDelete={!isDisableForm && !ruleDisabled ? (val) => handleOpenDeleteCreditDetail(val) : undefined}
              />
            </Grid>
            <Grid container columnSpacing='20px'>
            <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
              <SelectCollateralType label="1. Tên loại TSBĐ"
                value={LOANDetailInfo?.collateral.list?.find(x => x.uuid === activeCollateral)?.code?.toString() ?? ''}
                disabled={isDisableForm || isNOTExistList || ruleDisabled}
                onChange={(value) => handleChangeCollateralCode(value, 'code', 'collateral')}
                message={getMessage('code', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  collateral: LOANDetailInfo?.collateral?.active ?? ""
                })}
              />
            </Grid>
            <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
              <Numberbox
                integer
                comma
                label="2. Giá trị TSBĐ (VND)" 
                type="number"
                format
                //onBlur={handleValidateMinValue("value")}
                value={LOANDetailInfo?.collateral.list?.find(x => x.uuid === activeCollateral)?.value?.toString() ?? ''}
                onDebounce={(value) => handleChangeDetails(
                  value, {
                    key: 'value', 
                    typeLoan: 'collateral',
                    organ:organActive,
                    declare: declareActive as keyof ILOANNormalStorageCICOrgan,
                    personUuid: position,
                    identityUuid: identity,
                    creditUuid: creditUUIDActive ?? "",
                    collateralActive: activeCollateral ?? ""
                  })}
                disabled={isDisableForm || isNOTExistList || ruleDisabled}
                // ref={refBalance}
                message={getMessage('value', {
                  identity: identity ?? '',
                  credit: CurrentCreditGroup?.activeCredit ?? '',
                  collateral: activeCollateral ?? ""
                })}
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
        open={deleteCreditCollateralInfo !== null} 
        onClose={() => setDeleteCreditCollateralInfo(null)}
        onConfirm={onHandleConfirmDelete}>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa TSBĐ?
      </Box>
    </ModalConfirm>
  </>
}

export default CollaretalInfo