import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/system";
import useMasterData from "app/hooks/useMasterData";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import useNotify from "app/hooks/useNotify";
import {
  addLandCertificateInfo,
  callRemoveLandCertificateInfoUsePurposes,
  onLandCertificateInfo,
  setLandCertificateInfoData,
  setLandInformationData,
  setLandInformationDataLocation,
  setLandInformationDataLocationCertificate
} from "features/loan/normal/storage/collateralV2/actions";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import {
  getCollateralPriceCertUuid,
  getLoanNormalSubTypeItemsActive,
  getLoanNormalSubTypeItemsDetails,
  getLoanNormalSubTypeItemsDetailsCertificate,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalDepartment
} from "features/loan/normal/storage/collateralV2/selector";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect, useRef, useState } from "react";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {
  ICertificateUsePurposes,
  IDepartmentInfoLand
} from "types/models/loan/normal/storage/CollaretalV2";
import AutocompleteMultiple, {
  AutocompleteMultipleOption,
  AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import IconCopy from "views/components/layout/IconCopy";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListMenuItem,
  ObjectListOption
} from "views/components/layout/ObjectList";
import SelectLandUseCertified from "views/components/widgets/SelectLandUseCertified";
import SelectLocation, {
  SelectLocationValue
} from "views/components/widgets/SelectLocation";
import SelectOriginLaneUse from "views/components/widgets/SelectOriginLaneUse";
import ModalCollateralAddress from "views/pages/LOAN/widgets/ModalCollateralAddress";
import { SxAutoCompleteTagUsePurposes, SxOnjectListLandAssets } from "../../../style";
export interface LandInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const LandInfo: FC<LandInfoProps> = (props) => {
  const { uuIdData = "", uuIdSubType = "" } = props;
  const { PurposeUseLaneValuation } = useMasterData();
  
  const dispatch = useDispatch();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUseLaneValuation.map(
    (pul) => ({
      label: pul.name,
      value: pul.code,
    })
  );

