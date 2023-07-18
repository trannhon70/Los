import { 
  ILOANNormalStorageCICDeclareData, 
  ILOANNormalStorageIdentityData, 
  ILOANNormalStorageCICDeclareDataDetail,
  ILOANNormalStorageCICCreditDetailGroup
} from "types/models/loan/normal/storage/CIC";

export const ValidateCIC = {
  info(value: string, field: string){
    return { valid: !!value, field: field, role: 'empty' };
  },
  number(value: number | null, field?: string){
    if (value === null) {
      return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  date(value: number | null, field: string) {
    const today = Date.now()
    if(value === null) {
      return { valid: false, field: field, role: 'empty' };
    }
    if(value && value > today){
        return { valid: false, field: field, role: 'date' };
    }
    return { valid: true };
  },
  dateScore(value: number | null, field: string) {
    const today = Date.now()
    if(value && value > today){
        return { valid: false, field: field, role: 'date' };
    }
    if (value === null) {
        return { valid: false, field: field, role: 'empty' };
    }
    if (isNaN(value)) {
        return { valid: false, field: field, role: 'not_exist' };
    }
    return { valid: true };
  },
  credit(data: ILOANNormalStorageIdentityData){
    if (data) {
     
      const vCreditCode=  ValidateCIC.info(data.code, 'creditCode')
      if(!vCreditCode.valid) return {...vCreditCode }

      const checkEmptyCreditDetail = (creditDetail: ILOANNormalStorageCICCreditDetailGroup) => { 
        if(creditDetail.loan.list.every(e => e.balance === null && e.expired === null && e.amount === null) && creditDetail.card.list.length === 0){
          return true
        }
        return false
      }

      if(checkEmptyCreditDetail(data.detail)){
        return { valid: false,  role:'credit'}
      }
      else{
        for (let index = 0; index < data.detail.loan.list.length; index++) {
          if(data.detail.loan.list[index].amount !== null || data.detail.loan.list[index].expired !== null || data.detail.loan.list[index].balance !== null){
            
            const vDate = ValidateCIC.date(data.detail.loan.date, 'loanDate')
            if(!vDate.valid) return {...vDate}

            const vAmount = ValidateCIC.number(data.detail.loan.list[index].amount, 'amount')
            if(!vAmount.valid) return {...vAmount, loan: data.detail.loan.list[index].code}
            
            const vExpired = ValidateCIC.number(data.detail.loan.list[index].expired, 'expired')
            if(!vExpired.valid) return {...vExpired ,loan: data.detail.loan.list[index].code}
            
            const vBalance = ValidateCIC.number(data.detail.loan.list[index].balance, 'balanceLoan')
            if(!vBalance.valid) return {...vBalance ,loan: data.detail.loan.list[index].code,}

            if(Number(data.detail.loan.list[index].balance) > Number(data.detail.loan.list[index].amount)){
              return {valid: false, loan: data.detail.loan.list[index].code, field: 'balanceLoan', role: 'less_than'}
            }

            const vAmountCIC = ValidateCIC.number(data.detail.loan.list[index].amountCIC, 'amountCIC')
            if(!vAmountCIC.valid) return {...vAmountCIC, loan: data.detail.loan.list[index].code}
            
            const vBalanceCIC = ValidateCIC.number(data.detail.loan.list[index].balanceCIC, 'balanceCICLoan')
            if(!vBalanceCIC.valid) return {...vBalanceCIC ,loan: data.detail.loan.list[index].code,}

            if(Number(data.detail.loan.list[index].balanceCIC) > Number(data.detail.loan.list[index].amountCIC)){
              return {valid: false, loan: data.detail.loan.list[index].code, field: 'balanceCICLoan', role: 'less_than'}
            }
          }
        }
        
        if(data.detail.card.list.length > 0){
          const vDate = ValidateCIC.date(data.detail.card.date, 'cardDate')
            if(!vDate.valid) return {...vDate}

          for (let index = 0; index < data.detail.card.list.length; index++) {
            const vLimited = ValidateCIC.number(data.detail.card.list[index].limited, 'limited')
            if(!vLimited.valid) return {...vLimited, card: data.detail.card.list[index].uuid}
            
            const vBalance = ValidateCIC.number(data.detail.card.list[index].balance, 'balanceCard')
            if(!vBalance.valid) return {...vBalance ,card: data.detail.card.list[index].uuid}
  
            if(Number(data.detail.card.list[index].balance) > Number(data.detail.card.list[index].limited)){
              return {valid: false, card: data.detail.card.list[index].uuid, field: 'balanceCard', role: 'less_than'}
            }

            const vLimitedCIC = ValidateCIC.number(data.detail.card.list[index].limitedCIC, 'limitedCIC')
            if(!vLimitedCIC.valid) return {...vLimitedCIC, card: data.detail.card.list[index].uuid}
            
            const vBalanceCIC = ValidateCIC.number(data.detail.card.list[index].balanceCIC, 'balanceCICCard')
            if(!vBalanceCIC.valid) return {...vBalanceCIC ,card: data.detail.card.list[index].uuid}
  
            if(Number(data.detail.card.list[index].balanceCIC) > Number(data.detail.card.list[index].limitedCIC)){
              return {valid: false, card: data.detail.card.list[index].uuid, field: 'balanceCICCard', role: 'less_than'}
            }

          }
        }
        if(data.detail.collateral.list.length > 0){
          const vDate = ValidateCIC.date(data.detail.collateral.date, 'collateralDate')
          if(!vDate.valid) return {...vDate}

          for (let index = 0; index < data.detail.collateral.list.length; index++) {
            if(data.detail.collateral.list[index].code !== null || data.detail.collateral.list[index].value !== null){
              const vCode = ValidateCIC.info(data.detail.collateral.list[index].code, 'code')
              if(!vCode.valid) return {...vCode, collateral: data.detail.collateral.list[index].uuid}
              
              const vValue = ValidateCIC.number(data.detail.collateral.list[index].value, 'value')
              if(!vValue.valid) return {...vValue ,collateral: data.detail.collateral.list[index].uuid}
            }
          }
        }
      }
    }
    return { valid: true }
  },
  identity(data: ILOANNormalStorageCICDeclareDataDetail){
    if(data){
      if(data.credit.length > 0){
        const vDebtGroup =  ValidateCIC.info(data.debtGroup, 'debtGroup')
        if(!vDebtGroup.valid) return {...vDebtGroup }
    
        for (let index = 0; index < data.credit.length; index++) {
          const vCredit = ValidateCIC.credit(data.credit[index])
          if(!vCredit.valid) return {...vCredit, credit: data.credit[index].uuid}
        }
        const vScoreValue =  ValidateCIC.number(data.credit_score_info.risk_info.score_value,'score_value')
        if(!vScoreValue.valid) return {...vScoreValue }
    
        const vScoreRank =  ValidateCIC.info(data.credit_score_info.risk_info.score_rank,'score_rank')
        if(!vScoreRank.valid) return {...vScoreRank }
    
        const vDate =  ValidateCIC.dateScore(data.credit_score_info.risk_info.publish_date,'date')
        if(!vDate.valid) return {...vDate, key: 'score' }
    
          // const vEvaluation =  ValidateCIC.number(data.credit_score_info.risk_info.evaluation,'evaluation')
          // if(!vEvaluation.valid) return {...vEvaluation }
      }
    }
   return { valid: true }

  },
  other(data: ILOANNormalStorageCICDeclareData){
    if(data){
      for (let index = 0; index < data.data.length; index++) {
        if(data.data[index].credit.length > 0){
          const vIdentity = ValidateCIC.identity(data.data[index])
          if(!vIdentity.valid) return {...vIdentity, identity: data.data[index].uuid}
        }
      }
    }
    return { valid: true }
  },
  scb(data: ILOANNormalStorageCICDeclareData){
    if(data){
      for (let index = 0; index < data.data.length; index++) {
        if(data.data[index].credit.length > 0){
          const vIdentity = ValidateCIC.identity(data.data[index])
          if(!vIdentity.valid) return {...vIdentity, identity: data.data[index].uuid}
        }
      }
    }
    return { valid: true }
  }
}