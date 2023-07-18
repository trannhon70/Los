import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import { fetchLOANNormalDataBalanceAbility } from 'features/loan/normal/configs/actions';
import { setIncomeSourceAbilityData } from 'features/loan/normal/storage/income/action';
import {
  getLOANNormalStorageIncomeSourceAbility
} from 'features/loan/normal/storage/income/selector';
import { getLOANNormalStorageLOANNeedAndPlan } from 'features/loan/normal/storage/loan/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageIncomeAbility } from 'types/models/loan/normal/storage/Income';
import { calcInputNumber, formatNumber, formatRoundNumber } from 'utils';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import TitleSquare from 'views/components/layout/TitleSquare';
import RepayPrincipalInterestRadio from 'views/components/widgets/RepayPrincipalInterestRadio';

const IncomeAbilityRepay: FC = () => {
  const params = useParams() as ILOANURLParams;
  const dispatch = useDispatch();
  const abilityIncome =  useSelector(getLOANNormalStorageIncomeSourceAbility())
  const getMessage = useNormalIncomeMessage();  

  // const balanceIncome =  useSelector(getLOANNormalStorageIncomeSourceBalance())
  const LOANNAP = useSelector(getLOANNormalStorageLOANNeedAndPlan);
  
  useEffect(()=>{
    dispatch(fetchLOANNormalDataBalanceAbility(params.id ?? ''));
  },[]);

  // const Total = balanceIncome?.totalIncome?? 0; 
  // const amountPaidEachPeriod = LOANNAP.amountPaidEachPeriod !== null? LOANNAP.amountPaidEachPeriod 
  //                             :((LOANNAP.need ?? 0) - (LOANNAP.ownCaptital ?? 0))/(LOANNAP.expiredCredit ?? 0)
  // const loanMoney= (LOANNAP.need ?? 0) - (LOANNAP.ownCaptital ?? 0)
  // const highestInterestRate = (LOANNAP.interestRate ?? 0)  + (LOANNAP.marginAdjust ?? 0)
  
  // const principalInterest = amountPaidEachPeriod + (loanMoney * (highestInterestRate)/100)/12

  const ruleDisabled = useSelector(getRuleDisbled)

  const onChangeDataAbility = (value: string, key: keyof ILOANNormalStorageIncomeAbility) => {
    dispatch(setIncomeSourceAbilityData(value, { key }))
  }

  return <Box className="mt-6">
    <Box>
      <Grid container spacing={ 3 } sx={{
          '& .Mui-disabled input': { 
            color: 'var(--mscb-danger)!important', 
            WebkitTextFillColor: 'var(--mscb-danger)!important',
            fontWeight: 'bold' 
          }
        }}>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="1. Tổng thu nhập (VND)"
            disabled
            format
            value={formatNumber((abilityIncome.totalIncome ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="2. Tổng chi phí (VND)"
            disabled
            format
            value={formatNumber((abilityIncome.totalCost?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            label="3. Thu nhập ròng (VND)"
            disabled
            format
            value={formatNumber((abilityIncome.differentValue ?? 0).toString())}
            message={getMessage('ability-repay', 'ability', 'differentValue', {})}
          />
        </Grid>
      </Grid>
    </Box>
    <TitleSquare className="mt-6">
      THÔNG TIN CHI TIẾT
    </TitleSquare>
    <Box className="mt-3 mb-6">
      <Grid container spacing={ 3 } sx= {{
          '& .MuiInputBase-input':{
            fontWeight: 'bold',
          },
          '& .Mui-disabled':{
            WebkitTextFillColor:'var(--mscb-secondary)'
          }
      
      }}
      >
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }
        sx= {{
          '& .Mui-disabled':{
            WebkitTextFillColor:'var(--mscb-danger) !important'
          }
        
        }}
        >
          <Input
            disabled
            label="1. Số tiền vay (VND)"
            format
            value={formatNumber((abilityIncome.loanAmount ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            disabled
            label="2. Thời hạn vay (tháng)"
            format
            value={formatNumber((abilityIncome.gracePeriod ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            disabled
            label="3. Lãi suất cho vay (cao nhất) (%/năm)"
            format
            value={formatNumber(calcInputNumber(abilityIncome.lendingRate ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 } >
          <Input
            disabled
            label="4. Gốc, lãi tháng cao nhất (VND)"
            format
            value={formatNumber(formatRoundNumber((abilityIncome.costValueMax ?? 0)).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 }>
          <Input
            disabled
            label="5. Hệ số đánh giá khả năng trả nợ - PNI (%)"
            format
            value={formatNumber((abilityIncome.PNI_value ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } xs={ 12 } >
          <Input
            format
            disabled
            label="6. Hệ số nợ trên thu nhập (DTI) (%)"
            value={formatNumber((abilityIncome.DTI_value ?? 0).toString())}
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
          <RepayPrincipalInterestRadio
            label="7. Nhận xét khả năng trả nợ gốc/lãi"
            value={abilityIncome?.gurantee}
            disabled={ruleDisabled}
            onChange={(val) => onChangeDataAbility(val, 'gurantee')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={ 3 } className="mt-0">
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <TextArea 
            label="8. Nhận xét" 
            disabled={ruleDisabled}
            value={abilityIncome?.comment}
            onDebounce={(val) => onChangeDataAbility(val, 'comment')}
          />
        </Grid>
      </Grid>
    </Box>
  </Box>

}

export default IncomeAbilityRepay;