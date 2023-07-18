import { FC } from "react";
import Grid from "@mui/material/Grid";

const BorrowerDeclare: FC = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xl={3}>
        {/* <Input
          label="1. Đơn vị"
          value={`${user?.branch.branch_code} - ${user?.branch.branch_name}`}
          disabled
        /> */}
      </Grid>
      <Grid item xl={9}>
        {/* <DeclareCheck onChange={changeDeclare}  /> */}
      </Grid>
    </Grid>
  );
};

export default BorrowerDeclare;
