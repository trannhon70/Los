import { Box, Grid } from "@mui/material";
import useApprovalLOANMessage from "app/hooks/useApprovalLOANMessage";
import { onChangeLoanMethodData } from "features/loan/normal/storageApproval/loan/action";
import { getApprovalLOANCapitalNeed, getApprovalLOANDemandAtScb, getApprovalLOANMethod, getApprovalLOANProgram } from "features/loan/normal/storageApproval/loan/selectors";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANMethod } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { formatRoundNumber } from 'utils';
import Input from "views/components/base/Input";
import SelectDebursement from "views/components/widgets/SelectDebursement";
import SelectInterestPaymentMethod from "views/components/widgets/SelectInterestPaymentMethod";
import SelectLendingMethod from "views/components/widgets/SelectLendingMethod";
import SelectScheduleUnit from "views/components/widgets/SelectScheduleUnit";
import { SxInputRedDisabled } from "./style";

const LOANMethod: FC = () => {
  const dispatch = useDispatch();
  const getMessage = useApprovalLOANMessage();
  const onChangeData = (value: string | number | null, key: keyof ILOANMethod) => {
    dispatch(onChangeLoanMethodData(value, { key: key }))
  }
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const dataLoanMethod = useSelector(getApprovalLOANMethod);
  const dataCapitalNeed = useSelector(getApprovalLOANCapitalNeed);
  const program = useSelector(getApprovalLOANProgram);
  const loanDemandScb = useSelector(getApprovalLOANDemandAtScb)

  // const dataCapitalNeed_t = (!dataCapitalNeed?.plan_effect?.total_cost?.evaluation_staff_t || !dataCapitalNeed?.loan_limit?.working_capital?.evaluation_staff_t) ? 0 : ((dataCapitalNeed?.plan_effect?.total_cost?.evaluation_staff_t) / (dataCapitalNeed?.loan_limit?.working_capital?.evaluation_staff_t)) //(5)t = (2)/(4)

  // const dataLoanDemanScb_t = (dataCapitalNeed_t ?? 0) -
  //   (dataCapitalNeed?.loan_limit?.own_working_capital?.evaluation_staff_t ?? 0) -
  //   (dataCapitalNeed?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t ?? 0) -
  //   (dataCapitalNeed?.loan_limit?.other_credit_institutions?.evaluation_staff_t ?? 0) //(9)t = (5) - (6) - (7) - (8)

  //   const totalCost_t = (dataCapitalNeed?.plan_effect?.total_cost?.price_product?.evaluation_staff_t ?? 0) +
  //   (dataCapitalNeed?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t ?? 0) +
  //   (dataCapitalNeed?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t ?? 0) +
  //   (dataCapitalNeed?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t ?? 0)  // (2)t = (2.1) + (2.2) + (2.3) + (2.4)
  // const loan_scb_t = totalCost_t -
  //   (dataCapitalNeed?.loan_limit?.equity_capital?.evaluation_staff_t ?? 0) -
  //   (dataCapitalNeed?.loan_limit?.credit_capital?.evaluation_staff_t ?? 0)  //(7)t = (4) - (5) - (6)
  //   const loanNeedScb = (dataCapitalNeed?.total_capital_need?.evaluation_staff ?? 0) - (dataCapitalNeed?.equity_capital?.evaluation_staff ?? 0)
  //   // vốn vay SCB
  //   const getPeriodicPrincipalByType = () =>{
  //     switch(program.evaluation_analysis_table){
  //       case TableApprovalLOANOptions.option_1:
  //         return dataLoanDemanScb_t
  //       case TableApprovalLOANOptions.option_2:
  //         return loan_scb_t
  //       case TableApprovalLOANOptions.option_3:
  //         return loanNeedScb
  //       default:
  //         return 0
  //     }
  //   }
// 11. Tiền lãi + phí kỳ cao nhất (VND)
//   const interest_and_fees = (loanDemandScb * (dataLoanMethod?.maximum_loan_interest_rate_scb ?? 0)/12/100)
// // 13. tien goc dinh ky (Von vay SCB / thoi han vay)
//   const periodic_principal = formatRoundNumber(!dataLoanMethod?.credit_period ? 0 : (loanDemandScb / (dataLoanMethod?.credit_period ?? 0)) ?? 0, 0)
// // 14. Tiền gốc kỳ cuối cùng (VND)
//   const last_period_principal = !dataLoanMethod?.credit_period ? 0 : (loanDemandScb - periodic_principal * (dataLoanMethod?.credit_period - 1))
  
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xl={3} xs={12} md={12}>
          <SelectLendingMethod
            label="1. Phương thức đề nghị cấp tín dụng"
            required
            disabled={ruleDisabled}
            onChange={(val) => onChangeData(val, 'credit_granting_method')}
            value={dataLoanMethod?.credit_granting_method}
            message={getMessage('emptyBasic',{fieldName:"credit_granting_method"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input label="2. Thời hạn đề nghị cấp tín dụng (tháng)"
            required
            disabled={ruleDisabled}
            onDebounce={(val) => onChangeData(+val, 'credit_period')}
            value={dataLoanMethod?.credit_period?.toString()}
            message={getMessage('emptyBasic',{fieldName:"credit_period"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input label="3. Thời hạn tối đa từng lần rút vốn (tháng)"
            onDebounce={(val) => onChangeData(+val, 'maximum_time_limit')}
            disabled={ruleDisabled}
            value={dataLoanMethod?.maximum_time_limit?.toString()}
            message={getMessage('emptyBasic',{fieldName:"maximum_time_limit"})}
            required />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <SelectDebursement
            label="4. Phương thức giải ngân"
            required
            disabled={ruleDisabled}
            onChange={(val) => onChangeData(val, 'disbursement_method')}
            value={dataLoanMethod?.disbursement_method}
            message={getMessage('emptyBasic',{fieldName:"disbursement_method"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <SelectInterestPaymentMethod
            label="5. Phương thức trả nợ lãi"
            required
            disabled={ruleDisabled}
            onChange={(val) => onChangeData(val, 'interest_payment_method')}
            value={dataLoanMethod?.interest_payment_method}
            message={getMessage('emptyBasic',{fieldName:"interest_payment_method"})}
          />
        </Grid>
        <Grid item xl={9} xs={12} md={12}>
          <Input label="6. Ghi chú trả nợ lãi"
            onDebounce={(val) => onChangeData(val, 'interest_payment_notes')}
            value={dataLoanMethod?.interest_payment_notes}
            disabled={ruleDisabled}
            message={getMessage('emptyBasic',{fieldName:"interest_payment_notes"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <SelectScheduleUnit
            label="7. Phương thức trả nợ gốc"
            required
            disabled={ruleDisabled}
            onChange={(val) => onChangeData(val, 'principal_repayment_method')}
            value={dataLoanMethod?.principal_repayment_method}
            message={getMessage('emptyBasic',{fieldName:"principal_repayment_method"})}
          />
        </Grid>
        <Grid item xl={9} xs={12} md={12}>
          <Input label="8. Ghi chú trả nợ gốc"
            onDebounce={(val) => onChangeData(val, 'principal_repayment_notes')}
            value={dataLoanMethod?.principal_repayment_notes} 
            disabled={ruleDisabled}
            message={getMessage('emptyBasic',{fieldName:"principal_repayment_notes"})}/>
        </Grid>
        <Grid item container spacing={3} xl={12} xs={12} md={12} sx={SxInputRedDisabled}>
          <Grid item xl={3} xs={12} md={12} >
            <Input 
              label="9. Vốn vay của SCB"
              type="number"
              format
              disabled
              isMinus
              value={loanDemandScb.toString()}
              
              // sx={{
              //   maxWidth: 
              // }}
              // value={dataLoanMethod?.fee_interest?.toString()}
            />
          </Grid>
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input 
            label="10. Lãi suất phí (%/năm)"
            onDebounce={(val) => onChangeData(+val, 'fee_interest')}
            type="number"
            format
            disabled={ruleDisabled}
            value={dataLoanMethod?.fee_interest?.toString()}
            required 
            message={getMessage('emptyBasic',{fieldName:"fee_interest"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input label="11. Lãi suất cho vay tối đa của SCB hiện hành (%/năm)"
            type="number"
            format
            disabled={ruleDisabled}
            onDebounce={(val) => onChangeData(val, 'maximum_loan_interest_rate_scb')}
            value={dataLoanMethod?.maximum_loan_interest_rate_scb?.toString()} 
            message={getMessage('emptyBasic',{fieldName:"maximum_loan_interest_rate_scb"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input 
            label="12. Tiền lãi + phí kỳ cao nhất (VND)"
            onDebounce={(val) => onChangeData(+val, 'interest_and_fees')}
            value={dataLoanMethod.interest_and_fees?.toString()} 
            type="number"
            format
            isMinus
            disabled
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12}>
          <Input label="13. Thời gian ân hạn gốc (tháng)"
            onDebounce={(val) => onChangeData(+val, 'original_grace_period')}
            value={dataLoanMethod?.original_grace_period?.toString()} 
            disabled={ruleDisabled}
            message={getMessage('emptyBasic',{fieldName:"original_grace_period"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12} sx={SxInputRedDisabled}>
          <Input 
            label="14. Tiền gốc định kỳ (VND)" 
            disabled
            onDebounce={(val) => onChangeData(+val, 'periodic_principal')}
            value={dataLoanMethod.periodic_principal?.toString()} 
            format
            isMinus
            type="number"
            message={getMessage('emptyBasic',{fieldName:"periodic_principal"})}
          />
        </Grid>
        <Grid item xl={3} xs={12} md={12} sx={SxInputRedDisabled}>
          <Input 
            label="15. Tiền gốc kỳ cuối cùng (VND)" 
            disabled
            type="number"
            onDebounce={(val) => onChangeData(+val, 'last_period_principal')}
            value={dataLoanMethod.last_period_principal?.toString()} 
            format
            isMinus
            message={getMessage('emptyBasic',{fieldName:"last_period_principal"})}
          />
        </Grid>
        <Grid item xl={6} xs={12} md={12}>
          <Input label="16. Đánh giá khả năng trả nợ gốc"
            onDebounce={(val) => onChangeData(val, 'ability_to_repay_the_principal')}
            value={dataLoanMethod?.ability_to_repay_the_principal} 
            disabled={ruleDisabled}
            message={getMessage('emptyBasic',{fieldName:"ability_to_repay_the_principal"})}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LOANMethod;
