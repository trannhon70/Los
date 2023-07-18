//API
export interface ILOANNormalApprovalAPIOther {
  exception_info: IApprovalExceptionInfo[],
  unit_exception_report: string | null,
  analysis_countermeasures: IApprovalExceptionAnalysis[],
}
export interface IApprovalExceptionInfo {
  exception_type_id: number | null,
  exception_type_name: string,
  detail_info_list: IApprovalExceptionInfoDetail[]
}

export interface IApprovalExceptionInfoDetail {
  exception_detail_id: number | null,
  exception_detail_code: string,
  exception_detail_name: string,
  description: string,
  reality_description: string,
  uuid: string,
  display_order: number
}

export interface IApprovalExceptionAnalysis {
  accept_credit_info: string,
  reason_credit: string,
  risks_group_list: IApprovalExceptionRiskDetail[],
  suggest_control_level: IApprovalExceptionSuggest | null,
  suggest_approve_level: IApprovalExceptionSuggest | null,
}

export interface IApprovalExceptionSuggest {
  accept_credit_info: string,
  reason_credit: string
}
export interface IApprovalExceptionRiskDetail {
  risk_type_info: string,
  measures_limit_risk: string,
  display_order: number,
  uuid: string
}

///////////// INTERFACE UX ////////////////////////

export interface ILOANNormalApprovalStorageOther {
  exception_info: IApprovalStorageExceptionInfo[],
  unit_exception_report: string | null,
  analysis_countermeasures: IApprovalExceptionAnalysis[],
  validate: ILOANNormalApprovalOtherValidate
}

export interface IApprovalStorageExceptionInfo extends IApprovalExceptionInfo {
  isLocal: boolean,
}

export interface ILOANNormalApprovalOtherState {
  exception_info: IApprovalStorageExceptionInfo[],
  unit_exception_report: string | null,
  analysis_countermeasures: IApprovalExceptionAnalysis[],
  validate: ILOANNormalApprovalOtherValidate
}

export interface ILOANNormalApprovalOtherValidate {
  valid: boolean,
  field?: string,
  role?: string,
  exceptionIdx?: number,
  uuid?: string,
  message?: string
}

