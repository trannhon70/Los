import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { IApiResponse } from 'types/api';
import { ILOANCardPartnerProduct } from 'types/models/loan/card/configs/Product';
import { fetchConfigProductCardPartnerProduct, fetchConfigProductCardPartnerProductDone } from '../../actions';
import { fetchPartnerProduct } from './api';


function* handleFetchPartnerProduct(action: PayloadAction<string>) {
  try {
    const r: IApiResponse<ILOANCardPartnerProduct[]> = yield call(fetchPartnerProduct, action.payload);
    yield put(fetchConfigProductCardPartnerProductDone(r.data ?? [], action.payload));
  }
  catch (e) {
    yield put(fetchConfigProductCardPartnerProductDone([], action.payload));
  }
}

export default function* configCardProductPartnerProductSaga() {
  yield takeLeading(fetchConfigProductCardPartnerProduct.type, handleFetchPartnerProduct);
}