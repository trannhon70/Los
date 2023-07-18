import { ETypeButtonBarRole } from "../storageControl/case"

export const generateTypeParams = (paramsType: string) => {
  switch (paramsType) {
    // s1
    case 'product':
      return ETypeButtonBarRole.PRODUCT_GROUP
    case 'legal/borrower':
      return ETypeButtonBarRole.LEGAL_BORROWER
    case 'legal/marriage':
      return ETypeButtonBarRole.LEGAL_MARRIAGE
    case 'legal/co-borrower':
      return ETypeButtonBarRole.LEGAL_COBORROWER
    case 'legal/co-payer':
      return ETypeButtonBarRole.LEGAL_COPAYER
    case 'legal/legal-related':
      return ETypeButtonBarRole.LEGAL_RELATED
    case 'legal/contact':
      return ETypeButtonBarRole.LEGAL_CONTACT
    case 'legal/other':
      return ETypeButtonBarRole.LEGAL_OTHER
    case 'cic/other/borrower':
      return ETypeButtonBarRole.CIC_OTHER_BORROWER
    case 'cic/other/marriage':
      return ETypeButtonBarRole.CIC_OTHER_MARRIAGE
    case 'cic/other/co-brw':
      return ETypeButtonBarRole.CIC_OTHER_COBORROWER
    case 'cic/other/co-payer':
      return ETypeButtonBarRole.CIC_OTHER_COPAYER
    case 'cic/other/law-rlt':
      return ETypeButtonBarRole.CIC_OTHER_RELATED
    case 'cic/other/other':
      return ETypeButtonBarRole.CIC_OTHER_OTHER
    case 'cic/scb/borrower':
      return ETypeButtonBarRole.CIC_SCB_BORROWER
    case 'cic/scb/marriage':
      return ETypeButtonBarRole.CIC_SCB_MARRIAGE
    case 'cic/scb/co-brw':
      return ETypeButtonBarRole.CIC_SCB_COBORROWER
    case 'cic/scb/co-payer':
      return ETypeButtonBarRole.CIC_SCB_COPAYER
    case 'cic/scb/law-rlt':
      return ETypeButtonBarRole.CIC_SCB_RELATED
    case 'cic/scb/other':
      return ETypeButtonBarRole.CIC_SCB_OTHER
    case 'cic/rating-review':
      return ETypeButtonBarRole.CIC_U3_SR
    case 'loan/product':
      return ETypeButtonBarRole.LOAN_PRODUCT_LOAN_INFO_PROGRAM
    case 'loan/need-and-plan':
      return ETypeButtonBarRole.LOAN_CAPITAL_NEED_LOAN_PLAN_INFO
    case 'loan/business/household-legal':
      return ETypeButtonBarRole.LOAN_BUSSINESS_HOUSEHOLD_INFO
    case 'loan/business/finance-analysis':
      return ETypeButtonBarRole.LOAN_FINANCIAL_ANALYSIS_INFO
    case 'collateral':
      return ETypeButtonBarRole.COLLATERAL
    case 'other/exception':
      return ETypeButtonBarRole.OTHER_EXCEPTION
    case 'other/risk':
      return ETypeButtonBarRole.OTHER_PROFILE
    case 'internal-credit-rating':
      return ETypeButtonBarRole.ICR
    case 'forms':
      return ETypeButtonBarRole.FORM

    // s2 

    case 'main/borrower':
      return ETypeButtonBarRole.LOAN_S2_CIC_BORROWER
    case 'main/marriage':
      return ETypeButtonBarRole.LOAN_S2_CIC_MARRIAGE
    case 'main/co-borrower':
      return ETypeButtonBarRole.LOAN_S2_CIC_COBORROWER
  }
}

