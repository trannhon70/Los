import { Grid } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import {
  onLandCertificateInfoApproval,
  setLandInformationDataApproval,
} from "features/loan/normal/storageApproval/collateral/actions";
import { FC, useEffect, useRef} from "react";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {
  IDepartmentInfoLand,
} from "types/models/loan/normal/storage/CollaretalV2";
import AutocompleteMultiple, {
  AutocompleteMultipleOption,
  AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import SelectLocation from "views/components/widgets/SelectLocation";
import { SxAutoCompleteTagUsePurposes, SxOnjectListLandAssets } from "../../../style";
import SelectOriginLaneUse from "views/components/widgets/SelectOriginLaneUse";
import SelectLandUseCertified from "views/components/widgets/SelectLandUseCertified";
import IconCopy from "views/components/layout/IconCopy";
import IconButton from '@mui/material/IconButton';
import SelectPurposeUsingLane from "views/components/widgets/SelectPurposeUsingLane";
import {
  getLoanNormalSubTypeItemsActiveApproval,
  getLoanNormalSubTypeItemsDetailsApproval,
  getLoanNormalSubTypeItemsDetailsCertificateApproval
} from "features/loan/normal/storageApproval/collateral/selector";
export interface LandInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const LandInfo: FC<LandInfoProps> = (props) => {
  const { uuIdData = "", uuIdSubType = "" } = props;
  const { PurposeUseLaneValuation } = useMasterData();
  
  const dispatch = useDispatch();
  const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUseLaneValuation.map(
    (pul) => ({
      label: pul.name,
      value: pul.code,
    })
  );

  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActiveApproval(uuIdData ?? "", uuIdSubType ?? "")
  );

  const dataDetails = useSelector(
    getLoanNormalSubTypeItemsDetailsApproval(
      uuIdData ?? "",
      uuIdSubType ?? "",
      SubTypeItemsActive ?? ""
    )
  );

  const dataDetailsCertificate = useSelector(
    getLoanNormalSubTypeItemsDetailsCertificateApproval(
      uuIdData ?? "",
      uuIdSubType ?? "",
      SubTypeItemsActive ?? "",
      dataDetails?.activeUUIDCertificateUsePurposes ?? ""
    )
  );

  const purposeUsingLaneElement = useRef<AutocompleteMultipleRef>(null)

  const onChangeData = (
    value: string | number | null | string[] | number[],
    key: keyof IDepartmentInfoLand
  ) => {
    dispatch(
      setLandInformationDataApproval(value, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
        key,
      })
    );
  };

  const optionsDep: ObjectListOption[] =
    dataDetails?.department.department_info_land.certificate_use_purposes?.map(
      (item, i) => ({
        label: `Mục đích ${i + 1}`,
        circle: <BsFillFileEarmarkFill />,
      })
    ) ?? [];

  const activeLand = dataDetails?.department?.department_info_land?.certificate_use_purposes?.findIndex(
    (item) =>
      item.activeUUIDCertificateUsePurposes ===
      dataDetails.activeUUIDCertificateUsePurposes
  );

  const onChangeLand = (current: number) => {
    const currentActive = dataDetails?.department?.department_info_land
      ? dataDetails?.department?.department_info_land.certificate_use_purposes[current]
          ?.activeUUIDCertificateUsePurposes ?? ""
      : "";
    dispatch(
      onLandCertificateInfoApproval(currentActive, {
        uuidData: uuIdData,
        uuidSubType: uuIdSubType,
        uuidItem: SubTypeItemsActive ?? "",
      })
    );
  };
  const indexOther = dataDetails?.department?.department_info_land.use_purposes?.includes("OTHER")
  
  useEffect(()=>{
    if(!indexOther){
      onChangeData('', "other_use_purpose");
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[indexOther])

  return (
    <>
      <CardInside
        title="I. Thông tin chi tiết đất/dự án"
        sx={{
          "& legend": {
            fontSize: "16px",
          },
        }}
      >
        <Grid container spacing={3} className="pl-4 pb-4">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectLocation
              sx={{
                "& .icon-copy": {
                  zIndex: "1000",
                  position: "absolute",
                  cursor: "pointer"
                },
              }}
              col={3}
              before={
                <Grid
                  item xl={3} lg={3} md={12} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
                  <Input
                    value={dataDetails?.department?.department_info_land?.address}
                    label='1. Địa chỉ thực tế đất/dự án'
                    format
                    required
                    disabled

                  />
                  <IconButton 
                    sx={{padding:0}}  
                    className="icon-copy"
                    disabled
                  >
                    <IconCopy />
                  </IconButton>
                </Grid>
              }
              label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
              value={{
                country: "VN",
                province: dataDetails?.department?.department_info_land?.province ?? "",
                district: dataDetails?.department?.department_info_land?.district ?? "",
                ward: dataDetails?.department?.department_info_land?.ward ?? "",
              }}
              disabled
              required={[true, true, true]}
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
              disabled
              before={
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
                  <Input
                    label="5. Địa chỉ theo pháp lý"
                    format
                    required
                    value={
                      dataDetails?.department?.department_info_land?.certificate_address
                    }
                    disabled
                  />
                  <IconButton 
                    sx={{padding:0}}  
                    className="icon-copy"
                    disabled
                  >
                    <IconCopy />
                  </IconButton>
                </Grid>
              }
              label={["6. Tỉnh/TP", "7. Quận/huyện", "8. Phường/xã"]}
              value={{
                country: "VN",
                province:
                  dataDetails?.department?.department_info_land?.certificate_province ?? "",
                district:
                  dataDetails?.department?.department_info_land?.certificate_district ?? "",
                ward: dataDetails?.department?.department_info_land?.certificate_ward ?? "",
              }}
              required={[true, true, true]}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AutocompleteMultiple
              label="9. Mục đích sử dụng đất (theo thẩm định giá)"
              tag
              required
              disabled
              options={optionsPurposeUsingLane}
              ref={purposeUsingLaneElement}
              value={dataDetails?.department?.department_info_land?.use_purposes ?? []}
              sx={SxAutoCompleteTagUsePurposes}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
              value={dataDetails?.department?.department_info_land?.other_use_purpose}
              disabled
              required={dataDetails?.department?.department_info_land?.use_purposes?.indexOf("OTHER") === -1 ? false : true}
            />
          </Grid>
        </Grid>
      </CardInside>

      <CardInside
        title="II. Mục đích sử dụng đất theo giấy chứng nhận"
        sx={{
          "& legend": {
            fontSize: "16px",
          },
        }}
      >
        <Grid container spacing={3} className="pl-4 pb-4">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ObjectList
              enableAdd={false}
              enableMenu={false}
              onChange={onChangeLand}
              labelLength="Mục đích sử dụng đất:&nbsp;"
              current={activeLand}
              options={optionsDep}
              sx={SxOnjectListLandAssets}
            />
          </Grid>
          <Grid item xl={12} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="1. Mục đích sử dụng đất theo GCN"
              value={dataDetailsCertificate?.use_purpose}
              required
              disabled
            />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="2. Số thửa đất"
              value={dataDetailsCertificate?.land_number?.toString()}
              disabled
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Tờ bản đồ số"
              value={dataDetailsCertificate?.map_number?.toString()}
              disabled
              
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Diện tích đất theo GCN (m2)"
              value={dataDetailsCertificate?.certificate_area?.toString()}
              disabled
              required
              type="number"
              format
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Diện tích đất thực tế (m2)"
              value={dataDetailsCertificate?.real_area?.toString()}
              disabled
              required
              type="number"
              format
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <SelectOriginLaneUse 
              label="6. Nguồn gốc sử dụng đất theo GCN"
              value={dataDetailsCertificate?.land_use_source?.toString()}
              disabled
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="7. Nguồn gốc sử dụng đất theo GCN khác"
              value={dataDetailsCertificate?.other_land_use_source?.toString()}
              disabled
              required={dataDetailsCertificate?.land_use_source === "LS_14" ? true : false}

            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Thời hạn sử dụng đất theo GCN"
              value={dataDetailsCertificate?.duration?.toString()}
              disabled
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <SelectLandUseCertified
              label="9. Hình thức sử dụng đất theo GCN"
              value={dataDetailsCertificate?.usage_form?.toString()}
              disabled
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sử dụng đất theo GCN khác"
              value={dataDetailsCertificate?.other_usage_form?.toString()}
              disabled
              required={dataDetailsCertificate?.usage_form === "OTHER" ? true : false}
            />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default LandInfo;
