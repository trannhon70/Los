import { API_BASE_URL_S1 } from "utils/constants";

//  = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + /configs/ Common  = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + //
export const API_MASTER_V2_DATA_COUNTRY  = API_BASE_URL_S1 + '/configs/countries/';
export const API_MASTER_V2_DATA_PROVINCE  = API_BASE_URL_S1 + '/configs/provinces/';
export const API_MASTER_V2_DATA_DISTRICT  = API_BASE_URL_S1 + '/configs/:province_code/districts/';
export const API_MASTER_V2_DATA_WARD  = API_BASE_URL_S1 + '/configs/:district_code/wards/';
export const API_MASTER_V2_DATA_LOAN_PRODUCT  = API_BASE_URL_S1 + '/configs/loan-product/:type_loan';
export const API_MASTER_V2_DATA_PARTNER  = API_BASE_URL_S1 + '/configs/partner/:loan_product_id';
export const API_MASTER_V2_DATA_PARTNER_PRODUCT  = API_BASE_URL_S1 + '/configs/partner-product/:partner_id';
export const API_MASTER_V2_DATA_COLLATERAL  = API_BASE_URL_S1 + '/configs/collateral/';
export const API_MASTER_V2_DATA_PERSIONAL_REP  = API_BASE_URL_S1 + '/configs/pesonal-rep/:type_loan';
export const API_MASTER_V2_DATA_EXCEPTION_FILE  = API_BASE_URL_S1 + '/configs/exception_file/';
export const API_MASTER_V2_DATA_MARRIED_STATUS  = API_BASE_URL_S1 + '/configs/married-status/';
export const API_MASTER_V2_DATA_EDUCATION  = API_BASE_URL_S1 + '/configs/education/';
// Loại giấy tờ (định danh)
export const API_MASTER_V2_DATA_CIF_IF_TYPE  = API_BASE_URL_S1 + '/configs/cif-if-type/';
// Loại địa chỉ
export const API_MASTER_V2_DATA_ADDRESS_TYPE  = API_BASE_URL_S1 + '/configs/address-type/';
// Mối quan hệ với chủ thẻ chính - Mối quan hệ với KH vay - Mối quan hệ với người vay
export const API_MASTER_V2_DATA_RELATIONSHIP = API_BASE_URL_S1 + '/configs/relationship/:other_value_flag';
// Tình trạng sở hữu/sử dụng - Thuộc sở hữu và sử dụng - Thông tin riêng về nhà ở
export const API_MASTER_V2_DATA_OWNER_PROPERTY  = API_BASE_URL_S1 + '/configs/owner-property/';
// Loại tổ chức/cá nhân - Loại khách hàng
export const API_MASTER_V2_DATA_CUSTOMER_TYPE  = API_BASE_URL_S1 + '/configs/customer-type/';
// Giới tính
export const API_MASTER_V2_DATA_GENDER  = API_BASE_URL_S1 + '/configs/gender/';
// Thu nhập bình quân 3 thángc
export const API_MASTER_V2_AVERAGE_INCOME  = API_BASE_URL_S1 + '/configs/average-income/';
// Ngành nghề kinh tế
export const API_MASTER_V2_CUST_CLASSIFICATION  = API_BASE_URL_S1 + '/configs/cust-classification/';
// Số người phụ thuộc dưới 18 - Số người phụ thuộc trên 18
export const API_MASTER_V2_PEPPLE_DEPEND  = API_BASE_URL_S1 + '/configs/people-depend/';
// Cư Trú
export const API_MASTER_V2_RESIDEN_STATUS  = API_BASE_URL_S1 + '/configs/resident-status/';
// Nhóm nợ cao nhất
export const API_MASTER_V2_DEBT_CLASSIFICATION  = API_BASE_URL_S1 + '/configs/debt-classification/';
// Tên loại TSĐB
export const API_MASTER_V2_COLLATERAL_TYPE  = API_BASE_URL_S1 + '/configs/collateral-type/';
// Loại hình cho vay - Chọn khoản vay
export const API_MASTER_V2_TYPE_TERM_LOAN  = API_BASE_URL_S1 + '/configs/type-term-loan/';
// Mục đích vay theo SP
export const API_MASTER_V2_LOAN_PURPOSE  = API_BASE_URL_S1 + '/configs/loan-purpose/';
// Đánh giá về phương án và nhu cầu vay vốn
export const API_MASTER_V2_REMARK  = API_BASE_URL_S1 + '/configs/remark/';
// Phương thức nhận lương - Phương thức thanh toán - Phương thức nhận - Phương thức nhận thu nhập
export const API_MASTER_V2_METHOD_RECEIVE_SALARY  = API_BASE_URL_S1 + '/configs/method-receive-salary/';
// Phân tích/đánh giá
export const API_MASTER_V2_ABLE_PAY_LABEL  = API_BASE_URL_S1 + '/configs/able-pay-label/';
// Khu vực hoạt động
export const API_MASTER_V2_BUSINESS_TYPE_SH  = API_BASE_URL_S1 + '/configs/business-type-sh/';
// Loại hình doanh nghiệp theo khu vuc hoat dong
export const API_MASTER_V2_BUSINESS_TYPE  = API_BASE_URL_S1 + '/configs/business-type-sh/:type_business_sh';
// Loại hình doanh nghiệp 
export const API_MASTER_V2_BUSINESS_TYPE_INCOME  = API_BASE_URL_S1 + '/configs/business-type';
// Loại hợp đồng lao động
export const API_MASTER_V2_CONTRACT_TERM  = API_BASE_URL_S1 + '/configs/contract-term/';
// Tần suất thu nhập
export const API_MASTER_V2_FREQUENCE  = API_BASE_URL_S1 + '/configs/frequence/';
// Nhận xét khả năng trả nợ gốc/lãi
export const API_MASTER_V2_REPAY_PRINCIPAL_INTEREST  = API_BASE_URL_S1 + '/configs/repay-principal-interest/';
// Loại bất động sản
export const API_MASTER_V2_TYPE_REAL_ESTATE  = API_BASE_URL_S1 + '/configs/type-real-estate/';
// Tình trạng bất động sản
export const API_MASTER_V2_TYPE_REAL_ESTATE_STATUS  = API_BASE_URL_S1 + '/configs/real-estate-status/';
// Loại ngoại lệ
export const API_MASTER_V2_TYPE_EXCEPTION  = API_BASE_URL_S1 + '/configs/type-exception/:loan_product_id';
// Loại rủi ro
export const API_MASTER_V2_TYPE_RISK  = API_BASE_URL_S1 + '/configs/type-risk/';
// Mã ngoại lệ - Diễn giải
export const API_MASTER_V2_POLICY_DETAIL  = API_BASE_URL_S1 + '/configs/policy_detail/:policy_group_id??loan_product_id=:loan_product_id';
// Kiến nghị và đề xuất CTD
export const API_MASTER_V2_ACCEPT_CREDIT_LABEL  = API_BASE_URL_S1 + '/configs/accept-credit-label/';
// Danh mục hồ sơ (Biểu mẫu)
export const API_MASTER_V2_TYPE_TEMPLATE  = API_BASE_URL_S1 + '/configs/type-template/';
// Phân loại khách hàng
export const API_MASTER_V2_CUSTOMER_SEGMENT  = API_BASE_URL_S1 + '/configs/customer-segment/';
// Chi tiết điểm và hạng
export const API_MASTER_V2_SCORE_RANK_DETAIL  = API_BASE_URL_S1 + '/configs/score-rank-detail/';
// Đơn vị thực hiện thẩm định giá
export const API_MASTER_V2_APPRAISAL_UNIT_TYPE  = API_BASE_URL_S1 + '/configs/appraisal-unit-type/';
// Mục đích thẩm định giá
export const API_MASTER_V2_APPRAISAL_PURPOSE  = API_BASE_URL_S1 + '/configs/appraisal-purpose/';
// Loại vị trí
export const API_MASTER_V2_COLLATERAL_LOCATION_TYPE  = API_BASE_URL_S1 + '/configs/collateral-location-type/';
// Chiều rộng đường hiện hữu (m)
export const API_MASTER_V2_ROAD_WIDTH  = API_BASE_URL_S1 + '/configs/road-width/';
// Loại GCN quyền sử dụng đất - Loại GCN
export const API_MASTER_V2_COLLATERAL_CARTIFIRED_TYPE  = API_BASE_URL_S1 + '/configs/collateral-certified-type/';
// Đối tượng sở hữu tài sản
export const API_MASTER_V2_COLLATERAL_OWNER_TYPE  = API_BASE_URL_S1 + '/configs/collateral-owner-type/';
// Mục đích sử dụng đất (theo thẩm định giá)
export const API_MASTER_V2_PURPOSE_USING_LANE  = API_BASE_URL_S1 + '/configs/purpose-using-lane/';
// Nguồn gốc sử dụng đất theo GCN - Nguồn gốc SD đất theo GCN
export const API_MASTER_V2_ORIGIN_LANE_USE  = API_BASE_URL_S1 + '/configs/origin-lane-use/';
// Hình thức sử dụng đất theo GCN
export const API_MASTER_V2_LAND_USE_CERTIFIED  = API_BASE_URL_S1 + '/configs/land-use-certified/';
// Pháp lý CTXD
export const API_MASTER_V2_CONSTRUCTION_PREMIT  = API_BASE_URL_S1 + '/configs/construction-permit/';
// Loại công trình
export const API_MASTER_V2_CONSTRUCTION_TYPE  = API_BASE_URL_S1 + '/configs/construction-type/';
// Loại GCN quyền sở hữu CTXD/nhà ở
export const API_MASTER_V2_CONSTRUCTION_CERTIFICATE_TYPE  = API_BASE_URL_S1 + '/configs/collateral-certificate-type/';
// Tình trạng pháp lý
export const API_MASTER_V2_LEGAL_STATUS  = API_BASE_URL_S1 + '/configs/legal-status/';
// Mục đích sử dụng đất (theo định giá)
export const API_MASTER_V2_PURPOSE_USE_LANE_VALUATION  = API_BASE_URL_S1 + '/configs/purpose-use-lane-valuation/';
// Loại căn hộ
export const API_MASTER_V2_TYPE_APARTMENT  = API_BASE_URL_S1 + '/configs/type-apartment/';
// Tình trạng PTVT
export const API_MASTER_V2_VEHICLE_STATUS  = API_BASE_URL_S1 + '/configs/vehicle-status/';
// Tình trạng tài sản (Máy móc thiết bị)
export const API_MASTER_V2_DEVICES_PROPERTY_STATUS  = API_BASE_URL_S1 + '/configs/devices/property-status/';
// Tình trạng tài sản (Vật tư hàng hóa)
export const API_MASTER_V2_GOODS_PROPERTY_STATUS  = API_BASE_URL_S1 + '/configs/goods/property-status/';
// Tình trạng tài sản (Quyền tài sản)
export const API_MASTER_V2_RIGHT_PROPERTY_PROPERTY_STATUS  = API_BASE_URL_S1 + '/configs/right-property/property-status/';
// Loại giấy tờ (Tài sản đảm bảo -> Số dư tiền gửi (Số dư TKTG/HDTG/GTCG) -> Thông tin chi tiết)
export const API_MASTER_V2_PAPER_TYPE  = API_BASE_URL_S1 + '/configs/paper-type/';
// Loại tài sản (Tài sản đảm bảo)
export const API_MASTER_V2_PROPERTY_TYPE  = API_BASE_URL_S1 + '/configs/property-type/';
// Loại phương tiện vận tải - Loại PTVT
export const API_MASTER_V2_VEHICLE_TYPE  = API_BASE_URL_S1 + '/configs/vehicle-type/';
// Loại Máy móc thiết bị - Loại MMTB
export const API_MASTER_V2_MACHINE_TYPE  = API_BASE_URL_S1 + '/configs/machine-type';
// Loại phương tiện
export const API_MASTER_V2_VEHICLE_DETAIL  = API_BASE_URL_S1 + '/configs/vehicle-detail/:vehicle_type';
// Danh mục hồ sơ pháp lý
export const API_MASTER_V2_LIST_LEGAL_DOCUMENT  = API_BASE_URL_S1 + '/configs/list-legal-document/';
// Tổ chức định giá độc lập
export const API_MASTER_V2_INDEPENDENT_VALUATION  = API_BASE_URL_S1 + '/configs/independent-valuation/';
// TT.TĐTS thực hiện thẩm định giá
export const API_MASTER_V2_PRICE_APPRAISAL  = API_BASE_URL_S1 + '/configs/price-appraisal/';
// Nơi sản xuất/lắp ráp
export const API_MASTER_V2_COUNTRIES_MANUFACTURE  = API_BASE_URL_S1 + "/configs/countries-manufacture/"
//Lấy danh sách thông tin thuộc sở hữu và sử dụng
export const API_MASTER_V2_RENTAL_OWNER_PROPERTY  = API_BASE_URL_S1 + "/configs/rental-owner-property/"

