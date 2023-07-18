/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { fetchPartnerCode } from './api';
import { IApiResponse } from 'types/api';
import { 
  fetchConfigProductCardPartnerCode,
  fetchConfigProductCardPartnerCodeDone 
} from '../../actions';
import { ILOANCardPartnerCodeList } from 'types/models/loan/card/configs/Product';


function* handleFetchPartnerCodeCard(action: PayloadAction<string>){
  try{
    const r: IApiResponse<ILOANCardPartnerCodeList[]> = yield call(fetchPartnerCode, action.payload);
    yield put(fetchConfigProductCardPartnerCodeDone(r.data ?? [], action.payload));
  }
  catch(e){
    yield put(fetchConfigProductCardPartnerCodeDone([], action.payload));
  }
}

export default function* configCardProductPartnerCodeSaga(){
  yield takeLeading(fetchConfigProductCardPartnerCode.type, handleFetchPartnerCodeCard);
}