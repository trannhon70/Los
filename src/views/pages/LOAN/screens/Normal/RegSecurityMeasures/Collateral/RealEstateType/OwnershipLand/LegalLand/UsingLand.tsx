import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardInside from 'views/components/layout/CardInside';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import Input from 'views/components/base/Input';
import { 
    addLandInformationAsset, 
    onChangeLandInformationAsset, 
    removeLandInformationAsset,
    setLandInformationAssetData,
} from "features/loan/normal/storage/collateralV2/actions";
import { SxInputPlaceholder, SxOnjectListLandAssets, SxSelectDisiable } from "../../../style";
import { 
  getLOANormalStoreColalteralLandAssetTypeUsingLand, 
  getLOANormalStoreColalteralLandAssetTypeUsingLandDataActive, 
  getLOANormalStoreColalteralLandAssetTypeUsingLandUuidActive, 
} from "features/loan/normal/storage/collateralV2/selector";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import { ICertificateUsePurposes } from "types/models/loan/normal/storage/CollaretalV2";
import ModalConfirm from "views/components/layout/ModalConfirm";
import useNotify from "app/hooks/useNotify";
import SelectOriginLaneUse from "views/components/widgets/SelectOriginLaneUse";
import SelectLandUseCertified from "views/components/widgets/SelectLandUseCertified";
import SelectPurposeUsingLane from "views/components/widgets/SelectPurposeUsingLane";

export interface IUsingLandProps {
  uuIdData?: string;
  uuIdSubType?: string;
}


