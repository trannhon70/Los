import {
  CUSTOM_KEY_FILE,
  ILOANNormalStorageCICDocumentList,
} from '../storage/CIC';

export interface ICICDataAPI {
  main_search_objects: ICICMainObjectAPI;
  additional_lookup_objects: ICICAdditionalObjectAPI;
  summary_of_ratings: ICICSummaryAPI;
}

export interface ICICObjectAPI {
  [name: string]: IGroupCICState;
}
export interface ICICMainObjectAPI {
  main_object_total_amount: number;
  borrower: ICICMainObjectAPISingle;
  marriage: ICICMainObjectAPISingle;
  co_brw: ICICMainObjectAPIMulti;
  co_payer: ICICMainObjectAPIMulti;
}

export interface ICICAdditionalObjectAPI {
  additional_lookup_objects_total: number | null;
  law_rlt: ICICMainObjectAPIMulti;
  others: ICICMainObjectAPIMulti;
}

export interface ICICSummaryAPI {
  credit_core_info: ICICObjectAPI;
}
export interface ICICSinglePersonDataAPI {
  document_info_list: ICICDocumentInfoAPI[];
  person_detail: IPersonDetail;
}
export interface ICICMainObjectAPISingle extends ICICSinglePersonDataAPI {
  person_total_amount: number;
}
export interface ICICMainObjectAPIMulti {
  person_total_amount: number;
  person_data: ICICSinglePersonDataAPI[];
}
export interface ICICDocumentInfoAPI {
  document_type_id: number;
  document_type_code: string;
  document_type_name: string;
  display_order: number;
  document_list: ICICDocumentAPI[];
}
export interface ICICDocumentAPI {
  document_id: number;
  document_name: string;
  display_order: number;
  document_child_files: ICICDocumentChildFileAPI[];
}
export interface ICICDocumentChildFileAPI {
  uuid: string;
  name: string;
  content_type: string;
  created_by: string;
  created_by_name: string;
  updated_by: string;
  updated_by_name: string;
  display_order: number;
  created_at: number | null;
  updated_at: number | null;
  description?: string;
  custom_keys?: CUSTOM_KEY_FILE;
}
//State interface

export interface ILOANNormalApprovalStorageCICState {
  main: IObjectCICState;
  additional: IObjectCICState;
  summary: ISummaryCICState;
  activeObject: string;
  validate: ILOANNormalApprovalStorageCICStateValidate;
}

export interface ILOANNormalApprovalStorageCICStateValidate {
  valid: boolean;
  object?: string;
  group?: string;
  position?: string;
  cic?: string;
  type?: string;
  inst?: string;
  child?: string;
  agree?: string;
  field?: string;
  role?: string;
  message?: string;
}
export interface IObjectCICState {
  groupActive: string;
  totalAmount: number;
  data: IObjectCICStateData;
}
export interface IObjectCICStateData {
  [name: string]: IGroupCICState;
}

export interface IGroupCICState {
  totalAmount: number;
  position: string;
  data: IPersonCICStateData[];
}
export interface CustomKeyType {
  identity: string | undefined;
  identity_type?: string | undefined;
  credit: string | undefined;
}

export interface IPersonCICStateData {
  documentList: ILOANNormalStorageCICDocumentList[];
  detail: IPersonDetail;
}

export interface IAllObjectDocumentData {
  [key: string]: IPersonDocumentData[];
}

export interface IPersonDocumentData {
  uuid: string;
  total: number;
  data: ILOANNormalStorageCICDocumentList[];
}
export interface IPersonDetail {
  full_name: string;
  person_uuid: string;
  borrower_relationship_id?: string | null;
  total_loan: number;
  total_collateral: number;
  debit_group_highest: string;
  flexcube_day: number | null;
  cic_information: IPersonCICInfo[];
  evaluate: IPersonCICEvaluate;
}
export interface IPersonCICInfo {
  cic_information_id: string;
  cic_information_name: string;
  cic_information_code: string;
  debit_group_highest: string;
  cic_information_detail: IPersonCICInfoDetail;
  credit_score_infor: IPersonCICInfoCreditScore;
  uuid: string;
}
export interface IPersonCICInfoDetail {
  cic_normal_loan: IPersonCICInfoDetailLoan;
  cic_credit: IPersonCICInfoDetailCredit;
}
export interface IPersonCICInfoDetailLoan {
  collateral_value: number;
  date_of_latest_CIC_results: number | null;
  institution: ILoanInstition[];
}
export interface ILoanInstition {
  institution_id: string;
  institution_total: number;
  institution_avatar: string;
  institution_detail: ILoanInstitionDetail[];
  uuid: string;
}
export interface ILoanInstitionDetail {
  institution_detail_id: string;
  monthly_loan_term: string;
  credit_grant_amount: number;
  actual_balance_converted: number;
  group_debt: string;
  credit_agreement: ILoanInstitionDetailAgree[];
}
export interface ILoanInstitionDetailAgree {
  uuid: string;
  credit_agreement_name: string;
  monthly_loan_term: string;
  credit_grant_amount: number | null;
  actual_balance_converted: number | null;
  group_debt: string;
  collateral_id: string;
  collateral_value: number | null;
  monthly_debt_payment_obligation: number | null;
  settlement_before_disbursement: boolean;
  isEdit?: boolean;
}

export interface INormalAgreementPosition {
  cic: string;
  inst: string;
  child: string;
  agree: string;
  field: keyof ILoanInstitionDetailAgree;
  value?: string;
  isEdit?: boolean;
}
export interface INormalAgreementSwitchPosition {
  cic: string;
  inst: string;
  child: string;
  agree: string;
  value: boolean;
}
export interface INormalAgreementDeletePosition {
  cic: string;
  inst: string;
  child: string;
  agree: string;
  uuid: string;
}

export interface ICardAgreementPosition {
  cic: string;
  inst: string;
  child: string;
  field: string;
  value?: string;
}
export interface ICardPosition {
  cic: string;
  field: string;
  value?: string;
}

export interface IPersonCICInfoDetailCredit {
  collateral_value: number;
  date_of_latest_CIC_results: number | null;
  institution: ICreditInstitution[];
  highest_outstanding_balance_last_12_months: ICreditInstitutionDetailLast12;
  credit_card_obligations: number;
  note: string;
}
export interface ICreditInstitution {
  institution_code?: string;
  institution_id: string;
  institution_total: number;
  institution_avatar: string;
  institution_detail: ICreditInstitutionDetail[];
  uuid: string;
}
export interface ICreditInstitutionDetail {
  monthly_loan_term: string;
  institution_detail_id: string;
  credit_grant_amount: number;
  actual_balance_converted: number;
  group_debt: string;
  uuid: string;
  collateral_name: string;
}
export interface ICreditInstitutionDetailLast12 {
  credit_grant_amount: number;
}
export interface IPersonCICInfoCreditScore {
  risk_info: IPersonCICInfoCreditScoreRiskInfo;
}
export interface IPersonCICInfoCreditScoreRiskInfo {
  score_value: string | null;
  score_rank: string;
  publish_date: string | null;
  evaluation: number;
  customer_segment: IPersonCICInfoCreditScoreRiskInfoSegment[];
}
export interface IPersonCICInfoCreditScoreRiskInfoSegment {
  id: string;
  name: string;
}
export interface IPersonCICEvaluate {
  history_credit_relation_satisfy_product_rules: string;
  note: string;
  created_by: string;
  created_at: number;
}
export interface ISummaryCICState {
  info: ICICObjectAPI;
  groupActive: string;
}
