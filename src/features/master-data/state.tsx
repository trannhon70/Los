import { ICode, IDefaultFlag, IDefaultOtherFlag, IDescription, IId, IIdCodeName, IIdName, IName, IPolicyId, IStoreModel, IValue } from "types";
import {
  ICreditInstitution,
  IDocumentType,
  IIdNameDes,
  IIssuer,
  IListLegalDocument,
  ILoanProduct,
  IPeopleDepend,
  IPolicyDetail,
  IScoreRankDetail,
  ITypeCardUse,
  ITypeRealEstate,
  ITypeTemplate,
  IExceptionType
} from "types/models/master-data/state";
import { generateStoreModel } from "./utils";

// ============= Config Common ========================= //
export const countryState = generateStoreModel<IIdCodeName[]>([]);
export const provinceState = generateStoreModel<IIdCodeName[]>([]);
export const districtState: Record<string, IStoreModel<IIdCodeName[]>> = {};
export const wardState: Record<string, IStoreModel<IIdCodeName[]>> = {};
export const loanProductState = generateStoreModel<ILoanProduct[]>([]);
export const partnerState =generateStoreModel<IIdCodeName[]>([]);
export const partnerProductState =generateStoreModel<IIdCodeName[]>([]);
export const collateralState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
export const personalRepState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
export const exceptionFileState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
export const marriedStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
export const educationState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại giấy tờ (định danh
export const cifIfTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại địa chỉ
export const addressTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mối quan hệ với chủ thẻ chính - Mối quan hệ với KH vay - Mối quan hệ với người vay
// export const relationshipState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
export const relationshipState: Record<string, IStoreModel<(IIdCodeName & IDefaultFlag)[]>> = {};

// Tình trạng sở hữu/sử dụng - Thuộc sở hữu và sử dụng - Thông tin riêng về nhà ở
export const ownerPropertyState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại tổ chức/cá nhân - Loại khách hàng
export const customerTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Giới tính
export const genderState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Thu nhập bình quân 3 tháng
export const averageIncomeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Ngành nghề kinh tế
export const custClassififationState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Số người phụ thuộc dưới 18 - Số người phụ thuộc trên 18
export const peopleDependState = generateStoreModel({}) as IStoreModel<IPeopleDepend>;
// Cư Trú
export const residentStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Nhóm nợ cao nhất
export const debtClassificationState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tên loại TSĐB
export const collateralTypeState =generateStoreModel<IIdCodeName[]>([]);
// Loại hình cho vay - Chọn khoản vay
export const typeTermLoanState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mục đích vay theo SP
export const loanPurposeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
 // Đánh giá về phương án và nhu cầu vay vốn
export const remarkState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Phương thức nhận lương - Phương thức thanh toán - Phương thức nhận - Phương thức nhận thu nhập
export const methodReceiveSalaryState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Phân tích/đánh giá
export const ablePayLabelState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Khu vực hoạt động
export const businessTypeShState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại hình doanh nghiệp theo khu vuc hoat dong
export const businessTypeState: Record<string, IStoreModel<(IIdCodeName & IDefaultFlag)[]>> = {}

// generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại hình doanh nghiệp
export const businessTypeIncomeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại hợp đồng lao động
export const contractTermState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tần suất thu nhập
export const frequenceState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Nhận xét khả năng trả nợ gốc/lãi
export const repayPrincipalInterestState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại bất động sản
export const typeRealEstateState = generateStoreModel<ITypeRealEstate[]>([]);
// Tình trạng bất động sản
export const typeRealEstateStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại ngoại lệ
export const typeExceptionState = generateStoreModel([]) as IStoreModel<IExceptionType[]>;
// Loại rủi ro
export const typeRiskState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mã ngoại lệ - Diễn giải
export const pollicyDetailState = generateStoreModel([]) as IStoreModel<IPolicyDetail[]>;
// Kiến nghị và đề xuất CTD
export const acceptCreditLabelState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Danh mục hồ sơ (Biểu mẫu)
export const typeTemplateState = generateStoreModel([]) as IStoreModel<ITypeTemplate[]>;
// Phân loại khách hàng
export const customerSegmentState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Chi tiết điểm và hạng
export const scoreRankDetailState = generateStoreModel<IScoreRankDetail[]>([]);
// Đơn vị thực hiện thẩm định giá
export const appraisalUnitTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mục đích thẩm định giá
export const appraisalPurposeState = generateStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>([]);
// Chiều rộng đường hiện hữu (m)
export const roadWidthState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại GCN quyền sử dụng đất - Loại GCN
export const roadCollateralCartifiredTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Đối tượng sở hữu tài sản
export const collateralOwnerTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mục đích sử dụng đất (theo thẩm định giá)
export const purposeUsingLaneState = generateStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>([]);
// Nguồn gốc sử dụng đất theo GCN - Nguồn gốc SD đất theo GCN
export const originLaneUseState = generateStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>([]);
// Hình thức sử dụng đất theo GCN
export const landUseCertifiedState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Pháp lý CTXD
export const constructionPermitState = generateStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>([]);
// Loại công trình
export const constructionTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag & IDefaultOtherFlag)[]>([]);
// Loại GCN quyền sở hữu CTXD/nhà ở
export const collateralCertificateTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tình trạng pháp lý
export const legalStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mục đích sử dụng đất (theo định giá)
export const purposeUseLaneValuationState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại căn hộ
export const typeApartmentState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tình trạng PTVT
export const vehicleStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tình trạng tài sản (Máy móc thiết bị)
export const devicesPropertyStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tình trạng tài sản (Vật tư hàng hóa)
export const goodPropertyStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tình trạng tài sản (Quyền tài sản)
export const rightPropertyPropertyStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại giấy tờ (Tài sản đảm bảo -> Số dư tiền gửi (Số dư TKTG/HDTG/GTCG) -> Thông tin chi tiết)
export const paperTypeState =generateStoreModel<IIdCodeName[]>([]);
// Loại tài sản (Tài sản đảm bảo)
export const propertyTypeState =generateStoreModel<IIdCodeName[]>([]);
// Loại phương tiện vận tải - Loại PTVT
export const vehicleTypeState =generateStoreModel<IIdCodeName[]>([]);
// Loại phương tiện
export const vehicleDetailState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag)[]>([]);
// Loại Máy móc thiết bị
export const machineTypeState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag)[]>([]);
// Danh mục hồ sơ pháp lý
export const listLegalDocumentState = generateStoreModel<(IListLegalDocument)[]>([]);
// Loại vị trí
export const collateralLocationTypeState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag)[]>([]);
// Tổ chức định giá độc lập
export const independentValuationState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>([]);
// TT.TĐTS thực hiện thẩm định giá
export const priceAppraisalState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>([]);
// Nơi sản xuất/lắp ráp
export const countriesManufactureState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>([]);
//Lấy danh sách thông tin thuộc sở hữu và sử dụng
export const rentalOwnerPropertyState = generateStoreModel<(IIdCodeName & IDefaultOtherFlag & IDefaultFlag)[]>([]);
//Trạng thái Document
export const documentStatusState = generateStoreModel<(IIdCodeName & IDescription & IDefaultOtherFlag & IDefaultFlag)[]>([]);


