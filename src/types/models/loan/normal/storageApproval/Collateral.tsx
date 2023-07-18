import {
  IApartmentGetRestDepartment,
  ICarousel,
  ICertificateGetRESTDepartment,
  IIdNameFlag,
  IIdValue,
  ILandAssetWarpperTypeLandGet,
  ILandCertificatedLandAsserWrapperTypeLandGet,
  ILandGetRestDepartment,
  ILandWrapperGet,
  ILOANNormalCollateralData,
  IMaketGet,
  IOwnersWarpperGetRESTDepartment
}
  from "../storage/CollaretalV2";
  import {IResDocument} from 'types/models/loan/normal/configs/Document';

export interface ILOANNormalApprovalCollateralV2State {
  activeType: string;
  carousel: ICarousel[];
  spreadSheet:ILoanNormalApprovalLVTLog;
  uuidActiveData: string;
  data: ILOANNormalCollateralData[];
  lvt_log:ILoanNormalApprovalLVTLog[];
  fetched: boolean,
  fetching: boolean,
  validate:ILOANNormalStorageCollateralValidate,
  uuidLegalAttachmentModal?:string;
  
}

export interface ILOANNormalApprovalSpreadSheetData{
  data:ILOANNormalApprovalSpreadSheet[];
  uuid:string;
  updated_at:number | null;
  updated_by_fullname: string | null;
}

export interface ILoanNormalApprovalLVTLog{
  title: string;
  rows:ILoanNormalApprovalLogRows[];
  is_activated:boolean;
  updated_by:string;
  updated_at:number | null;
  updated_by_fullname: string | null;
  uuid: string;
}

export interface ILoanNormalApprovalLogRows{
  coll_price_cert_uuid:string;
  coll_price_cert_asset_uuid:string;
  loan_credit: string | null;
  temp_calc_value:number | null;
  max_ltv_value:number | null;
  max_loan_credit:number | null;
  safely_debit:number | null;
  ltv_value:number | null;
  uuid:string;
}

export interface ILOANNormalStorageCollateralValidate{
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  position?: number;
}
export interface ILOANNormalCollateralTypeSpreadSheet{
  type:string;
  childType:string;
  nameType:string;
  nameChildType:string;
  price_cert_uuid:string;
}

export interface ILOANNormalApprovalSpreadSheet{
  typeCollateral:string;
  price_cert_uuid:string;
  loan:string;
  valueProvisional:number | null;
  maxLVT:number | null;
  debt:number | null;
  uuidSpreadSheet:string;
}

export interface ILOANNormalApprovalAccept{
  is_accept:boolean;
  reason:string;
}

export interface ILoanNormalApproveCollateral {
  code: string;
  uuid: string;
  data: IDataCollateral;
  is_collateral: boolean;
}
export interface IDataCollateral {
  dashboard: [];
  collaterals: IDataCollateralType[];
  ltv_logs:ILoanNormalApprovalLVTLog[];
  logs:ILoanNormalApprovalLVTLog[];
  current_ltv: ILoanNormalApprovalLVTLog
}
export interface IDataCollateralType {
  order: number | null;
  is_accept:boolean;
  reason:string;
  collateral_type: IIdNameFlag;
  is_compactness: IIdNameFlag;
  status: IIdNameFlag;
  valuation_id: string;
  valuation_date: number;
  valuation_unit_type: IIdNameFlag;
  valuation_unit: IIdNameFlag;
  valuation_center: IIdNameFlag;
  valuation_center_opinion: string | null;
  independence_organization: IIdNameFlag;
  other_independence_organization: string | null;
  purpose: IIdNameFlag;
  other_purpose: string;
  collateral_value: IIdValue;
  max_percentage: IIdValue;
  sub_types: ISubTypeGet[];
  price_cert_uuid: string;
  code: string | null;
  description: string;
  los_uuid: string;
  re_uuid: string;
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  position_type: IIdNameFlag;
  other_position_type: IIdNameFlag;
  lane_width: IIdNameFlag;
  documents:IResDocument[]
}
export interface ISubTypeGet {
  name: string | null;
  items: ISubTypeGetItem[];
  id: string;
  child_id: string;
  child_name: string;
}

export interface ISubTypeGetItem { // cehck type chung cư
  order: number; // 
  child_id: string;
  child_name: string;
  max_percentage: IIdValue;
  collateral_value: IIdValue; //
  collateral_code: string; //
  description: string;
  detail: ISubTypeGetItemDetail;
  price_cert_asset_uuid: string;  // 
  price_cert_asset_appraisal_uuid: string;
  apart_uuid: string; // type chung cư get;
  from_credit_extension: IIdNameFlag;// type chung cư get;
  is_exploited: IIdNameFlag;// type chung cư get;
  credit_extension_secured: IIdNameFlag;// type chung cư get;
  non_business_area: IIdValue;// type chung cư get;
  has_certificate: IIdNameFlag;// type chung cư get;
  project_name: string;// type chung cư get;
  owner_wrapper: IOwnersWarpperGetRESTDepartment;// type chung cư get;
  certificates: ICertificateGetRESTDepartment[];// type chung cư get;
  apartments: IApartmentGetRestDepartment[];// type chung cư get;
  land: ILandGetRestDepartment;// type chung cư get;
  market: IMaketGet,  // type chợ
  land_wrapper: ILandWrapperGet;  // 
  land_asset_wrapper: ILandAssetWarpperTypeLandGet; // type dat 
  certificated_land_asset_wrappers: ILandCertificatedLandAsserWrapperTypeLandGet[] //type dat  

}

export interface ISubTypeGetItemDetail {
  name: string;
  license_number: string;
  status: any;
  description: string;
  quantity_each_type: number;
  manufacturing_date: string;
  brand: string;
  model: string;
  origin_of_promotion: string;
  remain_quality: IIdValue;
  quantity: number;
  balance_type: IIdNameFlag;
  distributor: IIdNameFlag;
  other_distributor: string;
  origin_of_production: IIdNameFlag;
  other_origin_of_production: string;
  transportation_sub_type: string;
  other_transportation_sub_type: string;
  legal_document_types: [] // check
  vehicle_identification_number: string;
  engine_number: string;
  license_plate: string;
  documents:IResDocument[]; //
}

export interface IDataPostCollateralS2 {
  price_cert_uuid: string;
  is_accept: boolean;
  reason: string
}