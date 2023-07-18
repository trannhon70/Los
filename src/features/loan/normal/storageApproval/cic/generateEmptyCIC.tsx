import { generateLOCALUUID } from "utils"

export const generateEmptyState = () => ({
  main: {
    groupActive: "borrower",
    totalAmount: 0,
    data: {
      borrower: {
        totalAmount: 0,
        position: '',
        data: []
      },
      marriage: {
        totalAmount: 0,
        position: '',
        data: []
      },
      'co_brw': {
        totalAmount: 0,
        position: '',
        data: []
      },
      'co_payer': {
        totalAmount: 0,
        position: '',
        data: []
      },
    }
  },
  additional: {
    groupActive: "law_rlt",
    totalAmount: 0,
    data: {
      'law_rlt': {
        totalAmount: 0,
        position: '',
        data: []
      },
      others: {
        totalAmount: 0,
        position: '',
        data: []
      },
    }
  },
  summary: {
    info: {
      borrower: {
        totalAmount: 0,
        position: '',
        data: []
      },
      marriage: {
        totalAmount: 0,
        position: '',
        data: []
      },
      'co_brw': {
        totalAmount: 0,
        position: '',
        data: []
      },
      'co_payer': {
        totalAmount: 0,
        position: '',
        data: []
      },
      'law_rlt': {
        totalAmount: 0,
        position: '',
        data: []
      },
      others: {
        totalAmount: 0,
        position: '',
        data: []
      },
    },
    groupActive: ''
  },
  activeObject: "main",
  validate: { valid: true },
})

export const generatePersonDetail = () =>({
    full_name: '',
    person_uuid: '',
    total_loan: 0,
    total_collateral: 0,
    debit_group_highest: 'NORM',
    flexcube_day: null,
    cic_information: [
      {
        cic_information_id: '',
        cic_information_name: '',
        uuid: '',
        cic_information_uuid:'',
        cic_information_detail: {
          cic_normal_loan: {
            collateral_value: 0,
            date_of_latest_CIC_results: 0,
            institution: [
              {
                institution_id: '',
                institution_total: 0,
                institution_avatar: '',
                institution_detail: [
                  {
                    institution_detail_id: '',
                    monthly_loan_term: '',
                    credit_grant_amount: 0,
                    actual_balance_converted: 0,
                    group_debt: '',
                    credit_agreement: [
                      {
                        credit_agreement_name: '',
                        monthly_loan_term: '',
                        credit_grant_amount: 0,
                        actual_balance_converted: 0,
                        group_debt: '0',
                        collateral_id: '',
                        collateral_value: 0,
                        monthly_debt_payment_obligation: 0,
                        settlement_before_disbursement: ''
                      },
                    ]
                  },
                ]
              },
            ]
          },
          cic_credit: {
            collateral_value: 0,
            date_of_latest_CIC_results: 0,
            institution: [
              {
                institution_id: '',
                institution_total: 0,
                institution_avatar: '',
                highest_outstanding_balance_last_12_months: {
                  credit_grant_amount: 0
                },
                credit_card_obligations: 0,
                note: '',
                institution_detail: [
                  {
                    institution_detail_id: '',
                    credit_grant_amount: 0,
                    actual_balance_converted: 0,
                    group_debt: '',
                    
                  }
                ]
              }
            ]
          }
        },
        credit_score_infor: {
          risk_info: {
            score_value: '',
            score_rank: '',
            publish_date: '',
            evaluation: 0,
            customer_segment: []
          }
        }
      },
    ],
    evaluate: {
      history_credit_relation_satisfy_product_rules: 'true',
      note: '',
      created_by: '',
      created_at: 0
    }
  })
  export const generateNewNormalAgreement = (index: number) => ({
    uuid: generateLOCALUUID(),
    credit_agreement_name: `Hợp đồng tín dụng ${index}`,
    monthly_loan_term: '',
    credit_grant_amount: null,
    actual_balance_converted: null,
    group_debt: '',
    collateral_id: '',
    collateral_value: null,
    monthly_debt_payment_obligation: null,
    settlement_before_disbursement: false,
    isEdit: true
  })

  export const generateEmptyCreditScore = () => ({
    risk_info: {
      score_value: null,
      score_rank: '',
      publish_date: null,
      evaluation: 0,
      customer_segment: []
    }
  })
  export const generateEmptyEvaluate = () => ({
    history_credit_relation_satisfy_product_rules: 'true',
    note: '',
    created_by: '',
    created_at: 0
  })
  
  export const exportEmptyCICInfoDetail = () => ({
    cic_normal_loan: {
      collateral_value: 0,
      date_of_latest_CIC_results: 0,
      institution: []
    },
    cic_credit: {
      collateral_value: 0,
      date_of_latest_CIC_results: 0,
      institution: [],
      highest_outstanding_balance_last_12_months: {
        credit_grant_amount: 0
      },
      credit_card_obligations: 0,
      note: '',
    }
  })