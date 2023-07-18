import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Input from "views/components/base/Input";
import Typography from "@mui/material/Typography";
import CardHolderStyle from "./style";
import { FaHandHoldingUsd } from "react-icons/fa";
import ObjectList from "views/components/layout/ObjectList";
import Select from "views/components/base/Select";
import Radio from "views/components/base/Radio";
import Signature from "./Signature"
import CardInfo from "./CardInfo";
import PaymentInfo from "./PaymentInfo";
import GiftsInfo from "./GiftsInfo";

const CardHolder: FC = () => {

  const classes = CardHolderStyle();

  return (
    <>
      <Grid container columnSpacing="20" rowSpacing="20" className={`pt-5`}>
        <Grid item xl={3} md={4} xs={12} className={classes.inputLabel}>
          <Input label="1. Hạn mức tổng đề xuất (VND)" required />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Typography
            component="h2"
            className="text-19 font-medium text-upper mb-0 w-full"
          >
            A. thông tin thẻ đang sử dụng
          </Typography>
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.labelObjectList}>
          <Grid container>
            <Typography component="h6" className={`txt-14 mb-0`}>
              1. Chọn thẻ tín dụng <span className="text-danger">*</span>
            </Typography>
            <Grid item xl={10} xs={10} md={10}>
              <ObjectList
                options={[
                  { label: "Thẻ TD 1", circle: <FaHandHoldingUsd /> },
                  { label: "Thẻ TD 2", circle: <FaHandHoldingUsd /> },
     
                ]}
                className={classes.collaretalObjList}
                enableLength={false}
                enableMenu={false}
                onAdd={() => { }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
              <Select label="2. Loại thẻ đang sử dụng" options={[]} />
            </Grid>
            <Grid item xl={3} md={6} xs={12} className={classes.inputLabel}>
              <Input label="3. Hạn mức thẻ hiện tại (VND)" />
            </Grid>
            <Grid item xl={6} md={12} xs={12} className={`${classes.labelRadio} mb-0 mscb-input w-full `} >
              <Radio
                variant="checkbox"
                label="4. Hình thức đảm bảo thẻ hiện tại"
                options={[
                  { value: "1", label: "Có tài sản bảo đảm" },
                  { value: "2", label: "Không có tài sản bảo đảm" },
                ]}
                value="1"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Typography
            component="h2"
            className="text-19 font-medium text-upper mb-0 w-full"
          >
            B. thông tin thẻ mới
          </Typography>
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={classes.labelObjectList}>
          <Grid container >
            <Typography component="h6" className={`txt-14 mb-0`}>
              1. Chọn thẻ tín dụng <span className="text-danger">*</span>
            </Typography>
            <Grid item xl={10} xs={10} md={10}>
              <ObjectList
                options={[
                  { label: "Thẻ TD 1", circle: <FaHandHoldingUsd /> },
                  { label: "Thẻ TD 2", circle: <FaHandHoldingUsd /> },

                ]}
                className={classes.collaretalObjList}
                enableLength={false}
                enableMenu={false}
                onAdd={() => { }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
              <Grid container columnSpacing="20" rowSpacing="20">
                <Grid item xl={3} xs={6} md={6}>
                  <Select label="2. Direct code" required options={[]} />
                </Grid>
                <Grid item xl={3} xs={6} md={6}>
                  <Select label="3. InDirect code" options={[]} />
                </Grid>
              </Grid>
            </Grid>

        <Grid item xl={12}>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={12} md={12} xs={12}>
              <CardInfo />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <PaymentInfo />
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
              <GiftsInfo />
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
              <Signature/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CardHolder;
