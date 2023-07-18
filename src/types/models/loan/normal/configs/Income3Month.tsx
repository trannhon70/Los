import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalIncome3MonthState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}