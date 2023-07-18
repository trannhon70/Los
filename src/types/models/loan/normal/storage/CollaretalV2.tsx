import { PayloadAction } from '@reduxjs/toolkit';
import {
  ILOANNormalDocument,
  ILOANNormalFile,
  IResDocument,
} from '../configs/Document';

export interface IListSubTypeData {
  key?: number;
  name?: string;
  value_money?: string;
  type?: string;
  subType?: string;
  uuid_sub_collateral: string;
}

export interface ILOANNormalStorageCollateralValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
  landType?: string;
  infoTab?: string;
  data?: string;
}
export interface ILOANNormalCollateralV2StateModalTableCoOwners {
  full_name: string;
  uuid: string;
  identity_num: string;
  mobile_num: string;
  telephone_num: string;
}

export interface ILOANNormalCollateralV2State {
  activeType: string;
  carousel: ICarousel[];
  uuidActiveData: string;
  data: ILOANNormalCollateralData[];
  validate: ILOANNormalStorageLoanValidate;
  fetched: boolean;
  fetching: boolean;
  ignore: string;
  originData: ILOANNormalCollateralData[];
}
export interface ILOANNormalStorageLoanValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number | string;
  percent?: number | string;
  data?: string;
}
export interface ILOANNormalStorageV2CollateralForm {
  code: string | null;
  uuid: string | null;
  data: ICollateralData;
  ignore_collateral: boolean;
}
export interface ICollateralData {
  dashboard: [];
  collaterals: ICollateralFormGet[];
}
export interface ILOANNormalCollateralData {
  uuidActiveData: string;
  type: string;
  is_accept?: boolean;
  reason?: string;
  isSaved?: boolean;
  is_collapse_type: boolean;
  status: string;
  is_compactness: string;
  valuation_id: string;
  valuation_date: number | null;
  valuation_unit_type: string;
  valuation_unit: string;
  valuation_center: string;
  valuation_center_opinion: string;
  independence_organization: string;
  other_independence_organization: string;
  purpose: string;
  other_purpose: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  position_type: string;
  other_position_type: string;
  lane_width: string;
  description: string;
  collateral_value: number | null;
  max_percentage: number | null;
  sub_type: ISubtype[];
  uuidActiveSubtype: string;
  price_cert_uuid?: string;
  documents?: ILOANNormalDocument[];
}
export interface IIdNameFlag {
  id: string;
  name: string | null;
  other_value_flag: string | null;
}
export interface IIdValue {
  id: string;
  value: number;
}
export interface ICountCarousel {
  [name: string]: string | number;
}
export interface ICollateralFormGet {
  order: number;
  collateral_type: IIdNameFlag;
  is_compactness: IIdNameFlag;
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
  max_percentage: IIdValue | null;
  sub_types: ISubTypeGet[];
  price_cert_uuid: string;
  code: string | null;
  los_uuid: string;
}
export interface ISubTypeGet {
  name: string | null;
  items: ISubTypeGetItem[];
  id: string;
  child_id?: string;
  child_name?: string;
}

export interface ISubTypeGetItem {
  // cehck type chung cư
  order: number;
  child_id: string;
  child_name: string;
  max_percentage: IIdValue | null;
  collateral_value: IIdValue;
  collateral_code: string;
  description: string;
  detail: ISubTypeGetItemDetail;
  price_cert_asset_uuid: string; //
  price_cert_asset_appraisal_uuid: string;
  apart_uuid: string; // type chung cư get;
  from_credit_extension: IIdNameFlag; // type chung cư get;
  is_exploited: IIdNameFlag; // type chung cư get;
  credit_extension_secured: IIdNameFlag; // type chung cư get;
  non_business_area: IIdValue; // type chung cư get;
  has_certificate: IIdNameFlag; // type chung cư get;
  project_name: string; // type chung cư get;
  owner_wrapper: IOwnersWarpperGetRESTDepartment; // type chung cư get;
  certificates: ICertificateGetRESTDepartment[]; // type chung cư get;
  apartments: IApartmentGetRestDepartment[]; // type chung cư get;
  land: ILandGetRestDepartment; // type chung cư get;
  market: IMaketGet; // type chợ
  land_wrapper: ILandWrapperGet; // type dat
  land_asset_wrapper: ILandAssetWarpperTypeLandGet; // type dat
  certificated_land_asset_wrappers: ILandCertificatedLandAsserWrapperTypeLandGet[]; //type dat
}

