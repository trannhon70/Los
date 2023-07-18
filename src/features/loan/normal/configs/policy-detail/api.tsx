import { apiGet } from "utils/api"
import { IPolicyDetail } from "types/models/loan/normal/configs/PolicyDetail";
import { API_MASTER_V2_POLICY_DETAIL } from "features/master-data/ApiPath";
import { formatPath } from 'utils';
export interface IPolicyParams {
  policy_group_id: string;
  loan_product_id: string;
}
export const fetchPolicyDetail = (params: IPolicyParams) => {
  return apiGet<IPolicyDetail[]>(formatPath(API_MASTER_V2_POLICY_DETAIL,params.policy_group_id,params.loan_product_id));
}