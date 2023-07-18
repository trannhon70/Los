import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchVehicleDetail } from "./api";
import { fetchConfigVehicleDetail, fetchedVehicleDetail, fetchVehicleDetailStarted } from "../actions";
import { IVehicleDetail } from "types/models/loan/normal/configs/VehicleDetail";

function* handleFetchVehicleDetail(action: PayloadAction<string>){
  try{
    yield put(fetchVehicleDetailStarted(action.payload));
    const r: IApiResponse<IVehicleDetail[]> = yield call(fetchVehicleDetail, action.payload);
    if(r.data){
      yield put(fetchedVehicleDetail(r.data));

    }
  }
  catch(e){
    yield put(fetchedVehicleDetail([]));
  }
}

export default function* configVehicleDetailSaga(){
  yield takeEvery(fetchConfigVehicleDetail.type, handleFetchVehicleDetail);
}