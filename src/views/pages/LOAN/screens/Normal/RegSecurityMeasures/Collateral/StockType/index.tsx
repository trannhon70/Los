import { FC, Fragment } from 'react';
import Input from 'views/components/base/Input';
import { Divider, Grid, Typography, TableRow, TableCell } from '@mui/material';
import DetailsStock from './DetailsStock';

import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';
const StockType: FC = () => {
  return <Fragment>
    <TableInfoReportCollaretalType />
    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell>
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
            />
          </Grid>
          <Grid item xl={3}>
            <Input
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
              required />
          </Grid>
        </Grid>
      </TableCell>

    </TableRow>

    <Divider className='mt-5' />
    < DetailsStock />
  </Fragment>

}

export default StockType;