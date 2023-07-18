import { Grid } from "@mui/material";
import Input from "views/components/base/Input";
import CardInside from "views/components/layout/CardInside";

const OfficeInformation: React.FC = () => {
  return (
    <CardInside 
      title="Thông tin trình độ tin học" 
      classBody="h-full p-6"
      fieldsetClass="px-4"
      className="mt-2"
    >
      <Grid container spacing={3}>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Input
              label="1. Chứng chỉ"
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
              label={"3. Điểm số / xếp loại"}
              value={'-'}
              disabled={false}
            />
          </Grid>
      </Grid>
    </CardInside>
  );
};

export default OfficeInformation;
