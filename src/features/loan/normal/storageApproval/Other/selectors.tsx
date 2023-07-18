import { RootState } from "types";
import { OtherApprovalValidate } from "./validate";

export const getLOANApprovalStorageOtherSave = (state: RootState) => [
    state.LOANNormal.storageApproval.other,
    state.LOANNormal.storage.full.data?.form.los_info.los_id as string,
  ];

export const getApprovalExceptions = (state: RootState) => state.LOANNormal.storageApproval?.other?.exception_info ?? [];

export const getApprovalReport = (state: RootState) => state.LOANNormal.storageApproval?.other?.unit_exception_report;

export const getValidateOtherApproval = (state: RootState) => state.LOANNormal.storageApproval.other.validate

export const ValidateOtherExceptionApproval = (state: RootState) => OtherApprovalValidate.exceptionList(state.LOANNormal.storageApproval.other.exception_info)

export const getRuleDisabledNotice = (state: RootState) => {
  if( state.LOANNormal.storageStateGuide.data?.current_state_id !== "s2_b2_3_pre_appraise" 
    && state.LOANNormal.storageStateGuide.data?.current_state_id !== "s2_b2_4_pre_appraise"
  ){
    return true
  }
  else if(state.LOANNormal.storageStateGuide.data.roles.reappraise_headquarter.username !== state.auth.user?.user_name){
    return true
  }
  return false
}