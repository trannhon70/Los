import { ICustomerInfo, IPageDocument, IProfileDocument, IProfileDocumentGetFile, IProfileDocumentStructure } from "types/models/loan/normal/storage/ProfileDocument";
import { formatPath, getQueryString } from "utils";
import { apiGet } from "utils/api";
import { API_LOAN_NORMAL_GET_CUSTOMER_INFO, API_LOAN_NORMAL_GET_PROFILEDOCUMENT, API_LOAN_NORMAL_GET_PROFILEDOCUMENT_GET_FILE, API_LOAN_NORMAL_GET_PROFILEDOCUMENT_STRUCTURE } from "../../APIPathsS2";


  export const fetchProfileDocument = (los_id: string) => {
    return apiGet<IProfileDocument[]>(formatPath(API_LOAN_NORMAL_GET_PROFILEDOCUMENT, los_id))
  } 

  export const fetchProfileDocumentCustomerInfo = (los_id: string) => {
    return apiGet<ICustomerInfo>(formatPath(API_LOAN_NORMAL_GET_CUSTOMER_INFO, los_id))
  } 

  export const fetchProfileDocumentStructure = (los_id: string) => {
    return apiGet<IProfileDocumentStructure[]>(formatPath(API_LOAN_NORMAL_GET_PROFILEDOCUMENT_STRUCTURE, los_id))
  } 

  export const fetchProfileDocumentGetFile = (query: IPageDocument) => {
    const queryString = getQueryString({...query});
    // console.log("🚀 ~ file: api.tsx ~ line 17 ~ fetchProfileDocumentGetFile ~ queryString", queryString)
    return apiGet<IProfileDocumentGetFile[]>(formatPath(API_LOAN_NORMAL_GET_PROFILEDOCUMENT_GET_FILE, query.los_id ??'',query.document_type_id,queryString));
  } 
  
  export const fetchDownloadDocumentFile = (listUuid: any) => {
    const queryParameters = new URLSearchParams(listUuid.map((x: string)=>['uuids',x]));
    return apiGet<unknown>(formatPath(`v2/configs/multi-download/?${queryParameters}`));
  }