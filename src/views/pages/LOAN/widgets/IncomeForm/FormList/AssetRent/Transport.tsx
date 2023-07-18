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
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceAssetRentType,
  removeIncomeSourceAssetRentType,
  setIncomeSourceAssetRentTransport,
  setIncomeSourceAssetRentTransportData,
  setIncomeSourceAssetRentTransportDataFREQ,
  setIncomeSourceAssetRentTransportDataTotal
} from 'features/loan/normal/storage/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData,
} from 'features/loan/normal/storage/income/selector';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import {
  ILOANNormalStorageIncomeAssetRentDetailTransport,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storage/Income';
import { formatNumber } from 'utils';
import { EActionMenu } from 'features/loan/normal/storage/income/case';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import useNotify from 'app/hooks/useNotify';
import { SxSelectDisiable } from '../../style';
import OwnerPropertyCheck from 'views/components/widgets/OwnerPropertyCheck';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import Icon from 'views/components/atoms/Icon';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const Transport: FC = () => {

  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeMessage();
  const notify = useNotify();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(
    declareType, params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? ''
  ));
  const disabled = !activeAssetRent?.assetDetailTransport?.activeTransport;
  const ruleDisabled = useSelector(getRuleDisbled)

  const [ deleteIdTransport, setDeleteIdTransport ] = useState<ILOANNormalStorageIncomeAssetRentDetailTransport | null>(null);
  const [onBlurError, setOnBlurError] = useState('');
  const activeTransport = activeAssetRent?.assetDetailTransport.data
    .findIndex(c => c.uuid === activeAssetRent.assetDetailTransport.activeTransport) ?? 0;

  const optionsData: IGroupListBase[] = activeAssetRent?.assetDetailTransport.data.map((__, i) => ({
    value: i + 1,
    label: `Phương tiện vận tải ${i + 1}`,
    key: i + 1,
    circle:  <Icon type="ptvt" color=""/>
  })) ?? []

  const onChangeHorizonList = (current: number) => {
    const currentActive = activeAssetRent?.assetDetailTransport.data[current].uuid ?? '';
    dispatch(setIncomeSourceAssetRentTransport(currentActive, { declare: declareType }))
  }

  const onAdd = () => {
    dispatch(addIncomeSourceAssetRentType(activeAssetRent?.assetType ?? '', { declare: declareType }))
  }

  const onChangeDataTransport = (value: string | number | null,
    key: keyof ILOANNormalStorageIncomeAssetRentDetailTransport) => {
    dispatch(setIncomeSourceAssetRentTransportData(value, { declare: declareType, key }))
  }

  const dataTransport = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData(
    declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailTransport.activeTransport ?? ''))

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Giá cho thuê theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceAssetRentTransportDataTotal(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceAssetRentTransportDataFREQ(value, { declare: declareType }))
  }

  const toTalTransport = activeAssetRent?.assetDetailTransport.total_income_from_transport
  // const onClickDataAuto = () => {
  //   dispatch(autofillAssrentTransport('', { declare: declareType }))
  // }

  const onClickMenuTransport = (menu: ObjectListMenuItem, position: number) => {
    if(menu.value === EActionMenu.DELETE){
      const assetDetailTransport = activeAssetRent?.assetDetailTransport.data.find((__, index) => index === position);
      assetDetailTransport && setDeleteIdTransport(assetDetailTransport);
    }
  }

  const onHandleCancelConfirmTransport = () => setDeleteIdTransport(null);

  const onHandleConfirmTransport = () => {
    const uuidDelete = deleteIdTransport?.uuid;
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }else{
      dispatch(removeIncomeSourceAssetRentType(uuidDelete, { declare: declareType, activeAssetRent: activeAssetRent?.assetType ?? ''}))
      onHandleCancelConfirmTransport();
    } 
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = formatNumber(((dataTransport?.price ?? 0) * 1).toString());
        break;
      case 'INFREQ':
        cal = formatNumber(((dataTransport?.price ?? 0) * 0.3).toString());
        break;
    
      default:
        break;
    }
    return cal;
  }

  return <>
    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
      <Input
        disabled
        className='input-red'
        label="2. Tổng thu nhập từ PTVT cho thuê (VND)"
        value={formatNumber(toTalTransport?.toString() ?? '')}
      />
    </Grid>
    <Box className='pl-5 '>
      <HorizontalList
        className="mt-6 list-asset-income"
        sx={{
          '& .object-list-box': {
            borderRight: '1px solid #fff'
          },
 
            '& .MuiTabs-flexContainer':{
              width: 'unset !important '
            }

        }}
        current={activeTransport}
        menuWidth="110px"
        menu={[
          {
            value: EActionMenu.DELETE,
            label: "Xóa",
          }
        ]}
        enableAdd={!ruleDisabled}
        enableMenu={!ruleDisabled}
        options={optionsData}
        onChange={onChangeHorizonList}
        onClickMenu={onClickMenuTransport}
        onAdd={onAdd}
      />
      <Grid container spacing={3}>
       <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
          <Box className="mt-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  label="3. Biển kiểm soát/đăng ký phương tiện"
                  value={dataTransport?.registrationPlate}
                  onDebounce={(val) => onChangeDataTransport(val, 'registrationPlate')}
                  disabled={disabled || ruleDisabled}
                  message={
                    getMessage(declareType, incomeType, 'registrationPlate', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailTransport?.activeTransport ?? ""
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OwnerPropertyCheck 
                  label="4. Thuộc sở hữu và sử dụng"
                  value={dataTransport?.owned_status}
                  onChange={(val) => onChangeDataTransport(val, 'owned_status')}
                  disabled={disabled || ruleDisabled}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <SelectFrequence
                  required
                  onChange={onChangeFreq}
                  label="5. Tần suất thu nhập"
                  value={dataTransport?.frequency_type}
                  disabled={disabled || ruleDisabled}
                  sx={SxSelectDisiable}
                  message={
                    getMessage(declareType, incomeType, 'frequency', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailTransport?.activeTransport ?? ""
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="6. Tỉ lệ nguồn thu nhập (%)"
                  value={dataTransport?.frequency_type === 'FREQ'
                    ? '100'
                    : dataTransport?.frequency_type === 'INFREQ' ? '30' : ''}
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
                  label="7. Giá cho thuê theo tháng (VND)"
                  // regex={/-?[0-9]*\.?[0-9]+/g}
                  type="number"
                  format
                  onDebounce={onChangeDataTotal}
                  value={(dataTransport?.price ?? '').toString()}
                  disabled={disabled || ruleDisabled}
                  message={
                    getMessage(declareType, incomeType, 'price', {
                        position: activeAssetRent?.uuid ?? "",
                        positionHorizontal: activeAssetRent?.assetDetailTransport?.activeTransport ?? ""
                      }
                    ) || onBlurError}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  required
                  label="8. Thu nhập từ PTVT cho thuê (VND)"
                  value={dataTransport?.frequency_type ? calculateFrequencyType(dataTransport?.frequency_type) : '0'}
                  className='input-red'
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={5} lg={5} md={6} sm={12} xs={12} sx={{
          '& .empty-title': {
            minHeight: '402px'
          }
        }}>
          <IncomeAttachment isTitle={false} prefix="9." />
        </Grid> 
      </Grid>
    </Box>

    <ModalConfirm open={ deleteIdTransport !== null } onClose={ onHandleCancelConfirmTransport } onConfirm={ onHandleConfirmTransport }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa phương tiện vận tải ?
      </Box>
    </ModalConfirm>
  </>
}

export default Transport;