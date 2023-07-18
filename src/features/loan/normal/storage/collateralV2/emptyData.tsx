////// quyen tai san ////

import { generateUUID } from "utils";
import { ESubtypeRest } from "./case";


export const generateName = (type: string) => {
  switch (type) {
    case "REST":
      return "Bất động sản"
    default:
      return ""
  }
}

export const generateEmptyData = () => ({
  carousel: [],
  uuidActiveData: generateUUID(),
  is_collapse_type: true,
  type: "",
  status: "",
  is_compactness: "Y",
  valuation_id: "",
  valuation_date: null,
  valuation_unit_type: "",
  valuation_unit: "",
  valuation_center: "",
  valuation_center_opinion: "",
  independence_organization: "",
  other_independence_organization: "",
  purpose: "",
  other_purpose: "",
  address: "",
  province: "",
  district: "",
  ward: "",
  position_type: "",
  other_position_type: "",
  lane_width: "",
  description: "",
  collateral_value: null,
  max_percentage: null,
  uuidActiveSubtype: generateUUID(),
  sub_type: [{
    id: '',
    uuidActiveSubtype: generateUUID(),
    uuidItemsActive: generateUUID(),
    items: []
  }],
})


export const generateEmptyDataCollateralType = () => ({
  uuidActive: generateUUID(),
  collateral_type: '',
  items: []
})
export const generateEmptyDataCollateralSubType = () => ({
  activeUUID: generateUUID(),
  departmentActiveUUID:'',
  maketActiveUuid: '',
  activeUUIDCertificateUsePurposes:'',
  current_value_item: null,
  departmentInfoActiveUUID:'',
  type_land: ESubtypeRest.LAND, 
  ratio: null,
  value: null,
  typeCollateral: '',
  license: '',
  status: '',
  status_flag:null,
  description: '',
  collateral_value: null,
  collateral_code: "",
  issuer:"106",
  other_issuer: "",
  from_credit_extension: "Y",
  is_exploited: "Y",
  credit_extension_secured: "Y",
  non_business_area: null,
  max_percentage: null,
  has_land_asset: "N",
  value_of_land: null,
  has_certificated_land_asset: "N",
  has_certificate_maket: "N",
  land:{
    land_wrapper: generateEmptyDataLandWapper(),
    land_legal_information_owner: generateEmptyDataCollateralSubTypeLandLegalInformationOwner(),
    land_legal_infomation_asset: generateEmptyDataLegalLandInformatioAsset(),
    certificate_legal_info: generateEmptyDataCollateralSubTypeCertifiCate(), // thong tin pháp lý giấy chứng nhận
  },
  market: {
    maket_wrapper: generateEmptyDataLandWapper(),
    market_owner:generateEmptyDataCollateralSubTypeLandLegalInformationOwner(),
    maket_certificates: [],
    maket_info: generateEmptyDataMacketInfo(),
  },
  ctxd_land: generateEmptyDataCollateralSubTypeCTXDLand(), // ctxd trên đất 
  ctxd_gcn_qsh: generateEmptyDataCtxdGcnQsh(),
  count: null, // machine
  year: null,// machine
  model: '',// machine
  production: '',// machine
  CLCL: '',// machine
  number_register: '',// machine
  quantity: null,// machine
  info_collatetal: '',// machine
  branch: '',// machine
  department:{
    has_certificate: "N",
    project_name: "",
    department_wrapper: generateEmptyDataLandWapper(),
    department_certificate_legal : [],
    department_info:[],
    department_info_land:{
      address: '',
      province: '',
      district: '',
      ward: '',
      certificate_address: '',
      certificate_province: '',
      certificate_district: '',
      certificate_ward: '',
      use_purposes: [],
      other_use_purpose: '',
      certificate_use_purposes: [],
    },
    department_owner:generateEmptyDataCollateralSubTypeLandLegalInformationOwner(),

  },
  transportation_sub_type:"",  // PTVT
  other_transportation_sub_type: "", // PTVT
  brand: "",// PTVT
  other_brand: "",//PTVT
  origin_of_production:"",// PTVT
  other_origin_of_production: "",// PTVT
  legal_document_types:[],// PTVT
  license_number:"",// PTVT
  vehicle_identification_number:"",// PTVT
  engine_number: "",// PTVT
  license_plate: "",// PTVT
  remain_quality: null,// PTVT,
  owner_wrapper: generateEmptyDataCollateralSubTypeLandLegalInformationOwner(),
  price_cert_asset_uuid:"",
  land_const_uuid: ""
})

