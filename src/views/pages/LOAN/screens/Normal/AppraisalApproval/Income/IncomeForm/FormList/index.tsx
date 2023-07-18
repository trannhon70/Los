import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import IncomeFormAssetRent from './AssetRent';
import IncomeFormBusiness from './Business';
import IncomeFormCompany from './Company';
import IncomeFormDeposit from './Deposit';
import IncomeFormOther from './Other';
import IncomeFormPension from './Pension';
import IncomeFormSalary from './Salary';
import IncomeFormStock from './Stock';

const IncomeFormList: FC = () => {

  return <Box className="mt-6">
    
    <Grid container spacing={3}>
      <Grid item xl={12} >
        <Routes>
          <Route path="salary" element={<IncomeFormSalary />} />
          <Route path="asset-rent" element={<IncomeFormAssetRent />} />
          <Route path="business" element={<IncomeFormBusiness />} />
          <Route path="company" element={<IncomeFormCompany />} />
          <Route path="stock" element={<IncomeFormStock />} />
          <Route path="deposit" element={<IncomeFormDeposit />} />
          <Route path="pension" element={<IncomeFormPension />} />
          <Route path="other" element={<IncomeFormOther />} />
        </Routes>
      </Grid>
    </Grid>
  </Box>

}

export default IncomeFormList;