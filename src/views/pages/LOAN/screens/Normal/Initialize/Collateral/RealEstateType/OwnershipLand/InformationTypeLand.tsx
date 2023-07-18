import { Box, Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import ObjectList, { ObjectListMenuItem, ObjectListOption } from 'views/components/layout/ObjectList';
import { SxOnjectListLandAssets, SxSelectDisiable } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXD,
  getLOANormalStoreColalteralLandCTXDTypeActive,
  getLOANormalStoreColalteralLandCTXDTypeData,
  getLOANormalStoreColalteralLandCTXDTypeDataDetails,
  getLOANormalStoreColalteralLandCTXDUuidActive,
  getTypeLand,
  getLOANormalStoreColalteralLandCTXDGcnQshUuidActive,
} from 'features/loan/normal/storage/collateralV2/selector';
import {
  addLandCTXDType,
  onChangeLandCTXDType,
  removeLandCTXDType,
  setDataLandCTXDType
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  ITypeCTXD
} from 'types/models/loan/normal/storage/CollaretalV2';
import useNotify from 'app/hooks/useNotify';
import { EActionMenu, ETypeLandName } from 'features/loan/normal/storage/collateralV2/case';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { FaWarehouse } from 'react-icons/fa';
import SelectConstructionType from 'views/components/widgets/SelectConstructionType';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface CTXDInformationTypeLandProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin loai
const InformationTypeLand: FunctionComponent<CTXDInformationTypeLandProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props
  const dispatch = useDispatch();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const CTXDGcnQshUuidActive = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshUuidActive(uuIdData, activeSubType));
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData, activeSubType));
  const TypeLand = useSelector(getTypeLand(uuIdData, activeSubType, SubTypeItemsActive ?? ""))
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuIdData, activeSubType, SubTypeItemsActive ?? ""))
  // const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDData(uuIdData ?? '',
  // activeSubType ?? '',
  // SubTypeItemsActive ?? ''))
  const dataCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeData(
    uuIdData,
    activeSubType,
    SubTypeItemsActive ?? ""
  )) ?? []
  const uuidActiveCTXDLand = useSelector(getLOANormalStoreColalteralLandCTXDUuidActive(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''
  ));

  const activeCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeActive(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))

  const dataCTXDLandTypeDetails = useSelector(getLOANormalStoreColalteralLandCTXDTypeDataDetails(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? '',
    activeCTXDLandType ?? '',
  ))

  const [isDisiableInput, setIsDisiableInput] = useState<boolean>(false);
  const [deleteIdLandType, setDeleteIdLandType] = useState<ITypeCTXD | null>(null);

  useEffect(() => {
    let isCheck = dataCTXDLandType.length > 0 ? false : true;
    if (isDisiableInput !== isCheck) {
      setIsDisiableInput(isCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCTXDLandType])


  useEffect(() => {
    /**
    * Check active land type
    * if undifind || lenght == 0
    * disiable input
    */
    if (
      activeCTXDLandType?.length === 0
      && !isDisiableInput
    ) {
      setIsDisiableInput(true);
    }

    let isCheckCTXD = data ? (data?.dataCTXDLand?.length > 0 ? false : true) : true;
    if (activeCTXDLandType && activeCTXDLandType.length > 0 && !isCheckCTXD) {
      setIsDisiableInput(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCTXDLandType])

  /**
   * Idnex dánh sách công trình trên đất
   */
  let indexCTXDLand = (data && data.dataCTXDLand?.findIndex(l => l.activeUUIDCTXDLand === uuidActiveCTXDLand)) ?? 0;
  const optionsDataCTXDLandType: ObjectListOption[] = dataCTXDLandType?.map((item, i) => ({
    label: `CTXD
      ${indexCTXDLand + 1}.${i + 1}
      `,
    circle: <FaWarehouse />,
  })) ?? []

  const onAddCTXDLandType = () => {

    /**
     * Nếu type land -> CTXD có GCN QSH riêng
     * Check CTXDGcnQshUuidActive not emty
     * Mới được thêm
     */
    if (
      CTXDGcnQshUuidActive?.length === 0
      && ETypeLandName.CTXD_GCN === TypeLand
    ) {
      notify("Vui lòng chọn GCN QSH CTXD", "warning")
      return
    }

    /**
     * Check số lượng công trình trên đất
     */
    if (data?.dataCTXDLand?.length === 0 && ETypeLandName.CTXD_GCN !== TypeLand) {
      notify("Vui lòng thêm CTXD trên đất", "warning")
    }
    /**
     * Check active công trình trên đât
     */
    else if (
      (uuidActiveCTXDLand?.length === 0 || !uuidActiveCTXDLand)
      && ETypeLandName.CTXD_GCN !== TypeLand
    ) {
      notify("Vui lòng chọn CTXD trên đất", "warning")
    }
    else {
      dispatch(addLandCTXDType('', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
      }));
    }
  }

  const activeCTXDCTXDLandType = dataCTXDLandType?.findIndex(c => c.activeTypeCTXD === activeCTXDLandType) ?? 0;

  /**
   * Change active loại công trình
   */
  const onChangeCTXDLandType = (current: number) => {
    const currentActive = dataCTXDLandType[current]?.activeTypeCTXD
    dispatch(onChangeLandCTXDType(
      currentActive ?? 0,
      {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? ''
      }))
  }

  /**
   * Get active object list data land type
   */
  const onChangeDataCTXDLandType = (value: string | number | null, key: keyof ITypeCTXD) => {
    dispatch(setDataLandCTXDType(value, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
      uuidCTXDLandType: activeCTXDLandType ?? '',
      key
    }))
  }

  /**
   * Action menu onject list CTXD Land Type
   *
   */
  const onHandleClickMenuCTXDTypeLand = (menu: ObjectListMenuItem, position: number) => {
    let _CTXDLandType = dataCTXDLandType.find(
      (lt, index) => index === position
    )
    if (menu.value === EActionMenu.DELETE) {
      _CTXDLandType && setDeleteIdLandType(_CTXDLandType)
    }
  }

  /**
   * Action menu close modal confirm delete CTXD Land type
   *
   */
  const onHandleCancelConfirmCTXDLandType = () => setDeleteIdLandType(null);

  /**
   * Action menu success delete CTXD Land type
   *
   */
  const onHandleConfirmCTXDLandtype = () => {
    let _uuidDelete = deleteIdLandType?.activeTypeCTXD;

    if (!_uuidDelete) {
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    } else {
      let indexCTXDTypeLand = dataCTXDLandType?.findIndex(
        ((clt) => clt.activeTypeCTXD === _uuidDelete)
      );
      dispatch(removeLandCTXDType(_uuidDelete, {
        type: TypeLand,
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
        price_cert_uuid: "",
        price_cert_asset_uuid: "",
        land_const_uuid: "",
        land_const_item_uuid: "",
        land_const_item_detail_uuid: "",
      }));

      notify(`Xóa loại CTXD  ${indexCTXDLand + 1}.${indexCTXDTypeLand + 1} thành công`, 'success');
    }

    onHandleCancelConfirmCTXDLandType();
  }
  const getMessage = useNormalCollateralMessage();
  return (
    <CardInside title="II. Thông tin loại CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
      <ObjectList
        enableAdd={!ruleDisabled}
        enableMenu={!ruleDisabled}
        menu={[
          {
            label: "Xóa",
            value: EActionMenu.DELETE,
            // isDanger: true
          }
        ]}
        onClickMenu={onHandleClickMenuCTXDTypeLand}
        current={activeCTXDCTXDLandType}
        labelLength="Loại CTXD : &nbsp;"
        onAdd={onAddCTXDLandType}
        onChange={onChangeCTXDLandType}
        options={optionsDataCTXDLandType}
        sx={SxOnjectListLandAssets}
      />

      <Grid container spacing={3} className='mt-5'>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <SelectConstructionType
            label="1. Loại công trình"
            required
            onChange={(val) => {
              onChangeDataCTXDLandType(val, 'land_asset_type')
              if (val !== "OTHER") {
                onChangeDataCTXDLandType(null, 'land_asset_type_other')
              }
            }}
            value={dataCTXDLandTypeDetails?.land_asset_type}
            disabled={isDisiableInput || ruleDisabled}
            sx={SxSelectDisiable}
            message={getMessage('land_asset_type', {
              position: SubTypeItemsActive ?? "",
              active: TypeLand === "CTXD_GCN" ? "" : uuidActiveCTXDLand ?? "",
              type: TypeLand,
              gcnUuid: TypeLand === "CTXD_GCN" ? CTXDGcnQshUuidActive ?? "" : "",
              child: activeCTXDLandType ?? "",
            })}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="2. Loại công trình khác"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'land_asset_type_other') }}
            value={dataCTXDLandTypeDetails?.land_asset_type_other}
            disabled={(dataCTXDLandTypeDetails?.land_asset_type === "OTHER" ? false : true) || ruleDisabled}
            placeholder="Nhập thông tin loại công trình khác"
          // message={getMessage('land_asset_type_other',{
          //   position: SubTypeItemsActive ?? '',
          //   active: data?.activeCTXDLand ?? '',
          //   child: dataCTXD?.activeUUIDtypeCTXD ?? '',
          //   type: TypeLand,
          //   gcnUuid: CTXDGcnQshUuidActive ?? ''
          // })}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="3. Diện tích xây dựng theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_building_area') }}
            value={dataCTXDLandTypeDetails?.certificate_building_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="4. Diện tích xây dựng thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'building_area') }}
            value={dataCTXDLandTypeDetails?.building_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="5. Diện tích sàn theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_cross_floor_area') }}
            value={dataCTXDLandTypeDetails?.certificate_cross_floor_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="6. Diện tích sàn thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'cross_floor_area') }}
            value={dataCTXDLandTypeDetails?.cross_floor_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="7. Diện tích sử dụng theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_used_area') }}
            value={dataCTXDLandTypeDetails?.certificate_used_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="8. Diện tích sử dụng thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'used_area') }}
            value={dataCTXDLandTypeDetails?.used_area ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="9. Thời hạn sở hữu"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'ownership_duration') }}
            value={dataCTXDLandTypeDetails?.ownership_duration}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="10. Hình thức sở hữu"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'owner_form') }}
            value={dataCTXDLandTypeDetails?.owner_form}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="11. Kết cấu công trình theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_structure') }}
            value={dataCTXDLandTypeDetails?.certificate_structure}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="12. Kết cấu công trình thực tế"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'structure') }}
            value={dataCTXDLandTypeDetails?.structure}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="13. Cấp (Hạng) theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_rank') }}
            value={dataCTXDLandTypeDetails?.certificate_rank}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="14. Số tầng theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_floors') }}
            value={dataCTXDLandTypeDetails?.certificate_floors ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="15. Số tầng thực tế"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'floors') }}
            value={dataCTXDLandTypeDetails?.floors ?? ""}
            disabled={isDisiableInput || ruleDisabled}
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="16. Thời gian đưa vào sử dụng"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'duration_of_use') }}
            value={dataCTXDLandTypeDetails?.duration_of_use}
            disabled={isDisiableInput || ruleDisabled}
          />
        </Grid>
      </Grid>

      <ModalConfirm open={deleteIdLandType !== null} onClose={onHandleCancelConfirmCTXDLandType} onConfirm={onHandleConfirmCTXDLandtype}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa loại CTXD ?
        </Box>
      </ModalConfirm>
    </CardInside>
  )
}

export default InformationTypeLand;

