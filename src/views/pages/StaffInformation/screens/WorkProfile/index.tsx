import { Box } from "@mui/material";
import Steps from "views/components/layout/Steps";
import { SxSteps } from "../../style";
import DecisionContractInformation from "./DecisionContractInformation";
import WorkingProcess from "./WorkingProcess";
import WorkingProfileDetail from "./WorkingProfileDetail";
import { useNavigate } from "react-router-dom";
import {
  pathStaffInformation,
  pathWorkprofile,
  steptNameWorkProfile
} from "../../utils";
import { useEffect } from "react";


const WorkProfile = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${pathStaffInformation}${pathWorkprofile}${steptNameWorkProfile[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeChangeSteptWordProfile = (next: number, current: number) => {
    const steptNextName = steptNameWorkProfile[current];
    navigate(`${pathStaffInformation}${pathWorkprofile}${steptNextName}`);
  }

  return (
    <Box>
      <Steps
        sx={SxSteps}
        current={0}
        onChange={beforeChangeSteptWordProfile}
        steps={[
          {
            label: `HỒ SƠ CÔNG TÁC`,
            node: "A",
          },
          {
            label: `QUYẾT ĐỊNH/HỢP ĐỒNG`,
            node: "B",
          },
          {
            label: `QUÁ TRÌNH CÔNG TÁC`,
            node: "C",
          },
        ]}
      >
        <WorkingProfileDetail />
        <DecisionContractInformation />
        <WorkingProcess />
      </Steps>
    </Box>
  );
};
export default WorkProfile;
