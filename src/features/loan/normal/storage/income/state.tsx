import { ILOANNormalStorageIncomeState } from "types/models/loan/normal/storage/Income";

export const incomeState: ILOANNormalStorageIncomeState = {
  ability: {
    gurantee: 'GURANTEE',
    comment: '',
    DTI_value:0,
    PNI_value:0,
    costValueMax:0,
    differentValue:0,
    gracePeriod:0,
    lendingRate:0,
    loanAmount:0,
    totalCost:0,
    totalIncome:0,
  },
  balance: {
    totalCost: 0,
    totalIncome: 0,
    permanentIncomeAmount: 0,
    occasionalIncomeAmount: 0,
    differentValue: 0,
    familyCost: {
      id: "COST_LIVING",
      value: 0,
      description: null
    },
    interestPayment: {
      id: "COST_LOAN",
      value: 0,
      description: null
    },
    otherCost: {
      id: "COST_OTHER",
      value: 0,
      description: null
    },
    disbCost: {
      id: "COST_DISB",
      value: 0,
      description: null
    },
  },
  income: {
    borrower: {
      total_income: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: '',
      dataPosition: [],
    },
    coborrower: {
      total_income: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: '',
      dataPosition: [],
    },
    copayer: {
      total_income: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: '',
      dataPosition: [],
    },
    marriage: {
      total_income: 0,
      total_occasional: 0,
      total_permanent: 0,
      activePosition: '',
      dataPosition: [],
    },
  },
  declareActive: '',
  validate: {
    valid: true
  }
};