export interface ILandCertificatedLandAsserWrapperTypeLandGet {
  order: number | null;
  from_credit_extension: IIdNameFlag;
  is_exploited: IIdNameFlag;
  credit_extension_secured: IIdNameFlag;
  non_business_area: IIdValue;
  max_percentage: IIdValue | null;
  collateral_value: IIdValue;
  description: string;
  owner_wrapper: IOwnersWarpperGetRESTDepartment;
  certificates: ILandCertificatedLandAsserWrapperTypeLandGetCertificates[];
  land_asset: ILandAssetTypeLandQSHGet;
  land_const_uuid: string;
  documents?: IResDocument[];
}
export interface ILandAssetTypeLandQSHGet {
  asset_legal: IIdNameFlag;
  other_asset_legal: string | number | null;
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  certificate_address: string;
  certificate_province: IIdNameFlag;
  certificate_district: IIdNameFlag;
  certificate_ward: IIdNameFlag;
  land_asset_types: ILandAssetTypeLandRESTQSHGet[];
  land_const_item_uuid: string;
}
export interface ILandAssetTypeLandRESTQSHGet {
  order: number | null;
  land_asset_type: IIdNameFlag;
  other_asset_type: string;
  certificate_building_area: string;
  building_area: IIdValue;
  certificate_cross_floor_area: string;
  cross_floor_area: IIdValue;
  certificate_used_area: string;
  used_area: IIdValue;
  ownership_duration: string;
  owner_form: string;
  certificate_structure: string;
  structure: string;
  certificate_rank: string;
  certificate_floors: string;
  floors: string;
  duration_of_use: string;
  land_const_item_detail_uuid: string;
}
export interface ILandCertificatedLandAsserWrapperTypeLandGetCertificates {
  documents: [];
  persons: ILandCertificatedLandAsserWrapperTypeLandGetCertificatesPerson[];
  certificate_type: IIdNameFlag;
  other_certificate_type: string;
  certificate_code: string;
  certificate_no: string;
  issue_date: number | null;
  place_of_issue: string;
  order: number | null;
  land_const_item_cert_uuid: string;
}
export interface ILandCertificatedLandAsserWrapperTypeLandGetCertificatesPerson {
  full_name: string;
  person_uuid: string;
  documents: [];
  order: number | null;
  land_const_item_cert_item_uuid: string;
}
export interface ILandAssetWarpperTypeLandGet {
  from_credit_extension: IIdNameFlag;
  is_exploited: IIdNameFlag;
  credit_extension_secured: IIdNameFlag;
  non_business_area: IIdValue;
  max_percentage: IIdValue | null;
  collateral_value: IIdValue;
  description: string;
  land_assets: ILandAssetTypeLandGet[];
  land_const_uuid: string;
}
export interface ILandAssetTypeLandGet {
  order: number | null;
  asset_legal: IIdNameFlag;
  other_asset_legal: null;
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  certificate_address: string;
  certificate_province: IIdNameFlag;
  certificate_district: IIdNameFlag;
  certificate_ward: IIdNameFlag;
  land_asset_types: ILandAssetTypeRestTypeLandGet[];
  land_const_item_uuid: string;
  documents?: IResDocument[];
}
export interface ILandAssetTypeRestTypeLandGet {
  order: number | null;
  land_asset_type: IIdNameFlag;
  other_asset_type: string;
  certificate_building_area: string;
  building_area: IIdValue;
  certificate_cross_floor_area: string;
  cross_floor_area: IIdValue;
  certificate_used_area: string;
  used_area: IIdValue;
  ownership_duration: string;
  owner_form: string;
  certificate_structure: string;
  structure: string;
  certificate_rank: string;
  certificate_floors: string;
  floors: string;
  duration_of_use: string;
  land_const_item_detail_uuid: string;
}
export interface ILandWrapperGet {
  certificates: ILandOwnerCertificateTypeLandGet[]; //done
  collateral_code: string;
  collateral_value: IIdValue;
  credit_extension_secured: IIdNameFlag;
  description: string;
  from_credit_extension: IIdNameFlag;
  has_certificated_land_asset: IIdNameFlag;
  has_land_asset: IIdNameFlag;
  is_exploited: IIdNameFlag;
  land: ILandTypeLandGet; // done
  max_percentage: IIdValue | null;
  non_business_area: IIdValue;
  owner_wrapper: ILandOwnerWarpperTypeLandGet; // done
  price_cert_asset_appraisal_uuid: string; // dat
  re_land_uuid: string; //dat
}
export interface ILandTypeLandGet {
  // BDS type đất
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  certificate_address: string;
  certificate_province: IIdNameFlag;
  certificate_district: IIdNameFlag;
  certificate_ward: IIdNameFlag;
  use_purposes: IIdNameFlag[];
  other_use_purpose: string | number | null;
  certificate_use_purposes: ILandCertificateTypeLandGet[];
}
export interface ILandCertificateTypeLandGet {
  use_purpose: string;
  land_number: string;
  map_number: string;
  certificate_area: string;
  real_area: IIdValue;
  land_use_source: IIdNameFlag;
  other_land_use_source: string | number | null;
  duration: string;
  usage_form: IIdNameFlag;
  other_usage_form: string | number | null;
  order: string | number | null;
  re_land_used_uuid: string;
}

