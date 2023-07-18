export const generateEmptyState = () => ({
  statement: {
    statement_info: {
      number_credit_approval: '',
      statement_export_time: null,
      number_business_unit: '',
      business_unit_export_time: null,
      business_unit_name: '',
      business_unit_code: '',
      branch_name: ''
    },
    legal_due_diligence: {
      legal_file_review: '',
      note: '',
    },
    exception_validation: {
      exception_code: '',
      business_unit_premises: '',
      staff_reviews: '',
    },
    phone_number_appraisals: [],
    appraisal_result: {
      option: null,
      appraisal_staff_proposal: {
        credit_grant_status: "Y",
        loan_amount: 0,
        loan_term: 0,
        another_idea: '',
        reason: '',
        reason_for_refusal_code: '',
        proposal: ''
      },
      credit_grant_information: {
        total_credit_limit: 0,
        loan_balance_collateral_propose: 0,
        loan_balance_no_collateral_propose: 0,
        loan_balance_collateral_exist: 0,
        loan_balance_no_collateral_exist: 0,
        credit_info: 0,
        hide_information_flag: false,
      },
      product_regulations: {
        addendum: '',
        notification: '',
        disbursement_conditions: [{
          uuid:null,
          conditions_type: 'PRE_CON', 
          disbursement_conditions_detail: ""
        }],
        conditions_after_disbursements: [{
          uuid:null,
          conditions_type: 'AFTER_CON',
          conditions_after_disbursement_detail: ""
        }],
        conditions_other: [],
      },
    },
  },
  approval_notice:
  {
    basic_info: {
      number_approval_notice: '',
      notice_export_time: 0,
      announcement_title: '',
    },
    credit_grant_information: {
      loan_amount: 0,
      loan_amount_in_words: '',
      total: 0,
    },
    product_regulations: {
      disbursement_conditions: [{
        uuid:null,
        conditions_type: 'PRE_CON', 
        disbursement_conditions_detail: ""
      }],
      conditions_after_disbursements: [{
        uuid:null,
        conditions_type: 'AFTER_CON',
        conditions_after_disbursement_detail: ""
      }],
      conditions_other: [],
    },
    opinion: {
      appraisal_staff: {
        id:'',
        name: ''
      },
      approval_level: {
        id:'',
        name: ''
      },
      position_signing_notice: '',
      offer: '',
      reason: '',
    },
  },
  validate: { valid: true },
})
export const generateAppraisal = () =>({
    credit_grant_status: 'Y',
    loan_amount: 0,
    loan_term: '',
    another_idea: '',
    reason: '',
    reason_for_refusal_code: '',
    proposal: '',
  })
export const generateCreditGrantInfo = (hasCollateral: boolean | undefined, loanAmount: number) =>({
  total_credit_limit: loanAmount,
  loan_balance_collateral_propose: !!hasCollateral ? loanAmount : 0,
  loan_balance_no_collateral_propose: !hasCollateral ? loanAmount : 0,
  loan_balance_collateral_exist: 0,
  loan_balance_no_collateral_exist: 0,
  credit_info: 0,
  hide_information_flag: false,
})
export const generateProduct = () =>({
  addendum: '',
  notification: '',
  disbursement_conditions: [{
    uuid:null,
    conditions_type: 'PRE_CON', 
    disbursement_conditions_detail: ""
  }],
  conditions_after_disbursements: [{
    uuid:null,
    conditions_type: 'AFTER_CON',
    conditions_after_disbursement_detail: ""
  }],
  conditions_other: [],
})
export const generateNotice = () => ({
  basic_info: {
    number_approval_notice: '',
    notice_export_time: 0,
    announcement_title: '',
  },
  credit_grant_information: {
    loan_amount: 0,
    loan_amount_in_words: '',
    total: 0,
  },
  product_regulations: {
    disbursement_conditions: [{
      uuid:null,
      conditions_type: 'PRE_CON', 
      disbursement_conditions_detail: ""
    }],
    conditions_after_disbursements: [{
      uuid:null,
      conditions_type: 'AFTER_CON',
      conditions_after_disbursement_detail: ""
    }],
    conditions_other: [],
  },
  opinion: {
    appraisal_staff: {
      id:'',
      name: ''
    },
    approval_level: {
      id:'',
      name: ''
    },
    position_signing_notice: '',
    offer: '',
    reason: '',
  },
})
 