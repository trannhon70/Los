import { Grid } from "@mui/material"
import Box from "@mui/system/Box"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"

const BusinessPerformance: FC = () => {
  return <>
    <Box>
      <Select options={[]} label='1. Ngành nghề kinh doanh' />
    </Box>
    <Box className='pt-3 pb-3'>
      <Grid container spacing={3}>
        <Grid item xl={4} md={4} sm={12}>
          <CardInside
            title="Tình hình công nợ"
            classBody="h-full p-5"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16">
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} sm={12}>
                <InputDate label='1. Đến thời điểm' />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='2. Các khoản phải thu (VNĐ)' />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='3. Các khoản phải trả (VNĐ)' />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={4} md={4} sm={12}>
          <CardInside
            title="Tình hình doanh thu"
            classBody="h-full p-5"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16">
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} sm={12}>
                <InputDate label='1. Đến thời điểm' />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='2. Doanh thu (VNĐ)' />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={4} md={4} sm={12}>
          <CardInside
            title="Tình hình lợi nhuận"
            classBody="h-full p-5"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16">
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} sm={12}>
                <InputDate label='1. Đến thời điểm' />
              </Grid>
              <Grid item xl={6} md={6} sm={12}>
                <Input label='2. Lợi nhuận (VNĐ)' />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    </Box>
    <Box className='pt-3 pb-3'>
      <Grid container spacing={3}>
        <Grid item xl={3} md={3} sm={12}>
          <Input label='2. Tỷ lệ lợi nhuận/Doanh thu (%)' />
        </Grid>
        <Grid item xl={3} md={3} sm={12}>
          <Input label='3. Tỷ lệ doanh thu thực hiện/Doanh thu kế hoạch (%)' />
        </Grid>
        <Grid item xl={3} md={3} sm={12}>
          <Input label='4. Tình hình chuyển doanh thu về SCB (đồng)' />
        </Grid>
        <Grid item xl={12} md={12} sm={12}>
          <Input label=' 5. Nhận xét chung về tình hình hoạt động kinh doanh' />
        </Grid>
      </Grid>
    </Box>
  </>
}
export default BusinessPerformance