export interface ILandOwnerWarpperTypeLandGet {
  owner_type: IIdNameFlag;
  owners: IOwnersGetRESTDepartment[];
}

export interface ILandOwnerCertificateTypeLandGet {
  documents: IResDocument[];
  persons: IlandPersonTypeLandGet[];
  certificate_type: IIdNameFlag;
  other_certificate_type: null;
  certificate_code: string;
  certificate_no: string;
  issue_date: number | null;
  place_of_issue: string;
  order: number | null;
  land_cert_uuid: string;
}
export interface IlandPersonTypeLandGet {
  full_name: string;
  person_uuid: string;
  documents: [];
  order: number | null;
  re_land_cert_item_uuid: string;
}
export interface IMaketGet {
  market_name: string;
  market_code: string;
  location: string;
  sector: string;
  start_date: number | null;
  end_date: number | null;
  remaining: IIdValue;
  used_area: string;
  value_area: IIdValue;
  structure: string;
}
export interface ILandGetRestDepartment {
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  certificate_address: string;
  certificate_province: IIdNameFlag;
  certificate_district: IIdNameFlag;
  certificate_ward: IIdNameFlag;
  use_purposes: IIdNameFlag[];
  other_use_purpose: string;
  certificate_use_purposes: ICertificateUsePurposesGetRestDepartment[];
  apart_land_uuid: string;
}
export interface ICertificateUsePurposesGetRestDepartment {
  use_purpose: string;
  land_number: string;
  map_number: string;
  certificate_area: string;
  real_area: IIdValue;
  land_use_source: IIdNameFlag;
  other_land_use_source: string;
  duration: string;
  usage_form: IIdNameFlag;
  other_usage_form: string;
  order: number | null;
  apart_land_used_uuid: number | null;
}
export interface IApartmentGetRestDepartment {
  order: number;
  house_type: string;
  apartment_type: IIdNameFlag;
  other_apartment_type: string;
  apartment_number: string;
  block: string;
  floor: string;
  start_date: number | null;
  certificate_area: string;
  real_area: IIdValue;
  usage_from: null;
  duration: string;
  ownership_category: string;
  apart_room_uuid: string;
}
export interface ICertificateGetRESTDepartment {
  // get type chung cư
  documents: [];
  persons: IPersonsGetRESTDepartment[];
  certificate_type: IIdNameFlag;
  other_certificate_type: string;
  other_certificate_type_other: string;
  certificate_name: string;
  certificate_code: string;
  certificate_no: string;
  issue_date: number | null;
  place_of_issue: string;
  contract_type: number | null;
  contract_name: string;
  contract_code: string;
  contract_no: number | null;
  contract_unit: string;
  contract_date: number | null;
  order: number | null;
  apart_owner_cert_uuid: string;
  market_cert_uuid?: string;
}
export interface ICertificateGetRESTDepartment {
  // get type chung cư
  documents: [];
  persons: IPersonsGetRESTDepartment[];
  certificate_type: IIdNameFlag;
  other_certificate_type: string;
  certificate_code: string;
  certificate_no: string;
  issue_date: number | null;
  place_of_issue: string;
  contract_type: number | null;
  contract_no: number | null;
  contract_date: number | null;
  order: number | null;
  apart_owner_cert_uuid: string;
}
export interface IPersonsGetRESTDepartment {
  // get type chung cư
  full_name: string;
  person_uuid: string;
  documents: [];
  order: null;
  apart_owner_cert_item_uuid: string;
  market_cert_item_uuid?: string;
}
export interface IOwnersWarpperGetRESTDepartment {
  // get type chung cư
  owner_type: IIdNameFlag;
  owners: IOwnersGetRESTDepartment[];
}
export interface IOwnersGetRESTDepartment {
  // get type chung cư va type dat
  full_name: string;
  person_uuid: string;
  documents: [];
  has_authorize: IIdNameFlag;
  authorized_persons: IOwnersGetAuthorized[];
  order: number | null;
  owner_uuid: string;
}
export interface IOwnersGetAuthorized {
  // get type chung cư va ty đất
  documents: [];
  person_uuid: string;
  owner_relationship: string;
  borrower_relationship: string;
  authorize_contract: string;
  order: number | null;
  owner_auth_uuid: string;
}
export interface ISubTypeGetItemDetail {
  name: string;
  license_number: string;
  status: any;
  description: string;
  quantity_each_type: number;
  manufacturing_date: string;
  brand: string;
  other_brand: string;
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
  legal_document_types: []; // check
  vehicle_identification_number: string;
  engine_number: string;
  license_plate: string;
  documents: IResDocument[]; //
}
export interface IOwnerWrapperGet {
  owner_type: IIdNameFlag;
  owners: IOwners[];
}
export interface IOwners {
  person_uuid: string;
  documents: [];
  order: string | null;
  owner_uuid: string;
}
export interface ICarousel {
  type: string;
  name: string;
  total: number;
}
///quyen tai san /////
export interface ISubtype {
  is_collapse_sub_type: boolean;
  id: string;
  child_sub_type: string;
  uuidActiveSubtype: string;
  uuidItemsActive: string;
  items: ISubItems[];
  child_id?: string;
  child_name?: string;
}

