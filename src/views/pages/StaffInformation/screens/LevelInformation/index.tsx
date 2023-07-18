import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "views/components/layout/Steps";
import EducationLevel from "./EducationLevel";
import ForeignLanguageLevel from "./ForeignLanguageLevel";
import OfficeInformation from "./OfficeInformation";
import {
  pathLevelInformation,
  pathStaffInformation,
  steptNameLevelInformation
} from "../../utils";
import { SxSteps } from "../../style";

const LevelInformation = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${pathStaffInformation}${pathLevelInformation}${steptNameLevelInformation[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeChangeStepLevelInformation = (next: number, current: number) => {
    const steptNextName = steptNameLevelInformation[current];
    navigate(`${pathStaffInformation}${pathLevelInformation}${steptNextName}`);
  }

  return (
    <Box>
      <Steps
        sx={SxSteps}
        current={0}
        onChange={beforeChangeStepLevelInformation}
        steps={[
          {
            label: `TRÌNH ĐỘ VĂN HÓA`,
            node: "A",
          },
          {
            label: `TRÌNH ĐỘ NGOẠI NGỮ`,
            node: "B",
          },
          {
            label: `TRÌNH ĐỘ TIN HỌC`,
            node: "C",
          },
        ]}
      >
        <EducationLevel />
        <ForeignLanguageLevel />
        <OfficeInformation />
      </Steps>
    </Box>
  );
};
export default LevelInformation;
