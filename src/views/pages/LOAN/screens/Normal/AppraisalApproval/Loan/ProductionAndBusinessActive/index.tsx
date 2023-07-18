import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid/Grid';
import BasicInfo from './Basic';
import BusinessPremises from './BusinessPremises';
import WareHouse from './WareHouse';
import ReEvaluateExpertise from './ReEvaluateExpertise';

const ProductionAndBusinessActive: FC = () => {

  return <Box>
    <Grid container spacing={ 3 } className="mt-0">
      <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 } >
        <BasicInfo />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 } >
        <BusinessPremises />
      </Grid>
      <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 } >
        <WareHouse />
      </Grid>
      <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 } >
        <ReEvaluateExpertise />
      </Grid>
    </Grid>
  </Box>

}

export default ProductionAndBusinessActive;