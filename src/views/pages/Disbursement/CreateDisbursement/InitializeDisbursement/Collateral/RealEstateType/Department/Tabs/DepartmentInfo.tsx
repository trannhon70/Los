import { Grid } from "@mui/material";
import React, { FC, Fragment } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import {
  IDepartmentInfo,
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";

const DepartmentInfo: FC = () => {
  const onAdd = () => {
  };

  const optionsDep: ObjectListOption[] = [{
    label: `Căn hộ chung cư 1`,
    circle: <AiOutlineFileWord />,
  },
  {
    label: `Căn hộ chung cư 2`,
    circle: <AiOutlineFileWord />,
  }
  ]

  const onChangeDep = (current: number) => {
  };


  return (
    <>
      <CardInside
        title="I. Thông tin căn hộ"
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
              onChange={onChangeDep}
              labelLength="Số lượng CHCC"
              current={0}
              options={optionsDep}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="1. Loại nhà ở"
              required
            />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="2. Loại căn hộ"

            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Loại căn hộ khác"

              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Căn hộ số"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Block/Tháp"

              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="6. Tầng"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <InputDate
              label="7. Thời gian đưa vào sử dụng"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Diện tích căn hộ theo pháp lý (m2)"
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="9. Diện tích căn hộ theo thực tế (m2)"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sở hữu theo GCN"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="11. Thời hạn sở hữu theo GCN"
              required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="12. Hạng mục được sở hữu chung ngoài căn hộ theo GCN"
              required
            />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default DepartmentInfo;
