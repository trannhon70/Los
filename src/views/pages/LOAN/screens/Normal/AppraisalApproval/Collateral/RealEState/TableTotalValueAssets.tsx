import { FunctionComponent } from "react";
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import { useSelector } from "react-redux";
import { getLOANNormalCollateralCurrentValue } from "features/loan/normal/storageApproval/collateral/selector";
import { formatNumber } from "utils";
export interface ITableTotalValueAssetsProps{
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
  collateralData?: ILOANNormalCollateralData;
}

const TableTotalValueAssets: FunctionComponent<ITableTotalValueAssetsProps> = (props) => {

  const { collateralData } = props;
  const CollateralCurrentValue = useSelector(getLOANNormalCollateralCurrentValue(collateralData?.uuidActiveData ?? ""))

  return (
    <TableRow>
      <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="100%"
      >
        <Typography color="#1825aa" fontWeight={500} fontSize={14}>
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
              value={collateralData?.max_percentage?.toString() ?? ""}
              maxlength={100}
              disabled={true}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TableTotalValueAssets;