const UsingLand: FunctionComponent<IUsingLandProps> = (props) => {

  const { uuIdData = "", uuIdSubType = "" } = props;
  const dispatch = useDispatch();
  const notify = useNotify()

  const landAssetType = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLand(uuIdData, uuIdSubType));
  const uuidActiveLandAssetType = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLandUuidActive(uuIdData, uuIdSubType));
  const landAssetTypeDataActive = useSelector(getLOANormalStoreColalteralLandAssetTypeUsingLandDataActive(uuIdData, uuIdSubType, uuidActiveLandAssetType ?? ""))

  const [ deleteIdLandAsset, setDeleteIdLandAsset ] = useState<ICertificateUsePurposes | null>(null);
  const [ isDisiableInput, setIsDisiableInput] = useState<boolean>(false);


  useEffect(() => {
    /**
     * Check active uuid disiable input
     */
    let isCheck = uuidActiveLandAssetType?.length === 0 ? true : false;
    if(isCheck !== isDisiableInput){
      setIsDisiableInput(isCheck)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidActiveLandAssetType])


  /**
   * generate option data land asset
   * 
   */
  const optionObjectLandAsset = landAssetType?.map((lat, index) => ({
    label: `Mục đích ${index + 1}`,
    circle: <BsFillFileEarmarkFill />
  }))

  const activeOptionLandAsset = landAssetType?.findIndex(
    (lat) =>  lat.activeUUIDCertificateUsePurposes === uuidActiveLandAssetType
  );

  /**
   * Action menu onject list Land Asset
   * 
   */
  const onHandleClickMenuLandAsset = (menu: ObjectListMenuItem, position: number) => {
    let _landAsset = landAssetType?.find((lat, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      _landAsset && setDeleteIdLandAsset(_landAsset)
    }
  }

  /**
   * Action menu close modal confirm delete land asset
   * 
   */
  const onHandleCancelConfirmLandAsset = () => setDeleteIdLandAsset(null);


  /**
   * Action menu success delete land asset
   * 
   */
  const onHandleConfirmLandAsset = () => {
    let uuidDelete = deleteIdLandAsset?.activeUUIDCertificateUsePurposes;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeLandInformationAsset(uuidDelete, { 
        uuidData: uuIdData, 
        uuidSubType: uuIdSubType,
        price_cert_uuid:"", 
        price_cert_asset_uuid:"",
        re_land_used_uuid:"",
      }));
      
      notify('Xóa giấy mục đích sử dụng thành công', 'success');
    }

    onHandleCancelConfirmLandAsset();
  }

  /**
   * Action add new data land asset
   * 
   */
  const onAddLandAsset = () => {
    dispatch(addLandInformationAsset("", { uuidData: uuIdData, uuidSubType: uuIdSubType}));
  }


  /**
   * Action click change active land acsset type
   * 
   */
  const onHandleChangeLandAssetStype = (current: number) => {
    let currentActive = landAssetType && landAssetType[current].activeUUIDCertificateUsePurposes;
    currentActive && dispatch(onChangeLandInformationAsset(
      currentActive,
      { uuidData: uuIdData, uuidSubType: uuIdSubType}
    ))
  }

  const onChangeDataLandAsset = (
    value: string | number | null,
    key: keyof ICertificateUsePurposes
  ) => {
    dispatch(
      setLandInformationAssetData(value, {
        uuidData: uuIdData, 
        uuidSubType: uuIdSubType,
        key,
      })
    );
  };

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
            enableAdd={true}
            enableMenu={true}
            menu={[
              {
                label: "Xóa",
                value: EActionMenu.DELETE
              }
            ]}
            onClickMenu={onHandleClickMenuLandAsset}
            onAdd={onAddLandAsset}
            labelLength="Mục đích sử dụng đất:&nbsp;"
            current={activeOptionLandAsset}
            onChange={onHandleChangeLandAssetStype}
            options={optionObjectLandAsset}
            sx={SxOnjectListLandAssets}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <SelectPurposeUsingLane
            label="1. Mục đích sử dụng đất theo GCN"
            required
            disabled={isDisiableInput}
            onChange={(val) => onChangeDataLandAsset(val, "use_purpose")}
            value={landAssetTypeDataActive?.use_purpose}
            sx={SxSelectDisiable}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="2. Số thửa đất"
            type="number"
            required
            disabled={isDisiableInput}
            onDebounce={(val) => onChangeDataLandAsset(val, "land_number")}
            value={landAssetTypeDataActive?.land_number?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="3. Tờ bản đồ số"
            type="number"
            required
            disabled={isDisiableInput}
            onDebounce={(val) => onChangeDataLandAsset(val, "map_number")}
            value={landAssetTypeDataActive?.map_number?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="4. Diện tích đất theo GCN (m2)"
            type="number"
            required
            disabled={isDisiableInput}
            onDebounce={(val) => onChangeDataLandAsset(val, "certificate_area")}
            value={landAssetTypeDataActive?.certificate_area?.toString() ?? ""}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="5. Diện tích đất thực tế (m2) (*)"
            type="number"
            required
            disabled={isDisiableInput}
            onDebounce={(val) => onChangeDataLandAsset(val, "real_area")}
            value={landAssetTypeDataActive?.real_area?.toString() ?? ""}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <SelectOriginLaneUse 
            label="6. Nguồn gốc sử dụng đất theo GCN"
            required
            disabled={isDisiableInput}
            onChange={(val) => onChangeDataLandAsset(val, "land_use_source")}
            value={landAssetTypeDataActive?.land_use_source}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            label="7. Nguồn gốc sử dụng đất theo GCN khác"
            required
            disabled={landAssetTypeDataActive?.land_use_source === "LS_14" ? false : true}
            onDebounce={(val) => onChangeDataLandAsset(val, "other_land_use_source")}
            value={landAssetTypeDataActive?.other_land_use_source}
            placeholder="Nhập nguồn gốc sử dụng khác"
            sx={SxInputPlaceholder}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="8. Thời hạn sử dụng đất theo GCN"
            required
            disabled={isDisiableInput}
            onDebounce={(val) => onChangeDataLandAsset(val, "duration")}
            value={landAssetTypeDataActive?.duration}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <SelectLandUseCertified 
            label="9. Hình thức sử dụng đất theo GCN"
            required
            disabled={isDisiableInput}
            onChange={(val) => onChangeDataLandAsset(val, "usage_form")}
            value={landAssetTypeDataActive?.usage_form}
            sx={SxSelectDisiable}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            label="10. Hình thức sử dụng đất theo GCN khác"
            required
            disabled={landAssetTypeDataActive?.usage_form === "OTHER" ? false : true}
            onDebounce={(val) => onChangeDataLandAsset(val, "other_usage_form")}
            value={landAssetTypeDataActive?.other_usage_form}
            placeholder="Nhập hình thức sử dụng khác"
            sx={SxInputPlaceholder}
          />
        </Grid>
      </Grid>

      <ModalConfirm open={ deleteIdLandAsset !== null } onClose={ onHandleCancelConfirmLandAsset } onConfirm={ onHandleConfirmLandAsset }>
        <Box className="text-18 font-medium text-primary text-center">
          {
            (() => {
              const index = landAssetType ? landAssetType.findIndex(
                lat => lat.activeUUIDCertificateUsePurposes === deleteIdLandAsset?.activeUUIDCertificateUsePurposes
              ) : "";
              const name = optionObjectLandAsset?.find((d, i)=> i === index)?.label;
              return `Bạn có chắc chắn muốn xóa ${name ? name.toLocaleLowerCase() :  "mục đích"} ?`
            })()
          }
        </Box>
      </ModalConfirm>
    </CardInside>
  )
}

export default UsingLand;