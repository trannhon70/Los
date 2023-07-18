import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import { setIncomeSourceApprovalAssetRentActive, setIncomeSourceApprovalAssetRentType } from 'features/loan/normal/storageApproval/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive
} from 'features/loan/normal/storageApproval/income/selector';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  ILOANNormalStorageIncomeAssetRent,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import Label from 'views/components/base/Label';
import Empty from 'views/components/layout/Empty';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TitleSquare from 'views/components/layout/TitleSquare';
import SelectAssetRentType from 'views/components/widgets/SelectAssetRentType';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { SxInputRedDisabled, SxSelectDisabled } from '../../style';
import AssetRentOther from './Other';
import AssetRentRealEstate from './RealEstate';
import Transport from './Transport';

const IncomeFormAssetRent: FC = () => {
  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
 
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const optionsDataPos = (data?.assetRent.data?.findIndex(d => d.uuid === activeAssetRent?.uuid) ?? 0) + 1;

  const [ deleteIdAssetRent, setDeleteIdAssetRent ] = useState<ILOANNormalStorageIncomeAssetRent | null>(null);


  const optionsData: IGroupListBase[] = data?.assetRent?.data?.map((__, i) => ({
    value: i + 1,
    label: `Tài sản cho thuê ${i + 1}`,
    key: i + 1,
  })) ?? []


  const onchangeAssetRentType = (value: string) => {
    dispatch(setIncomeSourceApprovalAssetRentType(value, { declare: declareType }));

  }

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.assetRent?.data ? data?.assetRent?.data[current].uuid : ''
    dispatch(setIncomeSourceApprovalAssetRentActive(currentActive, { declare: declareType }))
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
  
  const dataDetailsRealEStateFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'REAL_ESTATE')
    .map(item => item.assetDetailRealEstate.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsRealEStateINFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'REAL_ESTATE')
    .map(item => item.assetDetailRealEstate.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsTransportFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'TRANSPORT')
    .map(item => item.assetDetailTransport.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsTransportINFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'TRANSPORT')
    .map(item => item.assetDetailTransport.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsOtherFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'OTHER')
    .map(item => item.assetDetailOther.data).map(it => it.filter(ii => ii.frequency_type === 'FREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const dataDetailsOtherINFREQ = data?.assetRent?.data?.filter(item => item.assetType === 'OTHER')
    .map(item => item.assetDetailOther.data).map(it => it.filter(ii => ii.frequency_type === 'INFREQ').map(q => q.income_according_to_staff_rating)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  const allToTalFREQ = dataDetailsRealEStateFREQ + dataDetailsTransportFREQ + dataDetailsOtherFREQ
  const allToTalINFREQ = (dataDetailsRealEStateINFREQ) + (dataDetailsTransportINFREQ) + (dataDetailsOtherINFREQ)
  const allTotal = allToTalFREQ + allToTalINFREQ;

  const onHandleCancelConfirmAssetRent = () => setDeleteIdAssetRent(null);

  const onHandleConfirmAssetRent = () => {
  }

  return <Box className='aaa'>
    <Grid container spacing={3} className='aaa' sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}> 
        <Input
          label="1. Tổng thu nhập từ cho thuê tài sản (VND)"
          disabled
          value={formatNumber(allTotal.toString())}
          sx={SxInputRedDisabled}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          value={formatNumber(allToTalFREQ.toString())}
          sx={SxInputRedDisabled}
          
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          value={formatNumber(allToTalINFREQ.toString())}
          sx={SxInputRedDisabled}
        />
      </Grid>
    </Grid>
    <Label bold className="mt-4 mb-3">4. Chọn tài sản cho thuê</Label>
    <Grid container spacing={3}>
      <Grid item className="mscb-group-list-col" xl={2}>
      <GroupListBase
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isAdd={true}
        />
      </Grid>

      {optionsData.length === 0 ? <Grid item xl={10}>
        <Empty>Chọn loại tài sản cho thuê</Empty>
      </Grid> : 

      <Grid item xl={10}>
        <TitleSquare>
          Thông tin TÀI SẢN CHO THUÊ
        </TitleSquare>
        <Box className="mt-4">
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={6} sm={12} xs={12} sx={{minWidth: 330}}>
              <SelectAssetRentType
                label="1. Loại tài sản cho thuê"
                disabled
                onChange={onchangeAssetRentType}
                value={activeAssetRent?.assetType}
                sx={SxSelectDisabled}
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