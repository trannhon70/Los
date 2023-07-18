import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import { EActionMenu } from 'features/loan/normal/storage/income/case';
import { setIncomeSourceApprovalAssetRentOther, setIncomeSourceApprovalAssetRentOtherData, setIncomeSourceApprovalAssetRentOtherDataFREQ, setIncomeSourceApprovalAssetRentOtherDataTotal, setTotalIncomeNVTTD } from 'features/loan/normal/storageApproval/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData
} from 'features/loan/normal/storageApproval/income/selector';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  ILOANNormalStorageIncomeAssetRentDetailOther, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { formatNumber } from 'utils';
import Icon from 'views/components/atoms/Icon';
import Input from 'views/components/base/Input';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import HorizontalList from 'views/components/layout/HorizontalList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import OwnerPropertyCheck from 'views/components/widgets/OwnerPropertyCheck';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from '../../Attachment';
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from '../../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';

const AssetRentOther: FC = () => {
  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  // const getMessage = useNormalIncomeMessage();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const disabled = !activeAssetRent?.assetDetailOther?.activeOther;
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const optionsData: IGroupListBase[] = activeAssetRent?.assetDetailOther.data.map((__, i) => ({
    value: i + 1,
    label: `Tài sản ${i + 1}`,
    key: i + 1,
    circle: <Icon type ="taisan" color =""/>
  })) ?? [];

  const activeOther = activeAssetRent?.assetDetailOther.data
  .findIndex(c => c.uuid === activeAssetRent.assetDetailOther.activeOther) ?? 0;

  const totaOther = activeAssetRent?.assetDetailOther.total_income_from_other;

  const onChangeHorizonList = (current: number) => {
    const currentActive = activeAssetRent?.assetDetailOther.data[current].uuid ?? '';
    dispatch(setIncomeSourceApprovalAssetRentOther(currentActive, { declare: declareType }))
  }

  const onChangeDataOther = (value: string | number | null, key: keyof ILOANNormalStorageIncomeAssetRentDetailOther) => {
    dispatch(setIncomeSourceApprovalAssetRentOtherData(value, { declare: declareType, key }));
  }

  const onChangeDataTotal = (value: string) => {
    dispatch(setIncomeSourceApprovalAssetRentOtherDataTotal(+value, { declare: declareType }));
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalAssetRentOtherDataFREQ(value, { declare: declareType }));
  }

  const onClickMenuRealEstate = (_menu: ObjectListMenuItem, _position: number) => {
  }

  const onHandleCancelConfirmOther = () => {};

  const onHandleConfirmOther = () => {}

  const dataOther = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData(declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailOther.activeOther ?? ''));
  
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

  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }

  return <>
    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} sx={{
          minWidth: 330,
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
      <Input
        disabled
        value={formatNumber(totaOther?.toString() ?? '')}
        label="2. Tổng thu nhập từ tài sản cho thuê khác (VND)"
        sx={SxInputRedDisabled}
      />
    </Grid>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <HorizontalList
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
        current={activeOther}
        // enableMenu
        options={optionsData}
        enableAdd={false}
        enableDelete={false}
        enableMenu={false}
        onChange={onChangeHorizonList}
        onClickMenu={onClickMenuRealEstate}
      />
    </Grid>
    <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            required
            label="3. Giấy chứng nhận / Mã tài sản cho thuê"
            onDebounce={(val) => onChangeDataOther(val, 'idAssetRent')}
            value={dataOther?.idAssetRent}
            disabled={disabled ||ruleDisabled}
            message={getMessage(declareType, incomeType, 'idAssetRent', {
              position: activeAssetRent?.uuid ?? "",
              positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
            }
          )}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <OwnerPropertyCheck 
            label="4. Thuộc sở hữu và sử dụng"
            value={dataOther?.owned_status}
            onChange={(val) => onChangeDataOther(val, 'owned_status')}
            disabled={disabled ||ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <SelectFrequence
          required
            label="5. Tần suất thu nhập"
            onChange={onChangeFreq}
            sx={SxSelectDisabled}
            value={dataOther?.frequency_type}
            disabled={disabled ||ruleDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            disabled
            required
            label="6. Tỉ lệ nguồn thu nhập (%)"
            value={dataOther?.frequency_type === 'FREQ'
            ? '100'
            : dataOther?.frequency_type === 'INFREQ' ? '30' : ''}
            sx={SxInputDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            required
            format
            type='number'
            label="7. Giá cho thuê theo tháng (VND)"
            onDebounce={onChangeDataTotal}
            disabled={disabled ||ruleDisabled}
            value={(dataOther?.price ?? '').toString()}
            message={getMessage(declareType, incomeType, 'price', {
              position: activeAssetRent?.uuid ?? "",
              positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
            }
          )}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
          <Input
            disabled
            required
            label="8. Thu nhập từ tài sản cho thuê khác(VND)"
            onChange={(val) => onChangeDataOther(val, 'income_from_other')}
            value={dataOther?.frequency_type ? calculateFrequencyType(dataOther?.frequency_type) : '0'}
            sx={SxInputRedDisabled}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Input
            format
            disabled={ruleDisabled}
            type='number'
            label="9. Thu nhập theo đánh giá của NVTTĐ"
            value={(dataOther?.income_according_to_staff_rating ?? 0)?.toString()}
            // onChange={(val) => onChangeDataOther(Number(val), 'income_according_to_staff_rating')}
            onDebounce={onChangeTotalInComeNVTTD}

          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xl={5} lg={5} md={12} sm={12} xs={12} sx={{
      '& .empty-title': {
        minHeight: '402px'
      }
    }}>
      <IncomeAttachment isTitle={false} prefix="10." />
    </Grid>

    <ModalConfirm onClose={ onHandleCancelConfirmOther } onConfirm={ onHandleConfirmOther }>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc chắn muốn xóa tài sản khác ?
      </Box>
    </ModalConfirm>
  </>
}

export default AssetRentOther;