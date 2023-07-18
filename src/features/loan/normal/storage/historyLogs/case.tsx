import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "types";
import { ILOANNormalState } from "types/models/loan/normal";
import { ILOANNormalLogList, ILogsQueryParams } from "types/models/loan/normal/storage/Logs";
import { timestampToDate } from "utils/date";


export const HistoryLogsCase = {
  fetchHistoryLogs(state: Draft<ILOANNormalState>, action: PayloadAction<ILogsQueryParams>) {
    state.storage.logs.fetching = true;
    state.storage.logs.fetched = false;
    state.storage.logs.data = {
      list: [],
      total_items: null,
      total_page: null,
      current_page: null,
      warning: []
    };
  },
  startFetchHistoryLogs(state: Draft<ILOANNormalState>) {
    state.storage.logs.fetching = true;
  },
  fetchHistoryLogsSuccess(state: Draft<ILOANNormalState>) {
    // state.storage.logs.data = action.payload;
    state.storage.logs.fetched = true
    state.storage.logs.fetching = false;
  },
  fetchHistoryLogsFailure(state: Draft<ILOANNormalState>, action: PayloadAction<IError[]>) {
    state.storage.logs.error = action.payload;
    state.storage.logs.fetching = false;
    state.storage.logs.fetched = true;
  },
  clearStoredHistoryLogs(state: Draft<ILOANNormalState>, action: PayloadAction<undefined>) {
    state.storage.logs.fetching = false;
    state.storage.logs.fetched = false;
    state.storage.logs.data = {
      list: [],
      total_items: null,
      total_page: null,
      current_page: null,
      warning: []
    };
  },
  fetchMoreHistoryLogsData(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},
  updateHistoryLogsQuery(state: Draft<ILOANNormalState>) {
    state.storage.logs.query = {
      ...state.storage.logs.query,
      sizeload: ((state.storage.logs.query.sizeload ?? 0) + 5)
    }
  },
  fetchListDataHistoryLogs(state: Draft<ILOANNormalState>, action: PayloadAction<string>) { },
  
  updateLOANNormalStorageHistoryLogsData(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalLogList[]>) {
    let DayList : string[] = []
    
    action.payload?.forEach((e) => {
      const day = timestampToDate(e.created_at)
        if(!DayList.includes(day)){
          DayList.push(day)
        }
    })
   
    const newData = DayList.reverse().map(day => ({
      date: day,
      child_time_line: [...action.payload.filter((activity) => (timestampToDate(activity.created_at) === day)).reverse()]
    }))
   
    state.storage.logs.data.list = [...newData]
    
  },
}