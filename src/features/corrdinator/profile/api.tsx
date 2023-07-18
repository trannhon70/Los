import {
  ICorrdinatorDocumentList,
  ICorrdinatorQueryFillter,
  ICorrdinatorState
} from "types/models/corrdinator";
import { formatPath, getQueryString } from "utils";
import { apiGet, apiPost } from "utils/api";
import { API_CORRDINATO_DOCUMENT_LIST, API_CORRDINATO_GRAND_ROLE } from "../APIPaths";
import { ECorrdinator } from "./case";

export const apiFetchCorrdinatorList = (query: Partial<ICorrdinatorQueryFillter>) => {
  const queryString = getQueryString({ ...query });
  return apiGet<ICorrdinatorDocumentList[]>(formatPath(API_CORRDINATO_DOCUMENT_LIST, queryString));
}


export const apiPostGrandRole = (body:ICorrdinatorDocumentList[]) => {

  console.log("body------------               ",body)

  return apiPost<unknown>(
    API_CORRDINATO_GRAND_ROLE,
    body
  )
}