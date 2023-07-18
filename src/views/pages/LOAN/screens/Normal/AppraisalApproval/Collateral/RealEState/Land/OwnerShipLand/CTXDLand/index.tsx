import { Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import CTXDLandInformationGeneral from '../InformationGeneral';
import InformationTypeLand from '../InformationTypeLand';


export interface CTXDLandProps {
  activeSubType?: string;
  collateralType?: string;
  uuIdData?: string;
}

// TODO: CTXD trên đất
const CTXDLand: FunctionComponent<CTXDLandProps> = (props) => {  // done

  const { activeSubType, uuIdData } = props

  return (
    <Grid container className="mt-0">
      <Typography variant="h6" gutterBottom component="div" className="text-upper font-medium text-19">
        B. Thông tin Pháp lý CTXD
      </Typography>
      <Grid item xl={12}>
        <CTXDLandInformationGeneral
          activeSubType={activeSubType}
          uuIdData={uuIdData}
        />
      </Grid>

      <Grid item xl={12}>
        <InformationTypeLand
          activeSubType={activeSubType}
          uuIdData={uuIdData}
        />
      </Grid>
    </Grid>
  )
}

export default CTXDLand;

