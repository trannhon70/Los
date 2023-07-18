import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalRelationshipState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}