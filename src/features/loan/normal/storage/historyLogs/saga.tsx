import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalLogList, ILogsQueryParams } from "types/models/loan/normal/storage/Logs";
import { getLOANNormalLOSuuid } from "../selectors";
import { fetchHistoryLogsSuccess, fetchListDataHistoryLogs, fetchMoreHistoryLogsData, startFetchHistoryLogs, updateHistoryLogsQuery, updateLOANNormalStorageHistoryLogsData } from "./action";
import { getApiListHistoryLogs } from "./api";
import { getLOANNormalHistoryLogsQuery } from "./selector";


function* handleFetchMoreHistoryLogsData(action: PayloadAction<undefined>) {
  try{
    const los_uuid: string = yield select(getLOANNormalLOSuuid)
    yield put(updateHistoryLogsQuery())
    yield put(fetchListDataHistoryLogs(los_uuid))
  }
  catch(e) {
    // yield put(closeAppBackdrop());
    console.log(e);
  }
}

function* handleFetcHistoryLogsData(action: PayloadAction<string>) {
  try{
    const query : ILogsQueryParams = yield select(getLOANNormalHistoryLogsQuery)
    yield put(startFetchHistoryLogs())
    const r: IApiResponse<unknown> = yield call(getApiListHistoryLogs, action.payload, query);
    
    if (r.data) {
      yield put(updateLOANNormalStorageHistoryLogsData(r.data as ILOANNormalLogList[]))
      yield put(fetchHistoryLogsSuccess());
    }
  }
  catch(e) {
    // yield put(closeAppBackdrop());
    yield put(fetchHistoryLogsSuccess());
    console.log(e);
  }
}

export default function* storageHistoryLogSaga(){
  yield takeLeading(fetchListDataHistoryLogs.type, handleFetcHistoryLogsData);
  yield takeLatest(fetchMoreHistoryLogsData.type, handleFetchMoreHistoryLogsData)
}