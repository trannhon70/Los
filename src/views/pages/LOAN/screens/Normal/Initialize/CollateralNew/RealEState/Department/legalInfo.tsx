import { Grid, Tab, Tabs, Typography } from "@mui/material";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import { setCollaretalCertificateDepartment } from "features/loan/normal/storage/collateralV2/actions";
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalDepartment
} from "features/loan/normal/storage/collateralV2/selector";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { IDepartment } from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import TabPanel from "views/components/layout/TabPanel";
import LegalStatusCheck from "views/components/widgets/LegalStatusCheck";
import { SxCollateralTabs, SxRadio } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import LegalInformationOwner from "../../LegalInformationOwner";
import CertificateLegaIInfo from "./Tabs/CertificateLegaIInfo";
import DepartmentInfo from "./Tabs/DepartmentInfo";
import LandInfo from "./Tabs/LandInfo";
export interface ILegalInfoProps {
  activeSubType?: string;
  collateralType?: string;
  uuIdData?: string;
}

// TODO: Đất
const LegalInfo: FunctionComponent<ILegalInfoProps> = (props) => { // done
  const { activeSubType = "", uuIdData = "" } = props;

  const [CurrentTab, setCurrentTab] = useState(0);

  const dispatch = useDispatch();
  const getMessage = useNormalCollateralMessage();
  const ruleDisabled = useSelector(getRuleDisbled)
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',activeSubType ?? ''));
  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData, activeSubType)
  );

  const changeTab = (e: SyntheticEvent, newValue: number) => {
    if (newValue !== CurrentTab) {
      setCurrentTab(newValue);
    }
    return false;
  };

  useEffect(() => {
    setCurrentTab(0)
  },[SubTypeItemsActive])

  const handleTabPanel = (index: number) => {
    setCurrentTab(index);
  };

  const Department = useSelector(getLOANormalStoreLegalDepartment(uuIdData, activeSubType));

  const onChangeDepartment = (value: string, key: keyof IDepartment) => {
    dispatch(setCollaretalCertificateDepartment(value, {
      uuidActiveData: uuIdData,
      uuidActiveSubtype: activeSubType,
      uuidActiveitems: SubTypeItemsActive,
      key
    }))
    // clear thong tin giay chung nhan khi thay doi  tinh trang phap ly
    // dispatch(clearOnChangeCollaretalDeparmentHasCertificate(value,{
    //   uuidActiveData: uuIdData,
    //   uuidActiveSubtype: activeSubType,
    //   uuidActiveitems: SubTypeItemsActive,
    // }))
  } 

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
          disabled={ruleDisabled}
          sx={SxRadio}
          value={Department?.has_certificate ?? ""}
          onChange={(val) => onChangeDepartment(val, "has_certificate")}
        />
      </Grid>
      <Grid item xl={9} lg={12} md={12} sm={12} xs={12}>
        <Input 
          label="2. Tên dự án chung cư/nhà chung cư" 
          required
          disabled={ruleDisabled}
          value={Department?.project_name ?? ""}
          onDebounce={(val) => onChangeDepartment(val, "project_name")}
          message={ getMessage('project_name', {position: itemActive?.activeUUID ?? ''})}
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
            <LegalInformationOwner
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
