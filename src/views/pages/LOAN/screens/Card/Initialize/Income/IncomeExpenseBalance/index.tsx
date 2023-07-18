import { Grid } from '@mui/material';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import incomeExpenseBalanceStyle from './style';

const IncomeExpenseBalance: FC = () => {
  const classes = incomeExpenseBalanceStyle();

  return <div className="pt-5">
    <Grid container columnSpacing="20" rowSpacing="20" className={classes.root} >
      <Grid item xl={12} md={12} xs={12}>
        <Grid container className={`basicInfo`} columnSpacing="20" rowSpacing="20" >
          <Grid item className={`${classes.inputLabel} input-red `} md={12} xs={12}>
            <Input  label="1. Tổng thu nhập (VND)" disabled />
          </Grid>
          <Grid item className={`${classes.inputLabel} input-red `} md={12} xs={12}>
            <Input label="1.1 Tổng thu nhập thường xuyên (VND)" disabled />
          </Grid>
          <Grid item className={`${classes.inputLabel} input-red `} md={12} xs={12}>
            <Input label="1.2 Tổng thu nhập không thường xuyên (VND)" disabled />
          </Grid>
          <Grid item className={`${classes.inputLabel} input-red `} md={12} xs={12}>
            <Input label="2. Tổng chi phí (VND)" disabled />
          </Grid>
          <Grid item className={`${classes.inputLabel} input-red `} md={12} xs={12}>
            <Input label="3. Cân đối thu nhập - chi phí (VND)" disabled />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12} className="detail-balance">
        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
        <span className={classes.title}>CHI TIẾT CHI PHÍ </span>
      </Grid>
      <Grid item xl={12} md={12} xs={12} >
        <Grid container columnSpacing="20" rowSpacing="20" >
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="1. Người phụ thuộc dưới 18 tuổi" disabled />
          </Grid>
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="2. Người phụ thuộc trên 18 tuổi" disabled />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12} >
        <Grid container columnSpacing="20" rowSpacing="20" >
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="3. Chi phí sinh hoạt gia đình (VND)" />
          </Grid>
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="4. Phí trả gốc, lãi KV không gồm nhu cầu vay lần này (VND)"  />
          </Grid>
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="5. Chi phí sinh khác (VND)"  />
          </Grid>
          <Grid item className={`${classes.inputLabel}`} xl={3} sm={6}>
            <Input label="6. Chi tiêu bình quân hàng tháng (VND)"  />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  </div>

}
export default IncomeExpenseBalance;