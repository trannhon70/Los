import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalOwnershipStatusState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}