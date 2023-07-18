import { FunctionComponent } from "react";
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";



// TODO: Tổng giá trị tài sản bảo đảm
const TableTotalValueAssets: FunctionComponent = () => {


  return (
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
            />
          </Grid>
          <Grid item xl={3}>
            <Input
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
              required
              type="number"
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TableTotalValueAssets;