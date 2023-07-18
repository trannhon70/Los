import { Grid } from "@mui/material";
import { FC } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import Input from "views/components/base/Input";
import BasicInfoStyle from "./style";

const BasicInfo: FC = () => {
  const classes = BasicInfoStyle();
  const basicInfoClass = clsx(classes.root);

  return (
    <>
      <CardInside title="I. Thông tin cơ bản" className={basicInfoClass}>
        <Grid container columnSpacing="20px" rowSpacing="20px">
          <Grid item xl={12} md={12} xs={12}>
            <Input label="1. Họ và tên người giới thiệu" required />
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <Input label="2. Mã CIF trong CORE" required />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default BasicInfo;
