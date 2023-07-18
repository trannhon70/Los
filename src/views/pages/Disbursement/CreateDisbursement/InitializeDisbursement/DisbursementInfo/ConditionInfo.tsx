import Grid from "@mui/material/Grid"
import { FC } from "react"
import Input from "views/components/base/Input"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"

const ConditionInfo: FC = () => {
  return <>
    <Grid container spacing={3} className='py-3'>
      <Grid item xl={6} md={6} sm={12}>
        <CardInside
          title="I. Thông tin liên quan hạch toán giải ngân"
          classBody="h-full p-5"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} sm={12}>
              <Select options={[]} label='1. Đơn vị SCB mở tài khoản trích nợ tự động'  />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Select options={[]} label='2. Tài khoản trích thu nợ tự động'  />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='3. Mã nhân viên khách hàng cá nhân'  />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='4. Mã nhân viên hỗ trợ kinh doanh'  />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='5. Mã nhân viên quản lí gián tiếp'  />
            </Grid>

          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} md={6} sm={12}>
        <CardInside
          title="II. Thông tin liên hệ"
          classBody="h-full p-5"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='1. Họ và tên nhân viên kinh doanh '  required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='2. Số điện thoại nhân viên kinh doanh'  required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='3. Họ và tên cấp kiểm soát'  required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='4. Số điện thoại cấp kiểm soát'  required />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  </>
}
export default ConditionInfo