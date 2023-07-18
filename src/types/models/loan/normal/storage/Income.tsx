import { SortingRule } from "react-table";
import { ICodeName, IIdCodeName, IIdName, IIdNameValue, IIdNameValueDesc, IValue } from "types";
import { IDistrict, IProvince, IWard } from "types/models/master-data/state";

export interface ILOANNormalStorageIncomeSalary {
  uuid: string;
  name?:string;
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
  documents:Document[];
}
export interface ILOANNormalStorageIncomeSalaryActive {
  data: ILOANNormalStorageIncomeSalary[];
  cacheData?:ILOANNormalStorageIncomeSalary[];
  activeSalary: string;
  total_income_from_salary_source: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
}

export interface ILOANNormalStorageIncomeAssetRentDetailRealEstateActive {
  data: ILOANNormalStorageIncomeAssetRentDetailRealEstate[],
  activeRealEstate: string;
  total_income_from_rental_real_estate: number | null;
  permanent_income_from_rental_real_estate: number | null;
  occasional_income_from_rental_real_estate: number | null;
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
  documents:Document[];
}
export interface ILOANNormalStorageIncomeAssetRentDetailOtherActive {
  data: ILOANNormalStorageIncomeAssetRentDetailOther[];
  activeOther: string;
  total_income_from_other: number | null;
  permanent_income_from_other: number | null;
  occasional_income_from_other: number | null;
}
export interface ILOANNormalStorageIncomeAssetRentDetailOther {
  uuid: string;
  idAssetRent: string;
  owned_status: string;
  frequency_type: string;
  income_ratio: number | null;
  price: number | null;
  income_from_other: number | null;
  documents: Document[];
}

export interface ILOANNormalStorageIncomeAssetRentDetailTransport {
  uuid: string;
  registrationPlate: string;
  owned_status: string;
  frequency_type: string;
  income_ratio: number | null;
  price: number | null;
  income_from_transport: number | null;
  documents:Document[];
}
export interface ILOANNormalStorageIncomeAssetRentDetailTransportActive {
  data: ILOANNormalStorageIncomeAssetRentDetailTransport[];
  activeTransport: string;
  total_income_from_transport: number | null;
  permanent_income_from_transport: number | null;
  occasional_income_from_transport: number | null;
}


