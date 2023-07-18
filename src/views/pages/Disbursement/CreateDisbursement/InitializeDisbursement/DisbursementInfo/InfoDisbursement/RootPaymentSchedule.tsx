import { Grid } from "@mui/material"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"

const RootPaymentSchedule: FC = () => {
  return <>
    <CardInside
      title="V. Lịch thanh toán lãi"
      classBody="h-full p-5"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16">
      <Grid container spacing={3}>
        <Grid item xl={6} md={6} sm={12}>
          <Input label='1. Thời gian ân hạn lãi (tháng) (nếu có)' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Select options={[]} label='2. Phương thức trả nợ lãi' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Select options={[]} label='3. Ngày trả lãi định kỳ' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <InputDate label='4. Ngày trả nợ lãi đầu tiên' disabled required />
        </Grid>
      </Grid>

    </CardInside>
  </>
}
export default RootPaymentSchedule