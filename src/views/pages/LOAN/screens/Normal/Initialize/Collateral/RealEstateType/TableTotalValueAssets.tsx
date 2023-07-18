import { FunctionComponent, useEffect } from "react";
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import { useSelector } from "react-redux";
import { getLOANNormalCollateralCurrentValue, getLOANNormalRealEstateType } from "features/loan/normal/storage/collateralV2/selector";
import { formatNumber } from "utils";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

export interface ITableTotalValueAssetsProps{
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
  collateralData?: ILOANNormalCollateralData;
}


// TODO: Tổng giá trị tài sản bảo đảm
const TableTotalValueAssets: FunctionComponent<ITableTotalValueAssetsProps> = (props) => {

  const { onChangeValueCollateral, collateralData } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const onChangeDataFormReport = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    onChangeValueCollateral && onChangeValueCollateral(value, key);
  }
  const getMessage = useNormalCollateralMessage();
  const totalValue = useSelector(getLOANNormalRealEstateType(collateralData?.uuidActiveData ?? ""));
  const CollateralCurrentValue = useSelector(getLOANNormalCollateralCurrentValue(collateralData?.uuidActiveData ?? ""))
  // const [ collateralValue, setCollateralValue ] = useState<number>(Number(totalValue ?? 0));


  useEffect(() => {
    if(totalValue !== CollateralCurrentValue){
      onChangeDataFormReport(totalValue, 'collateral_value')
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalValue])

  // useEffect(() => {
  //   if(collateralValue !== totalValue){
  //     setCollateralValue(totalValue ?? 0);
  //     onChangeDataFormReport(totalValue, 'collateral_value')
  //   }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [totalValue])

  return (
    <TableRow>
      <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="100%"
      >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6" width='77%'>
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
              value={formatNumber(CollateralCurrentValue.toString())}
            />
          </Grid>
          <Grid item xl={3}>
            <Input 
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" 
              placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
              required
              type="number"
              format
              onDebounce={(val) => { onChangeDataFormReport(val, 'max_percentage')}}  
              value={collateralData?.max_percentage?.toString() ?? ""}
              message={getMessage('max_percentage',{position: collateralData?.uuidActiveData ?? ''})}
              maxlength={100}
              disabled={ruleDisabled}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TableTotalValueAssets;