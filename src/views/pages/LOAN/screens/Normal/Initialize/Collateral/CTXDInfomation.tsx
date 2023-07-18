import { Grid, Typography } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import HorizontalList from 'views/components/layout/HorizontalList';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreColalteralLandCTXD,
  getLOANormalStoreColalteralLandCTXDData,
  getLOANormalStoreColalteralLandCTXDTypeActive,
  getLOANormalStoreColalteralLandCTXDTypeData,
  getLOANormalStoreColalteralLandCTXDTypeDataDetails
} from 'features/loan/normal/storage/collateralV2/selector';
import {
  addLandCTXD,
  addLandCTXDType,
  onChangeHorizonListLandCTXD,
  onChangeHorizonListLandCTXDType,
  setDataLandCTXD,
  setDataLandCTXDLocation,
  setDataLandCTXDLocationCertificate,
  setDataLandCTXDType
} from 'features/loan/normal/storage/collateralV2/actions';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import {
  ICTXDLandData,
  ITypeCTXD
} from 'types/models/loan/normal/storage/CollaretalV2';
import { AiOutlineFileWord } from 'react-icons/ai';
import { SxObjectListTypeCollateral } from './style';
import SelectConstructionPermit from 'views/components/widgets/SelectConstructionPermit';
import SelectConstructionType from 'views/components/widgets/SelectConstructionType';

