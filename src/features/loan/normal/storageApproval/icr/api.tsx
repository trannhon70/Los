
import { IResultInternalCreditRating } from "types/models/loan/normal/storageApproval/InternalCreditRating";
import { formatPath } from "utils";
import { apiPost } from "utils/api";
import { SAVE_API_LOAN_APPROVAL_ICR } from "../../APIPathsS2";



export const ApiPostApprovalICR= (storage: IResultInternalCreditRating,los_uuid:string) => {
    const today = Date.now() / 1000
    const body ={
        business_employee: {
            ...storage.business_employee,approval_date:today
        },
        approval_level: {...storage.approval_level,approval_date: today},
        risk_management: {...storage.risk_management,approval_date: today}
    }

    return apiPost<unknown>(formatPath(SAVE_API_LOAN_APPROVAL_ICR, los_uuid),body);
}