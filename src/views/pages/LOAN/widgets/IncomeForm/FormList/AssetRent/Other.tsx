import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import HorizontalList from 'views/components/layout/HorizontalList';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import IncomeAttachment from '../../Attachment';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import {
  ILOANNormalStorageIncomeAssetRentDetailOther,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storage/Income';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceAssetRentType,
  removeIncomeSourceAssetRentType,
  setIncomeSourceAssetRentOther,
  setIncomeSourceAssetRentOtherData,
  setIncomeSourceAssetRentOtherDataFREQ,
  setIncomeSourceAssetRentOtherDataTotal,
}
  from 'features/loan/normal/storage/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData,
}
  from 'features/loan/normal/storage/income/selector';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import { formatNumber } from 'utils';
import useNotify from 'app/hooks/useNotify';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { SxSelectDisiable } from '../../style';
import { EActionMenu } from 'features/loan/normal/storage/income/case';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import { ImHome3 } from 'react-icons/im';
import OwnerPropertyCheck from 'views/components/widgets/OwnerPropertyCheck';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import Icon from 'views/components/atoms/Icon';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const AssetRentOther: FC = () => {

  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeMessage();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const notify = useNotify();
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const disabled = !activeAssetRent?.assetDetailOther?.activeOther;
  const [onBlurError, setOnBlurError] = useState('');
  const onAdd = () => {
    dispatch(addIncomeSourceAssetRentType(activeAssetRent?.assetType ?? '', { declare: declareType }))
  }
  const ruleDisabled = useSelector(getRuleDisbled)
  const [ deleteIdOther, setDeleteIdOther ] = useState<ILOANNormalStorageIncomeAssetRentDetailOther | null>(null);

  const optionsData: IGroupListBase[] = activeAssetRent?.assetDetailOther.data.map((__, i) => ({
    value: i + 1,
    label: `Tài sản ${i + 1}`,
    key: i + 1,
    circle: <Icon type ="taisan" color =""/>
  })) ?? []

  const activeOther = activeAssetRent?.assetDetailOther.data
    .findIndex(c => c.uuid === activeAssetRent.assetDetailOther.activeOther) ?? 0;

  const onChangeHorizonList = (current: number) => {
    const currentActive = activeAssetRent?.assetDetailOther.data[current].uuid ?? '';
    dispatch(setIncomeSourceAssetRentOther(currentActive, { declare: declareType }))
  }

  const onChangeDataOther = (value: string | number | null, key: keyof ILOANNormalStorageIncomeAssetRentDetailOther) => {
    dispatch(setIncomeSourceAssetRentOtherData(value, { declare: declareType, key }));
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Giá cho thuê theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceAssetRentOtherDataTotal(+value, { declare: declareType }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceAssetRentOtherDataFREQ(value, { declare: declareType }))
  }

  const dataOther = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData(declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailOther.activeOther ?? ''))

  const totaOther = activeAssetRent?.assetDetailOther.total_income_from_other;

  const onClickMenuRealEstate = (menu: ObjectListMenuItem, position: number) => {
    if(menu.value === EActionMenu.DELETE){
      const assetDetailOther = activeAssetRent?.assetDetailOther.data.find((__, index) => index === position);
      assetDetailOther && setDeleteIdOther(assetDetailOther);
    }
  }

  const onHandleCancelConfirmOther = () => setDeleteIdOther(null);

  const onHandleConfirmOther = () => {
    const uuidDelete = deleteIdOther?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceAssetRentType(uuidDelete, { declare: declareType, activeAssetRent: activeAssetRent?.assetType ?? ''}))
      onHandleCancelConfirmOther();
    } 
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = formatNumber(((dataOther?.price ?? 0) * 1).toString());
        break;
      case 'INFREQ':
        cal = formatNumber(((dataOther?.price ?? 0) * 0.3).toString());
        break;
    
      default:
        break;
    }
    return cal;
  }

  return <>
    <Grid item xl={3.5} lg={3} md={6} sm={12} xs={12}>
      <Input
        required
        disabled
        className='input-red'
        value={formatNumber(totaOther?.toString() ?? '')}
        label="2. Tổng thu nhập từ tài sản cho thuê khác (VND)"
      />
    </Grid>
    <Box className='pl-5'>
      <HorizontalList
        className="mt-6 list-asset-income"
        current={activeOther}
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
        options={optionsData}
        onAdd={onAdd}
        onChange={onChangeHorizonList}
        onClickMenu={onClickMenuRealEstate}
      />
      <Grid container spacing={3}>
        <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
          <Box className="mt-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  label="3. Giấy chứng nhận / Mã tài sản cho thuê"
                  onDebounce={(val) => onChangeDataOther(val, 'idAssetRent')}
                  value={dataOther?.idAssetRent}
                  disabled={disabled || ruleDisabled}
                  message={
                    getMessage(declareType, incomeType, 'idAssetRent', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailOther?.activeOther ?? ""
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OwnerPropertyCheck 
                  label="4. Thuộc sở hữu và sử dụng"
                  value={dataOther?.owned_status}
                  onChange={(val) => onChangeDataOther(val, 'owned_status')}
                  disabled={disabled || ruleDisabled}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectFrequence
                  required
                  label="5. Tần suất thu nhập"
                  onChange={onChangeFreq}
                  value={dataOther?.frequency_type}
                  disabled={disabled || ruleDisabled}
                  sx={SxSelectDisiable}
                  message={
                    getMessage(declareType, incomeType, 'frequency', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailOther?.activeOther ?? ""
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  disabled
                  label="6. Tỉ lệ nguồn thu nhập (%)"
                  value={dataOther?.frequency_type === 'FREQ'
                    ? '100'
                    : dataOther?.frequency_type === 'INFREQ' ? '30' : ''}
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
                  type='number'
                  format
                  // regex={/-?[0-9]*\.?[0-9]+/g}
                  label="7. Giá cho thuê theo tháng (VND)"
                  onDebounce={onChangeDataTotal}
                  disabled={disabled || ruleDisabled}
                  value={(dataOther?.price ?? '').toString()}
                  message={
                    getMessage(declareType, incomeType, 'price', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailOther?.activeOther ?? ""
                      }
                    )
                  || onBlurError}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  disabled
                  label="8. Thu nhập từ tài sản cho thuê khác(VND)"
                  onChange={(val) => onChangeDataOther(val, 'income_from_other')}
                  className='input-red'
                  value={dataOther?.frequency_type ? calculateFrequencyType(dataOther?.frequency_type) : '0'}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={5} lg={5} md={12} sm={12} xs={12} sx={{
          '& .empty-title': {
            minHeight: '402px'
          }
        }}>
          <IncomeAttachment isTitle={false} prefix="9." />
        </Grid>
      </Grid>
    </Box>

    <ModalConfirm open={ deleteIdOther !== null } onClose={ onHandleCancelConfirmOther } onConfirm={ onHandleConfirmOther }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa tài sản khác ?
      </Box>
    </ModalConfirm>
  </>
}

export default AssetRentOther;