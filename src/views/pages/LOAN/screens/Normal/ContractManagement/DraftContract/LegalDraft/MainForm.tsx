import { Box, Button, Grid } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";
import { stageName } from "views/pages/LOAN/utils";

const MainForm: FC = () => {
  const params = useParams() as ILOANURLParams;

  const current = params['*'].split('/')[1];
  const clickList = () => {

  }
  return <>
    <Grid container spacing={3} className="mt-0">
      {/* basicInfo */}
      <Grid item xl={4} lg={4} md={4} sm={12}>
        <CardInside title='I. Thông tin cơ bản'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Box className="flex-column h-full justify-between">
            <Box>
              <Grid container spacing={3} className='h-full justify-between' sx={
                {
                  "& input": {
                    fontWeight: "500",
                    '-webkit-text-fill-color': '#353535 !important'
                  },
                }
              }>
                <Grid item xl={6} lg={6} md={6} sm={12}>
                  <Input label='1. Mã khách hàng (CIF trên Core)' disabled value='03042021' />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} sx={
                  {
                    "& input": {
                      textTransform: "uppercase",
                    },
                  }
                }>
                  <Input label='2. Họ tên khách hàng vay' disabled value='Trần Quyền anh' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='3. Ngày sinh' disabled value='12/08/1990' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='4. Giới tính' disabled value='Nam' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='5 Quốc tịch' disabled value='Việt Nam ' />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12}>
                  <Input label='6. Số điện thoại bàn' disabled value='0867589623' />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12}>
                  <Input label='7. Số điện thoại di động' disabled value='0867589623' />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Input label='8. Email' disabled value='0867589623' />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardInside>
      </Grid>
      {/* identity info */}
      <Grid item xl={4} lg={4} md={4} sm={12}>
        <CardInside title='II. Giấy tờ định danh'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Box className="flex-column h-full justify-between">
            <Box>
              <Grid container spacing={3} className='h-full justify-between'
                sx={
                  {
                    "& input": {
                      fontWeight: "500",
                      '-webkit-text-fill-color': '#353535 !important'
                    },
                  }
                }>
                <Grid item xl={8} lg={8} md={8} sm={12}>
                  <Input label='1. Số CMND/CCCD/Hộ chiếu' disabled value='079190254791' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='2. Ngày cấp' disabled value='12/08/1990' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='3. Ngày hết hạn' disabled value='12/08/2022' />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12}>
                  <Input label='4. Nơi cấp' disabled value='Công An TP. Hồ Chí Minh' />
                </Grid>
              </Grid>
            </Box>
            <Box className="pt-6 text-right">
              <Button
                variant="contained"
                sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
                onClick={clickList}
              >
                Danh sách
              </Button>
            </Box>
          </Box>
        </CardInside>
      </Grid>
      {/* Address info */}
      <Grid item xl={4} lg={4} md={4} sm={12} >
        <CardInside title='III. Thông tin địa chỉ'
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16" >
          <Box className="flex-column h-full justify-between">
            <Box>
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
                <Grid item xl={8} lg={8} md={8} sm={12}>
                  <Input label='1. Địa chỉ thường trú' disabled value='125 Võ Thị Sáu ' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='2. Tỉnh/TP' disabled value='TP. Hồ Chí Minh' />
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                  <Input label='3. Quận/Huyện' disabled value='Quận Thủ Đức' />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12}>
                  <Input label='4. Phường/Xã' disabled value='Linh Trung' />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Input label='5. Địa chỉ thường trú (thực tế)' disabled value='125 Đường số 9, phường Linh Trung, quận Linh Đông, TP. Thủ Đức' />
                </Grid>
              </Grid>
            </Box>
            <Box className="pt-6 text-right">
              <Button
                variant="contained"
                sx={{ borderRadius: 0, textTransform: "revert", boxShadow: 'unset' }}
                onClick={clickList}
              >
                Danh sách
              </Button>
            </Box>
          </Box>
        </CardInside>
      </Grid>
    </Grid>
  </>
}
export default MainForm;