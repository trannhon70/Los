import { Grid } from "@mui/material";
import { FC } from "react";
import BasicInfo from "./BasicInfo";
import clsx from "clsx";
import OtherCardStyle from "./style";
import IdentityInfo from "./IdentityInfo";
import AddressInfo from "./AddressInfo";
import ObjectList from "views/components/layout/ObjectList";
import OtherInfo from "./OtherInfo";

const OtherCard: FC = () => {
  const classes = OtherCardStyle();
  const otherCardClass = clsx(classes.root);

  return (
    <Grid
      container
      rowSpacing="20"
      columnSpacing="20"
      className={`${otherCardClass} pt-5`}
    >
      <Grid item xl={12} md={12} xs={12}>
        <ObjectList
          labelLength="Số lượng đối tượng khác :"
          options={[{ label: "Nguyễn Anh Đào" }, { label: "Trần Thanh Trúc" }]}
          className={`${classes.userListClass}  `}
          enableMenu={false}
          onAdd={() => {}}
        />
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <BasicInfo />
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <IdentityInfo />
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <AddressInfo />
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <OtherInfo />
      </Grid>
    </Grid>
  );
};

export default OtherCard;
