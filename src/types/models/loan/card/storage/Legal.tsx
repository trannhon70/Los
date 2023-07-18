import { IDefaultFlag, IIdCodeName } from "types";
import { IBranchBase } from "types/models/Account";
import { ICountry } from "../configs/Country";
import { IDistrict } from "../configs/District";
import { IProvince } from "../configs/Province";
import { IWard } from "../configs/Ward";
export interface ILOANCardStorageLegalValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
}

export interface ILOANCardStorageLegalDeclareBasic {
  uuid: string;
  avatar: string;
  full_name: string;
  date_of_birth: number | null;
  place_of_birth: string;
  customer_type_info: string;
  gender_info: string;
  country_info: string;
  marital_status_info: string;
  current_house_owner_status_info: string;
  dependent_person_over_18: number;
  dependent_person_under_18: number;
  telephone_num: string;
  mobile_num: string;
  email: string;
  educational_status_info: string;
  economic_profession_info: string;
  customer_family_relationship_info: string;
  cif_info: string;
}

export interface ILOANCardStorageLegalDeclareCardHolder
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "place_of_birth"
    | "customer_type_info"
    | "gender_info"
    | "country_info"
    | "marital_status_info"
    | "current_house_owner_status_info"
    | "dependent_person_over_18"
    | "dependent_person_under_18"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "educational_status_info"
    | "economic_profession_info"
  > {}

export interface ILOANCardStorageLegalDeclareMarriage
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "place_of_birth"
    | "gender_info"
    | "country_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
  > {}

export interface ILOANCardStorageLegalDeclareSuppCard
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "gender_info"
    | "country_info"
    | "marital_status_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalDeclareRelated
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "gender_info"
    | "mobile_num"
    | "email"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalDeclareReference
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    "uuid" | "avatar" | "full_name" | "cif_info"
  > {}

export interface ILOANCardStorageLegalDeclareOther
  extends Pick<
    ILOANCardStorageLegalDeclareBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "place_of_birth"
    | "gender_info"
    | "country_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalDeclareOtherInfo {
  average_income_3m_amount: string;
  authentication_question_info: string[];
}

export interface ILOANCardStorageDeclareIdentity {
  id: string;
  uuid: string;
  identity_type: string;
  identity_num: string;
  issued_date: number | null;
  expired_date: number | null;
  place_of_issue: string;
  primary_flag: boolean;
}

export interface ILOANCardStorageReferenceDeclareIdentity
  extends Pick<
    ILOANCardStorageDeclareIdentity,
    "id" | "uuid" | "identity_type" | "identity_num"
  > {}

export interface ILOANCardStorageDeclareAddress {
  id: string;
  uuid: string;
  address_type: string;
  address: string;
  province_info: string;
  district_info: string;
  ward_info: string;
  primary_flag: boolean;
  resident_status_info: string;
  fcc_location: string;
  remaining_time_vn: string;
  name_working_unit: string;
}

export interface ILOANCardStorageSuppCardDeclareAddress
  extends Pick<
    ILOANCardStorageDeclareAddress,
    | "id"
    | "uuid"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
  > {}

export interface ILOANCardStorageRelatedDeclareAddress
  extends Pick<
    ILOANCardStorageDeclareAddress,
    | "id"
    | "uuid"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
  > {}

export interface ILOANCardStorageOtherDeclareAddress
  extends Pick<
    ILOANCardStorageDeclareAddress,
    | "id"
    | "uuid"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
  > {}



export interface ILOANCardStorageLegalCardHolderDeclareState {
  uuidRemote: string;
  uuid: string;
  declare: string[];
  basic_info: ILOANCardStorageLegalDeclareCardHolder;
  other_info: ILOANCardStorageLegalDeclareOtherInfo;
  identity_info: ILOANCardStorageDeclareIdentity[];
  address_info: ILOANCardStorageDeclareAddress[];
}

export interface ILOANCardStorageLegalMarriageDeclareState {
  uuidRemote: string;
  uuid: string;
  sup_card_info: string;
  basic_info: ILOANCardStorageLegalDeclareMarriage;
  identity_info: ILOANCardStorageDeclareIdentity[];
  address_info: ILOANCardStorageDeclareAddress[];
}

