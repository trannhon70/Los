import { Grid, Typography } from '@mui/material';
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'views/components/layout/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import { SxCollateralTabs, SxTabBorder } from '../../../style';
import LegalInfomationOwner from '../../../LegalInfomationOwner';
import LegalInfomationCertificate from '../../../LegalInfomationCertificate';
import CTXDInfomation from '../../../CTXDInfomation';

const CTXDGcn: FunctionComponent = () => {

  const [CurrentTab, setCurrentTab] = useState(0);


  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  }

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  }

  return (
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h6" gutterBottom component="div" className="font-medium text-19">
          B. Thông tin Pháp lý CTXD
        </Typography>
      </Grid>
      <Grid item xl={12}>
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
            <Tab label="THông tin pháp lý chủ sở hữu" />
            <Tab label="THông tin pháp lý giấy chứng nhận"  sx={SxTabBorder} />
            <Tab label="THông tin CTXD" />
          </Tabs>
          <SwipeableViews disabled index={CurrentTab} onChangeIndex={handleTabPanel}>
            <TabPanel padding={false} value={CurrentTab} index={0}>
              <LegalInfomationOwner
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={1}>
              <LegalInfomationCertificate
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={2}>
              <CTXDInfomation
              />
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default CTXDGcn;