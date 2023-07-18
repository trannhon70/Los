import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalDebtClassificationState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}