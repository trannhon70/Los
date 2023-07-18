import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { IApiPaging } from "types";
import {
  closeAppBackdrop,
  notify,
  showAppBackdrop
} from "features/app/store/slice";
import { getStoredCorrdinatorLOAN } from "./selector";
import { ECorrdinator } from "./case";
import { apiFetchCorrdinatorLOANDocumentList, apiPostLOANGrandRole } from "./api";
import {
  fetchCorrdinatorLOANList,
  fetchCorrdinatorLOANListDone,
  postLOANGrandRole,
  updateDataFullLOANStored,
  updateLOANDisiableEdit
} from "./action";
import { ICorrdinatorLOANDocumentList, ICorrdinatorLOANQueryFillter, ICorrdinatorLOANState } from "types/models/loan/corrdinator";

function* handleFetchCorrdinatorLOANDocumentList(action: PayloadAction<ICorrdinatorLOANQueryFillter>){
  try{
    const r: IApiPaging<ICorrdinatorLOANDocumentList[]> = yield call(apiFetchCorrdinatorLOANDocumentList, action.payload);
    if (r.success){
      const dataListCorrdinatorDocument: ICorrdinatorLOANDocumentList[] = r.data as ICorrdinatorLOANDocumentList[];

      yield put(fetchCorrdinatorLOANListDone(dataListCorrdinatorDocument, {
        total_page: r.total_page,
        document_type: action.payload.document_type
      }));

      yield put(updateDataFullLOANStored(dataListCorrdinatorDocument, {
        document_type: action.payload.document_type
      }));
    }
    else{
      yield put(fetchCorrdinatorLOANListDone([], {}));
    }
  }
  catch(e){
    yield put(fetchCorrdinatorLOANListDone([],{}));
  }
}

function* handlePostGrandRole(action: PayloadAction<string>){
  try{
    const params: ICorrdinatorLOANState = yield select(getStoredCorrdinatorLOAN);
    yield put(showAppBackdrop());
    const r: IApiPaging<ICorrdinatorLOANDocumentList[]> = yield call(apiPostLOANGrandRole, params, action.payload);
    
    if (r.success){
      let dataListCorrdinatorDocumentUp: ICorrdinatorLOANDocumentList[] = [];
      if (action.payload === ECorrdinator.LOAN){
        dataListCorrdinatorDocumentUp = params.document.LOAN.data.map(d => {
          return {
            ...d,
            isEdit: false
          }
        })
      }

      if (action.payload === ECorrdinator.CREDIT){
        dataListCorrdinatorDocumentUp = params.document.CREDIT.data.map(d => {
          return {
            ...d,
            isEdit: false
          }
        })
      }

      yield put(notify('Phân bổ thành công', { options: { variant: 'success' } }));
      yield put(updateLOANDisiableEdit(false ,{ document_type: action.payload }))

      if(dataListCorrdinatorDocumentUp.length > 0 ){
        yield put(updateDataFullLOANStored( dataListCorrdinatorDocumentUp, {
          document_type: action.payload
        }));
      }
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

export default function* corrdinatorLOANDocumentSaga(){
  yield takeLeading(fetchCorrdinatorLOANList.type, handleFetchCorrdinatorLOANDocumentList);
  yield takeLeading(postLOANGrandRole.type, handlePostGrandRole);
}
