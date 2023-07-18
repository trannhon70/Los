import { Grid } from "@mui/material";
import { FC } from "react";
import ReferencePersonStyle from "./style";
import BasicInfo from "./BasicInfo";
import IdentificationInfo from "./IdentityInfo";

const ReferencePerson: FC = () => {
  const classes = ReferencePersonStyle();

  return (
    <>
      <Grid
        container
        columnSpacing="20px"
        rowSpacing="20px"
        className={`${classes.root} pt-5`}
      >
        <Grid item xl={4} md={12} xs={12}>
          <BasicInfo />
        </Grid>
        <Grid item xl={4} md={12} xs={12}>
          <IdentificationInfo />
        </Grid>
      </Grid>
    </>
  );
};

export default ReferencePerson;
