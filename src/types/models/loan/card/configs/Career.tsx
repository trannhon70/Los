import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardCareerState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}