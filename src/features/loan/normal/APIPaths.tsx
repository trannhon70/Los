import { API_BASE_URL_S1 } from 'utils/constants';

export const API_LOAN_NORMAL_CONFIG_PRODUCT_CATEGORY =
  API_BASE_URL_S1 + '/configs/loan-product/loan';
export const API_LOAN_NORMAL_CONFIG_PARTNER_CODE =
  API_BASE_URL_S1 + '/configs/partner/:id';
export const API_LOAN_NORNAL_CONFIG_PARTNER_PRODUCT =
  API_BASE_URL_S1 + '/configs/partner-product/:id/';
export const API_LOAN_NORMAL_CONFIG_PERSON_TYPE =
  API_BASE_URL_S1 + '/configs/person-type/';
export const API_LOAN_NORMAL_CONFIG_CUSTOMER_TYPE =
  API_BASE_URL_S1 + '/configs/customer-type/';
export const API_LOAN_NORMAL_CONFIG_GENDER =
  API_BASE_URL_S1 + '/configs/gender/';
export const API_LOAN_NORMAL_CONFIG_COUNTRY =
  API_BASE_URL_S1 + '/configs/location/countries/';
export const API_LOAN_NORMAL_CONFIG_PROVINCE =
  API_BASE_URL_S1 + '/configs/location/:code/provinces/';
export const API_LOAN_NORMAL_CONFIG_DISTRICT =
  API_BASE_URL_S1 + '/configs/location/:code/districts/';
export const API_LOAN_NORMAL_CONFIG_WARD =
  API_BASE_URL_S1 + '/configs/location/:code/wards/';
export const API_LOAN_NORMAL_CONFIG_MARRIAGE_STATUS =
  API_BASE_URL_S1 + '/configs/married-status/';
export const API_LOAN_NORMAL_CONFIG_OWNER_PROPERTY =
  API_BASE_URL_S1 + '/configs/owner-property/';
export const API_LOAN_NORMAL_CONFIG_DEPENDENT_PERSON =
  API_BASE_URL_S1 + '/configs/number-of-dependents/';
export const API_LOAN_NORMAL_CONFIG_EDUCATION =
  API_BASE_URL_S1 + '/configs/education/';
export const API_LOAN_NORMAL_CONFIG_FATCA =
  API_BASE_URL_S1 + '/configs/fatca-info/';
export const API_LOAN_NORMAL_CONFIG_CAREER =
  API_BASE_URL_S1 + '/configs/careers/';
export const API_LOAN_NORMAL_CONFIG_INCOME_3_MONTH =
  API_BASE_URL_S1 + '/configs/average-income-3-month/';
export const API_LOAN_NORMAL_CONFIG_CIF_ID_TYPE =
  API_BASE_URL_S1 + '/configs/cif-id-type/';
export const API_LOAN_NORMAL_CONFIG_CUS_CLASSIFICATION =
  API_BASE_URL_S1 + '/configs/cus-classification/';
export const API_LOAN_NORMAL_CONFIG_ADDRESS_TYPE =
  API_BASE_URL_S1 + '/configs/address/';
export const API_LOAN_NORMAL_CONFIG_RESIDENT =
  API_BASE_URL_S1 + '/configs/resident-status/';
export const API_LOAN_NORMAL_CONFIG_RELATIONSHIP =
  API_BASE_URL_S1 + '/configs/relationship/';
export const API_LOAN_NORMAL_CONFIG_DEBT_CLASSIFICATION =
  API_BASE_URL_S1 + '/configs/debt-classification/';
export const API_LOAN_NORMAL_CONFIG_CREDIT_INSTITUTION =
  API_BASE_URL_S1 + '/configs/credit-institution/';
export const API_LOAN_NORMAL_CONFIG_PRODUCT_CATEGORY_LOAN =
  API_BASE_URL_S1 + '/configs/product-category/';
export const API_LOAN_NORMAL_CONFIG_COLLATERAL_TYPE =
  API_BASE_URL_S1 + '/configs/collateral-info-type/';
export const API_LOAN_NORMAL_CONFIG_PRODUCT_LOAN_PURPOSE =
  API_BASE_URL_S1 + '/configs/product-loan-purpose/';
export const API_LOAN_NORMAL_CONFIG_LOAN_PURPOSE =
  API_BASE_URL_S1 + '/configs/loan-purpose/';
