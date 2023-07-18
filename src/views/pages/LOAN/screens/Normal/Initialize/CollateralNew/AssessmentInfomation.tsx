import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { setCollaretalAssessmentInfomation, setCollaretalCurrentValueItem } from 'features/loan/normal/storage/collateralV2/actions';
import { ETypeLandName } from 'features/loan/normal/storage/collateralV2/case';
import {
  getLOANNormalCollateralIsCompactness,
  getLOANNormalCurrentValueItem, getLoanNormalSubType, getLoanNormalSubTypeItemsActive, getLOANNormalValueItem, getLOANormalStoreColalteralLandAssessment,
  getLOANormalStoreColalteralLandCTXDGcnQshData, getLOANormalStoreColalteralLandCTXDGcnQshUuidActive, getLOANormalStoreLandLegalItemActive, getTypeLand
} from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILandWrapper, ILandWrapperCheck, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import { SxRadio } from './style';
export interface IAssessmentInfomationProps{
  uuidData?: string;
  uuidSubtype?: string;
}

const AssessmentInfomation: FunctionComponent<IAssessmentInfomationProps> = (props) => {

  const { uuidData = "", uuidSubtype = "" } = props;

  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled)
  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuidData, uuidSubtype));
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive( uuidData, uuidSubtype ))
  const LandCTXDGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuidData, uuidSubtype));
  const TypeLand = useSelector(getTypeLand(uuidData, uuidSubtype, SubTypeItemsActive ?? ""));
  const dataItems = useSelector(getLOANormalStoreColalteralLandAssessment( uuidData, uuidSubtype, SubTypeItemsActive ?? ''));
  const CollateralIsCompactness = useSelector(getLOANNormalCollateralIsCompactness(uuidData));
  const CurrentValueItem = useSelector(getLOANNormalCurrentValueItem(uuidData, uuidSubtype));
  const ValueItem = useSelector(getLOANNormalValueItem(uuidData, uuidSubtype));
  const getMessage = useNormalCollateralMessage();
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuidData,uuidSubtype));
  const subType = useSelector(getLoanNormalSubType(uuidData))
  const [ typeLandActive, setTypeLandActive ] = useState<string>(TypeLand);
  const [ disabledInput, setDisabledInput ] = useState<boolean>(false);
  

  useLayoutEffect(() => {
    if( ValueItem !== CurrentValueItem){
      dispatch(setCollaretalCurrentValueItem(+CurrentValueItem, {uuid: uuidData, uuidActive: uuidSubtype, uuidItemActive: SubTypeItemsActive}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValueItem])


  useLayoutEffect(() => {
    /**
     * Check nếu type land CTXD có GCN QSH riêng
     * Check CTXDGcnQshUuidActive is emty
     * Input disabled
     * 
     */
    if(!dataItems){
      setDisabledInput(true);
    }
    if(TypeLand === ETypeLandName.CTXD_GCN){
      
      const isCheckDisabledInput = CTXDGcnQshUuidActive?.length === 0 ? true : false;

      if ( isCheckDisabledInput !== disabledInput ){
        setDisabledInput(isCheckDisabledInput);
      }
    }else if ( TypeLand === ETypeLandName.CTXD_LAND ){
      setDisabledInput(true);
    }
    else{
      disabledInput && setDisabledInput(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TypeLand, CTXDGcnQshUuidActive])

  useEffect(() => {

    if (typeLandActive !== TypeLand){
      setTypeLandActive(TypeLand)
     
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TypeLand])
  
  const onChangeSubItem = (value: IValueOnChangeCollateral, key: keyof (ILandWrapper & ILandWrapperCheck)) => {
    dispatch(setCollaretalAssessmentInfomation(value, { uuid: uuidData, uuidActive: uuidSubtype, key }))
  }

  const type = (subType && subType[0].id === "LAND") ? typeLandActive : "Other"
  
  return (
    <>
      {
        (() => {
          /**
           * Check data man hinh CTXS Gcn Qsh
           * If lenght = 0 
           * returun null
           * 
          //  */
          if(ETypeLandName.CTXD_GCN === typeLandActive && LandCTXDGcnQshData?.length === 0){
            return null;
          }
          else{
            return <Grid container spacing={3}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-19 text-secondary"
                  sx={{ fontWeight: 'bold' }}
                >
                  A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN
                </Typography>
              </Grid>
        
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2} >
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <CollateralCheck
                      label="1. TSBĐ được hình thành từ nguồn vốn CTD"
                      required
                      onChange={(value) => {
                        onChangeSubItem(value, 'from_credit_extension')
                        if(value ==='N'){
                          onChangeSubItem('N', 'is_exploited')
                          onChangeSubItem(null, 'non_business_area')
                        }
                      }}
                      sx={SxRadio}
                      value={dataItems?.from_credit_extension ?? ""}
                      disabled={disabledInput || ruleDisabled}
                    />
                  </Grid>
        
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <CollateralCheck
                      label="2. Nguồn tiền trả nợ là nguồn tiền hình thành từ việc kinh doanh, khai thác chính TSBĐ"
                      required
                      onChange={(value) => onChangeSubItem(value, 'is_exploited')}
                      sx={SxRadio}
                      value={dataItems?.is_exploited ?? "N"}
                      disabled={disabledInput || dataItems?.from_credit_extension ==='N' || ruleDisabled}
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <CollateralCheck
                      label="3. TS hiện đang đảm bảo cho nghĩa vụ CTD"
                      required
                      onChange={(value) => {
                          onChangeSubItem(value, 'credit_extension_secured')
                          if(value === 'N'){
                            onChangeSubItem(null, 'description')
                          }
                        }
                      }
                      sx={SxRadio}
                      value={dataItems?.credit_extension_secured ?? ""}
                      disabled={disabledInput || ruleDisabled}
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    {
                      /* 
                        Có tài sản hợp khối -> Y
                        TSBĐ được hình thành từ nguồn vốn CTD -> Y
                        Tỷ lệ diện tích BĐS không kinh doanh -> được nhập
                      */
                    }
                    <Input
                      label="4. Tỷ lệ diện tích BĐS không kinh doanh (%)"
                      required={(CollateralIsCompactness === "RE_MIXED" && dataItems?.from_credit_extension === "Y") ? true : false}
                      type="number"
                      format
                      onDebounce={(value) => onChangeSubItem(value === "" ? null : value, 'non_business_area')}
                      value={CollateralIsCompactness === "RE_MIXED" ? dataItems?.non_business_area?.toString() : undefined }
                      disabled={
                        (CollateralIsCompactness === "RE_MIXED" && dataItems?.from_credit_extension === "Y" ?
                          false : true) || ruleDisabled || disabledInput
                      }
                      message={ getMessage('non_business_area', 
                                {position: itemActive?.activeUUID ?? '',
                                type ,
                                gcnUuid: typeLandActive !=="CTXD_GCN"?"": CTXDGcnQshUuidActive ?? ''})}
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="5. Tỷ lệ cho vay tối đa theo quy định (%)"
                      required
                      type="number"
                      format
                      onDebounce={(value) => onChangeSubItem(value === "" ? null : value, 'max_percentage')}
                      value={dataItems?.max_percentage ?? ""}
                      disabled={disabledInput || ruleDisabled}
                      message={ getMessage('max_percentage_ratio', {position: itemActive?.activeUUID ?? '',type, gcnUuid: typeLandActive !=="CTXD_GCN"? "" : CTXDGcnQshUuidActive ?? ''})}
                    />
                  </Grid>
        
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      label={subType && subType[0]?.id ==='APPA' ? '6. Giá trị quyền sở hữu CHCC' : subType && subType[0]?.id === 'MARK' ? '6. Giá trị sạp chợ/ô TTTM': TypeLand === 'CTXD_GCN' ? '6. Giá trị CTXD có GCN riêng (VNĐ)' : TypeLand === 'CTXD_LAND' ? '6. Giá trị CTXD trên đất theo từng GCN (VNĐ)' : '6. Giá trị QSD đất theo từng GCN (VNĐ)'}
                      required={(type !== "CTXD_LAND" && type !== "CTXD_GCN")}
                      type="number"
                      format
                      onDebounce={(value) => onChangeSubItem(value === "" ? null : +value, 'value_of_land')}
                      value={dataItems?.value_of_land?.toString()}
                      disabled={(dataItems?false:true) || ruleDisabled}
                      message={ 
                        getMessage(
                          `ValueOfLand${subType ? subType[0]?.id ?? "" : ""}`,
                           {position: itemActive?.activeUUID ?? '',type , gcnUuid: typeLandActive !== "CTXD_GCN" ? "" : CTXDGcnQshUuidActive ?? ''})
                      }
                    />
                  </Grid>
        
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextArea
                      label="7. Thông tin nghĩa vụ đang đảm bảo"
                      placeholder='Nhập thông tin nghĩa vụ'
                      required={dataItems?.credit_extension_secured === "Y"}
                      onDebounce={(value) => onChangeSubItem(value, 'description')}
                      value={dataItems?.description ?? ""}
                      disabled={disabledInput || ruleDisabled || dataItems?.credit_extension_secured === "N"}
                      message={ getMessage('infoGuaranteed', {position: itemActive?.activeUUID ?? '',type ,gcnUuid: typeLandActive !=="CTXD_GCN"?"": CTXDGcnQshUuidActive ?? ''})}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        })()
      }
    </>
  )
}


export default AssessmentInfomation;
