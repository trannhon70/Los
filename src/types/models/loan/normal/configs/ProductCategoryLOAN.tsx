import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalProductCategoryLOANState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}