import { call, put, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { fetchCategory } from "./api";
import { ILOANNormalProductCategory } from "types/models/loan/normal/configs/Product";
import { 
  fetchLOANNormalConfigProductCategory, 
  fetchLOANNormalConfigProductCategoryDone 
} from "features/loan/normal/configs/actions";


function* handleFetchCategory(){
  try{
    const r: IApiResponse<ILOANNormalProductCategory[]> = yield call(fetchCategory);
    yield put(fetchLOANNormalConfigProductCategoryDone(r.data ?? []));
  }
  catch(e){
    yield put(fetchLOANNormalConfigProductCategoryDone([]));
  }
}

export default function* configProductCategorySaga(){
  yield takeLeading(fetchLOANNormalConfigProductCategory.type, handleFetchCategory);
}