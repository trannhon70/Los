import { IDefaultFlag, IIdCodeName, IIdNameValue } from "types/base";
import { ICollateralType } from "../configs/CollateralType";

export interface ILOANNormalStorageCollateralValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
}

export interface ILOANNormalStorageCollateralForm {
  id: string;
  name: string
  data: ICollateralInfo;
}

export interface ILOANNormalStorageCollateralState {
  dashboard: IDashboard[];
  collaterals: ICollateral[];
  validate: ILOANNormalStorageCollateralValidate;
}

export interface ICollateralInfo {
  dashboard: IDashboard[];
  collaterals: ICollateral[];
}

export interface IDashboard {
  id: string;
  name: string;
  quantity: number;
}

export interface ICollateral {
  collateral_type: ICollateralType
  items: Iitems[];
}

export interface Iitems {
  item_order: number | null;
  item_name: string;
  code: string;
  basic_info: IBasicInfo;
  details_info: IDetailInfo;
  used_other_contract_flag: boolean;
  owner_wrapper: IOwnerWrapper;
}

export interface ICollateralStatus {
  id: string;
  name: string;
}

export interface IBasicInfo {
  address: string;
  certificate_number: string;
  province_info: string;
  district_info: string;
  ward_info: string;
  collateral_status: string;
  collateral_sub_type: string;
}

export interface IDetailInfo {
  description: string;
  market_name: string;
  block: string;
  floor: string;
  brand_name: string;
  start_date: number | null;
  end_date: number | null;
  used_rest: number | null;
  area: number | null;
  price: number | null;
  loan_rate: number | null;
  collateral_land?: ICollateralLand;
  collateral_land_asset?: ICollateralLandAsset;
  collateral_apartment?: ICollateralApartmentAsset;
}

export interface ICollateralLand {
  address?: string ;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  land_number?: string;
  map_number?: string;
  area?: number | null;
  real_area?: number | null;
  expiry_date?: number | null;
  land_source?: string;
  price?: number | null;
}

export interface ICollateralLandAsset {
  address?: string;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  building_area?: number | null;
  certificate_area?: number | null; // dt phap ly
  real_area?: number | null; // dt thuc te
  expiry_date?: number | null;
  owner_type?: string;
  price?: number | null;
}

export interface ICollateralApartmentAsset {
  address?: string;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  apartment_number?: string;
  block?: string;
  floor?: string;
  contract_number?: string;
  contract_name?: string;
  contract_date?: number | null;
  expiration_date?: number | null;
  area?: number | null; // diện tích pháp lý
  carpet_area?: number | null; // diện tích thực tế
  price?: number | null;
}
export interface IAdditionalInfo {
  used_other_contract_flag: boolean;
}

export interface IOwnerWrapper {
  code: string;
  name: string;
  owner_item: IOwnerItem[];
}

export interface IOwnerItem {
  basic_info: IOwnerItemBasicInfo;
  identity_info: IOwnerItemIdentityInfo[];
  address_info: IOwnerItemAddressInfo[];
  uuid: string;
}

export interface IOwnerItemBasicInfo {
  full_name: string;
  date_of_birth: number | null;
  mobile_num: string;
}

export interface IOwnerItemIdentityInfo {
  uuid: string;
  identity_type: string;
  identity_num: string;
  issued_date: number | null;
  expired_dates: number | null;
  place_of_issue: string;
  primary_flag: boolean;
}

export interface IOwnerItemAddressInfo {
  permanent_address: IAddressNoraml;
  contact_address: IAddressNoraml;
}

export interface IAddressNoraml {
  address: string;
  province_code: string;
  district_code: string;
  ward_code: string;
}

export interface IMarriageRelationship {
  id: string;
  name: string;
}

export const enum MODAL_NAME {
  SELF = "SELF",
  CO_BORROWER ="CO_BORROWER",
  THIRD_PARTY= "THIRD_PARTY" ,
  SEPARATE_PROPERTY = "SEPARATE_PROPERTY" ,
}

export const  OWNER_WRAPPER_NAME : any = {
  SELF : "Chính chủ",
  CO_BORROWER : "Đồng sở hữu",
  THIRD_PARTY : "Bên thứ ba",
  SEPARATE_PROPERTY : "Tài sản riêng vợ/chồng",
}

///////////////////////////////////////////
////Interface API

export interface ICollateralAPIState {
  name: string;
  id: string;
  data: ICollateralAPI;
}

