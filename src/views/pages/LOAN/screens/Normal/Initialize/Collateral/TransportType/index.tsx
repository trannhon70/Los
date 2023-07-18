import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Grid, TableCell, TableRow, Typography } from '@mui/material';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import { ILOANNormalCollateralData, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import DetailsTransport from './DetailsTransport';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCollaretalProperty, setMachineLocation } from 'features/loan/normal/storage/collateralV2/actions';
import { 
  getLoanNormalSubType,
  getLOANNormalCollateralData,
  getLOANNormalTotalValueTransportType,
  getLOANNormalCollateralCurrentValue
} from 'features/loan/normal/storage/collateralV2/selector';
import { formatNumber } from 'utils';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { Box } from '@mui/system';

export interface TransportTypeProps {
  collateralData?: ILOANNormalCollateralData;
}

const TransportType: FC<TransportTypeProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData } = props;
  const [collateral, setCollateral] = useState<ILOANNormalCollateralData | undefined>(collateralData);

  const getMessage = useNormalCollateralMessage();

  const uuidData: string = collateralData?.uuidActiveData ?? "";

  const getDetails = useSelector(getLoanNormalSubType(uuidData));
  const getData = useSelector(getLOANNormalCollateralData());
  const TotalValueTransportType = useSelector(getLOANNormalTotalValueTransportType(uuidData));
  const CollateralCurrentValue = useSelector(getLOANNormalCollateralCurrentValue(uuidData))

  useEffect(() => {
    if(TotalValueTransportType !== CollateralCurrentValue){
      onHandleChangeKey(TotalValueTransportType, 'collateral_value');
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[TotalValueTransportType])

  useEffect(() => {
    if (collateralData && collateral?.uuidActiveData !== collateralData.uuidActiveData) {
      setCollateral(collateralData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralData])

  const onHandleChangeKey = (value: IValueOnChangeCollateral, key: keyof ILOANNormalCollateralData) => {
    collateral && dispatch(onChangeCollaretalProperty(value, { key: key, uuid: collateral.uuidActiveData }));
  }

  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    collateral && dispatch(setMachineLocation(remain, { uuidData: collateral.uuidActiveData }))
  }

  return <Fragment >
    <Box sx={{paddingLeft:'3%'}}>

    <InfoReportCollaretalType onChangeValueCollateral={onHandleChangeKey} collateralData={collateralData} />

    <TableRow >
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="230px"
        >
        <Typography color="#1825aa" fontWeight={500}>
          ĐỊA CHỈ THẨM ĐỊNH
        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
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
              message={[
                getMessage('province',{position: collateral?.uuidActiveData ?? ''}),
                getMessage('district',{position: collateral?.uuidActiveData ?? ''})
              ]}
              />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
    
    <TableRow>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="230px"
        >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input 
              label="1. Tổng giá trị định giá (VNĐ)"
              sx={{
                "& .Mui-disabled":{
                  color: "var(--mscb-danger)",
                  fontSize:"14px",
                  fontWeight: "500",
                  WebkitTextFillColor: "unset"
                }
              }}
              disabled
              required
              value={formatNumber(TotalValueTransportType.toString() ?? "0")}
            />
          </Grid>
          <Grid item xl={3}>
            <Input 
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" 
              placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
              required
              type="number"
              format
              onDebounce={(val) => { onHandleChangeKey(val, 'max_percentage')}}  
              value={getData?.max_percentage?.toString()}
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
          <DetailsTransport
            uuidSubtype={item.uuidActiveSubtype}
            uuidData={collateralData?.uuidActiveData ?? ""}
            keyIndex={index}
            certId={collateralData?.price_cert_uuid ?? ""} 
          />
          )
        })}
  </Fragment>
}

export default TransportType;