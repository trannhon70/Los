import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import OtherIncomeStyle from './style';
import UploadFileOther from './UploadFileOther';
import SelectMethodOfReceivingSalary from 'views/components/widgets/SelectMethodOfReceivingSalary';

const data: IGroupListBase[] = [
  { key: 1, value: '1', label: 'Nguồn thu khác 1' },
  { key: 2, value: '2', label: 'Nguồn thu khác 2' },
  { key: 3, value: '3', label: 'Nguồn thu khác 3' },
  { key: 4, value: '4', label: 'Nguồn thu khác 4' },
  { key: 5, value: '5', label: 'Nguồn thu khác 5' },
  { key: 6, value: '6', label: 'Nguồn thu khác 6' },
  { key: 7, value: '7', label: 'Nguồn thu khác 7' },
  { key: 8, value: '8', label: 'Nguồn thu khác 8' },
]
const OtherIncome: FC = () => {

  const classes = OtherIncomeStyle();
  return <>
    <Grid container columnSpacing="20" rowSpacing="20" className={`${classes.root} pt-6`}>
      <Grid item xl={3} sm={4} className={`${classes.inputLabel} input-red`}>
        <Input
          value="100000000"
          label="1. Tổng thu nhập khác (VND)"
          disabled />
      </Grid>
      <Grid item xl={3} sm={4} className={`${classes.inputLabel} input-red`}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled />
      </Grid>
      <Grid item xl={3} sm={4} className={`${classes.inputLabel} input-red`}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled />
      </Grid>
      <Grid item xl={12}>
        <Typography className="text-14 font-medium" >
          4. Chọn nguồn khác
        </Typography>
      </Grid>
      <Grid item xl={12}>
        <Grid container columnSpacing="20" rowSpacing="20" >
          <Grid item xl={2} lg={3} sm={12} >
            <GroupListBase
              options={data}
              labelAdd="Thêm nguồn lương"
              className={classes.groupListIncome}
            />
          </Grid>
          <Grid item xl={6} lg={9} sm={12}>
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item xl={12} className="title-salary">
                <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                <span className={classes.title}>Thông tin  Tổ chức/Công ty/Đơn vị công tác hiện tại</span>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="1. Số lần nhận thu nhập trong năm" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectMethodOfReceivingSalary label="2. Phương thức nhận thu nhập" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="3. Thu nhập thực nhận bình quân (VND)" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="4. Mô tả nguồn thu nhập" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="5. Tần suất thu nhập" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="6. Tỉ lệ nguồn thu nhập (%)" disabled />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel} input-red`}>
                <Input label="7. Thu nhập khác (VND)" disabled />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={4} lg={12} sm={12}>
            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
            <span className={classes.title}>Tài liệu đính kèm</span>
            <UploadFileOther/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>


}

export default OtherIncome;