import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardPersonTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}