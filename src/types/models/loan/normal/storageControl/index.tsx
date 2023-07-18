import { IError } from "types/api";

export interface ILOANNormalStorageControlState {
    apply: ILOANNormalStorageControlApplyState;
    close: ILOANNormalStorageControlCloseState;
    complaint: ILOANNormalStorageControlComplaintState;
    save: ILOANNormalStorageControlSaveState;
    modifyNoti: ILOANNormalStorageControlModifyNotiState;
    modifyCredit: ILOANNormalStorageControlModifyCreditState
}

export interface IParamControl {
    title: string;
    position: string;
}
export interface ApplyControlData{
    username: string | number,
    is_prev_user: boolean,
    note: string,
}
export interface ApplyControl1 extends ApplyControlData {
    approval_level:string;
}
export interface IParamsControlApply extends IParamControl {
    body: IApplyLos
}
export interface IParamsControlApply1 extends IParamControl {
    body: ApplyControl1
}

export interface IParamControlApply extends IParamControl {
    body:ApplyControlData
}
export interface IParamsApprovedDecision extends IParamControl {
    body: IApprovedLos
}
export interface IParamsApprovedDecisionIgnore extends IParamControl {
    body: IModalBodyDecision
}

export interface IApplyLos {
    username: string | number;
    is_prev_user: boolean;
    note: string;
}

export interface IApprovedLos {
    target: string;
    note: string;
}
export interface IModalDecisionItem extends IModalBodyDecision {
    optionsCheck: string;
}
export interface IModalBodyDecision {
    reason: string;
    note: string;
}


export interface IOnLoad {
    fetched: boolean;
    fetching: boolean;
    errors: IError[];
}

export interface ILOANNormalStorageControlApplyState extends IOnLoad { }

export interface ILOANNormalStorageControlCloseState extends IOnLoad { }

export interface ILOANNormalStorageControlComplaintState extends IOnLoad { }

export interface ILOANNormalStorageControlSaveState extends IOnLoad { }

export interface ILOANNormalStorageControlModifyNotiState extends IOnLoad { }

export interface ILOANNormalStorageControlModifyCreditState extends IOnLoad { }



