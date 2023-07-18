import { FC, Fragment} from 'react';
import Input from 'views/components/base/Input';
import { Divider, Grid, TableCell, TableRow, Typography } from '@mui/material';
import DetailsTransport from './DetailsTransport';
import TableInfoReportCollaretalType from '../CollaretalForm/TableInfoReportCollaretalType';
import SelectLocation from 'views/components/widgets/SelectLocation';



const TransportType: FC = () => {

  return <Fragment>
    <TableInfoReportCollaretalType />
    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
          ĐỊA CHỈ THẨM ĐỊNH
        </Typography>
      </TableCell>
      <TableCell>
        {/* <LegalDocument /> */}
        <Grid container>
          <Grid item xl={9}>
            <SelectLocation
              col={4}
              label={[
                '1. Tỉnh/TP',
                '2. Quận/huyện',
                '3. Phường/xã'
              ]}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell >
        <Typography color="#1825aa" fontWeight={500}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell>
        <Grid container spacing={3} className='ml-0'>
          <Grid item xl={4} className='pl-0'>
            <Input label="1. Tổng giá trị định giá (VNĐ)" required />
          </Grid>
          <Grid item xl={3}>
            <Input label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" required />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>

    <Divider className='mt-5' />
        < DetailsTransport/>


  </Fragment>

}

export default TransportType;