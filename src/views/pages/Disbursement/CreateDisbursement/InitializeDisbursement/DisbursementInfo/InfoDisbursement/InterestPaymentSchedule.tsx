import { Grid } from "@mui/material"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"

const InterestPaymentSchedule: FC = () => {
  return <>
    <CardInside
      title="IV. Lịch thanh toán gốc"
      classBody="h-full p-5"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16">
      <Grid container spacing={3}>
        <Grid item xl={6} md={6} sm={12}>
          <Input label='1. Thời gian ân hạn gốc (tháng) (nếu có)' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Select options={[]} label='2. Phương thức trả nợ gốc' disabled required />
        </Grid>
        <Grid item xl={4} md={4} sm={12}>
          <Input label='3. Số kỳ thanh toán' disabled required />
        </Grid>
        <Grid item xl={4} md={4} sm={12}>
          <Select options={[]} label='4. Ngày trả gốc định kỳ' disabled required />
        </Grid>
        <Grid item xl={4} md={4} sm={12}>
          <InputDate label='5. Ngày trả nợ gốc đầu tiên' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Input label='6. Số tiền gốc dự kiến trả mỗi kỳ (VND)' disabled required />
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <Input label='7. Số tiền gốc kỳ cuối (VND)' disabled required />
        </Grid>
      </Grid>
    </CardInside>
  </>
}
export default InterestPaymentSchedule