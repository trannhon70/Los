import { Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import { SxObjectListTypeCollateral } from '../../../style';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXD,
  getLOANormalStoreColalteralLandCTXDTypeActive,
  getLOANormalStoreColalteralLandCTXDTypeData,
  getLOANormalStoreColalteralLandCTXDTypeDataDetails,
  getLOANormalStoreColalteralLandCTXDUuidActive
} from 'features/loan/normal/storage/collateralV2/selector';
import {
  addLandCTXDType,
  onChangeHorizonListLandCTXDType,
  setDataLandCTXDType
} from 'features/loan/normal/storage/collateralV2/actions';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import {
  ICTXDLandData,
  ITypeCTXD
} from 'types/models/loan/normal/storage/CollaretalV2';
import { AiOutlineFileWord } from 'react-icons/ai';
import useNotify from 'app/hooks/useNotify';

export interface CTXDInformationTypeLandProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin loai
const InformationTypeLand: FunctionComponent<CTXDInformationTypeLandProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props
  const dispatch = useDispatch();
  const notify = useNotify();

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData , activeSubType)) ;
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuIdData , activeSubType , SubTypeItemsActive ?? ""))
  const dataCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeData(
    uuIdData ,
    activeSubType ,
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

  const [isDisiableInput, setIdDisiableInput] = useState<boolean>(false);

  useEffect(() => {
    let isCheck = dataCTXDLandType.length > 0 ? false : true;
    if(isDisiableInput !== isCheck) {
      setIdDisiableInput(isCheck)
    }
  }, [dataCTXDLandType])

  useEffect(() => {
    /**
     * Check active land type
     * if undifind || lenght == 0
     * disiable input
     */
    if(
      (!activeCTXDLandType || activeCTXDLandType.length === 0)
      && !isDisiableInput
    ){
      setIdDisiableInput(true);
    }
  }, [activeCTXDLandType])


  let indexCTXDLand = (data && data.dataCTXDLand?.findIndex(l=> l.activeUUIDCTXDLand === uuidActiveCTXDLand)) ?? 0;
  const optionsDataCTXDLandType: ObjectListOption[] = dataCTXDLandType?.map((item, i) => ({
    label: `CTXD 
      ${indexCTXDLand + 1 }.${i + 1}
      `,
    circle: <AiOutlineFileWord />,
  })) ?? []

  const onAddCTXDLandType = () => {
    /**
     * Check số lượng công trình trên đất
     */
    if(data?.dataCTXDLand?.length === 0){
      notify("Vui lòng thêm CTXD trên đất", "warning")
    }
    /**
     * Check active công trình trên đât
     */
    else if(uuidActiveCTXDLand?.length === 0 || !uuidActiveCTXDLand){
      notify("Vui lòng chọn CTXD trên đất", "warning")
    }
    else{
      dispatch(addLandCTXDType('', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? '',
      }));
    }
  }

  /**
   * Change active loại công trình
   */
  const onChangeCTXDLandType = (current: number) => {
    const currentActive = dataCTXDLandType[current].activeTypeCTXD
    dispatch(onChangeHorizonListLandCTXDType(
      currentActive ?? '',
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
  const activeCTXDCTXDLandType = dataCTXDLandType?.findIndex(c => c.activeTypeCTXD === activeCTXDLandType) ?? 0;

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

  
  return (
    <CardInside title="II. Thông tin loại CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
      <ObjectList
        enableAdd={true}
        enableMenu={false}
        current={activeCTXDCTXDLandType}
        labelLength="Loại CTXD"
        onAdd={onAddCTXDLandType}
        onChange={onChangeCTXDLandType}
        options={optionsDataCTXDLandType}
        sx={SxObjectListTypeCollateral}
      />

      <Grid container spacing={3} className='mt-5'>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="1. Loại công trình"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'land_asset_type') }}
            value={dataCTXDLandTypeDetails?.land_asset_type}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="2. Loại công trình khác"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'land_asset_type_other') }}
            value={dataCTXDLandTypeDetails?.land_asset_type_other}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="3. Diện tích xây dựng theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_building_area') }}
            value={dataCTXDLandTypeDetails?.certificate_building_area}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="4. Diện tích xây dựng thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'building_area') }}
            value={dataCTXDLandTypeDetails?.building_area}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="5. Diện tích sàn theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_cross_floor_area') }}
            value={dataCTXDLandTypeDetails?.certificate_cross_floor_area}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="6. Diện tích sàn thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'cross_floor_area') }}
            value={dataCTXDLandTypeDetails?.cross_floor_area}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="7. Diện tích sử dụng theo GCN (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_used_area') }}
            value={dataCTXDLandTypeDetails?.certificate_used_area}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="8. Diện tích sử dụng thực tế (m2)"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'used_area') }}
            value={dataCTXDLandTypeDetails?.used_area}
            disabled={isDisiableInput}
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="9. Thời hạn sở hữu"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'ownership_duration') }}
            value={dataCTXDLandTypeDetails?.ownership_duration}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="10. Hình thức sở hữu"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'owner_form') }}
            value={dataCTXDLandTypeDetails?.owner_form}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="11. Kết cấu công trình theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_structure') }}
            value={dataCTXDLandTypeDetails?.certificate_structure}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="12. Kết cấu công trình thực tế"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'structure') }}
            value={dataCTXDLandTypeDetails?.structure}
            disabled={isDisiableInput}
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="13. Cấp (Hạng) theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_rank') }}
            value={dataCTXDLandTypeDetails?.certificate_rank}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="14. Số tầng theo GCN"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_floors') }}
            value={dataCTXDLandTypeDetails?.certificate_floors}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="15. Số tầng thực tế"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'floors') }}
            value={dataCTXDLandTypeDetails?.floors}
            disabled={isDisiableInput}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="16. Thời gian đưa vào sử dụng"
            onDebounce={(val) => { onChangeDataCTXDLandType(val, 'duration_of_use') }}
            value={dataCTXDLandTypeDetails?.duration_of_use}
            disabled={isDisiableInput}
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}

export default InformationTypeLand;

