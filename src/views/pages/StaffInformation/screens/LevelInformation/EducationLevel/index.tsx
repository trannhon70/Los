import { Grid } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const EducationLevel: React.FC = () => {

  return (
    <CardInside 
      title="Thông tin trình độ văn hóa"
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
    >
      <Grid container spacing={3}>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="1. Trình độ văn hóa"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Trình độ học vấn"
            disabled={false}
            value={'-'}
            
          />
        </Grid>

        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"3. Trình độ chuyên môn"} 
            value={'-'}
            disabled={false} 
          />
        </Grid>
        
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="4. Chuyên ngành "
            disabled={false}
            value={'-'}
           
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"5. Trường học"} 
            value={'-'}
            disabled={false} 
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"6. Hình thức đào tạo"} 
            value={'-'}
            disabled={false} 
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"7. Xếp loại"} 
            value={'-'}
            disabled={false} 
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"8. Điểm tốt nghiệp "} 
            value={'-'}
            disabled={false} 
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};
export default EducationLevel;
