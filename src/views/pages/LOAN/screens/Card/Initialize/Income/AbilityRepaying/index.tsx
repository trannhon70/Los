import { Grid } from '@mui/material';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import Radio from 'views/components/base/Radio';
import AbilityRepayingStyles from './style';
import TextArea from 'views/components/base/TextArea';

const AbilityRepaying: FC = () => {
  const classes = AbilityRepayingStyles();
  return <Grid container rowSpacing="20px" columnSpacing="20px" className={`pt-5`}>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
      <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
      <span className={classes.title}>THÔNG TIN CHI TIẾT</span>
    </Grid>
    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={`${classes.inputLabel} ${classes.inputRed}`}>
      <Input label="1. Tổng hạn mức thẻ tín dụng (A) (VND)" format={true} value="10000000" disabled />
    </Grid>
    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={`${classes.inputLabel} ${classes.inputRed}`}>
      <Input label="2. Số tiền thiếu cần thanh toán (VND)" format={true} value="5000000" disabled />
    </Grid>
    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.inputLabel}>
      <Input label="3. Hệ số đánh giá khả năng trả nợ - PNI(%)" disabled />
    </Grid>
    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.inputLabel}>
      <Input label="4. Hệ số nợ trên thu nhập - DTI (%)" disabled />
    </Grid>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`${classes.inputLabel} mb-0 mscb-input w-full`}>
      <Radio
        label=" 4. Nhận xét khả năng trả nợ gốc/lãi"
        variant="checkbox"
        options={[
          { value: "yes", label: "Đảm bảo" },
          { value: "no", label: "Không đảm bảo" },
        ]}
        value="yes"
      />

    </Grid>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`${classes.inputLabel} pt-0`}>
      <TextArea className={classes.textArea} label="5. Nhận xét" />
    </Grid>
  </Grid>
}

export default AbilityRepaying;