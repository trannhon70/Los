import { IResDocument } from "../configs/Document";

export interface IloanInfoForm {
    capital_need_loan_plan_info:        IApprovalLOANCapitalNeedFull;
    loan_method:                        ILOANMethod;
    product_loan_program:               IProductLoanProgram;
    production_and_business_activities: IApprovalLOANBussinessActivities;
}

export interface ICapitalNeedLoanPlanInfo {
    sequence_uuid:      string;
    total_capital_need: IEquityCapital;
    equity_capital:     IEquityCapital;
    loan_need_scb:      IEquityCapital;
    ratio_scb:          IEquityCapital;
    document_groups:    IDocumentGroup[];
    note:               INote;
}

export interface IDocumentGroup {
    id:             number;
    name:           string;
    display_order:  number;
    document_types: IDocumentType[];
}

export interface IDocumentType {
    document_id:   number;
    document_name: string;
    display_order: null;
    child_files:   IChildFile[];
}

export interface IChildFile {
    uuid:          string;
    name:          string;
    content_type:  string;
    display_order: null;
    created_by:    string;
    created_at:    number;
    updated_at:    number;
    updated_by:    string;
}

export interface IEquityCapital {
    business_unit:    number;
    evaluation_staff: number;
}

export interface INote {
    content:    string;
    updated_at: number;
    updated_by: string;
}

export interface IProductLoanProgram {
    loan_product: ILoanProduct;
    loan_program: ILoanProgram;
}

export interface ILoanProduct {
    category_info: string;
    type_info:     string;
    detail_info:   string;
}

export interface ILoanProgram {
    loan_term_info:            string;
    profile_type:              string;
    existing_customers:        string | null;
    actual_purpose_using_loan: string | null;
    evaluation_analysis_table: string;
}

export interface IProductionAndBusinessActivities {
    basic_info:           IBasicInfo;
    business_info:        IBusinessInfo;
    warehouses:           IWarehouse[];
    evaluation_assessment: IApprovalLOANBAEvaluationAssessment;
}

export interface IBasicInfo {
    business_household_name:      string;
    business_license_type_info:   string;
    business_card_num:            string;
    business_card_issue_date:     number;
    business_card_place_of_issue: string;
    business_working_year_num:    number;
    primary_business_code:        string;
    business_actual:              string;
}

export interface IBusinessInfo {
    address:                 string;
    province:                number;
    district:                number;
    ward:                    number;
    business_premises_area:  number;
    owner_property_info:     string;
    remaining_rental_period: null;
    rental_cost:             null;
}

export interface IWarehouse {
    address:  string;
    province: number;
    district: number;
    ward:     number;
    area:     number;
}

export interface IApprovalLOANCapitalNeedDocument{
    id: number,
    name: string,
    display_order: number,
    documents: IApprovalLOANCapitalNeedDocumentInfo[]
}
export interface IApprovalLOANCapitalNeedDocumentInfo{
    uuid: string,
    name: string,
    content_type: string,
    display_order: number,
    created_by: string,
    created_at: number,
    updated_at: number,
    updated_by: number
}
export interface IApprovalLOANCapitalNeedDocumentGroup{
    id: number,
    name: string,
    display_order: number,
    document_types:IApprovalLOANCapitalNeedDocument[]
}
export interface IApprovalLOANCapitalNeedNote{
    content:string,
    updated_at:number
    updated_by:string
}
export interface IPlanEffect{
    turn_over:ITurnOver;
    total_cost:ITurnOver;
    profit:ITurnOver;
}

