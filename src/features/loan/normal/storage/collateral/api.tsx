import { ILOANNormalData } from "types/models/loan/normal/storage";
import { ILOANNormalStorageCollateralState } from "types/models/loan/normal/storage/Collateral";
import { IMasterData } from "types/models/master-data";
import { formatPath } from "utils";
import { apiPost } from "utils/api";
import { API_LOAN_NORMAL_SAVE_COLLATERAL } from "../../APIPaths";

export const saveCollaterals = (storage: ILOANNormalStorageCollateralState, los_uuid: string, master: IMasterData) => {
  const body = {

  }

  return apiPost<ILOANNormalData>(formatPath(API_LOAN_NORMAL_SAVE_COLLATERAL, los_uuid), body);
 
}