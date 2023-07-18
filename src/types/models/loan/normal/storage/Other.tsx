import { IIdCodeName } from "types";
import { IDefaultFlag } from './../../../../base';

///////////// INTERFACE UX ////////////////////////

export interface ILOANNormalStorageOtherValidate{
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
  positionException?: number;
  positionDetail?: number;
}

export interface ILOANNormalStorageExceptionDetail{
  uuid: string;
  uuidRemote: string;
  exceptionId: number;
  exceptionDetailId: number;
  exceptionDetailCode: string;
  exceptionDetailName: string;
  exceptionDetailDescription: string;
  exceptionRealityDescription: string;
  displayOrder: number;
}

export interface ILOANNormalStorageExceptionState{
  uuidRemote: string;
  uuid: string;
  exceptionId: number;
  exceptionName: string;
  detailList: ILOANNormalStorageExceptionDetail[];
}

export interface ILOANNormalStorageRisksGroup{
  uuidRemote: string;
  uuid: string;
  riskInfo: string;
  measuresLimitRisk: string;
  displayOrder: number;
}

export interface ILOANNormalStorageAnalysisState{
  uuidRemote: string;
  uuid: string;
  risksGroup: ILOANNormalStorageRisksGroup[],
  acceptCreditInfo: string;
  reasonCredit: string;
  controlCredit:ILOANNormalStorageControlApproval;
  approveCredit:ILOANNormalStorageControlApproval;
}

export interface ILOANNormalStorageControlApproval{
  acceptCreditInfo: string;
  reasonCredit: string;
}

export interface ILOANNormalStorageOtherState{
  exception: ILOANNormalStorageExceptionState[];
  analysis: ILOANNormalStorageAnalysisState;
  report: string | null;
  validate: ILOANNormalStorageOtherValidate;
}

////////////////////////////////////////////////////////////

/////////// INTERFACE API /////////////////////////

export interface IExceptionType{
  exception_type_id: number;
  exception_type_name: string;
}

export interface IOtherDocumentRisk{
  risks_group_list: IOtherDocumentRiskGroup[];
  accept_credit_info: IIdCodeName;
  reason_credit: string;
  accept_credit_approval_level:{
    accept_credit_status:string;
    reason_credit:string;
  },
  accept_credit_control_level:{
    accept_credit_status:string;
    reason_credit:string;
  }
}

export interface IOtherDocumentRiskGroup{
  uuid: string;
  risk_type_info: (IIdCodeName & IDefaultFlag);
  measures_limit_risk: string;
  display_order: number;
}

export interface IOtherDocumentExceptionDetail{
  uuid: string;
  exception_detail_id: number;
  exception_detail_code: string;
  exception_detail_name: string;
  exception_detail_description: string;
  exception_reality_description: string;
  display_order: number;
}

export interface IOtherDocumentException extends IExceptionType{
  uuid:string;
  detail_info_list: IOtherDocumentExceptionDetail[];
}

export interface ILOANNormalStorageOtherData{
  exception_list: IOtherDocumentException[];
  analysis_measures_risk_info: IOtherDocumentRisk;
  unit_exception_report: string | null
}

export interface ILOANNormalStorageOtherInfo{
  id: string;
  name: string;
  data: ILOANNormalStorageOtherData;
}