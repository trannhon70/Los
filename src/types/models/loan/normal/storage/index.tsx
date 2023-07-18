import { ILOANNormalProductForm } from "types/models/loan/normal/configs/Product";
import { ILOANNormalStorageOtherState, IOtherDocumentException, IOtherDocumentRisk } from 'types/models/loan/normal/storage/Other';
import { ILOSInfo } from "types/models/LOS";
import { ICICDataAPI, ILOANNormalStorageCICState } from "./CIC";
import { ILOANNormalCollateralV2State, ILOANNormalStorageV2CollateralForm } from "./CollaretalV2";
import { ILOANNormalStorageCollateralState } from "./Collateral";
import { ILOANNormalStorageFormsState } from "./Forms";
import { ILOANNormalStorageICR, ILOANNormalStorageICRDataState } from "./ICR";
import { IIncomeData, IIncomeTabsIncome, ILOANNormalStorageIncomeState } from "./Income";
import { ILoanNormalLegalAPI, ILOANNormalStorageLegalState } from "./Legal";
import { ILOANData, ILOANNormalStorageLOANState } from "./LOAN";
import { ILOANNormalStorageHistoryState } from "./Logs";
import { ILOANNormalStorageProduct } from "./Product";
import { ILOANNormalStorageCustomerState } from "./Customer";
import { IProfile, IProfileDocument } from "./ProfileDocument";

export interface ILOANNormalForm{
  loan_info_form: ILOANData;
  los_info: ILOSInfo;
  product_group_form: ILOANNormalProductForm;
  legal_info_form: ILoanNormalLegalAPI; // check
  cic_form: ICICDataAPI,
  collateral_form: ILOANNormalStorageV2CollateralForm;
  income_form:IIncomeData;
  internal_credit_rating: ILOANNormalStorageICRDataState;
  source_income_form:IIncomeData;
  other_profile: ILOANOtherProfileRes
}
export interface ILOANOtherProfileRes{
  id: string;
  name: string;
  data:{
    exception_list: IOtherDocumentException[];
    analysis_measures_risk_info: IOtherDocumentRisk;
    unit_exception_report: string | null
  }
}
export interface ILOANNormalData{
  form: ILOANNormalForm;
  created_at:number | null ;
  modified_at: number;
}

export interface ILOANNormalFullState{
  fetched: boolean;
  fetching: boolean;
  starting: boolean;
  data: ILOANNormalData | null;
}

export interface ILOANNormalStorageState{
  full: ILOANNormalFullState;
  product: ILOANNormalStorageProduct;
  legal: ILOANNormalStorageLegalState;
  cic: ILOANNormalStorageCICState;
  loan: ILOANNormalStorageLOANState;
  collateral: ILOANNormalStorageCollateralState;
  collateral_v2: ILOANNormalCollateralV2State;
  income:ILOANNormalStorageIncomeState;
  other: ILOANNormalStorageOtherState;
  forms: ILOANNormalStorageFormsState;
  icr:ILOANNormalStorageICR;
  legal_person_uuid?:string;
  logs: ILOANNormalStorageHistoryState;
  customer: ILOANNormalStorageCustomerState;
  profileDocument:IProfile;
}

export interface IIncomeSourceData{
  id:string;
  name:string;
  data:IIncomeSourceTab;
}
export interface IIncomeSourceTab {
  tabs: IIncomeTabs;
}

export interface IIncomeTabs {
  incomes:          IIncomeTabsIncome;
  balance:          IBalance;
  ability_to_repay: TabsAbilityToRepay;
}

export interface TabsAbilityToRepay {
  total_income:       NetProfit;
  total_cost:         NetProfit;
  net_profit:         NetProfit;
  uuid:               string;
  sequence_item_uuid: string;
  ability_to_repay:   BalanceCostIncomeClass;
  detail:             Detail;
}

export interface BalanceCostIncomeClass {
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
  uuid?: string;
}

export interface IBalance {
  uuid:                     string;
  balance_cost_income:      BalanceCostIncomeClass;
  total_income:             NetProfit;
  permanent_income_amount:  NetProfit;
  occasional_income_amount: NetProfit;
  total_cost:               NetProfit;
  different_value:          NetProfit;
  cost_detail:              CostDetail;
}

export interface CostDetail {
  interest_payment_expenses: NetProfit;
  family_cost:               NetProfit;
  other_cost:                NetProfit;
}
