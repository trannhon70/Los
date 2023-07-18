import { Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import HorizontalList from 'views/components/layout/HorizontalList';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import { SxObjectListTypeCollateral } from '../../../style';
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
import CTXDLandInformationGeneral from './InformationGeneral';
import InformationTypeLand from './InformationTypeLand';

export interface CTXDLandProps {
  activeSubType?: string;
  collateralType?: string;
  uuIdData?: string;
}

// TODO: CTXD trên đất
const CTXDLand: FunctionComponent<CTXDLandProps> = (props) => {

  const { activeSubType, uuIdData } = props
  const dispatch = useDispatch()

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuIdData ?? '', activeSubType ?? ""));
  const data = useSelector(getLOANormalStoreColalteralLandCTXD(uuIdData ?? '', activeSubType ?? '', SubTypeItemsActive ?? ''))
  const dataCTXD = useSelector(getLOANormalStoreColalteralLandCTXDData(uuIdData ?? '',
    activeSubType ?? '',
    SubTypeItemsActive ?? ''))


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


  return (
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h6" gutterBottom component="div" className="font-medium text-19">
          B. Thông tin Pháp lý CTXD
        </Typography>
      </Grid>
      <Grid item xl={12}>
        <CTXDLandInformationGeneral
          activeSubType={activeSubType}
          uuIdData={uuIdData}
        />
      </Grid>

      <Grid item xl={12}>
        <InformationTypeLand 
          activeSubType={activeSubType}
          uuIdData={uuIdData}
        />
      </Grid>
    </Grid>
  )
}

export default CTXDLand;

