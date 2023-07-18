import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardResidentState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}