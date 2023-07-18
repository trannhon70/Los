import { ICorrdinatorUserDataChange } from "types/models/corrdinator/user";
import { formatPath } from "utils";
import { apiGet } from "utils/api";
import { API_CORRDINATO_USERS } from "../APIPaths";


export const apiFetchCorrdinatorUsers = () => {
  return apiGet<ICorrdinatorUserDataChange[]>(formatPath(API_CORRDINATO_USERS));
}
