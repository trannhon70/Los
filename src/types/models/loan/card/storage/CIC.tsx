import { ICodeName, IIdCodeName, IIdNameValue } from "types";

export interface ICICInstitutionBaseState{
  full_name: string;
  debt_amount: IIdNameValue;
  collateral_value_amount: IIdNameValue;
  highest_debt_group: string;
  cic_identity_info: ICICIdentityInfoState[];
  document_info_list: ICICDocumentInfoListState[];
  total_document_file: number;
  person_uuid: string;
}

export interface ICICDocumentInfoListState{
  document_type_id: number;
  document_type_name: string;
  document_type_code: string;
  document_list: ICICDocumentListState[];
}

export interface ICICDocumentListState{
  document_id: number;
  document_name: string;
  document_child_files: ICICDocumentChildFilesState[];
}

export interface ICICDocumentChildFilesState{
  file_id: number;
  uuid: string;
  type: string;
  display_order: number;
  description: string;
  content_type: string;
  create_by: string;
  create_at: string;
}

export interface ICICIdentityInfoState{
  identity_type: string;
  identity_num: string;


  total_credit_card: number;
  debt_amount: number;
  collateral_value_amount: number;
  debt_group: string;
  identity_uuid: string;
  credit_institution_info: ICICCreditInstitutionInfoState[];
}

export interface ICICCreditInstitutionInfoState extends IIdCodeName{
  short_name: string;
  avatar: string;
  detail_info: ICICDetailInfoState;
  credit_score_info: ICICCreditScoreInfoState;
  uuid: string;
}

export interface ICICDetailInfoState{
  loan_info: ICICLoanInfoState;
  credit_card_info: ICICCreditCardInfoState;
  collateral_info: ICICCollateralInfoState;
}

export interface ICICLoanInfoState{
  updated_date: string;
  debt_amount: number;
  loan_term_info: ICICLoanTermInfoState[];
}

export interface ICICLoanTermInfoState extends ICodeName{
  uuid: string;
  debt: string;
  credit_limit: string;
  monthly_duration: string;
}

export interface ICICCreditCardInfoState{
  updated_date: string;
  credit_limit_amount: string;
  debt_amount: string;
  card_detail_info: ICICCardDetailInfoState[];
}

export interface ICICCardDetailInfoState extends ICodeName{
  uuid: string;
  debt: string;
  credit_limit: string;
}

export interface ICICCollateralInfoState{
  updated_date: string;
  collateral_value_amount: string;
  collateral_detail_info: ICICCollateralDetailInfoState[];
}

export interface ICICCollateralDetailInfoState extends ICodeName{
  uuid: string;
  category_info: string;
  collateral_value: string;
}

export interface ICICCreditScoreInfoState{
  risk_info: ICICRiskInfoState;
}

export interface ICICRiskInfoState{
  uuid: string;
  score_value: number;
  score_rank: string;
  publish_date: string;
  evaluation: string;
  customer_segment: string;
}

export interface ICICInstitutionState{
  card_holder: ICICCardHolderState;
  presenter: ICICPresenterState;
  other_person: ICICOtherPersonState[];
}

export interface ICICCardHolderState extends ICICInstitutionBaseState{
  total_credit_card: number;
}

export interface ICICPresenterState extends ICICInstitutionBaseState{

}

export interface ICICOtherPersonState extends ICICInstitutionBaseState{
  customer_family_relationship_info: string;
}

export interface ICICDataState {
  other_institution: ICICInstitutionState;
  scb_institution: ICICInstitutionState;
}

//////////////////////////////////////////////////
export interface ICICDataFull {
  data: ICICParentData;
}

export interface ICICParentData{
  data: ICICChildrenData;
}

export interface ICICChildrenData{
  other_institution: ICICInstitution;
  scb_institution: ICICInstitution;
}

export interface ICICInstitution{
  card_holder: ICICCardHolder;
  presenter: ICICPresenter;
  other_person: ICICOtherPerson[];
}

export interface ICICInstitutionBase{
  full_name: string;
  debt_amount: IIdNameValue;
  collateral_value_amount: IIdNameValue;
  highest_debt_group: ICodeName;
  cic_identity_info: ICICIdentityInfo[];
  document_info_list: ICICDocumentInfoList[];
  total_document_file: number;
  person_uuid: string;
}

export interface ICICCardHolder extends ICICInstitutionBase{
  total_credit_card: number;
}

export interface ICICPresenter extends ICICInstitutionBase{

}

export interface ICICOtherPerson extends ICICInstitutionBase{
  customer_family_relationship_info: IIdCodeName;
}

export interface ICICDocumentInfoList{
  document_type_id: number;
  document_type_name: string;
  document_type_code: string;
  document_list: ICICDocumentList[];
}

export interface ICICDocumentList{
  document_id: number;
  document_name: string;
  document_child_files: ICICDocumentChildFiles[];
}

export interface ICICDocumentChildFiles{
  create_at: string;
  create_by: string;
  content_type: string;
  description: string;
  display_order: number;
  file_id: number;
  uuid: string;
  type: string;
}

export interface ICICIdentityInfo{
  identity_type: string;
  identity_num: string;
  debt_amount: IIdNameValue;
  collateral_value_amount: IIdNameValue;
  debt_group: ICodeName;
  identity_uuid: string;
  credit_institution_info: ICICCreditInstitutionInfo[];
}

export interface ICICCreditInstitutionInfo extends IIdCodeName{
  short_name: string;
  avatar: string;
  detail_info: ICICDetailInfo;
  credit_score_info: ICICCreditScoreInfo;
}

export interface ICICCreditScoreInfo{
  uuid: string;
  risk_info: ICICRiskInfo;
}

export interface ICICRiskInfo{
  score_value: number;
  score_rank: string;
  publish_date: string;
  evaluation: IIdNameValue;
  customer_segment: ICICCustomerSegment[];
}

export interface ICICCustomerSegment extends IIdCodeName{
  uuid: string;
}

export interface ICICDetailInfo{
  loan_info: ICICLoanInfo;
  credit_card_info: ICICCreditCardInfo;
  collateral_info: ICICCollateralInfo;
}

export interface ICICLoanInfo{
  updated_date: string;
  debt_amount: IIdNameValue;
  loan_term_info: ICICLoanTermInfo[];
}

export interface ICICLoanTermInfo extends ICodeName{
  monthly_duration: IIdNameValue;
  credit_limit: IIdNameValue;
  debt: IIdNameValue;
  uuid: string;
}

export interface ICICCreditCardInfo{
  updated_date: string;
  credit_limit_amount: IIdNameValue;
  debt_amount: IIdNameValue;
  card_detail_info: ICICCardDetailInfo[];
}

export interface ICICCardDetailInfo extends ICodeName{
  uuid: string;
  credit_limit: IIdNameValue;
  debt: IIdNameValue;
}

export interface ICICCollateralInfo{
  updated_date: string;
  collateral_detail_info:ICICCollateralDetailInfo[];
  collateral_value_amount: IIdNameValue;
}

export interface ICICCollateralDetailInfo extends ICodeName{
  category_info: ICodeName;
  uuid: string;
  collateral_value: IIdNameValue;
}