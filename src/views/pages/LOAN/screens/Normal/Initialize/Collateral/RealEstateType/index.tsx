import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableClassificationInfo from './TableClassificationInfo';
import TableTotalValueAssets from './TableTotalValueAssets';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import { onChangeCollaretalProperty } from 'features/loan/normal/storage/collateralV2/actions';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { Box } from '@mui/material';
export interface IRealEstateTypeProps{
  collateralData?: ILOANNormalCollateralData;
}


// TODO: Bất động sản
const RealEstateType: FC<IRealEstateTypeProps> = (props) => {

  const dispatch = useDispatch();
  const { collateralData } = props;

  const [collateral, setCollateral] = useState<ILOANNormalCollateralData | undefined>(collateralData);

  useEffect(() => {
    if (collateralData && collateral?.uuidActiveData !== collateralData.uuidActiveData){
      setCollateral(collateralData);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])

  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateral && dispatch(onChangeCollaretalProperty(value,{ key: key, uuid: collateral.uuidActiveData}));
  }

  return (
    <Fragment >
      <Box sx={{paddingLeft:'3%'}}>
      <Table >
        <TableBody>
        <InfoReportCollaretalType onChangeValueCollateral={onHandleChangeKey} collateralData={collateralData} />
          <TableClassificationInfo 
            onChangeValueCollateral={ (value, key) => onHandleChangeKey(value, key)}
            collateralData={collateral}
          />
          <TableTotalValueAssets
            onChangeValueCollateral={ (value, key) => onHandleChangeKey(value, key)}
            collateralData={collateral}
          />
        </TableBody>
      </Table >
      </Box>
    </Fragment>
  )
}

export default RealEstateType;