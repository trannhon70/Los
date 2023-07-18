import { ILOANNormalStorageIncomeState } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
export const incomeState: ILOANNormalStorageIncomeState = {
  ability: {
    uuid: "",
    sequence_item_uuid: "",
    evaluate: null,
    ability_to_repay_of_customer: {
      assess_solvency: "GURANTEE",
      loan_info: {
        loan_scb: {
          unit: "",
          value: 0,
        },
        loan_scb_by_staff: {
          unit: "",
          value: 0,
        },
        duration_loan: {
          unit: "",
          value: 0,
        },
        lscv_scb: {
          unit: "",
          value: 0,
        },
      },
      plan_payment: {
        periodic_principal: {
          unit: "",
          value: 0,
        },
        last_installment_principal: {
          unit: "",
          value: 0,
        },
        interest_and_cost: {
          unit: "",
          value: 0,
        },
        total_monthly_payment: {
          unit: "",
          value: 0,
        },
        total_income: {
          unit: "",
          value: 0,
        },
        current_loan_payment_costs: {
          unit: "",
          value: 0,
        },
      },
      repayment_on_income: {
        unit: "",
        value: 0,
      },
    },
    update_at:  null,
    update_by: null,
    full_name: null,
  },
  balance: {
    uuid: "",
    evaluate: null,
    financial_situation_of_customer: {
      total_income: {
        total_income_business: 0,
        total_income_staff: 0,
        borrower: null,
        marriage: null,
        co_borrower: null,
        co_payer: null,
      },
      total_cost: {
        borrower: null,
        marriage: null,
        co_borrower: null,
        // co_payer: null,
        value_by_business_household:0,
        value_by_staff:0,
        other_cost_by_business_household : 0,
        other_cost_by_staff : 0,
      },
    },
    update_at:  null,
    update_by: null,
    full_name: null,
  },
  income: {
    borrower: {
      total_income: 0,
      total_income_NVTTD: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: "",
      dataPosition: [],
    },
    coborrower: {
      total_income: 0,
      total_income_NVTTD: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: "",
      dataPosition: [],
    },
    copayer: {
      total_income: 0,
      total_income_NVTTD: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: "",
      dataPosition: [],
    },
    marriage: {
      total_income: 0,
      total_income_NVTTD: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: "",
      dataPosition: [],
    },
  },
  declareActive: "",
  validate: {
    valid: true,
  },
};
