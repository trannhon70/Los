import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { setCollaretalRPRO } from 'features/loan/normal/storage/collateralV2/actions';
import { getLoanNormalSubTypeItemsActive, getLOANormalStoreColalteralLandAssessment } from 'features/loan/normal/storage/collateralV2/selector';
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { ILOANNormalCollateralData, ISubItems } from 'types/models/loan/normal/storage/CollaretalV2';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import TabPanel from 'views/components/layout/TabPanel';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import LegalStatusCheck from 'views/components/widgets/LegalStatusCheck';
import LegalInfomationOwner from '../../LegalInfomationOwner';
import { SxCollateralTabs, SxRadio, SxTabBorder } from '../../style';
import MaketInfomation from './Info';
import LegalInfomationCertificateMacket from './LegalInfomationCertificateMacket';

export interface IOwnershipMaketProps {
  uuIdSubType?: string;
  collateral?: ILOANNormalCollateralData;
}

const Market: FunctionComponent<IOwnershipMaketProps> = (props) => {

  const { uuIdSubType = "", collateral } = props;

  const [CurrentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const uuidActiveData = collateral?.uuidActiveData ?? '';

  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive(uuidActiveData, uuIdSubType ?? ""));
  const dataSubItems = useSelector(getLOANormalStoreColalteralLandAssessment(uuidActiveData, uuIdSubType ?? '', SubTypeItemsActive ?? ''));

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

  return <>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Typography
        variant="h6"
        gutterBottom
        className="text-19 text-secondary"
        sx={{ fontWeight: 'bold' }}
      >
        A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN
      </Typography>
    </Grid>

    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Grid container spacing={3} >
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <CollateralCheck
            label="1. TSBĐ được hình thành từ nguồn vốn CTD"
            required
            onChange={(value) => {
              if (value === 'N') {
                onChangeSubItem(value, 'from_credit_extension')
                onChangeSubItem(null, 'is_exploited')
                onChangeSubItem(null, 'non_business_area')
              }
            }}
            value={dataSubItems?.from_credit_extension ?? undefined}
            sx={SxRadio}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <CollateralCheck
            label="2. Nguồn tiền trả nợ là nguồn tiền hình thành từ việc kinh doanh, khai thác chính TSBĐ"
            required
            onChange={(value) => onChangeSubItem(value, 'is_exploited')}
            value={dataSubItems?.is_exploited ?? ""}
            sx={SxRadio}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <CollateralCheck
            label="3. TS hiện đang đảm bảo cho nghĩa vụ CTD"
            required
            onChange={(value) => onChangeSubItem(value, 'credit_extension_secured')}
            value={dataSubItems?.credit_extension_secured ?? ""}
            sx={SxRadio}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="4. Tỷ lệ diện tích BĐS không kinh doanh (%)"
            required
            type="number"
            onDebounce={(value) => onChangeSubItem(+value, 'non_business_area')}
            value={dataSubItems?.non_business_area?.toString() ?? ""}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Input
            label="5. Tỷ lệ cho vay tối đa theo quy định (%)"
            required
            type="number"
            onDebounce={(value) => onChangeSubItem(+value, 'max_percentage')}
            value={dataSubItems?.max_percentage ?? ""}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            label="6. Giá trị QSD đất theo từng GCN (VNĐ)"
            onDebounce={(value) => onChangeSubItem(+value, 'value_of_land')}
            required
            type="number"
            format
            value={dataSubItems?.value_of_land?.toString() ?? ""}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextArea
            label="7. Thông tin nghĩa vụ đang đảm bảo"
            onDebounce={(value) => onChangeSubItem(value, 'description')}
            required
            value={dataSubItems?.description ?? ""}
          />
        </Grid>
      </Grid>
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
            <Tab label="Thông tin pháp lý" sx={SxTabBorder} />
            <Tab label="Thông tin chi tiết sạp chợ/ô tttm" />
          </Tabs>
          <SwipeableViews disabled index={CurrentTab} onChangeIndex={handleTabPanel}>
            <TabPanel padding={false} value={CurrentTab} index={0}>
              <LegalInfomationOwner
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={1}>
              <LegalInfomationCertificateMacket
              />
            </TabPanel>
            <TabPanel padding={false} value={CurrentTab} index={2}>
              <MaketInfomation
              />
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default Market;