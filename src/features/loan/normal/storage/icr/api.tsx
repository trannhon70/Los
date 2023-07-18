import { ILOANNormalStorageICR, IResLOANNormalDocumentGroup, IResLOANNormalDocumentInfo, IResLOANNormalRESChildFile } from "types/models/loan/normal/storage/ICR";
import { formatPath, getUuidRemovePrefix } from "utils";
import { apiPost, apiGet } from "utils/api";
import { API_BASE_URL_S1 } from "utils/constants";
import { API_LOAN_NORMAL_INTERNAL_CREDIT_RATING,API_LOAN_NORMAL_INTERNAL_CREDIT_RATING_V2 } from "../../APIPaths";

export const ApiGetLoanNormalInternalCreditRating = (los_uuid: string) => {
    return apiGet<string>(formatPath(API_LOAN_NORMAL_INTERNAL_CREDIT_RATING, los_uuid));
}

export const ApiPostLoanNormalInternalCreditRating = (storage: ILOANNormalStorageICR,los_uuid:string) => {
  const today = Date.now()
  const body = {
    business_employee: {
      ...storage.data.data.business_employee,
      description: '',
      approval_date: today / 1000,
      uuid: null
    },
    approval_level: {
      ...storage.data.data.approval_level
      , description: '',
      approval_date: today / 1000
    },
    risk_management: { ...storage.data.data.risk_management, approval_date: today / 1000 },
    document_info_list: storage?.data?.data?.document_info_list?.filter(parentDoc => !parentDoc.document_group.every(doc => (doc.child_files?.length ?? 0) === 0))?.map(
      (parentDoc) => {
        const result: IResLOANNormalDocumentInfo = {
          document_id: parentDoc?.document_id ?? "",
          document_name: parentDoc?.document_name ?? "",
          document_group: parentDoc?.document_group?.filter(doc => (doc?.child_files?.length ?? 0) > 0)?.map((doc) => {
            const result: IResLOANNormalDocumentGroup = {
              document_id: doc.document_id,
              document_name: doc.document_name,
              child_files: doc.child_files?.map((file) => {
                const result: IResLOANNormalRESChildFile = {
                  content_type: file?.content_type ?? null,
                  created_at: (file?.created_at ?? 0) / 1000,
                  created_by: file.created_by,
                  created_by_name: file.created_by_name,
                  updated_by: file.updated_by,
                  updated_by_name: file.updated_by_name,
                  name: file?.name ?? null,
                  size: file?.size ?? null,
                  type: file?.type ?? null,
                  updated_at: file?.updated_at ?? null,
                  uuid: getUuidRemovePrefix(file?.uuid) ?? null,
                  version: file?.version ?? null,
                  custom_keys: file?.custom_keys ?? null,
                  description: file?.description ?? null,
                };
                return result;
              }) ?? [],
            };
            return result;
          }) ?? [],
        };
        return result;
      }
    ) ?? null,
  }

    return apiPost<unknown>(formatPath(API_LOAN_NORMAL_INTERNAL_CREDIT_RATING_V2, los_uuid),body);
}
export const saveFileICR = ( action: FormData) => {
    return apiPost<unknown>(formatPath(API_BASE_URL_S1 + "/configs/multi-upload/"), action, { 
      "Content-Type": "multipart/form-data",
    });
  };