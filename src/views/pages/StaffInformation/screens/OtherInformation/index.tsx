import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Steps from "views/components/layout/Steps";
import { SxSteps } from "../../style";
import Bonus from "./Bonus";
import Discipline from "./Discipline";
import ExtraInformation from "./ExtraInformation";
import Training from "./Training";
import {
  pathOtherInformation,
  pathStaffInformation,
  steptNameOtherInformation
} from "../../utils";

export interface IStepIdentify {
  onContinue?(): void;
  onPrevious?(): void;
}
const OtherInformation = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${pathStaffInformation}${pathOtherInformation}${steptNameOtherInformation[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeChangeStepOtherInformation = (next: number, current: number) => {
    const steptNextName = steptNameOtherInformation[current];
    navigate(`${pathStaffInformation}${pathOtherInformation}${steptNextName}`);
  }

  return (
    <Box>
      <Steps
        sx={SxSteps}
        current={0}
        onChange={beforeChangeStepOtherInformation}
        steps={[
          { label: 'KHEN THƯỞNG', node: "A" },
          { label: 'KỶ LUẬT', node: "B" },
          { label: 'ĐÀO TẠO TRONG NH', node: "C" },
          { label: 'THÔNG TIN PHỤ', node: "D" },
        ]}
      >
        <Bonus/>
        <Discipline />
        <Training />
        <ExtraInformation />
      </Steps>
    </Box>
  );
};
export default OtherInformation;
