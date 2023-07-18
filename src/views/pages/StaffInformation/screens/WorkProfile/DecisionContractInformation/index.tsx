import { Grid } from "@mui/material";
import { FC } from 'react';
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const DecisionContractInformation: FC = () => {

  return (
    <CardInside 
      title="Thông tin quyết định/hợp đồng" 
      className="mt-2"
      classBody="h-full p-6"
      fieldsetClass="px-4"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            label="1. Loại hợp đồng"
            disabled={false}
            value={'-'}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                <Input
                  label="2. Số hợp đồng"
                  disabled={false}
                  value={'-'}
                />
              </Grid>

              <Grid item  xl={3} lg={3} md={6} sm={12} xs={12}>
                <Input 
                  label="3. Ngày bắt đầu"
                  value={'-'}
                />
              </Grid>
            
              <Grid item  xl={3} lg={3} md={12} sm={12} xs={12}>
                <Input
                  label="4. Ngày kết thúc"
                  value={'-'}
                />
              </Grid>
            </Grid>
        </Grid>

        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="5. Số phụ lục hợp đồng"
            value={'-'}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="6. Ngày bắt đầu"
            value={'-'}
          />
        </Grid>

        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="7. Ngày kết thúc"
            value={'-'} 
          />
        </Grid>
       
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="8. Ngày nghỉ việc"
            value={'-'} 
          />
        </Grid>
       
      </Grid>
    </CardInside>
  );
};
export default DecisionContractInformation;
