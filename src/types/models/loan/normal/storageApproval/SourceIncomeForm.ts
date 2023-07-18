export interface ISourceIncomeForm {
  income: ISourceIncomeFormIncome;
  balance: IApprovalIncomeBalance;
  ability_to_repay: IApprovalIncomeAbility;
}
export interface IApprovalIncomeAbility {
  uuid: string;
  sequence_item_uuid: string;
  evaluate: string | null;
  ability_to_repay_of_customer: AbilityToRepayOfCustomer;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface AbilityToRepayOfCustomer {
  assess_solvency: string;
  loan_info: LoanInfo;
  plan_payment: PlanPayment;
  repayment_on_income: UnitCellAbility;
}

export interface LoanInfo {
  loan_scb: UnitCellAbility;
  loan_scb_by_staff: UnitCellAbility;
  duration_loan: UnitCellAbility;
  lscv_scb: UnitCellAbility;
}

export interface UnitCellAbility {
  unit: string;
  value: number;
}

export interface PlanPayment {
  periodic_principal: UnitCellAbility;
  last_installment_principal: UnitCellAbility;
  interest_and_cost: UnitCellAbility;
  total_monthly_payment: UnitCellAbility;
  total_income: UnitCellAbility;
  current_loan_payment_costs: UnitCellAbility;
}

export interface IApprovalIncomeBalance {
  uuid: string;
  evaluate: string | null;
  financial_situation_of_customer: FinancialSituationOfCustomer;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface FinancialSituationOfCustomer {
  total_income: TotalIncome | null;
  total_cost: TotalCost | null;
}

export interface CostValue {
  value_by_business_household:number | null;
  value_by_staff: number | null;
}
export interface TotalCost extends CostValue {
  borrower: TotalCostDeclare | null;
  marriage: TotalCostDeclare | null;
  co_borrower: CoTotalCostDeclare | null;
  // co_payer: CoTotalCostDeclare | null;
  other_cost_by_business_household: number | null;
  other_cost_by_staff: number | null;
}export interface LoanRepaymentCostDetail extends CostValue{
  uuid?: string;
  name:string | null;
  detail:string | null;
}
export interface LoanRepaymentCost extends CostValue{
  detail:LoanRepaymentCostDetail[]
}

export interface TotalCostOtherCost extends CostValue{}
export interface TotalCostDeclare  extends CostValue {
  customer_uuid: string;
  customer_name: string;
  loan_repayment_costs: LoanRepaymentCost;
  other_cost: TotalCostOtherCost; 
}



export interface CoTotalCostDeclare  extends CostValue  {
  customer_info: TotalCostDeclare[];
}
 
export interface totalIncomeValue {
  total_income_business: number | null;
  total_income_staff: number | null;
}
export interface TotalIncome extends totalIncomeValue  {
  borrower: TotalIncomeBalanceDeclare | null;
  marriage: TotalIncomeBalanceDeclare | null;
  co_borrower: TotalIncomeCoBalanceDeclare | null;
  co_payer: TotalIncomeCoBalanceDeclare | null;
}
export interface TotalIncomeBalanceDeclare extends totalIncomeValue {
  name: string;
  customer_uuid: string;
  income_salaries: TotalIncomeBalanceStep | null;
  income_business_household: TotalIncomeBalanceStep | null;
  income_companies: TotalIncomeBalanceStep | null;
  income_asset_rent: TotalIncomeBalanceStep | null;
  income_stock: TotalIncomeBalanceStep | null;
  income_deposit: TotalIncomeBalanceStep | null;
  income_pension: TotalIncomeBalanceStep | null;
  income_other: TotalIncomeBalanceStep | null;
}

export interface TotalIncomeBalanceStep {
  value_by_business_household: number;
  value_by_staff: number;
  income_info: IncomeInfo[];
}

export interface IncomeInfo {
  name: null | string;
  detail: null | string;
  value_by_business_household: number;
  value_by_staff: number;
}

export interface TotalIncomeCoBalanceDeclare {
  total_income_business: number;
  total_income_staff: number;
  customer_info: TotalIncomeBalanceDeclare[];
}

export interface ISourceIncomeFormIncome {
  borrower: IncomeDeclareRes;
  marriage: IncomeDeclareRes;
  co_borrower: IncomeCoDeclareRes;
  co_payer: IncomeCoDeclareRes;
}

export interface IncomeDeclareRes {
  customer_uuid: string;
  customer_name: string;
  total_income: number;
  total_income_NVTTD: number;
  income: IIncomeDetails;
  uuid: string;
}

export interface Document {
  document_id: number;
  document_name: string;
  document_type: string;
  data_file: any[];
}

export interface DataFile {
  uuid: string;
  name: string;
  content_type: string;
  display_order: number | null;
  created_by: number | null | string;
  created_at: number | null;
  updated_at: number | null | string;
  updated_by: number | null | string;
}

export enum ContentType {
  Doc = "doc",
  ImagePNG = "image/png",
  ImgPNG = "img/png",
}

export interface IIncomeResDataMain {
  uuid: string;
  permanent_income_amount: number;
  occasional_income_amount: number;
}

/**
 *  SALARY
 */

export interface SalaryCompanyInfo {
  business_type_id?: string;
  business_name: string;
  business_tax?: string;
  business_phone?: string;
  business_license_date?: number;
  profit?: number;
  frequency_type: string;
  income_ratio: number;
  business_income_from_business_activities?: number;
  income_according_to_staff_rating: number;
  description: string;
  business_type?: string;
  business_fullname?: string;
  business_group?: string;
  business_field?: string;
  tax?: string;
  phone?: string;
  title?: string;
  work_experience?: number;
  start_working?: number;
  contract_type?: string;
  method_payment?: string;
  salary?: number;
  income_from_salary?: number;
}

export interface IIncomeResSalaryItem {
  name: string;
  display_order: number;
  documents: Document[];
  uuid: string;
  company_info: SalaryCompanyInfo;
}
export interface IIncomeResSalary extends IIncomeResDataMain {
  salaries: IIncomeResSalaryItem[];
  total_income_from_salary: number;
}

/**
 * ASSET-RENT
 */
export interface IIncomeResAssetRent extends IIncomeResDataMain {
  rental_properties: RentalProperty[];
  total_income_from_property_rental: number;
}
export interface AssetRent {
  total_income_from_property_rental: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  uuid: string;
  rental_properties: RentalProperty[];
}

export interface RentalProperty {
  name: string;
  display_order: number;
  uuid: string;
  rental_property_info: RentalPropertyInfo;
}

export interface RentalPropertyInfo {
  total_income_from_rental_real_estate?: number;
  asset_type: AssetType;
  real_estates?: BusinessHouseholdElement[];
  total_income_from_rental_vehicles?: number;
  asset_transportations?: BusinessHouseholdElement[];
  total_income_from_other_assets?: number;
  uuid?: null;
  other_assets?: BusinessHouseholdElement[];
}

export interface BusinessHouseholdIncomeInfo {
  frequency_year: number;
  payment_method: string;
  profit: number;
  note: string;
  frequency_type: string;
  income_ratio: number;
  income_from_other_source: number;
  income_according_to_staff_rating: number;
  description: null;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface Info {
  license_number: string;
  owned_status: string;
  frequency_type: string;
  income_ratio: number;
  price: number;
  income_from_rental_vehicles?: number;
  income_according_to_staff_rating: number;
  description: null;
  income_from_other_assets?: number;
}

export interface RealEstateInfo {
  address: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  owned_status: string;
  note: string;
  frequency_type: string;
  income_ratio: number;
  price: number;
  income_from_real_estate: number;
  income_according_to_staff_rating: number;
  description: null;
}

export interface BusinessHouseholdInfo {
  business_household_type: string;
  business_name: string;
  business_working_time: number;
  frequency_type: string;
  income_ratio: number;
  gross_revenue: number;
  cost: number;
  profit: number;
  income_from_household_business_activities: number;
  income_according_to_staff_rating: number;
  description: null;
}

export interface BusinessHouseholdElement {
  uuid: string;
  name: string;
  display_order: number;
  documents: Document[];
  transportation_info?: Info;
  other_assets_info?: Info;
  real_estate_info?: RealEstateInfo;
  business_household_info?: BusinessHouseholdInfo;
  company_info?: SalaryCompanyInfo;
  deposit_info?: DepositInfo;
  income_info?: BusinessHouseholdIncomeInfo;
  stock_info?: StockInfo;
  income_according_to_staff_rating?: number;
  description?: string;
}

/**
 * main INCOME RESPONE DETAIL
 */
export interface IIncomeDetails {
  salaries: IIncomeResSalary;
  asset_rent: IIncomeResAssetRent;
  business_household: IncomeBusinessHousehold;
  companies: Companies;
  stocks: Stocks;
  deposit: Deposit;
  pension: Pension;
  other_income: OtherIncome;
}

export interface DepositInfo {
  publish_unit_id: number;
  account_number: string;
  currency_type_id: string;
  balance: number;
  accept_blocked_account: string;
  term: number;
  profit: number;
  frequency_type: string;
  income_ratio: number;
  income_from_deposits: number;
  income_according_to_staff_rating: number;
  description: null;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface StockInfo {
  year: number;
  count: number;
  description_source: null;
  frequency_type: string;
  income_ratio: number;
  profit: number;
  income_from_stock: number;
  income_according_to_staff_rating: number;
  description: null;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export enum AssetType {
  Other = "OTHER",
  RealEstate = "REAL_ESTATE",
  Transport = "TRANSPORT",
}

export interface IncomeBusinessHousehold {
  uuid: string;
  total_income_from_business_activities: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  business_households: BusinessHouseholdElement[];
}

export interface Companies {
  uuid: string;
  total_income_from_company: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  companies: BusinessHouseholdElement[];
}

export interface Deposit {
  uuid: string;
  total_income_from_deposits: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  deposits: BusinessHouseholdElement[];
}

export interface OtherIncome {
  uuid: string;
  total_income_from_other_sources: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  income_other: BusinessHouseholdElement[];
}

export interface Pension {
  uuid: string;
  total_income_from_pension: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  documents: Document[];
  pension_info: PensionInfo;
}

export interface PensionInfo {
  license_number: string;
  start_date: number;
  insurance_number: string;
  salary: number;
  frequency_type: string;
  income_ratio: number;
  income_from_pension: number;
  income_according_to_staff_rating: number;
  description: null;
}

export interface IIncomeSalaryGet {
  uuid: string;
  total_income_from_salary: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  salaries: BusinessHouseholdElement[];
}

export interface Stocks {
  uuid: string;
  total_income_from_stocks: number;
  permanent_income_amount: number;
  occasional_income_amount: number;
  source_income_stocks: BusinessHouseholdElement[];
}

export interface IncomeCoDeclareRes {
  total_income: number;
  total_income_NVTTD: number;
  customer_info: IncomeDeclareRes[];
}
//--------------------------

export interface IUploadIncome {
  data: ILOANNormalStorageIncomeState;
  declare_type: keyof ILOANNormalStorageIncomeDeclare;
  activeIncomeSource: keyof Omit<
    ILOANNormalStorageIncomeDeclareSalary,
    "uuidDeclare" | "activeIncomeSource" | "pension"
  >;
}

export interface ILOANNormalStorageIncomeState {
  income: ILOANNormalStorageIncomeDeclare;
  balance: IApprovalIncomeBalance;
  ability: IApprovalIncomeAbility;
  declareActive: string;
  validate: ILOANNormalStorageIncomeValidate;
  activeINCOME?: string;
}
export interface ILOANNormalStorageIncomeDeclare {
  borrower: ILOANNormalStorageIncomeSalaryAcive;
  marriage: ILOANNormalStorageIncomeSalaryAcive;
  coborrower: ILOANNormalStorageIncomeSalaryAcive;
  copayer: ILOANNormalStorageIncomeSalaryAcive;
}

export interface ILOANNormalStorageIncomeDeclareSalary {
  uuidDeclare?: string;
  activeIncomeSource?: string;
  salary: ILOANNormalStorageIncomeSalaryActive;
  assetRent: ILOANNormalStorageIncomeAssetRentActive;
  business: ILOANNormalStorageIncomeBusinessActive;
  company: ILOANNormalStorageIncomeCompanyActive;
  stock: ILOANNormalStorageIncomeStockActive;
  deposit: ILOANNormalStorageIncomeDepositActive;
  pension: ILOANNormalStorageIncomePension;
  other: ILOANNormalStorageIncomeOtherActive;
}

export interface ILOANNormalStorageIncomeSalaryActive {
  data: ILOANNormalStorageIncomeSalary[];
  cacheData?: ILOANNormalStorageIncomeSalary[];
  activeSalary: string;
  uuid: string;
  total_income_from_salary_source: number | null;
  total_income_from_salary_NVTTD: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeSalary {
  uuid: string;
  name?: string;
  areaActivity: string;
  companyType: string;
  companyName: string;
  companyCate: string;
  career: string;
  years: number | null;
  startDate: number | null;
  contractType: string;
  receivedMethod: string;
  frequency: string;
  ratioIncome: number | null;
  salary: number | null;
  incomeFromSalary: number | null;
  documents: Document[];
  phone: string | null;
  startWorking: number | null;
  tax: string | null;
  title: string;
  description: string;
  workExperience: number | null;
  income_according_to_staff_rating: number | null;
}

export interface ILOANNormalStorageIncomeSalaryAcive {
  activePosition: string;
  total_income: number | null;
  total_income_NVTTD: number | null;
  total_occasional: number | null;
  total_permanent: number | null;
  dataPosition: ILOANNormalStorageIncomeDeclareSalary[];
}

export interface ILOANNormalStorageIncomeAssetRentActive {
  activeAssetRent: string;
  uuid: string;
  data: ILOANNormalStorageIncomeAssetRent[];
  cacheData?: ILOANNormalStorageIncomeAssetRent[];
  total_income_from_property_rental: number | null;
  total_income_from_assentRent_NVTTD: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeAssetRent {
  uuid: string;
  assetType: string;
  totalAmount: number | string;
  assetDetailRealEstate: ILOANNormalStorageIncomeAssetRentDetailRealEstateActive;
  assetDetailOther: ILOANNormalStorageIncomeAssetRentDetailOtherActive;
  assetDetailTransport: ILOANNormalStorageIncomeAssetRentDetailTransportActive;
}
export interface ILOANNormalStorageIncomeAssetRentDetailRealEstateActive {
  data: ILOANNormalStorageIncomeAssetRentDetailRealEstate[];
  activeRealEstate: string;
  total_income_from_rental_real_estate: number | null;
  permanent_income_from_rental_real_estate: number | null;
  occasional_income_from_rental_real_estate: number | null;
}
export interface ILOANNormalStorageIncomeAssetRentDetailOtherActive {
  data: ILOANNormalStorageIncomeAssetRentDetailOther[];
  activeOther: string;
  total_income_from_other: number | null;
  permanent_income_from_other: number | null;
  occasional_income_from_other: number | null;
}
export interface ILOANNormalStorageIncomeAssetRentDetailRealEstate {
  uuid: string;
  location: string;
  province: string;
  district: string;
  ward: string;
  owned_status: string;
  description: string;
  frequency_type: string;
  income_ratio: number | null;
  price: number | null;
  income_from_real_estate: number | null;
  income_according_to_staff_rating: number | null;
  documents: Document[];
}

export interface ILOANNormalStorageIncomeAssetRentDetailOther {
  uuid: string;
  idAssetRent: string;
  owned_status: string;
  frequency_type: string;
  income_ratio: number | null;
  price: number | null;
  income_from_other: number | null;
  income_according_to_staff_rating: number | null;
  documents: Document[];
}

export interface ILOANNormalStorageIncomeAssetRentDetailTransportActive {
  data: ILOANNormalStorageIncomeAssetRentDetailTransport[];
  activeTransport: string;
  total_income_from_transport: number | null;
  permanent_income_from_transport: number | null;
  occasional_income_from_transport: number | null;
}
export interface ILOANNormalStorageIncomeAssetRentDetailTransport {
  uuid: string;
  registrationPlate: string;
  owned_status: string;
  frequency_type: string;
  income_ratio: number | null;
  price: number | null;
  income_from_transport: number | null;
  income_according_to_staff_rating: number | null;
  documents: Document[];
}

export interface ILOANNormalStorageIncomeBusinessActive {
  data: ILOANNormalStorageIncomeBusiness[];
  activeBusiness: string;
  uuid: string;
  cacheData?: ILOANNormalStorageIncomeBusiness[];
  total_income_from_business_activities: number | null;
  total_income_from_business_NVTTD: number | null
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}
export interface ILOANNormalStorageIncomeBusiness {
  uuid: string;
  representative: string;
  name: string;
  workingTime: number | null;
  frequency: string;
  ratio: number | null;
  turnover: number | null;
  cost: number | null;
  profit: number | null;
  income_business_activities: number | null;
  income_according_to_staff_rating: number | null;
  documents: Document[];
}

export interface ILOANNormalStorageIncomeCompanyActive {
  data: ILOANNormalStorageIncomeCompany[];
  activeCompany: string;
  uuid: string;
  cacheData?: ILOANNormalStorageIncomeCompany[];
  total_income_from_company: number | null;
  total_income_from_company_NVTTD: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeCompany {
  uuid: string;
  type: string;
  name: string;
  tax: string;
  phone: string;
  licenseDate: number | null;
  profit: number | null;
  frequency: string;
  income_ratio: number | null;
  business_income_from_business_activities: number | null;
  documents: Document[];
  income_according_to_staff_rating: number | null;
}

export interface ILOANNormalStorageIncomeCompany {
  uuid: string;
  type: string;
  name: string;
  tax: string;
  phone: string;
  licenseDate: number | null;
  profit: number | null;
  frequency: string;
  income_ratio: number | null;
  business_income_from_business_activities: number | null;
  documents: Document[];
  income_according_to_staff_rating: number | null;
}

export interface ILOANNormalStorageIncomeStockActive {
  data: ILOANNormalStorageIncomeStock[];
  activeStock: string;
  uuid: string;
  cacheData?: ILOANNormalStorageIncomeStock[];
  total_income_from_stocks: number | null;
  total_income_from_stocks_NVTTD: number| null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeStock {
  uuid: string;
  year: number | null;
  count: number | null;
  frequency: string;
  ratio: number | null;
  profit: number | null;
  income_from_stock: number | null;
  income_according_to_staff_rating: number | null;
  description: string | null;
  description_source: string | null;
  documents: Document[];
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface ILOANNormalStorageIncomeDepositActive {
  data: ILOANNormalStorageIncomeDeposit[];
  activeDeposit: string;
  uuid: string;
  cacheData?: ILOANNormalStorageIncomeDeposit[];
  total_income_from_deposits: number | null;
  total_income_from_deposits_NVTTD: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeDeposit {
  uuid: string;
  unit: string;
  accept_blocked_account: string;
  publish_unit_id: string;
  account: string;
  currency: string;
  balance: number | null;
  blocked: string;
  term: number | null;
  profit: number | null;
  frequency: string;
  income_ratio: number | null;
  income_from_deposits: number | null;
  income_according_to_staff_rating: number | null;
  description: string;
  documents: Document[];
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}

export interface ILOANNormalStorageIncomePension {
  uuid: string;
  license: string;
  startDate: number | null;
  insurance: string;
  salary: number | null;
  frequency: string;
  income_ratio: number | null;
  income_from_pension: number | null;
  income_from_occ: number | null;
  income_from_per: number | null;
  documents: Document[];
  cacheData?: ILOANNormalStorageIncomePension;
  income_according_to_staff_rating: number | null;
}

export interface ILOANNormalStorageIncomeOtherActive {
  data: ILOANNormalStorageIncomeOther[];
  activeOther: string;
  uuid: string;
  cacheData?: ILOANNormalStorageIncomeOther[];
  total_income_from_other_sources: number | null;
  total_income_from_others_NVTTD: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeOther {
  uuid: string;
  frequencyYear: number | null;
  paymentMethod: string;
  profit: number | null;
  note: string;
  frequency: string;
  income_ratio: number | null;
  income_from_other_source: number | null;
  documents: Document[];
  income_according_to_staff_rating: number | null;
  description: string;
  update_at: number | null;
  update_by: string | null;
  full_name: string | null;
}
// balance

export interface ILOANNormalStorageIncomeBalance {
  totalCost: number | null;
  familyCost: number | null;
  interestPayment: number | null;
  otherCost: number | null;
  totalIncome: number | null;
  permanentIncomeAmount: number | null;
  occasionalIncomeAmount: number | null;
  differentValue: number | null;
}
//ability
export interface ILOANNormalStorageIncomeAbility {
  totalIncome: number | null;
  totalCost: number | null;
  differentValue: number | null;
  // Số tiền vay (VND)
  loanAmount: number | null;
  // Thời hạn vay (tháng)
  gracePeriod: number | null;
  // Lãi suất cho vay (cao nhất) (%/năm)
  lendingRate: number | null;
  // Gốc, lãi tháng cao nhất (VND)
  costValueMax: number | null;
  // Hệ số đánh giá khả năng trả nợ - PNI (%)
  PNI_value: number | null;
  // Hệ số nợ trên thu nhập (DTI)
  DTI_value: number | null;
  // Thuộc sở hữu và sử dụng
  gurantee: string;
  // Nhận xét
  comment: string;
}
//
export interface ILOANNormalStorageIncomeValidate {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  declarePosition?: string;
  position?: string;
  positionHorizontal?: string;
}

export interface IUploadDocument {
  file: FormData;
  document_id: number;
  declare_type: string;
}

export interface ISumToalIncome {
  totalIncome: number | null;
  totalPermanentIncomeAmount: number | null;
  totalOccasionalIncomeAmount: number | null;
}

export interface ILOANNormalStorageIncomeUserList {
  uuid: string;
  full_name: string;
}
export interface CUSTOM_KEY_FILE_INCOME {
  idDoc: string;
  local_id: string;
}
