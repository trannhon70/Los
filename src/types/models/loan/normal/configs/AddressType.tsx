import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalAddressTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}