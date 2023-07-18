import { IIdCodeName } from "types/base";


export interface IPolicyDetail extends IIdCodeName{
    description: string
}
export interface ILOANNormalPolicyDetailState{
  fetching: boolean;
  fetched: boolean;
  data: IPolicyDetail[];
}