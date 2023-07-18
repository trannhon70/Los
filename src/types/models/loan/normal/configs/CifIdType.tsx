import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalCifIdTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}