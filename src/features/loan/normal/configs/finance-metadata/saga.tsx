import { call, put, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { IFinanceMetadata } from "types/models/loan/normal/configs/FinanceMetadata";
import { fetchLOANNormalConfigFinanceMetadata, fetchLOANNormalConfigFinanceMetadataDone } from "./actions";
import { fetchFinanceMetadata } from "./api";

function* handleFetchFinanceMetadata(){
  try{
    const r: IApiResponse<IFinanceMetadata[]> = yield call(fetchFinanceMetadata);
    yield put(fetchLOANNormalConfigFinanceMetadataDone(r.data ?? []));
  }
  catch(e){
    yield put(fetchLOANNormalConfigFinanceMetadataDone([]));
  }
}

export default function* configFinanceMetadataSaga(){
  yield takeLeading(fetchLOANNormalConfigFinanceMetadata.type, handleFetchFinanceMetadata);
}