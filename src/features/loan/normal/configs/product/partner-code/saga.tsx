import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { fetchPartnerCode } from './api';
import { IApiResponse } from 'types/api';
import { ILOANNormalPartnerCodeList } from 'types/models/loan/normal/configs/Product';
import { 
  fetchLOANNormalConfigProductPartnerCode, 
  fetchLOANNormalConfigProductPartnerCodeDone 
} from 'features/loan/normal/configs/actions';

function* handleFetchPartnerCode(action: PayloadAction<string>){
    try{
    const r: IApiResponse<ILOANNormalPartnerCodeList[]> = yield call(fetchPartnerCode, action.payload);
    yield put(fetchLOANNormalConfigProductPartnerCodeDone(r.data ?? [], action.payload));
  }
  catch(e){
    yield put(fetchLOANNormalConfigProductPartnerCodeDone([], action.payload));
  }
}

export default function* configProductPartnerCodeSaga(){
  yield takeLeading(fetchLOANNormalConfigProductPartnerCode.type, handleFetchPartnerCode);
}