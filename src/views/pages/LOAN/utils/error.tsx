import { IError } from "types/api";
import { parseError } from "utils/api";
import { ILOANNormalStorageLegalValidate } from 'types/models/loan/normal/storage/Legal';

const MAPPING_FIELDS = {
  full_name: 'fullname',
  customer_type_info: 'customerType',
  date_of_birth: 'birthday',
  gender_info: 'gender',
  country_info: 'national',
  marital_status_info: 'marriageStatus',
  email: 'email',
  telephone_num: 'telephone',
  mobile_num: 'mobile',
  current_house_owner_status_info: 'ownerProperty',
  dependent_person_over_18: 'over18',
  dependent_person_under_18: 'under18',
  educational_status_info: 'education',
  economic_profession: 'ecomonic',
  customer_family_relationship_info: 'relationship',
  tax_code_or_identity: 'tax',
  cif_data: 'cif',
  // address_type: 'addressType',
  address: 'addressApartment',
  province_info: 'addressProvince',
  district_info: 'addressDistrict',
  ward_info: 'addressWard',
}

const MAPPING_DECLARE = {
  BORROWER: 'borrower',
  MARRIAGE: 'marriage',
  CO_BRW: 'co-borrower',
  CO_PAYER: 'co-payer',
  LAW_RLT: 'legal-related',
  RELATED: 'contact'
}

export const mappingNormalLegalError = () => {
  return 0;
}