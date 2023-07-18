import { FC } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import CardInside from "views/components/layout/CardInside";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import SelectGender from "views/components/widgets/SelectGender";
import SelectRelationship from "views/components/widgets/SelectRelationship";
import SelectCountry from "views/components/widgets/SelectCountry";
import { ILOANNormalStorageLegalDeclareBasic } from "types/models/loan/normal/storage/Legal";
import { onChangeDataUseList, setLegalValidate } from "features/loan/normal/storage/legal/actions";
import {
  getDeclareLegalBorr,
  getLoanLegalUseListActive, 
  getLoanLegalUseListData, 
  validateLOANNormalStorageLegal} 
  from "features/loan/normal/storage/legal/selectors";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import useNormalLegalMessage from "app/hooks/useNormalLegalMessage";
import { SxSelectDisabled } from "../style";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { getValidateAge } from "views/pages/LOAN/utils";
import { getLOANNormalConfigValidateDateType } from "features/loan/normal/configs/validate-date-type/selector";

const CoBorrowerBasic: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useNormalLegalMessage();
  const SCREEN = ELegalTypeScreen.CO_BRW;
  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));
  const dataUseList = useSelector(getLoanLegalUseListData(SCREEN,activeUserListLegal));
  const disabledForm = useSelector(getDeclareLegalBorr(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)
  const deviant = useSelector(getLOANNormalConfigValidateDateType)

  const handleFullNameChange = (value: string | number | null, key : keyof ILOANNormalStorageLegalDeclareBasic) => {
    dispatch(onChangeDataUseList(value, {declare:SCREEN,
      uuidActiveUser:activeUserListLegal,
      key:key
    }));
    if(key === 'birthday'){
      dispatch(setLegalValidate(getValidateAge(value as number, SCREEN, dataUseList?.uuidActiveLocal,Number(deviant.find(o=>o.code === "VALUE_VALIDATE_DAY")?.value))))
    }
  }

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
            label="1. Họ và tên người đồng vay"
            required
            sx={{
              "& input": {
                textTransform: "uppercase",
              },
            }}
            onDebounce={(val)=>{handleFullNameChange(val,'fullname')}}
            value={dataUseList?.basic.fullname.toUpperCase()}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'fullname', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <InputDate
            label="2. Ngày sinh"
            required
            onChange={(val)=>{
              handleFullNameChange(val,'birthday')
            }}
            value={dataUseList?.basic.birthday}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'birthday', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectGender
            label="3. Giới tính"
            required
            onChange={(val)=>{handleFullNameChange(val,'gender')}}
            value={dataUseList?.basic.gender}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'gender', { position: dataUseList?.uuidActiveLocal ?? "" })}
            sx={SxSelectDisabled}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <SelectCountry
            label="4. Quốc tịch"
            required
            onChange={(val)=>{handleFullNameChange(val,'national')}}
            value={dataUseList?.basic.national}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'national', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="5. Số điện thoại bàn"
            type="number"
            message={getMessage(SCREEN, 'telephone', { position: dataUseList?.uuidActiveLocal ?? "" })}
            onDebounce={(val)=>{handleFullNameChange(val,'telephone')}}
            value={dataUseList?.basic.telephone}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            label="6. Số điện thoại di động"
            type="number"
            required
            onDebounce={(val)=>{handleFullNameChange(val,'mobile')}}
            value={dataUseList?.basic.mobile}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'mobile', { position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Input
            maxlength={100}
            label="7. Email"
            sx={{
              "& input": {
                textTransform: "lowercase",
              },
            }}
            onDebounce={(val)=>{handleFullNameChange(val,'email')}}
            value={dataUseList?.basic.email}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'email',{ position: dataUseList?.uuidActiveLocal ?? "" })}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <SelectRelationship
            label="8. Mối quan hệ với KH vay"
            required
            onChange={(val)=>{handleFullNameChange(val,'relationship')}}
            value={dataUseList?.basic.relationship}
            disabled={disabledForm || !dataUseList?.uuidActiveLocal || ruleDisabled}
            message={getMessage(SCREEN, 'relationship', { position: dataUseList?.uuidActiveLocal ?? "" })}
            sx={SxSelectDisabled}
            otherValueFlag={"N"}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default CoBorrowerBasic;
