import { FunctionComponent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import CardInside from 'views/components/layout/CardInside';
import Input from 'views/components/base/Input';
import InputDate from "views/components/base/InputDate";
import { setMaketInfomation } from "features/loan/normal/storage/collateralV2/actions";
import { IMaketInfo } from "types/models/loan/normal/storage/CollaretalV2";
import { getLOANormalStoreInformationMaket } from "features/loan/normal/storageApproval/collateral/selector";
export interface IMaketInfomationProps {
  uuIdData?: string;
  uuIdSubType?: string;
}

const MaketInfomation: FunctionComponent<IMaketInfomationProps> = (props) => {

  const { uuIdData = "", uuIdSubType = "" } = props;
  const dispatch = useDispatch();

  const LOANormalStoreInformationMaket = useSelector(getLOANormalStoreInformationMaket(uuIdData, uuIdSubType));

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
                value={LOANormalStoreInformationMaket?.market_name ?? ""}
                required
                disabled
                />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="2. Số hiệu gian hàng/Sạp chợ"
                value={LOANormalStoreInformationMaket?.market_code ?? ""}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="3. Vị trí"
                placeholder="Nhập vị trí"
                onDebounce={(val) => onChangeSubItemInfomationMaket(val, 'location')}
                value={LOANormalStoreInformationMaket?.location ?? ""}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Ngành hàng kinh doanh"
                value={LOANormalStoreInformationMaket?.sector ?? ""}
                required
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="5. Thời hạn sử dụng từ"
                value={LOANormalStoreInformationMaket?.start_date ?? null}
                disabled
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="6. Thời hạn sử dụng đến"
                value={LOANormalStoreInformationMaket?.end_date ?? null}
                disabled
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="7. Thời hạn sử dụng còn lại theo báo cáo thẩm định - định giá (tháng)"
                value={LOANormalStoreInformationMaket?.remaining ?? ""}
                disabled
                type= "number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="8. Diện tích sử dụng (m2)"
                value={LOANormalStoreInformationMaket?.used_area ?? ""}
                required
                disabled
                type= "number"
                format
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="9. Diện tích tính giá trị (m2)"
                value={LOANormalStoreInformationMaket?.value_area ?? ""}
                required
                type="number"
                format
                disabled
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="10. Kết cấu theo chứng từ pháp lý"
                value={LOANormalStoreInformationMaket?.structure ?? ""}
                required
                disabled
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  )
}

export default MaketInfomation;