import { call, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { fetchDocumentType, IDocumentParams } from "./api";
import { IDocumentType } from 'types/models/master-data/state';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchDocumentTypeStarted, fetchDataDocumentType, fetchedDocumentType } from "../actions";
import { pathKeyStore } from "utils";

function* handleFetchDocumentType(action: PayloadAction<IDocumentParams>){
  try{
    yield put(fetchDocumentTypeStarted(pathKeyStore(action.payload)));
    const r: IApiResponse<IDocumentType[]> = yield call(fetchDocumentType, action.payload);
    yield put(fetchedDocumentType(r.data ?? [], pathKeyStore(action.payload)));
  }
  catch(e){
    yield put(fetchedDocumentType([], pathKeyStore(action.payload)));
  }
}

export default function* configDocumentTypeSaga(){
  yield takeEvery(fetchDataDocumentType.type, handleFetchDocumentType);
}