import { IError } from "types";
export interface ILOANNormaHistoryLogsDataAPI {
  data: ILOANNormalLogList[],
}

export interface ILOANNormalStorageHistoryState{
  fetched: boolean;
  fetching: boolean;
  query : ILogsQueryParams,
  data: ILOANNormalLogs;
  error: IError[];
}

export interface ILOANNormalLogs {
  list: ILOANNormalHistoryListTimeLine[]
  total_items: number | null;
  total_page: number | null;
  current_page: number | null;
  warning: []
}

export interface ILOANNormalHistoryListTimeLine{
  date: string;
  child_time_line: ILOANNormalLogList[]
}

export interface ILOANNormalLogList{  // api
  los_id: string;
  position_group_id: string;
  node_link_id: string;
  position_id: string;
  position_name:string;
  position_detail_id: string;
  action_id: string;
  status_out: string;
  status_out_message: string;
  created_at: number,
  updated_at: number,
  branch_name:string;
  full_name:string;
  title_name:string;
  status_out_message_desc:string;
  status_finished:string;
  sequence: number | null,
}

export interface ILogsQueryParams{
  uuid: string;
  page: number | null | string;
  size: number | null | string;
  sizeload?:number | null;
  sort: string;
}