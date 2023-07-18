import Grid from "@mui/material/Grid";
import { FC } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import otherInfoStyle from "./style";
import TextArea from "views/components/base/TextArea";

const OtherInfo: FC = () => {
  const classes = otherInfoStyle();

  return (
    <CardInside
      title="IV. Thông tin khác"
      className={clsx(classes.basicInfoCard)}
    >
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12} style={{ position: "relative" }}>
          <span className={classes.update}>
            <i className={classes.updateLabel}>Cập nhật : </i>
            <i className={classes.nameLabel}>
              {" "}
              Nguyễn Văn Thanh - 9:30 - 20/05/2021
            </i>
          </span>
          <TextArea label="1. Ghi chú" className={classes.textarea} />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default OtherInfo;
