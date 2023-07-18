import { IIdCodeName } from "types";
import { ICode, IIdName, IValue } from "types/base";


/////interface UI
export interface ILOANNormalStorageLegalInfoCustom{
  [name: string]: ICICNormalStorageLegalCustom;
}

export interface ICICNormalStorageLegalCustom{
  data: ICICNormalStorageLegalCustomDetail[];
}
export interface ICICNormalStorageLegalCustomDetail {
  uuid: string;
  full_name:string;
  identity_info:ICICNormalStorageLegalIdentityCustom[];
}
export interface ICICNormalStorageLegalIdentityCustom {
  type: string;
  num: string;
  issuedDate: number | null;
  expiredDate: number | null;
  placeOfIssue: string;
  primaryFlag: boolean;
  uuid: string;
  uuidRemote: string;
}
export interface ICICNormalStorageCICValidate {
  valid: boolean;
  organ?: string;
  declare?: string;
  position?: string;
  identity?:string;
  credit?:string; 
  card?:string,
  loan?:string,
  collateral?:string,
  key?:string;
  field?: string;
  role?: string;
  message?: string;
}
export interface ILOANNormalStorageCICScore {
  risk_info: ILOANNormalRiskInfo
}
export interface ILOANNormalRiskInfo {
  score_value: number | null;
  score_rank: string | null,
  publish_date: number | null,
  evaluation: number | null,
  customer_segment: string[]
}
///// ux nwe
///// ux nwe

export interface ILOANNormalCICPosition {
  organ: keyof ILOANNormalStorageCICOther,
  declare?: keyof ILOANNormalStorageCICOrgan,
  personUuid?: string,
  identityNum?: string,
  creditUuid?: string,
  loanActive?: string,
  cardUUID?: string,
  collateralUUID?: string,
}
export interface ILOANNormalAllCreditDeleteInfo {
  organ: keyof ILOANNormalStorageCICOther,
  declare: string,
  personUuid : string,
  identityNum: string,
}
export interface ILOANNormalCreditDeleteInfo {
  organ: keyof ILOANNormalStorageCICOther,
  declare: string,
  personUuid : string,
  identityNum: string,
  creditUuid: string,
  creditId: number | null,
  index: number, 
  position: string
}
export interface ILOANNormalCreditDetailDeleteInfo extends ILOANNormalCreditDeleteInfo{
  type: keyof ILOANNormalStorageCICCreditDetailGroup,
  detailUuid: string | null
}

export interface ILOANNormalStorageCICState extends ILOANNormalStorageCICOther {
  validate: ICICNormalStorageCICValidate
  rating: string;
  activeOrgan: string;
}
export interface ILOANNormalStorageCICOther {
  other: ILOANNormalStorageCICOrgan;
  scb: ILOANNormalStorageCICOrgan;
  summary: ILOANNormalStorageCICOrgan
}

export interface ILOANNormalStorageCICOrganData{
  [name: string]: ILOANNormalStorageCICDeclare;
}
export interface ILOANNormalStorageCICOrgan {
  declareActive: string;
  data: ILOANNormalStorageCICOrganData
}

export interface ILOANNormalStorageCICDeclare {
  // identityActive: string;
  position: string;
  data: ILOANNormalStorageCICDeclareData[];
}


export interface ILOANNormalStorageCICDeclareData{
  identityActive: string;
  person_uuid: string;
  full_name: string;
  data: ILOANNormalStorageCICDeclareDataDetail[];
  document_info_list: ILOANNormalStorageCICDocumentList[];
}

export interface ILOANNormalStorageCICDocumentList{
  display_order: number;
  document_type_code: string;
  document_list: ILOANNormalStorageCICDocumentListDetail[];
  isLocal?:boolean;
  customKey?: CustomKeyType;
  uuid?:string;
}

export interface ILOANNormalStorageCICDocumentListDetail{
  document_code: string | number;
  display_order: number;
  document_child_files: ILOANNormalStorageCICDocumentChildFile[];
  document_child_list: ILOANNormalStorageCICDocumentChildList[];
  document_id: number | string;
  document_name?:string;
  uuid?:string;
}

