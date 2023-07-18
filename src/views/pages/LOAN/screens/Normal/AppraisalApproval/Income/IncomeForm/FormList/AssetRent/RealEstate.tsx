import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { InputAdornment } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import {
  setIncomeSourceApprovalAssetRentRealEState,
  setIncomeSourceApprovalAssetRentRealEStateData,
  setIncomeSourceApprovalAssetRentRealEStateDataFREQ,
  setIncomeSourceApprovalAssetRentRealEStateDataLocation,
  setIncomeSourceApprovalAssetRentRealEStateDataTotal,
  setTotalIncomeNVTTD
} from 'features/loan/normal/storageApproval/income/action';
import { EActionMenu } from 'features/loan/normal/storageApproval/income/case';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListAssetRentActive,
  getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData
} from 'features/loan/normal/storageApproval/income/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  ILOANNormalStorageIncomeAssetRentDetailRealEstate,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary
} from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { formatNumber } from 'utils';
// import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import Icon from 'views/components/atoms/Icon';
import Input from 'views/components/base/Input';
import { IGroupListBase } from 'views/components/layout/GroupListBase';
import HorizontalList from 'views/components/layout/HorizontalList';
import IconCopy from "views/components/layout/IconCopy";
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import OwnerPropertyCheck from 'views/components/widgets/OwnerPropertyCheck';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import SelectLocation, { SelectLocationValue } from 'views/components/widgets/SelectLocation';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from '../../Attachment';
import { SxInputDisabled, SxInputRedDisabled, SxSelectDisabled } from '../../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const AssetRentRealEstate: FC = () => {
  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ''))
  const activeAssetRent = useSelector(getLOANNormalStorageIncomeSourceListAssetRentActive(declareType, params.uuid ?? '', data?.assetRent?.activeAssetRent ?? ''));
  const disabled = !activeAssetRent?.assetDetailRealEstate?.activeRealEstate;
  const [visibleModal, setVisibleModal]=useState<{message:string}|null>(null);
  const dataRealEsate = useSelector(getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData(declareType,
    params.uuid ?? '',
    data?.assetRent?.activeAssetRent ?? '',
    activeAssetRent?.assetDetailRealEstate.activeRealEstate ?? ''))
  const [ deleteIdRealEstate, setDeleteIdRealEstate ] = useState<ILOANNormalStorageIncomeAssetRentDetailRealEstate | null>(null);
  const [onBlurError, setOnBlurError] = useState('');
  const getMessage = useNormalIncomeApprovalMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
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
    dispatch(setIncomeSourceApprovalAssetRentRealEState(currentActive, { declare: declareType }))
  }

  const onChangeDataRealEState = (value: string | number | null, key: keyof ILOANNormalStorageIncomeAssetRentDetailRealEstate) => {
    dispatch(setIncomeSourceApprovalAssetRentRealEStateData(value, { declare: declareType, key }))
  }


  const onChangeDataTotal = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Giá cho thuê theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalAssetRentRealEStateDataTotal(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalAssetRentRealEStateDataFREQ(value, { declare: declareType }))
  }

  const totalReal = activeAssetRent?.assetDetailRealEstate.total_income_from_rental_real_estate;

  const onClickMenuRealEstate = (menu: ObjectListMenuItem, position: number) => {
    if(menu.value === EActionMenu.DELETE){
      const assetDetailRealEstate = activeAssetRent?.assetDetailRealEstate.data.find((__, index) => index === position);
      assetDetailRealEstate && setDeleteIdRealEstate(assetDetailRealEstate);
    }
  }

  const changeLocation = (data: SelectLocationValue) => {
    const { country, ...remain } = data;
    dispatch(setIncomeSourceApprovalAssetRentRealEStateDataLocation(remain, { declare: declareType }))
  }

  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }

  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
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
    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} sx={{
          minWidth: 330,
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
      <Input
        value={formatNumber(totalReal?.toString() ?? '')}
        label="2. Tổng thu nhập từ BDS cho thuê (VND)"
        disabled
        sx={SxInputRedDisabled}
      />
    </Grid>
    <Box className='pl-5'>
      <HorizontalList
        className="mt-6 mb-6"
        current={activeRealOptions}
        sx={{
          '& .object-list-box': {
            borderRight: '1px solid #fff'
          },
          '& .MuiTabs-flexContainer':{
            width: 'unset !important '
          }
        }}
        enableAdd={false}
        enableDelete={false}
        enableMenu={false}
        options={optionsData}
        onChange={onChangeHorizonList}
        onClickMenu={onClickMenuRealEstate}
      />
      <Grid container spacing={3} >
      <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
        <Grid container spacing={3}>
          <Grid 
           sx={{
            "& .icon-copy": {
              zIndex: "1000",
              position: "absolute",
              cursor: "pointer"
            },
          }}
           item xl={12} lg={12} md={12} sm={12} xs={12}>
            <SelectLocation
              required={[true, true, true]}
              before={
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}
                  sx={{
                    display: 'flex',
                    flexFlow: 'row-reverse'
                  }}
                >
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
                      disabled={ruleDisabled}
                      // disabled={disabled}
                      suffix={<InputAdornment position="end">
                                <IconButton>
                                  <MapOutlinedIcon sx={{width: 19, height: 19, transform:'rotateY(180deg)' }}/>
                                </IconButton>
                              </InputAdornment>}
                    />
                     <IconButton
                        sx={{
                          padding: 0
                        }}
                        className="icon-copy"
                        disabled
                      >
                        <IconCopy />
                      </IconButton>
                </Grid>
              }
              label={[
                "4. Tỉnh/TP",
                "5. Quận/huyện",
                "6. Phường/xã"
              ]}
              col={6}
              disabled={ruleDisabled}
              value={{
                country: 'VN',
                province: dataRealEsate?.province ?? '',
                district: dataRealEsate?.district ?? '',
                ward: dataRealEsate?.ward ?? ''
              }}
              onChange={changeLocation}
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
              sx={SxSelectDisabled}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
            required
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
                    fontWeight: "500",
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
                disabled={disabled || ruleDisabled}
                onDebounce={onChangeDataTotal}
                sx={SxInputDisabled}
                message={
                  getMessage(declareType, incomeType, 'price', {
                      position: activeAssetRent?.uuid ?? "",
                      positionHorizontal: activeAssetRent?.assetDetailRealEstate?.activeRealEstate ?? ""
                    }
                  )
                  || onBlurError}
                
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
              label="12. Thu nhập từ BĐS cho thuê (VND)"
              disabled
              value={dataRealEsate?.frequency_type ? calculateFrequencyType(dataRealEsate?.frequency_type) : '0'}
              sx={SxInputRedDisabled}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              type="number"
              format
              disabled={ruleDisabled}
              label="13. Thu nhập theo đánh giá của NVTTĐ"
              value={(dataRealEsate?.income_according_to_staff_rating ?? 0)?.toString()}
              // onDebounce={(val) => onChangeDataRealEState(Number(val), 'income_according_to_staff_rating')}
              onDebounce={onChangeTotalInComeNVTTD}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
        <IncomeAttachment isTitle={false} prefix="14." />
      </Grid>
      </Grid>

      <ModalConfirm>
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