export const API_LOAN_NORMAL_CONFIG_CURRENCY_TYPE =
  API_BASE_URL_S1 + '/configs/currency-type/';
export const API_LOAN_NORMAL_CONFIG_LENDING_METHOD =
  API_BASE_URL_S1 + '/configs/lending-method/';
export const API_LOAN_NORMAL_CONFIG_LOAN_INTEREST_RATE =
  API_BASE_URL_S1 + '/configs/loan-interest-rate/';
export const API_LOAN_NORMAL_CONFIG_DEBURSEMENT =
  API_BASE_URL_S1 + '/configs/disbursement/';
export const API_LOAN_NORMAL_CONFIG_SCHEDULE_UNIT =
  API_BASE_URL_S1 + '/configs/schedule-unit/';
export const API_LOAN_NORMAL_CONFIG_INTEREST_PAYMENT_METHOD =
  API_BASE_URL_S1 + '/configs/interest-payment-method/';
export const API_LOAN_NORMAL_CONFIG_BUSINESS_LICENSE_TYPE =
  API_BASE_URL_S1 + '/configs/business-licence-type/';
export const API_LOAN_NORMAL_CONFIG_OWNERSHIP_STATUS =
  API_BASE_URL_S1 + '/configs/owner-status/';
export const API_LOAN_NORMAL_CONFIG_FINANCE_METADATA =
  API_BASE_URL_S1 + '/configs/finance-metadata/';
export const API_LOAN_NORMAL_CONFIG_PAYMENT_METHOD =
  API_BASE_URL_S1 + '/configs/payment-method/';
export const API_LOAN_NORMAL_CONFIG_METHOD_RECEIVING_SALARY =
  API_BASE_URL_S1 + '/configs/method-of-receiving-salary/';
export const API_LOAN_NORMAL_CONFIG_REAL_ESTATE_TYPE =
  API_BASE_URL_S1 + '/configs/real-estate-type/';
export const API_LOAN_NORMAL_CONFIG_REAL_ESTATE_STATUS =
  API_BASE_URL_S1 + '/configs/real-estate-status/';
export const API_LOAN_NORMAL_SAVE_PRODUCT =
  API_BASE_URL_S1 + '/normal-loan/product-group';
export const API_LOAN_NORMAL_SAVE_LEGAL =
  API_BASE_URL_S1 + '/normal-loan/legal-info/:id/';
export const API_LOAN_NORMAL_SAVE_LEGAL_CO_BORROWER =
  API_BASE_URL_S1 + '/normal-loan/:id/legal-info/co-brw';
export const API_LOAN_NORMAL_FULL_DATA = API_BASE_URL_S1 + '/normal-loan/:id';
export const API_LOAN_NORMAL_FULL_DATA_BALANCE_ABILITY =
  API_BASE_URL_S1 + '/normal-loan/:id/source-income/income/';

//Collateral
export const API_LOAN_NORMAL_SAVE_COLLATERAL =
  API_BASE_URL_S1 + '/normal-loan/:id/collaterals/';
export const API_LOAN_NORMAL_UPDATE_DELETE_COLLATERAL =
  API_BASE_URL_S1 + '/normal-loan/:losuuid/collaterals/:uuid';
export const API_LOAN_NORMAL_UPDATE_FETCH_LIST_COLLATERAL =
  API_BASE_URL_S1 + '/normal-loan/:losuuid/collaterals/?page=1&limit=100';
export const API_LOAN_NORMAL_COLLATERAL_IGNORE =
  API_BASE_URL_S1 + '/normal-loan/:losuuid/collaterals/?is_collateral=:ignore';
export const API_LOAN_NORMAL_COLLATERAL_DELETE_ITEM =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:item_uuid';

// Xóa giấy chứng trong CTXD có GCN QSH riêng
export const API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_CERTIFICATES_LAND_ASSETS =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_cost_uuid/certificates/:land_cost_item_cert_uuid';
// Xóa loai CTXD trorng GCN QSH
export const API_LOAN_NORMAL_COLLATERAL_DELETE__CERTIFICATE_LAND_ASSETS_TYPE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_cost_uuid/land-asset/land-asset-type/:land_const_item_detail_uuid';
// Xóa loai CTXD trorng GCN QSH
export const API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_LAND_ASSETS_TYPE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-asset-wrapper/land-assets/:land_const_item_uuid/land_asset_types/:land_const_item_detail_uuid';

