import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubItems, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { Grid, Typography, Tab, Tabs } from '@mui/material';
import TabPanel from 'views/components/layout/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import LegalStatusCheck from 'views/components/widgets/LegalStatusCheck';
import { setCollaretalRPRO } from 'features/loan/normal/storage/collateralV2/actions';
import { getLOANormalStoreInformation, getLOANormalStoreLandLegalItemActive } from 'features/loan/normal/storage/collateralV2/selector';
import { SxCollateralTabs, SxRadio } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import LegalInformationOwner from '../../LegalInformationOwner';
import LegalInfomationCertificateMacket from './LegalInfomationCertificateMacket';
import MaketInfomation from './Info';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface IMarketInfoLegalProps {
  uuIdSubType?: string;
  collateral?: ILOANNormalCollateralData;
}

const MarketInfoLegal: FunctionComponent<IMarketInfoLegalProps> = (props) => {

  const { uuIdSubType = "", collateral} = props;

  const [CurrentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const uuidActiveData = collateral?.uuidActiveData ?? '';
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(collateral?.uuidActiveData ?? '',uuIdSubType ?? ''));
  const ruleDisabled = useSelector(getRuleDisbled)
  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  }

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  }

  const onChangeSubItem = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: uuidActiveData, uuidActive: uuIdSubType, key }))
  }
  const dataItems = useSelector(getLOANormalStoreInformation( uuidActiveData, uuIdSubType ?? ''));

  useEffect(() => {
    if (CurrentTab !== 0){
      setCurrentTab(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemActive?.activeUUID ])
  return <>

    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" gutterBottom component="div" className="font-medium text-19">
            B. THÔNG TIN PHÁP LÝ
          </Typography>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <LegalStatusCheck
            disabled={ruleDisabled}
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
              <LegalInformationOwner 
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

export default MarketInfoLegal;