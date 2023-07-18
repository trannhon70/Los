import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalPaymentMethodState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}