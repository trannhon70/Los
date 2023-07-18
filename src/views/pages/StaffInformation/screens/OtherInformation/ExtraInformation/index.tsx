import { Grid, Typography } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const ExtraInformation = () => {

  return (
    <CardInside 
      title="Thông tin phụ" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }} className="pt-5">
        <Typography component="span" sx={{
          width: '7px',
          height: '7px',
          margin: '0 5px 1px 0',
          backgroundColor: 'var(--mscb-primary)',
          display: 'inline-block'
        }}></Typography>
        <Typography component="span" sx={{ color: "var(--mscb-primary)", fontWeight: 500 }}>
          THÔNG TIN TUYỂN DỤNG
        </Typography>
      </Grid>
      <Grid 
        container 
        spacing={3} 
        className="pt-5"
      >
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="1. Mã yêu cầu tuyển dụng"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Lý do tuyển dụng"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="3. Người giới thiệu"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="4. Nhân viên thay thế"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="5. Ghi chú tuyển dụng"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: "-5px", mb: "-10px" }} className="pt-5">
          <Typography component="span" sx={{
            width: '7px',
            height: '7px',
            margin: '0 5px 1px 0',
            backgroundColor: 'var(--mscb-primary)',
            display: 'inline-block'
          }}></Typography>
          <Typography component="span" sx={{ color: "var(--mscb-primary)", fontWeight: 500 }}>
            THÔNG TIN KHÁC
          </Typography>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="pt-5">
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input
                label="6. Thông tin khác"
                disabled={false}
                value={'-'}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input
                label="7. Tháng thâm niên cộng thêm"
                disabled={false}
                value={'-'}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
              <Input
                label="8. Số phép năm ưu đãi"
                disabled={false}
                value={'-'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardInside>
  );
};
export default ExtraInformation;
