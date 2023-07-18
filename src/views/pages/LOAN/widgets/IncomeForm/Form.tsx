import { FC, } from 'react';
import Box from '@mui/material/Box';
import IncomeFormList from './FormList';
import cicFormStyle from '../CICForm/style';


const IncomeMainForm: FC = () => {
  const classes = cicFormStyle();

  return <Box className={`mt-6 ${classes.root}`} >
    {/* <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ nguồn lương (VND)"
          disabled
          className="input-red"
          value="1.000.000.000"
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          value="1.000.000.000"
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          value="1.000.000.000"
        />
      </Grid>
    </Grid> */}
    <IncomeFormList />
  </Box>

}

export default IncomeMainForm;