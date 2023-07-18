
import MapIcon from '@mui/icons-material/Map'
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/system/Box"
import { FC } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Label from "views/components/base/Label"
import Select from "views/components/base/Select"
import TextArea from "views/components/base/TextArea"
import CardInside from "views/components/layout/CardInside"
import SelectLocation from "views/components/widgets/SelectLocation"
import WatchLaterIcon from '@mui/icons-material/WatchLater';
const NotarizedInfo: FC = () => {
  return <Box width='100%'>
    <Grid container spacing={3}>
      <Grid item xl={4} md={4} sm={4}>
        <CardInside title='I. Thông tin khoản vay'
          titleClass="px-2"
          fieldsetClass="px-4"
          classBody="h-full p-6"
          sx={{
            height: 'calc(100% - 20px)',
            "& legend": {
              fontSize: '16px!important'
            }
          }}>
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='1. Số thoả thuận cho vay' required disabled />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <TextArea label='2. Số phụ lục thoả thuận cho vay' required disabled></TextArea>
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='3. Họ tên khách hàng vay' required disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='4. Số điện thoại khách hàng vay' required disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='5. Số điện thoại liên hệ' disabled />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='6. Họ và tên người hôn phối' required disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='7. Loại tiền vay' required disabled />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='8. Số tiền vay' required disabled />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <TextArea label='9. Họ và tên người đồng vay' required disabled></TextArea>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={4} md={4} sm={4}>
        <CardInside title='II. Nội dung yêu cầu'
          titleClass="px-2"
          fieldsetClass="px-4"
          classBody="h-full p-6"
          sx={{
            height: 'calc(100% - 20px)',
            "& legend": {
              fontSize: '16px!important'
            }
          }}>
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} sm={12}>
              <Select options={[]} label='1. Nghiệp vụ' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Select options={[]} label='2. Hình thức đăng ký biện pháp bảo đảm' required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Select options={[]} label='3.Loại yêu cầu' required />
            </Grid>
            <Grid item xl={6} md={6} sm={12} sx={{
              '& .mscb-input': {
                opacity: '50%'
              }
            }}>
              <Input label='4. Loại yêu cầu khác' required placeholder='Nhập yêu cầu' />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  borderColor: "#d5d5d5",
                }}
              />
            </Grid>
            <Grid item xl={12} md={12} sm={12} className='flex'>
              <i className="tio-square fa-xs flex-center mr-1" style={{ color: "#1825aa" }}></i>
              <Label bold color="#071180" className="block text-upper">
                Địa điểm công chứng
              </Label>
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <SelectLocation col={6}
                isWard={false}
                label={[
                  '1. Tỉnh/Thành phố',
                  '2. Quận/Huyện'
                ]}
                required={[true, true]}
              />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Select options={[]} label='3. Tên phòng công chứng' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input suffix={
                <>
                  <IconButton>
                    <MapIcon />
                  </IconButton>
                </>
              }
                label='4. Địa chỉ công chứng' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12} sx={{
              '& .mscb-input': {
                opacity: '50%'
              }
            }}>
              <Input label='5. Tên phòng công chứng khác' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12} sx={{
              '& .mscb-input': {
                opacity: '50%'
              }
            }}>
              <Input label='6. Địa chỉ công chứng khác' required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <InputDate label='7. Ngày hẹn' required />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input
                suffix={
                  <>
                    <IconButton>
                      <WatchLaterIcon  />
                    </IconButton>
                  </>
                }
                label='8. Giờ hẹn' required />
            </Grid>

          </Grid>
        </CardInside >
      </Grid>
      <Grid item xl={4} md={4} sm={4}>
        <CardInside title='III. Thông tin liên hệ'
          titleClass="px-2"
          fieldsetClass="px-4"
          classBody="h-full p-6"
          sx={{
            height: 'calc(100% - 20px)',
            "& legend": {
              fontSize: '16px!important'
            }
          }}>
          <Grid container rowSpacing={3}>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='1. Họ và tên nhân viên đơn vị kinh doanh' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='2. Số điện thoại di động nhân viên đơn vị kinh doanh' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='3. Email nhân viên đơn vị kinh doanh' required />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <TextArea label='4. Ghi chú' ></TextArea>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>

    </Grid>
  </Box >

}
export default NotarizedInfo