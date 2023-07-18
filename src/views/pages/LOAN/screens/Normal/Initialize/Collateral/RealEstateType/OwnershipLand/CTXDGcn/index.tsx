import { Grid, Typography } from '@mui/material';
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'views/components/layout/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import { SxCollateralTabs } from '../../../style';
import LegalInfomationOwner from '../../../LegalInfomationOwner';
import LegalInfomationCertificate from '../../../LegalInfomationCertificate';
import { useSelector } from 'react-redux';
import { getLOANormalStoreColalteralLandCTXDGcnQshData } from 'features/loan/normal/storage/collateralV2/selector';
import Empty from 'views/components/layout/Empty';
import InformationTypeLand from '../InformationTypeLand';
import InfoGeneral from './InfoGeneral';

export interface ICTXDGcnProps {
  uuidData?: string;
  uuidSubType?: string;
}

const CTXDGcn: FunctionComponent<ICTXDGcnProps> = (props) => {

  const { uuidData = "", uuidSubType = "" } = props;
  const [CurrentTab, setCurrentTab] = useState(0);

  const LandCTXDGcnQshData = useSelector(getLOANormalStoreColalteralLandCTXDGcnQshData(uuidData, uuidSubType));

  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  }

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  }

  const generaterLayoutLegalInfo = () => {
    return (
      <>
        <Typography variant="h6" gutterBottom component="div" className=" text-upper font-medium text-19" >
          B. Thông tin Pháp lý CTXD
        </Typography>
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
            <Tab label="THông tin pháp lý giấy chứng nhận" />
            <Tab label="THông tin CTXD" />
          </Tabs>
          <SwipeableViews disabled index={CurrentTab} onChangeIndex={handleTabPanel}>
            <TabPanel padding={false} value={CurrentTab} index={0}>
              <LegalInfomationOwner
                uuIdData={uuidData}
                activeSubType={uuidSubType}
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={1}>
              <LegalInfomationCertificate
                uuIdData={uuidData}
                activeSubType={uuidSubType}
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={2}>
              <Grid item xl={12}>
                <InfoGeneral
                  uuidSubType={uuidSubType}
                  uuidData={uuidData}
                />
              </Grid>

              <Grid item xl={12}>
                <InformationTypeLand
                  activeSubType={uuidSubType}
                  uuIdData={uuidData}
                />
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </>
    )
  }

  return (
    <Grid container>
      {
        LandCTXDGcnQshData && LandCTXDGcnQshData.length === 0 ?
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Empty>Không có dữ liệu</Empty>
          </Grid>
          : generaterLayoutLegalInfo()
      }
    </Grid>
  )
}

export default CTXDGcn;