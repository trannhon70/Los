import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Grid, Typography, TableRow, TableCell, TableBody,Table, Box } from '@mui/material';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import SelectLocation from 'views/components/widgets/SelectLocation';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCollaretalProperty, setMachineLocation } from 'features/loan/normal/storage/collateralV2/actions';
import { getLOANNormalCollateralData, getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import DetailsMachine from './DetailsMachine';
import { formatNumber } from 'utils';
import { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
export interface MachineTypeProps {
  collateralData?: ILOANNormalCollateralData;
}
const MachineType: FC<MachineTypeProps> = (props) => {

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
  const getData = useSelector(getLOANNormalCollateralData());
  const total_value = getDetails?.map(g => g.items.map(i => i.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    collateral && dispatch(setMachineLocation(remain, { uuidData: collateral.uuidActiveData }))
  }
  return <Fragment>
  <Box sx={{paddingLeft:'3%'}}>
  <Table>
    <TableBody>
      <InfoReportCollaretalType 
        onChangeValueCollateral={onHandleChangeKey} 
        collateralData={collateralData} 
      />
      <TableRow>
        <TableCell>
          <Typography color="#1825aa" fontWeight={500}>
            ĐỊA CHỈ THẨM ĐỊNH
          </Typography>
        </TableCell>
        <TableCell className="px-0">
          <Grid container spacing={3}>
            <Grid item xl={9}>
              <SelectLocation
                col={4}
                value={{
                  country: 'VN',
                  province: getData?.province ?? '',
                  district: getData?.district ?? '',
                  ward: getData?.ward ?? ''
                }}
                label={[
                  '1. Tỉnh/TP',
                  '2. Quận/huyện',
                ]}
                onChange={changeLocation}
                isWard={false}
                required={[true,true,true]}
                message={[
                  getMessage('province',{position: collateralData?.uuidActiveData ?? ''}),
                  getMessage('district',{position: collateralData?.uuidActiveData ?? ''})
                ]}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography color="#1825aa" fontWeight={500}>
            Tổng giá trị tsbđ
          </Typography>
        </TableCell>
        <TableCell className="px-0">
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
                message={getMessage('max_percentage',{position: collateralData?.uuidActiveData ?? ''})}
                type="number"
                format
                />
            </Grid>
          </Grid>
        </TableCell>

      </TableRow>

    </TableBody>
  </Table>
  </Box>
    {
      getDetails?.map((item, index) => {
        return (
          < DetailsMachine
            key={index}
            uuid={item.uuidActiveSubtype}
            collateral={collateralData}
            keyIndex={index} />
        )
      })
    }
  </Fragment >

}

export default MachineType;