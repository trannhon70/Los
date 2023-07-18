import { Grid } from "@mui/material";
import { FC } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import InputDate from "views/components/base/InputDate";
import Input from "views/components/base/Input";
import SpouseBasicStyle from "./style";
import SelectGender from "views/components/widgets/SelectGender";
import SelectCountry from "views/components/widgets/SelectCountry";

const BasicInfo: FC = () => {
  const classes = SpouseBasicStyle();
  const inputLabel = clsx(classes.inputLabel);

  return (
    <CardInside title="I. Thông tin cơ bản" className={classes.root}>
      <Grid container columnSpacing="20px" rowSpacing="20px">
        <Grid item xl={12} md={12} xs={12} className={inputLabel}>
          <Input label="1. Họ và tên người hôn phối" required />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <InputDate label="2. Ngày sinh" required />
        </Grid>
        <Grid item xl={4} md={6} xs={12} className={`${inputLabel}`}>
          <SelectGender label="3. Giới tính" required />
        </Grid>
        <Grid item xl={4} md={6} xs={12} className={`${inputLabel}`}>
          <SelectCountry label="4. Quốc tịch"  required />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={inputLabel}>
          <Input type="number" label="5. Số điện thoại bàn" maxlength={12} />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={inputLabel}>
          <Input
            type="number"
            label="6. Số điện thoại di động"
            maxlength={10}
            required
          />
        </Grid>
        <Grid item xl={12} md={6} xs={12} className={inputLabel}>
          <Input label="7. Email" />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BasicInfo;
