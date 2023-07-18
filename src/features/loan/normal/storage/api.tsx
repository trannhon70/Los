import { API_LOAN_NORMAL_FULL_DATA, API_LOAN_NORMAL_SAVE_COLLATERAL, API_LOAN_NORMAL_FULL_DATA_BALANCE_ABILITY} from 'features/loan/normal/APIPaths';
import { ILOANNormalData , IIncomeSourceData} from "types/models/loan/normal/storage";
import { formatPath } from "utils"
import { apiGet, apiPost } from "utils/api"

export const fetchData = (id: string) => {
  return apiGet<ILOANNormalData>(
    formatPath(API_LOAN_NORMAL_FULL_DATA, id)
  )
}

export const fetchDataBalanceAbility = (id: string) =>{
  return apiGet<IIncomeSourceData>(
    formatPath(API_LOAN_NORMAL_FULL_DATA_BALANCE_ABILITY, id)
  )
}

export const fetchDataCollateral = (id: string) => {
  return apiGet<ILOANNormalData>(
    formatPath(API_LOAN_NORMAL_SAVE_COLLATERAL, id)
  )
}
export const saveMultipleFile = ( action: FormData) => {
  return apiPost<unknown>(formatPath("v2/configs/multi-upload/"), action, {
    "Content-Type": "multipart/form-data",
  });
};