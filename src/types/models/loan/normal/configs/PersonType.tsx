import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalPersonTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}