import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import AssetRentOther from './Other';
import SelectAssetRentType from 'views/components/widgets/SelectAssetRentType';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import Label from 'views/components/base/Label';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { 
  ILOANNormalStorageIncomeAssetRent, 
  ILOANNormalStorageIncomeDeclare, 
  ILOANNormalStorageIncomeDeclareSalary 
} from 'types/models/loan/normal/storage/Income';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addIncomeSourceType, 
  removeIncomeSourceType, 
  setIncomeSourceActive, 
  setIncomeSourceAssetRentActive, 
  setIncomeSourceAssetRentType 
} from 'features/loan/normal/storage/income/action';
import { 
  getLOANNormalStorageIncomeSourceList, 
  getLOANNormalStorageIncomeSourceListAssetRentActive 
} from 'features/loan/normal/storage/income/selector';
import Transport from './Transport';
import AssetRentRealEstate from './RealEstate';
import Empty from 'views/components/layout/Empty';
import { formatNumber } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import { SxSelectDisiable } from '../../style';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import useMasterData from 'app/hooks/useMasterData';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const IncomeFormAssetRent: FC = () => {

  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeMessage();
  const notify = useNotify();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const handleAddAssetRent = () => {
    dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType }))
  }
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const optionsDataPos = (data?.assetRent.data?.findIndex(d => d.uuid === activeAssetRent?.uuid) ?? 0) + 1;
  const disabled = !activeAssetRent?.uuid;
  const {register} = useMasterData();

  const [ deleteIdAssetRent, setDeleteIdAssetRent ] = useState<ILOANNormalStorageIncomeAssetRent | null>(null);

  const optionsData: IGroupListBase[] = data?.assetRent.data.map((__, i) => ({
    value: i + 1,
    label: `Tài sản cho thuê ${i + 1}`,
    key: i + 1,
  })) ?? []

  useEffect(()=>{
    dispatch(setIncomeSourceActive('assetRent', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

  const onchangeAssetRentType = (value: string) => {
    dispatch(setIncomeSourceAssetRentType(value, { declare: declareType }));
  }

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.assetRent.data[current].uuid ?? ''
    dispatch(setIncomeSourceAssetRentActive(currentActive, { declare: declareType }))
  }


  const handleAssrentTypeLayout = () => {
    switch (activeAssetRent?.assetType) {
      case 'TRANSPORT':
        return (
          <Transport />
        )
      case 'REAL_ESTATE':
        return (
          <AssetRentRealEstate />
        )
      case 'OTHER':
        return (
          <AssetRentOther />
        )
    }
  }

  const onDeleteObjectBase = (value: IGroupListBase,position:number) => {
    const assetRent = data?.assetRent.data?.find((__, index) => index === position);
    assetRent && setDeleteIdAssetRent(assetRent);
  }

  const onHandleCancelConfirmAssetRent = () => setDeleteIdAssetRent(null);

  const onHandleConfirmAssetRent = () => {
    const uuidAssetRentDelete = deleteIdAssetRent?.uuid;
    const type = deleteIdAssetRent?.assetType ? deleteIdAssetRent?.assetType : 'LOCAL';

    if (!uuidAssetRentDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceType(uuidAssetRentDelete, { declare: declareType, incomeSource: incomeType, type: type }));
      onHandleCancelConfirmAssetRent()
    } 
  }

  const dataDetailsRealEStateFREQ = data?.assetRent.data.filter(item => item.assetType === 'REAL_ESTATE')
    .map(item => item.assetDetailRealEstate.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsRealEStateINFREQ = data?.assetRent.data.filter(item => item.assetType === 'REAL_ESTATE')
    .map(item => item.assetDetailRealEstate.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsTransportFREQ = data?.assetRent.data.filter(item => item.assetType === 'TRANSPORT')
    .map(item => item.assetDetailTransport.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsTransportINFREQ = data?.assetRent.data.filter(item => item.assetType === 'TRANSPORT')
    .map(item => item.assetDetailTransport.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsOtherFREQ = data?.assetRent.data.filter(item => item.assetType === 'OTHER')
    .map(item => item.assetDetailOther.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsOtherINFREQ = data?.assetRent.data.filter(item => item.assetType === 'OTHER')
    .map(item => item.assetDetailOther.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.price)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const allToTalFREQ = dataDetailsRealEStateFREQ + dataDetailsTransportFREQ + dataDetailsOtherFREQ
  const allToTalINFREQ = (dataDetailsRealEStateINFREQ * 0.3) + (dataDetailsTransportINFREQ * 0.3) + (dataDetailsOtherINFREQ * 0.3)
  const allTotal = allToTalFREQ + allToTalINFREQ
  const ruleDisabled = useSelector(getRuleDisbled)

  useEffect(()=>{
    data?.assetRent.data.forEach((asset) => {
      if(asset.assetType === 'REAL_ESTATE'){
        asset.assetDetailRealEstate.data.forEach((real)=>{
          // if(real?.province){
          //   register('province',real?.province);
          // }
          if(real?.district){
            register('district',real?.province);
          }
          if(real?.ward){
            register('ward',real?.district);
          }
        })
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data?.assetRent]);


  return <Box className='aaa'>
    <Grid container spacing={3} className='aaa'>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ cho thuê tài sản (VND)"
          disabled
          className='input-red'
          value={formatNumber(allTotal.toString())}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className='input-red'
          value={formatNumber(allToTalFREQ.toString())}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className='input-red'
          value={formatNumber(allToTalINFREQ.toString())}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn tài sản cho thuê</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2}>
        <GroupListBase
          labelAdd='Thêm tài sản cho thuê'
          onAdd={handleAddAssetRent}
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isDelete={!ruleDisabled}
          isAdd={ruleDisabled}
          onDelete={onDeleteObjectBase}
        />
      </Grid>

      {optionsData.length === 0 ? <Grid item xl={10}>
        <Empty>Chọn loại tài sản cho thuê</Empty>
      </Grid> : 

      <Grid item xl={10}>
        <TitleSquare>
          Thông tin  TÀI SẢN CHO THUÊ
        </TitleSquare>
        <Box className="mt-4">
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
              <SelectAssetRentType
                label="1. Loại tài sản cho thuê"
                onChange={onchangeAssetRentType}
                value={activeAssetRent?.assetType}
                disabled={disabled || 
                  activeAssetRent?.assetDetailRealEstate?.data?.length>0 || 
                  activeAssetRent?.assetDetailTransport?.data?.length>0 ||
                  activeAssetRent?.assetDetailOther?.data?.length>0
                }
                sx={SxSelectDisiable}
                message={
                  getMessage(declareType, incomeType, 'assetType', {
                      position: activeAssetRent?.uuid ?? "",
                    }
                  )
                }
              />
            </Grid>
              {handleAssrentTypeLayout()}
          </Grid>
        </Box>
      </Grid> }

    </Grid>

    <ModalConfirm open={ deleteIdAssetRent !== null } onClose={ onHandleCancelConfirmAssetRent } onConfirm={ onHandleConfirmAssetRent }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa tài sản cho thuê ?
      </Box>
    </ModalConfirm>
  </Box>

}

export default IncomeFormAssetRent;