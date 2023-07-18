import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useNormalIncomeApprovalMessage from "app/hooks/useNormalIncomeApprovalMessage";
import { setIncomeSourceApprovalAssetRentTransport,
   setIncomeSourceApprovalAssetRentTransportData,
   setIncomeSourceApprovalAssetRentTransportDataFREQ,
   setIncomeSourceApprovalAssetRentTransportDataTotal,
  setTotalIncomeNVTTD }
from "features/loan/normal/storageApproval/income/action";
import { EActionMenu } from "features/loan/normal/storageApproval/income/case";
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData
} from "features/loan/normal/storageApproval/income/selector";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  ILOANNormalStorageIncomeAssetRentDetailTransport, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary
} from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { formatNumber } from "utils";
import Icon from "views/components/atoms/Icon";
import Input from "views/components/base/Input";
import { IGroupListBase } from "views/components/layout/GroupListBase";
import HorizontalList from "views/components/layout/HorizontalList";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { ObjectListMenuItem } from "views/components/layout/ObjectList";
import OwnerPropertyCheck from "views/components/widgets/OwnerPropertyCheck";
import SelectFrequence from "views/components/widgets/SelectFrequence";
import { urlToDeclare, urlToIncomeSource } from "views/pages/LOAN/utils";
import IncomeAttachment from "../../Attachment";
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from "../../style";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const Transport: FC = () => {
  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeApprovalMessage();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(
    declareType, params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? ''
  ));
  const disabled = !activeAssetRent?.assetDetailTransport?.activeTransport;
  const dataTransport = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData(
    declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailTransport.activeTransport ?? ''));
  const [onBlurError, setOnBlurError] = useState('');
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const optionsData: IGroupListBase[] = activeAssetRent?.assetDetailTransport.data.map((__, i) => ({
    value: i + 1,
    label: `Phương tiện vận tải ${i + 1}`,
    key: i + 1,
    circle:  <Icon type="ptvt" color=""/>
  })) ?? [];

  const activeTransport = activeAssetRent?.assetDetailTransport.data
  .findIndex(c => c.uuid === activeAssetRent.assetDetailTransport.activeTransport) ?? 0;

  const toTalTransport = activeAssetRent?.assetDetailTransport.total_income_from_transport;

  const onChangeHorizonList = (current: number) => {
    const currentActive = activeAssetRent?.assetDetailTransport.data[current].uuid ?? '';
    dispatch(setIncomeSourceApprovalAssetRentTransport(currentActive, { declare: declareType }))
  };

  const onChangeDataTransport = (value: string | number | null,
    key: keyof ILOANNormalStorageIncomeAssetRentDetailTransport) => {
    dispatch(setIncomeSourceApprovalAssetRentTransportData(value, { declare: declareType, key }))
  }

  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Giá cho thuê theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalAssetRentTransportDataTotal(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalAssetRentTransportDataFREQ(value, { declare: declareType }))
  };

  const onClickMenuTransport = (
    _menu: ObjectListMenuItem,
    _position: number
  ) => {};

  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }

  const onHandleConfirmTransport = () => {};

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

  return (
    <>
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
          label="2. Tổng thu nhập từ PTVT cho thuê (VND)"
          value={formatNumber(toTalTransport?.toString() ?? '')}
          sx={SxInputRedDisabled}
        />
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
        <HorizontalList
          sx={{
            "& .object-list-box": {
              borderRight: "1px solid #fff",
            },
            '& .MuiTabs-flexContainer':{
              width: 'unset !important '
            }
          }}
          menuWidth="110px"
          menu={[
            {
              value: EActionMenu.DELETE,
              label: "Xóa",
            },
          ]}
          enableAdd={false}
          enableDelete={false}
          enableMenu={false}
          current={activeTransport}
          options={optionsData}
          onChange={onChangeHorizonList}
          onClickMenu={onClickMenuTransport}
        />
      </Grid>
      <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              required
              label="3. Biển kiểm soát/đăng ký phương tiện"
              disabled={disabled || ruleDisabled}
              value={dataTransport?.registrationPlate}
              onDebounce={(val) => onChangeDataTransport(val, 'registrationPlate')}
              message={getMessage(declareType, incomeType, 'registrationPlate', {
                position: activeAssetRent?.uuid ?? "",
                positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
              }
            )}
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
              sx={SxSelectDisabled}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input 
            required
            label="6. Tỉ lệ nguồn thu nhập (%)"
            value={dataTransport?.frequency_type === 'FREQ'
            ? '100'
            : dataTransport?.frequency_type === 'INFREQ' ? '30' : ''}
            disabled
            sx={SxInputDisabled}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input 
            required 
            label="7. Giá cho thuê theo tháng (VND)"
            type="number"
            format
            onDebounce={onChangeDataTotal}
            value={(dataTransport?.price ?? '').toString()}
            disabled={disabled || ruleDisabled}
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
            required
              disabled
              label="8. Thu nhập từ PTVT cho thuê (VND)"
              value={dataTransport?.frequency_type ? calculateFrequencyType(dataTransport?.frequency_type) : '0'}
              sx={SxInputRedDisabled}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              format
              type="number"
              disabled={ruleDisabled}
              label="9. Thu nhập theo đánh giá của NVTTĐ"
              value={(dataTransport?.income_according_to_staff_rating ?? 0).toString()}
              // onChange={(val) => onChangeDataTransport(Number(val), 'income_according_to_staff_rating')}
              onDebounce={onChangeTotalInComeNVTTD}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={5} lg={5} md={6} sm={12} xs={12} 
        sx={{
          "& .empty-title": {
            minHeight: "402px",
          },
        }}
      >
        <IncomeAttachment isTitle={false} prefix="10." />
      </Grid>

      <ModalConfirm onConfirm={onHandleConfirmTransport}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa phương tiện vận tải ?
        </Box>
      </ModalConfirm>
    </>
  );
};

export default Transport;
