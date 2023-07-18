import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardOwnerPropertyState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}