  const getMessage =  useNormalCollateralMessage();
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',uuIdSubType ?? ''));

  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData ?? "", uuIdSubType ?? "")
  );
  const Department = useSelector(getLOANormalStoreLegalDepartment(uuIdData, uuIdSubType));
  const priceCertUuid = useSelector(getCollateralPriceCertUuid(uuIdData ?? ''))

  const dataDetails = useSelector(
    getLoanNormalSubTypeItemsDetails(
      uuIdData ?? "",
      uuIdSubType ?? "",
      SubTypeItemsActive ?? ""
    )
  );

  const dataDetailsCertificate = useSelector(
    getLoanNormalSubTypeItemsDetailsCertificate(
      uuIdData ?? "",
      uuIdSubType ?? "",
      SubTypeItemsActive ?? "",
      dataDetails?.activeUUIDCertificateUsePurposes ?? ""
    )
  );

  const [ deleteIdCer, setDeleteIdCer ] = useState<ICertificateUsePurposes | null>(null);
  const [ disabledInputDepartmentCerPurpose, setDisabledInputDepartmentCerPurpose ] = useState<boolean>(false);
  const [isModalOpenReal,setIsOpenModalReal] = useState<boolean>(false)
  const [isModalOpenGCN,setIsModalOpenGCN] = useState<boolean>(false)

  const purposeUsingLaneElement = useRef<AutocompleteMultipleRef>(null) 

  useEffect(() => {
    /**
     * Check uuid Department Cer is emty
     */
    let isCheck = dataDetails ? ( dataDetails?.department.department_info_land.certificate_use_purposes?.length > 0 ? false : true ) : true;
    if(disabledInputDepartmentCerPurpose !== isCheck) {
      setDisabledInputDepartmentCerPurpose(isCheck)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetails?.department.department_info_land.certificate_use_purposes])

  // useEffect(() => {
  //   if(Department?.has_certificate === 'N' && optionsDep.length >0){
  //     dispatch(
  //       addLandCertificateInfo("", {
  //         uuidData: uuIdData,
  //         uuidSubType: uuIdSubType,
  //         uuidItem: SubTypeItemsActive ?? "",
  //       })
  //     );
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Department?.has_certificate])

  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    dispatch(
      setLandInformationDataLocation(remain, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
      })
    );
  };

  const changeLocationCertificate = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    dispatch(
      setLandInformationDataLocationCertificate(remain, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
      })
    );
  };

  const onChangeData = (
    value: string | number | null | string[] | number[],
    key: keyof IDepartmentInfoLand
  ) => {
    dispatch(
      setLandInformationData(value, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
        key,
      })
    );
  };

  const onChangeDataCertificateData = (
    value: string | number | null,
    key: keyof ICertificateUsePurposes
  ) => {
    dispatch(
      setLandCertificateInfoData(value, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
        uuidCertificate:dataDetails?.activeUUIDCertificateUsePurposes ?? "",
        key,
      })
    );
  };

  const onAdd = () => {
    dispatch(
      addLandCertificateInfo("", {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
      })
    );
  };

  const optionsDep: ObjectListOption[] =
    dataDetails?.department.department_info_land.certificate_use_purposes?.map(
      (item, i) => ({
        label: `Mục đích ${i + 1}`,
        circle: <BsFillFileEarmarkFill />,
      })
    ) ?? [];

  const activeLand = dataDetails?.department?.department_info_land?.certificate_use_purposes?.findIndex(
    (item) =>
      item.activeUUIDCertificateUsePurposes ===
      dataDetails.activeUUIDCertificateUsePurposes
  );

  const onChangeLand = (current: number) => {
    const currentActive = dataDetails?.department?.department_info_land
      ? dataDetails?.department?.department_info_land.certificate_use_purposes[current]
          ?.activeUUIDCertificateUsePurposes ?? ""
      : "";
    dispatch(
      onLandCertificateInfo(currentActive, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
      })
    );
  };

  const onHandleClickMenuDepartmentCer = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuCer = dataDetails?.department?.department_info_land.certificate_use_purposes?.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      // nếu đã cấp GCN thì k thể xóa item cuối
      if(dataDetails?.department?.department_info_land?.certificate_use_purposes?.length === 1 && Department?.has_certificate === 'Y'){
        notify('Không thể xóa, phải có ít nhất 1 mục đích sử dụng đất', 'warning');
      }else{
        dataMenuCer && setDeleteIdCer(dataMenuCer);
      }
    }
  }
  const indexOther = dataDetails?.department?.department_info_land.use_purposes?.includes("OTHER")
  const onHandlePurposeUsingLane = () => {
    let _purposeUsingLaneChange = purposeUsingLaneElement.current?.getValue() ?? [];
    onChangeData( _purposeUsingLaneChange?.map(p => p.value.toString()), "use_purposes");
  }
  useEffect(()=>{
    if(!indexOther){
      onChangeData('', "other_use_purpose");
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[indexOther])
//   // da cap gcn clear muc dich su dung
//   useEffect(()=>{
//     if(Department?.has_certificate === "N" && ){
//       onChangeData([], "use_purposes");
//     }
    
// // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[Department?.has_certificate])
  /**
   * Action menu close modal confirm delete certifiCate
   * 
   */
  const onHandleCancelConfirmCer = () => setDeleteIdCer(null);

  /**
   * Action menu success delete certifiCate
   * 
   */
  const onHandleConfirmCer = () =>{
    let uuidDelete = deleteIdCer?.activeUUIDCertificateUsePurposes ?? "";
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(
        callRemoveLandCertificateInfoUsePurposes(uuidDelete, {
          uuidData: uuIdData,
          uuidSubType: uuIdSubType,
          uuidItem: SubTypeItemsActive,
          price_cert_uuid: priceCertUuid ?? "",
          price_cert_asset_uuid: itemActive?.price_cert_asset_uuid ?? "",
          apart_land_used_uuid: dataDetails?.department.department_info_land.certificate_use_purposes?.find(i=>i.activeUUIDCertificateUsePurposes === deleteIdCer?.activeUUIDCertificateUsePurposes)?.apart_land_used_uuid ?? "",
        })
      );
    }
    onHandleCancelConfirmCer()
  }

  const openModalReal = () =>{
    setIsOpenModalReal(!isModalOpenReal)
  }
  const openModalGCN = () =>{
      setIsModalOpenGCN(!isModalOpenGCN)
  }

  return (
    <>
      <CardInside
        title="I. Thông tin chi tiết đất/dự án"
        sx={{
          "& legend": {
            fontSize: "16px",
          },
        }}
      >
        <Grid container spacing={3} className="pl-4 pb-4">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectLocation
              sx={{
                "& .icon-copy": {
                  zIndex: "1000",
                  position: "absolute",
                  cursor: "pointer"
                },
              }}
              col={3}
              before={
                <Grid
                  item xl={3} lg={3} md={12} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
                  <Input
                    onDebounce={(val) => {
                      onChangeData(val, "address");
                    }}
                    value={dataDetails?.department?.department_info_land?.address}
                    label='1. Địa chỉ thực tế đất/dự án'
                    format
                    // required
                    disabled={ruleDisabled}
                    message={ getMessage('address', {position: itemActive?.activeUUID ?? '', type: 'Other'})}

                  />
                  <IconButton 
                    sx={{padding:0}}  
                    className="icon-copy"
                    onClick={openModalReal}
                  >
                    <IconCopy />
                  </IconButton>
                </Grid>
              }
              label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
              value={{
                country: "VN",
                province: dataDetails?.department?.department_info_land?.province ?? "",
                district: dataDetails?.department?.department_info_land?.district ?? "",
                ward: dataDetails?.department?.department_info_land?.ward ?? "",
              }}
              disabled={ruleDisabled}
              message={[
                getMessage('province', {position: itemActive?.activeUUID ?? '', type: 'Other'}),
                getMessage('district', {position: itemActive?.activeUUID ?? '', type: 'Other'}),
                getMessage('ward', {position: itemActive?.activeUUID ?? '', type: 'Other'})
              ]}
              required={[true, true, true]}
              onChange={changeLocation}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
            sx={{
              "& .icon-copy": {
                zIndex: "1000",
                position: "absolute",
                cursor: "pointer"
              },
            }}
          >
            <SelectLocation
              col={3}
              disabled={ruleDisabled}
              before={
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
                  <Input
                    label="5. Địa chỉ theo pháp lý"
                    format
                    // required
                    onDebounce={(val) => {
                      onChangeData(val, "certificate_address");
                    }}
                    value={
                      dataDetails?.department?.department_info_land?.certificate_address
                    }
                    disabled={ruleDisabled}
                    message={ getMessage('address', {position: itemActive?.activeUUID ?? '', type: 'certificate'})}
                  />
                  <IconButton 
                    sx={{padding:0}}  
                    className="icon-copy"
                    onClick={openModalGCN}
                  >
                    <IconCopy />
                  </IconButton>
                </Grid>
              }
              onChange={changeLocationCertificate}
              label={["6. Tỉnh/TP", "7. Quận/huyện", "8. Phường/xã"]}
              value={{
                country: "VN",
                province:
                  dataDetails?.department?.department_info_land?.certificate_province ?? "",
                district:
                  dataDetails?.department?.department_info_land?.certificate_district ?? "",
                ward: dataDetails?.department?.department_info_land?.certificate_ward ?? "",
              }}
              message={[
                getMessage('province', {position: itemActive?.activeUUID ?? '', type: 'certificate'}),
                getMessage('district', {position: itemActive?.activeUUID ?? '', type: 'certificate'}),
                getMessage('ward', {position: itemActive?.activeUUID ?? '', type: 'certificate'})
              ]}
              required={[true, true, true]}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AutocompleteMultiple
              label="9. Mục đích sử dụng đất (theo thẩm định giá)"
              tag
              required={Department?.has_certificate === 'Y'}
              disabled={ruleDisabled}
              options={optionsPurposeUsingLane}
              onChange={onHandlePurposeUsingLane}
              ref={purposeUsingLaneElement}
              value={dataDetails?.department?.department_info_land?.use_purposes ?? []}
              sx={SxAutoCompleteTagUsePurposes}
              message={ getMessage('use_purposes', {position: itemActive?.activeUUID ?? ''})}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
              onDebounce={(val) => {
                onChangeData(val, "other_use_purpose");
              }}
              value={dataDetails?.department?.department_info_land?.other_use_purpose}
              disabled={(dataDetails?.department?.department_info_land?.use_purposes?.indexOf("OTHER") === -1 ? true : false) || ruleDisabled}
              required={dataDetails?.department?.department_info_land?.use_purposes?.indexOf("OTHER") === -1 ? false : true}
              message={ getMessage('other_use_purpose', {position: itemActive?.activeUUID ?? ''})}

            />
          </Grid>
        </Grid>
      </CardInside>

      <CardInside
        title="II. Mục đích sử dụng đất theo giấy chứng nhận"
        sx={{
          "& legend": {
            fontSize: "16px",
          },
        }}
      >
        <Grid container spacing={3} className="pl-4 pb-4">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ObjectList
              menu={[
                {
                  value: EActionMenu.DELETE,
                  label: "Xóa",
                }
              ]}
              onClickMenu={onHandleClickMenuDepartmentCer}
              onAdd={onAdd}
              enableAdd={!ruleDisabled}
              enableMenu={!ruleDisabled}
              onChange={onChangeLand}
              labelLength="Mục đích sử dụng đất:&nbsp;"
              current={activeLand}
              options={optionsDep}
              sx={SxOnjectListLandAssets}
            />
          </Grid>
          <Grid item xl={12} lg={6} md={6} sm={12} xs={12}>
            {/* <SelectPurposeUsingLane
              sx={{
                '& .Mui-disabled': {
                  '& input,& .MuiInputAdornment-root,& .MuiSelect-select': {
                    backgroundColor: '#d7d8e4 !important'
                  }
                },
              }}
              label="1. Mục đích sử dụng đất theo GCN"
              onChange={(val) => onChangeDataCertificateData(val, "use_purpose")}
              value={dataDetailsCertificate?.use_purpose}
              required
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              message={ getMessage('use_purpose', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            /> */}
            <Input  
              label="1. Mục đích sử dụng đất theo GCN"  
              required
              maxlength={200}
              value={dataDetailsCertificate?.use_purpose ?? ""}
              onDebounce={(val) => onChangeDataCertificateData(val, "use_purpose")}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              message={ getMessage('use_purpose', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="2. Số thửa đất"
              onDebounce={(val) => onChangeDataCertificateData(val, "land_number")}
              value={dataDetailsCertificate?.land_number?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Tờ bản đồ số"
              onDebounce={(val) => onChangeDataCertificateData(val, "map_number")}
              value={dataDetailsCertificate?.map_number?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Diện tích đất theo GCN (m2)"
              onDebounce={(val) => onChangeDataCertificateData(val, "certificate_area")}
              value={dataDetailsCertificate?.certificate_area?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              required
              maxlength={100}
              message={ getMessage('certificate_area_apa', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Diện tích đất thực tế (m2)"
              onDebounce={(val) => onChangeDataCertificateData(val, "real_area")}
              value={dataDetailsCertificate?.real_area?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              required
              type="number"
              format
              message={ getMessage('real_area_apa', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <SelectOriginLaneUse 
              label="6. Nguồn gốc sử dụng đất theo GCN"
              onChange={(val) => onChangeDataCertificateData(val, "land_use_source")}
              value={dataDetailsCertificate?.land_use_source?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              required
              message={ getMessage('land_use_source_apa', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="7. Nguồn gốc sử dụng đất theo GCN khác"
              onDebounce={(val) => onChangeDataCertificateData(val, "other_land_use_source")}
              value={dataDetailsCertificate?.other_land_use_source?.toString()}
              disabled={dataDetailsCertificate?.land_use_source === "LS_14" ? false : true}
              required={dataDetailsCertificate?.land_use_source === "LS_14" ? true : false}
              message={ getMessage('other_land_use_source', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}

            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Thời hạn sử dụng đất theo GCN"
              onDebounce={(val) => onChangeDataCertificateData(val, "duration")}
              value={dataDetailsCertificate?.duration?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              required
              message={ getMessage('duration', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <SelectLandUseCertified
              sx={{
                '& .Mui-disabled': {
                  '& input,& .MuiInputAdornment-root,& .MuiSelect-select': {
                    backgroundColor: '#d7d8e4 !important'
                  }
                },
              }}
              label="9. Hình thức sử dụng đất theo GCN"
              onChange={(val) => onChangeDataCertificateData(val, "usage_form")}
              value={dataDetailsCertificate?.usage_form?.toString()}
              disabled={disabledInputDepartmentCerPurpose || ruleDisabled}
              required
              message={ getMessage('usage_form_apa', {position: itemActive?.activeUUID ?? '', active: dataDetailsCertificate?.activeUUIDCertificateUsePurposes ?? ''})}
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sử dụng đất theo GCN khác"
              onDebounce={(val) => onChangeDataCertificateData(val, "other_usage_form")}
              value={dataDetailsCertificate?.other_usage_form?.toString()}
              disabled={dataDetailsCertificate?.usage_form === "OTHER" ? false : true}
              required={dataDetailsCertificate?.usage_form === "OTHER" ? true : false}
            />
          </Grid>
        </Grid>

        <ModalConfirm open={ deleteIdCer !== null } onClose={ onHandleCancelConfirmCer } onConfirm={ onHandleConfirmCer }>
          <Box className="text-18 font-medium text-primary text-center">
            Bạn có chắc chắn muốn xóa mục đích?
          </Box>
        </ModalConfirm>
        <ModalCollateralAddress open={isModalOpenReal} onClose={openModalReal} onSave={(data) => {
          onChangeData(data.apartment, "address")
          onChangeData(data.province, 'province');
          onChangeData(data.district, 'district');
          onChangeData(data.ward, 'ward');
          openModalReal()
          notify('Copy địa chỉ thành công', 'success')
        }} />
        <ModalCollateralAddress open={isModalOpenGCN} onClose={openModalGCN} onSave={(data) => {
          onChangeData(data.apartment, 'certificate_address')
          onChangeData(data.province, 'certificate_province');
          onChangeData(data.district, 'certificate_district');
          onChangeData(data.ward, 'certificate_ward');
          openModalGCN()
          notify('Copy địa chỉ thành công', 'success')
        }} />
      </CardInside>
    </>
  );
};

export default LandInfo;
