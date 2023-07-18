import { 
  FunctionComponent, 
  useEffect,
  useLayoutEffect,
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import { SxRadio } from './style';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import { 
  getLoanNormalSubTypeItemsActiveApproval, 
  getLOANormalStoreColalteralLandAssessmentApproval,
  getLOANormalStoreColalteralLandCTXDGcnQshDataApproval,
  getTypeLandApproval,
  getLOANNormalCollateralIsCompactnessApproval,
  getLOANNormalCurrentValueItemApproval,
  getLOANNormalValueItemApproval,
} from 'features/loan/normal/storageApproval/collateral/selector';
import { setCollaretalCurrentValueItemApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import { ETypeLandName } from 'features/loan/normal/storageApproval/collateral/case';
export interface IAssessmentInfomationProps{
  uuidData?: string;
  uuidSubtype?: string;
}

const AssessmentInfomation: FunctionComponent<IAssessmentInfomationProps> = (props) => {

  const { uuidData = "", uuidSubtype = "" } = props;

  const dispatch = useDispatch();
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval( uuidData, uuidSubtype ))
  const LandCTXDGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshDataApproval(uuidData, uuidSubtype));
  const TypeLand = useSelector(getTypeLandApproval(uuidData, uuidSubtype, SubTypeItemsActive ?? ""));
  const dataItems = useSelector(getLOANormalStoreColalteralLandAssessmentApproval( uuidData, uuidSubtype, SubTypeItemsActive ?? ''));
  const CollateralIsCompactness = useSelector(getLOANNormalCollateralIsCompactnessApproval(uuidData));
  const CurrentValueItem = useSelector(getLOANNormalCurrentValueItemApproval(uuidData, uuidSubtype));
  const ValueItem = useSelector(getLOANNormalValueItemApproval(uuidData, uuidSubtype));

  const [ typeLandActive, setTypeLandActive ] = useState<string>(TypeLand);
  
  useLayoutEffect(() => {
    if( ValueItem !== CurrentValueItem){
      dispatch(setCollaretalCurrentValueItemApproval(+CurrentValueItem, {uuid: uuidData, uuidActive: uuidSubtype, uuidItemActive: SubTypeItemsActive}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValueItem])



  useEffect(() => {
    if (typeLandActive !== TypeLand){
      setTypeLandActive(TypeLand)
     
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TypeLand])
  
  return (
    <>
      {
        (() => {
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
                      sx={SxRadio}
                      value={dataItems?.from_credit_extension ?? ""}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <CollateralCheck
                      label="2. Nguồn tiền trả nợ là nguồn tiền hình thành từ việc kinh doanh, khai thác chính TSBĐ"
                      required
                      sx={SxRadio}
                      value={dataItems?.is_exploited ?? ""}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <CollateralCheck
                      label="3. TS hiện đang đảm bảo cho nghĩa vụ CTD"
                      required
                      sx={SxRadio}
                      value={dataItems?.credit_extension_secured ?? ""}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="4. Tỷ lệ diện tích BĐS không kinh doanh (%)"
                      type="number"
                      value={CollateralIsCompactness === "RE_MIXED" ? dataItems?.non_business_area?.toString() : '' ?? ""}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="5. Tỷ lệ cho vay tối đa theo quy định (%)"
                      required
                      type="number"
                      format
                      value={dataItems?.max_percentage ?? ""}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      label="6. Giá trị QSD đất theo từng GCN (VNĐ)"
                      required
                      type="number"
                      format
                      value={dataItems?.value_of_land?.toString() ?? "0"}
                      disabled
                    />
                  </Grid>
        
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextArea
                      label="7. Thông tin nghĩa vụ đang đảm bảo"
                      placeholder='Nhập thông tin nghĩa vụ '
                      required
                      value={dataItems?.description ?? ""}
                      disabled
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
