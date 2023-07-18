import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalCusClassificationState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}