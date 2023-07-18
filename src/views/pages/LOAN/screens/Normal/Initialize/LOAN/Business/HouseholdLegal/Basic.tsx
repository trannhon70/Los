import Grid from '@mui/material/Grid';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { setLOANNormalStorageLOANLegalBusiness } from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANBusiness } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANLegalBusiness } from 'types/models/loan/normal/storage/LOAN';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import CardInside from 'views/components/layout/CardInside';
import BusinessLicenseTypeCheck from 'views/components/widgets/BusinessLicenseTypeCheck';
import SelectCareerLoan from 'views/components/widgets/SelectCareerLoan';

const HouseholdLegalBasic: FC = () => {

  const dispatch = useDispatch();
  const LOANBis = useSelector(getLOANNormalStorageLOANBusiness);
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage = useNormalLoanMessage();

  const changeBis = (name: keyof ILOANNormalStorageLOANLegalBusiness) => (value: string | number | null) => {
    dispatch(setLOANNormalStorageLOANLegalBusiness(value, name));
  }
  const generateLabel =(id:string)=>{
    switch(id){
      case 'TAX':
        return 'Mã số thuế'
      case 'REGI':
        return 'Giấy CN DKKD'
      case 'CERT':
        return 'Giấy xác nhận CQDT'
      default : 
        return 'Mã số thuế'
    }
  }

  return <CardInside 
    title="I. Thông tin cơ bản"
    classBody="h-full p-4"
    sx={{ height: 'calc(100% - 20px)' }}
    fieldsetClass="px-4" 
    titleClass="px-2"
  >
    <Grid container spacing={ 2 }>
      <Grid item xl={ 4 } lg={ 4 } md={ 12 } sm={ 12 } xs={ 12 }>
        <Input
          label="1. Tên hộ kinh doanh cá thể"
          required
          onDebounce={ changeBis('name') }
          value={ LOANBis.name }
          message={ getMessage('business/household-legal', 'nameBusinessHouse') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 8 } lg={ 8 } md={ 12 } sm={ 12 } xs={ 12 }>
        <BusinessLicenseTypeCheck
          label={"2. Loại giấy tờ đăng ký"}
          value={ LOANBis.type ? LOANBis.type :  "TAX" }
          onChange={ changeBis('type') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <Input
          label={'3. '+ generateLabel(LOANBis.type)}
          required
          value={ LOANBis.num }
          onDebounce={ changeBis('num') }
          message={ getMessage('business/household-legal', 'numConfirm') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <InputDate
          label="4. Ngày cấp"
          required
          value={ LOANBis.issuedDate }
          onChange={ changeBis('issuedDate') }
          message={ getMessage('business/household-legal', 'issuedDate') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <Input
          label="5. Nơi cấp"
          required
          value={ LOANBis.placeOfIssued }
          onDebounce={ changeBis('placeOfIssued') }
          message={ getMessage('business/household-legal', 'placeOfIssued') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <Input
          label="6. Số năm kinh doanh (năm)"
          type="number"
          // format
          disabedNegative
          required
          value={ LOANBis.numOfYear?.toString()}
          onDebounce={ value => changeBis('numOfYear')(value === '' ? null : +value) }
          message={ getMessage('business/household-legal', 'numOfYear') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <SelectCareerLoan
          label="7. Ngành nghề KDC"
          required
          value={ LOANBis.code }
          onChange={ changeBis('code') }
          message={ getMessage('business/household-legal', 'codeNameBusiness') }
          disabled={ ruleDisabled }
        />
      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
        <Input
          label="8. Ngành nghề SXKD thực tế"
          required
          value={ LOANBis.career }
          onDebounce={ changeBis('career') }
          message={ getMessage('business/household-legal', 'careerReality') }
          disabled={ ruleDisabled }
        />
      </Grid>
    </Grid>
  </CardInside>

}

export default HouseholdLegalBasic;