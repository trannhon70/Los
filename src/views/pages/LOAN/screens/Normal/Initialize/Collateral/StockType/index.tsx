import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import {  Grid, Typography, TableRow, TableCell } from '@mui/material';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import DetailsStock from './DetailsStock';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCollaretalProperty } from 'features/loan/normal/storage/collateralV2/actions';
import { getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import { formatNumber } from 'utils';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { Box } from '@mui/system';
export interface StockTypeProps {
  collateralData?: ILOANNormalCollateralData;
}
const StockType: FC<StockTypeProps> = (props) => {

  const dispatch = useDispatch();
  const { collateralData } = props;
  const [collateral, setCollateral] = useState<ILOANNormalCollateralData | undefined>(collateralData);
  // const getDataDetails = useSelector()


  useEffect(() => {
    if (collateralData && collateral?.uuidActiveData !== collateralData.uuidActiveData) {
      setCollateral(collateralData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])
  const getMessage = useNormalCollateralMessage();
  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateral && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateral.uuidActiveData }));
  }
  const getDetails = useSelector(getLoanNormalSubType(collateral?.uuidActiveData ?? ''));
  const total_value = getDetails?.map(g => g.items.map(i => i.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0)

  return <Fragment>
    <Box sx={{ paddingLeft: '3%' }}>

    <InfoReportCollaretalType onChangeValueCollateral={onHandleChangeKey} collateralData={collateralData}/>
    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className='ml-0 pl-0'>
        <Grid container spacing={3} className='ml-0'>
          <Grid item xl={4} className='pl-0'>
          <Input
              label="1. Tổng giá trị định giá (VNĐ)"
              required
              disabled
              sx={{
                "& .Mui-disabled": {
                  color: "var(--mscb-danger)",
                  fontSize: "14px",
                  fontWeight: "500",
                  WebkitTextFillColor: "unset"
                }
              }}
              value={formatNumber(total_value?.toString()) ?? ''}
            />
          </Grid>
          <Grid item xl={3}>
            <Input
                onDebounce={(val) => onHandleChangeKey(val, 'max_percentage')}
                placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
                value={collateral?.max_percentage?.toString()}
                label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
                required 
                type="number"
                format
                message={getMessage('max_percentage',{position: collateral?.uuidActiveData ?? ''})}
            />
          </Grid>
        </Grid>
      </TableCell>

    </TableRow>
    </Box>
    <div></div>

    {
      getDetails?.map((item, index) => {
        return (
          < DetailsStock
            uuid={item.uuidActiveSubtype}
            collateral={collateralData}
            keyIndex={index} 
            key={index}        
          />
      )
    })}
  </Fragment>

}

export default StockType;