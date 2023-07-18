import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLeading } from "redux-saga/effects";
import { IApiPaging } from "types";
import { ICorrdinatorLOANUserNewData, ICorrdinatorUserLOANQueryFillter } from "types/models/loan/corrdinator/user";
import { fetchCorrdinatorLOANUserDone, fetchCorrdinatorLOANUserList } from "./action";
import { apiFetchCorrdinatorLOANUsersNew } from "./api";


function* handleFetchCorrdinatorLOANUserList(action: PayloadAction<ICorrdinatorUserLOANQueryFillter>){
  try{
    const r: IApiPaging<ICorrdinatorLOANUserNewData[]> = yield call(apiFetchCorrdinatorLOANUsersNew);
    if (r.success){
      yield put(fetchCorrdinatorLOANUserDone(r.data as ICorrdinatorLOANUserNewData[], {
        total_page: r.total_page
      }));
    }
    else{
      yield put(fetchCorrdinatorLOANUserDone([], {}));
    }
  }
  catch(e){
    yield put(fetchCorrdinatorLOANUserDone([],{}));
  }
}


export default function* corrdinatorLOANUserSaga(){
  yield takeLeading(fetchCorrdinatorLOANUserList.type, handleFetchCorrdinatorLOANUserList);
}