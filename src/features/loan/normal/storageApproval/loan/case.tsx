
import { Draft, PayloadAction } from '@reduxjs/toolkit';
import set from 'lodash/set';
import { ILOANNormalState } from 'types/models/loan/normal';
import { TableApprovalLOANOptions } from 'types/models/loan/normal/storageApproval/LOAN';
import {
  IApprovalLOANBABasicInfo, IApprovalLOANBABusinessInfo, IApprovalLOANBAEvaluationAssessment,
  IApprovalLOANBAWareHouses, IApprovalLOANBussinessActivities, IApprovalLOANCapitalNeedFull, IApprovalValidate, IloanInfoForm, ILOANLimit, ILOANMethod,
  ILoanProgram, IPlanEffectOptionFull,
  IPlanEffectTotalCost,
  IProductLoanProgram,
  ITurnOver, ITurnOverOption3
} from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import { formatRoundNumber } from 'utils';
import { EmptyWareHouse } from './emptyData';

const recalculateWhenUpdateValueTableA = (table : IApprovalLOANCapitalNeedFull) => {
  const profit_t = (table?.plan_effect?.turn_over?.evaluation_staff_t ?? 0) - (table?.plan_effect?.total_cost?.evaluation_staff_t ?? 0) //  (3)t = (1) - (2)
  const profit_t1 = (table?.plan_effect?.turn_over?.evaluation_staff_t1 ?? 0) - (table?.plan_effect?.total_cost?.evaluation_staff_t1 ?? 0)//  (3)t1 = (1) - (2)

  const dataCapitalNeed_t = (!table?.plan_effect?.total_cost?.evaluation_staff_t || !table?.loan_limit?.working_capital?.evaluation_staff_t) 
                            ? 0 : formatRoundNumber(((table?.plan_effect?.total_cost?.evaluation_staff_t) / (table?.loan_limit?.working_capital?.evaluation_staff_t)),0) //(5)t = (2)/(4)
  const dataCapitalNeed_t1 = (!table?.plan_effect?.total_cost?.evaluation_staff_t1 || !table?.loan_limit?.working_capital?.evaluation_staff_t1) 
                            ? 0 : formatRoundNumber(((table?.plan_effect?.total_cost?.evaluation_staff_t1 ?? 0) / (table?.loan_limit?.working_capital?.evaluation_staff_t1)), 0) ?? 0//(5)t1 = (2)/(4)

  const dataLoanDemanScb_t = (dataCapitalNeed_t ?? 0) -
                            (table?.loan_limit?.own_working_capital?.evaluation_staff_t ?? 0) -
                            (table?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t ?? 0) -
                            (table?.loan_limit?.other_credit_institutions?.evaluation_staff_t ?? 0) //(9)t = (5) - (6) - (7) - (8)
  const dataLoanDemanScb_t1 = (dataCapitalNeed_t1 ?? 0) -
                            (table?.loan_limit?.own_working_capital?.evaluation_staff_t1 ?? 0) -
                            (table?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t1 ?? 0) -
                            (table?.loan_limit?.other_credit_institutions?.evaluation_staff_t1 ?? 0) //(9)t1 = (5) - (6) - (7) - (8)

  const dataLoanRatioScb_t = formatRoundNumber(dataCapitalNeed_t > 0 ? ((dataLoanDemanScb_t ?? 0) /  (dataCapitalNeed_t ?? 0)) * 100  : 0)    //(10)t = (9)/(5)
  const dataLoanRatioScb_t1 = formatRoundNumber(dataCapitalNeed_t1 > 0 ? ((dataLoanDemanScb_t1 ?? 0) /  (dataCapitalNeed_t1 ?? 0)) * 100 : 0) //(10)t1 = (9)/(5)

  return {
    profit_t,
    profit_t1,
    dataCapitalNeed_t,
    dataCapitalNeed_t1,
    dataLoanDemanScb_t,
    dataLoanDemanScb_t1,
    dataLoanRatioScb_t,
    dataLoanRatioScb_t1
  }
}