// Xóa người được ủy quyền trong đối tượng sở hữu CTXD có GCN QSH riêng
export const API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_CERTIFICATED_LAND_ASSETS =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_cost_uuid/owner-wrapper/owners/:owner_uuid/authorized-persons/:owner_auth_uuid';

// Xóa người được ủy quyền trong LAND
export const API_LOAN_NORMAL_COLLATERAL_DELETE_AUTH_PERSON_LAND_ASSETS =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-wrapper/owner-wrapper/owners/:owner_uuid/authorized-persons/:owner_auth_uuid';

// Xóa người sở hữu CTXD có GCN QSH riêng
export const API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_OWNER_PERSON_LAND_ASSETS =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_cost_uuid/owner-wrapper/owners/:owner_uuid';
// Xóa đối tượng sở hữu Đất
export const API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON_LAND_ASSETS =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-wrapper/owner-wrapper/owners/:owner_uuid';

// Xóa đối tượng sở hữu
export const API_LOAN_NORMAL_COLLATERAL_DELETE_OWNER_PERSON =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/owner-wrapper/owners/:owner_uuid';

// Xóa CTXD có GCN QSH riêng
export const API_LOAN_NORMAL_COLLATERAL_DELETE_CERTIFICATED_LAND_ASSETS_WRAPPER =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_cost_uuid';

// Xóa CTXD trên đất trong danh sách thông tin pháp lý CTXD
export const API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_ASSETS_WRAPPER =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-asset-wrapper/land-assets/:land_const_item_uuid';

export const API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_ASSETS_WRAPPER =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-asset-wrapper';
export const API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_PURPOSE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-wrapper/land/certificate-use-purposes/:re_land_used_uuid';
export const API_LOAN_NORMAL_COLLATERAL_DELETE_DEPARTMENT_CERTIFICATE_PURPOSE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/apartment/land/certificate-use-purposes/:apart_land_used_uuid';
export const API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land-wrapper/certificates/:land_cert_uuid';

export const API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_ROOM =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/apartments/:apart_room_uuid';

export const API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/apartment/certificates/:apart_owner_cert_uuid';

// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận chung cư
export const API_LOAN_NORMAL_COLLATERAL_DELETE_APARTMENT_CERTIFICATE_OWNER_PERSON =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/apartment/certificates/:apart_owner_cert_uuid/persons/:apart_owner_cert_item_uuid';
// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận CHỢ
export const API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE_OWNER_PERSON =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificates/:market_cert_uuid/persons/:market_cert_item_uuid';

// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận CTXD_LAND
export const API_LOAN_NORMAL_COLLATERAL_DELETE_CTXD_LAND_CERTIFICATE_OWNER_PERSON =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/certificated-land-asset-wrappers/:land_const_uuid/certificates/:land_const_item_cert_uuid/persons/:land_const_item_cert_item_uuid';

// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận LAND
export const API_LOAN_NORMAL_COLLATERAL_DELETE_LAND_CERTIFICATE_OWNER_PERSON =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/land_wrapper/certificates/:land_cert_uuid/persons/:re_land_cert_item_uuid';

export const API_LOAN_NORMAL_COLLATERAL_DELETE_MARKET_CERTIFICATE =
  API_BASE_URL_S1 +
  '/normal-loan/:losuuid/collaterals/:price_cert_uuid/:price_cert_asset_uuid/market/certificates/:market_cert_uuid';

export const API_LOAN_NORMAL_INTERNAL_CREDIT_RATING_V2 =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/internal-credit-rating/';

export const API_LOAN_NORMAL_FORMS_DATA =
  API_BASE_URL_S1 + '/normal-loan/template/metadata/:los_uuid??:query';
export const API_LOAN_NORMAL_FORMS_SAVE =
  API_BASE_URL_S1 +
  '/normal-loan/template/metadata?los_uuid=:los_uuid&template_type=:template_type';
export const API_LOAN_NORMAL_FORMS_CATEGORY_PROFILE =
  API_BASE_URL_S1 + '/normal-loan/template/category-profiles';
export const API_LOAN_NORMAL_FORMS_TEMPLATE =
  API_BASE_URL_S1 + '/normal-loan/template/structure/:los_uuid';
export const API_LOAN_NORMAL_FORMS_SAVE_TO_DATABASE =
  API_BASE_URL_S1 + '/normal-loan/template/approval/:los_uuid??:query';