export interface ISubItems extends ILandWrapper, ISubItemsMachine {
  activeUUID: string;
  maketActiveUuid: string;
  current_value_item: number | null;
  departmentActiveUUID: string;
  departmentInfoActiveUUID: string;
  activeUUIDCertificateUsePurposes: string;
  type_land: string;
  ratio: number | null;
  value: number | null;
  typeCollateral: string;
  license: string;
  status: string;
  status_flag: IIdNameFlag | null;
  collateral_value: number | null;
  collateral_code: string;
  issuer: string;
  other_issuer: string;
  has_certificate_maket: string;
  land: ILand;
  market: IMaket;
  ctxd_gcn_qsh: ICtxdGcnQsh;
  ctxd_land: ICTXDLand;
  department: IDepartment;
  documents?: ILOANNormalDocument[]; // for item > detail > document
  // transportation_documents?:ILOANNormalDocument[];// PTVT
  transportation_sub_type: string; // PTVT
  other_transportation_sub_type: string; // PTVT
  brand: string; // PTVT
  other_brand: string; //PTVT
  model: string; // PTVT
  origin_of_production: string; // PTVT
  other_origin_of_production: string; // PTVT
  legal_document_types: LegalDocsTransportType[]; // PTVT
  license_number: string; // PTVT
  vehicle_identification_number: string; // PTVT
  engine_number: string; // PTVT
  license_plate: string; // PTVT
  description: string; // PTVT
  remain_quality: number | null; // PTVT
  owner_wrapper: ILandLegalInformationOwner;
  price_cert_asset_uuid: string;
}

export interface LegalDocsTransportType {
  id: string | number;
  documents: DosLegalTypeTransport[];
  other_document?: string | null;
}
export interface DosLegalTypeTransport {
  id: string | number;
  other_value_flag: string;
}
/**
 * Đất
 *
 */
export interface ILand {
  land_wrapper: ILandWrapper & ILandWrapperCheck;
  land_legal_information_owner: ILandLegalInformationOwner;
  land_legal_infomation_asset: ILegalLandInformatioAsset;
  certificate_legal_info: ICertificateLegalInfo;
}

/**
 * Chợ
 *
 */
export interface IMaket {
  market_owner: ILandLegalInformationOwner;
  maket_wrapper: ILandWrapper & ILandWrapperCheck;
  maket_certificates: IMaketCertificates[];
  maket_info: IMaketInfo;
}

/**
 * Chung
 *
 */
export interface IDepartment {
  has_certificate: string;
  project_name: string;
  department_wrapper: ILandWrapper & ILandWrapperCheck;
  department_certificate_legal: IDepartmentCertificateLegal[];
  department_info: IDepartmentInfo[];
  department_info_land: IDepartmentInfoLand;
  department_owner: ILandLegalInformationOwner;
}

