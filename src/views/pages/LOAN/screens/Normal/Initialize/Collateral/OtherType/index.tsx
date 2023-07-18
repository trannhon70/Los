import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Grid, Typography, TableRow, TableCell, Box } from '@mui/material';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCollaretalProperty } from 'features/loan/normal/storage/collateralV2/actions';
import { getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import DetailsOther from './DetailsOther';
import { formatNumber } from 'utils';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
export interface OtherTypeProps {
  collateralData?: ILOANNormalCollateralData;
}

const OtherType: FC<OtherTypeProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData } = props;
  const getMessage = useNormalCollateralMessage();
  const [collateral, setCollateral] = useState<ILOANNormalCollateralData | undefined>(collateralData);

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
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
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
              value={formatNumber(total_value?.toString()) ?? ''}/>
              
          </Grid>
          <Grid item xl={3}>
            <Input label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
              required
              type="number"
              format
              onDebounce={(val) => onHandleChangeKey(val, 'max_percentage')}
              value={collateral?.max_percentage?.toString()} 
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
          < DetailsOther
            key={index}
            uuid={item.uuidActiveSubtype}
            collateral={collateralData}
            keyIndex={index} />
        )
    })}


  </Fragment>

}

export default OtherType;