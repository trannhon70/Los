import {
  IApprovalLOANBussinessActivities,
  IApprovalLOANCapitalNeedFull,
  ILOANMethod,
} from 'types/models/loan/normal/storageApproval/LoanInfoForm';

export const LOANApprovalValidate = {
  numberCheck(value: string | number | null | undefined, field: string) {
    if (value === null || value === undefined || value === '') {
      return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  number(value: number | null | undefined, field: string) {
    if (!value || value <= 0) {
      return { valid: false, field: field, role: 'empty_0' };
    }
    return { valid: true };
  },
  textCheck(value: string, field: string) {
    return { valid: !!value, field: field, role: 'empty' };
  },
  program(data: string) {
    return {
      ...LOANApprovalValidate.textCheck(data, 'emptyBasic'),
      fildName: 'evaluation_analysis_table',
    };
  },
  actual_purpose_using_loan(data: string) {
    // const vBusinessActual = LOANApprovalValidate.textCheck(data,'actual_purpose_using_loan')
    // if (!vBusinessActual.valid) return {...vBusinessActual,fieldName: 'empty'};
    // return{ valid: true}
    return {
      ...LOANApprovalValidate.textCheck(data, 'emptyBasic'),
      fildName: 'actual_purpose_using_loan',
    };
  },
  compareStaffT(
    staffVal: number | null | undefined,
    bussinessVal: number | null | undefined,
    field: string
  ) {
    if (!staffVal || staffVal <= 0) {
      return { valid: false, field: field, role: 'empty_0' };
    }
    if (staffVal > (bussinessVal ?? 0)) {
      return {
        valid: false,
        field: field,
        role: 'less_than',
        message: 'Giá trị của NVTTĐ không được lớn hơn giá trị ĐVKD đề xuất',
      };
    }
    return { valid: true };
  },
  tableA(data: IApprovalLOANCapitalNeedFull) {
    // doanh thu
    const vTurnOverT = LOANApprovalValidate.compareStaffT(
      data.plan_effect.turn_over?.evaluation_staff_t,
      data.plan_effect.turn_over?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vTurnOverT.valid) return { ...vTurnOverT, group: 'turn_over' };
    const vTurnOverT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect.turn_over?.evaluation_staff_t1,
      data.plan_effect.turn_over?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vTurnOverT1.valid) return { ...vTurnOverT1, group: 'turn_over' };
    // // tong chi phi
    const vTotalCostT = LOANApprovalValidate.compareStaffT(
      data.plan_effect.total_cost?.evaluation_staff_t,
      data.plan_effect.total_cost?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vTotalCostT.valid) return { ...vTotalCostT, group: 'total_cost' };
    const vTotalCostT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect.total_cost?.evaluation_staff_t1,
      data.plan_effect.total_cost?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vTotalCostT1.valid) return { ...vTotalCostT1, group: 'total_cost' };

    const vWorkingCapitalT = LOANApprovalValidate.compareStaffT(
      data.loan_limit.working_capital?.evaluation_staff_t,
      data.loan_limit.working_capital?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vWorkingCapitalT.valid)
      return { ...vWorkingCapitalT, group: 'working_capital' };
    const vWorkingCapitalT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit.working_capital?.evaluation_staff_t1,
      data.loan_limit.working_capital?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vWorkingCapitalT1.valid)
      return { ...vWorkingCapitalT1, group: 'working_capital' };

    // // const vCapitalNeedsT = LOANApprovalValidate.numberCheck(data.loan_limit.capital_needs?.evaluation_staff_t,'evaluation_staff_t')
    // // if (!vCapitalNeedsT.valid) return {...vCapitalNeedsT,group: 'capital_needs'};
    // // const vCapitalNeedsT1 = LOANApprovalValidate.numberCheck(data.loan_limit.capital_needs?.evaluation_staff_t1,'evaluation_staff_t1')
    // // if (!vCapitalNeedsT1.valid) return {...vCapitalNeedsT1,group: 'capital_needs'};

    const vOwnWorkingCapitalT = LOANApprovalValidate.compareStaffT(
      data.loan_limit.own_working_capital?.evaluation_staff_t,
      data.loan_limit.own_working_capital?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vOwnWorkingCapitalT.valid)
      return { ...vOwnWorkingCapitalT, group: 'own_working_capital' };
    const vOwnWorkingCapitalT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit.own_working_capital?.evaluation_staff_t1,
      data.loan_limit.own_working_capital?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vOwnWorkingCapitalT1.valid)
      return { ...vOwnWorkingCapitalT1, group: 'own_working_capital' };

    const vPayableToOtherSellersT = LOANApprovalValidate.compareStaffT(
      data.loan_limit.payable_to_other_sellers?.evaluation_staff_t,
      data.loan_limit.payable_to_other_sellers?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vPayableToOtherSellersT.valid)
      return { ...vPayableToOtherSellersT, group: 'payable_to_other_sellers' };
    const vPayableToOtherSellersT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit.payable_to_other_sellers?.evaluation_staff_t1,
      data.loan_limit.payable_to_other_sellers?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vPayableToOtherSellersT1.valid)
      return { ...vPayableToOtherSellersT1, group: 'payable_to_other_sellers' };

    const vOtherCreditT = LOANApprovalValidate.compareStaffT(
      data.loan_limit.other_credit_institutions?.evaluation_staff_t,
      data.loan_limit.other_credit_institutions?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vOtherCreditT.valid)
      return { ...vOtherCreditT, group: 'other_credit_institutions' };
    const vOtherCreditT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit.other_credit_institutions?.evaluation_staff_t1,
      data.loan_limit.other_credit_institutions?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vOtherCreditT1.valid)
      return { ...vOtherCreditT1, group: 'other_credit_institutions' };

    // const vLOANDemandSCBBusinessT1 = LOANApprovalValidate.number(data.loan_limit.loan_demand_at_scb?.business_unit_period_t1,'business_unit_period_t1')
    // if (!vLOANDemandSCBBusinessT1.valid) return {...vLOANDemandSCBBusinessT1,group: 'loan_demand_at_scb'};
    // const vLoanLoanDemandSCBStaffT = LOANApprovalValidate.compareStaffT(data.loan_limit.loan_demand_at_scb.evaluation_staff_t, data.loan_limit.loan_demand_at_scb?.business_unit_period_t, 'evaluation_staff_t')
    // if (!vLoanLoanDemandSCBStaffT.valid) return {...vLoanLoanDemandSCBStaffT,group: 'loan_demand_at_scb'};

    // const vLoanLoanDemandSCBStaffT1 = LOANApprovalValidate.compareStaffT(data.loan_limit.loan_demand_at_scb.evaluation_staff_t1, data.loan_limit.loan_demand_at_scb?.business_unit_period_t1, 'evaluation_staff_t1')
    // if (!vLoanLoanDemandSCBStaffT1.valid) return {...vLoanLoanDemandSCBStaffT1,group: 'loan_demand_at_scb'};

    // const vLOANDemandSCBT1 = LOANApprovalValidate.numberCheck(data.loan_limit.loan_demand_at_scb?.evaluation_staff_t1,'evaluation_staff_t1')
    // if (!vLOANDemandSCBT1.valid) return {...vLOANDemandSCBT1,group: 'loan_demand_at_scb'};

    // const vSCBSponsorRatioT = LOANApprovalValidate.number(data.loan_limit.scb_sponsor_ratio?.evaluation_staff_t,'evaluation_staff_t')
    // if (!vSCBSponsorRatioT.valid) return {...vSCBSponsorRatioT,group: 'scb_sponsor_ratio'};
    // const vSCBSponsorRatioT1 = LOANApprovalValidate.number(data.loan_limit.scb_sponsor_ratio?.evaluation_staff_t1,'evaluation_staff_t1')
    // if (!vSCBSponsorRatioT1.valid) return {...vSCBSponsorRatioT1,group: 'scb_sponsor_ratio'};

    return { valid: true };
  },
  tableB(data: IApprovalLOANCapitalNeedFull) {
    const vTurnOverT = LOANApprovalValidate.compareStaffT(
      data.plan_effect.turn_over?.evaluation_staff_t,
      data.plan_effect.turn_over?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vTurnOverT.valid) return { ...vTurnOverT, group: 'turn_over' };
    const vTurnOverT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect.turn_over?.evaluation_staff_t1,
      data.plan_effect.turn_over?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vTurnOverT1.valid) return { ...vTurnOverT1, group: 'turn_over' };

    const vPriceProductT = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.price_product?.evaluation_staff_t,
      data.plan_effect?.total_cost?.price_product?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vPriceProductT.valid)
      return { ...vPriceProductT, group: 'price_product' };
    const vPriceProductT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.price_product?.evaluation_staff_t1,
      data.plan_effect?.total_cost?.price_product?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vPriceProductT1.valid)
      return { ...vPriceProductT1, group: 'price_product' };

    const vManagementCostT = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.management_cost?.evaluation_staff_t,
      data.plan_effect?.total_cost?.management_cost?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vManagementCostT.valid)
      return { ...vManagementCostT, group: 'management_cost' };
    const vManagementCostT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.management_cost?.evaluation_staff_t1,
      data.plan_effect?.total_cost?.management_cost?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vManagementCostT1.valid)
      return { ...vManagementCostT1, group: 'management_cost' };

    const vLoanCostT = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t,
      data.plan_effect?.total_cost?.loan_cost?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vLoanCostT.valid) return { ...vLoanCostT, group: 'loan_cost' };
    const vLoanCostT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t1,
      data.plan_effect?.total_cost?.loan_cost?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vLoanCostT1.valid) return { ...vLoanCostT1, group: 'loan_cost' };

    const vOtherCostT = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.other_cost?.evaluation_staff_t,
      data.plan_effect?.total_cost?.other_cost?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vOtherCostT.valid) return { ...vOtherCostT, group: 'other_cost' };
    const vOtherCostT1 = LOANApprovalValidate.compareStaffT(
      data.plan_effect?.total_cost?.other_cost?.evaluation_staff_t1,
      data.plan_effect?.total_cost?.other_cost?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vOtherCostT1.valid) return { ...vOtherCostT1, group: 'other_cost' };

    const vEquityCapitalT = LOANApprovalValidate.compareStaffT(
      data.loan_limit?.equity_capital?.evaluation_staff_t,
      data.loan_limit?.equity_capital?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vEquityCapitalT.valid)
      return { ...vEquityCapitalT, group: 'equity_capital' };
    const vEquityCapitalT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit?.equity_capital?.evaluation_staff_t1,
      data.loan_limit?.equity_capital?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vEquityCapitalT1.valid)
      return { ...vEquityCapitalT1, group: 'equity_capital' };

    const vCreditCapitalT = LOANApprovalValidate.compareStaffT(
      data.loan_limit?.credit_capital?.evaluation_staff_t,
      data.loan_limit?.credit_capital?.business_unit_period_t,
      'evaluation_staff_t'
    );
    if (!vCreditCapitalT.valid)
      return { ...vCreditCapitalT, group: 'credit_capital' };
    const vCreditCapitalT1 = LOANApprovalValidate.compareStaffT(
      data.loan_limit?.credit_capital?.evaluation_staff_t1,
      data.loan_limit?.credit_capital?.business_unit_period_t1,
      'evaluation_staff_t1'
    );
    if (!vCreditCapitalT1.valid)
      return { ...vCreditCapitalT1, group: 'credit_capital' };

    return { valid: true };
  },
  tableC(data: IApprovalLOANCapitalNeedFull) {
    const vTotalCapitalNeed = LOANApprovalValidate.compareStaffT(
      data.total_capital_need.evaluation_staff,
      data.total_capital_need.business_unit,
      'evaluation_staff_t'
    );
    if (!vTotalCapitalNeed.valid)
      return { ...vTotalCapitalNeed, group: 'total_capital_need' };

    const vQuityCapotal = LOANApprovalValidate.compareStaffT(
      data.equity_capital.evaluation_staff,
      data.equity_capital.business_unit,
      'evaluation_staff_t'
    );
    if (!vQuityCapotal.valid)
      return { ...vQuityCapotal, group: 'equity_capital' };

    // const vLoanNeedScbBussinessT1 = LOANApprovalValidate.number(data?.loan_need_scb?.business_unit, 'business_unit')
    // if(!vLoanNeedScbBussinessT1.valid) return {...vLoanNeedScbBussinessT1, group: 'loan_need_scb' }

    // const vLoanNeedScbStaffT1 = LOANApprovalValidate.compareStaffT(data?.loan_need_scb?.evaluation_staff, data?.loan_need_scb?.business_unit, 'evaluation_staff')
    // if (!vLoanNeedScbStaffT1.valid) return {...vLoanNeedScbStaffT1,group: 'loan_need_scb'};

    return { valid: true };
  },
  pro_and_bus(data: IApprovalLOANBussinessActivities) {
    const vName = LOANApprovalValidate.textCheck(
      data.basic_info.business_household_name,
      'emptyBasic'
    );
    if (!vName.valid) return { ...vName, fieldName: 'business_household_name' };

    // const vLicenseType = LOANApprovalValidate.textCheck(data.basic_info.business_license_type_info,'business_license_type_info')
    // if (!vLicenseType.valid) return {...vLicenseType};

    const vCardNum = LOANApprovalValidate.textCheck(
      data.basic_info.business_card_num,
      'emptyBasic'
    );
    if (!vCardNum.valid) return { ...vCardNum, fieldName: 'business_card_num' };

    const vIssueDate = LOANApprovalValidate.textCheck(
      data.basic_info.business_card_issue_date,
      'emptyBasic'
    );
    if (!vIssueDate.valid)
      return { ...vIssueDate, fieldName: 'business_card_issue_date' };

    const vPlaceOfIssue = LOANApprovalValidate.textCheck(
      data.basic_info.business_card_place_of_issue,
      'emptyBasic'
    );
    if (!vPlaceOfIssue.valid)
      return { ...vPlaceOfIssue, fieldName: 'business_card_place_of_issue' };

    // const vWorkingYear = LOANApprovalValidate.numberCheck(data.basic_info.business_working_year_num,'business_working_year_num')
    // if (!vWorkingYear.valid) return {...vWorkingYear};

    const vBusinessCode = LOANApprovalValidate.textCheck(
      data.basic_info.primary_business_code,
      'emptyBasic'
    );
    if (!vBusinessCode.valid)
      return { ...vBusinessCode, fieldName: 'primary_business_code' };

    const vBusinessActual = LOANApprovalValidate.textCheck(
      data.basic_info.business_actual,
      'emptyBasic'
    );
    if (!vBusinessActual.valid)
      return { ...vBusinessActual, fieldName: 'business_actual' };

    const vArea = LOANApprovalValidate.numberCheck(
      data.business_info.business_premises_area,
      'emptyBasic'
    );
    if (!vArea.valid) return { ...vArea, fieldName: 'business_premises_area' };

    const vProperty = LOANApprovalValidate.textCheck(
      data.business_info.owner_property_info,
      'emptyBasic'
    );
    if (!vProperty.valid)
      return { ...vProperty, fieldName: 'owner_property_info' };

    const vAddress = LOANApprovalValidate.textCheck(
      data.business_info.address,
      'emptyBasic'
    );
    if (!vAddress.valid) return { ...vAddress, fieldName: 'address' };

    const vProvince = LOANApprovalValidate.textCheck(
      data.business_info.province,
      'emptyBasic'
    );
    if (!vProvince.valid) return { ...vProvince, fieldName: 'province' };

    const vDistrict = LOANApprovalValidate.textCheck(
      data.business_info.district,
      'emptyBasic'
    );
    if (!vDistrict.valid) return { ...vDistrict, fieldName: 'district' };

    const vWard = LOANApprovalValidate.textCheck(
      data.business_info.ward,
      'emptyBasic'
    );
    if (!vWard.valid) return { ...vWard, fieldName: 'ward' };

    for (let i of data.warehouses) {
      if (i.primary_flag) {
        const vAreaWare = LOANApprovalValidate.numberCheck(
          i.area,
          'emptyBasic'
        );
        if (!vAreaWare.valid) return { ...vAreaWare, fieldName: 'areaWare' };

        const vAddressWare = LOANApprovalValidate.numberCheck(
          i.area,
          'emptyBasic'
        );
        if (!vAddressWare.valid)
          return { ...vAddressWare, fieldName: 'addressWare' };

        const vProvinceWare = LOANApprovalValidate.numberCheck(
          i.province,
          'emptyBasic'
        );
        if (!vProvinceWare.valid)
          return { ...vProvinceWare, fieldName: 'provinceWare' };

        const vDistrictWare = LOANApprovalValidate.numberCheck(
          i.district,
          'emptyBasic'
        );
        if (!vDistrictWare.valid)
          return { ...vDistrictWare, fieldName: 'districtWare' };

        const vWardWare = LOANApprovalValidate.numberCheck(
          i.ward,
          'emptyBasic'
        );
        if (!vWardWare.valid) return { ...vWardWare, fieldName: 'wardWare' };
      }
    }

    // validate IV
    const vNumberMembers = LOANApprovalValidate.numberCheck(
      data.evaluation_assessment.number_members,
      'emptyBasic'
    );
    if (!vNumberMembers.valid)
      return { ...vNumberMembers, fieldName: 'number_members' };

    const vbusiness_efficiency = LOANApprovalValidate.textCheck(
      data.evaluation_assessment.business_efficiency,
      'emptyBasic'
    );
    if (!vbusiness_efficiency.valid)
      return { ...vbusiness_efficiency, fieldName: 'business_efficiency' };

    const vInput = LOANApprovalValidate.textCheck(
      data.evaluation_assessment.input,
      'emptyBasic'
    );
    if (!vInput.valid) return { ...vInput, fieldName: 'input' };

    const vOutput = LOANApprovalValidate.textCheck(
      data.evaluation_assessment.output,
      'emptyBasic'
    );
    if (!vOutput.valid) return { ...vOutput, fieldName: 'output' };

    const vEvaluate = LOANApprovalValidate.textCheck(
      data.evaluation_assessment.evaluate,
      'emptyBasic'
    );
    if (!vEvaluate.valid) return { ...vEvaluate, fieldName: 'evaluate' };

    return { valid: true };
  },
  loan_method(data: ILOANMethod) {
    const credit_granting_method = LOANApprovalValidate.textCheck(
      data.credit_granting_method,
      'emptyBasic'
    );
    if (!credit_granting_method.valid)
      return { ...credit_granting_method, fieldName: 'credit_granting_method' };

    const credit_period = LOANApprovalValidate.number(
      data.credit_period,
      'emptyBasic'
    );
    if (!credit_period.valid)
      return { ...credit_period, fieldName: 'credit_period' };

    const maximum_time_limit = LOANApprovalValidate.numberCheck(
      data.maximum_time_limit,
      'emptyBasic'
    );
    if (!maximum_time_limit.valid)
      return { ...maximum_time_limit, fieldName: 'maximum_time_limit' };

    const disbursement_method = LOANApprovalValidate.textCheck(
      data.disbursement_method,
      'emptyBasic'
    );
    if (!disbursement_method.valid)
      return { ...disbursement_method, fieldName: 'disbursement_method' };

    const interest_payment_method = LOANApprovalValidate.textCheck(
      data.interest_payment_method,
      'emptyBasic'
    );
    if (!interest_payment_method.valid)
      return {
        ...interest_payment_method,
        fieldName: 'interest_payment_method',
      };

    const principal_repayment_method = LOANApprovalValidate.textCheck(
      data.principal_repayment_method,
      'emptyBasic'
    );
    if (!principal_repayment_method.valid)
      return {
        ...principal_repayment_method,
        fieldName: 'principal_repayment_method',
      };

    const fee_interest = LOANApprovalValidate.number(
      data.fee_interest,
      'emptyBasic'
    );
    if (!fee_interest.valid)
      return { ...fee_interest, fieldName: 'fee_interest' };

    const maximum_loan_interest_rate_scb = LOANApprovalValidate.number(
      data.maximum_loan_interest_rate_scb,
      'emptyBasic'
    );
    if (!maximum_loan_interest_rate_scb.valid)
      return {
        ...maximum_loan_interest_rate_scb,
        fieldName: 'maximum_loan_interest_rate_scb',
      };

    return { valid: true };
  },
};