export interface ILOANNormalStorageCICDocumentChildList{
  uuidActiveFile: string;
  document_child_id: number;
  document_child_name: string;
  display_order: number;
  document_child_files: ILOANNormalStorageCICDocumentChildFile[];
}

export interface CUSTOM_KEY_FILE {
  idDoc:string,
  idDocChild:string,
  local_id:string,
  description?:string,
  credit?: string; 
  identity?: string; 
  identity_type?:string
};
export interface ILOANNormalStorageCICDocumentChildFile{
  file_id: number | null;
  uuid: string;
  display_order: number | null;
  name: string;
  description: string;
  content_type: string;
  created_by: string,
  created_by_name: string,
  updated_by: string,
  updated_by_name: string,
  created_at: number | null;
  updated_at: number | null;
  file_upload: string;
  custom_keys?:CUSTOM_KEY_FILE;
  isLocal?:boolean;
  size?: number | null
}

export interface ILOANNormalCICUpload{
  declare: string;
  uuid: string;
  position: string,
  dataFile: ILOANNormalStorageCICDocumentList[],
  type: string
}
export interface CICUpload{
  indexGroup: number;
  indexType: number;
  indexFile: number;
  isLocal: boolean;
}

export interface ILOANNormalStorageCICDeclareDataDetail {
  hasCredit: boolean | null,
  identity_num: string; /// identity_num
  identity_type: string;
  debtGroup: string;
  uuidRemote: string;
  uuid: string; ///uuid identity
  activeCredit: string;
  is_primary: boolean,
  totalLoan: number | null;
  totalCollateral:  number | null;
  credit: ILOANNormalStorageIdentityData[];
  credit_score_info: ICreditScoreInfo;
}

export interface ILOANNormalStorageIdentityData {
  id: number | null,
  uuid: string;
  uuidRemote: string;
  code: string;
  detail: ILOANNormalStorageCICCreditDetailGroup;
}

export interface ILOANNormalStorageCICCreditDetailGroup {
  loan: ILOANNormalStorageCICCreditDetail<ILOANNormalStorageCICCreditBasicLOAN>;
  card: ILOANNormalStorageCICCreditDetail<ILOANNormalStorageCICCreditBasicCard>;
  collateral: ILOANNormalStorageCICCreditDetail<ICode & IValue<number | null> & { uuid: string }>;
}
export interface ILOANNormalStorageCICCreditDetail<T> {
  last_update: number | null;
  date: number | null;
  active: string;
  total_amount: number | null;
  list: T[];
}

export interface ILOANNormalStorageCICCreditBasicLOAN extends ICode {
  expired: number | null;
  amount: number | null;
  balance: number | null;
  amountCIC: number | null;
  balanceCIC: number | null;
  note: string | null;
  uuid: string | null;
}

export interface ILOANNormalStorageCICCreditBasicCard {
  uuid: string;
  uuidRemote: string;
  limited: number | null;
  balance: number | null;
  limitedCIC: number | null;
  balanceCIC: number | null;
  note: string | null
}

export interface ICreditScoreInfo {
  risk_info: IRiskInfo;
}
export interface IRiskInfo {
  score_value: number | null;
  score_rank: string;
  publish_date: number | null;
  evaluation: string | null;
  customer_segment: string[];
}

export interface ICICIdentityDetailState {
  cic_credit_loan_info: ICICCreditLOANState;
  cic_credit_card_info: ICICCreditCardState;
  cic_credit_collateral_info: ICICCreditCollateralState;
}

export interface ICICCreditLOANState {
  activeLoanTerm: number;
  cic_credit_loan_total_amount: string;
  cic_credit_loan_updated_date: number | null;
  cic_credit_loan_last_updated_date: number | null;
  cic_credit_loan_term_info: ICICLOANTermState[];
}

export interface ICICLOANTermState {
  cic_loan_term_item_code: string;
  cic_loan_term_item_name: string;
  cic_loan_term_credit_monthly_duration: string;
  cic_loan_term_credit_grant_amount: string;
  cic_loan_term_credit_balance: string;
}

