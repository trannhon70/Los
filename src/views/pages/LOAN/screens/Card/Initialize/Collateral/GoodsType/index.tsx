import { Grid, Table, TableBody, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC, Fragment } from 'react';
import Input from 'views/components/base/Input';
import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';
import DetailsGoods from './DetailsGoods';

const GoodsType: FC = () => {
  return <Fragment>
    <Table>
      <TableBody>
        <TableInfoReportCollaretalType/>
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
                    "& .Mui-disabled": {
                      color: "var(--mscb-danger)",
                      fontSize: "14px",
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

      </TableBody>

    </Table >
        <DetailsGoods />

  </Fragment>
}
export default GoodsType;