import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { IApiResponse } from 'types/api';
import { ILOANNormalPartnerProduct } from 'types/models/loan/normal/configs/Product';
import { fetchPartnerProduct } from './api';
import { 
  fetchLOANNormalConfigProductPartnerProduct, 
  fetchLOANNormalConfigProductPartnerProductDone 
} from 'features/loan/normal/configs/actions';

function* handleFetchPartnerProduct(action: PayloadAction<string>){
  try{
    const r: IApiResponse<ILOANNormalPartnerProduct[]> = yield call(fetchPartnerProduct, action.payload);
    yield put(fetchLOANNormalConfigProductPartnerProductDone(r.data ?? [], action.payload));
  }
  catch(e){
    yield put(fetchLOANNormalConfigProductPartnerProductDone([], action.payload));
  }
}

export default function* configProductPartnerProductSaga(){
  yield takeLeading(fetchLOANNormalConfigProductPartnerProduct.type, handleFetchPartnerProduct);
}