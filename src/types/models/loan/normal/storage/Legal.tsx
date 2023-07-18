import { IDefaultFlag } from 'types';
import { IIdCodeName } from 'types/base';
import { IBranchBase } from 'types/models/Account';
import {
  ICountry,
  IDistrict,
  IProvince,
  IWard,
} from 'types/models/master-data/state';

export interface ILOANNormalStorageLegalValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: string;
}

export interface IParamDeleteLOANNormalStoredLegal {
  declare_type: string;
  los_uuid: string;
}
export interface ItypeAuto extends IParamDeleteLOANNormalStoredLegal {
  uuid_num: string;
  id_num: string;
}
export interface ILOANNormalStorageLegalInfo {
  id: string;
  name: string;
  data: ILOANNormalStorageLegalData[];
}
export interface ILOANNormalStorageLegalData {
  legal_type: string;
  branch_info: IBranchBase;
  basic_info: ILOANNormalStorageLegalBasic;
  other_info: ILOANNormalStorageLegalOther;
  identity_info: ILOANNormalStorageIdentity;
  address_info: ILOANNormalStorageLegalDeclareAddress;
  total_document_file: number | null;
  document_info_list: null;
}
export interface ILOANNormalStorageLegalDeclareBasic {
  person_uuid: string;
  fullname: string;
  customerType: string;
  birthday: number | null;
  placeOfBirth: string;
  gender: string;
  national: string;
  marriageStatus: string;
  ownerProperty: string;
  under18: number | null;
  over18: number | null;
  telephone: string;
  mobile: string;
  email: string;
  education: string;
  ecomonic: string;
  relationship: string;
  tax: string;
  cif: string;
}

export interface ILOANNormalStorageLegalBorrowerOther {
  fatca: string;
  career: string;
  income3Month: string;
  note: string;
}

export interface ILOANNormalStorageIdentity {
  type: string;
  num: string;
  issuedDate: number | null;
  expiredDate: number | null;
  placeOfIssue: string;
  primaryFlag: boolean;
  uuid: string;
  uuidRemote: string;
}

export interface ILOANNormalStorageAddress {
  apartment: string;
  province: string;
  district: string;
  ward: string;
  type: string;
  primaryFlag: boolean;
  uuid: string;
  uuidRemote: string;
}

export interface ILOANNormalStorageAddressCopy
  extends ILOANNormalStorageAddress {
  declareType: string;
  identityNum: string;
  declareName: string;
}

export interface ILOANNormalStorageLegalDeclareAddress {
  resident: string;
  location: string;
  address: ILOANNormalStorageAddress[];
}
export interface ILOANNormalStorageLegalDeclareState {
  cif?: string | null;
  uuidActiveLocal: string;
  declare: string[];
  basic: ILOANNormalStorageLegalDeclareBasic;
  other: ILOANNormalStorageLegalBorrowerOther;
  identity: ILOANNormalStorageIdentity[];
  address: ILOANNormalStorageLegalDeclareAddress;
  uuidActiveFile: string;
  document_info_list: ILOANNormalStorageLegalFile[];
}
export interface ILOANNormalStorageListContact {
  person_uuid: string;
}

export interface ILOANNormalStorageLegalState {
  data: {
    [name: string]: {
      uuidActiveLocal: string;
      listContactPersonUUID: string[] | number[];
      info: ILOANNormalStorageLegalDeclareState[];
    };
  };
  validate: ILOANNormalStorageLegalValidate;
  blacklist: ILOANNormalAlertBlackListData[] | null;
}
export interface ILegalStorageCoborrowDelete {
  uuids: string[];
}

////////////////////////////////////////////////////////////////////////////////////////

export interface ILOANNormalStorageLegalBasic {
  id: string;
  uuid: string;
  avatar: string;
  full_name: string;
  date_of_birth: number | null;
  customer_type_info: IIdCodeName;
  place_of_birth: string;
  gender_info: IIdCodeName & IDefaultFlag;
  country_info: ICountry;
  marital_status_info: IIdCodeName & IDefaultFlag;
  current_house_owner_status_info: IIdCodeName & IDefaultFlag;
  dependent_person_over_18: number;
  dependent_person_under_18: number;
  telephone_num: string | null;
  mobile_num: string | null;
  email: string | null;
  educational_status_info: IIdCodeName;
  economic_profession_info: IIdCodeName;
  customer_family_relationship_info: IIdCodeName & IDefaultFlag;
  tax_code_or_identity: string | null;
  cif_data: {
    cif_num: string | null;
  };
}
export interface ILOANNormalStorageLegalBasicBorrower {
  id: string;
  uuid: string;
  avatar: string;
  full_name: string;
  date_of_birth: number | null;
  customer_type_info: IIdCodeName;
  place_of_birth: string;
  gender_info: IIdCodeName & IDefaultFlag;
  country_info: ICountry;
  marital_status_info: IIdCodeName & IDefaultFlag;
  current_house_owner_status_info: IIdCodeName & IDefaultFlag;
  dependent_person_over_18: number;
  dependent_person_under_18: number;
  telephone_num: string | null;
  mobile_num: string | null;
  email: string | null;
  educational_status_info: IIdCodeName;
  economic_profession_info: IIdCodeName;
}
/////legal get data api
export interface ILoanNormalLegalAPI {
  id: string;
  name: string;
  data: {
    borrower: ILOANNormalLegalBor;
    marriage: ILOANNormalLegalBorrower | null;
    co_brw: ILOANNormalLegalBorrower[];
    co_payer: ILOANNormalLegalBorrower[];
    law_rlt: ILOANNormalLegalReLrt[];
    related: ILOANNormalLegalRelated;
    others: ILOANNormalLegalBorrower[];
  };
}
export interface ILOANNormalLegalContact {
  other_person: string;
}

