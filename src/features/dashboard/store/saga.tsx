import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLeading } from "redux-saga/effects";
import { IApiPaging, IPagingFilter } from "types";
import { ILOANMixed } from "types/models/dashboard/LOANs";
import { fetchLOANList } from "../models";
import { dashboardFetchLOANList, dashboardFetchLOANListDone } from "./slice";

function* handleFetchLOANList(action: PayloadAction<IPagingFilter>){
  try{
    const r: IApiPaging<ILOANMixed[]> = yield call(fetchLOANList, action.payload);
    if (r.success){
      yield put(dashboardFetchLOANListDone(r.data as ILOANMixed[], {
        total_page: r.total_page
      }));
    }
    else{
      yield put(dashboardFetchLOANListDone([], {}));
    }
  }
  catch(e){
    yield put(dashboardFetchLOANListDone([], {}));
  }
}

export default function* dashboardSaga(){
  yield takeLeading(dashboardFetchLOANList.type, handleFetchLOANList);
}