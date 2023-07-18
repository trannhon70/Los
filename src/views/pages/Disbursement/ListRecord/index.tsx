import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Box, Button, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react"
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import CardOutside from "views/components/layout/CardOutside";
import ListRecordsDraft from "../Form/ListRecordsDraft";

const ListRecordPage: FC = () => {
  const [isCollapse, setCollapse] = useState<boolean>(false);

  return <>
    <CardOutside label="Tìm kiếm" className='search-form'>

      <Grid container spacing={3}>
        <Grid item xl={3} sm={12} >
          <Input label='1. Mã LOS (ID LOS)' />
        </Grid>
        <Grid item xl={3} sm={12}>
          <Input label='2. Mã đơn vị' />
        </Grid>
        <Grid item xl={3} sm={12}>
          <Input label='3. Mã soạn thảo (ID ST)' />
        </Grid>
        <Grid item xl={3} sm={12}>
          <Input label='4. Mã công chứng (ID CC)' />
        </Grid>
        <Grid item xl={12} sm={12} >
          <Collapse in={isCollapse} className='pb-5'>
            <Grid container spacing={3}>
              <Grid item xl={3} sm={12}>
                <Select label='5. Trạng thái hồ sơ' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Input label='6. Số hợp đồng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <InputDate label='7. Tên khách hàng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Typography variant="h6" className="text-14 mb-2">
                  8. Ngày gửi yêu cầu lên Đơn vị nhận
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xl={6} className="flex">
                    <Typography
                      variant="h6"
                      className="text-14"
                      sx={{
                        whiteSpace: "nowrap",
                        lineHeight: "36px",
                        marginRight: "6px",
                      }}
                    >
                      Từ
                    </Typography>
                    <InputDate />
                  </Grid>
                  <Grid item xl={6} className="flex relative">
                    <Typography
                      variant="h6"
                      className="text-14"
                      sx={{
                        whiteSpace: "nowrap",
                        lineHeight: "36px",
                        marginRight: "6px",

                        "&::before": {
                          content: "''",
                          width: "18px",
                          height: "1px",
                          position: "absolute",
                          top: "68%",
                          left: "2px",
                          backgroundColor: "#707070",
                        },
                      }}
                    >
                      Đến
                    </Typography>
                    <InputDate />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='9. Loại hình CTD' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='10. Phương thức vay vốn' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='11. Loại tài sản' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='12. User thực hiện' options={[]} />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>

      <Box className='flex justify-end'>
        <Button className='btn-white mr-5' sx={{ width: '120px', height: '36', color: '#353535', borderRadius: 0, border: '1px solid black' }} > Xóa Tìm kiếm </Button>
        <Button className='btn-primary' sx={{ width: '120px', height: '36', color: '#fff', borderRadius: 0 }} > Tìm kiếm </Button>
      </Box>
      <Box className='text-primary'>{!isCollapse ? 'Tìm kiếm nâng cao' : 'Thu gọn'}
        <IconButton onClick={() => setCollapse(!isCollapse)}>
          <KeyboardArrowDownOutlined color="primary" fontSize='small' className='mscb-pointer' sx={{
            transition: 'transform ease-in-out 0.3s',
            transform: isCollapse ? undefined : 'rotate(180deg)',
            fontSize: '1rem'
          }} />
        </IconButton>
      </Box>


    </CardOutside>
    <ListRecordsDraft />
  </>
}
export default ListRecordPage