export interface ICICCreditCardState {
  activeCreditCard: number;
  cic_credit_card_total_amount: string;
  cic_credit_card_updated_date: number | null;
  cic_credit_card_last_updated_date: number | null;
  cic_credit_card_detail_info: ICICCreditCardDetailState[];
}

export interface ICICCreditCardDetailState {
  uuid: string;
  cic_credit_card_detail_item_code: string;
  cic_credit_card_detail_item_name: string;
  cic_credit_card_detail_limit: string;
  cic_credit_card_detail_balance: string;
  
}

export interface ICICCreditCollateralState {
  cic_credit_collateral_total_amount: string;
  cic_credit_collateral_updated_date: number | null;
  cic_credit_collateral_last_updated_date: number | null;
  cic_credit_collateral_detail_info: ICICCreditCollateralDetailState[];
}

export interface ICICCreditCollateralDetailState {
  uuid: string;
  cic_credit_collateral_detail_item_code: string;
  cic_credit_collateral_detail_item_name: string;
  cic_credit_collateral_detail_category_info: string;
  cic_credit_collateral_detail_value: string;
}

export interface DataFile {
  uuid: string;
  display_order: number;
  create_at: number | null;
  type: string;
  name: string;
  lastModified: number;
  size: number | null;
  file_upload: string | null;
  is_update: boolean;
}
///////////////////////////////////////
///////////inetrface API

export interface ICICTotal{
  data: ICICDataAPI
}

export interface ICICDataAPI {
  other_credit_institution: ICICOrganAPI;
  current_credit_institution: ICICOrganAPI;
}

export interface ICICOrganAPI{
  borrower: ICICDeclareMultiAPI<ICICDeclareDataAPI>;
  marriage: ICICDeclareMultiAPI<ICICDeclareDataAPI>;
  co_brw: ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
  co_payer: ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
  law_rlt: ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
  others: ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
}

// export interface ICICDeclareAPI{
//   id: string;
//   name: null;
//   data: ICICDeclareDataAPI;
// }
export interface ICICDeclareMultiAPI<T>{
  id: string;
  name: null;
  data:T,
}
// export interface ICICDeclareMultiAPI{
//   id: string;
//   name: null;
//   data: ICICDeclareDataAPI[];
// }

export interface ICICDeclareDataAPI {
  full_name: string;
  person_uuid: string;
  cic_identity_info: ICICIdentityAPI[];
  document_info_list: ICICDocumentInfoAPI[];
}

export interface CustomKeyType {
  identity: string | undefined;
  identity_type?:string | undefined;
  credit: string | undefined;
}

export interface ICICDocumentInfoAPI{
  document_type_id: number;
  document_type_code: string;
  document_type_name: string;
  display_order: number;
  document_list: ICICDocumentAPI[];
  customKey?: CustomKeyType;
}

export interface ICICDocumentAPI {
  document_id: number;
  document_name: string;
  display_order: number;
  document_child_list: ICICDocumentChildListAPI[];
  document_child_files: ICICDocumentChildFileAPI[];
}

export interface ICICDocumentChildListAPI {
  document_child_id	:	number,
  document_child_name	:	string,
  display_order	:	number,
  document_child_files: ICICDocumentChildFileAPI[];
}

export interface ICICDocumentChildFileAPI {
  uuid: string;
  name: string;
  content_type: string;
  display_order: number;
  created_at: number | null;
  updated_at: number | null;
  created_by: string,
  created_by_name: string,
  updated_by: string,
  updated_by_name: string,
  description?:string;
  custom_keys?:CUSTOM_KEY_FILE;
}

export interface ICICIdentityAPI {
  cic_institution_flag: boolean | null,
  identity_type: string;
  identity_num: string;
  uuid:string;
  cic_identity_total_loan_amount: ICICAmountAPI;
  cic_identity_total_collateral_amount: ICICAmountAPI;
  cic_identity_debt_group: IIdCodeName;
  credit_score_info: ICreditScoreInfoAPI;
  cic_identity_credit_institution_info: ICICCreditInstitutionAPI[];
}

export interface ICreditScoreInfoAPI {
  risk_info: IRiskInfoAPI;
}
export interface IRiskInfoAPI {
  score_value: number | null;
  score_rank: string;
  publish_date: number | null;
  evaluation: string | null;
  customer_segment: IIdName[];
}

