import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardAddressTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}