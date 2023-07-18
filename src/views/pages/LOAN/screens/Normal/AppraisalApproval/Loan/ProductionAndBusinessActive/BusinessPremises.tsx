import Grid from '@mui/material/Grid';
import { FC, Fragment } from 'react';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import SelectLocation from 'views/components/widgets/SelectLocation';
import SelectOwnershipStatus from 'views/components/widgets/SelectOwnershipStatus';
import { useDispatch, useSelector } from 'react-redux';
import { IApprovalLOANBABusinessInfo } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import { setBusinessActivitiesBusiness } from 'features/loan/normal/storageApproval/loan/action';
import { getApprovalLOANBusinessActivitiesBusinessInfo } from "features/loan/normal/storageApproval/loan/selectors";
import useApprovalLOANMessage from 'app/hooks/useApprovalLOANMessage';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const BusinessPremisesInfo: FC = () => {
  const dispatch = useDispatch()
  const getMessage = useApprovalLOANMessage();

  const business_info = useSelector(getApprovalLOANBusinessActivitiesBusinessInfo)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const onChangData = (value: string | number | null, key: keyof IApprovalLOANBABusinessInfo) =>{
    dispatch(setBusinessActivitiesBusiness(value, { key: key }))
  }
  return <CardInside 
    title="II. Thông tin cơ sở kinh doanh"
    classBody="h-full p-6"
    sx={{ height: 'calc(100% - 20px)' }}
    fieldsetClass="px-4" 
    titleClass="px-2"
  >
    <SelectLocation
      col={ 4 }
      before={
        <Fragment>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="1. Diện tích cơ sở kinh doanh (m2)"
              type="number"
              onDebounce={(val) =>{
                onChangData(+val,'business_premises_area')
              }}
              disabled={ruleDisabled}
              value={business_info?.business_premises_area?.toString()}
              message={getMessage('emptyBasic',{fieldName:"business_premises_area"})}

          />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <SelectOwnershipStatus
              label="2. Tình trạng sở hữu/sử dụng"
              required
              disabled={ruleDisabled}
              onChange={(val)=>{onChangData(val,'owner_property_info')}}
              value={business_info?.owner_property_info}
              message={getMessage('emptyBasic',{fieldName:"owner_property_info"})}
            />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="3. Thời gian cho thuê còn lại (năm)"
              type="number"
              disabled={ruleDisabled}
              onDebounce={(val)=>{onChangData(+val,'remaining_rental_period')}}
              value={business_info?.remaining_rental_period?.toString()}
              message={getMessage('emptyBasic',{fieldName:"remaining_rental_period"})}
            />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } xs={ 12 }>
            <Input
              label="4. Giá cho thuê"
              type="number"
              format
              disabled={ruleDisabled}
              onDebounce={(val)=>{onChangData(+val,'rental_cost')}}
              value={business_info?.rental_cost?.toString()}
              message={getMessage('emptyBasic',{fieldName:"rental_cost"})}
            />
          </Grid>
          <Grid item xl={ 8 } lg={ 8 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
              label="5. Địa điểm kinh doanh chính"
              type="text"
              required
              disabled={ruleDisabled}
              onDebounce={(val)=>{onChangData(val,'address')}}
              value={business_info?.address}
              message={getMessage('emptyBasic',{fieldName:"address"})}
            />
          </Grid>
        </Fragment>
      }               
      label={[
        "6. Tỉnh/TP",
        "7. Quận/huyện",
        "8. Phường/xã"
      ]}
      disabled={ruleDisabled}
      required={[ true, true, true ]}
      onChange={(val)=>{
        onChangData(val.province,'province')
        onChangData(val.district,'district')
        onChangData(val.ward,'ward')
      }}
      value={{
        country: "VN",
        province: business_info?.province?.toString() ?? "",
        district: business_info?.district?.toString() ?? "",
        ward: business_info?.ward?.toString() ?? ""
    }}
    message={[
      getMessage('emptyBasic',{fieldName:"province"}),
      getMessage('emptyBasic',{fieldName:"district"}),
      getMessage('emptyBasic',{fieldName:"ward"})
    ]}
    />
  </CardInside>

}

export default BusinessPremisesInfo;