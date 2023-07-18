import Grid from "@mui/material/Grid";
import useApprovalLOANMessage from "app/hooks/useApprovalLOANMessage";
import { setBusinessActivitiesBasic } from "features/loan/normal/storageApproval/loan/action";
import { getApprovalLOANBusinessActivitiesBasicInfo } from "features/loan/normal/storageApproval/loan/selectors";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IApprovalLOANBABasicInfo } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import BusinessLicenseTypeCheck from "views/components/widgets/BusinessLicenseTypeCheck";
import SelectCareerLoan from "views/components/widgets/SelectCareerLoan";
import { generateLabel } from "views/pages/LOAN/utils";
const BasicInfo: FC = () => {

  const dispatch = useDispatch()
  const getMessage = useApprovalLOANMessage();
  const basic_info = useSelector(getApprovalLOANBusinessActivitiesBasicInfo)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const onChangData = (value: string | number | null, key: keyof IApprovalLOANBABasicInfo) =>{
    dispatch(setBusinessActivitiesBasic(value, { key: key }))
  }

  
  return (
    <CardInside
      title="I. Thông tin cơ bản"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2"
    >
      <Grid container spacing={3}>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <Input 
            label="1. Tên hộ kinh doanh cá thể" 
            required  
            onDebounce={(val)=>{onChangData(val,'business_household_name')}}
            value={basic_info?.business_household_name}
            disabled={ruleDisabled}
            message={getMessage('emptyBasic',{fieldName:"business_household_name"})}
          />
        </Grid>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <BusinessLicenseTypeCheck 
            label="2. Loại giấy tờ đăng ký"
            onChange={(val)=>{onChangData(val,'business_license_type_info')}}
            disabled={ruleDisabled}
            value={basic_info?.business_license_type_info ? basic_info?.business_license_type_info : 'TAX'}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Input 
            label={"3. "+ generateLabel(basic_info?.business_license_type_info) }
            required 
            onDebounce={(val)=>{onChangData(val,'business_card_num')}}
            disabled={ruleDisabled}
            value={basic_info?.business_card_num}
            message={getMessage('emptyBasic',{fieldName:"business_card_num"})}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <InputDate 
            label="4. Ngày cấp" 
            required
            disabled={ruleDisabled} 
            onChange={(val) =>{onChangData(Number((val ?? 0) / 1000),'business_card_issue_date')}}
            value={Number(basic_info?.business_card_issue_date) * 1000 ?? 0}
            message={getMessage('emptyBasic',{fieldName:"business_card_issue_date"})}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Input 
            label="5. Nơi cấp" 
            required
            disabled={ruleDisabled} 
            onDebounce={(val)=>{onChangData(val,'business_card_place_of_issue')}}
            value={basic_info?.business_card_place_of_issue}
            message={getMessage('emptyBasic',{fieldName:"business_card_place_of_issue"})}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} sx={{
            "& .mscb-input": {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Input 
            label="6. Số năm kinh doanh (năm)" 
            type="number"
            disabled={ruleDisabled} 
            onDebounce={(val) =>{onChangData(+val,'business_working_year_num')}}
            value={basic_info?.business_working_year_num?.toString()}
            message={getMessage('emptyBasic',{fieldName:"business_working_year_num"})}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SelectCareerLoan 
            label="7. Ngành nghề KD chính" 
            required
            disabled={ruleDisabled} 
            onChange={(val) =>{onChangData(val,'primary_business_code')}}
            value={basic_info?.primary_business_code}
            message={getMessage('emptyBasic',{fieldName:"primary_business_code"})}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} sx={{
            "& .mscb-input": {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Input 
            label="8. Ngành nghề SXKD thực tế" 
            required
            disabled={ruleDisabled} 
            onDebounce={(val) =>{onChangData(val,'business_actual')}}
            value={basic_info?.business_actual}
            message={getMessage('emptyBasic',{fieldName:"business_actual"})}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default BasicInfo;
