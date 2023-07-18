import { Grid } from "@mui/material";
import { FC } from 'react';
import Input from "views/components/base/Input";
import Label from "views/components/base/Label";
import Radio from "views/components/base/Radio";
import CardInside from "views/components/layout/CardInside";

const WorkingProfileDetail: FC = () => {

  return (
    <CardInside 
      title="Thông tin hồ sơ công tác" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2" 
    >
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input
                label="1. Ngày vào làm việc"
                value={'-'}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input
                label="2. Ngày vào thử việc"
                value={'-'}
              />
            </Grid>

            <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
              <Input 
                label="3. Ngày vào chính thức "
                value={'-'}
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="4. Đơn vị công tác hiện tại "
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="5. Chức danh "
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="6. Đơn vị gốc"
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="7. Chức danh "
            value={'-'}
          />
        </Grid>
       
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="8. Đơn vị tạm thời "
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="9. Chức danh"
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="10. Ngày tính thâm niên" 
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Label className="text-14 font-medium">
            11. Đối tượng cư trú
          </Label>
          <Radio
            disabled
            className="radio-cif flex justify-end pt-1"
            variant="checkbox"
            label=""
            value={'-'}
            options={[
              {
                label: "Có",
                value: "0",
              },
              {
                label: "Không",
                value: "1",
              },
            ]}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};
export default WorkingProfileDetail;
