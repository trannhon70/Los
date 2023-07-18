import { IPagingFilter } from "types";
import { ILOANMixed } from "types/models/dashboard/LOANs";
import { formatPath, getQueryString } from "utils";
import { apiGet } from "utils/api";
import { API_BASE_URL_S1 } from "utils/constants";

const _API_DAHSBOARD_LOAN = API_BASE_URL_S1 + '/documents/?:query';

export const fetchLOANList = (query: Partial<IPagingFilter>) => {
  const queryString = getQueryString({ ...query, document_type: 'LOAN' });
  return apiGet<ILOANMixed[]>(formatPath(_API_DAHSBOARD_LOAN, queryString));
}