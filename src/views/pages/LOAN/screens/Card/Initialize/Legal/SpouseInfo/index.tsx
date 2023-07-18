import { FC } from "react";
import BasicInfo from "./BasicInfo";
import clsx from "clsx";
import SpouseInfoStyle from "./style";
import { Grid } from "@mui/material";
import AddressInfo from "./AddressInfo";
import Radio, { RadioOption } from "views/components/base/Radio";
import IdentityInfo from "./IdentityInfo";

const CardData: RadioOption[] = [
  { value: "yes", label: "Có" },
  { value: "no", label: "Không" },
];

const SpouseInfo: FC = () => {
  const classes = SpouseInfoStyle();
  const spouseInfoClass = clsx(classes.root);
  const spouseMainInfo = clsx(classes.spouseMainInfo);

  return (
    <Grid container className={`${spouseInfoClass} pt-5`}>
      <Grid item xl={12}>
        <Grid container className="mscb-input label-radio">
          <Radio
            label="1. Người hôn phối có mở thẻ phụ không?"
            variant="checkbox"
            name="collateral"
            options={CardData}
            required={true}
          />
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <Grid
          container
          className={spouseMainInfo}
          columnSpacing="20px  "
          rowSpacing="20px"
        >
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
      </Grid>
    </Grid>
  );
};

export default SpouseInfo;
