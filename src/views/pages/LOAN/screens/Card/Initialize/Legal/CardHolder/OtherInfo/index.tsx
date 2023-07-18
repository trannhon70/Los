import { FC } from "react";
import { Grid } from "@mui/material";
import clsx from "clsx";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import otherStyle from "./style";
import SelectIncome3Month from "views/components/widgets/SelectIncome3Month";

const OtherInfo: FC = () => {
  const classes = otherStyle();
  const otherClass = clsx(classes.root);

  return (
    <CardInside title={`II. Thông tin khác`} className={otherClass}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12}>
          <SelectIncome3Month
            label={`1. Thu nhập bình quân 3 tháng (VND) `}
            required
          />
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
        <Grid item xl={12} md={6} xs={12}>
          <Input label={`2. Họ tên mẹ khách hàng`} required />
        </Grid>
        <Grid item xl={12} md={6} xs={12}>
          <Input label={`3. Tên người bạn thân nhất`} required />
        </Grid>
      </Grid>
    </CardInside>
  );
};
export default OtherInfo;
