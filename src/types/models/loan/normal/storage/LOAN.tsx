import { IIdCodeName } from 'types/base';
import { IDistrict, IProvince, IWard } from 'types/models/master-data/state';


export interface ILOANNormalStorageLoanValidate{
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
}

export interface ILOANNormalStorageLOANProduct{

  loanType: string;
  productPurpose: string;
  corePurpose: string;
  realPurpose: string;
}

export interface ILOANNormalStorageLOANNeedAndPlan{
  currency: string;
  need: number | null;
  ownCaptital: number | null;
  method: string;
  expiredCredit: number | null;
  expiredWithdraw: number | null;
  graceOrigin: number | null;
  interestRate: number | null;
  periodAdjust: string;
  marginAdjust: number | null;
  disbursementMethod: string;
  repayOriginMethod: string;
  repayinterestMethod: string;
  amountPaidEachPeriod: number | null;
  loanAmount: number | null;
  scb_percentage: number | null;
  document_info_list:ILOANNormalDocumentInfoList[]
}
export interface ILOANNormalDocumentInfoList extends Omit<IResLOANNormalDocumentInfo, "document_group">{
  uuid:string|null;
  document_group: ILOANNormalDocumentGroup[];
}
export interface ILOANNormalDocumentGroup extends Omit<IResLOANNormalDocumentGroup, "child_files">{
  uuid:string | null;
  child_files:   ILOANNormalChildfile[] | null;
}
export interface ILOANNormalChildfile extends IResLOANNormalRESChildFile{
  file_upload:string | null;
}
export interface ILOANNormalStorageLOANLegalBusinessStore{
  area: number | null;
  apartment: string;
  province: string;
  district: string;
  ward: string;
  primary: boolean;
  uuid: string;
}

export interface ILOANNormalStorageLOANLegalBusiness{
  name: string;
  type: string;
  num: string;
  issuedDate: number | null;
  placeOfIssued: string;
  numOfYear: number | null;
  code: string;
  career: string;
  area: number | null;
  ownership: string;
  remainLease: number | null;
  rentPrice: number | null;
  apartment: string;
  province: string;
  district: string;
  ward: string;
  stores: ILOANNormalStorageLOANLegalBusinessStore[];
}

export interface ILOANNormalStorageLOANFinanceMetadataValue{
  T2: number | null;
  T1: number | null;
  T: number | null;
  KH: number | null;
  NVKD: number | null;
}

export interface ILOANNormalStorageLOANFinanceMetadataRow{
  id: number;
  data: ILOANNormalStorageLOANFinanceMetadataValue;
  child: ILOANNormalStorageLOANFinanceMetadataRow[];
}

export interface ILOANNormalStorageLOANInOutInfo{
  info: string;
  payment: string;
  method: string;
  primary: boolean;
  uuid: string;
}

export interface ILOANNormalStorageLOANInOut{
  suppliers: ILOANNormalStorageLOANInOutInfo[];
  supplyData: ILOANNormalStorageLOANFinanceMetadataValue;
  purchasingData: ILOANNormalStorageLOANFinanceMetadataValue;
  purchasingPartner: ILOANNormalStorageLOANInOutInfo[];
  note: string;
  suggest: string;
}
export interface ILOANNormalStorageLOANFinanceE{
  loan_appraised_analysis_info:string
  loan_evaluate_info:string
  loan_comment:string
}
export interface ILOANNormalStorageLOANFinanceMetadata{
  A: ILOANNormalStorageLOANFinanceMetadataRow[];
  B: ILOANNormalStorageLOANFinanceMetadataRow[];
  C: ILOANNormalStorageLOANInOut;
  D: ILOANNormalStorageLOANFinanceMetadataRow[];
  E: ILOANNormalStorageLOANFinanceE;
}

export interface ILOANNormalStorageLOANState{
  product: ILOANNormalStorageLOANProduct;
  needAndPlan: ILOANNormalStorageLOANNeedAndPlan;
  legalBusiness: ILOANNormalStorageLOANLegalBusiness;
  finance: ILOANNormalStorageLOANFinanceMetadata;
  validate: ILOANNormalStorageLoanValidate;
}
///////////////////////////////////////

export interface ILOANNormalLOANForm {
  id: string;
  name: string;
  data: ILOANData;
}

export interface ILOANData {
  product_loan_program_info: IProductLoanProgramInfo;
  capital_need_loan_plan_info: ICapitalNeedLoanPlanInfo;
  operation_business: IOperationBusiness;
}

export interface IOperationBusiness {
  business_household_info: IBusinessHouseholdInfo;
  financial_analysis_info: IFinancialAnalysisInfo;
}

export interface IFinancialAnalysisInfo {
  business_result_list: IBusinessResultList[];
  asset_balance_capital_list: IBusinessResultList[];
  business_finance_cash_flow_info: IBusinessFinanceCashflowInfo;
  credit_limit_info: IBusinessResultList[];
  analysis_evaluate_info: IAnalysisealuateInfo;
}

export interface IAnalysisealuateInfo {
  appraised_analysis_info: IIdCodeName;
  evaluate_info: IIdCodeName;
  comment: string;
}

export interface IBusinessFinanceCashflowInfo {
  cash_flow_info: ILoanCashflowInfo;
  general_comment: string;
  general_offer: string;
}

export interface ILoanCashflowInfo {
  input_info: OutInputInfo;
  output_info: OutInputInfo;
}

export interface OutInputInfo {
  category_info: IIdCodeName;
  timeline_info: IFinanceMetadataItemInfo[];
  vendor_info: ILoanCashflowVendorInfo[];
}

