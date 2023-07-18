import Grid from "@mui/material/Grid";
import { FC } from "react";
import BasicDisbursement from "./Basic";
import InterestRateDisbursement from "./InterestRate";
import MethodDisbursement from "./Method";

const Disbursement: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xl={12}>
        <BasicDisbursement />
      </Grid>
      <Grid item xl={12}>
        <MethodDisbursement />
      </Grid>
      <Grid item xl={12}>
        <InterestRateDisbursement />
      </Grid>
    </Grid>
  );
};

export default Disbursement;
