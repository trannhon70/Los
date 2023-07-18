import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardEducationState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}