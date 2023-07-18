import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import Select from "views/components/base/Select";

const LoanInfo: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="1. Phương thức đề nghị cấp tín dụng"
          required
          disabled
          value="Vay món/từng lần"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="2. Loại hình cấp tín dụng"
          required
          disabled
          value="Ngắn hạn"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="3. Mục đích cấp tín dụng"
          required
          disabled
          value="Cấp tín dụng"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Select
          label="4. Phương thức giải ngân"
          required
          disabled
          options={[]}
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="5. Tên đầy đủ giấy đề nghị phát hành thẻ"
          value="Giấy đề nghị kiêm HĐ phát hành và sử dụng thẻ TD"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="6. Số giấy đề nghị phát hành thẻ"
          value="GDN123456"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="7. Thời hạn đề nghị cấp tín dụng (tháng)"
          required
          disabled
          value="6"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="8. Loại tiền"
          required
          disabled
          value="VND"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="9. Số tiền vay"
          required
          disabled
          format
          value="10000000000"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="10. Thời gian ân hạn gốc (nếu có)"
          value="6"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}>
        <Input
          label="11. Thời gian ân hạn lãi (nếu có)"
          value="6"
        />
      </Grid>
    </Grid>
  );
};

export default LoanInfo;
