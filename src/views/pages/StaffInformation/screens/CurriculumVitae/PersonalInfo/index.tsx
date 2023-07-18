import { Grid } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";


const PersonalInfo: React.FC = () => {
 
  return (
    <CardInside 
      title="Thông tin cá nhân"
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
    >
      <Grid container spacing={3}>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="1. Ngày sinh" 
            value={'-'} 
          />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="2. Nơi sinh" 
            value={'-'} />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="3. Giới tính" 
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="4. Dân tộc" 
            value={'-'}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={6} md={6} xs={12}>
              <Input 
                label="5. Tôn giáo" 
                value={'-'}
              />
            </Grid>
            <Grid item xl={3} lg={6} md={6} xs={12}>
              <Input 
                label="6. Quốc tịch" 
                value={'-'}
              />
            </Grid>
            <Grid item xl={3} lg={6} md={12} xs={12}>
              <Input 
                label="7. Tình trạng hôn nhân" 
                value={'-'}
              />
            </Grid>
          </Grid>
        </Grid>
        



        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="8. Số CMND/CCCD/Hộ chiếu" 
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="9. Ngày cấp" 
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="10. Ngày hết hạn" 
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={6} md={6} xs={12}>
          <Input 
            label="11. Nơi cấp" 
            value={'-'}
          />
        </Grid>
      </Grid>
    </CardInside>
  )
} 

export default PersonalInfo;