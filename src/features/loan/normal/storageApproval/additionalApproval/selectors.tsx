import { RootState } from "types";
import { ValidateAdditionalApproval } from "./validate";

export const getStatementData = (state: RootState) => {
  return state.LOANNormal.storageApproval.additional.statement
}

export const getApprovalNotice = (state: RootState) => {
  return state.LOANNormal.storageApproval.additional.approval_notice
}

export const getLOANNormalApprovalStorageAAStatementSave = (state: RootState) => [
  state.LOANNormal.storageApproval.additional.statement,
  state.LOANNormal.storageApproval.full.data?.form.los_info.los_id as string,
];
export const getLOANNormalApprovalStorageAANoticeSave = (state: RootState) => [
  state.LOANNormal.storageApproval.additional.approval_notice,
  state.LOANNormal.storageApproval.full.data?.form.los_info.los_id as string,
];
export const getLOANNormalApprovalStorageLosId = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.los_info.los_id as string

export const validateAAStatement = (state: RootState) => {

  const vValidate = ValidateAdditionalApproval.statement(state.LOANNormal.storageApproval.additional.statement)
  if(!vValidate.valid) return {...vValidate}
  
  return {valid: true}
};
export const validateAANotice = (state: RootState) => {

  const vValidate = ValidateAdditionalApproval.notice(state.LOANNormal.storageApproval.additional.approval_notice)
  if(!vValidate.valid) return {...vValidate}
  
  return {valid: true}
};

export const getValidateAA = (state: RootState) => {
 
  return state.LOANNormal.storageApproval.additional.validate
};

