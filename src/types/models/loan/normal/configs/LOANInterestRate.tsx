import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalLOANInterestRateState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}