import { PayloadAction } from "@reduxjs/toolkit";
import { fetchDataGuideState, fetchDataGuideStateDone, setLOANGuide, startFetchGuideState } from "features/loan/normal";
import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from 'types';
import { fetchGuide, fetchStorageGuide } from "./api";
// import { shouldFetchLOANStateGuideData } from "./selector";
import { IStateParamsControlGuide } from "types/models/loan/normal/storageGuide";
import { closeAppBackdrop } from "features/app/store/slice";
import { clearGuide } from "./action";

function* handleFetchStateGuide(action: PayloadAction<IStateParamsControlGuide>) {
  try {
    // const shouldFetch: boolean = yield select(shouldFetchLOANStateGuideData);
    // if (!shouldFetch) return;
    yield put(clearGuide())
    yield put(startFetchGuideState());
    const r: IApiResponse<any> = yield call(fetchGuide, action.payload.los_id,action.payload.position);
    if (r.success) {
      yield put(setLOANGuide(r.data));
      yield put(fetchDataGuideStateDone());
      // yield put(closeAppBackdrop())
    }
    const y: IApiResponse<any> = yield call(fetchStorageGuide, action.payload.los_id,action.payload.position);
    if (y.success) {
      yield put(setLOANGuide(y.data));
      yield put(fetchDataGuideStateDone());
    }
  }
  catch (e) {
    console.log(e);
    yield put(fetchDataGuideStateDone());
    // yield put(closeAppBackdrop())
  }
}

export default function* storageGuideStateSaga() {
  yield takeEvery(fetchDataGuideState.type, handleFetchStateGuide);

}