export interface IDepartmentInfoLand {
  address: string;
  province: string;
  district: string;
  ward: string;
  certificate_address: string;
  certificate_province: string;
  certificate_district: string;
  certificate_ward: string;
  use_purposes: string[];
  other_use_purpose: string;
  certificate_use_purposes: ICertificateUsePurposes[];
}
export interface ICertificateUsePurposes {
  activeUUIDCertificateUsePurposes: string;
  use_purpose: string;
  land_number: string;
  map_number: string;
  certificate_area: string;
  real_area: number | null;
  land_use_source: string;
  other_land_use_source: string;
  duration: string;
  usage_form: string;
  other_usage_form: string;
  re_land_used_uuid: string;
  apart_land_used_uuid?: string;
}

export interface IDepartmentInfo {
  departmentInfoActiveUUID: string;
  house_type: string; //1. Loại nhà ở
  apartment_type: string; //2. Loại căn hộ
  other_apartment_type: string; //3. Loại căn hộ khác
  apartment_number: string; //4. Căn hộ số (*)
  block: string; //5. Block/Tháp
  floor: string; //6. Tầng (*)
  start_date: number | null; //7. Thời gian đưa vào sử dụng
  certificate_area: string; //8. Diện tích căn hộ theo pháp lý (m2)
  real_area: number | null; //9. Diện tích căn hộ theo thực tế (m2)
  usage_form: string; //10. Hình thức sở hữu theo GCN
  duration: string; //11. Thời hạn sở hữu theo GCN
  ownership_category: string; //12. Hạng mục được sở hữu chung ngoài căn hộ theo GCN
  apart_room_uuid: string;
}

export interface IDepartmentCertificateLegal {
  order: number | null;
  persons: IPerson[];
  // uuid_active_person: string;
  uuid_certificate_legal: string;
  other_certificate_type: string; //1. Loại GCN (*)
  other_certificate_type_other: string; //2. Loại GCN khác(*)
  certificate_code: string; // 3. Số GCN
  certificate_no: number | null; // 4. Số vào sổ cấp GCN (*)
  issue_date: number | null; // 5. Số vào sổ cấp GCN (*)
  place_of_issue: string; // 6. noi cấp (*)
  contract_number_type: string; // 7. Loại hợp đồng (*)
  contract_number: string; //8. Số hợp đồng
  contract_date: number | null; // 9 ngày hop dong
  documents: ILOANNormalDocument[];
  apart_owner_cert_uuid: string;
}
export interface IPersonCertificateLegal {
  uuid_active_person: string;
  other_certificate_type: string; //1. Loại GCN (*)
  other_certificate_type_other: string; //2. Loại GCN khác(*)
  certificate_code: string; // 3. Số GCN
  certificate_no: number | null; // 4. Số vào sổ cấp GCN (*)
  issue_date: number | null; // 5. Số vào sổ cấp GCN (*)
  place_of_issue: string; // 6. noi cấp (*)
  contract_number_type: string; // 7. Loại hợp đồng (*)
  contract_number: string; //8. Số hợp đồng
  contract_date: number | null; // 9 ngày hop dong
}

export interface ISubItemsMachine {
  count: number | null;
  year: number | null;
  model: string;
  production: string;
  CLCL: string;
  number_register: string;
  quantity: number | null;
  info_collatetal: string;
  branch: string;
}

/**
 * @todo Thông tin định giá và thẩm dịnh tài sản
 * @name "from_credit_extension" TSBĐ được hình thành từ nguồn vốn cấp tín dụng
 * @name "is_exploited" Nguồn tiền trả nợ là nguồn tiền hình thành từ việc kinh doanh, khai thác chính TSBĐ Chỉ xuất hiện trường này khi Trường "'TSBĐ được hình thành từ nguồn vốn cấp tín dụng" chọn là "có"
 * @name "credit_extension_secured" Tài sản hiện đang đảm bảo cho nghĩa vụ cấp tín dụng
 * @name "non_business_area" Tỷ lệ diện tích BĐS không kinh doanh (%) Nhập tay ký tự số, nếu Trường "trạng thái BĐS" chọn "BĐS hỗn hợp" thì xuất hiện trường này. Chỉ xuất hiện trường này khi Trường "'TSBĐ được hình thành từ nguồn vốn c
 * @name "max_percentage" Tỉ lệ cho vay theo quy định
 * @name "description" Thông tin nghĩa vụ đang đảm bảo Có sẵn nội dung "(Tên) …., số …. , ngày …. Thỏa thuận tín dụng" và được phép tiếp tục chỉnh sửa nhập tay, không giới hạn
 * @name "has_land_asset" Checked CTXD trên đất
 * @name "has_certificated_land_asset" Checked CTXD có GCN riêng
 * @name "value_of_land"  Giá trị QSD đất theo từng GCN
 *
 */
