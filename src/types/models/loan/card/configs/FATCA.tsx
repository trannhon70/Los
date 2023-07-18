import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardFATCAState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}