export interface ICICAmountAPI {
  id: string | null;
  value: number;
}
export interface ICICCreditInstitutionAPI {
  uuid: string;
  credit_institution_short_name: string;
  credit_institution_id: number | null;
  credit_institution_code: string;
  credit_institution_name: string;
  credit_institution_avatar: string;
  cic_identity_detail_info: ICICIdentityDetailAPI;
}

export interface ICICIdentityDetailAPI {
  cic_credit_loan_info: ICICCreditLOANAPI;
  cic_credit_card_info: ICICCreditCardAPI;
  cic_credit_collateral_info: ICICCreditCollateralAPI;
}

export interface ICICCreditLOANAPI {
  cic_credit_loan_total_amount: ICICAmountAPI;
  cic_credit_loan_updated_date: number | null;
  cic_credit_loan_term_info: ICICLOANTermAPI[];
}

export interface ICICLOANTermAPI {
  uuid: string;
  cic_loan_term_item_code: string;
  cic_loan_term_item_name: string;
  cic_loan_term_credit_monthly_duration: ICICAmountAPI;
  cic_loan_term_credit_grant_amount: ICICAmountAPI;
  cic_loan_term_credit_balance: ICICAmountAPI;
  cic_loan_term_debit: number,
  cic_loan_term_credit_limit: number,
  note: string | null
}

export interface ICICCreditCardAPI {
  cic_credit_card_total_amount: ICICAmountAPI;
  cic_credit_card_updated_date: number | null;
  cic_credit_card_detail_info: ICICCreditCardDetailAPI[];
}

export interface ICICCreditCardDetailAPI {
  uuid: string;
  cic_credit_card_detail_item_code: string;
  cic_credit_card_detail_item_name: string;
  cic_credit_card_detail_limit: ICICAmountAPI;
  cic_credit_card_detail_balance: ICICAmountAPI;
  cic_credit_card_debit: number,
  cic_credit_card_limit: number,
  note: string | null
}

export interface ICICCreditCollateralAPI {
  cic_credit_collateral_total_amount: ICICAmountAPI;
  cic_credit_collateral_updated_date: number | null;
  cic_credit_collateral_detail_info: ICICCreditCollateralDetailAPI[];
}

export interface ICICCreditCollateralDetailAPI {
  uuid: string;
  cic_credit_collateral_detail_item_code: string;
  cic_credit_collateral_detail_item_name: string;
  cic_credit_collateral_detail_category_info: IIdCodeName;
  cic_credit_collateral_detail_value: ICICAmountAPI;
}








//////////////interface post UX
export interface ICICData {
  id: string;
  name: string
  data: ICICTabs;
}

export interface ICICTabList {
  id: string;
  name: string;
  person_list: ICICPerson[];
}
export interface ICICTabs {
  tab_list: ICICTabList[]
}

export interface ICICPerson {
  id: string;
  name: string;
  data: ICICPersonData[];
}

export interface ICICPersonData {
  person_uuid: string;
  full_name: string;
  total_loan_amount: ICICAmount;
  total_collateral_amount: ICICAmount;
  highest_debt_group: ICICDebtGroup;
  cic_identity_info: ICICIdentity[];
  total_document_file: number;
  document_info_list: [];
}

export interface ICICIdentityType {
  code: string;
  id: string;
  is_default: string;
  name: string;
}

export interface ICICAmount {
  id: string | null;
  value: number;
}

export interface ICICDebtGroup {
  debt_group_code: string;
  debt_group_name: string;
}

export interface ICICIdentity {
  is_selected?: boolean;
  uuid: string | null;
  identity_type: string;
  identity_num: string;
  cic_identity_total_loan_amount: ICICAmount;
  cic_identity_total_collateral_amount: ICICAmount;
  cic_identity_debt_group: ICICDebtGroup;
  highest_outstanding_balance_last_12_month: ICICAmount;
  cic_identity_credit_card_obligations: ICICAmount;
  cic_identity_note: string;
  cic_identity_credit_institution_info: ICICCreditInstitution[];
}