export interface ILandWrapper {
  from_credit_extension: string;
  is_exploited: string;
  credit_extension_secured: string;
  non_business_area: number | null;
  max_percentage: string | null;
  value_of_land: number | null;
  description: string;
  land_const_uuid: string;
}

export interface ILandWrapperCheck {
  has_land_asset: string;
  has_certificated_land_asset: string;
}

/**
 * @todo Loại đất thông tin pháp lý sở hữu
 * @name "ower_wrapper" Đối tượng sở hữu tài sản
 * @name "owner" Thông tin sỡ hữu tài sản
 * @description Nếu chọn tài sản là chính chủ thì hiện các trường đối tượng ""chính chủ sở hữu"", tương tự với Đồng sở hữu và bên thứ ba, chỉ có thể xuất hiện 1 trong 4 tab Chính chủ/Đồng sở hữu/Bên thứ ba/tài sản riêng của vợ/chồng
 * @description Chọn ""Chính chủ sở hữu"": Hiển thị thông tin của Khách hàng vay và người hôn phồi (nếu có), người đồng vay đồng thời cùng là chủ sở hữu tài sản
 * @description Chọn ""Đồng sở hữu"": load thông tin của Khách hàng vay và chọn nhập thêm các chủ tài sản tương ứng đã khai báo ở Step 1 (người liên quan)
 * @description Chọn ""Bên thứ 3"": Chọn các chủ tài sản tương ứng đã khai báo ở step 1 (người liên quan), nhập liệu các thông tin của bên thứ 3
 * @description Chọn ""tài sản riêng của vợ/chồng"" cho phép load thông tin của Vợ/chồng tại thông tin KH vay (các trường thông tin tương tự như ""bên thứ 3
 *
 */
export interface ILandLegalInformationOwner {
  active: number;
  owner_type: string;
  owner: ILandOwner[];
}
export interface ICertificateLegalInfo {
  // thong tin phap ly giay chung nhan
  dataCertificate: ICertificateLegalInfoData[];
  activeUUIDCertificate: string;
  // typeUseLand: string;
  // typeGCN: string;
  // numberGCNLegal: string;
  // numberGCN: string;
  // dateRange: number | null;
  // dateLocation: string;
}
export interface ICTXDLand {
  // cong trinh xay dung tren dat
  dataCTXDLand: ICTXDLandData[];
  activeCTXDLand: string;
  ctx_land_wrapper: ILandWrapper & ILandWrapperCheck;
}

export interface IMaketCertificates {
  order: number | null;
  persons: IPerson[];
  uuid_maket_certificate: string;
  person_uuid: string;
  certificate_name: string;
  certificate_code: string;
  issue_date: number | null;
  place_of_issue: string;
  contract_name: string;
  contract_number: number | null;
  contract_code: string;
  contract_date: number | null;
  contract_unit: string;
  documents: ILOANNormalDocument[];
  market_cert_uuid: string;
}
export interface IPerson {
  person_uuid: string;
  full_name: string;
  apart_owner_cert_item_uuid: string;
  market_cert_item_uuid?: string;
  land_const_item_cert_item_uuid?: string;
  re_land_cert_item_uuid?: string;
  // certificate_name: string;
  // certificate_code: string;
  // issue_date: number | null;
  // place_of_issue: string;
  // contract_name: string;
  // contract_number: number | null;
  // contract_code: string;
  // contract_date: number | null;
  // contract_unit: string;
}

export interface IMaketInfo {
  market_name: string;
  market_code: string;
  location: string;
  sector: string;
  start_date: number | null;
  end_date: number | null;
  remaining: string | null;
  used_area: string | null;
  value_area: string | null;
  structure: string;
}

