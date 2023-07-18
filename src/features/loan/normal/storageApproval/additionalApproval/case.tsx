import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import {
  ConditionsType, IAAApprovalNotice, IAACreditInfo,
  IAAException,
  IAALegal, IAANoticeBasicInfo,
  IAANoticeCreditInfo,
  IAANoticeOpinion, IAAPhoneNumber,
  IAAProductRegulations,
  IAAStaffProposal, IAAStatement, IAAStatementInfo,
  IAAValidate,
  IAdditionalDataAPI, IConditionDeleteInfo, ILoanNormalApprovalAdditionalAppraisal, IPhoneDeleteInfo
} from "types/models/loan/normal/storageApproval/AdditionalAppraisal";
import { TableApprovalLOANOptions } from "types/models/loan/normal/storageApproval/LOAN";
import { generateAppraisal, generateCreditGrantInfo, generateEmptyState, generateNotice, generateProduct } from "./generateEmptyAdditional";

export const AdditionalCase = { 

  clearStorageApprovalAdditional(state: Draft<ILOANNormalState>){
    state.storageApproval.additional = {...generateEmptyState()}
  },
  fetchApprovalAdditional(state: Draft<ILOANNormalState>){},
  updateAPIApprovalAdditional: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IAdditionalDataAPI, string, string>) {
      const getLoanAmount = (state: ILOANNormalState) => {
        const option = state.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
        const tableData = state.storageApproval.loan.capital_need_loan_plan_info
        switch (option) {
            case TableApprovalLOANOptions.option_1:
                return tableData?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1 ?? 0
            case TableApprovalLOANOptions.option_2:
                return tableData?.loan_limit?.loan_scb?.evaluation_staff_t1 ?? 0
            case TableApprovalLOANOptions.option_3:
                return tableData?.loan_need_scb?.evaluation_staff ?? 0
            default:
                return 0;
        }
      }
      const loanAmount = getLoanAmount(state)
      const loanTerm = state.storageApproval.full.data?.form?.loan_info_form?.loan_method?.credit_period ?? 0
      const hasCollateral = state.storage.full.data?.form.product_group_form.data.loan_document_info.collateral_flag
      
      state.storageApproval.additional = {
        ...action.payload,
        statement: {
          ...action.payload.statement,
          appraisal_result: {
            ...action.payload?.statement?.appraisal_result,
            option: action.payload?.statement?.appraisal_result?.option ?? "OPTION_2",
            appraisal_staff_proposal: {
              ...generateAppraisal(),
              ...action.payload.statement?.appraisal_result?.appraisal_staff_proposal,
              loan_amount: loanAmount,
              loan_term: loanTerm,
            },
            credit_grant_information: action.payload.statement?.appraisal_result?.credit_grant_information ?? generateCreditGrantInfo(hasCollateral ,loanAmount),
            product_regulations: {
              ...generateProduct(),
              ...action.payload.statement?.appraisal_result?.product_regulations,
              disbursement_conditions: action.payload.statement?.appraisal_result?.product_regulations.disbursement_conditions.length > 0 
                                        ? action.payload.statement?.appraisal_result?.product_regulations.disbursement_conditions 
                                        : [{
                                          uuid:null,
                                          conditions_type: 'PRE_CON', 
                                          disbursement_conditions_detail: ""
                                        }],
              conditions_after_disbursements : action.payload.statement?.appraisal_result?.product_regulations.conditions_after_disbursements.length > 0 
              ? action.payload.statement?.appraisal_result?.product_regulations.conditions_after_disbursements 
              : [{
                uuid:null,
                conditions_type: 'AFTER_CON',
                conditions_after_disbursement_detail: ""
              }],   
            },
          }
        },
        approval_notice: {
          ...generateNotice(),
          ...action.payload.approval_notice,
          product_regulations: {
            ...action.payload.approval_notice?.product_regulations,
            conditions_after_disbursements: !!action.payload?.approval_notice?.product_regulations?.conditions_after_disbursements
                                              && action.payload?.approval_notice?.product_regulations?.conditions_after_disbursements.length > 0
                                            ? action.payload.approval_notice?.product_regulations?.conditions_after_disbursements : [{
                                            uuid:null,
                                            conditions_type: 'AFTER_CON',
                                            conditions_after_disbursement_detail: ""
                                          }],
            conditions_other: action.payload.approval_notice?.product_regulations?.conditions_other ?? [],
            disbursement_conditions: !!action.payload?.approval_notice?.product_regulations?.disbursement_conditions
            && action.payload?.approval_notice?.product_regulations?.disbursement_conditions.length > 0
            ? action.payload.approval_notice?.product_regulations?.disbursement_conditions : [{
              uuid:null,
              conditions_type: 'PRE_CON', 
              disbursement_conditions_detail: ""
            }],
          }
        },
        validate: {valid: true}
      }
    },
    prepare(payload: IAdditionalDataAPI, meta: string) {
      return { payload, meta };
    }
  },
  updateAAStatementResponseSave :{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IAAStatement>) {
      const loanTerm = state.storageApproval.full.data?.form?.loan_info_form?.loan_method?.credit_period ?? 0
      
      const hasCollateral = state.storage.full.data?.form.product_group_form.data.loan_document_info.collateral_flag
      
      const getLoanAmount = (state: ILOANNormalState) => {
        const option = state.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
        const tableData = state.storageApproval.loan.capital_need_loan_plan_info
        switch (option) {
            case TableApprovalLOANOptions.option_1:
                return tableData?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1 ?? 0
            case TableApprovalLOANOptions.option_2:
                return tableData?.loan_limit?.loan_scb?.evaluation_staff_t1 ?? 0
            case TableApprovalLOANOptions.option_3:
                return tableData?.loan_need_scb?.evaluation_staff ?? 0
            default:
                return 0;
        }
      }
      
      if (state.storageApproval.full.data) {
        state.storageApproval.full.data.form.additional_appraisal.statement = {...action.payload}
      }
      const loanAmount = getLoanAmount(state);
      state.storageApproval.additional.statement = {
        ...action.payload,
        appraisal_result: {
          ...action.payload?.appraisal_result,
          option: action.payload?.appraisal_result?.option ?? "OPTION_2",
          appraisal_staff_proposal: {
            ...generateAppraisal(),
            ...action.payload?.appraisal_result?.appraisal_staff_proposal,
            loan_amount: loanAmount,
            loan_term: loanTerm,
          },
          credit_grant_information: action.payload?.appraisal_result?.credit_grant_information ?? generateCreditGrantInfo(hasCollateral, loanAmount),
          product_regulations: action.payload?.appraisal_result?.product_regulations ?? generateProduct(),
        }
      }
    },
    prepare(payload: IAAStatement) {
      return { payload };
    }
  },
  updateAANoticeResponseSave:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IAAApprovalNotice>) {
      if (state.storageApproval.full.data) {
        state.storageApproval.full.data.form.additional_appraisal.approval_notice = {...action.payload}
      }
      state.storageApproval.additional.approval_notice = {...action.payload}
    },
    prepare(payload: IAAApprovalNotice) {
      return { payload };
    }
  },
  updateStatementInfo(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAAStatementInfo, value: string | number | null}>){
    const {field, value} = action.payload
    if(field === 'business_unit_export_time' || field === 'statement_export_time') {
      state.storageApproval.additional.statement.statement_info[field] = Number(value)/1000
    }
    else {
      (state.storageApproval.additional.statement.statement_info[field] as String) = value as String
    }
  },
  updateNoticeInfo(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAANoticeBasicInfo, value: string | number | null}>){
    const {field, value} = action.payload
    if(field === 'notice_export_time') {
      state.storageApproval.additional.approval_notice.basic_info[field] = Number(value)/1000
    }
    else {
      (state.storageApproval.additional.approval_notice.basic_info[field] as String) = value as String
    }
  },
  updateNoticeCreditInfo(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAANoticeCreditInfo, value: string | number | null}>){
    const {field, value} = action.payload
    if(field === 'total') {
      state.storageApproval.additional.approval_notice.credit_grant_information[field] = Number(value)
    }
    else {
      (state.storageApproval.additional.approval_notice.credit_grant_information[field] as String) = value as String
    }
  },
  updateNoticeOpinion(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAANoticeOpinion, value: string}>){
    const {field, value} = action.payload
    if(field === 'approval_level' || field === 'appraisal_staff') {
      state.storageApproval.additional.approval_notice.opinion[field].name = value
    }
    else {
      state.storageApproval.additional.approval_notice.opinion[field] = value
    }
  },
  updateLegalDueDiligence(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAALegal, value: string}>){
    const {field, value} = action.payload
    state.storageApproval.additional.statement.legal_due_diligence[field] = value
  },
  updateExceptionValidation(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAAException, value: string}>){
    const {field, value} = action.payload
    state.storageApproval.additional.statement.exception_validation[field] = value
  },

  addNewPhoneNumber(state: Draft<ILOANNormalState>){
    if(state.storageApproval.additional?.statement?.phone_number_appraisals) {
      state.storageApproval.additional?.statement?.phone_number_appraisals?.push({
        phone_number: '',
        result: '',
        note: '',
        uuid: null
      })
    }
    else 
    {
      state.storageApproval.additional.statement.phone_number_appraisals = [{
        phone_number: '',
        result: '',
        note: '',
        uuid: null
      }]
    }
  },
  deletePhoneNumber:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<boolean, string,{
      info : IPhoneDeleteInfo
    }>) { },
    prepare(payload: boolean, meta:{
      info : IPhoneDeleteInfo
    }){
      return { payload, meta };
    }
  },
  deletePhoneNumberLocal(state: Draft<ILOANNormalState>, action: PayloadAction<IPhoneDeleteInfo>){
    state.storageApproval.additional.statement.phone_number_appraisals.splice(action.payload.index, 1)
  },
  deletePhoneNumberStoreFull(state: Draft<ILOANNormalState>, action: PayloadAction<IPhoneDeleteInfo>){
    state.storageApproval.full.data?.form.additional_appraisal.statement.phone_number_appraisals.splice(action.payload.index, 1)
  },
  updateCreditGrantStatus(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    if(action.payload === 'Y'){
      state.storageApproval.additional.statement.appraisal_result.option = 'OPTION_2'
    }
    else if(action.payload === 'N') {
      state.storageApproval.additional.statement.appraisal_result.option = 'OPTION_1'
    }
    state.storageApproval.additional.statement.appraisal_result.appraisal_staff_proposal.credit_grant_status = action.payload
  },

  updatePhoneAppraisal(state: Draft<ILOANNormalState>, action: PayloadAction<{index: number, field: keyof IAAPhoneNumber, value: string}>){
    const {field, value, index} = action.payload
    
    state.storageApproval.additional.statement.phone_number_appraisals[index][field] = value
  },
  updateStaffProposal(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAAStaffProposal, value: string | number}>){
    const { field, value } = action.payload
    if(field === 'loan_amount' || field === 'loan_term') {
      state.storageApproval.additional.statement.appraisal_result.appraisal_staff_proposal[field] = Number(value)
    }
    else {
      (state.storageApproval.additional.statement.appraisal_result.appraisal_staff_proposal[field] as String) = value as String
    }
  },
  updateCreditInfo(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAACreditInfo, value: string}>){
    const { field, value } = action.payload
    if(field !== 'hide_information_flag') {
      state.storageApproval.additional.statement.appraisal_result.credit_grant_information[field] = Number(value)
      const creditInfo = state.storageApproval.additional.statement.appraisal_result.credit_grant_information
      state.storageApproval.additional.statement.appraisal_result.credit_grant_information.total_credit_limit = 
        creditInfo.loan_balance_collateral_exist + creditInfo.loan_balance_collateral_propose + creditInfo.loan_balance_no_collateral_exist + creditInfo.loan_balance_no_collateral_propose
    }
  },
  updateCreditInfoHideFlag(state: Draft<ILOANNormalState>, action: PayloadAction<{field: keyof IAACreditInfo, value: boolean}>){
    const { field, value } = action.payload
    if(field === 'hide_information_flag') {
      state.storageApproval.additional.statement.appraisal_result.credit_grant_information[field] = value
    }
  },
  updateProductRegulations(state: Draft<ILOANNormalState>, action: PayloadAction<{tab: keyof ILoanNormalApprovalAdditionalAppraisal,field: keyof IAAProductRegulations,index?:number, value: string}>){
    const {tab, field, value, index } = action.payload
    if(index !== undefined) {
      if (field === 'conditions_other') {
        tab === 'statement' ?
        state.storageApproval.additional.statement.appraisal_result.product_regulations.conditions_other[index].conditions_other_detail = value
        : state.storageApproval.additional.approval_notice.product_regulations.conditions_other[index].conditions_other_detail = value
      }
      else if(field === 'conditions_after_disbursements') {
        tab === 'statement' ?
        state.storageApproval.additional.statement.appraisal_result.product_regulations.conditions_after_disbursements[index].conditions_after_disbursement_detail = value
        : state.storageApproval.additional.approval_notice.product_regulations.conditions_after_disbursements[index].conditions_after_disbursement_detail = value
      }
      else if(field === 'disbursement_conditions') {
        tab === 'statement' ?
          state.storageApproval.additional.statement.appraisal_result.product_regulations.disbursement_conditions[index].disbursement_conditions_detail = value
        : state.storageApproval.additional.approval_notice.product_regulations.disbursement_conditions[index].disbursement_conditions_detail = value
      }
    }
    else {
      (state.storageApproval.additional.statement.appraisal_result.product_regulations[field] as String) = value
    }
  },
  
  addConditions(state: Draft<ILOANNormalState>, action: PayloadAction<{tab: keyof ILoanNormalApprovalAdditionalAppraisal, field: ConditionsType}>){
    const { field, tab } = action.payload
    if(field === ConditionsType.Before) {
      tab === 'statement' ?
      state.storageApproval.additional.statement.appraisal_result?.product_regulations?.disbursement_conditions?.push({
        uuid:null,
        conditions_type: 'PRE_CON', 
        disbursement_conditions_detail: ""
      })
      : state.storageApproval.additional.approval_notice?.product_regulations?.disbursement_conditions?.push({
        uuid:null,
        conditions_type: 'PRE_CON', 
        disbursement_conditions_detail: ""
      })  
    }
    else if( field === ConditionsType.After) {
      tab === 'statement' ?
      state.storageApproval.additional.statement.appraisal_result?.product_regulations?.conditions_after_disbursements?.push({
        uuid:null,
        conditions_type: 'AFTER_CON',
        conditions_after_disbursement_detail: ""
      })
      : state.storageApproval.additional.approval_notice.product_regulations?.conditions_after_disbursements?.push({
        uuid:null,
        conditions_type: 'AFTER_CON',
        conditions_after_disbursement_detail: ""
      })  
    }
    else {
      tab === 'statement' ?
      state.storageApproval.additional.statement.appraisal_result?.product_regulations?.conditions_other?.push({
        uuid:null,
        conditions_type: 'OTHERS_CON',
        conditions_other_detail: ""})
      : state.storageApproval.additional.approval_notice?.product_regulations?.conditions_other?.push({
        uuid:null,
        conditions_type: 'OTHERS_CON',
        conditions_other_detail: ""})  
    } 
  },
  deleteCondition:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<boolean, string,{
      info : IConditionDeleteInfo
    }>) { },
    prepare(payload: boolean, meta:{
      info : IConditionDeleteInfo
    }){
      return { payload, meta };
    }
  },
  deleteLocalCondition:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IConditionDeleteInfo>){
      const { field, index, tab } = action.payload
      if(field === ConditionsType.Before) {
        tab === 'statement' ?
        state.storageApproval.additional.statement.appraisal_result.product_regulations.disbursement_conditions.splice(index,1)
        : state.storageApproval.additional.approval_notice.product_regulations.disbursement_conditions.splice(index,1)
      }
      else if( field === ConditionsType.After) {
        tab === 'statement' ?
        state.storageApproval.additional.statement.appraisal_result.product_regulations.conditions_after_disbursements.splice(index,1)
        : state.storageApproval.additional.approval_notice.product_regulations.conditions_after_disbursements.splice(index,1)
      }
      else {
        tab === 'statement' ?
        state.storageApproval.additional.statement.appraisal_result.product_regulations.conditions_other.splice(index,1)
        : state.storageApproval.additional.approval_notice.product_regulations.conditions_other.splice(index,1)
      }
    },
    prepare(payload: IConditionDeleteInfo) {
      return { payload };
    }
  },
  deleteConditionStoreFull(state: Draft<ILOANNormalState>, action: PayloadAction<IConditionDeleteInfo>){
    const { field, index, tab } = action.payload
    if(field === ConditionsType.Before) {
      tab === 'statement' ?
      state.storageApproval.full.data?.form.additional_appraisal.statement.appraisal_result.product_regulations.disbursement_conditions.splice(index,1)
      : state.storageApproval.full.data?.form?.additional_appraisal?.approval_notice?.product_regulations.disbursement_conditions.splice(index,1)
    }
    else if( field === ConditionsType.After) {
      tab === 'statement' ?
      state.storageApproval.full.data?.form.additional_appraisal.statement.appraisal_result.product_regulations.conditions_after_disbursements.splice(index,1)
      : state.storageApproval.full.data?.form?.additional_appraisal?.approval_notice?.product_regulations.conditions_after_disbursements.splice(index,1)
    }
    else {
      tab === 'statement' ?
      state.storageApproval.full.data?.form.additional_appraisal.statement.appraisal_result.product_regulations.conditions_other.splice(index,1)
      : state.storageApproval.full.data?.form?.additional_appraisal?.approval_notice?.product_regulations.conditions_other.splice(index,1)
    }
  },
  saveAAStatement(state: Draft<ILOANNormalState>){},
  saveAANotice(state: Draft<ILOANNormalState>){},
  saveAATemplate(state: Draft<ILOANNormalState>){},
  
  setAAValidate(state: Draft<ILOANNormalState>, action: PayloadAction<IAAValidate>) {
    state.storageApproval.additional.validate = action.payload;
  },
}
