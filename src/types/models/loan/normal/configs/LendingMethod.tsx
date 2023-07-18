import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalLendingMethodState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}