import { Divider, Grid, Typography } from "@mui/material";
import { FC } from "react";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, { ObjectListOption } from "views/components/layout/ObjectList";
import clsx from "clsx";
import InputDate from "views/components/base/InputDate";
import NormalLoanStyle from "./style";
import { FaHandHoldingUsd } from "react-icons/fa";

export interface NormalLoanProps {

}

const NormalLoan: FC = (props) => {
  const classes = NormalLoanStyle();
  const cardInLineClasses = clsx(classes.root, "h-full");
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  const termSelectClasses = clsx(classes.termSelect);

  const titleCardLine = "Vay thông thường";
  const labelUpdatedDate = "Ngày cập nhật CIC";
  const labelLastUpdatedDate = "Lần cuối";
  const labelOrdinaryChoice = "Chọn khoản vay";
  const labelMonthlyDuration = "Thời hạn cấp tín dụng (tháng)";
  const labelGrantAmount = "Số tiền cấp tín dụng (VND)";
  const labelCreditBalance = "Dư nợ (VND)";
  const ordinaryTotalLabel = "Tổng dư nợ vay thông thường";


  const LOANCategory = [{
    name: "Ngắn hạn"
  },
  {
    name: "Trung hạn"
  },
  {
    name: "Dài hạn"
  },
  {
    name: "Khác"
  }];
  const tempOptions: ObjectListOption[] = LOANCategory.map((loan) => ({
    label: loan.name,
    circle: <FaHandHoldingUsd />,
  }));


  return <>
    <Grid container className={cardInLineClasses}>
      <Grid item xl={12}  style={{ height: '12%' }}>
        <Typography className={clsx(classes.headerTitleCard, 'font-medium text-14 mb-2')}>
          {`A. ${ordinaryTotalLabel}`}
        </Typography>
        <Input
          className={classes.inputTotal}
          disabled />

      </Grid>
      <Grid item xl={12} style={{ height: '88%' }}>
        <CardInside title={`${titleCardLine}`} className={classes.cardInside}>
          <Grid container className={gridContainerClasses} rowSpacing="20px" columnSpacing="20px">
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabelLastUpdateDate}>
              <span>
                {`${labelLastUpdatedDate}: -`}
              </span>
              <InputDate
                className={classes.inputLabel}
                label={`I. ${labelUpdatedDate}`}
              />
            </Grid>

            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>
            {/* LoanTerm II */}
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <label className={classes.inputLabel}>{`II. ${labelOrdinaryChoice}`}</label>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.infoBadge}>
              <ObjectList
                className={termSelectClasses}
                enableLength={false}
                enableAdd={false}
                options={tempOptions}
                enableMenu={false}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                label={`1. ${labelMonthlyDuration}`}
                className={classes.inputLabel}
                type="number"
                timeout={300}
                format={true}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                label={`2. ${labelGrantAmount}`}
                className={classes.inputLabel}
                // disabled={!CurrentCreditIdState.length}
                timeout={500}
                type="number"
                format={true}

              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                label={`3. ${labelCreditBalance}`}
                className={classes.inputLabel}
                timeout={500}
                type="number"
                format={true}

              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  </>

}
export default NormalLoan;