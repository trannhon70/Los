import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import Input from 'views/components/base/Input';
import ObjectList from 'views/components/layout/ObjectList';

const DescribeLandInfo: FC = () => {

  return <Box className='flex' sx={{ paddingTop: '20px' }}>
  <Box component='div' width='3%'>

  </Box>
  <Box component="div" width="15%" sx={{ textTransform: 'uppercase' }}>
    Thông tin mô tả tsbĐ
  </Box>
  <Box component="div" width="82%">
    <Grid container spacing="20">
      <Grid item xl={6} md={6} xs={6}>
        <Input
          label="1. Mô tả tài sản"
          value="Diện tích đất của chính chủ, có xổ đỏ, không bị tranh chấp."
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="2. Tổng giá trị định giá (VND)"
          value="1.500.000.000"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="3. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)"
          value="1.500.000.000"
        />
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <ObjectList
          labelLength="Chọn loại"
          options={[
            { label: 'Đất', circle: <FaHandHoldingUsd /> },
            { label: 'CTXD trên đất', circle: <FaHandHoldingUsd /> },
          ]}
          current={0}
          avatar
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-between !important",
              transform: 'unset!important'
            },
            '& .ObjectListLabel': {
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 0,
              paddingTop: 0,

              '& .object-list-label': {
                fontSize: "14px",
                fontStretch: 'normal',
                fontStyle: 'normal',
                color: 'var(--mscb-secondary)',
                fontWeight: 'normal',
                paddingLeft: 0,
              },
              '& .object-list-number': {
                fontStretch: 'normal',
                fontStyle: 'normal',
                fontWeight: 'normal',
                mt: 0,
                fontSize: 'var(--mscb-fontsize)',
                color: 'var(--mscb-secondary)',
                textDecoration: 'underline',
              },
            },
            '& .ObjectListContent': {
              '& .MuiTabs-root': {
                textTransform: 'unset',
                '& .MuiTabs-scroller': {
                  '& .MuiTabs-flexContainer': {
                    width: '100%',
                    transform: 'unset !important'
                  }
                }
              },
            },
            '& .object-list-box': {
              transition: 'all ease 0.3s',
              '& .object-list-box-name': {
                textTransform: 'unset',
                textDecoration: 'none'
              },
              '& .object-list-circle': {
                color: '#707070'
              },
              '&.active,&:hover': {
                '& .object-list-circle': {
                  border: '1px solid var(--mscb-primary)',
                  bgcolor: 'var(--mscb-primary)',
                  color: '#fff'
                },
                '& .object-list-box-name': {
                  color: 'var(--mscb-primary)'
                }
              }
            }
          }}
          enableMenu={false}
          enableLength={true}
          enableNumber={false}
          enableAdd={false}
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="4. Địa chỉ theo giấy chứng nhận"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="5. Tỉnh/TP"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="6. Quận/Huyện "
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="7. Phường/Xã "
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="8. Số thửa đất"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="9. Tờ bản đồ"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="10. Diện tích đất theo giấy chứng nhận (m2)"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="11. Diện tích đất thực tế (m2)"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="12. Thời gian sử dụng đất (năm)"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="13. Nguồn gốc sử dụng đất"
          value="125 Võ Thị Sáu "
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="14. Giá trị quyền sử dụng đất (VND)"
          value="125 Võ Thị Sáu "
        />
      </Grid>
    </Grid>
  </Box>
</Box>
}

export default DescribeLandInfo;

