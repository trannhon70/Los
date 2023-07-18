import Grid from "@mui/material/Grid";
import { FC } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import SelectCountry from "views/components/widgets/SelectCountry";
import SelectGender from "views/components/widgets/SelectGender";

const Basic: FC = () => {
  return (
    <CardInside
      title="I. Thông tin cơ bản"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="1. Họ và tên người vay chính"
            required
            sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <InputDate label="2. Ngày sinh" required />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectGender label="3. Giới tính" required />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectCountry label="4. Quốc tịch" required />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input label="5. Số điện thoại bàn" type="number" />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input label="6. Số điện thoại di động" required type="number" />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="12. Email"
            sx={{
              "& input": {
                textTransform: "lowercase",
              },
            }}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default Basic;
