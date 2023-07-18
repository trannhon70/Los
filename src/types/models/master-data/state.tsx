import { IDefaultOtherFlag, IICodeValue, IIdName } from "types";
import { IStoreModel } from "types/api";
import { ICode, IDefaultFlag, IDescription, IId, IIdCodeName, IName, IPolicyId, IValue } from "types/base";

export type TMasterDataProp = keyof Omit<IMasterData, 'register'>;

export interface ICountry {
  country_code: string;
  country_name: string;
}

export interface IProvince {
  province_code: string;
  province_name: string;
}

export interface IDistrict {
  district_code: string;
  district_name: string;
}

export interface IWard {
  ward_code: string;
  ward_name: string;
}

export interface IMasterRegister {
  mounted: boolean;
}

export interface IDependentPerson {
  name: string;
  min_value: number,
  max_value: number
}

export interface ICollateralType {
  collateral_type: string;
  collateral_type_desc: string;
}

export interface ICreditInstitution {
  id: string;
  code: string;
  name: string;
  short_name: string;
}

export interface ICurrencyType {
  currency_type: string;
  currency_type_desc: string;
}

export interface IScoreRankDetail {
  score_rank: string;
  name: string;
  display_order: number | null;
  detail_info: IScoreRankDetailInfo[];
}

export interface IScoreRankDetailInfo {
  min_score: number | null;
  max_score: number | null;
  score_rank_score: string;
}

export interface ILoanCardProduct extends IIdCodeName, IDefaultFlag {
  product_type_info: IProductTypeInfo[];
}

export interface IProductTypeInfo extends IIdCodeName, IDefaultFlag {
  product_detail_info: IProductDetailInfo[];
}


export interface IProductDetailInfo extends IIdCodeName, IDefaultFlag { }

export interface ILoanCardtypeInUse {
  credit_product_card_id: string;
  credit_card_id: string;
  card_group_id: string;
  card_name: string;
}

export interface IDocumentLegal extends IIdCodeName {
  document_list: IDocumentLegalList[];
}

export interface IDocumentLegalList {
  document_id: string;
  document_code: string;
  document_name: string;
}

export interface ILoanCardBankRank {
  branch_code: string;
  branch_name: string;
}

export interface ILoanCardProductPromotion {
  promotion_id: number;
  promotion_name: string;
}

export interface ILoanCardDocumentTypeCard {
  document_type_id: number;
  document_type_name: string;
  document_type_child_list: ILoanCardDocumentTypeCardChildList[];
}

export interface IExceptionType{
  id: number;
  name: string;
  policy_group: string
}
export interface IPolicyDetail extends IIdCodeName{
  description: string;
}
export interface IVehicleDetail extends IIdCodeName{
  description: string;
}
export interface ILoanCardDocumentTypeCardChildList {
  document_type_id: number;
  document_type_name: string;
}

export interface ILoanCardLimitCard {
  limit_by_object_info: ILimitByObjectInfo;
  obj_info_list: IIdCodeName[];
  detail_info: ILoanCardLimitCardDetailInfo;
  configs: ILoanCardLimitCardDetailConfig;
}

export interface ILoanCardLimitCardDetailConfig {
  [detail_name: string]: IIdCodeName[];
}

export interface ILoanCardLimitCardDetailInfo {
  [config_name: string]: ILoanCardLimitCardDetail[];
}
export interface ILoanCardLimitCardDetail {
  id: number;
  name: string;
  data: IICodeValue;
  component: string;
  config: string | null;
  edit_able_flag: boolean;
  required_flag: boolean;
  calculation_flag: boolean;
}

export interface ILimitByObjectInfo {
  id: number;
  name: string;
}

export interface ILoanCardMainCard {
  uuid: string;
  credit_limit: number;
  card_category: IICodeValue[];
}

export interface ILoanCardMainCardDeliveryMethod {
  address: string;
  province: IProvince;
  district: IDistrict;
  ward: IWard;
}

export interface ILoanProduct {
  product_category_id: string;
  product_category_name: string;
  loan_product_type_info_list: ILoanProductTypeInfoList[];
}

export interface ILoanProductTypeInfoList {
  product_type_id: string;
  product_type_name: string;
  ILoanProductDetailInfoList: ILoanProductDetailInfoList[]
}

export interface ILoanProductDetailInfoList {
  product_detail_id: string;
  product_detail_name: string;
  financial_analysis_flag: boolean;
}

export interface IIdNameDes {
  id: string;
  name: string;
  description: string
}


export interface IPeopleDepend {
  min_value: number;
  max_value: number;
}

export interface ITypeTemplate {
  id: string;
  name: string;
  list: ITypeTemplateList[]
}

export interface ITypeTemplateList {
  profile_id: number;
  profile_name: string;
}

export interface ITypeCardUse {
  id: string;
  name: string;
  group_id: string;
  product_card_id: string;
}

export interface ICreditInstitution {
  id: string;
  name: string;
  short_name: string;
}

export interface IIssuer {
  id: string;
  name: string;
  short_name: string;
  code: string;
}

