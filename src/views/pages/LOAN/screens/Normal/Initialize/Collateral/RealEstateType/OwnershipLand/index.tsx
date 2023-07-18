import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import ObjectList from 'views/components/layout/ObjectList';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { SxObjectListTypeCollateral } from '../../style';
import CollateralLegal from './LegalLand';
import { ILOANNormalCollateralData } from 'types/models/loan/normal/storage/CollaretalV2';
import { 
  setTypeLand, 
} from 'features/loan/normal/storage/collateralV2/actions';
import { ETypeLand, ETypeLandName } from 'features/loan/normal/storage/collateralV2/case';
import CTXDLand from './CTXDLand';
import CTXDGcn from './CTXDGcn';
import AssessmentInfomation from '../../AssessmentInfomation';
import ActionTypeLand from './ActionTypeLand';
import { getLoanNormalSubTypeItemsActive, getTypeLand } from 'features/loan/normal/storage/collateralV2/selector';
import { getUuidItemActive } from './../../../../../../../../../features/loan/normal/storage/collateralV2/selector';

export interface IOwnershipLandProps {
  uuIdSubType?: string;
  collateral?: ILOANNormalCollateralData;
}

const OwnershipLand: FC<IOwnershipLandProps> = (props) => {

  const { uuIdSubType = "", collateral } = props;

  const dispatch = useDispatch();

  const [currentTypeDefault, setCurrentTypeDefault] = useState<number>(0);

  const uuidActiveData = collateral?.uuidActiveData ?? "";

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive( uuidActiveData, uuIdSubType ));
  const TypeLand = useSelector(getTypeLand(uuidActiveData, uuIdSubType, SubTypeItemsActive ?? ""));
  const data = useSelector(getUuidItemActive(uuidActiveData,uuIdSubType,SubTypeItemsActive))

  useEffect(() => {
    if(TypeLand === ETypeLandName.LAND && currentTypeDefault !== 0){
      setCurrentTypeDefault(0);

      // setTimeout(() => {
      dispatch(setTypeLand(0, { uuidData: uuidActiveData, uuIdSubType: uuIdSubType} ))
      // }, 0.5);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[TypeLand])

  const onChangeType = (current: number) => {
    if (currentTypeDefault !== current) {
      setCurrentTypeDefault(current);
    }
    // setTimeout(() => {
      dispatch(setTypeLand(current, { uuidData: uuidActiveData, uuIdSubType: uuIdSubType} ))
    // }, 0.8);
  }

  return (
    <Grid container spacing={3} >
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <ObjectList
          enableAdd={false}
          onChange={(current) => onChangeType(current)}
          enableMenu={false}
          labelLength="Chọn loại"
          current={currentTypeDefault}
          options={[
            { label: 'Đất', circle: <FaHandHoldingUsd className='land'/> },
            { label: 'CTXD trên đất', circle: <FaHandHoldingUsd className='ctxd-land'/> },
            { label: 'CTXD có GCN QSH riêng', circle: <FaHandHoldingUsd className='ctxd-gcn-land'/> }
          ]}
          sx={SxObjectListTypeCollateral}
        />
      </Grid>
      
      <ActionTypeLand 
        currentType={currentTypeDefault}
        uuidActiveData={uuidActiveData}
        uuIdSubType={uuIdSubType}
      />

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <AssessmentInfomation 
          uuidData={uuidActiveData}
          uuidSubtype={uuIdSubType}
        />
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        {
          (() => {
            if (currentTypeDefault === ETypeLand.LAND) { // A đát
              return (
                <CollateralLegal
                  activeSubType={uuIdSubType}
                  uuIdSubType={collateral?.uuidActiveSubtype ?? ""}
                  uuIdData={collateral?.uuidActiveData ?? ""}
                />
              )
            } else if (currentTypeDefault === ETypeLand.CTXD_LAND) { // B CTXD tren dat
              return (
                <CTXDLand
                  activeSubType={uuIdSubType}
                  collateralType={collateral?.uuidActiveSubtype ?? ""}
                  uuIdData={collateral?.uuidActiveData ?? ""}
                />
              )
            } else if (currentTypeDefault === ETypeLand.CTXD_GCN) { // CTXD có GCN QSH riêng
              return (
                <CTXDGcn
                  uuidData={collateral?.uuidActiveData ?? ""}
                  uuidSubType={uuIdSubType}
                />
              )
            }
          }
          )()
        }
      </Grid>
    </Grid>
  )
}

export default OwnershipLand;