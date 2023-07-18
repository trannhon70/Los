import { Box, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import CardOutside from "views/components/layout/CardOutside";
import Tabs from "views/components/layout/Tabs";

import {
  findTabPosition,
  IStaffInfomationParams,
  pathStaffInformation,
  tabNameStaffInfo,
  tabNameStaffInfoVN
} from "./utils";
import { updateDocumentTitle } from "utils";
import { useDispatch } from "react-redux";
import { setTitlePage } from "features/app/store/slice";
import { SxStaffInformationDetail } from "./style";
import CurriculumVitae from "./screens/CurriculumVitae";
import LevelInformation from "./screens/LevelInformation";
import KPIInformation from "./screens/KPIInformation";
import OtherInformation from "./screens/OtherInformation";
import BasicStaffInformation from "./screens/BasicStaffinformation";
import WorkProfile from "./screens/WorkProfile";


const StaffInformation: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateDocumentTitle("HỒ SƠ NHÂN VIÊN");
  })

  useEffect(() => {
    dispatch(setTitlePage("HỒ SƠ NHÂN VIÊN"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const params = useParams() as IStaffInfomationParams;

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [CurrentTab, setCurrentTab] = useState<number>(
    findTabPosition(params.tab)
  );
  const current = tabNameStaffInfo.indexOf(params["*"].split("/")[0]);
  
  useEffect(() => {
    navigate(tabNameStaffInfo[CurrentTab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const beforeChangeTab = (_: number, next: number) => {
    let tabNext = tabNameStaffInfo[next];
    setCurrentTab(next);

    switch (tabNext) {
      case "workprofile":
        tabNext = "workprofile";
        break;
      case "curriculum-vitae":
        tabNext = "curriculum-vitae";
        break;
      case "level-information":
        tabNext = "level-information";
        break;
      case "kpi-information":
        tabNext = `kpi-information`;
        break;
      case "other-informatio":
        tabNext = "other-informatio";
        break;
    }

    navigate(`${pathStaffInformation}${tabNext}/`);
    return true;
  };

  return (
    <CardOutside label="thông tin CHI TIẾT nhân viên">
      <Grid container spacing={3}>
        <Grid item xl={12}>
          <BasicStaffInformation />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Box
            className={"bg-white "}
            sx={SxStaffInformationDetail}
          >
            <Tabs
              current={!!~current ? current : 0}
              beforeChange={beforeChangeTab}
              tabs={tabNameStaffInfoVN}
              variant="standard"
              sx={{ 
                textTransform: "none", 
              }}
            >
              <Routes>
                <Route path="workprofile/*" element={<WorkProfile />} />
              </Routes>

              <Routes>
                <Route path="curriculum-vitae/*" element={<CurriculumVitae />} />
              </Routes>

              <Routes>
                <Route path="level-information/*" element={<LevelInformation />} />
              </Routes>

              <Routes>
                <Route path="kpi-information/" element={<KPIInformation />} />
              </Routes>

              <Routes>
                <Route  path="other-information/*" element={<OtherInformation />} />
              </Routes>
            </Tabs>
          </Box>
        </Grid>
      </Grid>
    </CardOutside>
  );
};

export default StaffInformation;