export interface ILOANCardStorageLegalSuppCardDeclareState {
  uuidRemote: string;
  uuid: string;
  basic_info: ILOANCardStorageLegalDeclareSuppCard;
  authentication_question_info: string;
  identity_info: ILOANCardStorageDeclareIdentity[];
  address_info: ILOANCardStorageSuppCardDeclareAddress[];
}

export interface ILOANCardStorageLegalRelatedDeclareState {
  uuidRemote: string;
  uuid: string;
  basic_info: ILOANCardStorageLegalDeclareRelated;
  address_info: ILOANCardStorageRelatedDeclareAddress;
}

export interface ILOANCardStorageLegalReferenceDeclareState {
  uuidRemote: string;
  uuid: string;
  basic_info: ILOANCardStorageLegalDeclareReference;
  identity_info: ILOANCardStorageReferenceDeclareIdentity[];
}

export interface ILOANCardStorageLegalOtherDeclareState {
  uuidRemote: string;
  uuid: string;
  basic_info: ILOANCardStorageLegalDeclareOther;
  identity_info: ILOANCardStorageDeclareIdentity[];
  address_info: ILOANCardStorageDeclareAddress[];
}

export interface ILOANCardStorageLegalCardHolderState {
  data: ILOANCardStorageLegalCardHolderDeclareState;
  validate: ILOANCardStorageLegalValidate;
}
export interface ILOANCardStorageLegalMarriageState {
  data: ILOANCardStorageLegalMarriageDeclareState;
}
export interface ILOANCardStorageLegalSuppCardState {
  data: {
    active: number | null;
    info: ILOANCardStorageLegalSuppCardDeclareState[];
  };
  // validate:
}

export interface ILOANCardStorageLegalRelatedState {
  data: {
    active: number | null;
    info: ILOANCardStorageLegalRelatedDeclareState[];
  };
}

export interface ILOANCardStorageLegalReferenceState {
  data: ILOANCardStorageLegalReferenceDeclareState;
}

export interface ILOANCardStorageLegalOtherState {
  data: {
    active: number | null;
    info: ILOANCardStorageLegalOtherDeclareState[];
  };
}

////////////////////////////////////////////////////////////////////////////////////////
export interface ILOANCardStorageLegalBasic {
  avatar: string;
  full_name: string;
  date_of_birth: number;
  place_of_birth: string;
  telephone_num: string | null;
  mobile_num: string;
  email: string | null;
  customer_type_info: IIdCodeName;
  gender_info: IIdCodeName;
  country_info: ICountry;
  marital_status_info: IIdCodeName;
  current_house_owner_status_info: IIdCodeName;
  dependent_person_over_18: number;
  dependent_person_under_18: number;
  educational_status_info: IIdCodeName;
  economic_profession: IIdCodeName;
  customer_family_relationship_info: IIdCodeName & IDefaultFlag;
  economic_profession_info: IIdCodeName;
  tax_code_or_identity: string | null;
  cif_info: {
    cif_num: string | null;
  };
  uuid: string;
}
export interface ILOANCardStorageLegalCardHolder
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "place_of_birth"
    | "customer_type_info"
    | "gender_info"
    | "country_info"
    | "marital_status_info"
    | "current_house_owner_status_info"
    | "dependent_person_over_18"
    | "dependent_person_under_18"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "educational_status_info"
    | "economic_profession_info"
  > {}
export interface IIdCodeValue {
  id: string;
  code: string;
  value: string;
}

export interface IDisplay {
  display_order: number;
}

export interface IUUID {
  uuid: string;
}

export interface IAuthenticateQuestionData {
  authentication_question_info: IIdCodeValue & IDisplay & IUUID;
}

export interface ILOANCardStorageLegalOther {
  fatca_info: IIdCodeName;
  average_income_3m_amount: IIdCodeName & IDefaultFlag & IDisplay & IUUID;
  career_info: IIdCodeName;
  note: string | null;
  authentication_question_info: IIdCodeValue & IDisplay & IUUID;
}

export interface ILOANCardStorageLegalIdentityData {
  identity_type: IIdCodeName;
  identity_num: string;
  issued_date: number;
  expired_date: number;
  place_of_issue: string;
  primary_flag: boolean;
  uuid: string;
}

