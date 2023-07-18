import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import HorizontalList from 'views/components/layout/HorizontalList';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import IncomeAttachment from '../../Attachment';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import {
  ILOANNormalStorageIncomeAssetRentDetailRealEstate,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storage/Income';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceAssetRentType,
  removeIncomeSourceAssetRentType,
  setIncomeSourceAssetRentRealEState,
  setIncomeSourceAssetRentRealEStateData,
  setIncomeSourceAssetRentRealEStateDataFREQ,
  setIncomeSourceAssetRentRealEStateDataLocation,
  setIncomeSourceAssetRentRealEStateDataTotal
}
  from 'features/loan/normal/storage/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData
}
  from 'features/loan/normal/storage/income/selector';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import { formatNumber } from 'utils';
import { EActionMenu } from 'features/loan/normal/storage/income/case';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import useNotify from 'app/hooks/useNotify';
import { SxSelectDisiable } from '../../style';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import OwnerPropertyCheck from 'views/components/widgets/OwnerPropertyCheck';
// import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import Icon from 'views/components/atoms/Icon';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const AssetRentRealEstate: FC = () => {

  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeMessage();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const notify = useNotify();
  const disabled = !activeAssetRent?.assetDetailRealEstate?.activeRealEstate;
  const [visibleModal, setVisibleModal]=useState<{message:string}|null>(null);
  const dataRealEsate = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData(declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailRealEstate.activeRealEstate ?? ''))
  const ruleDisabled = useSelector(getRuleDisbled)
  const [ deleteIdRealEstate, setDeleteIdRealEstate ] = useState<ILOANNormalStorageIncomeAssetRentDetailRealEstate | null>(null);
  const [onBlurError, setOnBlurError] = useState('');
  const onAdd = () => {
    dispatch(addIncomeSourceAssetRentType(activeAssetRent?.assetType ?? '', { declare: declareType }))
  }

  const activeRealOptions = activeAssetRent?.assetDetailRealEstate.data
    .findIndex(c => c.uuid === activeAssetRent.assetDetailRealEstate.activeRealEstate) ?? 0;

  const optionsData: IGroupListBase[] = activeAssetRent?.assetDetailRealEstate.data.map((__, i) => ({
    value: i + 1,
    label: `Bất động sản ${i + 1}`,
    key: i + 1,
    circle:  <Icon type="batdongsan" size="40px" color="red" />
  })) ?? []

  const onChangeHorizonList = (current: number) => {
    const currentActive = activeAssetRent?.assetDetailRealEstate.data[current].uuid ?? '';
    dispatch(setIncomeSourceAssetRentRealEState(currentActive, { declare: declareType }))
  }

  const onChangeDataRealEState = (value: string | number | null, key: keyof ILOANNormalStorageIncomeAssetRentDetailRealEstate) => {
    dispatch(setIncomeSourceAssetRentRealEStateData(value, { declare: declareType, key }))
  }

  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    dispatch(setIncomeSourceAssetRentRealEStateDataLocation(remain, { declare: declareType }))
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Giá cho thuê theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceAssetRentRealEStateDataTotal(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceAssetRentRealEStateDataFREQ(value, { declare: declareType }))
  }

  const totalReal = activeAssetRent?.assetDetailRealEstate.total_income_from_rental_real_estate;

  const onClickMenuRealEstate = (menu: ObjectListMenuItem, position: number) => {
    if(menu.value === EActionMenu.DELETE){
      const assetDetailRealEstate = activeAssetRent?.assetDetailRealEstate.data.find((__, index) => index === position);
      assetDetailRealEstate && setDeleteIdRealEstate(assetDetailRealEstate);
    }
  }

  const onHandleCancelConfirmRealEstate = () => setDeleteIdRealEstate(null);

  const onHandleConfirmRealEstate = () => {
    const uuidDelete = deleteIdRealEstate?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceAssetRentType(uuidDelete, { declare: declareType, activeAssetRent: activeAssetRent?.assetType ?? ''}));
      onHandleCancelConfirmRealEstate();
    } 
  }

  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = formatNumber(((dataRealEsate?.price ?? 0) * 1).toString());
        break;
      case 'INFREQ':
        cal = formatNumber(((dataRealEsate?.price ?? 0) * 0.3).toString());
        break;
    
      default:
        break;
    }
    return cal;
  }
  
  return <>
    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
      <Input
        required
        disabled
        className='input-red'
        value={formatNumber(totalReal?.toString() ?? '')}
        label="2. Tổng thu nhập từ BDS cho thuê (VND)"
      />
    </Grid>
    <Box className='pl-5'>
      <HorizontalList
        className="mt-6 list-asset-income"
        current={activeRealOptions}
        sx={{
          '& .object-list-box': {
            borderRight: '1px solid #fff'
          },
          '& .MuiTabs-flexContainer':{
            width: 'unset !important '
          }
          
        }}
        menu={[
          {
            value: EActionMenu.DELETE,
            label: "Xóa",
          }
        ]}
        enableAdd={!ruleDisabled}
        enableMenu={!ruleDisabled}
        onChange={onChangeHorizonList}
        onAdd={onAdd}
        options={optionsData}
        onClickMenu={onClickMenuRealEstate}
      />
      <Grid container spacing={3} >
        <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                className='mt-1'
                before={
                  <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Input
                      label="3. Địa điểm tọa lạc"
                      required
                      value={dataRealEsate?.location}
                      onDebounce={(val) => onChangeDataRealEState(val, 'location')}
                      message={
                        getMessage(declareType, incomeType, 'location', {
                            position: activeAssetRent?.uuid ?? "",
                            positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                          }
                        )
                      }
                      disabled={disabled || ruleDisabled}
                    />
                  </Grid>
                }
                label={[
                  "4. Tỉnh/TP",
                  "5. Quận/huyện",
                  "6. Phường/xã"
                ]}
                value={{
                  country: 'VN',
                  province: dataRealEsate?.province ?? '',
                  district: dataRealEsate?.district ?? '',
                  ward: dataRealEsate?.ward ?? ''
                }}
                message={[
                  getMessage(declareType, incomeType, 'province', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  ),
                  getMessage(declareType, incomeType, 'district', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  ),
                  getMessage(declareType, incomeType, 'ward', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  )
                ]}
                required={[true, true, true]}
                disabled={disabled || ruleDisabled}
                col={6}
                onChange={changeLocation}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <OwnerPropertyCheck 
                label="7. Thuộc sở hữu và sử dụng"
                value={dataRealEsate?.owned_status}
                onChange={(val) => onChangeDataRealEState(val, 'owned_status')}
                disabled={disabled || ruleDisabled}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="8. Mô tả"
                value={dataRealEsate?.description}
                onDebounce={(val) => onChangeDataRealEState(val, 'description')}
                disabled={disabled || ruleDisabled}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
                required
                label="9. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={dataRealEsate?.frequency_type}
                disabled={disabled || ruleDisabled}
                sx={SxSelectDisiable}
                message={
                  getMessage(declareType, incomeType, 'frequency', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  )
                }
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="10. Tỉ lệ nguồn thu nhập (%)"
                value={dataRealEsate?.frequency_type === 'FREQ'
                  ? '100'
                  : dataRealEsate?.frequency_type === 'INFREQ' ? '30' : ''}
                disabled
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'var(--mscb-disable)',
                  },
                  '& .Mui-disabled':{
                    WebkitTextFillColor: 'var(--mscb-disable)',
                  }
                }}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="11. Giá cho thuê theo tháng (VND)"
                type="number"
                format
                value={(dataRealEsate?.price ?? '').toString()}
                // regex={/-?[0-9]*\.?[0-9]+/g}
                disabled={disabled || ruleDisabled  }
                // value={formatNumber(dataRealEsate?.price?.toString())}
                onDebounce={onChangeDataTotal}
                message={
                  getMessage(declareType, incomeType, 'price', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  )
                  || onBlurError}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                required
                label="12. Thu nhập từ BĐS cho thuê (VND)"
                disabled
                className='input-red'
                format
                value={dataRealEsate?.frequency_type ? calculateFrequencyType(dataRealEsate?.frequency_type) : '0'}
              // value={formatNumber(dataRealEsate?.frequency_type === 'FREQ' ? ((dataRealEsate?.price ?? 0) * 1).toString()
              //   : ((dataRealEsate?.price ?? 0) * 0.3).toString())}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
          <IncomeAttachment isTitle={false} prefix="13." />
        </Grid>
      </Grid>

      <ModalConfirm open={ deleteIdRealEstate !== null } onClose={ onHandleCancelConfirmRealEstate } onConfirm={ onHandleConfirmRealEstate }>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa tài sản cho thuê ?
        </Box>
      </ModalConfirm>

      <ModalConfirm
        open={Boolean(visibleModal)}
        disabledActions={["close"]}
        onClose={handleOnCloseModal}
        onConfirm={handleOnCloseModal}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
        {Boolean(visibleModal?.message)?visibleModal?.message :" "}
        </Box>
     </ModalConfirm>

    </Box>
  </>

}

export default AssetRentRealEstate;