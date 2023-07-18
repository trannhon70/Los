import { IDefaultFlag, IIdCodeName } from "types/base";

export interface ILOANNormalBusinessLicenseTypeState{
  fetching: boolean;
  fetched: boolean;
  data: (IIdCodeName & IDefaultFlag)[];
}