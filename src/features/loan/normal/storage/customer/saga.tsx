import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop } from "features/app/store/slice";
import {
  call,
  put, select, takeEvery, takeLatest, takeLeading
} from "redux-saga/effects";
import { IApiResponse } from "types";
import { ICustomerGroupActivity, ICustomerQuery } from "types/models/loan/normal/storage/Customer";
import { getLOANNormalLOSId } from "../selectors";
import { fetchCustomerDataSuccess, fetchLOANNormalCustomerData, fetchMoreCustomerData, postCustomerComment, startFetchCustomerData, updateCustomerQuery, updateLOANNormalStorageCustomerData } from "./actions";
import { fetchCustomerData, postCommentCustomer } from "./api";
import { getLOANNormalCustomerQuery } from "./selectors";

function* handleFetchCustomerData(action: PayloadAction<string>) {
  try{
    const query : ICustomerQuery = yield select(getLOANNormalCustomerQuery)
    yield put(startFetchCustomerData())
    const r: IApiResponse<ICustomerGroupActivity[]> = yield call(fetchCustomerData, action.payload, query);
    
    if (r.data) {
      yield put(updateLOANNormalStorageCustomerData(r.data))
      yield put(fetchCustomerDataSuccess())
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    yield put(fetchCustomerDataSuccess())
    console.log(e);
  }
}

function* handlePostCustomerData(action: PayloadAction<string>) {
  try{
    const los_id: string = yield select(getLOANNormalLOSId)

    const r: IApiResponse<any> = yield call(postCommentCustomer, los_id, action.payload);
    if (r.success) {
      yield put(fetchLOANNormalCustomerData(los_id))
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    console.log(e);
  }
}

function* handleFetchMoreCustomerData(action: PayloadAction<undefined>) {
  try{
    const los_id: string = yield select(getLOANNormalLOSId)

    yield put(updateCustomerQuery())
    yield put(fetchLOANNormalCustomerData(los_id))
    
  }
  catch(e) {
    yield put(closeAppBackdrop());
    console.log(e);
  }
}

export default function* storageCustomerSaga() {
  yield takeLeading(fetchLOANNormalCustomerData.type, handleFetchCustomerData);
  yield takeEvery(postCustomerComment.type, handlePostCustomerData);
  yield takeLatest(fetchMoreCustomerData.type, handleFetchMoreCustomerData)
}
