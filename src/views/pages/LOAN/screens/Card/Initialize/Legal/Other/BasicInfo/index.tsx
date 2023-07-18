import Grid from "@mui/material/Grid";
import { FC } from "react";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import basicInfoStyle from "./style";
import Input from "views/components/base/Input";
import SelectGender from "views/components/widgets/SelectGender";
import SelectCountry from "views/components/widgets/SelectCountry";
import SelectRelationship from "views/components/widgets/SelectRelationship";

const BasicInfo: FC = () => {
  const classes = basicInfoStyle();

  return (
    <CardInside
      title="I. Thông tin cơ bản"
      className={clsx(classes.basicInfoCard)}
    >
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <Input label="1. Họ và tên đối tượng khác" required />
        </Grid>
        <Grid item xl={4} md={4} xs={6} className={classes.inputLabel}>
          <InputDate label="2. Ngày sinh" />
        </Grid>
        <Grid item xl={4} md={4} xs={6} className={classes.inputLabel}>
          <SelectGender label="3. Giới tính" />
        </Grid>
        <Grid item xl={4} md={4} xs={12} className={classes.inputLabel}>
          <SelectCountry label="4. Quốc tịch"  />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label="5. Số điện thoại bàn" maxlength={12} />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label="6. Số điện thoại di động" maxlength={10} />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label="7. Email" />
        </Grid>
        <Grid
          item
          xl={6}
          md={6}
          xs={12}
          className={`${classes.inputLabel} red-label`}
        >
          <SelectRelationship label="8. Mối quan hệ với chủ thẻ chính" />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BasicInfo;