export const generateEmptyDataLandWapper = () => ({  // type can ho chung cu BDS
  from_credit_extension:"Y",
  is_exploited:"Y",
  credit_extension_secured:"Y",
  non_business_area: null,
  max_percentage:null,
  value_of_land: null,
  description:"",
  has_land_asset: "N",
  has_certificated_land_asset: "N",
  land_const_uuid: ""
})

export const generateEmptyDatacertificateUsePurposes = () => ({  // type can ho chung cu BDS
  activeUUIDCertificateUsePurposes:'',
  use_purpose: '',
  land_number:  '',
  map_number:  '',
  certificate_area:  '',
  real_area:  null,
  land_use_source:  "",
  other_land_use_source: '',
  duration: '',
  usage_form: '',
  other_usage_form: '',
  re_land_used_uuid: ''
})

export const generateEmptyDataDepartmentInfo = () => ({  // type can ho chung cu BDS
  departmentInfoActiveUUID:'',
  house_type: '', 
  apartment_type: '', 
  other_apartment_type: '',
  apartment_number:  '',
  block: '', 
  floor:  '',
  start_date:  null,
  certificate_area:  '',
  real_area:  null,
  usage_form:  '',
  duration: '',
  ownership_category: '',
  apart_room_uuid: ''
})
export const generateEmptyDataMaketCertificates = () => ({  //sssssssssss
  order: null,
  persons: [],
  uuid_maket_certificate: "",
  person_uuid: "",
  certificate_name: "",
  certificate_code: "",
  issue_date: null,
  place_of_issue: "",
  contract_name: "",
  contract_number: null,
  contract_code: "",
  contract_date: null,
  contract_unit: "",
  documents:[],
  market_cert_uuid: ""
})
export const generateEmptyDataDepartmentCertificates = () => ({
  order:  null,
  persons: [],
 // uuid_active_person: '',//
  uuid_certificate_legal: '',
  other_certificate_type:'', //1. Loại GCN (*)
  other_certificate_type_other:'', //2. Loại GCN khác(*)
  certificate_code:'', // 3. Số GCN
  certificate_no:  null, // 4. Số vào sổ cấp GCN (*)
  issue_date:  null, // 5. Số vào sổ cấp GCN (*)
  place_of_issue:'', // 6. noi cấp (*)
  contract_number_type:'', // 7. Loại hợp đồng (*)
  contract_number:'', //8. Số hợp đồng
  contract_date: null, // 9 ngày hop dong
  documents:[],
  apart_owner_cert_uuid: ''
})
export const generateEmptyDataDepartmentCertificatesUserList = () => ({
  other_certificate_type:'', //1. Loại GCN (*)
  other_certificate_type_other:'', //2. Loại GCN khác(*)
  certificate_code:'', // 3. Số GCN
  certificate_no:  null, // 4. Số vào sổ cấp GCN (*)
  issue_date:  null, // 5. Số vào sổ cấp GCN (*)
  place_of_issue:'', // 6. noi cấp (*)
  contract_number_type:'', // 7. Loại hợp đồng (*)
  contract_number:'', //8. Số hợp đồng
  contract_date: null, // 9 ngày hop dong
})

export const generateEmptyDataMaketCertificatePersion = () => ({   // json cho
  person_uuid: "",
  certificate_name: "",
  certificate_code: "",
  issue_date: null,
  place_of_issue: "",
  contract_name: "",
  contract_number: null,
  contract_code: "",
  contract_date: null,
  contract_unit: "",
})

export const generateEmptyDataMacketInfo = () => ({
  market_name: "",
  market_code: "",
  location: "",
  sector: "",
  start_date: null,
  end_date: null,
  remaining: null,
  used_area: null,
  value_area: null,
  structure: "",
})