export const API_LOAN_NORMAL_FORMS_GET_CREDIT_TERM =
  API_BASE_URL_S1 + '/normal-loan/template/credit-term/:los_id';
export const API_LOAN_NORMAL_FORMS_DELETE_CREDIT_TERM =
  API_BASE_URL_S1 + '/normal-loan/template/credit-term/:los_id/:uuid';
export const API_LOAN_NORMAL_FORMS_POST_CREDIT_TERM =
  API_BASE_URL_S1 + '/normal-loan/template/credit-term/:los_id/:level_type';

// POST LOAN V2
export const API_LOAN_NORMAL_SAVE_LOAN_PRODUCT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/loan-info/product-loan-program-info/';
export const API_LOAN_NORMAL_SAVE_CAPITAL_NEED =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/loan-info/capital-need-loan-plan-info/';
export const API_LOAN_NORMAL_SAVE_BUSSINESS_HOUSEHOULD =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/loan-info/business-household-info/';
export const API_LOAN_NORMAL_SAVE_FINANCE_ANALYSIS =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/loan-info/financial-analysis/';
export const API_LOAN_NORMAL_INTERNAL_CREDIT_RATING =
  API_BASE_URL_S1 + 'card-loan/:los_uuid/internal-credit-rating/';

//cic ------------
export const APIAPI_LOAN_NORMAL_CIC =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/borrower/:person_uuid';
export const API_LOAN_NORMAL_CIC_OTHER_POST_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/borrower/:person_uuid';
export const API_LOAN_NORMAL_CIC_OTHER_POST_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/marriage/:person_uuid';
export const API_LOAN_NORMAL_CIC_OTHER_POST_COBORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/coborrower/:person_uuid';
export const API_LOAN_NORMAL_CIC_OTHER_POST_COPAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/copayer/:person_uuid';
export const API_LOAN_NORMAL_CIC_OTHER_POST_CONTACT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/:credit_insintutation/contact/:person_uuid';

// API INIT LEGAL
export const API_LOAN_NORMAL_GET_LEGAL_INFO =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info';

export const API_LOAN_NORMAL_SAVE_BORROWER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/borrower';
export const API_LOAN_NORMAL_SAVE_MARRIAGE =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/marriage';
export const API_LOAN_NORMAL_SAVE_CO_BORROWER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/co-brw';
export const API_LOAN_NORMAL_SAVE_CO_PAYER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/co-payer';
export const API_LOAN_NORMAL_SAVE_LAW_RLT =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/law-rlt';
export const API_LOAN_NORMAL_SAVE_RELATED =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/related';
export const API_LOAN_NORMAL_SAVE_OTHER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/others';

export const API_LOAN_NORMAL_DELETE_MARRIAGE =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/marriage';
export const API_LOAN_NORMAL_DELETE_CO_BORROWER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/co-borrower';
export const API_LOAN_NORMAL_DELETE_CO_PAYER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/co-payer';
export const API_LOAN_NORMAL_DELETE_LAW_RLT =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/law-rlt';
export const API_LOAN_NORMAL_DELETE_RELATED =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/related';
export const API_LOAN_NORMAL_DELETE_OTHER =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/legal-info/others';
export const API_LOAN_NORMAL_GET_CIF_DATA =
  API_BASE_URL_S1 + '/customer/:cif/borrower';
export const API_LOAN_NORMAL_CHECK_LEGAL_BLACKLIST =
  API_BASE_URL_S1 + '/customer/blacklist/:query';
// api delete legal by person_uuid
export const API_LOAN_NORMAL_DELETE_COBORROWER_BY_UUID =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/legal-info/co-borrower/detail/:person_uuid';
export const API_LOAN_NORMAL_DELETE_COPAYER_BY_UUID =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/legal-info/co-payer/detail/:person_uuid';
export const API_LOAN_NORMAL_DELETE_LAGALRELATED_BY_UUID =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/legal-info/law-rlt/detail/:person_uuid';
export const API_LOAN_NORMAL_DELETE_CONTACT_BY_UUID =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/legal-info/related/detail/:person_uuid';
export const API_LOAN_NORMAL_DELETE_OTHER_BY_UUID =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/legal-info/others/detail/:person_uuid';

