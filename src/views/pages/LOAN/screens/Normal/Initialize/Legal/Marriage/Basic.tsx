import Grid from "@mui/material/Grid";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { getLOANNormalConfigValidateDateType } from "features/loan/normal/configs/validate-date-type/selector";
import { setLegalFullNameBasicInfo, setLegalValidate } from "features/loan/normal/storage/legal/actions";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { getDeclareLegalBorr, getLoanLegalBasic } from "features/loan/normal/storage/legal/selectors";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLegalDeclareBasic } from "types/models/loan/normal/storage/Legal";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import SelectCountry from "views/components/widgets/SelectCountry";
import SelectGender from "views/components/widgets/SelectGender";
import { getValidateAge } from "views/pages/LOAN/utils";
import { SxSelectDisiable } from "views/pages/LOAN/widgets/IncomeForm/style";

const MariageBasic: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.MARRIAGE;
  const ruleDisabled = useSelector(getRuleDisbled)
  const deviant = useSelector(getLOANNormalConfigValidateDateType)

  const handleCustomerTypeChange=(value: string | number | null,key: keyof ILOANNormalStorageLegalDeclareBasic) => {
    dispatch(setLegalFullNameBasicInfo(value,{declare:SCREEN,key}));
    if(key === 'birthday'){
      dispatch(setLegalValidate(getValidateAge(value as number, SCREEN,undefined,Number(deviant.find(o=>o.code === "VALUE_VALIDATE_DAY")?.value))))
    }
  }
  
  const dataBasic = useSelector(getLoanLegalBasic(SCREEN));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN))

  return (
    <CardInside
      title="I. Thông tin cơ bản"
      classBody="h-full p-6"
      sx={{ height: "calc(100% - 20px)" }}
      fieldsetClass="px-4"
      titleClass="px-2 text-16"
    >
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Input
            label="1. Họ và tên người hôn phối"
            required
            sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}
            onDebounce={(val)=>handleCustomerTypeChange(val,'fullname')}
            value={dataBasic[0]?.basic.fullname.toUpperCase()}
            disabled={disabledForm || ruleDisabled}
            message={getMessage(SCREEN, 'fullname')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <InputDate
            label="2. Ngày sinh"
            required
            onChange={(val)=>{
              handleCustomerTypeChange(val,'birthday')
            }}
            value={dataBasic[0]?.basic.birthday}
            disabled={disabledForm || ruleDisabled}
            message={getMessage(SCREEN, 'birthday')}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectGender
            label="3. Giới tính"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'gender')}
            value={dataBasic[0]?.basic.gender}
            disabled={disabledForm || ruleDisabled}
            sx={SxSelectDisiable}
            message={getMessage(SCREEN, 'gender')}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectCountry
            label="4. Quốc tịch"
            required
            onChange={(val)=>handleCustomerTypeChange(val,'national')}
            value={disabledForm ? "" : dataBasic[0]?.basic.national ?? "VN"}
            disabled={disabledForm || ruleDisabled}
            message={getMessage(SCREEN, 'national')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="5. Số điện thoại bàn"
            type="number"
            onDebounce={(val)=>handleCustomerTypeChange(val,'telephone')}
            message={getMessage(SCREEN, 'telephone')}
            value={dataBasic[0]?.basic.telephone}
            disabled={disabledForm || ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="6. Số điện thoại di động"
            type="number"
            required
            onDebounce={(val)=>handleCustomerTypeChange(val,'mobile')}
            value={dataBasic[0]?.basic.mobile}
            disabled={disabledForm || ruleDisabled}
            message={getMessage(SCREEN, 'mobile')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Input
            maxlength={100}
            label="7. Email"
            sx={{
              "& input": {
                textTransform: "lowercase",
              },
            }}
            onDebounce={(val)=>handleCustomerTypeChange(val,'email')}
            value={dataBasic[0]?.basic.email}
            disabled={disabledForm || ruleDisabled}
            message={getMessage(SCREEN, 'email')}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default MariageBasic;
