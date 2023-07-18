export const ValidateMessage = {
  info:{
    empty: 'Vui lòng nhập thông tin'
  },
  fullname: {
    empty: 'Vui lòng nhập họ và tên.'
  },
  customerType: {
    empty: 'Vui lòng chọn loại khách hàng.'
  },
  birthday: {
    empty: 'Vui lòng chọn ngày sinh.',
    not_exist: 'Ngày sinh không tồn tại.',
  },
  gender: {
    empty: 'Vui lòng chọn giới tính.'
  },
  national: {
    empty: 'Vui lòng chọn quốc tịch.'
  },
  marriageStatus: {
    empty: 'Vui lòng chọn tình trạng hôn nhân.'
  },
  ownerProperty: {
    empty: 'Vui lòng chọn thông tin riêng về nhà ở.'
  },
  telephone: {
    invalid_format: 'Số điện thoại bàn không đúng định dạng.'
  },
  mobile: {
    empty: 'Vui lòng nhập số điện thoại đi động.',
    invalid_format: 'Số điện thoại không đúng định dạng.',
    invalid_phone_vn: 'Số điện thoại không đúng với đầu số Việt Nam.'
  },
  email: {
    invalid_format: 'Email không đúng định dạng.'
  },
  education: {
    empty: 'Vui lòng chọn trình độ học vấn.'
  },
  economic: {
    empty: 'Vui lòng chọn ngành nghề kinh tế.'
  },
  relationship: {
    empty: 'Vui lòng chọn mối quan hệ với KH vay.'
  },
  tax: {
    empty_id: 'Vui lòng nhập số CMND/CCCD/Hộ chiếu.',
    empty_tax: 'Vui lòng nhập mã số thuế.',
    invalid_format_id: 'Số CMND/CCCD/Hộ chiếu không đúng định dạng.',
    invalid_format_tax: 'Mã số thuế không đúng định dạng'
  },
  cif: {
    invalid_format: 'Mã CIF không đúng định dạng.'
  },
  FATCA: {
    empty: 'Vui lòng chọn thông tin FATCA.'
  },
  career: {
    empty: 'Vui lòng chọn nghề nghiệp.'
  },
  income3month: {
    empty: 'Vui lòng chọn thu nhập bình quân 3 tháng.'
  },
  identityType: {
    empty: 'Vui lòng chọn loại giấy tờ định danh.'
  },
  identityNum: {
    empty: 'Vui lòng nhập số định danh.',
    invalid_format: 'Số định danh không đúng định dạng.',
    exist: 'Số định danh đã tồn tại',
    passport:"Số hộ chiếu không hợp lệ. Vui lòng nhập 1 ký tự và 7 số"
  },
  identityIssuedDate: {
    empty: 'Vui lòng chọn ngày cấp.',
    not_exist: 'Cấp không tồn tại.',
    less_than_birthday: 'Ngày cấp phải lớn hơn ngày sinh.'
  },
  identityExpiredDate: {
    empty: 'Vui lòng chọn ngày hết hạn',
    not_exist: 'Ngày hết hạn không tồn tại.',
    less_than_issued_date: 'Ngày hết hạn phải lớn hơn ngày cấp',
    bigger_than_today: 'Ngày hết hạn phải lớn hơn ngày hiện tại'
  },
  identityPlaceOfIssued: {
    empty: 'Vui lòng nhập nơi cấp'
  },
  addressResident: {
    empty: 'Vui lòng chọn cư trú'
  },
  addressLocation: {
    empty: 'Vui lòng nhập location'
  },
  addressType: {
    empty: 'Vui lòng chọn loại địa chỉ'
  },
  addressApartment: {
    empty: 'Vui lòng nhập địa chỉ'
  },
  addressProvince: {
    empty: 'Vui lòng chọn Tỉnh/TP'
  },
  addressDistrict: {
    empty: 'Vui lòng chọn Quận/huyện'
  },
  addressWard: {
    empty: 'Vui lòng chọn Phường/xã'
  },
  permanentAddressApartment: {
    empty: 'Vui lòng nhập địa chỉ'
  },
  permanentAddressProvince: {
    empty: 'Vui lòng chọn Tỉnh/TP'
  },
  permanentAddressDistrict: {
    empty: 'Vui lòng chọn Quận/huyện'
  },
  permanentAddressWard: {
    empty: 'Vui lòng chọn Phường/xã'
  },
  tempAddressApartment: {
    empty: 'Vui lòng nhập địa chỉ'
  },
  tempAddressProvince: {
    empty: 'Vui lòng chọn Tỉnh/TP'
  },
  tempAddressDistrict: {
    empty: 'Vui lòng chọn Quận/huyện'
  },
  tempAddressWard: {
    empty: 'Vui lòng chọn Phường/xã'
  },
  loanType:{
    empty:'Vui lòng chọn loại hình cho vay'
  },
  productPurpose:{
    empty:'Vui lòng chọn mục đích vay theo SP'
  },
  corePurpose:{
    empty:'Vui lòng chọn mục đích vay(theo CORE)'
  },
  realPurpose:{
    empty:'Vui lòng nhập mục đích sử dụng vốn vay thực tế'
  },
  currency:{
    empty:'Vui lòng chọn loại tiền cho vay'
  },
  need:{
    empty:'Vui lòng nhập tổng nhu cầu vốn(A)'
  },
  ownCaptital:{
    empty:'Vui lòng nhập vốn tự có(B)',
    role_short:'Tối thiểu 10% đối với vay "Ngắn hạn',
    role_long:'Tối thiểu 20% đối với "Trung hạn" và "Dài hạn"'
  },
  method:{
    empty:'Vui lòng chọn phương thức đề nghị cấp tín dụng'
  },
  expiredCredit:{
    empty:'Vui lòng nhập thời hạn đề nghị CTD/duy trì HMTD (tháng)',
    short: 'Thời hạn CTD cho vay Ngắn hạn tối đa 12 tháng',
    medium:'Thời hạn CTD cho vay Trung hạn từ 12 tháng tới 60 tháng',
    long:'Thời hạn CTD cho vay Dài hạn phải trên 60 tháng',
    age: 'Thời hạn cấp TD của người vay vượt qua 70 tuổi khi kết thúc '
  },
  expiredWithdraw:{
    empty:'Vui lòng nhập thời hạn từng lần rút vốn (tháng)'
  },
  graceOrigin:{
    empty:'Vui lòng nhập thời hạn ân hạn gốc (tháng)'
  },
  interestRate:{
    empty:'Vui lòng nhập lãi suất cho vay (%/năm)',
    rate: 'Lãi suất cho vay không quá 100%'
  },
  periodAdjust:{
    empty:'Vui lòng chọn định kỳ điều chỉnh lãi suất cho vay (%)'
  },
  marginAdjust:{
    empty:'Vui lòng nhập biên độ điều chỉnh lãi suất cho vay (%)',
    equal:'Biên độ điều chỉnh lãi suất cho vay phải nhỏ hơn 100'
  },
  disbursementMethod:{
    empty:'Vui lòng chọn phương thức giải ngân'
  },
  repayOriginMethod:{
    empty:'Vui lòng chọn phương thức trả nợ gốc'
  },
  repayinterestMethod:{
    empty:'Vui lòng chọn phương thức trả nợ lãi'}
  ,
  amountPaidEachPeriod:{
    empty:'Vui lòng nhập số tiền gốc dự kiến trả mỗi kỳ (VNĐ)',
    compare:'Số tiền gốc dự kiến trả mỗi kỳ không hợp lệ'
  },
  // Loan business house
  nameBusinessHouse:{
    empty:'Vui lòng nhập tên hộ kinh doanh cá thể'
  },
  numConfirm:{
    empty:'Vui lòng nhập số giấy xác nhận'
  },
  issuedDate:{
    empty:'Vui lòng nhập ngày cấp',
    date:'Ngày cấp không thể lớn hơn ngày hiện tại'
  },
  numOfYear :{
    empty:'Vui lòng nhập số năm kinh doanh',
  },
  careerReality: {
    empty:'Vui lòng nhập ngành nghề SXKD thực tế',
  },
  placeOfIssued: {
    empty:'Vui lòng nhập nơi cấp'
  },
  areaBussiness: {
    empty:'Vui lòng nhập diện tích cơ sở kinh doanh'
  },
  codeNameBusiness:{
    empty:'Vui lòng chọn Ngành nghề KDC'
  },
  ownership:{
    empty:'Vui lòng chọn tình trạng sỡ hữu/sử dụng'
  },
  addressBusiness:{
    empty:'Vui lòng nhập địa điểm kinh doanh chính'
  },
  revenueT:{
    empty:'Vui lòng nhập liệu'
  },
  revenueKH:{
    empty:'Vui lòng nhập liệu'
  },
  revenueNVKD:{
    empty:'Vui lòng nhập liệu'
  },
  T9:{
    empty:'Vui lòng nhập liệu'
  },
  KH9:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD9:{
    empty:'Vui lòng nhập liệu'
  },
  T10:{
    empty:'Vui lòng nhập liệu'
  },
  KH10:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD10:{
    empty:'Vui lòng nhập liệu'
  },
  T11:{
    empty:'Vui lòng nhập liệu'
  },
  KH11:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD11:{
    empty:'Vui lòng nhập liệu'
  },
  T12:{
    empty:'Vui lòng nhập liệu'
  },
  KH12:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD12:{
    empty:'Vui lòng nhập liệu'
  },
  debtGroup:{
    empty:'Vui lòng chọn nhóm nợ cao nhất'
  },
  T15:{
    empty:'Vui lòng nhập liệu'
  },
  KH15:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD15:{
    empty:'Vui lòng nhập liệu'
  },
  T16:{
    empty:'Vui lòng nhập liệu'
  },
  KH16:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD16:{
    empty:'Vui lòng nhập liệu'
  },
  T17:{
    empty:'Vui lòng nhập liệu'
  },
  KH17:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD17:{
    empty:'Vui lòng nhập liệu'
  },
  T18:{
    empty:'Vui lòng nhập liệu'
  },
  KH18:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD18:{
    empty:'Vui lòng nhập liệu'
  },
  T20:{
    empty:'Vui lòng nhập liệu'
  },
  KH20:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD20:{
    empty:'Vui lòng nhập liệu'
  },
  T21:{
    empty:'Vui lòng nhập liệu'
  },
  KH21:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD21:{
    empty:'Vui lòng nhập liệu'
  },
  T22:{
    empty:'Vui lòng nhập liệu'
  },
  KH22:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD22:{
    empty:'Vui lòng nhập liệu'
  },
  T23:{
    empty:'Vui lòng nhập liệu'
  },
  KH23:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD23:{
    empty:'Vui lòng nhập liệu'
  },
  infoInput: {
    empty: 'Vui lòng nhập thông tin nhà cung cấp chính'
  },
  infoOutput: {
    empty: 'Vui lòng nhập thông tin đối tác mua hàng'
  },
  CNote: {
    empty: 'Vui lòng nhập nhận xét'
  },
  CSuggest: {
    empty: 'Vui lòng nhập nhận xét'
  },
  T25:{
    empty:'Vui lòng nhập liệu'
  },
  KH25:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD25:{
    empty:'Vui lòng nhập liệu'
  },
  T26:{
    empty:'Vui lòng nhập liệu'
  },
  KH26:{
    empty:'Vui lòng nhập liệu'
  },
  NVKD26:{
    empty:'Vui lòng nhập liệu'
  },
  debGroup:{
    empty:'aaaaaa'
  },
  certificateNumber: {
    empty:'Vui lòng nhập liệu'
  },
  collateralSubType: {
    empty:'Vui lòng nhập liệu'
  },
  landNumber:{
    empty:'Vui lòng nhập số thử đất'
  },
  mapNumber:{
    empty:'Vui lòng nhập tờ bản đồ'
  },
  area:{
    empty:'Vui lòng nhập diện tích đất theo GCN (m2)'
  },
  realArea:{
    empty:'Vui lòng nhập diện tích đất thực tế  (m2)'
  },
  buildingArea:{
    empty:'Vui lòng nhập diện tíc xây dựng'
  },
  certificateArea:{
    empty:'Vui lòng nhập diện sàn theo GCN (m2)'
  },
  realAreaAsset:{
    empty:'Vui lòng nhập diện tích sàn thực tế (m2)'
  },
  expiryDate:{
    empty:'Vui lòng nhập thời hạn sở hữu (năm)'
  },
  ownerType:{
    empty:'Vui lòng nhập hình thức sở hữu'
  },
  startDate:{
    empty:'Vui lòng nhập thời gian sử dụng từ'
  },
  endDate:{
    empty:'Vui lòng nhập thời gian sử dụng đến'
  },
  areaMarket:{
    empty:'Vui lòng nhập diện tích sử dụng'
  },
  Price:{
    empty:'Vui lòng nhập tổng giá trị định giá'
  },
  loanRate:{
    empty:'Vui lòng nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV)'
  },
  landNumberApartment:{
    empty:'Vui lòng nhập số thử đất'
  },
  areaApartment:{
    empty:'Vui lòng nhập diện tích đất theo GCN (m2)'
  },
  expiryDateApartment:{
    empty:'Vui lòng nhập thời hạn sử dụng đất (năm)'
  },

  evaluate_info:{
    empty:'Vui lòng chọn dánh giá về Phương án và nhu cầu vay vốn'
  },
  loan_comment:{
    empty:'Vui lòng nhập nhận xét'
  }
  
}
export const ValidateWarehouseMessage = {
  area:{
    empty:'Vui lòng nhập diện tích(m2)'
  },
  address:{
    empty:'Vui lòng nhập địa chỉ'
  },
  addressProvince:{
    empty:'Vui lòng nhập tỉnh/Tp'
  },
  addressDistrict: {
    empty:'Vui lòng chọn Quận/huyện'
  },
  addressWard: {
    empty:'Vui lòng chọn Phường/xã'
  },
}
// TSBD validate mess
export const ValidateCollateralMesssage = {
  issuedDate: {
    empty: 'Vui lòng chọn ngày cấp.',
    not_exist: 'Cấp không tồn tại.',
    less_than_birthday: 'Ngày cấp phải lớn hơn ngày sinh.',

  },
  status:{
    empty: 'Vui lòng chọn trạng thái BDS'
  },
  valuation_id:{
    empty: 'Vui lòng nhập mã báo cáo/Chứng thư thẩm định giá'
  },
  valuation_date:{
    empty: 'Vui lòng chọn thời điểm báo cáo/Chứng thư TĐ giá',
    date: 'Thời điểm báo cáo/Chứng thư TĐ không hợp lệ'
  },
  valuation_unit_type:{
    empty: 'Vui lòng chọn đơn vị thực hiện thẩm định giá'
  },
  valuation_unit:{
    empty: 'Vui lòng nhập ĐVKD thẩm định giá'
  },
  valuation_center:{
    empty: 'Vui lòng chọn TT.TĐTS thực hiện thẩm định giá'
  },
  independence_organization:{
    empty: 'Vui lòng chọn tổ chức định giá độc lập'
  },
  other_independence_organization:{
    empty: 'Vui lòng chọn tổ chức định giá độc lập khác'
  },
  purpose:{
    empty: 'Vui lòng chọn mục đích định giá'
  },
  other_purpose:{
    empty: 'Vui lòng nhập thông tin mục đích định giá khác'
  },
  max_percentage:{
    empty: 'Common.Error.Max',
    maxRatio: 'Vui lòng nhập Tỷ lệ cho vay tối đa theo quy định',
    maxRatioOver: 'Tỷ lệ cho vay tối đa theo quy định không vượt quá 100%',
    maxDeposit: 'Common.Error.Max_Over',
  },
  max_percentage_ratio:{
    maxRatio: 'Vui lòng nhập Tỷ lệ cho vay tối đa theo quy định',
    maxRatioOver: 'Tỷ lệ cho vay tối đa theo quy định không vượt quá 100%',
  },
  address:{
    empty: 'Vui lòng nhập địa chỉ'
  },
  province: {
    empty:'Vui lòng chọn Tỉnh/TP'
  },
  district: {
    empty:'Vui lòng chọn Quận/huyện'
  },
  ward: {
    empty:'Vui lòng chọn Phường/xã'
  },
  nonBusinessArea: {
    empty:'Vui lòng nhập tỷ lệ diện tích BĐS không kinh doanh',
    max: 'Tỷ lệ diện tích BĐS không kinh doanh không vượt quá 100%'
  },
  ValueOfLandAPPA: {
    empty:'Vui lòng nhập giá trị quyền sở hữu CHCC (VNĐ)',
    zero:'Vui lòng nhập giá trị quyền sở hữu CHCC lớn hơn 0',
  },
  ValueOfLandLAND: {
    empty:'Vui lòng nhập giá trị QSD đất theo từng GCN (VNĐ)',
    zero:'Vui lòng nhập giá trị QSD đất theo từng GCN lớn hơn 0',
  },
  ValueOfLandMARK: {
    empty:'Vui lòng nhập giá trị sạp chợ/ô TTTM (VNĐ)',
    zero:'Vui lòng nhập giá trị sạp chợ/ô TTTM lớn hơn 0',
  },
  ratio:{
    empty: 'Vui lòng nhập tỷ lệ cho vay tối đa theo quy định (%)'
  },
  value:{
    empty: 'Vui lòng nhập giá trị'
  },
  value_mmtb:{
    empty: 'Vui lòng nhập giá trị máy móc thiết bị'
  },
  value_ptvt:{
    empty: 'Vui lòng nhập giá trị PTVT'
  },
  typeCollateral:{
    empty: 'Vui lòng nhập loại tài sản'
  },
  license:{
    empty: 'Vui lòng nhập số giấy tờ đăng ký'
  },
  collateral_status:{
    empty: 'Vui lòng nhập tình trạng tài sản'
  },
  info_collatetal:{
    empty: 'Vui lòng nhập thông tin nghĩa vụ đang đảm bảo'
  },
  description:{
    empty: 'Vui lòng nhập mô tả tài sản'
  },
  typeLocation:{
    empty:'Vui lòng chọn loại vị trí'
  },
  widthRoad:{
    empty:'Vui lòng chọn chiều rộng đường hiện hữu'
  },
  infoGuaranteed:{
    empty:'Vui lòng nhập thông tin nghĩa vụ đang đảm bảo'
  },
  informationAuthorized:{
    empty:'Vui lòng thêm người được ủy quyền'
  },
  owner_relationship:{
    empty:'Vui lòng nhập mối quan hệ giữa người được uỷ quyền với chủ tài sản'
  },
  quantity:{
    empty: 'Vui lòng nhập số lượng'
  },
  borrower_relationship:{
    empty:'Vui lòng nhập mối quan hệ giữa người được uỷ quyền với đối tượng vay'
  },
  authorize_contract:{
    empty:'Vui lòng nhập hợp đồng ủy quyền'
  },
  date: {
    empty: 'Vui lòng chọn ngày.',
    not_exist: 'Ngày được chọn không tồn tại.',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  contract_date:{
    empty: 'Vui lòng chọn ngày.',
    not_exist: 'Ngày được chọn không tồn tại.',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  certificate_name:{
    empty:'Vui lòng nhập tên GCN'
  },
  certificate_code:{
    empty:'Vui lòng nhập số GCN'
  },
  place_of_issue:{
    empty:'Vui lòng nhập nơi cấp'
  },
  contract_name:{
    empty:'Vui lòng nhập tên hợp đồng thuê/mua địa điểm KD'
  },
  contract_code:{
    empty:'Vui lòng nhập số  hợp đồng thuê/mua địa điểm KD'
  },
  contract_unit:{
    empty:'Vui lòng nhập bên cho thuê/mua địa điểm kinh doanh'
  },
  market_name:{
    empty:'Vui lòng nhập tên  chợ/TTTM'
  },
  market_code:{
    empty:'Vui lòng nhập số hiệu gian hàng/Sạp chợ'
  },
  marketLocation:{
    empty:'Vui lòng nhập vị trí'
  },
  sector:{
    empty:'Vui lòng nhập ngành hàng kinh doanh'
  },
  used_area:{
    empty:'Vui lòng nhập diện tích sử dụng'
  },
  value_area:{
    empty:'Vui lòng nhập diện tích tính giá trị'
  },
  structure:{
    empty:'Vui lòng nhập kết cấu theo chứng từ pháp lý'
  },
  descriptionLand: {
    empty: 'Vui lòng nhập thông tin nghĩa vụ đang đảm bảo'
  },
  issuer:{
    empty: 'Vui lòng chọn nhà phát hành'
  },
  other_issuer:{
    empty: 'Vui lòng nhập nhà phát hành khác'
  },
  count:{
    empty: 'Vui lòng nhập số lượng từng loại'
  },
  year:{
    empty: 'Vui lòng nhập năm sản xuất'
  },
  branch:{
    empty: 'Vui lòng nhập nhãn hiệu'
  },
  other_brand:{
    empty: 'Vui lòng nhập nhãn hiệu khác'
  },
  model:{
    empty: 'Vui lòng nhập số loại'
  },
  production:{
    empty: 'Vui lòng nhập nơi sản xuất/lắp ráp'
  },
  transportation_sub_type:{
    empty: 'Vui lòng chọn/nhập loại phương tiện'
  },
  other_transportation_sub_type:{
    empty: 'Vui lòng nhập loại phương tiện khác'
  },
  origin_of_production:{
    empty: 'Vui lòng chọn nơi sản xuất lắp ráp'
  },
  other_origin_of_production:{
    empty: 'Vui lòng nhập nơi sản xuất lắp ráp khác'
  },
  CLCL:{
    empty: 'Vui lòng nhập chất lượng còn lại thẩm định'
  },
  legal_document_types:{
    emptyDocs: 'Vui lòng chọn loại hồ sơ pháp lý'
  },
  purpose_using_lane:{
    empty: 'Vui lòng chọn mục đích sử dụng đất'
  },
  purpose_using_lane_other:{
    empty: 'Vui lòng nhập mục đích sử dụng đất khác'
  },
  use_purpose:{
    empty: 'Vui lòng thêm mục đích sử dụng đất theo GCN'
  },
  certificate_area:{
    empty: 'Vui lòng nhập diện tích đất theo GCN'
  },
  real_area:{
    empty: 'Vui lòng nhập diện tích đất thực tế'
  },
  land_use_source:{
    empty: 'Vui lòng chọn nguồn gốc sử dụng đất theo GCN'
  },
  other_land_use_source:{
    empty: 'Vui lòng nhập nguồn gốc sử dụng đất theo GCN khác'
  },
  usage_form:{
    empty: 'Vui lòng chọn hình thức sử dụng đất theo GCN'
  },
  other_usage_form:{
    empty: 'Vui lòng nhập hình thức sử dụng đất theo GCN khác'
  },
  asset_legal:{
    empty: 'Vui lòng chọn pháp lý CTXD'
  },
  legal_CTXD_other:{
    empty: 'Vui lòng nhập pháp lý CTXD khác'
  },
  project_name:{
    empty:'Vui lòng nhập tên dự án chung cư/nhà chung cư'
  },
  other_certificate_type:{
    empty:'Vui lòng chọn loại GCN'
  },
  other_certificate_type_other:{
    empty:'Vui lòng nhập loại GCN khác'
  },
  certificate_no:{
    empty:'Vui lòng nhập số vào sổ cấp GCN'
  },
  contract_number_type:{
    empty:'Vui lòng nhập loại hợp đồng'
  },
  contract_number:{
    empty:'Vui lòng nhập số hợp đồng'
  },
  department_info:{
    empty:'Vui lòng thêm căn hộ'
  },

  apartment_type:{
    empty:'Vui lòng chọn loại căn hộ'
  },

  apartment_number:{
    empty:'Vui lòng nhập căn hộ số'
  },
  block:{
    empty:'Vui lòng nhập block/Tháp'
  },
  floor:{
    empty:'Vui lòng nhập tầng'
  },
  real_area_apa_info:{
    empty:'Vui lòng nhập diện tích căn hộ theo thực tế'
  },
  certificate_area_apa_info:{
    empty:'Vui lòng nhập diện tích căn hộ theo pháp lý'
  },
  use_purposes:{
    empty:'Vui lòng chọn mục đích sử dụng đất'
  },
  cer_use_purpose:{
    empty:'Vui lòng nhập tên dự án chung cư/nhà chung cư'
  },
  certificate_area_apa:{
    empty:'Vui lòng nhập diện tích đất theo GCN'
  },
  real_area_apa:{
    empty:'Vui lòng nhập diện tích đất thực tế'
  },
  land_use_source_apa:{
    empty:'Vui lòng chọn nguồn gốc sử dụng đất theo GCN'
  },
  duration:{
    empty:'Vui lòng nhập thời hạn sử dụng đất theo GCN'
  },
  usage_form_apa:{
    empty:'Vui lòng chọn hình thức sử dụng đất theo GCN'
  },
  house_type:{
    empty:'Vui lòng nhập loại nhà ở'
  },
  other_apartment_type:{
    empty:'Vui lòng nhập loại căn hộ khác'
  },
  land_asset_type:{
    empty:'Vui lòng chọn loại công trình'
  },
  land_asset_type_other:{
    empty:'Vui lòng nhập loại công trình khác'
  },
  non_business_area:{
    empty: 'Vui lòng nhập tỷ lệ diện tích BĐS không kinh doanh',
    max: 'Tỷ lệ diện tích BĐS không kinh doanh không vượt quá 100%'
  },
  typeUseLand:{
    empty: 'Vui lòng chọn GCN quyền sử dụng đất'
  },
  typeGCN:{
    empty: 'Vui lòng nhập GCN quyền sử dụng đất khác'
  },
  numberGCNLegal:{
    empty: 'Vui lòng nhập số GCN/giấy tờ pháp lý'
  },
  numberGCN:{
    empty: 'Vui lòng nhập số vào sổ cấp GCN'
  },
  dateRange:{
    empty: 'Vui lòng nhập số vào sổ cấp GCN'
  },
  other_use_purpose:{
    empty: 'Vui lòng nhập mục đích sử dụng đất (theo thẩm định giá) khác'
  },
  other_position_type:{
    empty: 'Vui lòng nhập  loại vị trí khác'
  },
  number_register:{
    empty: 'Vui lòng nhập số giấy tờ đăng ký'
  },
}

export const ValidateMessageeLegal = {
  fullname: {
    empty: 'Vui lòng nhập họ tên người vay chính',
    empty_marriage: 'Vui lòng nhập họ và tên người hôn phối',
    empty_co_borrower: 'Vui lòng nhập họ và tên người đồng vay',
    empty_co_payer: 'Vui lòng nhập họ và tên người đồng trả nợ',
    empty_legal_related: "Vui lòng nhập tên tổ chức cá nhân",
    empty_legal_contact: "Vui lòng nhập tên người liên hệ",
    empty_legal_ohter: "Vui lòng nhập họ và tên đối tượng khác"
  },
  numtax:{
    empty: 'Vui lòng nhập đúng định dạnh MST/CMND',
    tax:"Vui lòng nhập trong khoảng 10 đến 20 số"
  },

  customerType: {
    empty: 'Vui lòng nhập loại khách hàng',
    empty_legal_related: "Vui lòng chọn loại tổ chức/cá nhân"
  },
  birthday: {
    empty: 'Vui lòng nhập ngày sinh',
    birthday: 'Độ tuổi không phù hợp.'
  },
  gender: {
    empty: 'Vui lòng chọn giới tính'
  },
  telephone: {
    empty: 'Vui lòng nhập sdt bàn',
    invalid_format: 'Số điện thoại bàn không đúng định dạng.',
    invalid_phone_vn: 'Vui lòng nhập trong khoảng 9 đến 12 số.',
  },
  marriageStatus: {
    empty: 'Vui lòng chọn tình trạng hôn nhân'
  },
  ownerProperty: {
    empty: 'Vui lòng chọn thông tin riêng về nhà ở'
  },
  mobile: {
    empty: 'Vui lòng nhập số điện thoại đi động.',
    invalid_format: 'Số điện thoại không đúng định dạng.',
    invalid_phone_vn: 'Số điện thoại không đúng với đầu số Việt Nam.',
    is_exist: "Số điện thoại bị trùng, vui lòng nhập số khác"
  },
  education: {
    empty: 'Vui lòng chọn trình độ học vấn'
  },
  ecomonic: {
    empty: 'Vui lòng chọn ngành nghề kinh tế'
  },
  fatca: {
    empty: 'Vui lòng chọn thông tin FATCA'
  },
  email:{
    invalid_format: 'Địa chỉ email không hợp lệ',
    max_length: 'Địa chỉ email chỉ cho phép nhập tối đa 255 ký tự'
  },
  career: {
    empty: 'Vui lòng chọn nghề nghiệp'
  },
  income3Month: {
    empty: 'Vui lòng nhập thu nhập bình quân 3 tháng'
  },
  num: {
    empty: 'Vui lòng nhập số định danh.',
    invalid_format: 'Số định danh không đúng định dạng.',
    exist: "Số định danh đã tồn tại",
    passport:"Số hộ chiếu không hợp lệ. Vui lòng nhập 1 ký tự và 7 số"
    // exist_valid: "Số định dạnh đã được sử dụng, vui long nhập lại"
  },
  issuedDate: {
    empty: 'Vui lòng chọn ngày cấp.',
    not_exist: 'Cấp không tồn tại.',
    less_than_birthday: 'Ngày cấp phải lớn hơn ngày sinh.',

  },
  expiredDate: {
    empty: 'Vui lòng chọn ngày hết hạn',
    not_exist: 'Ngày hết hạn không tồn tại.',
    less_than_issued_date: 'Ngày hết hạn phải lớn hơn ngày cấp',
    bigger_than_today: 'Ngày hết hạn phải lớn hơn ngày hiện tại'

  },
  placeOfIssue: {
    empty: 'Vui lòng nhập nơi cấp'
  },
  resident: {
    empty: 'Vui lòng chọn nơi cư trú'
  },
  location: {
    empty: 'Vui lòng nhập location'
  },
  permanent_apartment: {
    empty: 'Vui lòng nhập địa chỉ thường trú'
  },
  permanent_province: {
    empty: 'Vui lòng chọn tỉnh/TP'
  },
  permanent_district: {
    empty: 'Vui lòng chọn quận/huyện'
  },
  permanent_ward: {
    empty: 'Vui lòng chọn phường/xã'
  },
  mailing_apartment: {
    empty: 'Vui lòng nhập địa chỉ liên hệ'
  },
  mailing_province:{
    empty: 'Vui lòng chọn tỉnh/TP'
  },
  mailing_district: {
    empty: 'Vui lòng chọn quận/huyện'
  },
  mailing_ward: {
    empty: 'Vui lòng chọn phường/xã'
  },
  relationship: {
    empty: 'Vui lòng chọn mối quan hệ với KH vay.'
  },
}

export const ValidateMessageIncome ={
  license:{
    empty: 'Vui lòng nhập số quyết định nghỉ hưu'
  },
  startDate:{
    empty:'Vui lòng nhập thời gian bắt đầu nhận lương nghĩ hưu',
    in_valid:'Vui lòng nhập thời gian bắt đầu nhận lương nghĩ hưu lớn hơn ngày hiện tại'
  },
  insurance:{
    empty: 'Vui lòng nhập số bảo hiểm xã hội'
  },
  salary: {
    empty:'Vui lòng nhập số tiền lương hưu theo tháng',
    in_valid: 'Vui lòng nhập số tiền lương hưu trí lớn hơn 0'
  },
  frequency: {
    empty:'Vui lòng chọn tần suất thu nhập'
  },
  year: {
    empty:'Vui lòng nhập số năm nhận',
    in_valid: 'Số năm nhận cổ tức/lợi nhuận phải lớn hơn hoặc bằng 2',
    in_length: 'Số năm nhận cổ tức/lợi nhuận không được nhập số hàng trăm (tối đa 2 số)'
  },
  count: {
    empty:'Vui lòng nhập số lần nhận trong năm',
    in_valid: 'Số lần nhận thu nhập cổ tức/lợi nhuận trong năm phải lớn hơn hoặc bằng 1',
    in_length: 'Số lần nhận thu nhập cổ tức/lợi nhuận trong năm không được nhập số hàng trăm (tối đa 2 số)'
  },
  profit: {
    empty:'Vui lòng nhập thu nhập bình quân theo tháng',
    in_valid: 'Vui lòng nhập giá trị lớn hơn 0'
  },
  type: {
    empty:'Vui lòng nhập loại hình doanh nghiệp'
  },
  name: {
    empty:'Vui lòng nhập họ và tên'
  },
  businessName: {
    empty:'Vui lòng nhập tên doanh nghiệp'
  },
  tax: {
    empty:'Vui lòng nhập mã số thuế',
    isValid: "Mã số thuế đã tồn tại vui lòng nhập mã số thuế khác"
  },
  phone: {
    empty:'Vui lòng nhập số điện thoại liên lạc',
    invalid_format: 'Số điện thoại không đúng định dạng.',
    invalid_phone_vn: 'Số điện thoại không đúng với đầu số Việt Nam.',
    invalid_exited: "Số điện thoại đã được sử dụng, vui lòng nhập số điện thoại khác"
  },
  licenseDate: {
    empty:'Vui lòng nhập ngày đăng ký hoạt động của Doanh nghiệp',
    in_valid: 'Ngày đăng ký hoạt động của Doanh nghiệp phải nhỏ hơn ngày hiện tại'
  },
  profitCompany: {
    empty:'Vui lòng nhập lợi nhuận bình quân theo tháng'
  },
  location: {
    empty:'Vui lòng nhập địa chỉ liên hệ'
  },
  province: {
    empty:'Vui lòng chọn Tỉnh/TP'
  },
  district: {
    empty:'Vui lòng chọn Quận/huyện'
  },
  ward: {
    empty:'Vui lòng chọn Phường/xã'
  },
  ownedStatus: {
    empty:'Vui lòng chọn thuộc sở hữu và sử dụng'
  },
  description: {
    empty:'Vui lòng nhập mô tả'
  },
  assetType: {
    empty:'Vui lòng chọn loại tài sản cho thuê'
  },
  registrationPlate: {
    empty:'Vui lòng nhập biển kiểm soát/đăng ký phương tiện'
  },
  price: {
    empty:'Vui lòng nhập giá cho thuê theo tháng',
    in_valid: 'Vui lòng nhập giá trị lớn hơn 0'
  },
  idAssetRent:{
    empty:'Vui lòng nhập giấy chứng nhận / mã tài sản cho thuê'
  },
  currency:{
    empty:'Vui lòng chọn loại tiền cho vay'
  },
  account:{
    empty:'Vui lòng nhập số tài khoản tiền gửi'
  },
  balance: {
    empty:'Vui lòng nhập số dư tiền gửi'
  },
  term: {
    empty: 'Vui lòng nhập thời gian duy trì liên tục số dư'
  },
  // name: {
  //   empty: 'Vui lòng nhập họ và tên'
  // }, 
  workingTime: {
    empty: 'Vui lòng nhập thời gian kinh doanh thực tế',
    maximum: 'Thời gian kinh doanh thức tế phải lớn hơn 1 năm'
  },
  turnover: {
    empty: 'Vui lòng nhập doanh thu bình quân theo tháng',
    in_valid: 'Doanh thu bình quân tháng (VND) phải lớn hơn 0'
  },
  cost: {
    empty: 'Vui lòng nhập chi phí bình quân tháng',
    in_valid: 'Vui lòng nhập giá trị lớn hơn 0'
  },
  frequencyYear: {
    empty: 'Vui lòng nhập số lần nhận thu nhập theo năm'
  },
  areaActivity: {
    empty: 'Vui lòng chọn khu vực hoạt động'
  },
  companyName: {
    empty: 'Vui lòng nhập tên doanh nghiệp'
  },
  career: {
    empty: 'Vui lòng chọn lãnh vực chuyên môn'
  },
  yearExperience: {
    empty: 'Vui lòng nhập số năm kinh nghiệm công tác',
    in_valid: 'Kinh nghiệm công tác tại lĩnh vực chuyên môn phải lớn hơn 0'
  },
  startDateWork: {
    empty: 'Vui lòng chọn ngày bắt đầu làm việc',
    in_valid: 'Ngày bắt đầu làm việc phải nhỏ hơn ngày hiện tại'
  },
  contractType: {
    empty: 'Vui lòng chọn loại hợp đồng lao động'
  },
  receivedMethod: {
    empty: 'Vui lòng chọn phương thức nhận lương'
  },
  income: {
    empty: 'Vui lòng nhập thu nhập và các khoản trợ cấp',
    in_valid: 'Thu nhập lương và các khoản phụ cấp (VND) phải lớn hơn 0'
  },
  companyCate: {
    empty: 'Vui lòng nhập Tổ chức/Công ty/Đơn vị công tác hiện tại'
  },
  note: {
    empty: 'Vui lòng nhập mô tả'
  },
  totalCost: {
    empty: 'Vui lòng nhập tổng chi phí'
  },
  companyType: {
    empty: 'Vui lòng chọn loại hình doanh nghiệp'
  },
  representative:{
    empty: 'Vui lòng chọn người đại diện hộ kinh doanh'
  },
  publish_unit_id:{
    empty: 'Vui lòng chọn đơn vị phát hành'
  },
  differentValue: {
    less_than_0: 'Thông tin nhập liệu không hợp lệ'
  }
}
export const ValidateMessageOther={
  exceptionName:{
    empty: "Vui lòng chọn loại ngoại lệ",

  },
  exceptionDetailCode: {
    empty: 'Vui lòng chọn mã ngoại lệ',
    isExist: 'Mã ngoại lệ đã tồn tại',
  },
  exceptionRealityDescription: {
    empty: "Vui lòng nhập diễn giải thực tế",
  },
  reasonCredit: {
    empty: "Vui lòng nhập lí do",
  },
  riskInfo: {
    empty: "Vui lòng chọn loại rủi ro",
  },
  measuresLimitRisk: {
    empty: "Vui lòng nhập biện pháp hạn chế rủi ro",
  },
  report:{
    empty:"Vui lòng nhập cơ sở đề xuất"
  }
}
export const ValidateCICMesssage = {
  debtGroup :{
    empty: "Vui lòng chọn nhóm nợ cao nhất",
  },
  code: {
    empty: "Vui lòng chọn tên loại TSBĐ",
  },
  value: {
    empty: "Vui lòng nhập giá trị TSBĐ",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"
  },
  limited:{
    empty: "Vui lòng nhập hạn mức thẻ theo thực tế",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"
  },
  balanceCard:{
    empty: "Vui lòng nhập dư nợ thẻ theo thực tế ",
    less_than: "Dư nợ thẻ không được lớn hơn Hạn mức thẻ",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"
  },
  amount: {
    empty: "Vui lòng nhập số tiền cấp tín dụng theo thực tế",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"
  },
  balanceLoan:{
    empty: "Vui lòng nhập dư nợ theo thực tế",
    less_than: "Dư nợ không được lớn hơn số tiền cấp tín dụng",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"

  },

  limitedCIC:{
    empty: "Vui lòng nhập hạn mức thẻ theo CIC",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu",

  },
  balanceCICCard:{
    empty: "Vui lòng nhập dư nợ thẻ theo CIC",
    less_than: "Dư nợ thẻ không được lớn hơn Hạn mức thẻ",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu",

  },
  amountCIC: {
    empty: "Vui lòng nhập số tiền cấp tín dụng theo CIC",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"

  },
  balanceCICLoan:{
    empty: "Vui lòng nhập dư nợ theo CIC",
    less_than: "Dư nợ không được lớn hơn số tiền cấp tín dụng",
    minValue: "Vui lòng nhập giá trị lớn hơn giá trị tối thiểu"

  },

  expired:{
    empty: "Vui lòng nhập thời hạn cấp tín dụng",
  },
  creditCode:{
    empty: "Vui lòng chọn tổ chức tín dụng",
  },
  loanDate: {
    empty: 'Vui lòng chọn ngày cập nhật CIC',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  cardDate: {
    empty: 'Vui lòng chọn ngày cập nhật CIC',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  collateralDate: {
    empty: 'Vui lòng chọn ngày cập nhật CIC',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  date:{
    empty: 'Vui lòng chọn ngày.',
    not_exist: 'Ngày được chọn không tồn tại.',
    date:'Ngày được chọn không được lớn hơn ngày hiện tại.'
  },
  score_value:{
    empty:"Vui lòng nhập điểm",
  },
  score_rank:{
    empty:"Vui lòng chọn hạng",
  },
  customer:{
    empty:"Vui lòng chọn phân loại khác hàng",
  },
  evaluation:{
    empty:"Vui lòng nhập đánh giá điểm tín dụng",
  },

}

export const ValidateApprovalCICMesssage = {
  flexcube_day :{
    empty: 'Vui lòng nhập liệu',
  },
  monthly_loan_term :{
    empty: "Vui lòng nhập liệu",
    greater_0: "Vui lòng nhập giá trị lớn hơn 0"
  },
  credit_grant_amount :{
    empty: "Vui lòng nhập liệu",
  },
  actual_balance_converted :{
    empty: "Vui lòng nhập liệu",  
  },
  group_debt :{
    empty: "Vui lòng nhập liệu",  
  },
  collateral_id:{
    empty: "Vui lòng nhập liệu",  
  },
  collateral_value:{
    empty: "Vui lòng nhập liệu",  
  },
  monthly_debt_payment_obligation:{
    empty: "Vui lòng nhập liệu",  
  },
}


export const ValidateApprovalLOANMessage ={
  evaluation_staff_t :{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
    less_than: "Giá trị nhập liệu không hợp lệ"
  },
  evaluation_staff_t1 :{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
    less_than: "Giá trị nhập liệu không hợp lệ"
  },
  emptyBasic:{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
  },
  business_unit_period_t:{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
  },
  business_unit_period_t1:{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
  },
  business_unit:{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
  },
  evaluation_staff:{
    empty: "Vui lòng nhập liệu",
    empty_0: "Vui lòng nhập số lớn hơn 0",
    less_than: "Giá trị nhập liệu không hợp lệ"
  },
  actual_purpose_using_loan:{
    empty: "Vui lòng nhập liệu",
    emptyBasic: "Vui lòng nhập liệu",
    // empty_0: "Vui lòng nhập số lớn hơn 0",
    // less_than: "Giá trị nhập liệu không hợp lệ"
  },
}


export const ValidateApprovalAdditionalMesssage = {
  number_credit_approval: {
    empty: "Vui lòng nhập liệu",
    pattern: "Sai định dạng: XXXX/P.PDTDKHCN.XX.XX"
  },
  statement_export_time: {
    date: "Vui lòng nhập liệu",
    empty:'Vui lòng nhập liệu',
  },
  number_business_unit: {
    empty: "Vui lòng nhập liệu",
  },
  reason: {
    empty: "Vui lòng nhập liệu",
  },
  business_unit_export_time: {
    date: "Vui lòng nhập liệu",
    empty:'Vui lòng nhập liệu',
  },
  legal_file_review:{
    empty: "Vui lòng nhập liệu",
  },
  phone_number: {
    empty: "Vui lòng nhập liệu",
    invalid_format: 'Số điện thoại không đúng định dạng.',
    invalid_phone_vn: 'Số điện thoại không đúng với đầu số Việt Nam.',
    is_exist: "Số điện thoại bị trùng, vui lòng nhập số khác"
  },
  result: {
    empty: "Vui lòng nhập liệu",
  },
  note:{
    empty: "Vui lòng nhập liệu",
  },
  reason_for_refusal_code:{
    empty: "Vui lòng nhập liệu",
  },
  notification:{
    empty: "Vui lòng nhập liệu",
  },
  disbursement_conditions_detail:{
    empty: "Vui lòng nhập liệu",
  },
  conditions_after_disbursement_detail:{
    empty: "Vui lòng nhập liệu",
  },
  conditions_other_detail:{
    empty: "Vui lòng nhập liệu",
  },
  number_approval_notice:{
    empty: "Vui lòng nhập liệu",
    pattern: "Sai định dạng: XXXX/P.PDTDKHCN.XX.XX"
  },
  notice_export_time:{
    empty: "Vui lòng nhập liệu",
  },
  announcement_title:{
    empty: "Vui lòng nhập liệu",
  },
  loan_amount_in_words:{
    empty: "Vui lòng nhập liệu",
  },
  total:{
    empty: "Vui lòng nhập liệu",
  },
  approval_level:{
    empty: "Vui lòng nhập liệu",
  },
  offer:{
    empty: "Vui lòng nhập liệu",
  },
}

export const ValidateApprovalLOANCollateralSpreadsheet = {
  typeCollateral: {
    empty: "Vui lòng nhập khoản vay"
  },
  loan: {
    empty: "Vui lòng nhập khoản vay"
  },
  valueProvisional: {
    empty: "Vui lòng nhập giá trị tạm tính"
  },
  maxLVT: {
    empty: "Vui lòng nhập max ltv"
  },
  debt: {
    empty: "Vui lòng nhập dư nợ đảm bảo",
    maxDept: "Dư nợ đảm bảo tài sản cao hơn Số tiền vay tối đa!!!"
  },
  price_cert_uuid: {
    empty: "Vui lòng chọn loại tài sản"
  }
}

export const ValidateApprovalLOANCollateral = {
  reason:{
    empty: "Vui lòng nhập lý do"
  }
}

export const ValidateMessageOtherApproval = {
  exception_type_id :{
    empty: 'Vui lòng chọn loại ngoại lệ'
  },
  exception_detail_id : {
    empty: 'Vui lòng chọn mã ngoại lệ'
  }
}