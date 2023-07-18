import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardMarriageStatusState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}