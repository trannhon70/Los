import { FC } from "react";
import { Grid } from "@mui/material";
import CardInside from "views/components/layout/CardInside";
import addressInfoStyle from "./style";
import IconCopy from "views/components/layout/IconCopy";
import Input from "views/components/base/Input";
import SelectLocation from "views/components/widgets/SelectLocation";

const AddressInfo: FC = () => {
  const classes = addressInfoStyle();
  return (
    <CardInside title="II. Thông tin địa chỉ" className={classes.root}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12} className={classes.inputLabel}>
          <SelectLocation
            before={
              <Grid
                item
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="model-copy"
              >
                <IconCopy />
                <Input label="1. Địa chỉ liên lạc" />
              </Grid>
            }
            label={["2. Tỉnh/TP", "3. Quận/huyện", "4. Phường/xã"]}
            col={6}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default AddressInfo;
