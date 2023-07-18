import { Grid } from "@mui/material";
import { FC } from "react";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import Input from "views/components/base/Input";
import IdentificationStyle from "./style";

const IdentificationInfo: FC = () => {
  const classes = IdentificationStyle();
  const identityClass = clsx(classes.root);

  return (
    <>
      <CardInside title="II. Giấy tờ định danh" className={identityClass}>
        <Grid container columnSpacing="20px" rowSpacing="20px">
          <Grid item xl={12} sm={12}>
            <Input label="1. Số CMND/CCCD/Hộ chiếu" required />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default IdentificationInfo;
