import { ILOANNormalICRApprovalBody } from "types/models/loan/normal/storage/ICR"
import { ApplyControl1,
    ApplyControlData,
    IApplyLos,
    IApprovedLos,
    IModalBodyDecision,
    IParamsControlApply1
}
from "types/models/loan/normal/storageControl"
import { formatPath } from "utils"
import { apiPost } from "utils/api"
import {
    API_APPLY_CONTROL_1,
    API_APPROVE_ICR,
    API_LOAN_APPLY,
    API_LOAN_APPROVE,
    API_LOAN_APPROVE_DECISION,
    API_LOAN_APPROVE_DECISION_UNOFFICIAL,
    API_LOAN_CLOSE,
    API_LOAN_COMFIRM,
    API_LOAN_COMPLAINT,
    API_LOAN_CONTROL_1_APPLY_APPROVE_HQ,
    API_LOAN_CONTROL_1_APPLY_CONTROL_2,
    API_LOAN_CONTROL_1_BEHALF_RETURN,
    API_LOAN_CONTROL_APPLY,
    API_LOAN_CONTROL_APPLY_HQ,
    API_LOAN_CONTROL_APPROVE,
    API_LOAN_CONTROL_REJECT,
    API_LOAN_CONTROL_RETURN_INIT,
    API_LOAN_DECISION_ACCEPT_OFFICIAL,
    API_LOAN_DECISION_ACCEPT_UN_OFFICIAL,
    API_LOAN_DECISION_DENY_OFFICIAL,
    API_LOAN_DECISION_DENY_UN_OFFICIAL,
    API_LOAN_DISAPPROVED,
    API_LOAN_DISCONFIRM,
    API_LOAN_MODIFY_APPROVAL_NOTIFICATION,
    API_LOAN_MODIFY_CREDIT,
    API_LOAN_RETURN_CONTROL,
    API_LOAN_RETURN_CONTROL_2,
    API_LOAN_RETURN_REAPPRAISE,
    API_LOAN_S2_RETURN_CONTROL,
    API_LOAN_SAVE
} from "../APIPathsS2"

/// trạng thái init ////
export const apiStorageApply = (los_uuid: string,position: string, body:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_APPLY, los_uuid,position),body)
}

export const apiStorageClose = (los_uuid: string,position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CLOSE, los_uuid,position))
}

export const apiStorageComplaint = (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_COMPLAINT, los_uuid, position))
}

export const apiStorageSave = (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_SAVE, los_uuid, position))
}

export const apiStorageModifyApprovalNotification = (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_MODIFY_APPROVAL_NOTIFICATION, los_uuid, position))
}

export const apiStorageModifyCredit = (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_MODIFY_CREDIT, los_uuid, position))
}

/// trạng thái kiểm soát ////
export const apiStorageControlApply = (los_uuid: string, position:string,body:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_APPLY, los_uuid,position),body)
}

export const apiStorageConfirm = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_COMFIRM, los_uuid, position))
}

export const apiStorageControlApprove = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_APPROVE, los_uuid, position))
}

export const apiStorageControlReject = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_REJECT, los_uuid, position))
}

export const apiStorageControlReturnInit = (los_uuid: string, position:string,body:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_RETURN_INIT, los_uuid, position),body)
}



/// trạng thái phê duyệt ////

// decision

export const apiStorageApprovedAppceptOfficial = (los_uuid: string, position:string,body:IApprovedLos) => {  // s1 to s2
    return apiPost<unknown>(formatPath(API_LOAN_APPROVE_DECISION, los_uuid, position),body)
}

export const apiStorageApprovedAppceptUnOfficial = (los_id: string, position:string,body:IApprovedLos) => {  // s1 to s2
    return apiPost<unknown>(formatPath(API_LOAN_APPROVE_DECISION_UNOFFICIAL, los_id, position),body)
}
export const apiStorageDecisionAcceptOfficial = (los_uuid: string, position:string,body:IModalBodyDecision) => {
    return apiPost<unknown>(formatPath(API_LOAN_DECISION_ACCEPT_OFFICIAL, los_uuid, position),body)
}

export const apiStorageDecisionAcceptUnOfficial = (los_uuid: string, position:string,body:IModalBodyDecision) => {
    return apiPost<unknown>(formatPath(API_LOAN_DECISION_ACCEPT_UN_OFFICIAL, los_uuid, position),body)
}

export const apiStorageDecisionDenyOfficial = (los_uuid: string, position:string,body:IModalBodyDecision) => {
    return apiPost<unknown>(formatPath(API_LOAN_DECISION_DENY_OFFICIAL, los_uuid, position),body)
}

export const apiStorageDecisionDenyUnOfficial = (los_uuid: string, position:string,body:IModalBodyDecision) => {
    return apiPost<unknown>(formatPath(API_LOAN_DECISION_DENY_UN_OFFICIAL, los_uuid, position),body)
}

// 
export const apiStorageApproveConfirm = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_COMFIRM, los_uuid, position))
}

export const apiStorageApprove = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_APPROVE, los_uuid, position))
}

export const apiStorageApproveReject = (los_uuid: string, position:string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_REJECT, los_uuid, position))
}

export const apiStorageApproveReturnInit = (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_RETURN_INIT, los_uuid, position))
}

export const apiStorageApproveReturnControl= (los_uuid: string, position: string,body:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_RETURN_CONTROL, los_uuid, position),body)
}

export const apiStorageDisconfirm= (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_DISCONFIRM, los_uuid, position))
}

export const apiStorageDisApproved= (los_uuid: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_DISAPPROVED, los_uuid, position))
}


// ICR APPROVE
export const apiStorageApporveICR = (los_uuid: string, position: string, data: ILOANNormalICRApprovalBody) => {
    return apiPost<unknown>(formatPath(API_APPROVE_ICR,los_uuid, position),data)
}

// APPROVAL HEADQUARTER

export const apiStorageApplyControl1 = (los_id: string, position: string,body:ApplyControl1) => {
    return apiPost<unknown>(formatPath(API_APPLY_CONTROL_1, los_id, position),body)
}

export const apiStorageApprovalReturnControl2 = (los_id: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_RETURN_CONTROL_2, los_id, position))
}



export const apiStorageApprovalBeHalfReturn = (los_id: string, position: string) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_1_BEHALF_RETURN, los_id, position))
}

export const apiStorageApprovalControl1ApplyControl2 = (los_id: string, position: string, data:ApplyControlData) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_1_APPLY_CONTROL_2, los_id, position), data)
}

export const apiStorageApprovalControl1ApplyApproveHQ = (los_id: string, position: string, data:ApplyControlData) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_1_APPLY_APPROVE_HQ, los_id, position), data)
}
export const apiStorageApprovalApplyControlHQ = (los_id: string, position: string, data:ApplyControlData) => {
    return apiPost<unknown>(formatPath(API_LOAN_CONTROL_APPLY_HQ, los_id, position), data)
}
export const apiStorageApproveReturnControlHQ = (los_uuid: string, position: string,body:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_S2_RETURN_CONTROL, los_uuid, position),body)
}
export const apiStorageApprovalReturnReAppraise = (los_id: string, position: string,data:IApplyLos) => {
    return apiPost<unknown>(formatPath(API_LOAN_RETURN_REAPPRAISE, los_id, position),data)
}