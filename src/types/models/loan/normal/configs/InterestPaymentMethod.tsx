import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalInterestPaymentMethodState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}