export interface ILoanCashflowVendorInfo {
  name: string;
  exchange_method_info: IIdCodeName;
  payment_method_info: IIdCodeName;
  primary_flag: boolean;
}

export interface IBusinessResultList {
  finance_metadata_id: number;
  finance_metadata_name: string;
  finance_metadata_item_info: IFinanceMetadataItemInfo[];
}

export interface IFinanceMetadataItemInfo {
  timeline_assign_info: ITimelineAssignInfo;
  timeline_assign_value: number | null;
}

export interface ITimelineAssignValue {
  id: string;
  name: string;
  value: number | null;
}

export interface ITimelineAssignInfo {
  id: number;
  name: string;
}

export interface IBusinessHouseholdInfo {
  basic_info: IBasicInfo;
  business_info: IBusinessInfo;
  warehouse_info: IWarehouseInfo[];
}

export interface IWarehouseInfo {
  warehouse_area: number;
  address_info: IAddressInfo;
  primary_flag: boolean;
}

export interface IBusinessInfo {
  business_premises_area: number;
  owner_property_info: IIdCodeName;
  remaining_rental_period: number;
  rental_cost: number;
  address_info: IAddressInfo;
}

export interface IAddressInfo {
  address: string;
  province_info: IProvince;
  district_info: IDistrict;
  ward_info: IWard;
}


export interface IBasicInfo {
  business_household_name: string;
  business_license_type_info: IIdCodeName;
  business_card_num: string;
  business_card_issue_date: string;
  business_card_place_of_issue: string;
  business_working_year_num: number;
  business_main_info: IIdCodeName;
  business_actual: string;
}

export interface ICapitalNeedLoanPlanInfo {
  currency_info: ICurrencyInfo;
  total_capital_requirements: number;
  owner_capital: number;
  loan_amount: number;
  credit_granting_method_info: IIdCodeName;
  credit_request_period: number;
  withdraw_month_term: number;
  principal_grace_period: number;
  scb_finance_percentage: number;
  interest_rate: number;
  interest_rate_adapt_period_info: IIdCodeName;
  interest_rate_amplitude: number;
  disbursement_method_info: IIdCodeName;
  principal_payment_method_info: IIdCodeName;
  interest_payment_method_info: IIdCodeName;
  principal_payment_period_amount: number;
  total_document_file: number;
  document_info_list: IResLOANNormalDocumentInfo[];
}

export interface IResLOANNormalDocumentInfo {
  document_id:    string | number | null;
  document_name:  string | null;
  document_group: IResLOANNormalDocumentGroup[] | null;
}

export interface IResLOANNormalDocumentGroup {
  document_id:   string | number | null;
  document_name: string | null;
  child_files:   IResLOANNormalRESChildFile[] | null;
}

export interface IResLOANNormalRESChildFile {
  created_at:   number | null;
  created_by: string,
  created_by_name: string,
  updated_by: string,
  updated_by_name: string,
  updated_at:   number | null;
  type:         number | null;
  uuid:         string | null;
  name:         string | null;
  content_type: string | null;
  size:         number | null;
  version:      number | null;
  description?:string | null;
  custom_keys?: CUSTOM_KEY_FILE | null;
}


export interface INameValue {
  name: string;
  value: number;
}

export interface ICurrencyInfo {
  currency_code: string;
  currency_name: string;
}

export interface IProductLoanProgramInfo {
  loan_product_info: ILoanProductInfo;
  loan_program_info: ILoanProgramInfo;
}

export interface ILoanProgramInfo {
  loan_term_info: ILoanTermInfo;
  loan_purpose_info: ILoanPurposeInfo;
  fcc_loan_purpose_info: IFccLoanPurposeInfo;
  actual_purpose_using_loan: string;
}

// export interface IFccLoanPurposeInfo {
//   fcc_loan_purpose_id: string;
//   fcc_loan_purpose_code: string;
//   fcc_loan_purpose_name: string;
// }
export interface IFccLoanPurposeInfo {
  id: string;
  code: string;
  name: string;
  is_default?: string
}
// export interface ILoanPurposeInfo {
//   product_purpose_id: string;
//   product_purpose_code: string;
//   product_purpose_name: string;
// }
export interface ILoanPurposeInfo {
  id: string;
  code: string;
  name: string;
  is_default?: string
}
// export interface ILoanTermInfo {
//   loan_term_type_id: string;
//   loan_term_type_code: string;
//   loan_term_type_name: string;
// }
export interface ILoanTermInfo {
    id: string;
    code: string;
    name: string;
    is_default?: string
  }
export interface ILoanProductInfo {
  loan_product_category_info: ILoanProductCategoryInfo;
  loan_product_type_info: ILoanProductTypeInfo;
  loan_product_detail_info: ILoanProductDetailInfo;
}

export interface ILoanProductDetailInfo {
  product_detail_id: string;
  product_detail_code: string;
  product_detail_name: string;
}

export interface ILoanProductTypeInfo {
  product_type_id: string;
  product_type_code: string;
  product_type_name: string;
}

export interface ILoanProductCategoryInfo {
  product_category_id: string;
  product_category_code: string;
  product_category_name: string;
}

export interface ILOANNormalLOANUpload{
  declare: string;
  uuid: string;
  dataFile: ILOANNormalDocumentInfoList[],
  isDelete?: boolean
}
export interface CUSTOM_KEY_FILE{
  parent_id:string | number | null;
  doc_id:string | number | null;
  local_id:string;
  description?:string;
}