export const getPositionStept = (stepName: string, inComeType: string) => {
  let position = "";
  if (stepName === "borrower") {
    switch (inComeType) {
      case "salary":
        position = ETypeButtonBarRole.INCOME_BORROWER_SALARY;
        break;
      case "asset-rent":
        position = ETypeButtonBarRole.INCOME_BORROWER_ASSRENT;
        break;
      case "business":
        position = ETypeButtonBarRole.INCOME_BORROWER_BUSSINESS;
        break;
      case "company":
        position = ETypeButtonBarRole.INCOME_BORROWER_COMPANY;
        break;
      case "stock":
        position = ETypeButtonBarRole.INCOME_BORROWER_STOCK;
        break;
      case "deposit":
        position = ETypeButtonBarRole.INCOME_BORROWER_DEPOSIT;
        break;
      case "pension":
        position = ETypeButtonBarRole.INCOME_BORROWER_PENSION;
        break;
      case "other":
        position = ETypeButtonBarRole.INCOME_BORROWER_OTHER;
        break;
    }
  }

  if (stepName === "marriage") {
    switch (inComeType) {
      case "salary":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_SALARY;
        break;
      case "asset-rent":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_ASSRENT;
        break;
      case "business":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_BUSSINESS;
        break;
      case "company":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_COMPANY;
        break;
      case "stock":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_STOCK;
        break;
      case "deposit":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_DEPOSIT;
        break;
      case "pension":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_PENSION;
        break;
      case "other":
        position = ETypeButtonBarRole.INCOME_MARRIAGE_OTHER;
        break;
    }
  }

  if (stepName === "co-borrower") {
    switch (inComeType) {
      case "salary":
        position = ETypeButtonBarRole.INCOME_COBORROWER_SALARY;
        break;
      case "asset-rent":
        position = ETypeButtonBarRole.INCOME_COBORROWER_ASSRENT;
        break;
      case "business":
        position = ETypeButtonBarRole.INCOME_COBORROWER_BUSSINESS;
        break;
      case "company":
        position = ETypeButtonBarRole.INCOME_COBORROWER_COMPANY;
        break;
      case "stock":
        position = ETypeButtonBarRole.INCOME_COBORROWER_STOCK;
        break;
      case "deposit":
        position = ETypeButtonBarRole.INCOME_COBORROWER_DEPOSIT;
        break;
      case "pension":
        position = ETypeButtonBarRole.INCOME_COBORROWER_PENSION;
        break;
      case "other":
        position = ETypeButtonBarRole.INCOME_COBORROWER_OTHER;
        break;
    }
  }

  if (stepName === "co-payer") {
    switch (inComeType) {
      case "salary":
        position = ETypeButtonBarRole.INCOME_COPAYER_SALARY;
        break;
      case "asset-rent":
        position = ETypeButtonBarRole.INCOME_COPAYER_ASSRENT;
        break;
      case "business":
        position = ETypeButtonBarRole.INCOME_COPAYER_BUSSINESS;
        break;
      case "company":
        position = ETypeButtonBarRole.INCOME_COPAYER_COMPANY;
        break;
      case "stock":
        position = ETypeButtonBarRole.INCOME_COPAYER_STOCK;
        break;
      case "deposit":
        position = ETypeButtonBarRole.INCOME_COPAYER_DEPOSIT;
        break;
      case "pension":
        position = ETypeButtonBarRole.INCOME_COPAYER_PENSION;
        break;
      case "other":
        position = ETypeButtonBarRole.INCOME_COPAYER_OTHER;
        break;
    }
  }
  if (stepName === "balance") {
    position = ETypeButtonBarRole.INCOME_BALANCE;
  }
  if (stepName === "ability-repay") {
    position = ETypeButtonBarRole.INCOME_ABILITY;
  }
  return position;
}

export const getPositionLoanS2Params = (paramsType: string) => {  // s2
  switch (paramsType) {
    case 'main/borrower':
      return ETypeButtonBarRole.LOAN_S2_CIC_BORROWER
    case 'main/marriage':
      return ETypeButtonBarRole.LOAN_S2_CIC_MARRIAGE
    case 'main/co-borrower':
      return ETypeButtonBarRole.LOAN_S2_CIC_COBORROWER
    case 'main/co-payer':
      return ETypeButtonBarRole.LOAN_S2_CIC_COPAYER
    case 'additional/legal-related':
      return ETypeButtonBarRole.LOAN_S2_CIC_RELATED
    case 'additional/other':
      return ETypeButtonBarRole.LOAN_S2_CIC_OTHER
    case 'total-ranking-grade/':
      return ETypeButtonBarRole.LOAN_S2_CIC_RANK

    case 'product':
      return ETypeButtonBarRole.LOAN_S2_LOAN_PRODUCT_LOAN_PROGRAM
    case 'need-and-plan':
      return ETypeButtonBarRole.LOAN_S2_LOAN_PRODUCT_CAPITAL_NEED
    case 'pro-and-bus':
      return ETypeButtonBarRole.LOAN_S2_LOAN_PRODUCT_BUSS_ACTIVITY
    case 'loan-method':
      return ETypeButtonBarRole.LOAN_S2_LOAN_PRODUCT_LOAN_METHOD

    case 'approval-exception':
      return ETypeButtonBarRole.LOAN_S2_OTHER_EX
    case 'approval-risk':
      return ETypeButtonBarRole.LOAN_S2_OTHER_OTHER_PROFILE

    case 'dedupe':
      return ETypeButtonBarRole.LOAN_S2_DEDUPE_INFOMATION
    case 'blacklist':
      return ETypeButtonBarRole.LOAN_S2_BLACKLIST_INFOMATION
    case 'report':
      return ETypeButtonBarRole.LOAN_S2_ADDITION_STATEMENT
    case 'notice':
      return ETypeButtonBarRole.LOAN_S2_ADDITION_APPROVAL_NOTIFY
    case 'form':
      return ETypeButtonBarRole.LOAN_S2_ADDITION_TEMPLATE

  }
}