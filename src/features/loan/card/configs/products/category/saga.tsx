import { call, put, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { fetchCategoryCard } from "./api";
import { ILOANCardProductCategory } from "types/models/loan/card/configs/Product";
import { fetchLOANCardConfigProductCategory, fetchLOANCardConfigProductCategoryDone } from "features/loan/card/configs/actions";


function* handleFetchCategoryCard(){
  try{
    const r: IApiResponse<ILOANCardProductCategory[]> = yield call(fetchCategoryCard);
    yield put(fetchLOANCardConfigProductCategoryDone(r.data ?? []))
  }
  catch(e){
    yield put(fetchLOANCardConfigProductCategoryDone([]));
  }
}

export default function* configProductCategoryCardSaga(){
  yield takeLeading(fetchLOANCardConfigProductCategory.type, handleFetchCategoryCard);
}