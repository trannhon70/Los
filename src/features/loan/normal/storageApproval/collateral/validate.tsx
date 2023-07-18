import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import { ILoanNormalApprovalLogRows, ILOANNormalApprovalSpreadSheet } from "types/models/loan/normal/storageApproval/Collateral";

export const CollateralApprovalValidate = {

  typeCollateral(value: string, field: string, pos: string) {
    if (value === "") {
      return { valid: false, field: field, role: 'empty', position: pos }
    }
    return { valid: true };
  },


  loan(value: string | null, role?: string, position?: string){
    return { valid: !!value, field: 'loan', role: role ? role : 'empty', position: position }; 
  },

  valueProvisional(value: number | null, role?: string, position?: string){
    if (value === null){
      return { valid: false, field: 'valueProvisional', role: role ? role : 'empty', position: position };
    }

    if (isNaN(value)){
      return { valid: false, field: 'valueProvisional', role: 'not_exist', position: position };
    }

    return { valid: true, field: 'valueProvisional', role: '', position: position };
  },

  maxLVT(value: number | null, role?: string, position?: string){
    if (value === null){
      return { valid: false, field: 'maxLVT', role: role ? role : 'empty', position: position };
    }

    if (isNaN(value)){
      return { valid: false, field: 'maxLVT', role: 'not_exist', position: position };
    }

    return { valid: true, field: 'maxLVT', role: '', position: position };
  },

  debt(value: number | null, role?: string, position?: string){
    if (value === null){
      return { valid: false, field: 'debt', role: role ? role : 'empty', position: position };
    }

    if (isNaN(value)){
      return { valid: false, field: 'debt', role: 'not_exist', position: position };
    }

    return { valid: true, field: 'debt', role: '', position: position };
  },
  maxDept(value: number | null, maxValue: number, role: string, position?: string){
    if (value && value > maxValue){
      return { valid: false, field: 'debt', role: role, position: position };
    }

    return { valid: true, field: 'debt', role: '', position: position };
  },
  priceCertUuid(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'price_cert_uuid', role: role ? role : 'empty', position: position }; 
  },

  reason(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'reason', role: role ? role : 'empty', position: position }; 
  },

  spreadSheetVal(data: ILoanNormalApprovalLogRows) {
    let isValid = { valid: true, field: '', position: ''};
    if (data) {
      const vPriceCertUuid = CollateralApprovalValidate.priceCertUuid(data.coll_price_cert_uuid, "empty", data.uuid)
      if(!vPriceCertUuid.valid) return isValid = {...vPriceCertUuid, position: data.uuid }

      const vLoan = CollateralApprovalValidate.loan(data.loan_credit, "empty", data.uuid)
      if(!vLoan.valid) return isValid = {...vLoan, position: data.uuid}

      const vValueProvisional = CollateralApprovalValidate.valueProvisional(data.temp_calc_value, "empty", data.uuid)
      if(!vValueProvisional.valid) return isValid = {...vValueProvisional, position: data.uuid}

      const vMaxLVT = CollateralApprovalValidate.maxLVT(data.max_ltv_value, "empty", data.uuid)
      if(!vMaxLVT.valid) return isValid = {...vMaxLVT, position: data.uuid}

      const vDebt = CollateralApprovalValidate.debt(data.safely_debit, "empty", data.uuid)
      if(!vDebt.valid) return isValid = {...vDebt, position: data.uuid}

      // const vDebtMax = CollateralApprovalValidate.maxDept(data.debt, ((data.valueProvisional ?? 0)*(data.maxLVT ?? 0)/100) , "maxDept", data.uuidSpreadSheet)
      // if(!vDebtMax.valid) return isValid = {...vDebtMax, position: data.uuidSpreadSheet}
    }

    return isValid;
  },

  spreadSheet(data: ILoanNormalApprovalLogRows[], type: string) {
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = CollateralApprovalValidate.spreadSheetVal(data[index])
        if (!vDetail.valid) { return { ...vDetail, agree: index, type: type} }
      }
    }

    return { valid: true };
  },

  collateralDataDetail(data: ILOANNormalCollateralData){
    let isValid = { valid: true, field: '', position: ''};
    if (data && !data.is_accept) {
      const vReason = CollateralApprovalValidate.reason(data.reason ?? "", "empty", data.uuidActiveData)
      if(!vReason.valid) return isValid = {...vReason, position: data.uuidActiveData }
    }

    return isValid;
  },

  collateral(data: ILOANNormalCollateralData[], type: string){
    let isValid = { valid: true, field: '', type: ''};
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if(data[index]){
          const vDetail = CollateralApprovalValidate.collateralDataDetail(data[index])
          if (!vDetail.valid) { return isValid = { ...vDetail, type: type} };
        }
      }
    }
    return isValid;
  }
}
