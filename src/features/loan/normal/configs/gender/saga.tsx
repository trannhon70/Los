import { call, put, takeLeading } from "redux-saga/effects";
import { fetchLOANNormalConfigGender, fetchLOANNormalConfigGenderDone } from "features/loan/normal/configs/actions";
import { IApiResponse } from "types/api";
import { IDefaultFlag, IIdCodeName } from "types/base";
import { fetchGender } from "./api";

function* handleFetchGender(){
  try{
    const r: IApiResponse<(IIdCodeName & IDefaultFlag)[]> = yield call(fetchGender);
    yield put(fetchLOANNormalConfigGenderDone(r.data ?? []));
  }
  catch(e){
    yield put(fetchLOANNormalConfigGenderDone([]));
  }
}

export default function* configGenderSaga(){
  yield takeLeading(fetchLOANNormalConfigGender.type, handleFetchGender);
}