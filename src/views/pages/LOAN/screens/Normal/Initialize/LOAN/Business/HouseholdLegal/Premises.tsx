import Grid from '@mui/material/Grid';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { setLOANNormalStorageLOANLegalBusiness } from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANBusiness } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANLegalBusiness } from 'types/models/loan/normal/storage/LOAN';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import SelectLocation from 'views/components/widgets/SelectLocation';
import SelectOwnershipStatus from 'views/components/widgets/SelectOwnershipStatus';

const HouseholdLegalPremises: FC = () => {

  const dispatch = useDispatch();
  const LOANBis = useSelector(getLOANNormalStorageLOANBusiness);
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage = useNormalLoanMessage();
  const changeBis = (name: keyof ILOANNormalStorageLOANLegalBusiness) => (value: string | number | null) => {
    dispatch(setLOANNormalStorageLOANLegalBusiness(value, name));
  }

  return <CardInside 
    title="II. Thông tin cơ sở kinh doanh"
    classBody="h-full p-4"
    sx={{ height: 'calc(100% - 20px)' }}
    fieldsetClass="px-4" 
    titleClass="px-2"
  >
    <SelectLocation
      col={ 4 }
      spacing={2}
      before={
        <Fragment>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="1. Diện tích cơ sở kinh doanh (m&sup2;)"
              type="number"
              disabedNegative
              value={ (LOANBis.area ?? '').toString() }
              onDebounce={ value => changeBis('area')(value === '' ? null : +value) }
              message={ getMessage('business/household-legal', 'areaBussiness') }
              required
              disabled={ ruleDisabled }
          />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <SelectOwnershipStatus
              label="2. Tình trạng sở hữu/sử dụng"
              required
              value={ LOANBis.ownership }
              onChange={ changeBis('ownership') }
              message={ getMessage('business/household-legal', 'ownership') }
              disabled={ ruleDisabled }
            />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="3. Thời gian thuê còn lại (năm)"
              type="number"
              // disabedNegative
              value={ LOANBis?.remainLease?.toString() }
              onDebounce={ v => changeBis('remainLease')(v === '' ? null : +v) }
              disabled={ ruleDisabled }

            />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="4. Giá thuê (VND)"
              type="number"
              format
              disabedNegative
              value={ (LOANBis.rentPrice ?? '').toString() }
              onDebounce={ v => changeBis('rentPrice')(v === '' ? null : +v) }
              disabled={ ruleDisabled }
            />
          </Grid>
          <Grid item xl={ 8 } lg={ 8 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
              label="5. Địa điểm kinh doanh chính"
              type="text"
              required
              value={ (LOANBis.apartment ?? '').toString() }
              onDebounce={ changeBis('apartment') }
              message={ getMessage('business/household-legal', 'addressBusiness') }
              disabled={ ruleDisabled }
            />
            {/* <Input
              label="5. Địa điểm kinh doanh chính"
              value={ (LOANBis.apartment ?? '').toString() }
              onDebounce={ v => changeBis('apartment')(v === null ? '' : +v) }
            /> */}
          </Grid>
        </Fragment>
      }               
      label={[
        "6. Tỉnh/TP",
        "7. Quận/huyện",
        "8. Phường/xã"
      ]}
      required={[ true, true, true ]}
      value={{
        country: 'VN',
        province: LOANBis.province,
        district: LOANBis.district,
        ward: LOANBis.ward
      }}
      message={[
        getMessage('business/household-legal', 'addressProvince'),
        getMessage('business/household-legal', 'addressDistrict'),
        getMessage('business/household-legal', 'addressWard')
      ]}
      onChange={v => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { country, province, district, ward } = v;
        changeBis('province')(province);
        changeBis('district')(district);
        changeBis('ward')(ward);
      }}
      disabled={ ruleDisabled }
    />
  </CardInside>

}

export default HouseholdLegalPremises;