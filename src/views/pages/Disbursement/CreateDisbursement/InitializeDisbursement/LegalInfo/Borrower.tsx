import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Box from "@mui/system/Box"
import { FC } from "react"
import Input from "views/components/base/Input"
import CardInside from "views/components/layout/CardInside"

const Borrower: FC = () => {
  return <>
    <Grid container spacing={3}>
      <Grid item xl={4} md={4} sm={12}>
        <CardInside
          title="I. Thông tin cơ bản"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='1. Mã khách hàng (CIF trên Core)' disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='2. Họ và tên khách hàng vay' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='3. Ngày sinh' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='4. Giới tính' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='5. Quốc tịch' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='6. Số điện thoại bàn' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='7. Số điện thoại di động' disabled />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='8. Email' disabled />

            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={4} md={4} sm={12}>
        <CardInside
          title="II. Giấy tờ định danh"
          classBody="h-full p-6 identity"
          sx={{
            height: "calc(100% - 20px)",
            '& .identity': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }
          }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={8} md={8} sm={12}>
              <Input label='1. Số CMND/CCCD/Hộ chiếu' disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='2. Ngày cấp' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='3. Ngày hết hạn' disabled />

            </Grid>
            <Grid item xl={8} md={8} sm={12}>
              <Input label='4. Nơi cấp' disabled />
            </Grid>
          </Grid>
          <Box className="pt-6 text-right">
            <Button
              variant="contained"
              sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            >
              Danh sách
            </Button>
          </Box>
        </CardInside>
      </Grid>
      <Grid item xl={4} md={4} sm={12}>
        <CardInside
          title="III. Thông tin địa chỉ "
          classBody="h-full p-6 address"
          sx={{
            height: "calc(100% - 20px)",
            '& .address': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }
          }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='1. Địa chỉ thường trú' disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='2. Tỉnh/TP' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='3. Quận/Huyện' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='4. Phường/Xã' disabled />

            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='5. Địa chỉ thường trú (thực tế)' disabled />

            </Grid>

          </Grid>
          <Box className="pt-6 text-right">
            <Button
              variant="contained"
              sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
            >
              Danh sách
            </Button>
          </Box>
        </CardInside>
      </Grid>

    </Grid>
  </>
}
export default Borrower