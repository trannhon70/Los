import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeApprovalMessage from 'app/hooks/useNormalIncomeApprovalMessage';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { setIncomeSourceApprovalActive, setIncomeSourceApprovalPensionData, setIncomeSourceApprovalPensionDataFREQ, setIncomeSourceApprovalPensionDataTotal, setTotalIncomeNVTTD } from 'features/loan/normal/storageApproval/income/action';
import { getLOANNormalStorageIncomeSourcePensionData } from 'features/loan/normal/storageApproval/income/selector';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary, ILOANNormalStorageIncomePension } from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { pathKeyStore } from 'utils';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import TitleSquare from 'views/components/layout/TitleSquare';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAttachment from '../Attachment';
import { SxInputDisabled, SxInputRedDisabled } from '../style';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const IncomeFormPension: FC = () => {
  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const getMessage = useNormalIncomeApprovalMessage();
  const dispatch = useDispatch();
  const dataPension = useSelector(getLOANNormalStorageIncomeSourcePensionData(declareType, params.uuid ?? ''));
  const [onBlurError, setOnBlurError] = useState<string>('');
  const [dateRecievePension, setDateRecievePension] = useState<string>('');
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "pension"));
  const [isDelete,setDelete] = useState<boolean>(false);
  const onChangePensionOther = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) => {
    
    dispatch(setIncomeSourceApprovalPensionData(val, { declare: declareType, key }))
  }
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  useEffect(()=>{
    dispatch(setIncomeSourceApprovalActive('pension', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  },[]);

 const alertMessage = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) =>{
   if(key === 'startDate'){
     if(Number(val) > (new Date().getTime())){
      setDateRecievePension('Vui lòng nhập thời gian bắt đầu nhận lương nghĩ hưu lớn hơn ngày hiện tại');
     } else {
      setDateRecievePension('');
     }
   }
 }

  const onChangeDataTotal = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) => {
    Number(val) === 0 ? setOnBlurError('Số tiền lương hưu theo tháng (VND) phải lớn hơn 0'): setOnBlurError('');
    dispatch(setIncomeSourceApprovalPensionDataTotal(Number(val), { declare: declareType}));
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourceApprovalPensionDataFREQ(value, { declare: declareType }));
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((dataPension?.salary ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((dataPension?.salary ?? 0) * 0.3).toString();
        break;
    
      default:
        break;
    }
    return cal;
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
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ lương hưu trí(VND)"
          disabled
          sx={SxInputRedDisabled}
          type='number'
          format
          value={(dataPension?.income_from_pension ?? 0).toString() }
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          sx={SxInputRedDisabled}
          type='number'
          format
          value={(dataPension?.income_from_per ?? 0).toString() }
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          sx={SxInputRedDisabled}
          type='number'
          format
          value={(dataPension?.income_from_occ ?? 0).toString() }
        />
      </Grid>
    </Grid>
    <Grid container spacing={3} className='mt-0'>
      <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
        <TitleSquare>
          Thông tin LƯƠNG HƯU TRÍ
        </TitleSquare>
        <Box className='mt-3'>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
              required
                label="1. Số quyết định nghỉ hưu"
                onDebounce={(val) => onChangePensionOther(val, 'license')}
                value={dataPension?.license}
                disabled={ruleDisabled}
                message={getMessage(declareType, incomeType, 'license')}

              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <InputDate
              required
                label="2. Ngày bắt đầu nhận lương hưu"
                disabled={ruleDisabled}
                onChange={(val) => onChangePensionOther(val, 'startDate')}
                value={dataPension?.startDate}
                message={getMessage(declareType, incomeType, 'startDate')}

              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
              required
                label="3. Số Bảo hiểm xã hội"
                onDebounce={(val) => onChangePensionOther(val, 'insurance')}
                value={dataPension?.insurance}
                message={getMessage(declareType, incomeType, 'insurance')}
                disabled={ruleDisabled}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
              required
                label="4. Số tiền lương hưu theo tháng (VND)"
                type="number"
                format
                disabled={ruleDisabled}
                onDebounce={(val) => onChangeDataTotal(val, 'salary')}
                value={(dataPension?.salary ?? '').toString()}
                message={getMessage(declareType, incomeType, 'salary')}

              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <SelectFrequence
              required
                label="5. Tần suất thu nhập"
                disabled={ruleDisabled}
                onChange={onChangeFreq}
                value={dataPension?.frequency}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
              required
                disabled
                label="6. Tỉ lệ nguồn thu nhập (%)"
                value={dataPension?.frequency === 'FREQ' ? '100' :
                dataPension?.frequency === 'INFREQ' ? '30' : ''}
                sx={SxInputDisabled}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} sx={{
                '& .Mui-disabled input': { 
                  color: 'var(--mscb-danger)!important', 
                  WebkitTextFillColor: 'var(--mscb-danger)!important',
                  fontWeight: 'bold' 
                }
              }}>
              <Input
              required
                disabled
                type="number"
                sx={SxInputRedDisabled}
                label="7. Thu  nhập từ lương hưu trí (VND)"
                format
                value={dataPension?.frequency ? calculateFrequencyType(dataPension?.frequency) : '0'}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                type="number"
                label="8. Thu nhập theo đánh giá của NVTTĐ"
                format
                disabled={ruleDisabled}
                // onDebounce={(val) => onChangeDataTotal(val, 'income_according_to_staff_rating')}
                onDebounce={onChangeTotalInComeNVTTD}
                value={(dataPension?.income_according_to_staff_rating ?? '').toString()}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
        <IncomeAttachment isTitle={true} />
      </Grid>
    </Grid>
  </Box>

}

export default IncomeFormPension;