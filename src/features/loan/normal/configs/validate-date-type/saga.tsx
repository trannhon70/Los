import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from 'types';
import { IValidateDateType } from 'types/models/loan/normal/configs/ValidateDateType';
import { fetchValidateDateType } from './api';
import { fetchedValidateDateType, fetchConfigValidateDateType, fetchValidateDateTypeStarted, fetchedFailValidateDateType } from './../actions';



function* handleFetchValidateDateType(){
  try{
    yield put(fetchValidateDateTypeStarted());
    const r: IApiResponse<IValidateDateType[]> = yield call(fetchValidateDateType);
    if(r.data){
      yield put(fetchedValidateDateType(r.data));
    }
  }
  catch(e){
    yield put(fetchedValidateDateType([]));
  }
}

export default function* configValidateDateTypeSaga(){
  yield takeEvery(fetchConfigValidateDateType.type, handleFetchValidateDateType);
}