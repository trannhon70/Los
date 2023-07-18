import {
  ICorrdinatorLOANDocumentList,
  ICorrdinatorLOANQueryFillter,
  ICorrdinatorLOANState
} from "types/models/loan/corrdinator";
import { formatPath, getQueryString } from "utils";
import { apiGet, apiPost } from "utils/api";
import { API_CORRDINATO_DOCUMENT_LIST, API_CORRDINATO_GRAND_ROLE } from "../APIPaths";
import { ECorrdinator } from "./case";

export const apiFetchCorrdinatorLOANDocumentList = (query: Partial<ICorrdinatorLOANQueryFillter>) => {
  const queryString = getQueryString({ ...query });
  return apiGet<ICorrdinatorLOANDocumentList[]>(formatPath(API_CORRDINATO_DOCUMENT_LIST, queryString));
}


export const apiPostLOANGrandRole = (store: ICorrdinatorLOANState, document_type: string) => {

  let dataUp: ICorrdinatorLOANDocumentList[] = [];

  if (document_type === ECorrdinator.LOAN){
    dataUp = store.document.LOAN.data as ICorrdinatorLOANDocumentList[];
  } else if (document_type === ECorrdinator.CREDIT){
    dataUp = store.document.CREDIT.data as ICorrdinatorLOANDocumentList[];
  }
  else {
    dataUp = [];
  }

  const body = dataUp.filter(dFill => dFill.isEdit).map(item => ({
    los_id: item.document,
    customer_name: item.customer_name,
    controller_1: item.controller_1 === null ? "" : item.controller_1.username.toString(),
    approver: item.approver === null ? "" : item.approver.username.toString(),
    product: item.product_code,
    loan_amount: item.loan_amount,
    note: null
  }))

  return apiPost<unknown>(
    API_CORRDINATO_GRAND_ROLE,
    body
  )
}