import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import useMasterData from "app/hooks/useMasterData";
import { getLOANormalStoreColalteralLandAssetType } from "features/loan/normal/storageApproval/collateral/selector";
import { FunctionComponent, useRef } from "react";
import { useSelector } from 'react-redux';
import AutocompleteMultiple, {
  AutocompleteMultipleOption,
  AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import IconCopy from "views/components/layout/IconCopy";
import SelectLocation from "views/components/widgets/SelectLocation";
import { SxAutoCompleteTagUsePurposes } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";

export interface ILandInfomationProps {
  uuIdData?: string;
  uuIdSubType?: string;
}

const LandInfomation: FunctionComponent<ILandInfomationProps> = (props) => {

  const { uuIdData = "", uuIdSubType = "" } = props;
  const { PurposeUsingLane } = useMasterData();
    
  const purposeUsingLaneElement = useRef<AutocompleteMultipleRef>(null);

  const landAssetType = useSelector(getLOANormalStoreColalteralLandAssetType(uuIdData, uuIdSubType));

  const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUsingLane.map(pul => ({
    label: pul.name,
    value: pul.code
  }))

  return (
    <CardInside
      title="I. Thông tin chi tiết đất"
      sx={{
        "& legend": {
          fontSize: '16px'
        }
      }}
    >
      <Grid container spacing={3} className="pl-4 pb-4">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            label={[
              '2. Tỉnh/TP',
              '3. Quận/huyện',
              '4. Phường/xã'
            ]}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="1. Địa chỉ thực tế thửa đất"
                  value={landAssetType?.address ?? ""}
                  disabled={true}
                />
                <IconButton
                  sx={{
                    padding: 0
                  }}
                  className="icon-copy"
                  disabled
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            value={{
              country: "VN",
              province: landAssetType?.province ?? "",
              district: landAssetType?.district ?? "",
              ward: landAssetType?.ward ?? ""
            }}
            required={[true, true, true]}
            disabled={true}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
          sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
        >
          <SelectLocation
            col={3}
            label={[
              '6. Tỉnh/TP',
              '7. Quận/huyện',
              '8. Phường/xã'
            ]}
            disabled={true}
            before={
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                sx={{
                  display: 'flex',
                  flexFlow: 'row-reverse'
                }}
              >
                <Input
                  label="5. Địa chỉ theo GCN"
                  value={landAssetType?.certificate_address ?? ""}
                  disabled={true}
                />
                <IconButton
                  sx={{
                    padding: 0
                  }}
                  className="icon-copy"
                  disabled
                >
                  <IconCopy />
                </IconButton>
              </Grid>
            }
            value={{
              country: "VN",
              province: landAssetType?.certificate_province ?? "",
              district: landAssetType?.certificate_district ?? "",
              ward: landAssetType?.certificate_ward ?? ""
            }}
            required={[true, true, true]}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <AutocompleteMultiple
            label="9. Mục đích sử dụng đất (theo thẩm định giá)"
            tag
            required
            disabled={true}
            options={optionsPurposeUsingLane}
            ref={purposeUsingLaneElement}
            value={landAssetType?.purpose_using_lane ?? []}
            sx={SxAutoCompleteTagUsePurposes}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
            value={landAssetType?.purpose_using_lane_other ?? ""}
            disabled={true}
            required={landAssetType?.purpose_using_lane.includes("OTHER") ? true : false}
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}

export default LandInfomation;