export interface ILOANCardStorageLegalIdentityInfo {
  data: ILOANCardStorageLegalIdentityData[];
}

export interface ILOANCardStorageLegalAddressData {
  fcc_resident_flag: boolean;
  fcc_location: string;
  address_type: IIdCodeName;
  address: string;
  province_info: IProvince;
  district_info: IDistrict;
  ward_info: IWard;
  primary_flag: boolean;
  remaining_time_vn: IIdCodeName;
  name_working_unit: string;
  uuid: string;
  resident_status_info: IIdCodeName;
}
export interface ILOANCardStorageLegalAddressInfo {
  data: ILOANCardStorageLegalAddressData[];
}

///////////////////////////////////////////////////////
// Inteface CardHolder
///////////////////////////////////////////////////////
export interface ILOANCardStorageLegalCardHolderBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "customer_type_info"
    | "place_of_birth"
    | "gender_info"
    | "country_info"
    | "marital_status_info"
    | "current_house_owner_status_info"
    | "dependent_person_over_18"
    | "dependent_person_under_18"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "educational_status_info"
    | "economic_profession_info"
    | "uuid"
  > {}

export interface ILOANCardStorageLegalCardHolderOther
  extends Pick<
    ILOANCardStorageLegalOther,
    "average_income_3m_amount" | "authentication_question_info"
  > {}

export interface ILOANCardStorageLegalCardHolderIdentityData
  extends Pick<
    ILOANCardStorageLegalIdentityData,
    | "identity_type"
    | "identity_num"
    | "issued_date"
    | "expired_date"
    | "place_of_issue"
    | "primary_flag"
    | "uuid"
  > {}

export interface ILOANCardStorageLegalCardHolderIdentityInfo {
  data: ILOANCardStorageLegalCardHolderIdentityData[];
}
export interface ILOANCardStorageLegalCardHolderAddressData
  extends Pick<
    ILOANCardStorageLegalAddressData,
    | "fcc_resident_flag"
    | "fcc_location"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
    | "remaining_time_vn"
    | "name_working_unit"
    | "uuid"
  > {}

