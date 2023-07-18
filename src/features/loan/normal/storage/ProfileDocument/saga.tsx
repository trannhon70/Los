import { PayloadAction } from "@reduxjs/toolkit";
import { notify } from "features/app/store/slice";
import { call, put, takeEvery } from "redux-saga/effects";
import { ICurrentFile, ICustomerInfo, IDownload, IPageDocument, IProfileDocument, IProfileDocumentGetFile, IProfileDocumentStructure } from "types/models/loan/normal/storage/ProfileDocument";

import { IApiPaging, IApiResponse } from "types";
import { download } from "utils";
import {
  downloadDocumentFile,
  getProfileDocument,
  getProfileDocumentCustomerInfo,
  getProfileDocumentGetfile,
  getProfileDocumentStructure,
  setDownloadDocumentFile,
  updateDocumentTotalItem,
  updateDocumentTotalPage,
  updateLOANNormalStorageProfileDocument,
  updateLOANNormalStorageProfileDocumentCustomerInfo,
  updateLOANNormalStorageProfileDocumentGetFile,
  updateLOANNormalStorageProfileDocumentStructure
} from "./action";
import { fetchDownloadDocumentFile, fetchProfileDocument, fetchProfileDocumentCustomerInfo, fetchProfileDocumentGetFile, fetchProfileDocumentStructure } from "./api";

function* hadnleGetProfileDocument(action: PayloadAction<string>) {
    try{
      const r: IApiResponse<IProfileDocument[]> = yield call(fetchProfileDocument, action.payload);
      if(r.success) {
        if (r.data) {
          yield put(updateLOANNormalStorageProfileDocument(r.data))
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }
  //customerInfo
  function* hadnleGetProfileDocumentCustomerInfo(action: PayloadAction<string>) {
    try{
      const r: IApiResponse<ICustomerInfo> = yield call(fetchProfileDocumentCustomerInfo, action.payload);
      if(r.success) {
        if (r.data) {
          yield put(updateLOANNormalStorageProfileDocumentCustomerInfo(r.data))
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  function* hadnleGetProfileDocumentStruture(action: PayloadAction<string>) {
    try{
      const r: IApiResponse<IProfileDocumentStructure[]> = yield call(fetchProfileDocumentStructure, action.payload);
      if(r.success) {
        if (r.data) {
          yield put(updateLOANNormalStorageProfileDocumentStructure(r.data))
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  function* hadnleGetProfileDocumentGetFile(action: PayloadAction<IPageDocument>) {
    try{
      const r: IApiPaging<IProfileDocumentGetFile[]> = yield call(fetchProfileDocumentGetFile, {...action.payload});
      if(r.success) {
        if (r.data) {
          yield put(updateLOANNormalStorageProfileDocumentGetFile(r.data as IProfileDocumentGetFile[]));
          yield put(updateDocumentTotalPage(r.total_page));
          yield put(updateDocumentTotalItem(r.total_items));
        }else{
          yield put(updateLOANNormalStorageProfileDocumentGetFile([]));
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  









function* handleDownloadMulti(action: PayloadAction<IDownload>) {
  try {
    const r: IApiResponse<ICurrentFile[]> = yield call(fetchDownloadDocumentFile, [action.payload.uuid]);
    if (r.success) {
      // r.data?.forEach((file) => {
      //   download({ filename: decodeURI(file.file_name), url: file.file_url });
      // });
      if (r.data) {
        yield put(setDownloadDocumentFile(r.data[0]))
        console.log(action.payload,'action.payload')
        if(action.payload.isDownload){
          download({ filename: decodeURI(r.data[0].file_name), url: r.data[0].file_url });
        }
      }
      // yield put(notify('Tải xuống tập tin thành công', { options: { variant: 'success' } }));

    }
    else {
      yield put(notify('Lấy thông tin tập tin không thành công', { options: { variant: 'error' } }));
    }
  }
  catch (e) {

  }
}
  export default function* storageFileDocumentSaga() {
    yield takeEvery(getProfileDocument.type, hadnleGetProfileDocument);
    yield takeEvery(getProfileDocumentCustomerInfo.type, hadnleGetProfileDocumentCustomerInfo);

    yield takeEvery(getProfileDocumentStructure.type, hadnleGetProfileDocumentStruture);
    yield takeEvery(getProfileDocumentGetfile.type, hadnleGetProfileDocumentGetFile);
    yield takeEvery(downloadDocumentFile.type,handleDownloadMulti)
    // yield takeLeading(fetchLOANNormalFormsData.type, handleFetchFormsData);
  }