// ============= Config Card ========================= //
// Câu hỏi xác thực
export const authenQuestionState = generateStoreModel<IIdNameDes[]>([]);
// Nhu cầu của khách hàng
export const customerNeedState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Hình thức giao thẻ
export const cardDeliveryMethodState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại phát hành
export const releaseTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Hình thức đảm bảo thẻ hiện tại
export const guaranteeFormState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Khách hàng có thỏa điều kiện nhận quà tặng hay không
export const giftConditionState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại thẻ đang sử dụng
export const typeCardUseState = generateStoreModel([]) as IStoreModel<ITypeCardUse[]>;
// Thông tin lựa chọn quà tặng
export const giftSelectionState =generateStoreModel<IIdCodeName[]>([]);
// Doi tuong khai bao thong tin
export const personTypesState =generateStoreModel<IIdName[]>([]);

// ============= Config Normal ========================= //
// Nghề nghiệp - Mã - Tên ngành nghề KD chính - Lãnh vực chuyên môn
export const careersState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Thông tin FATCA
export const fatcaState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Mã tài chính tín dụng - Tên tài chính tín dụng
export const creditInstitutionState = generateStoreModel<ICreditInstitution[]>([]);
// Mục đích vay (theo CORE)
export const loanPurposeCoreState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại tiền cho vay - Loại tiền
export const currencyTypeState =generateStoreModel<IIdCodeName[]>([]);
// Phương thức để nghị cấp tín dụng
export const lendingMethodState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Phương thức giải ngân
export const disbursementState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Phương thức trả nợ gốc - Phương thức trả nợ lãi
export const scheduleState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Định kỳ điểu chỉnh lãi suất cho vay
export const loanInterestRateState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại giấy tờ đăng ký
export const businessLicenceTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Hình thức thanh toán
export const paymentMethodState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Đơn vị phát hành
export const issuerState = generateStoreModel<IIssuer[]>([]);
// Loại tài sản - Loại tài sản cho thuê
export const assetTypeState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Đồng ý phong tỏa
export const acceptStatusState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Tài sản hiện đang đảm bảo cho nghĩa vụ CTD
export const otherContractLabelState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
 // Người đại diện hộ kinh doanh
export const businessRepresentationState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
// Loại tài liệu - Loại giấy tờ - Loại giấy tờ - Tài liệu đính kèm
// export const documentTypeState = generateStoreModel([]) as IStoreModel<IDocumentType[]>;
export const documentTypeState: Record<string, IStoreModel<IDocumentType[]>> = {};

export const capitalNeedState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);

//Kết quả thẩm định qua số điện thoại - Thẩm định bổ sung S2
export const isPassState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
//Mã lí do từ chối - Thẩm định bổ sung S2
export const reasonForRefusalState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);
//Tiêu đề thông báo - Thẩm định bổ sung S2
export const noticeTitleState = generateStoreModel<(IIdCodeName & IDefaultFlag)[]>([]);

//Tên field cost tab B income S1
export const validateMaCostTypeState = generateStoreModel<(ICode & IValue)[]>([]);
export const envGlobalState = generateStoreModel<(ICode & IValue)[]>([]);

export const policyGroupState = generateStoreModel<(IId & IName & IPolicyId)[]>([]);