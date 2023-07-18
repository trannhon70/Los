import { Grid } from "@mui/material";
import { FC } from "react";
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import AssessmentInfomation from "../../AssessmentInfomation";
import LegalInfo from "./legalInfo";

export interface IDepartmentProps {
  collateral?: ILOANNormalCollateralData;
  uuIdSubType?: string;
}

const Department: FC<IDepartmentProps> = (props) => {
  const { collateral, uuIdSubType } = props;

  return (
    <>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <AssessmentInfomation
          uuidData={collateral?.uuidActiveData}
          uuidSubtype={uuIdSubType}
        />
      </Grid>
      <LegalInfo
        uuIdData={collateral?.uuidActiveData}
        activeSubType={uuIdSubType}
      />
    </>
  );
};

export default Department;
