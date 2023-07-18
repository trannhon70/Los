import { IApprovalLOANCapitalNeedFull, IApprovalLOANState } from "types/models/loan/normal/storageApproval/LoanInfoForm";

export const loanApprovalState: IApprovalLOANState = {
    loan_program: {
        loan_term_info: '',
        profile_type: '',
        existing_customers: 'Y',
        actual_purpose_using_loan: null,
        evaluation_analysis_table: '',
    },
    capital_need_loan_plan_info: {} as IApprovalLOANCapitalNeedFull,

    loan_method: {
        credit_granting_method: "",
        credit_period: null,
        maximum_time_limit: null,
        disbursement_method: "",
        interest_payment_method: "",
        interest_payment_notes: "",
        principal_repayment_method: "",
        principal_repayment_notes:  "",
        fee_interest: null,
        maximum_loan_interest_rate_scb: null,
        interest_and_fees: null,
        original_grace_period: null,
        periodic_principal: null,
        last_period_principal: null,
        ability_to_repay_the_principal: ""
    },
    business_activities:{
        basic_info: {
            business_household_name:"",
            business_license_type_info:"",
            business_card_num:"",
            business_card_issue_date:"",
            business_card_place_of_issue:"",
            business_working_year_num: null,
            primary_business_code:"",
            business_actual:""
        },
        business_info: {
            business_premises_area: null,
            owner_property_info: "",
            remaining_rental_period: null,
            rental_cost: null,
            address: "",
            province: "",
            district: "",
            ward: ""
        },
        warehouses: [],
        evaluation_assessment: {
            method_business: "",
            number_members: null,
            business_efficiency: "",
            input: "",
            output: "",
            evaluate: ""
        }
    },
    validate: {
        valid: true
    }
}
