import { ICustomerQuery } from "types/models/loan/normal/storage/Customer";
import { formatPath, getQueryString } from "utils";
import { apiGet, apiPost } from "utils/api";
import { API_GET_CUSTOMER_DISCUSSION, API_POST_CUSTOMER_DISCUSSION } from "../../APIPathsS2";

export const fetchCustomerData = (los_id : string, query : ICustomerQuery) => {

  const queryParams = getQueryString(query as unknown as Record<string, string | number | null | undefined>);
  
  return apiGet<any>(formatPath(API_GET_CUSTOMER_DISCUSSION, los_id, queryParams));
}


export const postCommentCustomer = (los_id: string,comment: string) => {
  return apiPost<any>(formatPath(API_POST_CUSTOMER_DISCUSSION, los_id), {content: comment});
}
