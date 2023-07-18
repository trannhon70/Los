import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { FC } from "react"
import { FaUser } from "react-icons/fa"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import TextArea from "views/components/base/TextArea"
import CardInside from "views/components/layout/CardInside"
import ObjectList from "views/components/layout/ObjectList"

const AuthorInfo: FC = () => {
  return <>
    <Paper>
      <Typography className='text-primary text-16 font-medium text-upper p-5'>
        THÔNG TIN UỶ QUYỀN CÁN BỘ giao dịch bảo đảm
      </Typography>
      <ObjectList
        sx={{
          '& .ObjectListLabel': {
            border: 'none',
            fontWeight: 500,
            textDecoration: 'underline',
            marginLeft: '5px'
          }
        }}
        options={[{ label: 'Trung Nhân', circle: <FaUser /> },
        { label: 'Đông Nhựt', circle: <FaUser /> }]}
        current={0}
        enableAdd
        enableMenu
        menu={[{ value: '1', label: 'Chỉnh sửa' }, { value: '2', label: 'Xóa' }]}
        labelLength='Người ủy quyền'
        enableNumber={false}
      />
      <Grid container spacing={3} className='p-5'>
        <Grid item xl={6} md={6} sm={12}>
          <CardInside title='I. Thông tin cơ bản'
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16 text-primary"
          >
            <Grid container spacing={3}>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='1. Mã user (UserID)' required />
              </Grid>
              <Grid item xl={8} md={8} sm={12}>
                <Input label='2. Họ và tên' required />

              </Grid>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='3. CMND/CCCD' required />

              </Grid>
              <Grid item xl={4} md={4} sm={12}>
                <InputDate label='4. Ngày cấp' required />

              </Grid>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='5. Nơi cấp' required />

              </Grid>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='6. Chức vụ' required />

              </Grid>
              <Grid item xl={4} md={4} sm={12}>
                <Input label='7. Số điện thoại di động' required />

              </Grid>
            </Grid>
          </CardInside>
        </Grid>
        <Grid item xl={6} md={6} sm={12}>
          <CardInside title='II. Thông tin uỷ quyền'
            classBody="h-full p-6"
            sx={{ height: "calc(100% - 20px)" }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16 text-primary "
          >
            <TextArea label="1. Thông tin ủy quyền" disabled sx={{
              height:'100%',
              "& textarea": {
                height: "100%!important",
                overflowY: "scroll!important ",
                overflowX: "hidden!important",
                border: "none",
                backgroundColor: "#f2f3f9",
                resize: "none",
                outline: 0,
                padding: "8px 12px",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontSize: "var(--mscb-fontsize)",
              },
              "& textarea::-webkit-scrollbar": {
                width: "5px",
                "border-radius": "50px",
              },
              "& textarea::-webkit-scrollbar-thumb": {
                background: "#d5d5d5",
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
              },
              "& textarea:focus": {
                outline: "none",
              },
            }} />
          </CardInside>
        </Grid>
        <Grid item xl={12} md={12} sm={12}>
          <Divider />
        </Grid>
        <Grid item xl={12} md={12} sm={12}>
          <Box className='flex justify-end'>
            <Button className='ml-4 rounded-0 btn-black' variant="contained" sx={{ width: '120px', height: '36', color: '#fff' }} > Quay lại </Button>
            <Button className='ml-4 btn-danger rounded-0' sx={{ width: '120px', height: '36', color: '#fff' }} > Xóa dữ liệu </Button>
            <Button className='ml-4 btn-success rounded-0' sx={{ width: '120px', height: '36', color: '#fff' }} > Lưu </Button>
          </Box>
        </Grid>
      </Grid>

    </Paper>
  </>
}
export default AuthorInfo