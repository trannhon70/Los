import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Box, Divider, Grid, TableCell, TableRow, Typography } from '@mui/material';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import { onChangeCollaretalProperty } from 'features/loan/normal/storage/collateralV2/actions';
import DetailsDeposit from './DetailsDeposit';
import { formatNumber } from 'utils';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
export interface DepositsTypeProps {
  collateralData?: ILOANNormalCollateralData;
}

const DepositsType: FC<DepositsTypeProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData } = props;
  const [collateral, setCollateral] = useState<ILOANNormalCollateralData | undefined>(collateralData);

  const getMessage = useNormalCollateralMessage();
  
  useEffect(() => {
    if (collateralData && collateral?.uuidActiveData !== collateralData.uuidActiveData) {
      setCollateral(collateralData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])

  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateral && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateral.uuidActiveData }));
  }

  const getDetails = useSelector(getLoanNormalSubType(collateral?.uuidActiveData ?? ''));
  const total_value = getDetails?.map(g => g.items.map(i => i.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0)

  return <Fragment>
    <Box sx={{paddingLeft:'3%'}}>
    <InfoReportCollaretalType onChangeValueCollateral={onHandleChangeKey} collateralData={collateralData} />
    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
          TỔNG GIÁ TRỊ TSDB
        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input label="1. Tổng giá trị định giá (VNĐ)"
              required
              value={formatNumber(total_value?.toString()) ?? ''}
              sx={{
                "& .Mui-disabled": {
                  color: "var(--mscb-danger)",
                  fontSize: "14px",
                  fontWeight: "500",
                  WebkitTextFillColor: "unset"
                }
              }}
              disabled />
          </Grid>
          <Grid item xl={3}>
            <Input 
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" 
              required
              type="number"
              format
              placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
              onDebounce={(val) => onHandleChangeKey(val, 'max_percentage')}
              value={collateral?.max_percentage?.toString()}
              message={getMessage('max_percentage',{position: collateralData?.uuidActiveData ?? ''})}
            />
          </Grid>
        </Grid>
      </TableCell>

    </TableRow>
    </Box>
    <div></div>

    {getDetails?.map((item, index) => {
      return (
        <DetailsDeposit
          key={index}
          uuid={item.uuidActiveSubtype}
          collateral={collateralData}
          keyIndex={index} />
      )
    })}
    
  </Fragment>

}

export default DepositsType;