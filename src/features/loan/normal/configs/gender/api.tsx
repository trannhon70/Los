import { apiGet } from "utils/api"
import { API_LOAN_NORMAL_CONFIG_GENDER } from "features/loan/normal/APIPaths";
import { IDefaultFlag, IIdCodeName } from "types/base";

export const fetchGender = () => {
  return apiGet<(IIdCodeName & IDefaultFlag)[]>(API_LOAN_NORMAL_CONFIG_GENDER);
}