import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import Select from 'views/components/base/Select';
import UploadFileInCome from './UploadFileInCome';
import SalarySourceStyle from './style';
import SelectMethodOfReceivingSalary from 'views/components/widgets/SelectMethodOfReceivingSalary';
import SelectBussniessType from 'views/components/widgets/SelectBussniessType';
import SelectProvince from 'views/components/widgets/SelectProvince';
import SelectDistrict from 'views/components/widgets/SelectDistrict';
import SelectWard from 'views/components/widgets/SelectWard';
import SelectContractTerm from 'views/components/widgets/SelectContractTerm';
import SelectFrequence from 'views/components/widgets/SelectFrequence';

const data: IGroupListBase[] = [
  { key: 1, value: '1', label: 'Nguồn lương 1' },
  { key: 2, value: '2', label: 'Nguồn lương 2' },
  { key: 3, value: '3', label: 'Nguồn lương 3' },
  { key: 4, value: '4', label: 'Nguồn lương 4' },
  { key: 5, value: '5', label: 'Nguồn lương 5' },
  { key: 6, value: '6', label: 'Nguồn lương 6' },
  { key: 7, value: '7', label: 'Nguồn lương 7' },
  { key: 8, value: '8', label: 'Nguồn lương 8' },
]

const SalarySource: FC = () => {

  const classes = SalarySourceStyle();
  return <>
    <Grid container columnSpacing="20" rowSpacing="20" className={`${classes.root} pt-6`}>
      <Grid item xl={3} sm={4} className={`${classes.inputLabel} input-red`}>
        <Input
          label="1. Tổng thu nhập từ nguồn lương (VND)"
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
      <Grid item xl={12} sm={12}>
        <Typography className="text-14 font-medium" >
          4. Chọn nguồn lương
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
              <Grid item xs={12} className="title-salary">
                <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                <span className={classes.title}>Thông tin  Tổ chức/Công ty/Đơn vị công tác hiện tại</span>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectBussniessType label={"1. Loại hình doanh nghiệp"} code='STATEOWNED'/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="2. Tên doanh nghiệp" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="3. Tổ chức/Công ty/Đơn vị công tác hiện tại" disabled />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="4. Mã số thuế công ty" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="5. Địa chỉ đơn vị công tác" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectProvince label="6. Tỉnh/TP" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectDistrict label="7. Quận/huyện" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectWard label="8. Phường/xã" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="9. Số điện thoại công ty" required
                  type="number"
                  maxlength={12}

                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="10. Chức danh" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Select label="11. Tình trạng làm việc" options={[]} required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectContractTerm label="12. Loại hợp đồng lao động" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <InputDate
                  label="13. Hợp đồng lao động từ ngày"
                  required
                  className="input-date-format"
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <InputDate
                  label="14. Đến ngày"
                  className="input-date-format"
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="15. Thời hạn còn lại của hợp đồng lao động (tháng)" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectMethodOfReceivingSalary
                  required
                  label="16. Phương thức nhận lương"
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <SelectFrequence label="17. Tần suất thu nhập" required />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="18. Tỉ lệ nguồn thu nhập (%)" disabled />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel}`}>
                <Input label="19. Thu nhập lương và các khoản phụ cấp (VND)" />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={`${classes.inputLabel} input-red`}>
                <Input label="20. Thu nhập lương (VND)" disabled />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={4} lg={12} sm={12}>
            <Grid item xs={12} className="title-salary">
              <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
              <span className={classes.title}>Tài liệu đính kèm</span>
            </Grid>
            <UploadFileInCome />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>


}

export default SalarySource;