import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';
import Input from 'views/components/base/Input';

const BasicInfoTransport: FC = () => {

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
            label="1. Loại tài sản"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="2. Số giấy đăng ký"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input 
            label="3. Tình trạng phương tiện vận tải/Động sản"
            disabled
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Input
            disabled
            label="4. Biển số đăng ký"
            value="Sạp chợ/Ô trung tâm thương mại"
          />
        </Grid>
      </Grid>
    </Box>
  </Box>
}

export default BasicInfoTransport;