export interface ICTXDLandData {
  activeUUIDCTXDLand: string;
  asset_legal: string; //1. Pháp lý CTXD
  legal_CTXD_other: string; //2. Pháp lý CTXD khác
  address: string; //3. Địa chỉ thực tế nhà ở/CTXD
  provice: string; //4. Tỉnh/TP
  district: string; //5. Quận/huyện
  ward: string; //6. Phường/xã
  certificate_address: string; //7. Địa chỉ thực tế nhà ở/CTXD
  certificate_province: string; //8. Tỉnh/TP
  certificate_district: string; //9. Quận/huyện
  certificate_ward: string; //10. Phường/xã
  activeUUIDtypeCTXD: string;
  dataTypeCTXD: ITypeCTXD[];
  documents?: ILOANNormalDocument[];
  land_const_item_uuid: string;
}

/**
 * @todo CTXD có GCN QSH riêng
 *
 */
export interface ICtxdGcnQsh {
  activeUuIdCtxdGcnQsh: string;
  ctxd_gcn_qsh_data: ICtxdGcnQshData[];
}

export interface ICtxdGcnQshData {
  uuIdCtxdGcnQsh: string;
  land_legal_information_owner: ILandLegalInformationOwner;
  certificate_legal_info: ICertificateLegalInfo;
  ctxd_gcn_qsh_land_info: ICtxdGcnqshLandInfo;
  documents?: ILOANNormalDocument[];
  land_const_uuid: string;
}

export interface ICtxdGcnqshLandInfo {
  dataCTXDLand: ICTXDLandData;
  activeCTXDLand: string;
  ctx_land_wrapper: ILandWrapper & ILandWrapperCheck;
}

export interface ITypeCTXD {
  activeTypeCTXD: string;
  land_asset_type: string; //1. Loại công trình
  land_asset_type_other: string; //2. Loại công trình khác
  certificate_building_area: string; // 3. Diện tích xây dựng theo GCN (m2)
  building_area: string; // 4. Diện tích xây dựng thực tế (m2)
  certificate_cross_floor_area: string; // 5. Diện tích sàn theo GCN (m2)
  cross_floor_area: string; // 6. Diện tích sàn thực tế (m2)
  certificate_used_area: string; //7. Diện tích sử dụng theo GCN (m2)
  used_area: string; //8. Diện tích sử dụng thực tế (m2)
  ownership_duration: string; //9. Thời hạn sở hữu
  owner_form: string; // 10. Hình thức sở hữu
  certificate_structure: string; //11. Kết cấu công trình theo GCN
  structure: string; //12. Kết cấu công trình thực tế
  certificate_rank: string; //13. Cấp (Hạng) theo GCN
  certificate_floors: string; //14. Số tầng theo GCN
  floors: string; //15. Số tầng thực tế
  duration_of_use: string; //16. Thời gian đưa vào sử dụng
  land_const_item_detail_uuid: string;
}

export interface ICertificateLegalInfoData {
  // thong tin phap ly giay chung nhan chi tiet mảng user
  persons: IPerson[];
  activeUUIDCertificateL: string;
  activeUUIDUserListLegal: string;
  typeUseLand: string;
  typeGCN: string;
  numberGCNLegal: string;
  numberGCN: string;
  dateRange: number | null;
  dateLocation: string;
  documents: ILOANNormalDocument[];
  land_const_item_cert_uuid: string;
  land_cert_uuid: string;
}

export interface ICertificateLegalInfoDataUserList {
  // thong tin phap ly giay chung nhan chi tiet user
  activeUUIDUserListLegal: string;
  typeUseLand: string;
  typeGCN: string;
  numberGCNLegal: string;
  numberGCN: string;
  dateRange: number | null;
  dateLocation: string;
}

/**
 * @todo Thông tin đât thông tin đát
 *
 */
export interface ILegalLandInformatioAsset {
  asset_legal: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  certificate_address: string;
  certificate_province: string;
  certificate_district: string;
  certificate_ward: string;
  purpose_using_lane: string[];
  purpose_using_lane_other: string;
  land_asset_types: ICertificateUsePurposes[];
  activeUUIDCertificateUsePurposes: string;
}

/**
 * @todo Mục đích sử dụng đất theo giấy chứng nhận
 *
 */
export interface ILandAssetType {
  uuidLandAssetType: string;
  land_asset_type: string;
  other_asset_type: string;
  certificate_building_area: string;
  building_area: string;
  certificate_cross_floor_area: string;
  cross_floor_area: string;
  certificate_used_area: string;
  used_area: string;
  ownership_duration: string;
  owner_form: string;
  certificate_structure: string;
  structure: string;
  certificate_rank: string;
  certificate_floors: number | null;
  floors: number | null;
  duration_of_use: string;
}

