import Grid from "@mui/material/Grid"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import CardInside from "views/components/layout/CardInside"

const BaseInfo: FC = () => {
  return <>

    <Grid container spacing={3}>
      <Grid item xl={6} md={6} sm={12} >
        <CardInside
          title="I. Thông tin cơ bản"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='1. Mã đơn vị' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='2. ID LOS' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='3. ID Giải ngân' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='4. Mã BKRV/TTCVCT' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Select options={[]} label='5. Tên thỏa thuận nhận nợ' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='6. Ngày ký kết BKRV/TTCVCT' required disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} md={6} sm={12} >
        <CardInside
          title="II. Thỏa thuận cho vay"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='1. Số thỏa thuận cho vay' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='2. Tên thỏa thuận cho vay' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='3. Ngày ký kết TTCV' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='4. Số phụ lục thỏa thuận cho vay' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Select options={[]} label='5. Tên phụ lục thỏa thuận cho vay' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='6. Ngày ký kết phụ lục TTCV' required disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>

    <Grid container spacing={3} className='pt-5'>
      <Grid item xl={6} md={6} sm={12} >
        <CardInside
          title="III. Hợp đồng thế chấp"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='1. Số hợp đồng thế chấp' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='2. Tên hợp đồng thế chấp' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='3. Ngày ký kết hợp đồng thế chấp' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='4. Số Phụ lục hợp đồng thế chấp' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Select options={[]} label='5. Tên phụ lục hợp đồng thế chấp' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='6. Ngày ký kết phụ lục HĐTC' required disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} md={6} sm={12} >
        <CardInside
          title="IV. Cấp tín dụng"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='1. Số thông báo cấp tín dụng' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='2. Tên thông báo cấp tín dụng' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='3. Ngày thông báo cấp tín dụng' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Input label='4. Số tờ tình giải ngân' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <InputDate label='5. Ngày ký giấy đề nghị rút vốn' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Select options={[]} label='6. Cấp phê duyệt giải ngân' required disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={4} >
              <Select options={[]} label='7. Lần giải ngân' required disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>

  </>
}
export default BaseInfo