export interface IInternalCreditRating {
    document_info_list:            any[];
    targets:                       ITargets | null;
    result_internal_credit_rating: IResultInternalCreditRating | null;
}

export interface IResultInternalCreditRating {
    business_employee: IApprovalLevel;
    approval_level:    IApprovalLevel;
    risk_management:   IRiskManagement;
}

export interface IApprovalLevel {
    uuid:          string;
    score:         number;
    ranking:       string;
    approval_date: number;
}

export interface IRiskManagement {
    uuid:           string;
    score:          number;
    ranking:        string;
    approval_date:  number;
    description:    string;
    person_updated: IPersonUpdated;
}

export interface IPersonUpdated {
    person_info: IPersonInfo[];
    updated_at:  number;
}

export interface IPersonInfo {
    full_name: string;
    position:  string;
}

export interface ITargets {
    general_information: IGeneralInformation;
}

export interface IGeneralInformation {
    year_of_birth:             number;
    academic_level:            string;
    number_of_dependents:      number;
    marital_status:            string;
    ownership_status:          string;
    time_at_current_address:   string;
    position:                  string;
    use_card_service_scb:      null;
    receive_money_via_account: boolean;
    credit_relations:          string;
    prestige_credit_relations: string;
    after_tax_income:          number;
    monthly_spending:          number;
}
