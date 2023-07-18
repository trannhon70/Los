import {
  ILoanInstition, ILoanInstitionDetail, ILoanInstitionDetailAgree, IPersonCICInfo, IPersonCICInfoDetail,
  IPersonDetail
} from 'types/models/loan/normal/storageApproval/CIC';

export const ValidateApprovalCIC = {
  info(value: string, field: string){
    if(value === "") {
      return { valid: false, field: field, role: 'empty' }
    }
    return { valid: true };
  },
  greaterZero(value: number | null, field?: string){
    if (value !== null && value === 0) {
      return { valid: false, field: field, role: 'greater_0' };
    }
    return { valid: true };
  },
  number(value: number | null, field?: string){
    if (value === null) {
      return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  date(value: number | null, field: string) {
    // const today = Date.now()
    if(value === null){
      return { valid: false, field: field, role: 'empty' };
  }
    // if(value && value > today){
    //     return { valid: false, field: field, role: 'date' };
    // }
    return { valid: true };
  },
  cicDate(value: number | null, field: string) {
    const today = Date.now()
    
    if(value && value > today/1000){
      return { valid: false, field: field, role: 'date' };
    }
    if(value && value < (today/1000 - 30*24*60*60) ) {
      return { valid: false, field: field, role: 'over30Days' };
    }
    return { valid: true };
  },
  agreementVal(data: ILoanInstitionDetailAgree) {
    if (data) {
      // const vMonthlyLoanTerm = ValidateApprovalCIC.info(data.monthly_loan_term, 'monthly_loan_term')
      // if(!vMonthlyLoanTerm.valid) return {...vMonthlyLoanTerm}
      // //console.log(vMonthlyLoanTerm);
      
      // const vCreditGrantAmount = ValidateApprovalCIC.number(data.credit_grant_amount, 'credit_grant_amount')
      // if(!vCreditGrantAmount.valid) return {...vCreditGrantAmount}
      
      const vActualBalanceConverted = ValidateApprovalCIC.number(data.actual_balance_converted, 'actual_balance_converted')
      if(!vActualBalanceConverted.valid) return {...vActualBalanceConverted}
     
      const vGroupDept = ValidateApprovalCIC.info(data.group_debt, 'group_debt')
      if(!vGroupDept.valid) return {...vGroupDept}
      
      // const vCollateralId = ValidateApprovalCIC.info(data.collateral_id, 'collateral_id')
      // if(!vCollateralId.valid) return {...vCollateralId}
      
      // const vCollateralValue = ValidateApprovalCIC.number(data.collateral_value, 'collateral_value')
      // if(!vCollateralValue.valid) return {...vCollateralValue}
      
      const vMonthlyDeptPaymentObligation = ValidateApprovalCIC.number(data.monthly_debt_payment_obligation,'monthly_debt_payment_obligation')
      if(!vMonthlyDeptPaymentObligation.valid) return {...vMonthlyDeptPaymentObligation}
    }
    return { valid :true };
  },
  creditAgreementVal(data: ILoanInstitionDetailAgree[]){
    if(data) {
       for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateApprovalCIC.agreementVal(data[index])
        if (!vDetail.valid) { return {...vDetail, agree: data[index].uuid}}
       }
    }
    return { valid :true };
  },

  institutionDetailVal(data: ILoanInstitionDetail) {
    if(data)
    {
      const vInstitutionDetail = ValidateApprovalCIC.creditAgreementVal(data.credit_agreement)
      if(!vInstitutionDetail.valid) return {...vInstitutionDetail}
    }
    return { valid :true };
  },

  institutionDetailListVal(data:ILoanInstitionDetail[]) {
    if(data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateApprovalCIC.institutionDetailVal(data[index])
        if (!vDetail.valid) { return {...vDetail, child: data[index].institution_detail_id}}
       }
    }
    return { valid :true };
  },
  institutionVal(data: ILoanInstition){
    if(data) {
      const vDetail = ValidateApprovalCIC.institutionDetailListVal(data.institution_detail)
      if (!vDetail.valid) { return {...vDetail}}
      
    }
    return { valid :true };
  },
  institutionListVal(data: ILoanInstition[]){
    if(data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateApprovalCIC.institutionVal(data[index])
        if (!vDetail.valid) { return {...vDetail, inst: data[index].institution_id}}
       }
    }
    return { valid :true };
  },
  cicDetailVal(data: IPersonCICInfoDetail){
    if(data) {
      const vLoanVal = ValidateApprovalCIC.institutionListVal(data.cic_normal_loan.institution)
      if(!vLoanVal.valid) return {...vLoanVal, type: 'normal'}

      if(data.cic_normal_loan?.institution?.some(int => int.institution_detail.length > 0)) {
        const vLoanNormalCICDateVal = ValidateApprovalCIC.cicDate(data.cic_normal_loan.date_of_latest_CIC_results, 'date_of_latest_CIC_results')
        if(!vLoanNormalCICDateVal.valid) return {...vLoanNormalCICDateVal, type: 'normal'}
      }
      
      //const VCredit = ValidateApprovalCIC.institutionListVal(data.cic_credit.institution)
      if(data.cic_credit?.institution?.some(int => int.institution_detail.length > 0)) {
        const vLoanCardCICDateVal = ValidateApprovalCIC.cicDate(data.cic_credit.date_of_latest_CIC_results, 'date_of_latest_CIC_results')
        if(!vLoanCardCICDateVal.valid) return {...vLoanCardCICDateVal, type: 'card'}
      }
    }
    return { valid :true };
  },
  cicListVal(data : IPersonCICInfo[]){
    if(data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateApprovalCIC.cicDetailVal(data[index].cic_information_detail)
        if (!vDetail.valid) { return {...vDetail, cic: data[index].uuid}}
       }
    }
    return { valid :true };
  },

  personDetailVal(data: IPersonDetail){
    if(data) {
      const vFlexcubeDate = ValidateApprovalCIC.date(data.flexcube_day, 'flexcube_day')
      if (!vFlexcubeDate.valid) { return {...vFlexcubeDate, position: data.person_uuid} }
      const vPersonDetail = ValidateApprovalCIC.cicListVal(data.cic_information)
      if (!vPersonDetail.valid) { return {...vPersonDetail, position: data.person_uuid} }
    }

    return { valid :true };
  }
};
