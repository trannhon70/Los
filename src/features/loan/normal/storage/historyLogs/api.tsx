import { ILOANNormalLogs, ILogsQueryParams } from "types/models/loan/normal/storage/Logs";
import { formatPath, getQueryString } from "utils";
import { apiGet } from "utils/api";
import { API_LOAN_HISTORY_LOGS } from "../../APIPathsS2";

export const getApiListHistoryLogs = (los_uuid:string,params: ILogsQueryParams) => {
  const qr ={
    page: params.page,
    size: params.sizeload,
    // sort: params.sort,
  }
  const queryParams = getQueryString(qr as unknown as Record<string, string | number | null | undefined>);
  return apiGet<ILOANNormalLogs>(formatPath(API_LOAN_HISTORY_LOGS, los_uuid, queryParams));
}