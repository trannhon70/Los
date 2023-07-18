import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import ObjectList from 'views/components/layout/ObjectList';
import Input from 'views/components/base/Input';
import { 
  SxInputPlaceholder, 
  SxOnjectListLandAssets, 
  SxSelectDisiable 
} from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import { 
  getLOANormalStoreColalteralLandAssetTypeUsingLand, 
  getLOANormalStoreColalteralLandAssetTypeUsingLandDataActive, 
  getLOANormalStoreColalteralLandAssetTypeUsingLandUuidActive, 
} from "features/loan/normal/storageApproval/collateral/selector";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import SelectOriginLaneUse from "views/components/widgets/SelectOriginLaneUse";
import SelectLandUseCertified from "views/components/widgets/SelectLandUseCertified";
import SelectPurposeUsingLane from "views/components/widgets/SelectPurposeUsingLane";
import { onChangeLandInformationAssetApproval } from "features/loan/normal/storageApproval/collateral/actions";
export interface IUsingLandProps {
  uuIdData?: string;
  uuIdSubType?: string;
}


const UsingLand: FunctionComponent<IUsingLandProps> = (props) => {

  const { uuIdData = "", uuIdSubType = "" } = props;
  const dispatch = useDispatch();

  const landAssetType = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLand(uuIdData, uuIdSubType));
  const uuidActiveLandAssetType = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLandUuidActive(uuIdData, uuIdSubType));
  const landAssetTypeDataActive = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLandDataActive(uuIdData, uuIdSubType, uuidActiveLandAssetType ?? ""))

  useEffect(() =>{
    if(landAssetType){
      dispatch(onChangeLandInformationAssetApproval(
        landAssetType[0]?.activeUUIDCertificateUsePurposes ?? '',
        { uuidData: uuIdData, uuidSubType: uuIdSubType}
      ))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const optionObjectLandAsset = landAssetType?.map((lat, index) => ({
    label: `Mục đích ${index + 1}`,
    circle: <BsFillFileEarmarkFill />
  }))

  const activeOptionLandAsset = landAssetType?.findIndex(
    (lat) =>  lat.activeUUIDCertificateUsePurposes === uuidActiveLandAssetType
  );
  
  /**
   * Action click change active land acsset type
   * 
   */
  const onHandleChangeLandAssetStype = (current: number) => {
    let currentActive = landAssetType && landAssetType[current].activeUUIDCertificateUsePurposes;
    currentActive && dispatch(onChangeLandInformationAssetApproval(
      currentActive,
      { uuidData: uuIdData, uuidSubType: uuIdSubType}
    ))
  }

  return (
    <CardInside
      title="II. Mục đích sử dụng đất theo giấy chứng nhận"
      sx={{
        "& legend": {
          fontSize: '16px'
        }
      }}
    >
      <Grid container spacing={3} className="pl-4 pb-4">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ObjectList
            labelLength="Mục đích sử dụng đất:&nbsp;"
            current={activeOptionLandAsset}
            onChange={onHandleChangeLandAssetStype}
            options={optionObjectLandAsset}
            sx={SxOnjectListLandAssets}
            enableAdd={false}
            enableMenu={false}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="1. Mục đích sử dụng đất theo GCN"
            required
            disabled={true}
            value={landAssetTypeDataActive?.use_purpose}
            // sx={SxSelectDisiable}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="2. Số thửa đất"
            disabled={true}
            value={landAssetTypeDataActive?.land_number?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="3. Tờ bản đồ số"
            disabled={true}
            value={landAssetTypeDataActive?.map_number?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="4. Diện tích đất theo GCN (m2)"
            type="number"
            format
            required
            disabled={true}
            value={landAssetTypeDataActive?.certificate_area?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="5. Diện tích đất thực tế (m2)"
            type="number"
            format
            required
            disabled={true}
            value={landAssetTypeDataActive?.real_area?.toString() ?? ""}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <SelectOriginLaneUse 
            label="6. Nguồn gốc sử dụng đất theo GCN"
            required
            disabled={true}
            value={landAssetTypeDataActive?.land_use_source}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            label="7. Nguồn gốc sử dụng đất theo GCN khác"
            required = {landAssetTypeDataActive?.land_use_source === "LS_14" ? true : false}
            disabled={true}
            value={landAssetTypeDataActive?.other_land_use_source}
            placeholder="Nhập nguồn gốc sử dụng khác"
            sx={SxInputPlaceholder}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="8. Thời hạn sử dụng đất theo GCN"
            disabled={true}
            value={landAssetTypeDataActive?.duration}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <SelectLandUseCertified 
            label="9. Hình thức sử dụng đất theo GCN"
            required
            disabled={true}
            value={landAssetTypeDataActive?.usage_form}
            sx={SxSelectDisiable}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            label="10. Hình thức sử dụng đất theo GCN khác"
            required = {landAssetTypeDataActive?.usage_form === "OTHER" ? true : false}
            disabled={true}
            value={landAssetTypeDataActive?.other_usage_form}
            placeholder="Nhập hình thức sử dụng khác"
            sx={SxInputPlaceholder}
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}

export default UsingLand;