import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalDebursementState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}