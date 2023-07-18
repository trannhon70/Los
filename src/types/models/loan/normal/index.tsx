import { ILOANNormalConfigState } from "./configs";
import { ILOANNormalStorageState } from "./storage";
import { ILOANApprovalStorageState } from 'types/models/loan/normal/storageApproval';
import { ILOANStorageGuideState } from "./storageGuide";
import { ILOANNormalStorageControlState } from "./storageControl";

export interface ILOANNormalState{
  configs: ILOANNormalConfigState;
  storage: ILOANNormalStorageState;
  storageApproval: ILOANApprovalStorageState;
  storageStateGuide:ILOANStorageGuideState;
  storageControl: ILOANNormalStorageControlState;
}