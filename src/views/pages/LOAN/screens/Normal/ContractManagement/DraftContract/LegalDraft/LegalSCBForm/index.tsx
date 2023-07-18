import Grid from "@mui/material/Grid"
import { FC } from "react"
import Input from "views/components/base/Input"
import CardInside from "views/components/layout/CardInside"

const LegalSCBForm: FC = () => {
  return <>
    <Grid container spacing={3}>
      <Grid item xl={12} xs={12}>
        <CardInside title='I. Thông tin HO'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Grid container spacing={3} className='h-full justify-between'
            sx={
              {
                "& input": {
                  fontWeight: "500",
                  '-webkit-text-fill-color': '#353535 !important'
                },
              }
            }
          >
            <Grid item xl={3} lg={3} md={3} xs={12}>
              <Input label='1. Tên ngân hàng' value='NGÂN HÀNG TMCP SÀI GÒN' disabled />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='2. Giấy chứng nhận đăng ký kinh doanh' value='0311449990 do Sở Kế Hoạch và Đầu Tư Thành Phố Hồ Chí Minh cấp lần đầu ngày 28/12/2011' disabled />
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={12} sx={{
              "& input": {
                textTransform: "uppercase",
                fontWeight: "500",
                '-webkit-text-fill-color': '#353535 !important'
              },
            }}>
              <Input label='3. Địa chỉ' value='19-21-23-25 Nguyễn Huệ, P.Bến Nghé, Q.1, TP.HCM' disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} xs={12}>
        <CardInside title='II. Thông tin đơn vị kinh doanh'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Grid container spacing={3} className='h-full justify-between'
            sx={
              {
                "& input": {
                  fontWeight: "500",
                  '-webkit-text-fill-color': '#353535 !important'
                },
              }
            }
          >
            <Grid item xl={12} lg={12} md={12} xs={12} sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}>
              <Input label='1. Tên đơn vị kinh doanh' value='NGÂN HÀNG TMCP SÀI GÒN - CN Trần Hưng Đạo' disabled />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12} sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}>
              <Input label='2. Giấy chứng nhận đăng ký hoạt động chi nhánh/Giấy chứng nhận đăng ký địa điểm kinh doanh'
                value='01211449990 do Sở Kế Hoạch và Đầu Tư Thành Phố Hồ Chí Minh cấp lần đầu ngày 28/12/2011' disabled />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <Input label='3. Địa chỉ' value='927 Trần Hưng Đạo, Phường 5, Quận 5, Thành phố Hồ Chí Minh' disabled />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <Input label='4. Số điện thoại' value='1900686868' disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} xs={12}>
        <CardInside title='III. Thông tin người đại diện'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Grid container spacing={3} className='h-full justify-between'
            sx={
              {
                "& input": {
                  fontWeight: "500",
                  '-webkit-text-fill-color': '#353535 !important'
                },
              }
            }
          >
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='1. Người đại diện' value='Trần Minh Trí' disabled />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='2. Chức vụ của người đại diện' value='Giám đốc kinh doanh' disabled />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <Input label='3. Số ủy quyền' value='239/QĐ-UQ-TGĐ.20 ngày 02/02/2020 của Tổng Giám đốc Ngân hàng TMCP Sài Gòn' disabled />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='4. Loại giấy tờ' value='CMND' disabled />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='5. Số CMND/CCCD/Hộ chiếu' value='225584025' disabled />
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={12}>
              <Input label='6. Ngày cấp' value='24/02/2005' disabled />
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={12}>
              <Input label='7. Ngày hết hạn' value='24/02/2025' disabled />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <Input label='8. Nơi cấp' value='Khánh Hòa' disabled />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  </>
}
export default LegalSCBForm