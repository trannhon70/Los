import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "views/components/layout/TabPanel";
import SwipeableViews from "react-swipeable-views";
import { SxCollateralTabs, SxRadio } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import LegalStatusCheck from "views/components/widgets/LegalStatusCheck";
import Input from "views/components/base/Input";

import LegalInfomationOwner from "../../LegalInfomationOwner";
import CertificateLegaIInfo from "./Tabs/CertificateLegaIInfo";
import DepartmentInfo from "./Tabs/DepartmentInfo";
import LandInfo from "./Tabs/LandInfo";
import { getLOANormalStoreLegalDepartmentApproval } from "features/loan/normal/storageApproval/collateral/selector";

export interface ILegalInfoProps {
  activeSubType?: string;
  collateralType?: string;
  uuIdData?: string;
}

// TODO: Đất
const LegalInfo: FunctionComponent<ILegalInfoProps> = (props) => {

  const { activeSubType = "", uuIdData = "" } = props;
  const [CurrentTab, setCurrentTab] = useState(0);


  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };

 

  const Department = useSelector(getLOANormalStoreLegalDepartmentApproval(uuIdData, activeSubType));



  return (
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          className="font-medium text-19"
        >
          B. THÔNG TIN PHÁP LÝ
        </Typography>
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
        <LegalStatusCheck 
          label="1. Tình trạng pháp lý" 
          required 
          sx={SxRadio}
          disabled
          value={Department?.has_certificate ?? ""}
        />
      </Grid>
      <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
        <Input 
          label="2. Tên dự án chung cư/nhà chung cư" 
          required
          value={Department?.project_name ?? ""}
          disabled
        />
      </Grid>
      <Grid item xl={12}>
        <Tabs
          variant="scrollable"
          value={CurrentTab}
          indicatorColor="primary"
          onChange={changeTab}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={SxCollateralTabs}
        >
          <Tab label="Thông tin pháp lý chủ sở hữu" />
          <Tab 
            label="Thông tin pháp lý giấy chứng nhận" 
            sx={{ 
              borderLeft: "solid 1px #b5b5b5",
              borderRight: "solid 1px #b5b5b5"
            }}
          />
          <Tab 
            label="Thông tin căn hộ"
            sx={{ 
              borderLeft: "solid 1px #b5b5b5",
              borderRight: "solid 1px #b5b5b5"
            }}
          />
          <Tab label="Thông tin đất/dự án" />
        </Tabs>
        <SwipeableViews
          disabled
          index={CurrentTab}
          onChangeIndex={handleTabPanel}
        >
          <TabPanel padding={false} value={CurrentTab} index={0}>
            <LegalInfomationOwner
              activeSubType={activeSubType}
              uuIdData={uuIdData}
            />
          </TabPanel>
          <TabPanel padding={false} value={CurrentTab} index={1}>
            <CertificateLegaIInfo
              uuIdSubType={activeSubType}
              uuIdData={uuIdData}
            />
          </TabPanel>
          <TabPanel padding={false} value={CurrentTab} index={2}>
            <DepartmentInfo uuIdSubType={activeSubType} uuIdData={uuIdData} />
          </TabPanel>
          <TabPanel padding={false} value={CurrentTab} index={3}>
            <LandInfo uuIdSubType={activeSubType} uuIdData={uuIdData} />
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};

export default LegalInfo;
