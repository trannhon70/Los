import { IConditionDetail, IConditions, ICreditTerm } from "types/models/loan/normal/storage/Forms";

export const ValidateCreditTerm = {
  info(value: string, uuid: string){
    return { valid: !!value, uuid: uuid, roleTerm: 'empty' };
  },
  
  conditionDetailList(data: IConditionDetail[]) {
    if(data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const vConditionDetail = ValidateCreditTerm.info(data[i].note, data[i].uuid )
        if(!vConditionDetail.valid) return {...vConditionDetail}
      }
    }
    return { valid: true , uuid: ""}
  },
  conditions(data: IConditions){
    if (data) {
      const vPreConditionList =  ValidateCreditTerm.conditionDetailList(data.pre_disbursement_conditions)
      if(!vPreConditionList.valid) return {...vPreConditionList, conType: 'pre_disbursement_conditions' }

      const vAfterConditionList =  ValidateCreditTerm.conditionDetailList(data.conditions_after_disbursement)
      if(!vAfterConditionList.valid) return {...vAfterConditionList, conType: 'conditions_after_disbursement' }
    }
    return { valid: true , uuid: ""}
  },
  creditTerm(data: ICreditTerm, roleTerm: string) {
    if(roleTerm === 'idea_controller'){
      const vControl = ValidateCreditTerm.conditions(data.idea_controller)
      if(!vControl.valid) return {...vControl, roleTerm }
    }
    else if(roleTerm === 'idea_approver'){
      const vApproval = ValidateCreditTerm.conditions(data.idea_approver)
      if(!vApproval.valid) return {...vApproval, roleTerm }
    }
    return {valid : true , uuid: ""}
  }
}