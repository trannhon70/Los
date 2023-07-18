import { useEffect } from "react";
import { Box } from "@mui/material";
import Steps from "views/components/layout/Steps";
import { useNavigate } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import PersonalInfo from "./PersonalInfo";
import { pathCurriculumVitae, pathStaffInformation, steptNameWorkCurriculumVitae } from "../../utils";
import { SxSteps } from "../../style";


const CurriculumVitae = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${pathStaffInformation}${pathCurriculumVitae}${steptNameWorkCurriculumVitae[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeChangeSteptCurriculumVitae = (next: number, current: number) => {
    const steptNextName = steptNameWorkCurriculumVitae[current];
    navigate(`${pathStaffInformation}${pathCurriculumVitae}${steptNextName}`);
  }

  return (
    <Box>
      <Steps
        sx={SxSteps}
        current={0}
        onChange={beforeChangeSteptCurriculumVitae}
        steps={[
          {
            label: `THÔNG TIN CÁ NHÂN`,
            node: "A",
          },
          { 
            label: `THÔNG TIN LIÊN HỆ`, 
            node: "B" 
          },
        ]}
      >
        <PersonalInfo />
        <ContactInfo/>
      </Steps>
    </Box>
  );
};
export default CurriculumVitae;
