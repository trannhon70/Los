import { ILOANApprovalData } from "types/models/loan/normal/storageApproval"
import { formatPath } from "utils"
import { apiGet } from "utils/api"
import { API_LOAN_APPROVAL_FULL, API_LOAN_APPROVAL_FULL_DOCUMENT, API_LOAN_APPROVAL } from "../APIPathsS2"

export const fetchApprovalData = (id: string,los_uuid:string) => {
    return apiGet<ILOANApprovalData>(formatPath(API_LOAN_APPROVAL_FULL, id,los_uuid))
}

export const fetchApprovalDataDocument = (los_id: string) => {
    return apiGet<ILOANApprovalData>(formatPath(API_LOAN_APPROVAL_FULL_DOCUMENT, los_id))
}

export const fetchApprovalInCome = (los_id: string) => {
    return apiGet<ILOANApprovalData>(formatPath(API_LOAN_APPROVAL, los_id));
}