export const generateEmptyDataCtxdGcnQsh = () => ({
  activeUuIdCtxdGcnQsh: "",
  ctxd_gcn_qsh_data: [],
})

export const generateEmptyDataCtxdGcnQshData = () => ({
  uuIdCtxdGcnQsh: "",
  land_legal_information_owner: generateEmptyDataCollateralSubTypeLandLegalInformationOwner(),
  certificate_legal_info: generateEmptyDataCollateralSubTypeCertifiCate(), // thong tin pháp lý giấy chứng nhận
  ctxd_gcn_qsh_land_info: generateEmptyDataCollateralSubTypeCtxdGcnqshLandInfo(), // ctxd trên đất 
  documents:[],
  land_const_uuid: ''
})

export const generateEmptyDataCollateralSubTypeLandLegalInformationOwner = () => ({
  active: 0,
  owner_type: "SELF",
  owner: []
})

export const generateEmptyDataCollateralSubTypeLandCTXD = () => ({
  activeUUIDCTXDLand: '',
  asset_legal: '', //1. Pháp lý CTXD
  legal_CTXD_other: '', //2. Pháp lý CTXD khác
  address: '', //3. Địa chỉ thực tế nhà ở/CTXD
  provice: '', //4. Tỉnh/TP
  district: '', //5. Quận/huyện
  ward: '', //6. Phường/xã
  certificate_address: '', //7. Địa chỉ thực tế nhà ở/CTXD
  certificate_province: '', //8. Tỉnh/TP
  certificate_district: '', //9. Quận/huyện
  certificate_ward: '', //10. Phường/xã
  activeUUIDtypeCTXD:'',
  dataTypeCTXD:[],
  land_const_item_uuid: ""
})

export const generateEmptyDataCollateralSubTypeCTXD = () => ({
  activeTypeCTXD: '',
  land_asset_type: '', //1. Loại công trình
  land_asset_type_other: '', //2. Loại công trình khác
  certificate_building_area: '', // 3. Diện tích xây dựng theo GCN (m2)
  building_area: '', // 4. Diện tích xây dựng thực tế (m2) 
  certificate_cross_floor_area: '', // 5. Diện tích sàn theo GCN (m2)
  cross_floor_area: '', // 6. Diện tích sàn thực tế (m2)
  certificate_used_area: '', //7. Diện tích sử dụng theo GCN (m2)
  used_area: '', //8. Diện tích sử dụng thực tế (m2)
  ownership_duration: '', //9. Thời hạn sở hữu
  owner_form: '', // 10. Hình thức sở hữu
  certificate_structure: '', //11. Kết cấu công trình theo GCN
  structure: '', //12. Kết cấu công trình thực tế
  certificate_rank: '', //13. Cấp (Hạng) theo GCN
  certificate_floors: '', //14. Số tầng theo GCN
  floors: '', //15. Số tầng thực tế
  duration_of_use: '', //16. Thời gian đưa vào sử dụng 
  land_const_item_detail_uuid: ''
})

export const generateEmptyDataCollateralSubTypeCertifiCate = () => ({
  dataCertificate: [],
  activeUUIDCertificate: '',
  
})

export const generateEmptyDataCollateralSubTypeCTXDLand = () => ({  /// ctxd trên đất loai BDS
  dataCTXDLand: [],
  ctx_land_wrapper: generateEmptyDataLandWapper(),
  activeCTXDLand: '',
})


export const generateEmptyDataCollateralSubTypeCtxdGcnqshLandInfo = () => ({  /// ctxd trên đất loai BDS
  dataCTXDLand: {
    activeUUIDCTXDLand: "",
    asset_legal: "", //1. Pháp lý CTXD
    legal_CTXD_other: "", //2. Pháp lý CTXD khác
    address: "", //3. Địa chỉ thực tế nhà ở/CTXD
    provice: "", //4. Tỉnh/TP
    district: "", //5. Quận/huyện
    ward: "", //6. Phường/xã
    certificate_address: "", //7. Địa chỉ thực tế nhà ở/CTXD
    certificate_province: "", //8. Tỉnh/TP
    certificate_district: "", //9. Quận/huyện
    certificate_ward: "", //10. Phường/xã
    activeUUIDtypeCTXD: "",
    dataTypeCTXD: [],
    land_const_item_uuid: ""
  },
  ctx_land_wrapper: generateEmptyDataLandWapper(),
  activeCTXDLand: '',
})