export interface IDocumentType {
  id: number;
  name: string;
  code: string;
  parent_id: number | null;
  child_list: IDocumentChildList[];
}

export interface IDocumentChildList extends IIdCodeName{
  type: string
}
export interface IListLegalDocument{
  legal_document_id: string;
  legal_document_code: string;
  legal_document_name: string;
  list: IListLegalDocumentListData[] | null;
}

export interface IListLegalDocumentListData extends IDefaultOtherFlag{
  document_id: string;
  document_code: string;
  document_name: string;
  
}

export interface ITypeRealEstate{
  type_real_estate_id: string;
  type_real_estate_code: string;
  type_real_estate_name: string;
  type_real_estate_display_order: number;
  list: ITypeRealEstateList[]
}

export interface ITypeRealEstateList{
  real_estate_id: string;
  real_estate_code: string;
  real_estate_name: string;
  display_order: number;
}


export type IMasterData = {
  register: IMasterRegister;
  // ============= Config Common ========================= //
  country: IStoreModel<IIdCodeName[]>;
  province: IStoreModel<IIdCodeName[]>;
  district: Record<string, IStoreModel<IIdCodeName[]>>;
  ward: Record<string, IStoreModel<IIdCodeName[]>>;
  loanProduct: IStoreModel<ILoanProduct[]>;
  partner: IStoreModel<IIdCodeName[]>;
  partnerProduct: IStoreModel<IIdCodeName[]>;
  collateral: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Những đối tượng khai báo thông tin
  personalRep: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  exceptionFile: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  marriedStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  education: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại giấy tờ (định danh)
  cifIfType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại địa chỉ
  addressType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mối quan hệ với chủ thẻ chính - Mối quan hệ với KH vay - Mối quan hệ với người vay
  relationship: Record<string, IStoreModel<(IIdCodeName & IDefaultFlag)[]>>;
  // Tình trạng sở hữu/sử dụng - Thuộc sở hữu và sử dụng - Thông tin riêng về nhà ở
  ownerProperty: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại tổ chức/cá nhân - Loại khách hàng
  customerType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Giới tính
  gender: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Thu nhập bình quân 3 tháng
  averageIncome: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Ngành nghề kinh tế
  custClassififation: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Số người phụ thuộc dưới 18 - Số người phụ thuộc trên 18
  peopleDepend: IStoreModel<IPeopleDepend>;
  // Cư Trú
  residentStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Nhóm nợ cao nhất
  debtClassification: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tên loại TSĐB
  collateralType: IStoreModel<IIdCodeName[]>;
  // Loại hình cho vay - Chọn khoản vay
  typeTermLoan: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mục đích vay theo SP
  loanPurpose: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Đánh giá về phương án và nhu cầu vay vốn
  remark: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Phương thức nhận lương - Phương thức thanh toán - Phương thức nhận - Phương thức nhận thu nhập
  methodReceiveSalary: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Phân tích/đánh giá
  ablePayLabel: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Khu vực hoạt động
  businessTypeSh: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại hình doanh nghiệp theo khu vuc hoat dong
  businessType: Record<string, IStoreModel<(IIdCodeName & IDefaultFlag)[]>>
  // IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
    // Loại hình doanh nghiệp
  businessTypeIncome: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại hợp đồng lao động
  contractTerm: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tần suất thu nhập
  frequence: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Nhận xét khả năng trả nợ gốc/lãi
  repayPrincipalInterest: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại bất động sản
  typeRealEstate: IStoreModel<ITypeRealEstate[]>;
  // Tình trạng bất động sản
  typeRealEstateStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại ngoại lệ
  typeException: IStoreModel<IExceptionType[]>;
  // Loại rủi ro
  typeRisk: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mã ngoại lệ - Diễn giải
  pollicyDetail: IStoreModel<IPolicyDetail[]>;
  // Kiến nghị và đề xuất CTD
  acceptCreditLabel: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Danh mục hồ sơ (Biểu mẫu)
  typeTemplate: IStoreModel<ITypeTemplate[]>;
  // Phân loại khách hàng
  customerSegment: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Đơn vị thực hiện thẩm định giá
  appraisalUnitType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mục đích thẩm định giá
  appraisalPurpose: IStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>;
  // Chiều rộng đường hiện hữu (m)
  roadWidth: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại GCN quyền sử dụng đất - Loại GCN
  collateralCertifiedType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Đối tượng sở hữu tài sản
  collateralOwnerType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mục đích sử dụng đất (theo thẩm định giá)
  purposeUsingLane: IStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>;
  // Nguồn gốc sử dụng đất theo GCN - Nguồn gốc SD đất theo GCN
  originLaneUse: IStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>;
  // Hình thức sử dụng đất theo GCN
  landUseCertified: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Pháp lý CTXD
  constructionPermit: IStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>;
  // Loại công trình
  constructionType: IStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>;
  // Loại GCN quyền sở hữu CTXD/nhà ở
  collateralCertificateType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tình trạng pháp lý
  legalStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mục đích sử dụng đất (theo định giá)
  purposeUseLaneValuation: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại căn hộ
  typeApartment: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tình trạng PTVT
  vehicleStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tình trạng tài sản (Máy móc thiết bị)
  devicesPropertyStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tình trạng tài sản (Vật tư hàng hóa)
  goodPropertyStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tình trạng tài sản (Quyền tài sản)
  rightPropertyPropertyStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại giấy tờ (Tài sản đảm bảo -> Số dư tiền gửi (Số dư TKTG/HDTG/GTCG) -> Thông tin chi tiết)
  paperType: IStoreModel<IIdCodeName[]>;
  // Loại tài sản (Tài sản đảm bảo)
  propertyType: IStoreModel<IIdCodeName[]>;
  // Loại phương tiện vận tải - Loại PTVT
  vehicleType: IStoreModel<IIdCodeName[]>;
  // Loại phương Máy móc thiết bị - Loại MMTB
  machineType: IStoreModel<IIdCodeName[]>;
  // Loại phương tiện
  vehicleDetail: IStoreModel<(IIdCodeName & IDefaultOtherFlag)[]>;
  // Danh mục hồ sơ pháp lý
  listLegalDocument: IStoreModel<IListLegalDocument[]>;
  // Loại vị trí
  collateralLocationType: IStoreModel<(IIdCodeName & IDefaultOtherFlag)[]>;
  // Tổ chức định giá độc lập
  independentValuation: IStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>;
  // TT.TĐTS thực hiện thẩm định giá
  priceAppraisal: IStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>;
  // Nơi sản xuất/lắp ráp
  countriesManufacture: IStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>;
  // Lấy danh sách thông tin thuộc sở hữu và sử dụng
  rentalOwnerProperty: IStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>;
  //Trạng thái document
  documentStatus: IStoreModel<(IIdCodeName & IDescription & IDefaultOtherFlag & IDefaultFlag)[]>;
  //Tên field Cost tab B income S1
  validateMaCostType: IStoreModel<(ICode & IValue)[]>;


  // ============= Config Card ========================= //
  // Câu hỏi xác thực
  authenQuestion: IStoreModel<IIdNameDes[]>;

  // Nhu cầu của khách hàng
  customerNeed: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Hình thức giao thẻ
  cardDeliveryMethod: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại phát hành
  releaseType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Hình thức đảm bảo thẻ hiện tại
  guaranteeForm: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Khách hàng có thỏa điều kiện nhận quà tặng hay không
  giftCondition: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại thẻ đang sử dụng
  typeCardUse: IStoreModel<ITypeCardUse[]>;
  // Thông tin lựa chọn quà tặng
  giftSelection: IStoreModel<IIdCodeName[]>;
  // Chi tiết điểm và hạng
  scoreRankDetail: IStoreModel<IScoreRankDetail[]>;
  // Đối tượng khai báo thông tin
  personTypes: IStoreModel<IIdName[]>;


  // ============= Config Normal ========================= //
  // Nghề nghiệp - Mã - Tên ngành nghề KD chính - Lãnh vực chuyên môn
  careers: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Thông tin FATCA
  fatca: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Mã tài chính tín dụng - Tên tài chính tín dụng
  creditInstitution: IStoreModel<ICreditInstitution[]>;
  // Mục đích vay (theo CORE)
  loanPurposeCore: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại tiền cho vay - Loại tiền
  currencyType: IStoreModel<IIdCodeName[]>;
  // Phương thức để nghị cấp tín dụng
  lendingMethod: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Phương thức giải ngân
  disbursement: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Phương thức trả nợ gốc - Phương thức trả nợ lãi
  schedule: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Định kỳ điểu chỉnh lãi suất cho vay
  loanInterestRate: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại giấy tờ đăng ký
  businessLicenceType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Hình thức thanh toán
  paymentMethod: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Đơn vị phát hành
  issuer: IStoreModel<IIssuer[]>;
  // Loại tài sản - Loại tài sản cho thuê
  assetType: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Đồng ý phong tỏa
  acceptStatus: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Tài sản hiện đang đảm bảo cho nghĩa vụ CTD
  otherContractLabel: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Người đại diện hộ kinh doanh
  businessRepresentation: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  // Loại tài liệu - Loại giấy tờ - Loại giấy tờ - Tài liệu đính kèm
  documentType: Record<string, IStoreModel<IDocumentType[]>>;
  // thong tin khoan vay s2
  capitalNeed: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  //Kết quả thẩm định qua số điện thoại - Thẩm định bổ sung S2
  isPass: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  //Mã lí do từ chối - Thẩm định bổ sung S2
  reasonForRefusal: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  //Tiêu đề thông báo - Thẩm định bổ sung S2
  noticeTitle: IStoreModel<(IIdCodeName & IDefaultFlag)[]>;
  //List Giá trị giới hạn của app
  envGlobal: IStoreModel<(ICode & IValue)[]>;

  policyGroup: IStoreModel<(IId & IName & IPolicyId)[]>;
  
}
