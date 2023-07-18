import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';
import Input from 'views/components/base/Input';

const BasicInfo: FC = () => {

  return <Box className='flex'> 
    <Box component='div' width='3%'>
      
    </Box>
    <Box component="div" width="15%" sx={{ textTransform: 'uppercase' }}>
      Thông tin cơ bản
    </Box>
    <Box component="div" width="82%" sx={{ borderBottom: 'solid 1px #d5d5d5', paddingBottom: '20px' }}>
      <Grid container spacing="20">
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="1. Loại bất động sản"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="2. Số giấy chứng nhận"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="3. Tình trạng bất động sản"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input
            disabled
            label="4. Xếp loại tài sản đảm bảo"
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="5. Địa chỉ theo giấy chứng nhận"
            value="Sạp chợ/Ô trung tâm thương mại"
            disabled
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="6. Tỉnh/TP"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="7. Quận/Huyện "
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="8. Phường/Xã"
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
      </Grid>
    </Box>
  </Box>
}

export default BasicInfo;

