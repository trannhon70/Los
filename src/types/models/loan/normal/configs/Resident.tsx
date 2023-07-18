import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalResidentState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}