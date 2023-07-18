import { Box, Grid } from '@mui/material';
import { 
  addLandGcnQsh,
  deleteLandGcnQsh,
  setCollaretalAssessmentInfomation, 
  setUuidActiveLandGcnQsh 
} from 'features/loan/normal/storage/collateralV2/actions';
import { EActionMenu, ECheckType, ETypeLand } from 'features/loan/normal/storage/collateralV2/case';
import { 
  getLOANormalStoreColalteralLandAssessment,
  getLoanNormalSubTypeItemsActive, 
  getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex,
  getLOANormalStoreColalteralLandCTXDGcnQshData
} from 'features/loan/normal/storage/collateralV2/selector';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { MdHomeWork } from 'react-icons/md';
import { useDispatch,useSelector } from 'react-redux';
import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';
import HorizontalList from 'views/components/layout/HorizontalList';
import { ObjectListMenuItem, ObjectListOption } from 'views/components/layout/ObjectList';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface IActionTypeLand{
  currentType?: number;
  uuidActiveData?: string;
  uuIdSubType?: string;
}

const ActionTypeLand: FunctionComponent<IActionTypeLand> = (props) => {

  const { currentType = 0, uuidActiveData = "", uuIdSubType = "" } = props;
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled)
  const [currentTypeDefault , setCurrentTypeDefault] = useState<number>(currentType);

  useEffect(()=> {
    if (currentTypeDefault !== currentType){
      setCurrentTypeDefault(currentType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType])

  const checkBoxTypeInfoRef = useRef<CheckboxRef>(null);

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuidActiveData, uuIdSubType ?? ""))
  const dataItems = useSelector(getLOANormalStoreColalteralLandAssessment(uuidActiveData, uuIdSubType ?? '', SubTypeItemsActive ?? ''));
  const LandCTXDGcnQshCurrentIndex = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex(uuidActiveData, uuIdSubType ?? ""));
  const LandCTXDGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuidActiveData, uuIdSubType ?? ""))

  const handleChangeCheckBox = () => {
    const checkBoxTypeInfoValue = checkBoxTypeInfoRef.current?.getValue() ?? [];

    // eslint-disable-next-line array-callback-return
    checkBoxTypeInfoValue.map(ti => {
      if (ti.value === ECheckType.CTXD_LAND) {
        dispatch(setCollaretalAssessmentInfomation(ti.checked ? "Y" : "N", { uuid: uuidActiveData, uuidActive: uuIdSubType, key: "has_land_asset" }))
      }
      if (ti.value === ECheckType.CTXD_GCN) {
        dispatch(setCollaretalAssessmentInfomation(ti.checked ? "Y" : "N", { uuid: uuidActiveData, uuidActive: uuIdSubType, key: "has_certificated_land_asset" }))
      }
    })
  }

  const onHandleAddCtxdOfGcnQsh = () => {
    dispatch(addLandGcnQsh("", {uuidData: uuidActiveData, uuidSubType: uuIdSubType}));
  }

  const optionsLandCTXDGcnQsh: ObjectListOption[] = LandCTXDGcnQshData ? LandCTXDGcnQshData.map((d, i) => ({
    label: `GCN QSH CTXD ${i + 1}`,
    circle: <MdHomeWork />
  })) : [];


  const onHandleChangeCtxdOfGcnQsh = (current: number) => {
    const currentActive = LandCTXDGcnQshData && LandCTXDGcnQshData[current].uuIdCtxdGcnQsh;
    currentActive && dispatch(setUuidActiveLandGcnQsh(currentActive, { uuidData: uuidActiveData, uuidSubType: uuIdSubType }))
  }

  const onHandleClickMenuCtxdOfGcnQsh = (menu: ObjectListMenuItem, position: number) => {
    let _landCTXDGQsh = LandCTXDGcnQshData?.find(
      ((cl, index) => index === position)
    )

    if(menu.value === EActionMenu.DELETE){
      _landCTXDGQsh && 
      dispatch(
        deleteLandGcnQsh(
          _landCTXDGQsh.uuIdCtxdGcnQsh, {
          uuidData: uuidActiveData, 
          uuidSubType: uuIdSubType,
          price_cert_uuid: '', 
          price_cert_asset_uuid: '',
          land_const_uuid: '',
          isNoti:false
        })
      );
    }
  }
  return (
    <>
      {
        (() => {
          if (currentTypeDefault === ETypeLand.LAND) {
            return (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box className="flex items-center">
                  <span className="text-14 font-medium text-secondary pr-5">
                    Chọn loại tài sản khai báo thông tin
                  </span>
                  <Checkbox
                    ref={checkBoxTypeInfoRef}
                    disabled={(dataItems?false:true) || ruleDisabled}
                    onChange={handleChangeCheckBox}
                    options={
                      [
                        {
                          label: "CTXD trên đất",
                          value: ECheckType.CTXD_LAND,
                          checked: dataItems ? (dataItems?.has_land_asset === "Y" ? true : false) : false
                        },
                        {
                          label: "CTXD GCN riêng",
                          value: ECheckType.CTXD_GCN,
                          checked: dataItems ? (dataItems?.has_certificated_land_asset === "Y" ? true : false) : false
                        }
                      ]
                    }
                  />
                </Box>
              </Grid>
            )
          }

          if (currentTypeDefault === ETypeLand.CTXD_GCN) {
            return (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <HorizontalList
                  menu={[
                    {
                      label: "Xóa",
                      value: EActionMenu.DELETE
                    }
                  ]}
                  enableAdd={!ruleDisabled}
                  enableMenu={!ruleDisabled}
                  onAdd={onHandleAddCtxdOfGcnQsh}
                  current={LandCTXDGcnQshCurrentIndex}
                  options={optionsLandCTXDGcnQsh}
                  onChange={onHandleChangeCtxdOfGcnQsh}
                  onClickMenu={onHandleClickMenuCtxdOfGcnQsh}
                />
              </Grid>
            )
          }
        })()
      }
    </>
  )
} 

export default ActionTypeLand;