export interface ILOANNormalStorageIncomeAssetRent {
  uuid: string;
  assetType: string;
  totalAmount: string;
  assetDetailRealEstate: ILOANNormalStorageIncomeAssetRentDetailRealEstateActive;
  assetDetailOther: ILOANNormalStorageIncomeAssetRentDetailOtherActive;
  assetDetailTransport: ILOANNormalStorageIncomeAssetRentDetailTransportActive;
}
export interface ILOANNormalStorageIncomeAssetRentActive {
  activeAssetRent: string;
  data: ILOANNormalStorageIncomeAssetRent[];
  cacheData?:ILOANNormalStorageIncomeAssetRent[];
  total_income_from_property_rental: number | null;
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
  documents: Document[],
}
export interface ILOANNormalStorageIncomeBusinessActive {
  data: ILOANNormalStorageIncomeBusiness[],
  activeBusiness: string;
  cacheData?: ILOANNormalStorageIncomeBusiness[],
  total_income_from_business_activities: number | null;
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
}
export interface ILOANNormalStorageIncomeCompanyActive {
  data: ILOANNormalStorageIncomeCompany[];
  activeCompany: string;
  cacheData?: ILOANNormalStorageIncomeCompany[];
  total_income_from_company: number | null;
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
  documents: Document[];
}
export interface ILOANNormalStorageIncomeStockActive {
  data: ILOANNormalStorageIncomeStock[];
  activeStock: string;
  cacheData?: ILOANNormalStorageIncomeStock[];
  total_income_from_stocks: number | null;
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
  documents:Document[];
}
export interface ILOANNormalStorageIncomeDepositActive {
  data: ILOANNormalStorageIncomeDeposit[];
  activeDeposit: string;
  cacheData?: ILOANNormalStorageIncomeDeposit[];
  total_income_from_deposits: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
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
  income_from_occ:number|null;
  income_from_per:number|null;
  documents:Document[];
  cacheData?:ILOANNormalStorageIncomePension;
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
}
export interface ILOANNormalStorageIncomeOtherActive {
  data: ILOANNormalStorageIncomeOther[];
  activeOther: string;
  cacheData?: ILOANNormalStorageIncomeOther[];
  total_income_from_other_sources: number | null;
  permanent_income_amount: number | null;
  occasional_income_amount: number | null;
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

export interface ILOANContinueRuleIncome{
  person_uuid:string;
  typeDeclare:string;
  typeParams:string;
  incomeSource:string[];
}

export interface ILOANNormalStorageIncomeType{
  salary: boolean;
  assetRent: boolean;
  business: boolean;
  company: boolean;
  stock: boolean;
  deposit: boolean;
  pension: boolean;
  other: boolean;
}
export interface ILOANNormalStorageIncomeBalance {
  totalCost: number | null;
  familyCost: ILOANNormalStorageIncomeCostDetail;
  interestPayment: ILOANNormalStorageIncomeCostDetail;
  otherCost: ILOANNormalStorageIncomeCostDetail;
  totalIncome: number | null;
  permanentIncomeAmount: number | null;
  occasionalIncomeAmount: number | null;
  differentValue: number | null;
  disbCost: ILOANNormalStorageIncomeCostDetail;
}

export interface ILOANNormalStorageIncomeCostDetail {
  id: string,
  value: number | null,
  description: string | null
}
export interface ILOANNormalStorageIncomeBalanceDesc{
  familyCostDesc: string;
  interestPaymentDesc: string;
  otherCostDesc: string;
  disbCostDesc: string;
}
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

export interface ILOANNormalStorageIncomeState {
  income: ILOANNormalStorageIncomeDeclare
  balance: ILOANNormalStorageIncomeBalance;
  // balanceDesc: ILOANNormalStorageIncomeBalanceDesc;
  ability: ILOANNormalStorageIncomeAbility;
  declareActive: string;
  validate: ILOANNormalStorageIncomeValidate;
  activeINCOME?:string;
}

export interface ILOANNormalStorageIncomeValidate{
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  declarePosition?: string;
  position?: string;
  positionHorizontal?: string;
}

/////////////////////////////////////////////////////////

export interface CompanyInfo {
  business_type: IIdName;
  business_name: string;
  business_fullname: string;
  business_group: IIdName;
  business_field: IIdName;
  work_experience: IIdNameValue;
  start_working: number;
  contract_type: IIdName;
  method_payment: IIdName;
  frequency_type: IIdName;
  income_ratio: number;
  salary: IIdNameValue;
  income_from_salary: IIdNameValue;
}

export interface CUSTOM_KEY_FILE_INCOME {document_id : string | number, local_id: string};
export interface DataFile {
  uuid: string,
  name: string,
  content_type: string,
  description?: string | null,
  display_order?: number,
  created_by: string,
  created_by_name: string,
  created_at: number,
  updated_at: number,
  updated_by: string,
  updated_by_name: string,
  file_upload?: string,
  size?: number,
  custom_keys: CUSTOM_KEY_FILE_INCOME | null,

