import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchConfigMetadataConstant, fetchedFailMetadataConstant, fetchedMetadataConstant, fetchMetadataConstantStarted } from "../actions";
import { IMetadataBody, IMetadataConstant } from "types/models/loan/normal/configs/metadata";
import { apiFetchMetadataConstant } from "./api";
import { notify } from "features/app/store/slice";

function* handleFetchMetadataConstant(action: PayloadAction<IMetadataBody>){
  try{
    yield put(fetchMetadataConstantStarted());
    const r: IApiResponse<IMetadataConstant> = yield call(apiFetchMetadataConstant, action.payload);
    if(r.data){
      yield put(fetchedMetadataConstant(r.data));
    }
  }
  catch(e){
    yield put(notify(
      "Không thể lấy metadata",
      { options: { variant: 'error' } }
  ));
    yield put(fetchedFailMetadataConstant());
  }
}

export default function* configMetadataConstantSaga(){
  yield takeEvery(fetchConfigMetadataConstant.type, handleFetchMetadataConstant);
}