import Grid from "@mui/material/Grid";
import { FC, useState } from "react";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import basicInfoStyle from "./style";
import Input from "views/components/base/Input";
import SelectGender from "views/components/widgets/SelectGender";
import SelectCountry from "views/components/widgets/SelectCountry";
import SelectMarriageStatus from "views/components/widgets/SelectMarriedStatus";
import SelectOwnerProperty from "views/components/widgets/SelectOwnerProperty";
import SelectDependentPerson from "views/components/widgets/SelectDependentPerson";
import SelectEducation from "views/components/widgets/SelectEducation";
import SelectCusClassification from "views/components/widgets/SelectCusClassification";
import Radio, { RadioOption } from "views/components/base/Radio";

const BasicInfo: FC = () => {
  const classes = basicInfoStyle();
  const [isChangeCar, setChangeCar] = useState<boolean>(true);

  const CarData: RadioOption[] = [
    { value: "YES", label: "Có" },
    { value: "NO", label: "Không" },
  ];

  const handleChangeCar = () => {
    setChangeCar(!isChangeCar)
  }
  return (
    <>
      <CardInside
        title="I. Thông tin cơ bản"
        className={clsx(classes.basicInfoCard, "text-15")}
      >
        <Grid container columnSpacing="20" rowSpacing="20">
          <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
            <Input label="1. Họ và tên chủ thẻ chính" required />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={classes.inputLabel}>
            <Input label="2. Loại khách hàng" required />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={classes.inputText}>
            <InputDate label="3. Ngày sinh" required />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
            <Input label="4. Nơi sinh" required />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={`${classes.inputLabel}`}>
            <SelectGender label="5. Giới tính" required  />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={`${classes.inputLabel}`}>
            <SelectCountry label="6. Quốc tịch" required />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={`${classes.inputLabel}`}>
            <SelectOwnerProperty label="7. Thông tin riêng về nhà ở" required />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={`${classes.inputLabel}`}>
            <Radio
              label='8. Thông tin xe ô tô'
              variant="checkbox"
              name="oto"
              options={CarData}
              onChange={handleChangeCar}
              value={CarData[0].value}
            />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={`${classes.inputLabel}`}>
            <SelectEducation label="9. Trình độ học vấn" required />
          </Grid>
          <Grid item xl={6} md={6} xs={12} className={`${classes.inputLabel}`}>
            <SelectMarriageStatus label="10. Tình trạng hôn nhân" required />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={`${classes.inputLabel}`}>
            <SelectDependentPerson label="11. Số người phụ thuộc (< 18 tuổi)" />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={`${classes.inputLabel}`}>
            <SelectDependentPerson
              label="12. Số người phụ thuộc ( &ge; 18 tuổi)"
            />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
            <Input type="number" label="13. Số điện thoại bàn" maxlength={12} />
          </Grid>
          <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
            <Input
              type="number"
              label="14. Số điện thoại di động"
              maxlength={10}
              required
            />
          </Grid>
          <Grid item xl={6} md={12} xs={12} className={classes.inputLabel}>
            <Input label="15. Email" />
          </Grid>
          <Grid item xl={12} md={12} xs={12} className={`${classes.inputLabel}`}>
            <SelectCusClassification
              label="16. Ngành nghề kinh tế"
              required
            />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default BasicInfo;
