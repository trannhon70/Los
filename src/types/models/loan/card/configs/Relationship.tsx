import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardRelationshipState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}