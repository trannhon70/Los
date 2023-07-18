import { Grid } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import React, { FC, useEffect } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import {
  ICertificateUsePurposes,
  IDepartmentInfoLand
} from "types/models/loan/normal/storage/CollaretalV2";
import AutocompleteMultiple, {
  AutocompleteMultipleOption
} from "views/components/base/AutocompleteMultiple";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption
} from "views/components/layout/ObjectList";
import SelectLocation, {
  SelectLocationValue
} from "views/components/widgets/SelectLocation";



const LandInfo: FC = () => {

  const { PurposeUsingLane } = useMasterData();
  
  const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUsingLane.map(
    (pul) => ({
      label: pul.name,
      value: pul.code,
    })
  );

  const changeLocation = (data: SelectLocationValue) => {

  };

  const changeLocationCertificate = (data: SelectLocationValue) => {

  };


  const onChangeData = (
    value: string | number | null,
    key: keyof IDepartmentInfoLand
  ) => {

  };
  const onChangeDataCertificateData = (
    value: string | number | null,
    key: keyof ICertificateUsePurposes
  ) => {

  };

  const onAdd = () => {

  };

  const optionsDep: ObjectListOption[] = [{
    label: `Mục đích 1`,
    circle: <AiOutlineFileWord />
  }, {
    label: `Mục đích 2`,
    circle: <AiOutlineFileWord />
  }]



  const onChangeLand = (current: number) => {
  };

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
              col={3}
              before={
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Input
                    label="1. Địa chỉ thực tế đất/dự án"
                    format
                    required
                  />
                </Grid>
              }
              label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}

              onChange={changeLocation}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectLocation
              col={3}
              before={
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Input
                    label="5. Địa chỉ theo pháp lý"
                    format
                    required
                  />
                </Grid>
              }
              onChange={changeLocationCertificate}
              label={["6. Tỉnh/TP", "7. Quận/huyện", "8. Phường/xã"]}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AutocompleteMultiple
              label="9. Mục đích sử dụng đất (theo thẩm định giá)"
              tag
              required
              options={optionsPurposeUsingLane}
              // onChange={onHandlePurposeUsingLane}
              // ref={purposeUsingLaneElement}
              // value={landAssetType?.purpose_using_lane ?? []}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
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
              enableAdd={true}
              enableMenu={false}
              onAdd={onAdd}
              onChange={onChangeLand}
              labelLength="Mục đích sử dụng đất:&nbsp;"
              current={0}
              options={optionsDep}
            />
          </Grid>
          <Grid item xl={12} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="1. Mục đích sử dụng đất theo GCN"
              required
            />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="2. Số thửa đất"
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Tờ bản đồ số"

            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Diện tích đất theo GCN (m2)"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Diện tích đất thực tế (m2)"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="6. Nguồn gốc sử dụng đất theo GCN"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="7. Nguồn gốc sử dụng đất theo GCN khác"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Thời hạn sử dụng đất theo GCN"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="9. Hình thức sử dụng đất theo GCN"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sử dụng đất theo GCN khác"
              required
            />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default LandInfo;