export interface ILOANCardStorageLegalCardHolderAddressInfo {
  data: ILOANCardStorageLegalCardHolderAddressData[];
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// Inteface Marriage
///////////////////////////////////////////////////////
export interface ILOANCardStorageLegalMarriageSuppCardInfo {
  sup_card_info: IIdCodeName & IDefaultFlag;
}

export interface ILOANCardStorageLegalMarriageBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "place_of_birth"
    | "gender_info"
    | "country_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
  > {}

export interface ILOANCardStorageLegalMarriageIdentityData
  extends Pick<
    ILOANCardStorageLegalIdentityData,
    | "uuid"
    | "identity_type"
    | "identity_num"
    | "issued_date"
    | "expired_date"
    | "place_of_issue"
    | "primary_flag"
  > {}

export interface ILOANCardStorageLegalMarriageIdentityInfo {
  data: ILOANCardStorageLegalMarriageIdentityData[];
}

export interface ILOANCardStorageLegalMarriageAddressData
  extends Pick<
    ILOANCardStorageLegalAddressData,
    | "fcc_location"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
    | "remaining_time_vn"
    | "name_working_unit"
    | "uuid"
    | "resident_status_info"
  > {}

export interface ILOANCardStorageLegalMarriageAddressInfo {
  data: ILOANCardStorageLegalMarriageAddressData[];
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// Inteface SuppCard
///////////////////////////////////////////////////////
export interface ILOANCardStorageLegalSuppCardBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "gender_info"
    | "country_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "uuid"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalSuppCardAuthen
  extends IAuthenticateQuestionData {}

export interface ILOANCardStorageLegalSuppCardIdentityData
  extends Pick<
    ILOANCardStorageLegalIdentityData,
    | "identity_type"
    | "identity_num"
    | "issued_date"
    | "expired_date"
    | "place_of_issue"
    | "primary_flag"
    | "uuid"
  > {}

export interface ILOANCardStorageLegalSuppCardIdentityInfo {
  data: ILOANCardStorageLegalSuppCardIdentityData[];
}

export interface ILOANCardStorageLegalSuppCardAddressData
  extends Pick<
    ILOANCardStorageLegalAddressData,
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
    | "uuid"
  > {}

export interface ILOANCardStorageLegalSuppCardAddressInfo {
  data: ILOANCardStorageLegalSuppCardAddressData[];
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// Inteface Related
///////////////////////////////////////////////////////
export interface ILOANCardStorageLegalRelatedBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "gender_info"
    | "mobile_num"
    | "email"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalRelatedAddressData
  extends Pick<
    ILOANCardStorageLegalAddressData,
    | "uuid"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
  > {}

export interface ILOANCardStorageLegalRelatedAddressInfo {
  data: ILOANCardStorageLegalRelatedAddressData[];
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// Inteface Reference
///////////////////////////////////////////////////////

export interface ILOANCardStorageLegalReferenceBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    "uuid" | "avatar" | "full_name" | "cif_info"
  > {}

export interface ILOANCardStorageLegalReferenceIdentityData
  extends Pick<
    ILOANCardStorageLegalIdentityData,
    "uuid" | "identity_type" | "identity_num"
  > {}

export interface ILOANCardStorageLegalReferenceIdentityInfo {
  data: ILOANCardStorageLegalReferenceIdentityData[];
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// Inteface Other
///////////////////////////////////////////////////////
export interface ILOANCardStorageLegalOtherBasic
  extends Pick<
    ILOANCardStorageLegalBasic,
    | "uuid"
    | "avatar"
    | "full_name"
    | "date_of_birth"
    | "gender_info"
    | "country_info"
    | "telephone_num"
    | "mobile_num"
    | "email"
    | "customer_family_relationship_info"
  > {}

export interface ILOANCardStorageLegalOtherIdentityData
  extends Pick<
    ILOANCardStorageLegalIdentityData,
    | "uuid"
    | "identity_type"
    | "identity_num"
    | "issued_date"
    | "expired_date"
    | "place_of_issue"
    | "primary_flag"
  > {}

export interface ILOANCardStorageLegalOtherIdentityInfo {
  data: ILOANCardStorageLegalOtherIdentityData[];
}

export interface ILOANCardStorageLegalOtherAddressData
  extends Pick<
    ILOANCardStorageLegalAddressData,
    | "uuid"
    | "address_type"
    | "address"
    | "province_info"
    | "district_info"
    | "ward_info"
    | "primary_flag"
  > {}

export interface ILOANCardStorageLegalOtherAddressInfo {
  data: ILOANCardStorageLegalOtherAddressData[];
}
///////////////////////////////////////////////////////

export interface ILOANCardStorageLegalData {
  branch_info: IBranchBase;
  basic_info: ILOANCardStorageLegalBasic;
  other_info: ILOANCardStorageLegalOther;
  identity_info: ILOANCardStorageLegalIdentityInfo;
  address_info: ILOANCardStorageLegalAddressInfo;
  authentication_question_info: IAuthenticateQuestionData;
  total_document_file: number | null;
  document_info_list: null;
  sup_card_info: IIdCodeName & IDefaultFlag;
  note: string;
}

export interface ILOANCardStorageLegalCardHolderData
  extends Pick<
    ILOANCardStorageLegalData,
    | "branch_info"
    | "basic_info"
    | "other_info"
    | "identity_info"
    | "address_info"
    | "total_document_file"
    | "document_info_list"
  > {}

export interface ILOANCardStorageLegalSuppCardData
  extends Pick<
    ILOANCardStorageLegalData,
    | "basic_info"
    | "authentication_question_info"
    | "identity_info"
    | "address_info"
  > {}

export interface ILOANCardStorageLegalMarriageData
  extends Pick<
    ILOANCardStorageLegalData,
    | "sup_card_info"
    | "basic_info"
    | "identity_info"
    | "address_info"
    | "total_document_file"
    | "document_info_list"
  > {}

export interface ILOANCardStorageLegalRelatedData
  extends Pick<ILOANCardStorageLegalData, "basic_info" | "address_info"> {}

export interface ILOANCardStorageLegalReferenceData
  extends Pick<ILOANCardStorageLegalData, "basic_info" | "identity_info"> {}

export interface ILOANCardStorageLegalOtherData
  extends Pick<
    ILOANCardStorageLegalData,
    "basic_info" | "identity_info" | "address_info" | "note"
  > {}