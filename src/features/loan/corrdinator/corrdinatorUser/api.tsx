import { ICorrdinatorUserLOANQueryFillter, ICorrdinatorLOANUserData } from "types/models/loan/corrdinator/user";
import { formatPath, getQueryString } from "utils";
import { apiGet } from "utils/api";
import { API_CORRDINATO_USERS, API_CORRDINATO_USERS_NEW } from "../APIPaths";


export const apiFetchCorrdinatorLOANUsers = (query: Partial<ICorrdinatorUserLOANQueryFillter>) => { // s1
  const queryString = getQueryString({ ...query });
  return apiGet<ICorrdinatorLOANUserData[]>(formatPath(API_CORRDINATO_USERS, queryString));
}
export const apiFetchCorrdinatorLOANUsersNew = () => { // s1 new api
  return apiGet<ICorrdinatorLOANUserData[]>(formatPath(API_CORRDINATO_USERS_NEW));
}
