import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardCifIdTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}