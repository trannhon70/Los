import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubItems } from 'types/models/loan/normal/storage/CollaretalV2';
import { Grid, Typography, Tab, Tabs } from '@mui/material';
import { SxCollateralTabs, SxRadio } from '../../style';
import TabPanel from 'views/components/layout/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import LegalStatusCheck from 'views/components/widgets/LegalStatusCheck';
import LegalInfomationOwner from '../../LegalInfomationOwner';
import LegalInfomationCertificateMacket from './LegalInfomationCertificateMacket';
import MaketInfomation from './Info';
import { setCollaretalRPRO } from 'features/loan/normal/storage/collateralV2/actions';
import AssessmentInfomation from '../../AssessmentInfomation';
import { getLOANormalStoreInformation } from 'features/loan/normal/storage/collateralV2/selector';

export interface IOwnershipMaketProps {
  uuIdSubType?: string;
  collateral?: ILOANNormalCollateralData;
}

const Market: FunctionComponent<IOwnershipMaketProps> = (props) => {

  const { uuIdSubType = "", collateral} = props;

  const [CurrentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const uuidActiveData = collateral?.uuidActiveData ?? '';

  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  }

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  }

  const onChangeSubItem = (value: string | number | null, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: uuidActiveData, uuidActive: uuIdSubType, key }))
  }
  const dataItems = useSelector(getLOANormalStoreInformation( uuidActiveData, uuIdSubType ?? ''));
  return <>

    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <AssessmentInfomation 
        uuidData={uuidActiveData}
        uuidSubtype={uuIdSubType}
      />
    </Grid>

    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" gutterBottom component="div" className="font-medium text-19">
            B. THÔNG TIN PHÁP LÝ
          </Typography>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <LegalStatusCheck
            label="1. Tình trạng pháp lý"
            onChange={(val) => onChangeSubItem(val, "has_certificate_maket")}
            required
            sx={SxRadio}
            value={dataItems?.has_certificate_maket}
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
              label="Thông tin pháp lý" 
              sx={{
                borderLeft: "solid 1px #b5b5b5",
                borderRight: "solid 1px #b5b5b5"
              }}
            />
            <Tab label="Thông tin chi tiết sạp chợ/ô tttm" />
          </Tabs>
          <SwipeableViews disabled index={CurrentTab} onChangeIndex={handleTabPanel}>
            <TabPanel padding={false} value={CurrentTab} index={0}>
              <LegalInfomationOwner 
                activeSubType={uuIdSubType}
                uuIdData={collateral?.uuidActiveData ?? ""}
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={1}>
              <LegalInfomationCertificateMacket 
                uuIdSubType={uuIdSubType}
                uuIdData={collateral?.uuidActiveData ?? ""}
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={2}>
              <MaketInfomation 
                uuIdSubType={uuIdSubType}
                uuIdData={collateral?.uuidActiveData ?? ""}
              />
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default Market;