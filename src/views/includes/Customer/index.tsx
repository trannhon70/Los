import { FC, memo } from 'react';
import Grid from '@mui/material/Grid';
import CustomerInfo from './Info';
import customerStyle from './style';
import CustomerHistory from './History';
import CustomerDiscuzz from './Discuzz';

const Customer: FC = () => {

  const classes = customerStyle();

  return <Grid container spacing={ 3 } className={ classes.Customer }>
    <Grid item xl={ 6 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
      <CustomerInfo className={ classes.CustomerInfo } />
    </Grid>
    <Grid item xl={ 3 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
      <CustomerHistory className={ classes.CustomerHistory } />
    </Grid>
    <Grid item xl={ 3 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
      <CustomerDiscuzz className={ classes.CustomerDiscuzz } />
    </Grid>
  </Grid>

}

export default memo(Customer);