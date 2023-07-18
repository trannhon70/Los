import { Grid } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const ForeignLanguageLevel: React.FC = () => {

  return (
    <CardInside 
      title="Thông tin trình độ ngoại ngữ" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
    >
      <Grid container spacing={3}>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="1. Ngoại ngữ"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="2. Trình độ"
            disabled={false}
            value={'-'}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input 
            label={"3. Điểm"} 
            value={'-'} 
            disabled={false} 
          />
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          <Input
            label="4. Ngày nhận chứng chỉ"
            disabled={false}
            value={'-'}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};
export default ForeignLanguageLevel;
