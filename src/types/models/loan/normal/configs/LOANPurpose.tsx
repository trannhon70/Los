import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalLOANPurposeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}