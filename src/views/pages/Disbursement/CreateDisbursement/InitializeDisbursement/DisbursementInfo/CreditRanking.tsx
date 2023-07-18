import Grid from "@mui/material/Grid"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"

const CreditRanking: FC = () => {
  return <>
    <Grid container spacing={3} className='p-3'>
      <Grid item xl={3} md={3} sm={3}>
        <InputDate label='1. Ngày xếp hạng tín dụng' disabled />
      </Grid>
      <Grid item xl={3} md={3} sm={3}>
        <Input label='2. Xếp hạng tín dụng' required disabled />

      </Grid>
    </Grid>
  </>
}
export default CreditRanking