export interface ICollateralAPI {
  dashboard: Dashboard[];
  collaterals: Collateral[];
}

export interface Collateral {
  collateral_type?: Collateraltype;
  items: ICollateralDetails[];
}

export interface ICollateralDetails {
  item_order: number;
  item_name: string;
  collateral_code: string;
  basic_info: Basicinfo;
  details_info: Detailsinfo;
  additional_info: Additionalinfo;
  owner_wrapper: Ownerwrapper;
  uuid: string;
}

export interface Ownerwrapper {
  relationship_type: string;
  relationship_type_desc: string;
  owners: Owner[];
}

export interface Owner {
  basic_info: BasicinfoOwner;
  identity_info: IIdentityOwnerAPI[];
  address_info: IAddressOwnerAPI[];
  uuid: string;
}
export interface IAddressOwnerAPI {
  permanent_address: IAddressAPI,
  contact_address: IAddressAPI,
}
export interface IAddressAPI {
  address: string,
  province_info: {
    province_code: string,
    province_name: string
  },
  district_info: {
    district_code: string,
    district_name: string
  },
  ward_info: {
    ward_code: string,
    ward_name: string
  }
}

export interface IIdentityOwnerAPI {
  uuid: string
  identity_type: IIdCodeName & IDefaultFlag,
  identity_num: string,
  issued_date: number,
  expired_dates: number,
  place_of_issue: string,
  primary_flag: boolean
}

export interface BasicinfoOwner {
  fullname: string;
  date_of_birth: number;
  mobile: string;
}

export interface Additionalinfo {
  used_other_contract_flag: boolean;
}

export interface Detailsinfo {
  description: string;
  market_name?: string;
  block?: string;
  floor?: string;
  brand_name?: string;
  start_date?: number;
  end_date?: number;
  used_rest?: IIdNameValue<string, string, number>;
  area?: IIdNameValue<string, string, number>;
  price: IIdNameValue<string, string, number>;
  loan_rate?: IIdNameValue<string, string, number>;
  uuid?: string;
  collateral_land: CollateralLandAPI[];
  collateral_land_asset: CollateralLandAssetAPI[];
  collateral_apartment: CollateralApartmentAPI[];
  max_rate?: IIdNameValue<string, string, number>;
}

export interface CollateralApartmentAPI {
  address: string;
  province: Province;
  district: District;
  ward: Ward;
  apartment_number: string;
  block: string;
  floor: string;
  contract_number: string;
  contract_name: string;
  contract_date: number;
  expiration_date: IIdNameValue<string, string, number>;
  area: IIdNameValue<string, string, number>;
  carpet_area: IIdNameValue<string, string, number>;
  price: IIdNameValue<string, string, number>;
  uuid: string;
}

export interface CollateralLandAssetAPI {
  address: string;
  province: Province;
  district: District;
  ward: Ward;
  building_area: IIdNameValue<string, string, number>;
  certificate_area: IIdNameValue<string, string, number>;
  real_area: IIdNameValue<string, string, number>;
  expiry_date: IIdNameValue<string, string, number>;
  owner_type: string;
  price: IIdNameValue<string, string, number>;
  uuid: string;
}

export interface CollateralLandAPI {
  address: string;
  province: Province;
  district: District;
  ward: Ward;
  land_number: string;
  map_number: string;
  area: IIdNameValue<string, string, number>;
  real_area: IIdNameValue<string, string, number>;
  expiry_date: IIdNameValue<string, string, number>;
  land_source?: string;
  price?: IIdNameValue<string, string, number>;
  uuid: string;
}

export interface Basicinfo {
  address?: string;
  province?: Province;
  district?: District;
  ward?: Ward;
  collateral_status: Collateralstatus;
  certificate_number?: string;
  collateral_sub_type: Collateralsubtype;
  uuid: string;
  license_number?: string;
  license_plate?: string;
}

export interface Collateralsubtype {
  collateral_sub_type: string;
  collateral_sub_type_desc: string;
}
export interface Collateralstatus {
  id: string;
  name: string;
}

export interface Ward {
  ward_code: string;
  ward_name: string;
}

export interface District {
  district_code: string;
  district_name: string;
}

export interface Province {
  province_code: string;
  province_name: string;
}

export interface Collateraltype {
  collateral_type_desc: string;
  collateral_type: string;
}

export interface Dashboard {
  id: string;
  code: string;
  name: string;
  is_default: string;
  quantity: number;
}