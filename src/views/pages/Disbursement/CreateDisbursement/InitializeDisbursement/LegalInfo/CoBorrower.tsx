import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { FC } from "react"
import { FaUser } from "react-icons/fa"
import Input from "views/components/base/Input"
import CardInside from "views/components/layout/CardInside"
import ObjectList from "views/components/layout/ObjectList"

const AssetsInfo: FC = () => {
  return <>
    <ObjectList
      labelLength='Số lượng người đồng vay: '
      enableNumber
      enableAdd={false}
      attachLabel="tập tin"
      avatar
      current={0}
      enableMenu={false}
      options={[{ label: 'NGUYỄN Anh Đào', enableUser: true, attachment: 15, circle: <FaUser /> },
      { label: 'TrẦN THANH TRÚC', enableUser: true, attachment: 12, circle: <FaUser /> }]}
      sx={{
        '& .ObjectListContent': {
          '& .MuiTabs-flexContainer': {
            width: '100%',
            transform: 'unset'
          }
        },
        '& .object-list-label-container': {
          display: 'flex',
          alignItems: 'center',
          borderColor: 'transparent',
          marginTop: 'unset !important',
          paddingLeft: 'unset !important',
          color: '#1e1d27',
          '& .object-list-label': {
            textDecoration: 'underline',
          },
          '& .object-list-number': {
            mt: 0,
            fontSize: 'var(--mscb-fontsize)',
            color: '#1e1d27',
            fontWeight: 400,
            textDecoration: 'underline'
          }
        },
        '& .object-list-box': {
          flexDirection: 'row',
          width: '215px',
          justifyContent: 'flex-start',
          border: '1px solid #707070',
          pt: 0,
          px: 2,
          '& div:last-child': {
            marginLeft: "57px",
            marginBottom: "13px"
          }
        },
        '& .object-list-box-name': {
          ml: 2,
          marginBottom: "18px"
        },
        '& .Mui-selected': {
          '& .object-list-box': {
            borderColor: 'var(--mscb-danger)'
          }
        },
      }} />

    <Grid container spacing={3} className='pt-5'>
      <Grid item xl={4} md={4} sm={12}>
        <CardInside
          title="I. Thông tin cơ bản"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16">
          <Grid container spacing={3}>

            <Grid item xl={12} md={12} sm={12}>
              <Input label='1. Họ và tên người đồng vay' disabled />
            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='2. Ngày sinh' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='3. Giới tính' disabled />

            </Grid>
            <Grid item xl={4} md={4} sm={12}>
              <Input label='4. Quốc tịch' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='5. Số điện thoại bàn' disabled />

            </Grid>
            <Grid item xl={6} md={6} sm={12}>
              <Input label='6. Số điện thoại di động' disabled />
            </Grid>
            <Grid item xl={12} md={12} sm={12}>
              <Input label='7. Email' disabled />

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
export default AssetsInfo