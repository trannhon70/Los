import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANCardCustomerTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}