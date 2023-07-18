import { Grid, Typography } from '@mui/material';
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import LegalInfomationCertificate from '../../../LegalInfomationCertificate'; // done
import LandInfomation from './LandInfomation';
import { Tab, Tabs } from '@mui/material';
import TabPanel from 'views/components/layout/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import { SxCollateralTabs, SxTabBorder } from '../../../style';
import LegalInfomationOwner from '../../../LegalInfomationOwner'; // done
import UsingLand from './UsingLand'; // done

export interface ICollateralLegalProps {
    activeSubType?: string;
    uuIdSubType?: string;
    uuIdData?: string;
}

// TODO: Đất
const CollateralLegal: FunctionComponent<ICollateralLegalProps> = (props) => {

    const { activeSubType, uuIdSubType, uuIdData = "" } = props

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
                    B. THÔNG TIN PHÁP LÝ
                </Typography>
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
                    <Tab label="THông tin pháp lý chủ sở hữu" />
                    <Tab 
                        label="THông tin pháp lý giấy chứng nhận" 
                        sx={SxTabBorder}
                    />
                    <Tab label="THông tin đất" />
                </Tabs>
                <SwipeableViews disabled index={CurrentTab} onChangeIndex={handleTabPanel}>
                    <TabPanel padding={false} value={CurrentTab} index={0}>
                        <LegalInfomationOwner
                            activeSubType={activeSubType}
                            uuIdData={uuIdData}
                        />
                    </TabPanel>
                    <TabPanel 
                        padding={false} 
                        value={CurrentTab} 
                        index={1} 
                        
                    >
                        <LegalInfomationCertificate
                            activeSubType={activeSubType}
                            uuIdData={uuIdData}
                        />
                    </TabPanel>
                    <TabPanel padding={false} value={CurrentTab} index={2}>
                        <Grid container spacing={3} className="pt-6">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <LandInfomation 
                                    uuIdData={uuIdData}
                                    uuIdSubType={uuIdSubType}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <UsingLand
                                    uuIdData={uuIdData}
                                    uuIdSubType={uuIdSubType}
                                />
                            </Grid>
                        </Grid>
                       
                    </TabPanel>
                </SwipeableViews>
            </Grid>
        </Grid>
    )
}

export default CollateralLegal;