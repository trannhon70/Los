import { Grid } from "@mui/material";
import { FC } from "react";
import BasicInfo from "./BasicInfo";
import clsx from "clsx";
import IdentityInfo from "./IdentityInfo";
import SuppCardStyle from "./style";
import AddressInfo from "./AddressInfo";
import ObjectList from "views/components/layout/ObjectList";

const SuppCard: FC = () => {
  const classes = SuppCardStyle();
  const suppCardClass = clsx(classes.root);
  const handleAddNewUser = () => {};

  return (
    <Grid
      container
      rowSpacing="20"
      columnSpacing="20"
      className={`${suppCardClass} pt-5`}
    >
      <Grid item xl={12} xs={12}>
        <ObjectList
          labelLength="Số lượng chủ thẻ phụ:"
          options={[
            { label: "Nguyễn Anh Đào" },
            { label: "Trần Thanh Trúc" },
            { label: "Trần Thanh Trúc" },
          ]}
          className={`${classes.userListClass}  `}
          enableMenu={false}
          onAdd={handleAddNewUser}
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
    </Grid>
  );
};

export default SuppCard;
