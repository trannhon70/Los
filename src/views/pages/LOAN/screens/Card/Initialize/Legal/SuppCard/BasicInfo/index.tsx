import Grid from "@mui/material/Grid";
import { FC } from "react";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import basicInfoStyle from "./style";
import Autocomplete from "views/components/base/Autocomplete";
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
          <Input label="1. Họ tên chủ thẻ phụ" required />
        </Grid>
        <Grid item xl={4} md={4} xs={6}>
          <InputDate label="2. Ngày sinh" required />
        </Grid>
        <Grid item xl={4} md={4} xs={6} className={classes.inputLabel}>
          <SelectGender label="3. Giới tính" required  />
        </Grid>
        <Grid item xl={4} md={4} xs={12} className={classes.inputLabel}>
          <SelectCountry label="4. Quốc tịch" required />
        </Grid>
        <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
          <Input type="number" label="5. Số điện thoại bàn" maxlength={12} />
        </Grid>
        <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
          <Input
            type="number"
            label="6. Số điện thoại di động"
            maxlength={10}
            required
          />
        </Grid>
        <Grid item xl={6} md={12} xs={12} className={classes.inputLabel}>
          <Input label="7. Email" />
        </Grid>
        <Grid
          item
          xl={6}
          md={12}
          xs={12}
          className={`${classes.inputLabel} red-label`}
        >
          <SelectRelationship label="8. Mối quan hệ với chủ thẻ chính"  />
        </Grid>
        <Grid item xs={12} className="question">
          <i className="tio-square fa-xs" style={{ color: "#eb0029" }}></i>
          <span
            className="pl-2 text-14"
            style={{ color: "#eb0029", fontWeight: "500" }}
          >
            CÂU HỎI XÁC THỰC{" "}
          </span>
        </Grid>
        <Grid item xs={12}>
          <Input label={`9. Họ tên mẹ khách hàng`} required />
        </Grid>
        <Grid item xs={12}>
          <Input label={`10. Tên người bạn thân nhất`} required />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BasicInfo;
