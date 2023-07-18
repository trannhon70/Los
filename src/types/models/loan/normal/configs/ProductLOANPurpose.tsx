import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalProductLOANPurposeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}