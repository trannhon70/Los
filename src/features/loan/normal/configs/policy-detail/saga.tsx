import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { fetchPolicyDetail, IPolicyParams } from "./api";
import { IPolicyDetail } from 'types/models/master-data/state';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPolicyDetailStarted, fetchedPolicyDetail, fetchConfigPolicyDetail } from "../actions";

function* handleFetchPolicyDetail(action: PayloadAction<IPolicyParams>){
  try{
    yield put(fetchPolicyDetailStarted(action.payload.policy_group_id));
    const r: IApiResponse<IPolicyDetail[]> = yield call(fetchPolicyDetail, action.payload);
    yield put(fetchedPolicyDetail(r.data ?? [], action.payload.policy_group_id));
  }
  catch(e){
    yield put(fetchedPolicyDetail([], action.payload.policy_group_id));
  }
}

export default function* configPolicyDetailSaga(){
  yield takeEvery(fetchConfigPolicyDetail.type, handleFetchPolicyDetail);
}