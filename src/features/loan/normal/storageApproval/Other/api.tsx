
import { ILOANNormalApprovalOtherState } from "types/models/loan/normal/storageApproval/OtherProFile";
import { formatPath, PREFIX_LOCAL } from "utils";
import { apiDelete, apiPost } from "utils/api";
import { DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION, DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION_DETAIL, SAVE_API_LOAN_APPROVAL_OTHER_EXCEPTION, SAVE_API_LOAN_APPROVAL_OTHER_RISK } from "../../APIPathsS2";

export const saveApprovalOther = (
  other: ILOANNormalApprovalOtherState,
  los_id: string,
  step: number,
  isDelete?: boolean
) => {

  const exceptionData = other.exception_info;
  const analysisData = other.analysis_countermeasures;

  const bodyException = !isDelete ? exceptionData?.map(ex => {
    return {
      exception_type_id: ex.exception_type_id,
      exception_type_name: ex.exception_type_name,
      detail_info_list: ex.detail_info_list?.map(de => {
        return {
          exception_detail_id: de.exception_detail_id,
          exception_detail_code: de.exception_detail_code,
          exception_detail_name: de.exception_detail_name,
          description: de.description,
          reality_description: de.reality_description,
          display_order: de.display_order,
          uuid: de.uuid?.includes(PREFIX_LOCAL) ? null : de.uuid
        }
      }),
    } 
  }) : []

  // const bodyRiskType = {
  //   reason_credit: analysisData,
  //   accept_credit_info: analysisData.accept_credit_info,
  //   risks_group_list: analysisData.risks_group_list.map(rs => {
  //     return {
  //       display_order: rs.display_order,
  //       measures_limit_risk: rs.measures_limit_risk,
  //       risk_type_info: rs.risk_type_info,
  //       uuid: rs.uuid
  //     }
  //   })
  // }
  
  switch(step){
    case 0:
      return apiPost<unknown>(formatPath(SAVE_API_LOAN_APPROVAL_OTHER_EXCEPTION, los_id), bodyException);
    case 1:
      return apiPost<unknown>(formatPath(SAVE_API_LOAN_APPROVAL_OTHER_RISK, los_id), analysisData);
    }
}

export const deleteExceptionAPI = (
  los_id: string,
  exception_id : number
) => {
  return apiDelete<unknown>(formatPath(DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION, los_id, exception_id));
}

export const deleteExceptionDetailAPI = (
  los_id: string,
  groupId: number,
  uuid: string) => {
    return apiDelete<unknown>(formatPath(DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION_DETAIL, los_id, uuid));
  }

