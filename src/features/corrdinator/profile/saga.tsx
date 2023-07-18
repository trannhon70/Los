import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { IApiPaging } from "types";
import {
  ICorrdinatorDocumentList,
  ICorrdinatorQueryFillter,
  ICorrdinatorState
} from "types/models/corrdinator";
import {
  fetchCorrdinatorList,
  fetchCorrdinatorListDone,
  postGrandRole,
  updateDataFullStored,
  updateDisiableEdit
} from "./action";
import {
  apiFetchCorrdinatorList,
  apiPostGrandRole
} from "./api";
import {
  closeAppBackdrop,
  notify,
  showAppBackdrop
} from "features/app/store/slice";
import { getStoredCorrdinator } from "./selector";
import { ECorrdinator } from "./case";

function* handleFetchCorrdinatorDocumentList(action: PayloadAction<ICorrdinatorQueryFillter>){
  try{
    const r: IApiPaging<ICorrdinatorDocumentList[]> = yield call(apiFetchCorrdinatorList, action.payload);
    if (r.success){
      const dataListCorrdinatorDocument: ICorrdinatorDocumentList[] = r.data as ICorrdinatorDocumentList[];

      yield put(fetchCorrdinatorListDone(dataListCorrdinatorDocument, {
        total_page: r.total_page,
        document_type: action.payload.document_type
      }));

      yield put(updateDataFullStored(dataListCorrdinatorDocument, {
        document_type: action.payload.document_type
      }));
    }
    else{
      yield put(fetchCorrdinatorListDone([], {}));
    }
  }
  catch(e){
    yield put(fetchCorrdinatorListDone([],{}));
  }
}

function* handlePostGrandRole(action: PayloadAction<ICorrdinatorDocumentList[]>){
  try{
    yield put(showAppBackdrop());
    const r: IApiPaging<ICorrdinatorDocumentList[]> = yield call(apiPostGrandRole, action.payload);
    if (r.success){
      yield put(notify('Phân bổ thành công', { options: { variant: 'success' } }));
    }
    else{
      yield put(notify('Phân bổ thất bại, có lỗi xảy ra', { options: { variant: 'error' } }));
    }

    yield put(closeAppBackdrop());
  }
  catch(e){
    yield put(notify('Phân bổ thất bại, có lỗi xảy ra', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
}

export default function* corrdinatorDocumentSaga(){
  yield takeLeading(fetchCorrdinatorList.type, handleFetchCorrdinatorDocumentList);
  yield takeLeading(postGrandRole.type, handlePostGrandRole);
}