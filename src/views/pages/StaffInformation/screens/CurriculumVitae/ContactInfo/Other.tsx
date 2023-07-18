import { Grid } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const Other: React.FC = () => {

  return (
    <CardInside 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-5" 
      title="Thông tin khác"
    > 
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input 
                label="1. Người liên hệ" 
                value={'-'}  
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <Input 
                label="2. Quan hệ" 
                value={'-'}  
              />
            </Grid>
            <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
              <Input 
                label="3. Số điện thoại" 
                value={'-'}  
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="4. Người bảo lãnh" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="5. Quan hệ" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="6. Số điện thoại" 
            value={'-'}  
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label="7. Ngày hết hiệu lực" 
            value={'-'}  
          />
        </Grid>
      </Grid>
    </CardInside>
  )
}

export default Other;