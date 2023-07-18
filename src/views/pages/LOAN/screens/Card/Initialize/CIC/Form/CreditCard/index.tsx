import { Divider, Grid, Typography } from "@mui/material";
import { FC } from "react";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import ObjectList, { ObjectListOption } from "views/components/layout/ObjectList";
import clsx from "clsx";
import InputDate from "views/components/base/InputDate";
import CreditCardStyle from "./style";
import { FaCreditCard } from "react-icons/fa";

export interface CreditCardProps {

}

const CreditCard: FC = (props) => {
  const classes = CreditCardStyle();
  const cardInLineClasses = clsx(classes.root);
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  const amountTitleClasses = clsx(classes.amountTitle);

  const titleCardLine = "Thẻ tín dụng";
  const labelUpdatedDate = "Ngày cập nhật CIC";
  const labelLastUpdatedDate = "Lần cuối";
  const labelCardChoice = "Chọn thẻ tín dụng";
  const labelGrantAmount = "Hạn mức thẻ (VND)";
  const labelCreditBalance = "Dư nợ thẻ (VND)";


  const LOANCategory = [{
    name: "Thẻ TD 1"
  },
  {
    name: "Thẻ TD 2"
  },
  {
    name: "Thẻ TD 3"
  },
  {
    name: "Thẻ TD 4"
  },
  {
    name: "Thẻ TD 5"
  }
  ];
  const tempOptions: ObjectListOption[] = LOANCategory.map((loan) => ({
    label: loan.name,
    circle: <FaCreditCard />,
  }));


  return <>
    <Grid container className={cardInLineClasses} >
      <Grid item xl={12} style={{ height: '12%' }}>
        <Typography className={clsx(classes.headerTitleCard, 'font-medium text-14 mb-2')}>
          {`B. ${titleCardLine}`}
        </Typography>
        <Grid container  columnSpacing="20px">
          <Grid item xl={6} className={amountTitleClasses}>
            <span className="amount-label">Hạn mức</span>
            <Input
              className={classes.inputTotal}
              disabled
            />
          </Grid>
          <Grid item xl={6} className={amountTitleClasses}>
            <span className="amount-label">Dư nợ</span>
            <Input
              className={classes.inputTotal}
              disabled
            />
          </Grid>

        </Grid>


      </Grid>
      {/* <Grid item xl={6}>
        <div>
          <span>Hạn mức</span>
        </div>
        <Input
          className={classes.inputTotal}
          disabled
        />
      </Grid> */}
      <Grid item xl={12} md={12} xs={12} style={{ height: '88%' }}>
        <CardInside title={`${titleCardLine}`} className={classes.cardInsise}>
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
              <label className={classes.inputLabel}>{`II. ${labelCardChoice}`}</label>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.infoBadge}>
              <ObjectList
                enableLength={false}
                enableAdd={true}
                options={tempOptions}
                enableMenu={false}
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
export default CreditCard;