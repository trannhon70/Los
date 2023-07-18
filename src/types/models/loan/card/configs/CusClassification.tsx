import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardCusClassificationState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}