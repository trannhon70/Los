export interface IInternalCreditRatingFull{
    document_info_list:[],
    targets:{
        general_information:IInternalCreditRatingGeneralInfo
    },
    result_internal_credit_rating: IInternalCreditRatingResult

}
export interface IInternalCreditRatingGeneralInfo{
    year_of_birth: number,
    academic_level: string,
    number_of_dependents: number,
    marital_status: string,
    ownership_status: string,
    time_at_current_address: string,
    position: string,
    use_card_service_scb: null,
    receive_money_via_account: boolean,
    credit_relations: string,
    prestige_credit_relations: string,
    after_tax_income: number,
    monthly_spending: number
}

export interface IInternalCreditRatingResult{
    business_employee:IICRResultCommon,
    approval_level: IICRResultCommon,
    risk_management: IICRResultRiskManagement
}

export interface IICRResultCommon{
    uuid: string,
    score: number,
    ranking: string,
    approval_date: string,
}

export interface IICRResultRiskManagement extends IICRResultCommon{
    description: string,
    person_updated:IICRResultRiskManagementPersonUpdated
}

export interface IICRResultRiskManagementPersonUpdated{
    person_info:IICRResultRiskManagementPersonInfo[]
    updated_at: number
}

export interface IICRResultRiskManagementPersonInfo{
    full_name: string,
    position: string,
}