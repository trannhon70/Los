import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import {
  SxOnjectListLandAssets,
  SxSelectDisiable
} from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import { useDispatch, useSelector } from 'react-redux';
import {
  onChangeLandCTXDTypeApproval
} from 'features/loan/normal/storageApproval/collateral/actions';
import { FaWarehouse } from 'react-icons/fa';
import SelectConstructionType from 'views/components/widgets/SelectConstructionType';
import {
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreColalteralLandCTXDApproval,
  getLOANormalStoreColalteralLandCTXDTypeActiveApproval,
  getLOANormalStoreColalteralLandCTXDTypeDataApproval,
  getLOANormalStoreColalteralLandCTXDTypeDataDetailsApproval,
  getLOANormalStoreColalteralLandCTXDUuidActiveApproval
} from 'features/loan/normal/storageApproval/collateral/selector';
export interface CTXDInformationTypeLandProps {
  activeSubType?: string;
  uuIdData?: string;
}

// TODO: CTXD Thôn tin loai
const InformationTypeLand: FunctionComponent<CTXDInformationTypeLandProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props
  const dispatch = useDispatch();

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActiveApproval(uuIdData, activeSubType));
  const data = useSelector(getLOANormalStoreColalteralLandCTXDApproval(uuIdData, activeSubType, SubTypeItemsActive ?? ""))
  const dataCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeDataApproval(
    uuIdData,
    activeSubType,
    SubTypeItemsActive ?? ""
  )) ?? []
  
  const uuidActiveCTXDLand = useSelector(getLOANormalStoreColalteralLandCTXDUuidActiveApproval(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''
  ));

  const activeCTXDLandType = useSelector(getLOANormalStoreColalteralLandCTXDTypeActiveApproval(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))

  const dataCTXDLandTypeDetails = useSelector(getLOANormalStoreColalteralLandCTXDTypeDataDetailsApproval(
    uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? '',
    activeCTXDLandType ?? '',
  ))

  // console.log({dataCTXDLandTypeDetails});
  
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

  const activeCTXDCTXDLandType = dataCTXDLandType?.findIndex(c => c.activeTypeCTXD === activeCTXDLandType) ?? 0;

  /**
   * Change active loại công trình
   */
  const onChangeCTXDLandType = (current: number) => {
    const currentActive = dataCTXDLandType[current]?.activeTypeCTXD
    dispatch(onChangeLandCTXDTypeApproval(
      currentActive ?? 0,
      {
        uuidData: uuIdData ?? '',
        uuidSubType: activeSubType ?? '',
        uuidItems: SubTypeItemsActive ?? '',
        uuidCTXDLand: data?.activeCTXDLand ?? ''
      }))
  }
  
  return (
    <CardInside title="II. Thông tin loại CTXD" fieldsetClass="px-4" classBody="h-full p-6" >
      <ObjectList
        enableAdd={false}
        enableMenu={false}
        current={activeCTXDCTXDLandType}
        labelLength="Loại CTXD : &nbsp;"
        onChange={onChangeCTXDLandType}
        options={optionsDataCTXDLandType}
        sx={SxOnjectListLandAssets}
      />

      <Grid container spacing={3} className='mt-5'>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <SelectConstructionType
            label="1. Loại công trình"
            required
            value={dataCTXDLandTypeDetails?.land_asset_type}
            disabled
            sx={SxSelectDisiable}
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="2. Loại công trình khác"
            value={dataCTXDLandTypeDetails?.land_asset_type_other}
            disabled
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="3. Diện tích xây dựng theo GCN (m2)"
            value={dataCTXDLandTypeDetails?.certificate_building_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="4. Diện tích xây dựng thực tế (m2)"
            value={dataCTXDLandTypeDetails?.building_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="5. Diện tích sàn theo GCN (m2)"
            value={dataCTXDLandTypeDetails?.certificate_cross_floor_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="6. Diện tích sàn thực tế (m2)"
            value={dataCTXDLandTypeDetails?.cross_floor_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="7. Diện tích sử dụng theo GCN (m2)"
            value={dataCTXDLandTypeDetails?.certificate_used_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="8. Diện tích sử dụng thực tế (m2)"
            value={dataCTXDLandTypeDetails?.used_area ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="9. Thời hạn sở hữu"
            value={dataCTXDLandTypeDetails?.ownership_duration}
            disabled
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="10. Hình thức sở hữu"
            value={dataCTXDLandTypeDetails?.owner_form}
            disabled
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="11. Kết cấu công trình theo GCN"
            value={dataCTXDLandTypeDetails?.certificate_structure}
            disabled
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="12. Kết cấu công trình thực tế"
            value={dataCTXDLandTypeDetails?.structure}
            disabled
          />
        </Grid>

        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="13. Cấp (Hạng) theo GCN"
            value={dataCTXDLandTypeDetails?.certificate_rank}
            disabled
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="14. Số tầng theo GCN"
            value={dataCTXDLandTypeDetails?.certificate_floors ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="15. Số tầng thực tế"
            value={dataCTXDLandTypeDetails?.floors ?? ""}
            disabled
            type="number"
            format
          />
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="16. Thời gian đưa vào sử dụng"
            value={dataCTXDLandTypeDetails?.duration_of_use}
            disabled
          />
        </Grid>
      </Grid>

    </CardInside>
  )
}

export default InformationTypeLand;

