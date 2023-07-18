import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Divider, Grid, Typography, TableRow, TableCell } from '@mui/material';
import DetailsOther from './DetailsOther';
import { formatNumber } from 'utils';
import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';


const OtherType: FC = () => {

  return <Fragment>
    <TableInfoReportCollaretalType />

    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
          TỔNG GIÁ TRỊ TSDB
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
            />

          </Grid>
          <Grid item xl={3}>
            <Input label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
              required />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>

    <Divider className='mt-5' />

    < DetailsOther />


  </Fragment>

}

export default OtherType;