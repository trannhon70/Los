import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLeading } from "redux-saga/effects";
import { IApiPaging } from "types";
import { ICorrdinatorUserDataChange } from "types/models/corrdinator/user";
import { fetchCorrdinatorUserDone, fetchCorrdinatorUserList } from "./action";
import { apiFetchCorrdinatorUsers } from "./api";


function* handleFetchCorrdinatorUserList(action: PayloadAction<string>){ // s2 phân bổ
  try{
    const r: IApiPaging<ICorrdinatorUserDataChange[]> = yield call(apiFetchCorrdinatorUsers);
    if (r.success){
      yield put(fetchCorrdinatorUserDone(r.data as ICorrdinatorUserDataChange[], {
        total_page: r.total_page
      }));
    }
    else{
      yield put(fetchCorrdinatorUserDone([], {}));
    }
  }
  catch(e){
    yield put(fetchCorrdinatorUserDone([],{}));
  }
}

export default function* corrdinatorUserSaga(){
  yield takeLeading(fetchCorrdinatorUserList.type, handleFetchCorrdinatorUserList);
}