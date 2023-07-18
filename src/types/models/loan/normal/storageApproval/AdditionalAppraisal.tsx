
export interface IAAValidate {
  valid: boolean,
  tab?:string,
  statement?:string,
  result?:string,
  regulations?:string,
  index?:number,
  field?:string,
  role?:string,
  message?: string,
}
export enum ConditionsType {
  Before = 'disbursement_conditions',
  After = 'conditions_after_disbursements',
  Other = 'conditions_other',
}
export interface IAdditionalDataAPI {
  statement: IAAStatement,
  approval_notice: IAAApprovalNotice | null,
}
export interface ILoanNormalApprovalAdditionalAppraisal {
  statement: IAAStatement,
  approval_notice: IAAApprovalNotice,
  validate: IAAValidate
}
export interface IAAStatement {
  statement_info: IAAStatementInfo,
  legal_due_diligence: IAALegal,
  exception_validation: IAAException,
  phone_number_appraisals: IAAPhoneNumber[],
  appraisal_result: IAAResult,
}
export interface IAAStatementInfo {
  number_credit_approval: string,
  statement_export_time: number | null,
  number_business_unit: string,
  business_unit_export_time: number | null,
  branch_name: string,
  business_unit_name: string,
  business_unit_code: string
}
export interface IAALegal {
  legal_file_review: string,
  note: string
}
export interface IAAException {
  exception_code: string,
  business_unit_premises: string,
  staff_reviews: string
}
export interface IAAPhoneNumber {
  uuid: string | null,
  phone_number: string,
  result: string,
  note: string
}
export interface IAAResult {
  option: string | null,
  appraisal_staff_proposal: IAAStaffProposal,
  credit_grant_information: IAACreditInfo,
  product_regulations: IAAProductRegulations,
  // opinion_control_levels: IAAOpinionControlLevel[],
  // opinion_level_approval: IAAOpinionApprovalLevel,
}
export interface IConditionDeleteInfo {
  tab: keyof ILoanNormalApprovalAdditionalAppraisal ,
  field: ConditionsType, 
  index: number, 
  uuid: string | null
}
export interface IPhoneDeleteInfo {
  index: number,
  uuid: string | null
}
export interface IAAStaffProposal {
  credit_grant_status: string,
  loan_amount: number,
  loan_term: number,
  another_idea: string,
  reason_for_refusal_code: string,
  reason: string,
  proposal:string,
}
export interface IAACreditInfo {
  total_credit_limit: number,
  loan_balance_collateral_propose: number,
  loan_balance_no_collateral_propose: number,
  loan_balance_collateral_exist: number,
  loan_balance_no_collateral_exist: number,
  credit_info: number,
  hide_information_flag: boolean
}
export interface IAAProductRegulations {
  addendum: string,
  notification: string,
  disbursement_conditions: IAAPreDisbursementConditions[],
  conditions_after_disbursements: IAAAfterDisbursementConditions[],
  conditions_other: IAAOtherDisbursementConditions[],
}
export interface IAAPreDisbursementConditions {
  uuid: string | null ,
  conditions_type: string,
  disbursement_conditions_detail: string
}
export interface IAAAfterDisbursementConditions {
  uuid: string | null ,
  conditions_type: string,
  conditions_after_disbursement_detail: string
}
export interface IAAOtherDisbursementConditions {
  uuid: string | null ,
  conditions_type: string,
  conditions_other_detail: string
}
export interface IAAOffer {
  credit_grant_status: boolean,
  loan_amount: number,
  loan_term: string,
  another_idea: string
}
export interface IAAApprovalNotice {
  basic_info: IAANoticeBasicInfo,
  credit_grant_information: IAANoticeCreditInfo,
  product_regulations: IAANoticeProductsRegulations,
  opinion: IAANoticeOpinion,
}
export interface IAANoticeBasicInfo {
  number_approval_notice: string,
  notice_export_time: number,
  announcement_title: string
}
export interface IAANoticeCreditInfo {
  loan_amount: number,
  loan_amount_in_words: string,
  total: number
}
export interface IAANoticeProductsRegulations {
  disbursement_conditions: IAAPreDisbursementConditions[],
  conditions_after_disbursements: IAAAfterDisbursementConditions[],
  conditions_other: IAAOtherDisbursementConditions[],
}
export interface IAANoticeOpinion {
  appraisal_staff: IAANoticeOpinionPerson,
  approval_level: IAANoticeOpinionPerson,
  position_signing_notice: string,
  offer: string,
  reason: string
}
export interface IAANoticeOpinionPerson {
  id: string,
  name: string
}