export const generateEmptyDataCollateralCertificateDetails = () => ({
  activeUUIDCertificate: '',
  dataCertificate: [],
})

export const generateEmptyDataCollateralCertificateUseListLegal = () => ({  // add field
  persons: [],
  activeUUIDUserListLegal: '',
  activeUUIDCertificateL: '',
  typeUseLand: '',
  typeGCN: '',
  numberGCNLegal: '',
  numberGCN: '',
  dateRange: null,
  dateLocation: '',
  documents:[],
  land_const_item_cert_uuid: '',
  land_cert_uuid:  ''
})

export const generateEmptyDataCollateralCertificateUseListLegalDetails = () => ({   /// userlise Legal // thong tin phap lý giay chung nhan
  activeUUIDUserListLegal: '',
  typeUseLand: '',
  typeGCN: '',
  numberGCNLegal: '',
  numberGCN: '',
  dateRange: null,
  dateLocation: '',
})


export const generateEmptyDataCollateralSubTypeLandOwner = () => ({
  person_uuid: "",
  has_authorize: "N",
  info_authorize: []
})

export const generateEmptyDataLegalLandInformatioAsset = () => ({
  asset_legal: "",
  address: "",
  province: "",
  district: "",
  ward: "",
  certificate_address: "",
  certificate_province: "",
  certificate_district: "",
  certificate_ward: "",
  purpose_using_lane: [],
  purpose_using_lane_other: "",
  land_asset_types: [],
  activeUUIDCertificateUsePurposes: ""
})

export const generateEmptyDataLandAssetType = () => ({
  uuidLandAssetType: generateUUID(),
  land_asset_type: "",
  other_asset_type: "",
  certificate_building_area: "",
  building_area: "",
  certificate_cross_floor_area: "",
  cross_floor_area: "",
  certificate_used_area: "",
  used_area: "",
  ownership_duration: "",
  owner_form: "",
  certificate_structure: "",
  structure: "",
  certificate_rank: "",
  certificate_floors: null,
  floors: null,
  duration_of_use: ""
})

export const generateEmptyDataCollateralSubTypeLandOwnerInfoAuthorize = () => ({
  name_ouwner_authorize: "",
  number_file: null,
  relationship_authorize_owner: "",
  relationship_authorize_borrower: "",
  contract_authorize: "",
})

////// quyen tai san /////

export const generateEmptyDataCollateralRPRO = () => ({
  uuidActive: '',
  order: null,
  los_uuid: '',
  collateral_type: '',
  is_compactness: 'Y',
  valuation_id: '',
  valuation_date: null,
  valuation_unit_type: '',
  valuation_unit: '',
  purpose: '',
  other_purpose: '',
  collateral_value: null,
  max_percentage: null,
})

export const generateEmptyDataCollateralRPROSubType = () => ({
  uuidActiveSubtype: '',
  is_collapse_sub_type: false,
  child_sub_type: '',
  uuidItemsActive: '',
  id: '',
  items: []
})

export const generateEmptyDataCollateralRPROItems = () => ({
  order: null,
  max_percentage: null,
  collateral_value: null,
  owner_wrapper: {
    owner_type: {
      id: '',
    },
    owners: []
  },
  detail: {
    name: '',
    license_number: '',
    status: {
      id: '',
    },
    description: ''
  }
})

export const generateEmptyDataOwner = () => ({  //sssssssssss
  person_uuid: '',
  has_authorize: 'N',
  active:0,
  authorized_persons: [],
})

export const generateEmptyDataOwnerInfoAuthorize = () => ({  
  person_uuid: '',
  owner_relationship: '',
  borrower_relationship: '',
  authorize_contract: ''
})
export const generateEmptyTypeTransportLegal =()=>({
  id: "",
  documents: [],
  other_document: ""
})
export const generateEmptyTypeTransportLegalDocumentsChild =(otherFlag: string)=>({
  id: "",
  other_value_flag: otherFlag
})
