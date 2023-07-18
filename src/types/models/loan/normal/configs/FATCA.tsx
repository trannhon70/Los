import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalFATCAState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}