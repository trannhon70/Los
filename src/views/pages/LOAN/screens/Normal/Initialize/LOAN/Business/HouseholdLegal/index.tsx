import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid/Grid';
import HouseholdLegalBasic from './Basic';
import HouseholdLegalPremises from './Premises';
import HouseholdLegalStorage from './Storage';
import { useDispatch } from 'react-redux';
import { autoFillBussiness } from 'features/loan/normal/storage/loan/actions';
import { Button } from '@mui/material';

const LOANHouseHoldLegal: FC = () => {

  const dispatch = useDispatch();
  const autoFill = () => {
    dispatch(autoFillBussiness(''))
  }

  return <Box>
    <Grid container spacing={ 2 } className="mt-0">
      <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
        <HouseholdLegalBasic />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
        <HouseholdLegalPremises />
      </Grid>
    </Grid>
    <Box>
      <HouseholdLegalStorage />
    </Box>
    {/* <Button  onClick={autoFill}>AutoFill</Button> */}
  </Box>

}

export default LOANHouseHoldLegal;