export interface ICTXDInfomationProps {  // cục B
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: Thông tin CTXD
const CTXDInfomation: FunctionComponent<ICTXDInfomationProps> = (props) => {

  const { activeSubType, uuIdData } = props
  const dispatch = useDispatch()

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData ?? '', activeSubType ?? ""));



  const [ isDisiableInput, setIsDisiableInput ] = useState<boolean>(false);
  ///// CTXD trên đất 

  const onAddCTXDLand = () => {
    dispatch(addLandCTXD('', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? ''
    }));
  }
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuIdData ?? '', activeSubType ?? '', SubTypeItemsActive ?? ''))

  const onChangeHorizonList = (current: number) => {
    const currentActive = data?.dataCTXDLand[current].activeUUIDCTXDLand
    dispatch(onChangeHorizonListLandCTXD(currentActive ?? '', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? ''
    }))
  }


  const optionsData: IGroupListBase[] = data?.dataCTXDLand?.map((__, i) => ({
    value: i + 1,
    label: `CTXD trên đất ${i + 1}`,
    key: i + 1,
  })) ?? []

  const activeCTXD = data?.dataCTXDLand
    ?.findIndex(c => c.activeUUIDCTXDLand === data.activeCTXDLand) ?? 0;

  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDData(uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))

  const onChangedatCTXD = (value: string | number | null, key: keyof ICTXDLandData) => {
    dispatch(setDataLandCTXD(value, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
      key
    }))
  }
  const changeLocationCTSX = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocation(remain, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }

  const changeLocationCTSXCertificate = (dataLocation: SelectLocationValue) => {
    const { country, ...remain } = dataLocation;
    dispatch(setDataLandCTXDLocationCertificate(remain, {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }))
  }

  ////// thong tin loai ctxd

  const onAddCTXDLandType = () => {
    dispatch(addLandCTXDType('', {
      uuidData: uuIdData ?? '',
      uuidSubType: activeSubType ?? '',
      uuidItems: SubTypeItemsActive ?? '',
      uuidCTXDLand: data?.activeCTXDLand ?? '',
    }));
  }

  const dataCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeData(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? '')) ?? []

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

  const optionsDataCTXDLandType: ObjectListOption[] = dataCTXDLandType?.map((item, i) => ({
    label: `CTXD ${i + 1}`,
    circle: <AiOutlineFileWord />,
  })) ?? []

  const activeCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeActive(uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))

  const activeCTXDCTXDLandType = dataCTXDLandType
    ?.findIndex(c => c.activeTypeCTXD === activeCTXDLandType) ?? 0;

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
  const dataCTXDLandTypeDetails = useSelector(getLOANormalStoreColalteralLandCTXDTypeDataDetails(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? '',
    activeCTXDLandType ?? '',
  ))

  useEffect(() =>{
    if(data?.dataCTXDLand){
      dispatch(onChangeHorizonListLandCTXD(data?.dataCTXDLand[0]?.activeUUIDCTXDLand ?? '', {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? ''
      }))
    }
    let isCheck = dataCTXDLandType.length > 0 ? false : true;
    if(isDisiableInput !== isCheck) {
      setIsDisiableInput(isCheck)
    }
  },[dataCTXDLandType])
  return (
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h6" gutterBottom component="div" className="text-upper font-medium text-19">
          B. Thông tin Pháp lý CTXD
        </Typography>
      </Grid>
      <Grid item xl={12}>
        <HorizontalList
          onAdd={onAddCTXDLand}
          enableMenu={false}
          current={activeCTXD}
          options={optionsData}
          onChange={onChangeHorizonList}
        />
      </Grid>
      <Grid item xl={12}>
        <CardInside title="I. Thông tin chung của CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
          <Grid container spacing={3}>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <SelectConstructionPermit 
                label="1. Pháp lý CTXD "
                required
                onChange={(val) => { onChangedatCTXD(val, 'asset_legal')
                  if(dataCTXD?.asset_legal !== "OTHER"){
                    onChangedatCTXD(null, 'legal_CTXD_other')
                  }
                }}
                value={dataCTXD?.asset_legal}
              />
            </Grid>
            <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Pháp lý CTXD khác"
                required={dataCTXD?.asset_legal === "OTHER" ? false : true}
                onDebounce={(val) => { onChangedatCTXD(val, 'legal_CTXD_other') }}
                value={dataCTXD?.legal_CTXD_other}
                disabled={dataCTXD?.asset_legal === "OTHER" ? false : true}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="3. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      required
                      onDebounce={(val) => { onChangedatCTXD(val, 'address') }}
                      value={dataCTXD?.address}
                    />
                  </Grid>
                }
                label={[
                  '4. Tỉnh/TP',
                  '5. Quận/huyện',
                  '6. Phường/xã'
                ]}
                onChange={changeLocationCTSX}
                value={{
                  country: "VN",
                  province: dataCTXD?.provice ?? "",
                  district: dataCTXD?.district ?? "",
                  ward: dataCTXD?.ward ?? ""
                }}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="7. Địa chỉ thực tế nhà ở/CTXD"
                      format
                      required
                      onDebounce={(val) => { onChangedatCTXD(val, 'certificate_address') }}
                      value={dataCTXD?.certificate_address}
                    />
                  </Grid>
                }
                label={[
                  '8. Tỉnh/TP',
                  '9. Quận/huyện',
                  '10. Phường/xã'
                ]}
                onChange={changeLocationCTSXCertificate}
                value={{
                  country: "VN",
                  province: dataCTXD?.certificate_province ?? "",
                  district: dataCTXD?.certificate_district ?? "",
                  ward: dataCTXD?.certificate_ward ?? ""
                }}
              />
            </Grid>
          </Grid>

        </CardInside>
      </Grid>
      <Grid item xl={12}>
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
              <SelectConstructionType 
                label="1. Loại công trình"
                onChange={(val) => { 
                  onChangeDataCTXDLandType(val, 'land_asset_type')
                  if(val !=="OTHER"){
                    onChangeDataCTXDLandType(null, 'land_asset_type_other')
                  } 
                }}
                value={dataCTXDLandTypeDetails?.land_asset_type}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Loại công trình khác"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'land_asset_type_other') }}
                value={dataCTXDLandTypeDetails?.land_asset_type_other}
                disabled={isDisiableInput}
                placeholder="Nhập thông tin loại công trình khác"
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="3. Diện tích xây dựng theo GCN (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_building_area') }}
                value={dataCTXDLandTypeDetails?.certificate_building_area ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="4. Diện tích xây dựng thực tế (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'building_area') }}
                value={dataCTXDLandTypeDetails?.building_area ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="5. Diện tích sàn theo GCN (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_cross_floor_area') }}
                value={dataCTXDLandTypeDetails?.certificate_cross_floor_area ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="6. Diện tích sàn thực tế (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'cross_floor_area') }}
                value={dataCTXDLandTypeDetails?.cross_floor_area ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="7. Diện tích sử dụng theo GCN (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_used_area') }}
                value={dataCTXDLandTypeDetails?.certificate_used_area ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="8. Diện tích sử dụng thực tế (m2)"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'used_area') }}
                value={dataCTXDLandTypeDetails?.used_area ?? ""}
                type="number"
                format
              />
            </Grid>

            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="9. Thời hạn sở hữu"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'ownership_duration') }}
                value={dataCTXDLandTypeDetails?.ownership_duration}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="10. Hình thức sở hữu"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'owner_form') }}
                value={dataCTXDLandTypeDetails?.owner_form}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="11. Kết cấu công trình theo GCN"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_structure') }}
                value={dataCTXDLandTypeDetails?.certificate_structure}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="12. Kết cấu công trình thực tế"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'structure') }}
                value={dataCTXDLandTypeDetails?.structure}
              />
            </Grid>

            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="13. Cấp (Hạng) theo GCN"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_rank') }}
                value={dataCTXDLandTypeDetails?.certificate_rank}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="14. Số tầng theo GCN"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'certificate_floors') }}
                value={dataCTXDLandTypeDetails?.certificate_floors ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="15. Số tầng thực tế"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'floors') }}
                value={dataCTXDLandTypeDetails?.floors ?? ""}
                type="number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="16. Thời gian đưa vào sử dụng"
                onDebounce={(val) => { onChangeDataCTXDLandType(val, 'duration_of_use') }}
                value={dataCTXDLandTypeDetails?.duration_of_use}
              />
            </Grid>



          </Grid>

        </CardInside>
      </Grid>
    </Grid>
  )
}

export default CTXDInfomation;