export interface ICICCreditInstitution {
  uuid: string;
  localUUID: string;
  credit_institution_short_name: string;
  credit_institution_id: string;
  credit_institution_code: string;
  credit_institution_name: string;
  credit_institution_avatar: string;
  cic_identity_detail_info: ICICIdentityDetail;
}

export interface ICICIdentityDetail {
  cic_credit_loan_info: ICICCreditLOAN;
  cic_credit_card_info: ICICCreditCard;
  cic_credit_collateral_info: ICICCreditCollateral;
}

export interface ICICCreditLOAN {
  activeLoanTerm: number;
  cic_credit_loan_total_amount: ICICAmount;
  cic_credit_loan_updated_date: number | null;
  cic_credit_loan_last_updated_date: number | null;
  cic_credit_loan_term_info: ICICLOANTerm[];
}

export interface ICICLOANTerm {
  cic_loan_term_item_code: string;
  cic_loan_term_item_name: string;
  cic_loan_term_credit_monthly_duration: ICICAmount;
  cic_loan_term_credit_grant_amount: ICICAmount;
  cic_loan_term_credit_balance: ICICAmount;
}

export interface ICICCreditCard {
  cic_credit_card_total_amount: ICICAmount;
  cic_credit_card_updated_date: number | null;
  cic_credit_card_last_updated_date: number | null;
  cic_credit_card_detail_info: ICICCreditCardDetail[];
}

export interface ICICCreditCardDetail {
  uuid: string;
  cic_credit_card_detail_item_code: string;
  cic_credit_card_detail_item_name: string;
  cic_credit_card_detail_limit: ICICAmount;
  cic_credit_card_detail_balance: ICICAmount;
}

export interface ICICCreditCollateral {
  cic_credit_collateral_total_amount: ICICAmount;
  cic_credit_collateral_updated_date: number | null;
  cic_credit_collateral_last_updated_date: number | null;
  cic_credit_collateral_detail_info: ICICCreditCollateralDetail[];
}

export interface ICICCreditCollateralDetail {
  uuid: string;
  cic_credit_collateral_detail_item_code: string;
  cic_credit_collateral_detail_item_name: string;
  cic_credit_collateral_detail_category_info: ICICCreditCollateralDetailCategory;
  cic_credit_collateral_detail_value: ICICAmount;
}

export interface ICICCreditCollateralDetailCategory {
  collateral_category_code: string;
  collateral_category_name: string;
}
export interface ICICBasicInfo {
  id: string | null;
  uuid: string | null;
  avatar: string | null
  fullname: string
  identity: string
  totalDebt: string
  totalValueOfCollateral: string
  hightDebtGroup: string
  creditFinanceCode: string
  creditFinanceName: string
}
export interface ICICOrdinaryInfo {
  updatedDate?: string;
  lastUpdatedDate?: string;
  monthlyDuration?: string;
  grantAmount?: string;
  creditBalance?: string;
}

export interface ICollateralInfo {
  updatedDate?: string;
  lastUpdatedDate?: string;
  collateralValue?: string;
}
export interface ICreditInfo {
  updatedDate?: string;
  lastUpdatedDate?: string;
  creditLimit?: string;
  creditBalance?: string;
}

export interface ICICPayload {
  losUuid: string;
  credit_institution: string;
  person_type: string;
  person_uuid: string;
  body?: string
}

export interface ICICOrganCompleteCheck {
  other :  ICICDeclareCompleteCheck,
  scb: ICICDeclareCompleteCheck
}

export interface ICICDeclareCompleteCheck {
  borrower: boolean,
  marriage: boolean,
  co_brw:  boolean,
  co_payer: boolean,
  law_rlt: boolean,
  others: boolean
}

export interface ICICDeclareAttachmentCount {
  borrower: ICICPersonAttachmentCount[],
  marriage: ICICPersonAttachmentCount[],
  co_brw:  ICICPersonAttachmentCount[],
  co_payer: ICICPersonAttachmentCount[],
  law_rlt: ICICPersonAttachmentCount[],
  other: ICICPersonAttachmentCount[]
}

export interface ICICPersonAttachmentCount {
  uuid: string,
  count: number
}