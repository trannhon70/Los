import { formatPath } from "utils";
import { apiGet, apiPost } from "utils/api";
import { API_GET_APPROVAL_BLACKLIST, API_GET_APPROVAL_DEDUPE, API_SAVE_APPROVAL_BLACKLIST, API_SAVE_APPROVAL_DEDUPE } from "../../APIPathsS2";
import { IBlackList, IDedupeBlacklist } from 'types/models/loan/normal/storageApproval/DedupeBlackList';

export const saveDedupeApproval = (state:IDedupeBlacklist,
  los_id: string,
) => {
  const body = state.dedupe_table
  return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_DEDUPE, los_id), body);
}

export const saveBlackListApproval =  (state:IDedupeBlacklist,
  los_id: string,
) => {
  const body = state.black_list
  return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_BLACKLIST, los_id), body);
}

export const checkBlackListApproval =  (los_id: string) => {
  return apiGet<IBlackList>(formatPath(API_GET_APPROVAL_BLACKLIST, los_id));
}
export const checkDedupeApproval =  (los_id: string) => {
  return apiGet<IBlackList>(formatPath(API_GET_APPROVAL_DEDUPE, los_id));
}


