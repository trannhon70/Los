import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalGenderState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}