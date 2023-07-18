import {
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import Grid from "@mui/material/Grid";
import CardInside from "views/components/layout/CardInside";
import { useDispatch, useSelector } from 'react-redux';
import Input from "views/components/base/Input";
import SelectCustomerType from "views/components/widgets/SelectCustomerType";
import InputDate from "views/components/base/InputDate";
import SelectGender from "views/components/widgets/SelectGender";
import SelectMarriedStatus from "views/components/widgets/SelectMarriedStatus";
import SelectOwnerProperty from "views/components/widgets/SelectOwnerProperty";
import SelectDependentPerson from "views/components/widgets/SelectDependentPerson";
import SelectEducation from "views/components/widgets/SelectEducation";
import SelectCusClassification from "views/components/widgets/SelectCusClassification";
import SelectCountry from "views/components/widgets/SelectCountry";
import { setLegalFullNameBasicInfo, setLegalValidate } from "features/loan/normal/storage/legal/actions";
import { ILOANNormalStorageLegalDeclareBasic } from "types/models/loan/normal/storage/Legal";
import { getLoanLegalBasic } from "features/loan/normal/storage/legal/selectors";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { SxSelectDisabled } from "../style";
import { getValidateAge } from "views/pages/LOAN/utils";
import { getLOANNormalConfigValidateDateType } from "features/loan/normal/configs/validate-date-type/selector";



export interface BorrowerBasicRef {
  validate(): boolean;
}

const BorrowerBasic: ForwardRefRenderFunction<BorrowerBasicRef> = (_, ref) => {
  
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.BORROWER;
  const ruleDisabled = useSelector(getRuleDisbled)
  const deviant = useSelector(getLOANNormalConfigValidateDateType)

  const handleCustomerTypeChange=(value: string | number | null,key: keyof ILOANNormalStorageLegalDeclareBasic) => {
    dispatch(setLegalFullNameBasicInfo(value,{declare:SCREEN,key}));
    if(key === 'birthday'){
      dispatch(setLegalValidate(getValidateAge(value as number, SCREEN,undefined,Number(deviant.find(o=>o.code === "VALUE_VALIDATE_DAY")?.value))))
    }
  }

  const dataBasic = useSelector(getLoanLegalBasic(SCREEN));


  return (
    <CardInside
      title="I. Thông tin cơ bản"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="1. Họ và tên người vay chính"
            required
            disabled={ruleDisabled}
            sx={{
              "& input": {
                textTransform: "uppercase !important",
              },
            }}
            onDebounce={(val)=>handleCustomerTypeChange(val,'fullname')}
            value={dataBasic[0]?.basic.fullname}
            message={getMessage(SCREEN, 'fullname')}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectCustomerType
            label="2. Loại khách hàng"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'customerType')}
            value={dataBasic[0]?.basic.customerType}
            message={getMessage(SCREEN, 'customerType')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <InputDate
            label="3. Ngày sinh"
            required
            onChange={(val)=>{
              handleCustomerTypeChange(val,'birthday')

            }} 
            value={dataBasic[0]?.basic.birthday}
            message={getMessage(SCREEN, 'birthday')}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectGender
            label="4. Giới tính"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'gender')}
            value={dataBasic[0]?.basic.gender}
            message={getMessage(SCREEN, 'gender')}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectCountry
            label="5. Quốc tịch"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'national')}
            value={dataBasic[0]?.basic.national ?? "VN"}
            message={getMessage(SCREEN, 'national')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectMarriedStatus
            label="6. Tình trạng hôn nhân"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'marriageStatus')}
            value={dataBasic[0]?.basic.marriageStatus}
            message={getMessage(SCREEN, 'marriageStatus')}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectOwnerProperty
            label="7. Thông tin riêng về nhà ở"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'ownerProperty')}
            value={dataBasic[0]?.basic.ownerProperty}
            message={getMessage(SCREEN, 'ownerProperty')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectDependentPerson
            label="8. Số người phụ thuộc (< 18 tuổi)"
            onChange={(val)=>handleCustomerTypeChange(val,'under18')}
            value={dataBasic[0]?.basic.under18 ?? 0}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectDependentPerson
            label="9. Số người phụ thuộc (&ge; 18 tuổi)"
            sx={SxSelectDisabled}
            onChange={(val)=>handleCustomerTypeChange(val,'over18')}
            value={dataBasic[0]?.basic.over18 ?? 0}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="10. Số điện thoại bàn"
            type="number"
            message={getMessage(SCREEN, 'telephone')}
            onDebounce={(val)=>handleCustomerTypeChange(val,'telephone')}
            value={dataBasic[0]?.basic.telephone}
            disabled={ruleDisabled}
            sx={SxSelectDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="11. Số điện thoại di động"
            required
            type="number"
            onDebounce={(val)=>handleCustomerTypeChange(val,'mobile')}
            value={dataBasic[0]?.basic.mobile}
            message={getMessage(SCREEN, 'mobile')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            maxlength={100}
            label="12. Email"
            onDebounce={(val)=>handleCustomerTypeChange(val,'email')}
            value={dataBasic[0]?.basic.email}
            message={getMessage(SCREEN, 'email')}
            disabled={ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectEducation
            label="13. Trình độ học vấn"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'education')}
            value={dataBasic[0]?.basic.education}
            message={getMessage(SCREEN, 'education')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <SelectCusClassification
            label="14. Ngành nghề kinh tế"
            required
            sx={SxSelectDisabled}
            onChange={(val)=>handleCustomerTypeChange(val,'ecomonic')}
            value={dataBasic[0]?.basic.ecomonic}
            message={getMessage(SCREEN, 'ecomonic')}
            disabled={ruleDisabled}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default forwardRef(BorrowerBasic);
