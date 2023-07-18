import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalCareerState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}