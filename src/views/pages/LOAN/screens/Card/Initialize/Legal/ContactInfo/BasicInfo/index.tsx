import { FC } from "react";
import { Grid } from "@mui/material";
import CardInside from "views/components/layout/CardInside";
import basicInfoStyle from "./style";
import Input from "views/components/base/Input";
import SelectRelationship from "views/components/widgets/SelectRelationship";
import SelectGender from "views/components/widgets/SelectGender";

const BasicInfo: FC = () => {
  const classes = basicInfoStyle();
  return (
    <CardInside title="I. Thông tin cơ bản" className={classes.root}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={6} md={12} xs={12} className={classes.inputLabel}>
          <Input label={`1. Họ và tên người liên hệ `} required />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabelRed}>
          <SelectRelationship
            label={`2. Mối quan hệ với chủ thẻ chính`}
            required
          />
        </Grid>

        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <SelectGender label={`3. Giới tính`} required />
        </Grid>
        <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
          <Input label={`4. Số điện thoại liên lạc`} maxlength={12} required />
        </Grid>
        <Grid item xl={12} md={6} xs={12} className={classes.inputLabel}>
          <Input label={`5. Email`} />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BasicInfo;
