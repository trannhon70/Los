import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import AddressInfo from "./AddressInfo";
import Input from "views/components/base/Input";
import BasicInfo from "./BasicInfo";
import Identity from "./Identity";
import OtherInfo from "./OtherInfo";
import CardLegalHolderStyle from "./style";
import clsx from "clsx";
import Checkbox from "views/components/base/Checkbox";

const CardLegalHolder: FC = () => {
  const classes = CardLegalHolderStyle();
  const otherStyle = clsx(classes.root, "mscb-other-info");
  const cardHolderClass = clsx(classes.root);

  return (
    <Grid container className={`${cardHolderClass} pt-5`}>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container>
          <Grid
            item
            xl={3}
            md={3}
            xs={12}
            className={`${classes.inputLabel} mr-8`}
          >
            <Input
              label="1. Đơn vị"
              required={true}
              disabled
            />
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Typography className="text-14 font-medium">
              2. Những đối tượng khai báo thông tin{" "}
            </Typography>
            <Checkbox
              className={`checkbox-card-holder`}
              options={[
                { label: "Người hôn phối", value: "1" },
                { label: "Chủ thẻ phụ", value: "2" },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container columnSpacing="20" rowSpacing="20">
          <Grid item xl={4} md={12} xs={12}>
            <BasicInfo />
          </Grid>
          <Grid item xl={4} md={12} xs={12} className={otherStyle}>
            <div className="mid-content-wrap w-full">
              <OtherInfo />
              <Identity />
            </div>
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <AddressInfo />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardLegalHolder;
