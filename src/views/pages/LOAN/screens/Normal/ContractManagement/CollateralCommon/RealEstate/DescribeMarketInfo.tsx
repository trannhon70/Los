import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';

const DescribeMarketInfo: FC = () => {

  return <Box className='flex' sx={{ paddingTop: '20px' }}>
  <Box component='div' width='3%'>
    
  </Box>
  <Box component="div" width="15%" sx={{ textTransform: 'uppercase' }}>
    Thông tin mô tả tsbĐ
  </Box>
  <Box component="div" width="82%">
    <Grid container spacing="20">
      <Grid item xl={3} md={3} xs={3}>
        <TextArea 
          label="1. Mô tả tài sản" 
          sx={{
            "& textarea": {
              height: "126px !important",
              overflowY: "scroll!important ",
              overflowX: "hidden!important",
              border: 'none',
              backgroundColor: '#f2f3f9',
              resize: 'none',
              outline: 0,
              padding: '8px 12px',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontSize: 'var(--mscb-fontsize)'
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
            }
          }} 
        />
      </Grid>
      <Grid item xl={9} md={9} xs={9}>
        <Grid container spacing="20">
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="2. Tên chợ/Trung tâm thương mại"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="3. Khu"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="4. Tầng"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="5. Ngành hàng kinh doanh"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="6. Thời gian sử dụng từ"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
          <Grid item xl={4} md={4} xs={4}>
            <Input 
              label="7. Thời gian sử dụng đến"
              disabled
              value="Sạp chợ/Ô trung tâm thương mại"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input 
          label="8. Thời gian sử dụng còn lại (tháng) "
          disabled
          value="Sạp chợ/Ô trung tâm thương mại"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input 
          label="9. Diện tích sử dụng (m2)"
          disabled
          value="Sạp chợ/Ô trung tâm thương mại"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input 
          label="10. Tổng giá trị định giá (VND)"
          disabled
          value="Sạp chợ/Ô trung tâm thương mại"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input 
          label="11. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
          disabled
          value="Sạp chợ/Ô trung tâm thương mại"
        />
      </Grid>
    </Grid>
  </Box>
</Box>
}

export default DescribeMarketInfo;