export interface IPlanEffectOptionFull{
    turn_over: ITurnOver;
    total_cost: IPlanEffectTotalCost
    profit: ITurnOver;
}
export interface IPlanEffectTotalCost extends ITurnOverFull{
    price_product: ITurnOver;
    management_cost: ITurnOver ;
    other_cost: ITurnOver;
    loan_cost:ITurnOver;
}
export interface ILOANLimit{
    working_capital: ITurnOver;
    capital_needs: ITurnOver;
    own_working_capital: ITurnOver;
    payable_to_other_sellers: ITurnOver;
    other_credit_institutions: ITurnOver;
    loan_demand_at_scb: ITurnOver
    scb_sponsor_ratio: ITurnOver;
    loan_scb: ITurnOver;
    credit_capital: ITurnOver;
    equity_capital: ITurnOver;
    total_capital_need: ITurnOver;
}
export interface ITurnOver{
    business_unit_period_t: number | null,
    business_unit_period_t1: number | null,
    evaluation_staff_t: number | null,
    evaluation_staff_t1: number | null,
}
export interface ITurnOverFull{
    business_unit_period_t?: number | null,
    business_unit_period_t1?: number | null,
    evaluation_staff_t?: number | null,
    evaluation_staff_t1?: number | null,
}
export interface ITurnOverOption3{
    business_unit: number | null,
    evaluation_staff: number | null,
}

export interface IApprovalLOANCapitalNeedFull{
    sequence_uuid: string;
    plan_effect: IPlanEffectOptionFull;
    loan_limit: ILOANLimit;
    document_groups: IApprovalLOANCapitalNeedDocumentGroup[];
    document_info_list?:IResDocument[];
    note: IApprovalLOANCapitalNeedNote;
    // option 3
    total_capital_need:ITurnOverOption3; 
    equity_capital: ITurnOverOption3;
    loan_need_scb: ITurnOverOption3;
    ratio_scb: ITurnOverOption3;
}

//// !!!interface phuong thuc vay von 
export interface ILOANMethod{
    credit_granting_method: string;
    credit_period: number | null;
    maximum_time_limit: number | null;
    disbursement_method: string;
    interest_payment_method: string;
    interest_payment_notes: string;
    principal_repayment_method: string;
    principal_repayment_notes:  string;
    fee_interest: number | null;
    maximum_loan_interest_rate_scb: number | null;
    interest_and_fees:number | null;
    original_grace_period: number | null;
    periodic_principal: number | null;
    last_period_principal: number | null;
    ability_to_repay_the_principal: string;
}

export interface IApprovalLOANState{
    validate: IApprovalValidate
    loan_program: ILoanProgram;
    capital_need_loan_plan_info:IApprovalLOANCapitalNeedFull;
    loan_method:ILOANMethod;
    business_activities: IApprovalLOANBussinessActivities
}

export interface IApprovalLOANBussinessActivities{
    basic_info:IApprovalLOANBABasicInfo;
    business_info:IApprovalLOANBABusinessInfo;
    warehouses:IApprovalLOANBAWareHouses[]
    evaluation_assessment:IApprovalLOANBAEvaluationAssessment;
}

export interface IApprovalLOANBABasicInfo{
    business_household_name: string,
    business_license_type_info: string,
    business_card_num: string,
    business_card_issue_date: string,
    business_card_place_of_issue: string,
    business_working_year_num:number | null,
    primary_business_code: string,
    business_actual: string
}

export interface IApprovalLOANBABusinessInfo{
    business_premises_area: number | null,
    owner_property_info: string,
    remaining_rental_period: number | null,
    rental_cost: number | null,
    address: string,
    province: string,
    district: string,
    ward: string
}

export interface IApprovalLOANBAWareHouses{
    area: number | null,
    address: string,
    province: number | null,
    district: number | null,
    ward: number | null,
    uuid: string,
    primary_flag: boolean
}
export interface IApprovalLOANBAEvaluationAssessment{
    method_business: string,
    number_members: number | null,
    business_efficiency: string,
    input: string,
    output: string,
    evaluate: string
}



export interface IApprovalValidate{
    valid: boolean;
    field?: string;
    role?: string;
    message?: string;
    declare?: string;
    position?: number;
  }