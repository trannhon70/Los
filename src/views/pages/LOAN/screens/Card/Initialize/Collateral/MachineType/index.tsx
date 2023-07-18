import { Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import Input from 'views/components/base/Input';
import SelectLocation from 'views/components/widgets/SelectLocation';
import InfoReportCollaretalType from 'views/pages/LOAN/widgets/CollaretalForm/TableInfoReportCollaretalType';
import DetailsMachine from './DetailsMachine';

const MachineType: FC = () => {


  return <Fragment>
    <Table>
      <TableBody>
        <InfoReportCollaretalType />
        <TableRow>
          <TableCell>
            <Typography color="#1825aa" fontWeight={500}>
              ĐỊA CHỈ THẨM ĐỊNH
            </Typography>
          </TableCell>
          <TableCell className="px-0">
            <Grid container spacing={3}>
              <Grid item xl={3}>
                <Input
                  label="1. Địa chỉ thực tế" />
              </Grid>
              <Grid item xl={9}>
                <SelectLocation
                  col={4}

                  label={[
                    '2. Tỉnh/TP',
                    '3. Quận/huyện',
                    '4. Phường/xã'
                  ]}

                />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography color="#1825aa" fontWeight={500}>
              TỔNG GIÁ TRỊ TSDB
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

      </TableBody>
    </Table>

    < DetailsMachine
    />

  </Fragment >

}

export default MachineType;