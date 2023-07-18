import { FC, Fragment, useEffect, useState } from 'react';
import Input from 'views/components/base/Input';
import { Divider, Grid, TableCell, TableRow, Typography } from '@mui/material';
import { ILOANNormalCollateralData } from 'types/models/loan/normal/storage/CollaretalV2';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanNormalSubType } from 'features/loan/normal/storage/collateralV2/selector';
import { onChangeCollaretalProperty } from 'features/loan/normal/storage/collateralV2/actions';
import DetailsDeposit from './DetailsDeposit';
import { formatNumber } from 'utils';
import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';

const DepositsType: FC = () => {

  return <Fragment>
    <TableInfoReportCollaretalType />
    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input label="1. Tổng giá trị định giá (VNĐ)"
              required
              sx={{
                "& .Mui-disabled": {
                  color: "var(--mscb-danger)",
                  fontSize: "14px",
                  fontWeight: "500",
                  WebkitTextFillColor: "unset"
                }
              }}
              disabled />
          </Grid>
          <Grid item xl={3}>
            <Input label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" required
            />
          </Grid>
        </Grid>
      </TableCell>

    </TableRow>

    <Divider className='mt-5' />
        <DetailsDeposit/>


  </Fragment>

}

export default DepositsType;