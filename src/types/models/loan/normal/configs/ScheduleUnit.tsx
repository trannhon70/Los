import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalScheduleUnitState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}