export interface ILOANNormalLegalRelated {
  person_los: IListPersion[];
  other_person: ILOANNormalLegalRe[];
}

export interface IListPersion {
  person_uuid: string;
}

export interface ILOANNormalLegalBor {
  branch_info?: IBranchBase;
  relationship_type?: [];
  basic_info: ILOANNormalStorageLegalBasicBorrower;
  other_info: ILOANNormalStorageLegalOther;
  identity_info: ILOANNormalStorageLegalIdentityData[];
  address_info: ILOANNormalStorageLegalAddressData[];
  total_document_file?: number | null;
  document_info_list?: ILOANNormalStorageLegalFile[];
  cif?: string | null;
}

export interface ILOANNormalLegalBorrower {
  branch_info?: IBranchBase;
  relationship_type?: [];
  basic_info: ILOANNormalStorageLegalBasic;
  other_info: ILOANNormalStorageLegalOther;
  identity_info: ILOANNormalStorageLegalIdentityData[];
  address_info: ILOANNormalStorageLegalAddressData[];
  note: string;
  total_document_file: number | null;
  document_info_list: ILOANNormalStorageLegalFile[];
  cif?: string | null;
}

export interface ILOANNormalLegalRelatedResponse {
  branch_info: IBranchBase;
  relationship_type: [];
  basic_info: ILOANNormalStorageLegalBasic;
  other_info: ILOANNormalStorageLegalOther;
  identity_info: ILOANNormalStorageLegalIdentityData;
  address_info: ILOANNormalStorageLegalAddressData[];
  total_document_file: number | null;
  document_info_list: ILOANNormalStorageLegalFile[];
  note: string;
}

export interface ILOANNormalLegalReLrt {
  basic_info: ILOANNormalStorageLegalBasic;
  identity_info: ILOANNormalStorageLegalIdentityData;
  address_info: ILOANNormalStorageLegalAddressData;
  total_document_file: number | null;
  document_info_list: ILOANNormalStorageLegalFile[];
  note: string;
}

export interface ILOANNormalLegalRe {
  branch_info: IBranchBase;
  relationship_type: [];
  basic_info: ILOANNormalStorageLegalBasic;
  address_info: ILOANNormalStorageLegalAddressData;
  total_document_file: number | null;
  document_info_list: ILOANNormalStorageLegalFile[];
}

export interface ILOANIdentityBorrower {}

export interface ILOANNormalStorageLegalOther {
  fatca_info: ILOANNormalLegalFatca;
  average_income_3m_amount: ILOANNormalLegalFatca;
  career_info: ILOANNormalLegalFatca;
  note?: string | null;
}

export interface ILOANNormalLegalFatca extends IIdCodeName {
  uuid: string;
}

export interface ILOANNormalStorageLegalIdentityData {
  identity_type: IIdCodeName & IDefaultFlag;
  identity_num: string;
  issued_date: number | null;
  expired_date: number | null;
  place_of_issue: string;
  primary_flag: boolean;
  uuid: string;
  id: string;
}

export interface ILOANNormalStorageLegalAddressData {
  fcc_resident_flag: boolean;
  fcc_location: string;
  address_type: IIdCodeName & IDefaultFlag;
  address: string;
  province_info: IProvince;
  district_info: IDistrict;
  ward_info: IWard;
  primary_flag: boolean;
  uuid: string;
  id: string;
  resident_status_info: IIdCodeName & IDefaultFlag;
}

export interface ILOANNormalStorageLegalFile {
  uuidActiveFile: string;
  document_id: string | number;
  document_name: string;
  child_files: ILOANNormalChildFile[];
}
export interface CUSTOM_KEY_FILE {
  idDoc: string;
  local_id: string;
  description?: string;
}
export interface ILOANNormalChildFile {
  file_id: number | null;
  uuid: string;
  name: string;
  display_order: number | null;
  description: string;
  content_type: string;
  created_by: string;
  created_by_name: string;
  updated_at: number | null;
  updated_by: string;
  updated_by_name: string;
  created_at: number | null;
  file_upload: string;
  custom_keys?: CUSTOM_KEY_FILE;
}

export interface ILOANNormalUpload {
  declare: string;
  uuidUser: string;
  dataFile: ILOANNormalStorageLegalFile[];
  type: string;
}

export interface ILOANNormalAlertBlackListData {
  name: string;
  identity_num: string;
  cif_num: string;
  job_content: string;
  reason: string;
  updated_at: number;
}
