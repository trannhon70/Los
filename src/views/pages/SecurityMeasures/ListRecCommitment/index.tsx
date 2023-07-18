import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Collapse } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import { FC, useState } from "react"
import Input from "views/components/base/Input"
import InputDate from "views/components/base/InputDate"
import Select from "views/components/base/Select"
import CardOutside from "views/components/layout/CardOutside"
import SelectLocation from "views/components/widgets/SelectLocation"
import ListRecordsCommitment from "../DashboardSec/ListRecordsCommitment"

const ListRecCommitment: FC = () => {
  const [isCollapse, setCollapse] = useState<boolean>(false);

  return <>
    <CardOutside label="Tìm kiếm" className='search-form'>

      <Grid container spacing={3}>
        <Grid item xl={6} sm={12} >
          <SelectLocation label={['1. Theo tỉnh/thành', '2. Theo quận/huyện']} isWard={false} col={6} />
        </Grid>
        <Grid item xl={3} sm={12}>
          <Select label='3. Theo chi nhánh' options={[]} />
        </Grid>
        <Grid item xl={3} sm={12}>
          <Select label='4. Theo trạng thái hồ sơ' options={[]} />
        </Grid>
        <Grid item xl={12} sm={12}>
          <Collapse in={isCollapse}>
            <Grid container spacing={3}>
              <Grid item xl={3} sm={12}>
                <Input label='5. CIF khách hàng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Input label='6.Họ và tên khách hàng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <InputDate label='7. Từ ngày đến ngày' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <InputDate label='8. Đến ngày' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='9. Vùng' options={[]} />
              </Grid>
              <Grid item xl={6} sm={12}>
                <SelectLocation col={6} label={['10. Tỉnh/TP', '11. Quận/huyện']} isWard={false} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <InputDate label='12. Ngày hẹn công chứng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Input
                  suffix={
                    <>
                      <IconButton>
                        <WatchLaterIcon />
                      </IconButton>
                    </>
                  }
                  label='13. Giờ hẹn công chứng' />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='14. Nghiệp vụ' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='15. Hình thức đăng ký biện pháp bảo đảm' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='16. Loại yêu cầu' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='17. Địa điểm công chứng' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Select label='18. Trạng thái' options={[]} />
              </Grid>
              <Grid item xl={3} sm={12}>
                <Input label='19. Người thực hiện' />
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
    <ListRecordsCommitment className='mt-5' isHideBtn={true}/>
  </>
}
export default ListRecCommitment