  // uuid: string;
  // display_order: number;
  // create_at: number | null;
  // type: string;
  // name: string;
  // lastModified: number;
  // size: number | null;
  // file_upload: string | null;
  // is_update: boolean;
  // custom_keys?: CUSTOM_KEY_FILE_INCOME
}

export interface Document {
  document_id: number;
  document_name: string;
  document_type: string;
  data_file: DataFile[];
}

export interface Salary extends INameDisplayOrder {
  company_info: CompanyInfo;
}

export interface RealEstateInfo {
  address: string;
  province_id: IProvince;
  district_id: IDistrict;
  ward_id: IWard;
  owned_status: ICodeName;
  note: string;
  frequency_type: IIdName;
  income_ratio: number;
  price: IIdNameValue;
  income_from_real_estate: IIdNameValue;
}

export interface INameDisplayOrder {
  name: string;
  display_order: number;
  uuid:string;
  documents: Document[];
}

export interface RealEstate extends INameDisplayOrder {
  real_estate_info: RealEstateInfo;
}

export interface OtherAssetsInfo {
  license: string;
  owned_status: ICodeName;
  frequency_type: IIdName;
  income_ratio: number;
  price: IIdNameValue;
  income_from_other_assets: IIdNameValue;
}

export interface OtherAsset extends INameDisplayOrder {
  other_assets_info: OtherAssetsInfo;
}

export interface TransportAssetInfo {
  license_number: string;
  owned_status: ICodeName;
  frequency_type: IIdName;
  income_ratio: number;
  price: IIdNameValue;
  income_from_rental_vehicles: IIdNameValue;
}

export interface TransportAsset extends INameDisplayOrder {
  transportation_info: TransportAssetInfo;
}

export interface RentalPropertyInfo {
  asset_type: IIdName;
  total_income_from_rental_real_estate: IIdNameValue;
  real_estates: RealEstate[];
  total_income_from_other_assets: IIdNameValue;
  other_assets: OtherAsset[];
  total_income_from_rental_vehicles: IIdNameValue;
  asset_transportations: TransportAsset[];
}

export interface RentalProperty {
  uuid: string;
  name: string;
  display_order: number;
  rental_property_info: RentalPropertyInfo;
}
export interface BusinessHouseholdInfo {
  business_household_type: IIdName;
  business_name: string;
  business_working_time: IIdNameValue;
  frequency_type: IIdName;
  income_ratio: number;
  gross_revenue: IIdNameValue;
  cost: IIdNameValue;
  profit: IIdNameValue;
  income_from_household_business_activities: IIdNameValue;
}

export interface BusinessHousehold extends INameDisplayOrder {
  business_household_info: BusinessHouseholdInfo;
}

export interface CompanyInfo2 {
  business_type_id: IIdName;
  business_name: string;
  business_tax: string;
  business_phone: string;
  business_license_date: number;
  profit: IIdNameValue;
  frequency_type: IIdName;
  income_ratio: number;
  business_income_from_business_activities: IIdNameValue;
}
export interface Company extends INameDisplayOrder {
  company_info: CompanyInfo2;
}

export interface StockInfo {
  year: IIdNameValue;
  count: number;
  frequency_type: IIdName;
  income_ratio: number;
  profit: IIdNameValue;
  income_from_stock: IIdNameValue;
}

export interface SourceIncomeStock extends INameDisplayOrder {
  stock_info: StockInfo;
}

export interface DepositInfo {
  publish_unit_id: IIdName;
  account_number: string;
  currency_type_id: IIdName;
  balance: IIdNameValue;
  accept_blocked_account: ICodeName;
  term: IIdNameValue;
  profit: IIdNameValue;
  frequency_type: IIdName;
  income_ratio: IIdNameValue;
  income_from_deposits: IIdNameValue;
}

export interface SourceIncomeDeposit extends INameDisplayOrder {
  deposit_info: DepositInfo;
}

export interface PensionInfo {
  license_number: string;
  start_date: number;
  insurance_number: string;
  salary: IIdNameValue;
  frequency_type: IIdName;
  income_ratio: number;
  income_from_pension: IIdNameValue;
}

export interface IncomeInfo {
  frequency_year: number;
  payment_method: IIdName;
  profit: IIdNameValue;
  note: string;
  frequency_type: IIdName;
  income_ratio: number | null;
  income_from_other_source: IIdNameValue;
}

export interface IncomeOther extends INameDisplayOrder {
  income_info: IncomeInfo;
}

export interface IIncomesCustomerMain {
  income_type: IIdName;
  total_income_from_salary_source: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  salaries: Salary[];
  total_income_from_property_rental: IIdNameValue;
  rental_properties: RentalProperty[];
  total_income_from_business_activities: IIdNameValue;
  business_households: BusinessHousehold[];
  total_income_from_company: IIdNameValue;
  companies: Company[];
  total_income_from_stocks: IIdNameValue;
  source_income_stocks: SourceIncomeStock[];
  total_income_from_deposits: IIdNameValue;
  source_income_deposits: SourceIncomeDeposit[];
  total_income_from_pension: IIdNameValue;
  pension_info: PensionInfo;
  documents: Document[];
  total_income_from_other_sources: IIdNameValue;
  income_other: IncomeOther[];
}

export interface CompanyInfo3 {
  business_type: IIdName;
  business_name: string;
  business_fullname: string;
  business_group: IIdName;
  business_field: IIdName;
  work_experience: IIdNameValue;
  start_working: number;
  contract_type: IIdName;
  method_payment: IIdName;
  frequency_type: IIdName;
  income_ratio: number;
  salary: IIdNameValue;
  income_from_salary: IIdNameValue;
}

export interface IIncomeCustomers {
  income_type: IIdName;
  total_income_from_salary_source: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  salaries: Salary[];
}

export interface ICustomers {
  display_order: number;
  customer_info: IIdName;
  incomes: IIncomeCustomers[];
}

export interface IIncomeCustomerMain {
  customer_type: IIdCodeName;
  total_income: number;
  incomes: IIncomesCustomerMain[];
  customers: ICustomers[];
}

export interface CostDetail {
  interest_payment_expenses: CostDetailValue | null;
  family_cost: CostDetailValue | null;
  other_cost: CostDetailValue | null;
  disb_cost: CostDetailValue | null;
}

export interface CostDetailValue extends IIdNameValueDesc {
  uuid: string
}
export interface IIncomeDetail {
  loan_amount: IIdNameValue;
  grace_period: IIdNameValue;
  lending_rate: IIdNameValue;
  cost_value_max: IIdNameValue;
  pni_value: IIdNameValue;
  dti_value: IIdNameValue;
  comment_ability_to_repay: ICodeName;
  comment: string;
}

export interface IIncomeTabList {
  income: IIdName;
  customer_main: IIncomeCustomerMain[];
  balance_cost_income: IIdName;
  total_income: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  total_cost: IIdName & IValue<number>;
  different_value: IIdName & IValue<number>;
  cost_detail: CostDetail;
  ability_to_repay: IIdName;
  net_profit: IIdNameValue;
  detail: IIncomeDetail;
}

export interface IIncomeTabs {
  tabs: IIncomeTabList[];
}
export interface ICustomerType {
  id:   string;
  code: string;
  name: string;
}
export interface IncomeValueType{
  id: string | number;
  name: string;
  value?: string | number | null | undefined;
}
export interface IBorrowerGen{
  income_type:                     IncomeValueType;
  permanent_income_amount:         IncomeValueType;
  occasional_income_amount:        IncomeValueType;
}
export interface ISalaryRes extends IBorrowerGen{
  salaries:                        Salary[];
  total_income_from_salary_source: IncomeValueType;
}
export interface IBusinessRes extends IBorrowerGen{
  business_households:                   BusinessHousehold[];
  total_income_from_business_activities:IncomeValueType;
}
export interface IBusinessRes extends IBorrowerGen{
  business_households:                   BusinessHousehold[];
}

export interface ICompanyRes extends IBorrowerGen{
  companies:Company[];
}
export interface IAssetRentRes extends IBorrowerGen{
  rental_properties:RentalProperty[];
} 
export interface IStockRes extends IBorrowerGen{
  source_income_stocks:SourceIncomeStock[];
}

export interface IDepositRes extends IBorrowerGen{
  source_income_deposits:SourceIncomeDeposit[];
  total_income_from_deposits: IncomeValueType;
}
export interface IOtherIncomeRes extends IBorrowerGen{
  income_other:IncomeOther[];
  total_income_from_other_sources: IncomeValueType;
}
export interface IPensionRes extends IBorrowerGen{
  uuid:string;
  documents:Document[];
}

export interface IBorrowerIncomes {
  salary:             ISalaryRes;
  asset_rent:         IAssetRentRes;
  business_household: IBusinessRes;
  company:            ICompanyRes;
  stock:              IStockRes;
  deposit:            IDepositRes;
  pension:            IPensionRes;
  other_income:       IOtherIncomeRes;
}
export interface IIncomeBorrower {
  customer_type: ICustomerType;
  total_income:  NetProfit;
  incomes:       IBorrowerIncomes;
}

export interface IIncomeCustomerMain2 {
  customer_type: IIdCodeName;
  total_income: number;
  incomes: IIncomesCustomerMain[];
}
export interface ILOANNormalStorageIncomeDeclare2 {
  borrower: IIncomeBorrower,
  marriage: IIncomeCustomerMain2,
  co_borrower: IIncomeCustomerMain2,
  co_payer: IIncomeCustomerMain2,
}

export interface IIncomeCustomer{
  customer_main: ILOANNormalStorageIncomeDeclare2
}
export interface NetProfit {
  id:    string;
  name:  string;
  value: number;
  uuid?: string;
}
export interface ICostIncome {
  id:   string;
  name: string;
}
export interface IAbilityToRepay {
  uuid:               string;
  sequence_item_uuid: string;
  ability_to_repay:   ICostIncome;
  total_income:       NetProfit;
  total_cost:         NetProfit;
  net_profit:         NetProfit;
  detail:             IDetail;
}
export interface CommentAbilityToRepay {
  code: string;
  name: string;
}
export interface IDetail {
  loan_amount:              NetProfit;
  grace_period:             NetProfit;
  lending_rate:             NetProfit;
  cost_value_max:           NetProfit;
  pni_value:                NetProfit;
  dti_value:                NetProfit;
  comment_ability_to_repay: CommentAbilityToRepay;
  comment:                  string;
}


export interface IIncomeBalance {
  uuid:                     string;
  balance_cost_income:      ICostIncome;
  total_income:             NetProfit;
  permanent_income_amount:  NetProfit;
  occasional_income_amount: NetProfit;
  total_cost:               NetProfit;
  different_value:          NetProfit;
  cost_detail:              CostDetail;
}
export interface IIncomeTabList2 {
  ability_to_repay: IAbilityToRepay,
  balance: IIncomeBalance,
  incomes: IIncomeCustomer;
}

export interface IIncomeData2 {
  id: string;
  name: string;
  data: IIncomeTabs2;
}
export interface IIncomeTabs2 {
  tabs: IIncomeTabList2;
}

export interface IIncomeTabsListItem{
  
}

export interface ILOANNormalStorageIncomeDeclare {
  borrower: ILOANNormalStorageIncomeSalaryAcive,
  marriage: ILOANNormalStorageIncomeSalaryAcive,
  coborrower: ILOANNormalStorageIncomeSalaryAcive,
  copayer: ILOANNormalStorageIncomeSalaryAcive,
}

export interface ILOANNormalStorageIncomeSalaryAcive {
  activePosition: string;
  total_income: number | null;
  total_occasional: number | null;
  total_permanent: number | null;
  dataPosition: ILOANNormalStorageIncomeDeclareSalary[];
}
/////

export interface ILOANNormalStorageIncomeUserList{
  uuid: string;
  full_name: string;
}


// interface API GET 

export interface IIncomeData{
  id:string;
  name:string;
  data:IIncomeTabsDataDetails
}
export interface IIncomeTabsDataDetails{
  tabs:IIncomeTabsDetails;
}
export interface IIcomeAbility {
  ability_to_repay: AbilityToRepay;
  total_income:     NetProfit;
  total_cost:       NetProfit;
  net_profit:       NetProfit;
  detail:           Detail;
}

export interface AbilityToRepay {
  id:   string;
  name: string;
}

export interface Detail {
  loan_amount:              NetProfit;
  grace_period:             NetProfit;
  lending_rate:             NetProfit;
  cost_value_max:           NetProfit;
  pni_value:                NetProfit;
  dti_value:                NetProfit;
  comment_ability_to_repay: CommentAbilityToRepay;
  comment:                  string;
}

export interface CommentAbilityToRepay {
  code: string;
  name: string;
}

export interface NetProfit {
  id:    string;
  name:  string;
  value: number;
}
export interface IIncomeTabsDetails{
  incomes:IIncomeTabsIncome;
  balance: IIncomeTabsBalance;
  ability_to_repay: IIcomeAbility;
}

export interface IIncomeCostDetail {
  family_cost: IIdNameValueDesc;
  interest_payment_expenses: IIdNameValueDesc;
  other_cost: IIdNameValueDesc;
  disb_cost: IIdNameValueDesc;
}
export interface IIncomeTabsBalance {
  different_value: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  total_cost: IIdNameValue;
  total_income: IIdNameValue;
  cost_detail: IIncomeCostDetail;
}
export interface IIncomeTabsIncome{
  tab_income:string;
  customer_main:IIncomeTabsDeclare;
}
export interface IIncomeTabsDeclare{
  borrower:IIncomeTabsDeclareBorrower;
  marriage:IIncomeTabsDeclareBorrower
  co_borrower:IIncomeCobDeclareGet;
  co_payer:IIncomeCobDeclareGet;
}
export interface IIncomeCobDeclareGet{
  customer_type:IIdCodeName;
  total_income:IIdNameValue;
  customers:IIncomeGetCustomerGet[]
}
export interface IIncomeGetCustomerGet{
  display_order: number | null;
  customer_info: IIdName;
  incomes:IIncomeDetails;
}
export interface IIncomeTabsDeclareBorrower{
  customer_type:IIdCodeName;
  total_income:IIdNameValue;
  incomes:IIncomeDetails;
  regular_income:number | null;
  irregular_income:number | null;
}
export interface IIncomeDetails{
  salary:IIncomeSalaryGet;
  asset_rent:IIncomeAssrentRentGet;
  business_household:IIncomeBussinessHouseHoldGet;
  company:IIncomeCompanyGet;
  stock:IIncomeStockGet;
  deposit:IIncomeDepositGet;
  pension:IIncomeDetailsPension;
  other_income:IIncomeOtherGet
}

export interface IIncomeOtherGet{
  uuid: string;
  income_type: IIdName;
  total_income_from_other_sources: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount:IIdNameValue;
  income_other:IIncomeOtherDetailsGet[];
}

export interface IIncomeOtherDetailsGet{
  uuid: string;
  name: string;
  display_order: number | null;
  income_info: {
    frequency_year: number | null;
    payment_method:IIdName;
    profit: IIdNameValue;
    note: string;
    frequency_type:IIdName;
    income_ratio: IIdNameValue;
    income_from_other_source: IIdNameValue;
  }
  documents:IFileGetSalary[]
}
export interface IIncomeDetailsPension{
  uuid: string;
  income_type: IIdName;
  total_income_from_pension: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  pension_info: {
      uuid: string;
      license_number: string;
      start_date: number | null;
      insurance_number:  string;
      salary: IIdNameValue
      frequency_type:IIdName;
      income_ratio: IIdNameValue;
      income_from_pension: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeDepositGet{
  uuid: string;
  income_type: IIdName;
  total_income_from_deposits: IIdNameValue;
  permanent_income_amount:IIdNameValue;
  occasional_income_amount: IIdNameValue;
  source_income_deposits:IIncomeDepositDetailsGet[]
}
export interface IIncomeStockGet{
  uuid: string;
  income_type: IIdName;
  total_income_from_stocks: IIdNameValue;
  permanent_income_amount:IIdNameValue;
  occasional_income_amount: IIdNameValue;
  source_income_stocks:IIncomeStockDetailsGet[]
}

export interface IIncomeDepositDetailsGet{
  uuid: string;
  name: string;
  display_order: number | null;
  deposit_info: {
      publish_unit_id: IIdName
      account_number:  number | null;
      currency_type_id:IIdName;
      balance: IIdNameValue;
      accept_blocked_account: ICodeName;
      term: IIdNameValue;
      profit: IIdNameValue;
      frequency_type: IIdName;
      income_ratio: IIdNameValue;
      income_from_deposits: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeStockDetailsGet{
  uuid: string;
  name:string;
  display_order: number | null;
  stock_info: {
      year: IIdNameValue
      count: number | null;
      frequency_type: IIdName;
      income_ratio: IIdNameValue;
      profit: IIdNameValue;
      income_from_stock: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeSalaryGet{
  income_type:IIdName;
  total_income_from_salary_source:IIdNameValue;
  permanent_income_amount:IIdNameValue;
  occasional_income_amount:IIdNameValue;
  salaries:IIncomeSalaryDetails[]
}
export interface IIncomeCompanyGet{
  uuid: string;
  income_type: IIdName;
  total_income_from_company: IIdNameValue;
  permanent_income_amount:IIdNameValue;
  occasional_income_amount:IIdNameValue;
  companies:IIncomeCompanyDetailsGet[];
}
export interface IIncomeCompanyDetailsGet{
  uuid:string;
  name: string;
  display_order: number | null;
  company_info: {
      business_type_id: IIdName
      business_name: string;
      business_tax: number | null;
      business_phone: number | null;
      business_license_date: number | null;
      profit:IIdNameValue;
      frequency_type: IIdName;
      income_ratio:IIdNameValue;
      business_income_from_business_activities:IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeBussinessHouseHoldGet{
  income_type:IIdName;
  total_income_from_business_activities: IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  business_households: IIncomeListBussinessHouseHoldDetailsGet[];
}
export interface IIncomeListBussinessHouseHoldDetailsGet{
  uuid:string;
  name: string;
  display_order: number | null;
  business_household_info: {
      business_household_type:IIdName;
      business_name: string;
      business_working_time:IIdNameValue;
      frequency_type: IIdName;
      income_ratio: IIdNameValue;
      gross_revenue: IIdNameValue
      cost:IIdNameValue;
      profit:IIdNameValue;
      income_from_household_business_activities: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeSalaryDetails{
  uuid:string;
  name:string;
  display_order: number | null;
  company_info: {
    business_type: IIdName;
    business_name: string;
    business_fullname: string;
    business_group: IIdName;
    business_field: IIdName;
    work_experience: IIdNameValue;
    start_working:  number | null;
    contract_type: IIdName;
    method_payment: IIdName;
    frequency_type: IIdName;
    income_ratio:IIdNameValue;
    salary: IIdNameValue;
    income_from_salary: IIdNameValue;
  }
  documents:IFileGetSalary[]
}
export interface IFileGetSalary{
  document_id:number | null;
  document_name:string;
  data_file:IFileDataFile[],
  document_type: string;
}
export interface IFileDataFile{
  uuid:string;
  name:string;
  content_type:string;
  display_order:number | null;
  created_by:number | null | string;
  created_at:number | null | string;
  updated_at:number | null | string;
  updated_by:number | null | string;
  created_by_name: string,
  updated_by_name: string,
  description: string,
  custom_keys : CUSTOM_KEY_FILE_INCOME
}
export interface IIncomeAssrentRentGet{
  income_type: IIdName;
  total_income_from_property_rental:IIdNameValue;
  permanent_income_amount: IIdNameValue;
  occasional_income_amount: IIdNameValue;
  rental_properties:IIncomeAsssrentGetDetails[]
}
export interface IIncomeAsssrentGetDetails{
  uuid:string;
  name: string;
  display_order: number | null;
  rental_property_info: {
      asset_type: IIdName;
      total_income_from_rental_real_estate: IIdNameValue;
      real_estates:IIncomeAssrentRealStateGet[];
      total_income_from_rental_vehicles:IIdNameValue;
      asset_transportations:IIncomeAssrentTransportGet[],
      total_income_from_other_assets:IIdNameValue;
      other_assets:IIncomeAssrentOtherGet[]
  },
}
export interface IIncomeAssrentOtherGet{
  uuid:string;
  name: string;
  display_order: number | null;
  other_assets_info: {
      license:string;
      owned_status:ICodeName;
      frequency_type:IIdName;
      income_ratio: IIdNameValue;
      price: IIdNameValue;
      income_from_other_assets: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeAssrentTransportGet{
  uuid:string;
  name:string;
  display_order: number | null;
  transportation_info: {
      license_number: string;
      owned_status: ICodeName;
      frequency_type: IIdName;
      income_ratio:IIdNameValue;
      price: IIdNameValue;
      income_from_rental_vehicles: IIdNameValue;
  },
  documents:IFileGetSalary[]
}
export interface IIncomeAssrentRealStateGet{
  uuid:string;
  name:string;
  display_order: number | null;
  real_estate_info:{
    address:string;
    province_id: {
        province_code: number;
        province_name: string;
    },
    district_id: {
        district_code: number;
        district_name:string;
    },
    ward_id: {
        ward_code: number,
        ward_name: string,
    },
    owned_status:IIdCodeName
    note: string;
    frequency_type:IIdName;
    income_ratio: IIdNameValue;
    price: IIdNameValue;
    income_from_real_estate: IIdNameValue;
  };
  documents:IFileGetSalary[]
}

export interface ISumToalIncome{
  totalIncome: number | null,
  totalPermanentIncomeAmount: number | null,
  totalOccasionalIncomeAmount: number | null
}
export interface IUploadDocument{
  file: FormData;
  document_id: number;
  declare_type: string;
}


export interface IUploadIncome{
  data: ILOANNormalStorageIncomeState;
  declare_type: keyof ILOANNormalStorageIncomeDeclare;
  activeIncomeSource: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource" | "pension">
}