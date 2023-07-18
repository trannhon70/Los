import { FC, Fragment } from "react";
import Grid from "@mui/material/Grid";
import LegalRelatedOther from "./Other";
import LegalRelatedAddress from "./Address";
import LegalRelatedBasic from "./Basic";
import LegalRelatedUser from "./User";

const LOANNormalLegalLegalRelated: FC = () => {
  return (
    <Fragment>
      <LegalRelatedUser />
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <LegalRelatedBasic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <LegalRelatedAddress />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <LegalRelatedOther />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LOANNormalLegalLegalRelated;
