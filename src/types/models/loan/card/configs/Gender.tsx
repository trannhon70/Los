import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardGenderState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}