// Câu hỏi xác thực
export const API_MASTER_V2_AUTHEN_QUESTION  = API_BASE_URL_S1 + '/configs/authen-question/:loan_product_id/';
// Nhu cầu của khách hàng
export const API_MASTER_V2_CUSTOMER_NEED  = API_BASE_URL_S1 + '/configs/customer-need/';
// Hình thức giao thẻ
export const API_MASTER_V2_CARD_DELIVERY_METHOD  = API_BASE_URL_S1 + '/configs/card-delivery-method/';
// Loại phát hành
export const API_MASTER_V2_RELEASE_TYPE  = API_BASE_URL_S1 + '/configs/release-type/';
// Hình thức đảm bảo thẻ hiện tại
export const API_MASTER_V2_GUARANTEE_FORM  = API_BASE_URL_S1 + '/configs/guarantee-form/';
// Khách hàng có thỏa điều kiện nhận quà tặng hay không
export const API_MASTER_V2_GIFT_CONDITION  = API_BASE_URL_S1 + '/configs/gift-condition/';
// Loại thẻ đang sử dụng
export const API_MASTER_V2_TYPE_CARD_USE  = API_BASE_URL_S1 + '/configs/type-card-use/:loan_product_id/';
// Thông tin lựa chọn quà tặng
export const API_MASTER_V2_GIFT_SELECTION  = API_BASE_URL_S1 + '/configs/gift-selection/:loan_product_id/';
// Đối tượng khai báo thông tin card
export const API_MASTER_V2_PERSON_TYPES  = API_BASE_URL_S1 + 'config/card-loan/person-types/';