const recalculateWhenUpdateValueTableB = (table : IApprovalLOANCapitalNeedFull) => {
  const totalCost_t = (table?.plan_effect?.total_cost?.price_product?.evaluation_staff_t ?? 0) +
                      (table?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t ?? 0) +
                      (table?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t ?? 0) +
                      (table?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t ?? 0)  // (2)t = (2.1) + (2.2) + (2.3) + (2.4)
  const totalCost_t1 = (table?.plan_effect?.total_cost?.price_product?.evaluation_staff_t1 ?? 0) +
                      (table?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t1 ?? 0) +
                      (table?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t1 ?? 0) +
                      (table?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t1 ?? 0) // (2)t1 = (2.1) + (2.2) + (2.3) + (2.4)

  const profit_t = (table?.plan_effect?.turn_over?.evaluation_staff_t ?? 0) - (totalCost_t ?? 0)//  (3)t = (1) - (2)
  const profit_t1 = (table?.plan_effect?.turn_over?.evaluation_staff_t1 ?? 0) - (totalCost_t1 ?? 0) // (3)t1 = (1) - (2)

  const totalCapitalNeed_t = totalCost_t// (4)t = (2)
  const totalCapitalNeed_t1 = totalCost_t1 // (4)t1 = (2)

  const loan_scb_t = totalCapitalNeed_t -
                      (table?.loan_limit?.equity_capital?.evaluation_staff_t ?? 0) -
                      (table?.loan_limit?.credit_capital?.evaluation_staff_t ?? 0)  //(7)t = (4) - (5) - (6)
  const loan_scb_t1 = totalCapitalNeed_t1 -
                      (table?.loan_limit?.equity_capital?.evaluation_staff_t1 ?? 0) -
                      (table?.loan_limit?.credit_capital?.evaluation_staff_t1 ?? 0)  //(7)t1 = (4) - (5) - (6)

  const scb_ratio_t = formatRoundNumber(totalCapitalNeed_t ? ((loan_scb_t ?? 0) / (totalCapitalNeed_t ?? 0)) * 100 : 0) // (8)t = (7)/(4)
  const scb_ratio_t1 = formatRoundNumber(totalCapitalNeed_t1 ? ((loan_scb_t1 ?? 0) / (totalCapitalNeed_t1 ?? 0)) * 100 : 0)// (8)t1 = (7)/(4)
  return {
    totalCost_t,
    totalCost_t1,
    profit_t,
    profit_t1,
    totalCapitalNeed_t,
    totalCapitalNeed_t1,
    loan_scb_t,
    loan_scb_t1,
    scb_ratio_t,
    scb_ratio_t1
  }
}
const recalculateLoanMethodTable = (state: Draft<ILOANNormalState>) => {
   let loanDemandScb = 0;
    const option = state.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
    const tableData = state.storageApproval.loan.capital_need_loan_plan_info
    switch (option) {
        case TableApprovalLOANOptions.option_1:
          loanDemandScb = tableData?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1 ?? 0;
          break;
        case TableApprovalLOANOptions.option_2:
          loanDemandScb = tableData?.loan_limit?.loan_scb?.evaluation_staff_t1 ?? 0
          break;
        case TableApprovalLOANOptions.option_3:
          loanDemandScb = tableData?.loan_need_scb?.evaluation_staff ?? 0;
          break;
        default:
          loanDemandScb = 0;
          break;
    }

    const creditPeriod = state.storageApproval.loan.loan_method.credit_period 
    
    state.storageApproval.loan.loan_method.periodic_principal = (!!creditPeriod && creditPeriod > 0) ? formatRoundNumber(loanDemandScb / creditPeriod, 0) : 0;
    state.storageApproval.loan.loan_method.last_period_principal = loanDemandScb - (state.storageApproval.loan.loan_method.periodic_principal * ((creditPeriod ?? 0) - 1))                                                          
    
    const principal = state.storageApproval.loan.loan_method.principal_repayment_method
    if(principal === "B"){
      state.storageApproval.loan.loan_method.periodic_principal = 0
      state.storageApproval.loan.loan_method.last_period_principal = loanDemandScb
    }
    const maximumLoanInterestScb = state.storageApproval.loan.loan_method.maximum_loan_interest_rate_scb
    state.storageApproval.loan.loan_method.interest_and_fees = formatRoundNumber(loanDemandScb*(Number(maximumLoanInterestScb) ?? 0)/12/100, 0) 
      
}
export const ApprovalLOANCase = {

  updateLOANApprovalStorage(state: Draft<ILOANNormalState>, action: PayloadAction<IloanInfoForm>) {
    state.storageApproval.loan.loan_program = action.payload?.product_loan_program.loan_program
    state.storageApproval.loan.capital_need_loan_plan_info = action.payload.capital_need_loan_plan_info ? action.payload.capital_need_loan_plan_info : state.storageApproval.loan.capital_need_loan_plan_info 
    state.storageApproval.loan.loan_method = action.payload.loan_method ? {...action.payload.loan_method} : {...state.storageApproval.loan.loan_method}
    state.storageApproval.loan.business_activities = action.payload.production_and_business_activities 
    ? 
    {...action.payload.production_and_business_activities,
      evaluation_assessment: action.payload.production_and_business_activities.evaluation_assessment === null ? {
        method_business: "",
        number_members: null,
        business_efficiency: "",
        input: "",
        output: "",
        evaluate: ""
      } : action.payload.production_and_business_activities.evaluation_assessment
    }
    : 
    state.storageApproval.loan.business_activities;

    recalculateLoanMethodTable(state)

  },

  
  saveApprovalLOAN(state: Draft<ILOANNormalState>, action: PayloadAction<string[]>) {

  },
  onChangeProgramData: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof ILoanProgram }>) {
      state.storageApproval.loan.loan_program = {
        ...state.storageApproval.loan.loan_program,
        [action.meta.key]: action.payload,
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof ILoanProgram }) {
      return { payload, meta };
    }
  },
  onChangeLoanMethodData: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof ILOANMethod }>
    ) {
      state.storageApproval.loan.loan_method = {
        ...state.storageApproval.loan.loan_method,
        [action.meta.key]: action.payload,
      }
      let loanDemandScb = 0;
      const option = state.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
      const tableData = state.storageApproval.loan.capital_need_loan_plan_info
      switch (option) {
          case TableApprovalLOANOptions.option_1:
            loanDemandScb = tableData?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1 ?? 0;
            break;
          case TableApprovalLOANOptions.option_2:
            loanDemandScb = tableData?.loan_limit?.loan_scb?.evaluation_staff_t1 ?? 0
            break;
          case TableApprovalLOANOptions.option_3:
            loanDemandScb = tableData?.loan_need_scb?.evaluation_staff ?? 0;
            break;
          default:
            loanDemandScb = 0;
            break;
      }

      const creditPeriod = state.storageApproval.loan.loan_method.credit_period 
      if(action.meta.key === "credit_period" || (action.meta.key === "principal_repayment_method" && action.payload !== "B")){
        state.storageApproval.loan.loan_method.periodic_principal = !!creditPeriod && creditPeriod> 0 ? formatRoundNumber(loanDemandScb / creditPeriod, 0) : 0;
        state.storageApproval.loan.loan_method.last_period_principal = loanDemandScb - (state.storageApproval.loan.loan_method.periodic_principal * ((creditPeriod ?? 0) - 1))                                                          
        
      }
      if(action.meta.key === "principal_repayment_method" && action.payload === "B"){
        state.storageApproval.loan.loan_method.periodic_principal = 0
        state.storageApproval.loan.loan_method.last_period_principal = loanDemandScb
      }
      if(action.meta.key === "maximum_loan_interest_rate_scb"){
        state.storageApproval.loan.loan_method.interest_and_fees = formatRoundNumber(loanDemandScb*(Number(action.payload) ?? 0)/12/100, 0) 
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof ILOANMethod }) {
      return { payload, meta };
    },
  },

  setBusinessActivitiesBasic:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof IApprovalLOANBABasicInfo }>) {
      state.storageApproval.loan.business_activities.basic_info = {
        ...state.storageApproval.loan.business_activities.basic_info,
          [action.meta.key]: action.payload
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof IApprovalLOANBABasicInfo }) {
      return { payload, meta };
    },
  },
  setBusinessActivitiesBusiness:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof IApprovalLOANBABusinessInfo }>) {
      state.storageApproval.loan.business_activities.business_info = {
        ...state.storageApproval.loan.business_activities.business_info,
          [action.meta.key]: action.payload
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof IApprovalLOANBABusinessInfo }) {
      return { payload, meta };
    },
  },
  setBusinessActivitiesEvaluation:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof IApprovalLOANBAEvaluationAssessment }>) {
        state.storageApproval.loan.business_activities.evaluation_assessment = {
          ...state.storageApproval.loan.business_activities.evaluation_assessment,
            [action.meta.key]: action.payload
        }
      
    },
    prepare(payload: string | number | null, meta: { key: keyof IApprovalLOANBAEvaluationAssessment }) {
      return { payload, meta };
    },
  },
  setBusinessActivitiesWareHousePrimary:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | boolean | null, string,  keyof IApprovalLOANBAWareHouses >) {
        if(state.storageApproval.loan.business_activities.warehouses.length === 0){
          state.storageApproval.loan.business_activities.warehouses = [
            ...state.storageApproval.loan.business_activities.warehouses,EmptyWareHouse
          ]
        }
        const primary = state.storageApproval.loan.business_activities.warehouses?.find((i,idx) => idx === 0)
        if (primary) {
          state.storageApproval.loan.business_activities.warehouses = state.storageApproval.loan.business_activities.warehouses
            .map((s, idx) => idx === 0 ? { ...s, [action.meta]: action.payload } : { ...s })
        }
    },
    prepare(payload: string | number | boolean | null, meta:  keyof IApprovalLOANBAWareHouses) {
      return { payload, meta };
    },
  },
  onChangeLoanCaptitalTurnOverEffect: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {
      key: keyof ITurnOver,
      keyOptions: keyof Omit<IPlanEffectOptionFull, "total_cost">
    }>
    ) {
      state.storageApproval.loan.capital_need_loan_plan_info.plan_effect[action.meta.keyOptions] = {
        ...state.storageApproval.loan.capital_need_loan_plan_info?.plan_effect[action.meta.keyOptions],
        [action.meta.key]: action.payload
      }

      const option = state.storageApproval.loan.loan_program.evaluation_analysis_table
      if(option === TableApprovalLOANOptions.option_1) {
        const updateData = recalculateWhenUpdateValueTableA(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t'], updateData?.dataCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t1'], updateData?.dataCapitalNeed_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t'], updateData?.dataLoanDemanScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t1'], updateData?.dataLoanDemanScb_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.dataLoanRatioScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.dataLoanRatioScb_t1)
      }
      else if(option === TableApprovalLOANOptions.option_2) {
        const updateData = recalculateWhenUpdateValueTableB(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t'], updateData?.totalCost_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t1'], updateData?.totalCost_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t'], updateData?.totalCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t1'], updateData?.totalCapitalNeed_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t'], updateData?.loan_scb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t1'], updateData?.loan_scb_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.scb_ratio_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.scb_ratio_t1)
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof ITurnOver, keyOptions: keyof Omit<IPlanEffectOptionFull, "total_cost"> }) {
      return { payload, meta };
    },
  },

  onChangeLoanCaptitalTurnOverLimit: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {
      key: keyof ITurnOver,
      keyOptions: keyof Omit<IPlanEffectTotalCost, 'business_unit_period_t' | 'business_unit_period_t1' | 'evaluation_staff_t' | 'evaluation_staff_t1'>
    }>
    ) {
      state.storageApproval.loan.capital_need_loan_plan_info.plan_effect.total_cost[action.meta.keyOptions] = {
        ...state.storageApproval.loan.capital_need_loan_plan_info.plan_effect.total_cost[action.meta.keyOptions],
        [action.meta.key]:action.payload
      }

      const option = state.storageApproval.loan.loan_program.evaluation_analysis_table
      
      if(option === TableApprovalLOANOptions.option_2) {
        const updateData = recalculateWhenUpdateValueTableB(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t'], updateData?.totalCost_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t1'], updateData?.totalCost_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t'], updateData?.totalCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t1'], updateData?.totalCapitalNeed_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t'], updateData?.loan_scb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t1'], updateData?.loan_scb_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.scb_ratio_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.scb_ratio_t1)
      }
    },
    prepare(payload: string | number | null, meta: { key: keyof ITurnOver, keyOptions: keyof Omit<IPlanEffectTotalCost, 'business_unit_period_t' | 'business_unit_period_t1' | 'evaluation_staff_t' | 'evaluation_staff_t1'> }) {
      return { payload, meta };
    },
  },
  onChangeLoanCaptitalTotalCost: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {
      key: keyof ITurnOver,
    }>
    ) {
      state.storageApproval.loan.capital_need_loan_plan_info.plan_effect.total_cost ={
        ...state.storageApproval.loan.capital_need_loan_plan_info.plan_effect.total_cost,
        [action.meta.key]:action.payload
      }

      const option = state.storageApproval.loan.loan_program.evaluation_analysis_table
      if(option === TableApprovalLOANOptions.option_1) {
        const updateData = recalculateWhenUpdateValueTableA(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t'], updateData?.dataCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t1'], updateData?.dataCapitalNeed_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t'], updateData?.dataLoanDemanScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t1'], updateData?.dataLoanDemanScb_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.dataLoanRatioScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.dataLoanRatioScb_t1)
      }
      
    },
    prepare(payload: string | number | null, meta: { key: keyof ITurnOver}) {
      return { payload, meta };
    },
  },

  onChangeLoanLimitTotalCost: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {
      key: keyof ITurnOver,
      keyOptions:keyof ILOANLimit
    }>
    ) {
      state.storageApproval.loan.capital_need_loan_plan_info.loan_limit[action.meta.keyOptions] ={
        ...state.storageApproval.loan.capital_need_loan_plan_info.loan_limit[action.meta.keyOptions] ,
        [action.meta.key]:action.payload
      }

      const option = state.storageApproval.loan.loan_program.evaluation_analysis_table
      if(option === TableApprovalLOANOptions.option_1) {
        const updateData = recalculateWhenUpdateValueTableA(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t'], updateData?.dataCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'capital_needs', 'evaluation_staff_t1'], updateData?.dataCapitalNeed_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t'], updateData?.dataLoanDemanScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_demand_at_scb', 'evaluation_staff_t1'], updateData?.dataLoanDemanScb_t1)
  
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.dataLoanRatioScb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.dataLoanRatioScb_t1)
      }
      else if(option === TableApprovalLOANOptions.option_2) {
        const updateData = recalculateWhenUpdateValueTableB(state.storageApproval.loan.capital_need_loan_plan_info)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t'], updateData?.totalCost_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'total_cost', 'evaluation_staff_t1'], updateData?.totalCost_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t'], updateData?.profit_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['plan_effect', 'profit', 'evaluation_staff_t1'], updateData?.profit_t1)
        
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t'], updateData?.totalCapitalNeed_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'total_capital_need', 'evaluation_staff_t1'], updateData?.totalCapitalNeed_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t'], updateData?.loan_scb_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'loan_scb', 'evaluation_staff_t1'], updateData?.loan_scb_t1)

        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t'], updateData?.scb_ratio_t)
        set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_limit', 'scb_sponsor_ratio', 'evaluation_staff_t1'], updateData?.scb_ratio_t1)
      }

      
     
    },
    prepare(payload: string | number | null, meta: { key: keyof ITurnOver,  keyOptions:keyof ILOANLimit}) {
      return { payload, meta };
    },
  },

  onchaneLOANNote: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string, { username: string }> ){
      if(state?.storageApproval?.loan?.capital_need_loan_plan_info?.note){
        state.storageApproval.loan.capital_need_loan_plan_info.note.content = action.payload
        state.storageApproval.loan.capital_need_loan_plan_info.note.updated_at =  Date.now() / 1000
        state.storageApproval.loan.capital_need_loan_plan_info.note.updated_by =  action.meta.username
      }
    },
    prepare(payload: string , meta: { username: string}) {
      return { payload, meta };
    },
  },
  onChangeLoanLimitTotalCostOption3: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {
      key: keyof ITurnOverOption3,
      keyOptions:keyof Omit<IApprovalLOANCapitalNeedFull,'sequence_uuid'|'plan_effect'|'loan_limit'|'document_groups'|'note'| 'document_info_list'>
    }>
    ) {
      state.storageApproval.loan.capital_need_loan_plan_info[action.meta.keyOptions] ={
        ...state.storageApproval.loan.capital_need_loan_plan_info[action.meta.keyOptions],
        [action.meta.key] : action.payload
      }

      const tableData = state.storageApproval.loan.capital_need_loan_plan_info
      const loanNeedScb = (tableData?.total_capital_need?.evaluation_staff ?? 0) - (tableData?.equity_capital?.evaluation_staff ?? 0)
      const ratioScb = formatRoundNumber(((loanNeedScb ?? 0) / (tableData?.total_capital_need?.evaluation_staff ?? 0)) * 100)

      set(state.storageApproval.loan.capital_need_loan_plan_info, ['loan_need_scb', 'evaluation_staff'], loanNeedScb)
      set(state.storageApproval.loan.capital_need_loan_plan_info, ['ratio_scb', 'evaluation_staff'], ratioScb)  

    },
    prepare(payload: string | number | null, meta: { key: keyof ITurnOverOption3,  
      keyOptions:keyof Omit<IApprovalLOANCapitalNeedFull,'sequence_uuid'|'plan_effect'|'loan_limit'|'document_groups'|'note'| 'document_info_list'>}) {
      return { payload, meta };
    },
  },
  addNewWarehouseApproval(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalLOANBAWareHouses>){
    state.storageApproval.loan.business_activities.warehouses = [
      ...state.storageApproval.loan.business_activities.warehouses,action.payload
    ]
  },
  setPrimaryWarehouseApproval(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storageApproval.loan.business_activities.warehouses = [...state.storageApproval.loan.business_activities.warehouses
      .map(s => ({ ...s, primary_flag: s.uuid === action.payload }))]

  },
  setLoanApprovalValidate(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalValidate>) {
    state.storageApproval.loan.validate = action.payload;
  },
  updateWarehouseApproval(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalLOANBAWareHouses>){
    state.storageApproval.loan.business_activities.warehouses = [...state.storageApproval.loan.business_activities.warehouses.map(s => (
      s.uuid === action.payload.uuid ? {...s, ...action.payload} : {...s}
    ))]
  },
  deleteWarehouseApproval(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    const deleteIndex = state.storageApproval.loan.business_activities.warehouses.findIndex(e => e.uuid === action.payload)
    if(deleteIndex !== -1){
      state.storageApproval.loan.business_activities.warehouses.splice(deleteIndex, 1)
    }
  },

  clearApprovalStorageLoan(state: Draft<ILOANNormalState>){
    state.storageApproval.loan = {
        loan_program: {
            loan_term_info: '',
            profile_type: '',
            existing_customers: 'Y',
            actual_purpose_using_loan: null,
            evaluation_analysis_table: '',
        },
        capital_need_loan_plan_info: {} as IApprovalLOANCapitalNeedFull,

        loan_method: {
            credit_granting_method: "",
            credit_period: null,
            maximum_time_limit: null,
            disbursement_method: "",
            interest_payment_method: "",
            interest_payment_notes: "",
            principal_repayment_method: "",
            principal_repayment_notes:  "",
            fee_interest: null,
            maximum_loan_interest_rate_scb: null,
            interest_and_fees: null,
            original_grace_period: null,
            periodic_principal: null,
            last_period_principal: null,
            ability_to_repay_the_principal: ""
        },
        business_activities:{
            basic_info: {
                business_household_name:"",
                business_license_type_info:"",
                business_card_num:"",
                business_card_issue_date:"",
                business_card_place_of_issue:"",
                business_working_year_num: null,
                primary_business_code:"",
                business_actual:""
            },
            business_info: {
                business_premises_area: null,
                owner_property_info: "",
                remaining_rental_period: null,
                rental_cost: null,
                address: "",
                province: "",
                district: "",
                ward: ""
            },
            warehouses: [],
            evaluation_assessment: {
                method_business: "",
                number_members: null,
                business_efficiency: "",
                input: "",
                output: "",
                evaluate: ""
            }
        },
        validate: {
            valid: true
        }
    }
  },

  updateStoreFullLoanApprovalProduct(state: Draft<ILOANNormalState>, action: PayloadAction<IProductLoanProgram>){
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.loan_info_form.product_loan_program = action.payload
    }
  },
  updateStoreFullLoanApprovalNeedPlan(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalLOANCapitalNeedFull>){
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.loan_info_form.capital_need_loan_plan_info = action.payload
    }
  },
  updateStoreFullLoanApprovalProBus(state: Draft<ILOANNormalState>, action: PayloadAction<IApprovalLOANBussinessActivities>){
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.loan_info_form.production_and_business_activities = action.payload
    }
  },
  updateStoreFullLoanApprovalLoanMethod(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANMethod>){
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.loan_info_form.loan_method = action.payload
    }
  }

}