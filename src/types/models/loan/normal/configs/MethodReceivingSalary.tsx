import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalMethodReceivingSalaryState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}