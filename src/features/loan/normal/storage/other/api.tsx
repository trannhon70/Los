
import { ILOANNormalStorageOtherData, ILOANNormalStorageOtherInfo, ILOANNormalStorageOtherState, IOtherDocumentException } from "types/models/loan/normal/storage/Other";
import { IMasterData } from "types/models/master-data";
import { formatPath } from "utils";
import { apiPost, apiDelete, apiPatch } from "utils/api";
import { API_BASE_URL_S1 } from "utils/constants";
import { findCode, removeFlag } from "views/pages/LOAN/utils";
import { API_LOAN_NORMAL_OTHER_POST_CONTROL_APPROVAL, API_LOAN_NORMAL_OTHER_POST_CONTROL_CONTROL, API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_DETAIL, API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_LIST, API_LOAN_NORMAL_SCB_DELETE_OTHER_RISK_GROUP } from "../../APIPaths";

export const saveOther = (
  other: ILOANNormalStorageOtherState,
  los_uuid: string,
  master: IMasterData,
  step: number
) => {

  const {
    typeRisk: {data: risk},
    acceptCreditLabel: { data: acc },
  } = master;

  const exceptionData = other.exception;
  const analysisData = other.analysis;

  const bodyException = other.report === null ? {
    exception_list : exceptionData.map(ex => {
    return {
      exception_type_id: ex.exceptionId,
      detail_info_list: ex.detailList.map((de, index) => {
        return {
          exception_detail_id: null,
          exception_detail_code: null,
          exception_detail_name: null,
          exception_detail_description: null,
          exception_reality_description: de.exceptionRealityDescription,
          display_order: index
        }
      }),
      exception_type_name: ex.exceptionName
    }
  }) ?? [],
  unit_exception_report: other?.report ?? null
} : {
    exception_list : exceptionData.map(ex => {
    return {
      exception_type_id: ex.exceptionId,
      detail_info_list: ex.detailList.map((de, index) => {
        return {
          exception_detail_id: null,
          exception_detail_code: null,
          exception_detail_name: null,
          exception_detail_description: null,
          exception_reality_description: de.exceptionRealityDescription,
          display_order: index
        }
      }),
      exception_type_name: ex.exceptionName
    }
  }) ?? [],
  unit_exception_report: other?.report ?? null
}

  const bodyRiskType= {
    reason_credit: analysisData.reasonCredit,
    accept_credit_info: {
      id: removeFlag(findCode(acc, analysisData.acceptCreditInfo ?? ""))?.id ?? "",
      code: removeFlag(findCode(acc, analysisData.acceptCreditInfo ?? ""))?.code ?? "",
      name: removeFlag(findCode(acc, analysisData.acceptCreditInfo ?? ""))?.name ?? "",
    },
    risks_group_list: analysisData.risksGroup.map(rs => {
      return {
        display_order: 1,
        measures_limit_risk: rs.measuresLimitRisk,
        risk_type_info: {
          id: removeFlag(findCode(risk, rs.riskInfo ?? ""))?.id ?? "",
          code: removeFlag(findCode(risk, rs.riskInfo ?? ""))?.code ?? "",
          name: removeFlag(findCode(risk, rs.riskInfo ?? ""))?.name ?? "",
        }
      }
    })
  }


  switch(step){
    case 0:
      return apiPatch<ILOANNormalStorageOtherData>(formatPath(API_BASE_URL_S1 + "/normal-loan/:losuuid/other-document/", los_uuid), bodyException);
    case 1:
      return apiPost<ILOANNormalStorageOtherInfo>(formatPath(API_BASE_URL_S1 + "/normal-loan/:losuuid/other-document/analysis-measures-risk/", los_uuid), bodyRiskType);
    }
}

export const saveOtherControlApproval = (
  other: ILOANNormalStorageOtherState,
  los_uuid: string,
  master: IMasterData,
  currentState: string,
  position:string
) =>{


  const bodyControl = {
    accept_credit_status:other?.analysis?.controlCredit?.acceptCreditInfo ?? "Y",
    reason_credit: other?.analysis?.controlCredit?.reasonCredit ?? "",
    role_type: "S1_CTRL"
  }

  const bodyApproval = {
    accept_credit_status:other?.analysis?.approveCredit?.acceptCreditInfo ?? "Y",
    reason_credit: other?.analysis?.approveCredit?.reasonCredit ?? "",
    role_type: "S1_APPR"
  }

  if(currentState === "CONTROLLER_BRANCH"){
    return apiPost<unknown>(formatPath(API_LOAN_NORMAL_OTHER_POST_CONTROL_CONTROL,los_uuid,position),bodyControl)
  }
  else{
    return apiPost<unknown>(formatPath(API_LOAN_NORMAL_OTHER_POST_CONTROL_APPROVAL,los_uuid,position),bodyApproval)
  }
}

export const deleteOtherExceptionList = (los_id: string,uuid: string) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_LIST,los_id,uuid))
}
export const deleteOtherExceptionListDetail = (los_id: string,uuid_list: string, uuid_item: string) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_SCB_DELETE_OTHER_EXCEPTION_DETAIL,los_id,uuid_list,uuid_item))
}
export const deleteOtherRiskGroup = (los_id: string,uuid: string) =>{
  return apiDelete<unknown>(formatPath(API_LOAN_NORMAL_SCB_DELETE_OTHER_RISK_GROUP,los_id,uuid))
}