// API INIT CIC
export const API_LOAN_NORMAL_NOT_SCB_GET_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/borrower';
export const API_LOAN_NORMAL_NOT_SCB_GET_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/marriage';
export const API_LOAN_NORMAL_NOT_SCB_GET_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-brw';
export const API_LOAN_NORMAL_NOT_SCB_GET_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-payer';
export const API_LOAN_NORMAL_NOT_SCB_GET_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/law-rlt';
export const API_LOAN_NORMAL_NOT_SCB_GET_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/other';

export const API_LOAN_NORMAL_SCB_GET_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/borrower';
export const API_LOAN_NORMAL_SCB_GET_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-brw';
export const API_LOAN_NORMAL_SCB_GET_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/marriage';
export const API_LOAN_NORMAL_SCB_GET_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-payer';
export const API_LOAN_NORMAL_SCB_GET_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/law-rlt';
export const API_LOAN_NORMAL_SCB_GET_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/other';

export const API_LOAN_NORMAL_NOT_SCB_CREATE_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/borrower';
export const API_LOAN_NORMAL_NOT_SCB_CREATE_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/marriage';
export const API_LOAN_NORMAL_NOT_SCB_CREATE_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-brw';
export const API_LOAN_NORMAL_NOT_SCB_CREATE_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-payer';
export const API_LOAN_NORMAL_NOT_SCB_CREATE_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/law-rlt';
export const API_LOAN_NORMAL_NOT_SCB_CREATE_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/other';

export const API_LOAN_NORMAL_SCB_CREATE_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/borrower';
export const API_LOAN_NORMAL_SCB_CREATE_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/marriage';
export const API_LOAN_NORMAL_SCB_CREATE_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-brw';
export const API_LOAN_NORMAL_SCB_CREATE_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-payer';
export const API_LOAN_NORMAL_SCB_CREATE_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/law-rlt';
export const API_LOAN_NORMAL_SCB_CREATE_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/other';

export const API_LOAN_NORMAL_SCB_GET_CIC_INFO =
  API_BASE_URL_S1 + '/normal-loan/:los_uuid/cic';

export const API_LOAN_NORMAL_NOT_SCB_DELETE_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/borrower/:person_uuid';
export const API_LOAN_NORMAL_NOT_SCB_DELETE_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/marriage/:person_uuid';
export const API_LOAN_NORMAL_NOT_SCB_DELETE_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-brw/:person_uuid';
export const API_LOAN_NORMAL_NOT_SCB_DELETE_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/co-payer/:person_uuid';
export const API_LOAN_NORMAL_NOT_SCB_DELETE_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/law-rlt/:person_uuid';
export const API_LOAN_NORMAL_NOT_SCB_DELETE_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac/other/:person_uuid';

export const API_LOAN_NORMAL_SCB_DELETE_BORROWER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/borrower/:person_uuid';
export const API_LOAN_NORMAL_SCB_DELETE_MARRIAGE =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/marriage/:person_uuid';
export const API_LOAN_NORMAL_SCB_DELETE_CO_BRW =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-brw/:person_uuid';
export const API_LOAN_NORMAL_SCB_DELETE_CO_PAYER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/co-payer/:person_uuid';
export const API_LOAN_NORMAL_SCB_DELETE_LAW_RLT =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/law-rlt/:person_uuid';
export const API_LOAN_NORMAL_SCB_DELETE_OTHER =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/cic/khoan-vay-hien-huu-tai-scb/other/:person_uuid';

export const API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_LIST =
  API_BASE_URL_S1 + '/normal-loan/:los_id/other-document/exception-list/:uuid';
export const API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_DETAIL =
  API_BASE_URL_S1 +
  '/normal-loan/:los_id/other-document/exception-list-detail/:exception_list_uuid/:uuid';
export const API_LOAN_NORMAL_SCB_DELETE_OTHER_RISK_GROUP =
  API_BASE_URL_S1 +
  '/normal-loan/:los_id/other-document/analysis-measures-risk-info/risks-group-list/:uuid';

export const API_LOAN_NORMAL_OTHER_POST_CONTROL_APPROVAL =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/other-document/analysis-measures-risk/accept-credit-cpd/?position=:position';
export const API_LOAN_NORMAL_OTHER_POST_CONTROL_CONTROL =
  API_BASE_URL_S1 +
  '/normal-loan/:los_uuid/other-document/analysis-measures-risk/accept-credit-cks/?position=:position';
