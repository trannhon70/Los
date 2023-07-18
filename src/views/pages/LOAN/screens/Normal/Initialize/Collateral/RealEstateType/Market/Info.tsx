import { FunctionComponent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import InputDate from "views/components/base/InputDate";
import { setMaketInfomation } from "features/loan/normal/storage/collateralV2/actions";
import { IMaketInfo } from "types/models/loan/normal/storage/CollaretalV2";
import { getLOANormalStoreInformationMaket, getLOANormalStoreLandLegalItemActive } from "features/loan/normal/storage/collateralV2/selector";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface IMaketInfomationProps {
  uuIdData?: string;
  uuIdSubType?: string;
}

const MaketInfomation: FunctionComponent<IMaketInfomationProps> = (props) => {

  const { uuIdData = "", uuIdSubType = "" } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const dispatch = useDispatch();
  const getMessage = useNormalCollateralMessage();

  const LOANormalStoreInformationMaket = useSelector(getLOANormalStoreInformationMaket(uuIdData, uuIdSubType));
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData,uuIdSubType ?? ''));

  const onChangeSubItemInfomationMaket = (value: string | number | null , key: keyof IMaketInfo) => {
    dispatch(setMaketInfomation(value, { uuIdData: uuIdData, uuIdSubtype: uuIdSubType, key }))
  }

  return (
    <Grid container spacing={3} className="pt-6">
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Thông tin chi tiết chợ/ô sạp/TTTM"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={2.5} className="pl-4 pb-4">
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="1. Tên chợ/TTTM"
                placeholder="Nhập tên chợ/TTTM"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'market_name')}
                value={LOANormalStoreInformationMaket?.market_name ?? ""}
                required
                disabled={ruleDisabled}
                message={ getMessage('market_name', {position: itemActive?.activeUUID ?? ''})}
                />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="2. Số hiệu gian hàng/Sạp chợ"
                placeholder="Nhập số hiệu gian hàng/Sạp chợ"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'market_code')}
                value={LOANormalStoreInformationMaket?.market_code ?? ""}
                required
                disabled={ruleDisabled}
                message={ getMessage('market_code', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="3. Vị trí"
                placeholder="Nhập vị trí"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'location')}
                value={LOANormalStoreInformationMaket?.location ?? ""}
                required
                disabled={ruleDisabled}
                message={ getMessage('marketLocation', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Ngành hàng kinh doanh"
                placeholder="Nhập ngành hàng kinh doanh"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'sector')}
                value={LOANormalStoreInformationMaket?.sector ?? ""}
                required
                disabled={ruleDisabled}
                message={ getMessage('sector', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Thời hạn sử dụng từ"
                onChange={(val) => onChangeSubItemInfomationMaket(val, 'start_date')}
                value={LOANormalStoreInformationMaket?.start_date ?? null}
                disabled={ruleDisabled}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="6. Thời hạn sử dụng đến"
                onChange={(val) => onChangeSubItemInfomationMaket(val, 'end_date')}
                value={LOANormalStoreInformationMaket?.end_date ?? null}
                disabled={ruleDisabled}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="7. Thời hạn sử dụng còn lại theo báo cáo thẩm định - định giá (tháng)"
                placeholder="Nhập thời hạn sử dụng còn lại theo báo cáo thẩm định - định giá (tháng)"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'remaining')}
                value={LOANormalStoreInformationMaket?.remaining ?? ""}
                disabled={ruleDisabled}
                type= "number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="8. Diện tích sử dụng (m2)"
                placeholder="Nhập diện tích sử dụng (m2)"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'used_area')}
                value={LOANormalStoreInformationMaket?.used_area ?? ""}
                required
                disabled={ruleDisabled}
                type= "number"
                format
                message={ getMessage('used_area', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="9. Diện tích tính giá trị (m2)"
                placeholder="Nhập diện tích tính giá trị (m2)"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'value_area')}
                value={LOANormalStoreInformationMaket?.value_area ?? ""}
                required
                type="number"
                format
                disabled={ruleDisabled}
                message={ getMessage('value_area', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="10. Kết cấu theo chứng từ pháp lý"
                placeholder="Nhập kết cấu theo chứng từ pháp lý"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'structure')}
                value={LOANormalStoreInformationMaket?.structure ?? ""}
                required
                disabled={ruleDisabled}
                message={ getMessage('structure', {position: itemActive?.activeUUID ?? ''})}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  )
}

export default MaketInfomation;