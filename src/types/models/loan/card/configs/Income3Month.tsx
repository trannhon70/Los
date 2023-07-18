import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardIncome3MonthState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}