//  = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + Config Normal  = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + = API_BASE_URL_S1 + //
// Nghề nghiệp - Mã - Tên ngành nghề KD chính - Lãnh vực chuyên môn
export const API_MASTER_V2_CAREERS  = API_BASE_URL_S1 + '/configs/careers/';
// Thông tin FATCA
export const API_MASTER_V2_FATCA  = API_BASE_URL_S1 + '/configs/fatca-info/';
// Mã tài chính tín dụng - Tên tài chính tín dụng
export const API_MASTER_V2_CREDIT_INSTITUTION  = API_BASE_URL_S1 + '/configs/credit-institution/?has_scb=true';
// Mục đích vay (theo CORE)
export const API_MASTER_V2_LOAN_PURPOSE_CORE  = API_BASE_URL_S1 + '/configs/loan-purpose-core/';
// Loại tiền cho vay - Loại tiền
export const API_MASTER_V2_CURRENT_TYPE  = API_BASE_URL_S1 + '/configs/currency-type/';
// Phương thức để nghị cấp tín dụng
export const API_MASTER_V2_LENDING_METHOD  = API_BASE_URL_S1 + '/configs/lending-method/';
// Phương thức giải ngân
export const API_MASTER_V2_DISBURSEMENT  = API_BASE_URL_S1 + '/configs/disbursement/';
// Phương thức trả nợ gốc - Phương thức trả nợ lãi
export const API_MASTER_V2_SCHEDULE  = API_BASE_URL_S1 + '/configs/schedule/';
// Định kỳ điểu chỉnh lãi suất cho vay
export const API_MASTER_V2_LOAN_INTEREST_RATE  = API_BASE_URL_S1 + '/configs/loan-interest-rate/';
// Loại giấy tờ đăng ký
export const API_MASTER_V2_BUSINESS_LICENCE_TYPE  = API_BASE_URL_S1 + '/configs/business-licence-type/';
// Hình thức thanh toán
export const API_MASTER_V2_PAYMENT_METHOD  = API_BASE_URL_S1 + '/configs/payment-method/';
// Đơn vị phát hành
export const API_MASTER_V2_ISSUER  = API_BASE_URL_S1 + '/configs/issuer/';
// Loại tài sản - Loại tài sản cho thuê
export const API_MASTER_V2_ASSET_TYPE  = API_BASE_URL_S1 + '/configs/asset-type/';
// Đồng ý phong tỏa
export const API_MASTER_V2_ACCEPT_STATUS  = API_BASE_URL_S1 + '/configs/accept-status/';
// Tài sản hiện đang đảm bảo cho nghĩa vụ CTD
export const API_MASTER_V2_OTHER_CONTRACT_LABEL  = API_BASE_URL_S1 + '/configs/other-contract-label/';
// Người đại diện hộ kinh doanh
export const API_MASTER_V2_BUSINESS_REPRESENLATION  = API_BASE_URL_S1 + '/configs/business-representation/';
// Loại tài liệu - Loại giấy tờ - Loại giấy tờ - Tài liệu đính kèm
export const API_MASTER_V2_DOCUMENT_TYPE  = API_BASE_URL_S1 + '/configs/document_type/:document_group_type';
// THONG TIN KHOAN VAY 2
export const API_MASTER_V2_S2_CAPITAL_NEED  = API_BASE_URL_S1 + '/configs/capital-need-analysis/';

//Kết quả thẩm định qua số điện thoại - Thẩm định bổ sung S2
export const API_MASTER_V2_S2_IS_PASS  = API_BASE_URL_S1 + '/configs/is-pass/';
//Mã lí do từ chối - Thẩm định bổ sung S2
export const API_MASTER_V2_S2_REASON_FOR_REFUSAL  = API_BASE_URL_S1 + '/configs/reason-for-refusal/';
//Tiêu đề thông báo - Thẩm định bổ sung S2
export const API_MASTER_V2_S2_NOTICE_TITLE  = API_BASE_URL_S1 + '/configs/notice-title/';
//Trạng thái Document
export const API_MASTER_V2_DOCUMENT_STATES  = API_BASE_URL_S1 + '/configs/document-states';

// Tên field chi phí tab B Income S1
export const API_MASTER_V2_VALIDATE_MA_COST_TYPE  = API_BASE_URL_S1 + '/configs/validate-ma-cost-type';
//Trạng thái Document
export const API_CONFIG_V2_ENV_GLOBAL  = API_BASE_URL_S1 + '/configs/env-global';

// 
export const API_CONFIG_V2_POLICY_GROUP  = API_BASE_URL_S1 + '/configs/policy-group/';