/**
 * @todo Đối tượng sở hữu tài sản
 * @name "person_uuid" UUID của người ở legal_info
 * @name "has_authorize" Có văn bản ủy quyền hay không
 * @name "info_authorize" Thông tin ủy quyền
 *
 */
export interface ILandOwner {
  full_name: string;
  person_uuid: string;
  has_authorize: string;
  active: number;
  authorized_persons: IInfoAuthorize[];
  type: string;
  owner_uuid?: string;
}

/**
 * @todo Thông tin ủy quyền
 * @name "person_uuid" Tên người ủy quyền
 * @name "documents" Số tập tin
 * @name "owner_relationship" Mối quan hệ giữa người được uỷ quyền với chủ tài sản
 * @name "borrower_relationship" Mối quan hệ giữa người được uỷ quyền với đối tượng vay
 * @name "authorize_contract" Hợp đồng ủy quyền
 *
 */
export interface IInfoAuthorize {
  documents: ILOANNormalDocument[];
  full_name: string;
  person_uuid: string;
  owner_relationship: string;
  borrower_relationship: string;
  authorize_contract: string;
  owner_auth_uuid: string;
}

/////////interface common ////////////////
export interface ILOANNormalStorageCollaretalReport {
  uuidActive: string;
  order: number | null;
  los_uuid: string;
  collateral_type: string;
  is_compactness: string;
  valuation_id: string;
  valuation_date: number | null;
  valuation_unit_type: string;
  valuation_unit: string;
  purpose: string;
  other_purpose: string;
  collateral_value: number | null;
  max_percentage: number | null;
}

export interface ILOANNormalStorageClassificationInformation {
  // thong tin phan loại BDS
  address: string;
  province: string;
  district: string;
  ward: string;
  typelocation: string;
  typelocationother: string;
  width: string;
  description: string;
}

export interface ILOANNormalTotalType {
  // tong gia tri
  totalValue: number | null;
  percentValue: number | null;
}

//// may moc thiet bi
export interface ILOANNormalCollateralMachineType {}

export interface IIdNameFlag {
  id: string;
  name: string | null;
  other_value_flag: string | null;
}
export interface IIdValue {
  id: string;
  value: number;
}
export interface ICollateralFormGet {
  uuidActiveData: string;
  order: number;
  collateral_type: IIdNameFlag;
  status: any;
  is_compactness: IIdNameFlag;
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
  position_type: IIdNameFlag;
  other_position_type: string | null;
  address: string;
  province: IIdNameFlag;
  district: IIdNameFlag;
  ward: IIdNameFlag;
  lane_width: IIdNameFlag;
  description: string;
  collateral_value: IIdValue;
  max_percentage: IIdValue | null;
  documents?: IResDocument[];
  subType: ISubTypeGet[];
  price_cert_uuid: string;
  code: string | null;
  los_uuid: string;
}
export interface ILOANNormalStorageV2CollateralForm {
  code: string | null;
  is_collateral: boolean;
  data: ICollateralData;
}
export interface ICollateralData {
  dashboard: [];
  collaterals: ICollateralFormGet[];
}

///full info legal
export interface ILOANNormalCollateralV2StateFullInfoLegalOwners {
  full_name: string;
  uuid: string;
  identity_num: string;
  mobile_num: string;
  telephone_num: string;
  date_of_birth: number;
  mail: string;
  gender: string;
  issued_date: number;
  expired_date: number;
  place_of_issue: string;
  addressPermanent: string;
  provincePermanent: string;
  disctrictPermanent: string;
  wardPermanent: string;
  addressContact: string;
  provinceContact: string;
  disctrictContact: string;
  wardContact: string;
  type: string;
}

export type IValueOnChangeCollateral =
  | string
  | number
  | null
  | ILOANNormalDocument[];
export type ITypeActionSaveDocumentCollateralMetaData = {
  type:
    | 'CollaretalType'
    | 'LandCTXD'
    | 'LandCTXDGCN'
    | 'No-RealEstate'
    | 'Certificate'
    | 'Authorize';
  extraData?: any;
};
export type ITypeActionSaveDocumentCollateral = PayloadAction<
  ILOANNormalDocument[],
  string,
  ITypeActionSaveDocumentCollateralMetaData
>;
export type ITypeMappingAction<T> = PayloadAction<ILOANNormalFile[], string, T>;

export type ITypeMappingDocumentAction<T> = PayloadAction<
  ILOANNormalDocument[],
  string,
  T
>;
