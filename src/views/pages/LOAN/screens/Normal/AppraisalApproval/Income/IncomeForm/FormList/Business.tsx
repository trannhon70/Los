import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import {
  setIncomeSourceApprovalBusinessChangeFREQ, 
  setIncomeSourceApprovalBusinessDataCost, 
  setIncomeSourceApprovalBusinessDataTurnover, 
  setIncomeSourceApprovalBussinessActive,
  setIncomeSourceApprovalBussinessData, 
  setTotalIncomeNVTTD
} from 'features/loan/normal/storageApproval/income/action';
import {
  getLOANNormalStorageIncomeSourceList,
  getLOANNormalStorageIncomeSourceListBussniessActive
} from 'features/loan/normal/storageApproval/income/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { 
  Document, 
  ILOANNormalStorageIncomeBusiness, 
  ILOANNormalStorageIncomeDeclare, 
  ILOANNormalStorageIncomeDeclareSalary 
} from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { formatNumber } from 'utils';
import Input from 'views/components/base/Input';
import Label from 'views/components/base/Label';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TitleSquare from 'views/components/layout/TitleSquare';
import SelectBusinessRepresentation from 'views/components/widgets/SelectBusinessRepresentation';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from '../Attachment';
import { 
  SxInputDisabled, 
  SxInputRedDisabled, 
  SxSelectDisabled 
} from '../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const IncomeFormBusiness: FC = () => {
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const data = useSelector(getLOANNormalStorageIncomeSourceList(declareType, params.uuid ?? ""));
  const activeBuss = useSelector(
    getLOANNormalStorageIncomeSourceListBussniessActive( 
      declareType, 
      params?.uuid ?? "", 
      data?.business.activeBusiness?? ""
      )
    )
  const getMessage = useNormalIncomeApprovalMessage();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const optionsDataPos =(data?.business.data?.findIndex((d) => d.uuid === activeBuss?.uuid) ?? 0) + 1;

  
  const [onBlurError, setOnBlurError] = useState('');
  const [onBlurErrorFee, setOnBlurErrorFee] = useState('');
  const [actualTime, setActualTime] = useState('');

  const [visibleModal, setVisibleModal]=useState<{message:string}|null>(null);
  
  const optionsData: IGroupListBase[] = data?.business.data.map((__, i) => ({
    value: i + 1,
    label: `Hộ kinh doanh ${i + 1}`,
    key: i + 1,
  })) ?? [];

  const onSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = data?.business.data[current].uuid ?? ''
    dispatch(setIncomeSourceApprovalBussinessActive(currentActive, {declare: declareType}))
  }

  const onChangeDataTurnover = (value: string) => {
    Number(value) === 0 ? setOnBlurError('Doanh thu bình quân tháng (VND) phải lớn hơn 0') : setOnBlurError('');
    setOnBlurErrorFee('');
    dispatch(setIncomeSourceApprovalBusinessDataTurnover(+value, { declare: declareType }))
  }

  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalBusinessChangeFREQ(value, { declare: declareType }))
  }

  const onChangeDataBus = (value: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomeBusiness) => {
    let val = value;
    if (key ==="workingTime"){
      val = Number(value);
      if(Number(value) === 0 ){
        setActualTime('Thời gian kinh doanh thực tế (tháng) phải lớn hơn không');
      } else {
        setActualTime('');
      }
    }
    dispatch(setIncomeSourceApprovalBussinessData(val, { declare: declareType, key }))
  }

  
  const alertConfirm = (value: string, key: keyof ILOANNormalStorageIncomeBusiness) =>{
    if(key === "cost" && Number(value?.split('.').join('')) > Number(activeBuss?.turnover)){
      setVisibleModal({message: "Cảnh báo, Chi phí bình quân tháng đang lớn hơn Doanh thu bình quân tháng"});
    }
  }

  const onChangeDataCost = (value: string) => {
    Number(value) === 0 ? setOnBlurErrorFee('Chi phí bình quân tháng (VND) phải lớn hơn 0') : setOnBlurErrorFee('');
    setOnBlurError('');
    dispatch(setIncomeSourceApprovalBusinessDataCost(+value, { declare: declareType }))
  }
  
  const handleOnCloseModal =()=>{
    setVisibleModal(null);
  }


  const onChangeTotalInComeNVTTD = (value: string) =>{
    dispatch(setTotalIncomeNVTTD(+value, { declare: declareType }));
  }

  return <Box>
    <Grid container spacing={3} sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
    <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ hoạt động của HKD (VND)"
          disabled
          value={formatNumber(data?.business.total_income_from_business_NVTTD?.toString() ?? '0')}
          sx={SxInputRedDisabled}
        />
      </Grid>
      <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập HĐ của HKD thường xuyên (VND)"
          disabled
          value={formatNumber(data?.business.permanent_income_amount?.toString() ?? '0')}
          sx={SxInputRedDisabled}
        />
      </Grid>
      <Grid item xl={3.5} lg={4} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập HĐ của HKD không thường xuyên (VND)"
          disabled
          value={formatNumber(data?.business.occasional_income_amount?.toString() ?? '0')}
          sx={SxInputRedDisabled}
        />
      </Grid>
    </Grid>
    <Grid container spacing={3} className='mt-3'>
      <Grid item className="mscb-group-list-col" xl={2} lg={2} md={2} sm={2} xs={2}>
        <Label bold className="mb-3">4. Chọn hộ kinh doanh</Label>
        <GroupListBase
          labelAdd='Hộ kinh doanh'
          options={optionsData}
          activeId={optionsDataPos}
          onSelected={onSelectGroupList}
          isAdd={true}
        />
      </Grid>
      <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
        <TitleSquare>
          Thông tin HỘ KINH DOANH
        </TitleSquare>
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <SelectBusinessRepresentation 
                // disabled={disabled || ruleDisabled}
                required
                disabled={ruleDisabled}
                label="1. Người đại diện hộ kinh doanh"
                onChange={(val) => onChangeDataBus(val, 'representative')}
                value={activeBuss?.representative}
                message={getMessage(declareType, incomeType, 'representative', {position: activeBuss?.uuid ?? ""})}
                sx={{
                  ...SxSelectDisabled,
                  "& label":{
                    color: "var(--mscb-secondary) !important"
                  }
                }}
                
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="2. Họ và tên"
                required
                disabled={ruleDisabled}
                // disabled={disabled || ruleDisabled}
                onDebounce={(val) => onChangeDataBus(val, 'name')}
                value={activeBuss?.name}
                message={getMessage(declareType, incomeType, 'name', {position: activeBuss?.uuid ?? ""})}
                onBlur={(e) => alertConfirm(e.target.value, 'name')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
                  // disabled={disabled || ruleDisabled}
                  label="3. Thời gian kinh doanh thực tế (tháng)"
                  onDebounce={(val) => onChangeDataBus(val, 'workingTime')}
                  value={activeBuss?.workingTime?.toString()}
                  type='number'
                  disabled={ruleDisabled}
                  message={getMessage(declareType, incomeType, 'workingTime', {position: activeBuss?.uuid ?? ""}) || actualTime}
                // onBlur ={(e) => alertConfirm(e.target.value, 'workingTime')}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <SelectFrequence
              required
                // disabled={disabled || ruleDisabled}
                label="4. Tần suất thu nhập"
                onChange={onChangeFreq}
                disabled={ruleDisabled}
                value={activeBuss?.frequency}
                message={getMessage(declareType, incomeType, 'frequency', {position: activeBuss?.uuid ?? ""})}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
              required
                disabled
                label="5. Tỉ lệ nguồn thu nhập (%)"
                value={activeBuss?.frequency === 'FREQ' ? '100' : activeBuss?.frequency === 'INFREQ' ? '30' : ''}
                sx={SxInputDisabled}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
            required
            disabled={ruleDisabled}
                // required={activeBuss?.frequency.length === 0 ? false : true}
                // disabled={!activeBuss?.frequency || ruleDisabled}
                // regex={/-?[0-9]*\.?[0-9]+/g}
                label="6. Doanh thu bình quân tháng (VND)"
                onDebounce={onChangeDataTurnover}
                value={(activeBuss?.turnover ?? '').toString()}
                format
                type='number'
                message={getMessage(declareType, incomeType, 'turnover', {position: activeBuss?.uuid ?? ""}) || onBlurError}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
            required
                // required={activeBuss?.frequency.length === 0 ? false : true}
                disabled={!activeBuss?.frequency || ruleDisabled}
                onDebounce={onChangeDataCost}
                regex={/-?[0-9]*\.?[0-9]+/g}
                label="7. Chi phí bình quân tháng (VND)"
                format
                type='number'
                value={(activeBuss?.cost ?? '').toString()}
                message={getMessage(declareType, incomeType, 'cost', {position: activeBuss?.uuid ?? ""}) || onBlurErrorFee}
                onBlur ={(e) => alertConfirm(e.target.value, 'cost')}
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
                onDebounce={(val) => onChangeDataBus(val, 'profit')}
                sx={SxInputRedDisabled}
                label="8. Lợi nhuận BQ tháng từ HĐKD của HKD (VND)"
                value={formatNumber(((activeBuss?.turnover ?? 0) - (activeBuss?.cost ?? 0)).toString())}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{
                minWidth: 330,
                '& .Mui-disabled input': { 
                  color: 'var(--mscb-danger)!important', 
                  WebkitTextFillColor: 'var(--mscb-danger)!important',
                  fontWeight: 'bold' 
                }
              }}>
               <Input  // 6 - 7 
                disabled
                required
                onDebounce={(val) => onChangeDataBus(val, 'profit')}
                sx={SxInputRedDisabled}
                label="9. Thu nhập từ hoạt động của HKD (VND)"
                value={activeBuss?.frequency === 'FREQ' ? formatNumber(((activeBuss?.turnover ?? 0) - (activeBuss?.cost ?? 0)).toString())
                : formatNumber((((activeBuss?.turnover ?? 0) - (activeBuss?.cost ?? 0))*0.3).toString())??""}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Input
                label="10. Thu nhập theo đánh giá của NVTTĐ"
                value={activeBuss?.income_according_to_staff_rating?.toString()}
                // onChange={(value) => (onChangeDataBus(value, 'income_business_activities'))}
                onDebounce={onChangeTotalInComeNVTTD}
                type="number"
                disabled={ruleDisabled}
                format
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <IncomeAttachment isTitle={true} />
      </Grid>
    </Grid>

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

}

export default IncomeFormBusiness;