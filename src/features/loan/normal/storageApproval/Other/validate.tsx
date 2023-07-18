import { IApprovalExceptionInfoDetail, IApprovalStorageExceptionInfo } from "types/models/loan/normal/storageApproval/OtherProFile";


export const OtherApprovalValidate = { 
  number(value: number | null, field: string){
    if(value === null){
        return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  policyList(data: IApprovalExceptionInfoDetail[]) {
    if(data){
      for (let i = 0; i < data.length; i++) {
        const vPolicy = OtherApprovalValidate.number(data[i].exception_detail_id, 'exception_detail_id')
        if(!vPolicy.valid) return {...vPolicy, uuid: data[i].uuid}
      }
    }

    return { valid: true }
  },

  exceptionList(data: IApprovalStorageExceptionInfo[]) {
    if(data){
      for (let i = 0; i < data.length; i++) {
        const vException = OtherApprovalValidate.number(data[i].exception_type_id, 'exception_type_id')
        if(!vException.valid) return {...vException, exceptionIdx: i}
        
        const vPolicyList = OtherApprovalValidate.policyList(data[i].detail_info_list)
        if(!vPolicyList.valid) return {...vPolicyList, exceptionIdx: i}
      }
    }
    return { valid: true }
  }
}