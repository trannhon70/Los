
import { PayloadAction } from "@reduxjs/toolkit";
import { select, takeEvery, call, put, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import { checkBlackList, checkDedupe, postBlackListApproval, postDedupeApproval, updateBlackListApproval, updateDedupeApproval } from "./actions";
import { checkBlackListApproval, checkDedupeApproval, saveBlackListApproval, saveDedupeApproval } from "./api";
import { getLOANNormalLOSId } from "../../storage/selectors";
import { getStorageDedupeList } from "./selector";
import { IBlackList, IDedupeBlacklist, IDedupeList } from "types/models/loan/normal/storageApproval/DedupeBlackList";


function* handleSaveDedupeApproval(action: PayloadAction<string>) {
  try {
    // const los_id: string = yield select(getLOANNormalLOSId)
    // const dedupeData :IDedupeBlacklist = yield select(getStorageDedupeList)
    // const res: IApiResponse<unknown> = yield call(saveDedupeApproval, dedupeData, los_id);
    // yield put(showAppBackdrop());
    // if (res.success) {
      yield put(notify('Lưu Dedupe thành công', { options: { variant: 'success' } }));
    // } else {
    //   yield put(notify('Lưu Dedupe thất bại', { options: { variant: 'error' } }));
    // }
  }
  catch (e) {
    console.log(e)
  }
  finally{
    yield put(closeAppBackdrop());
  }


}
function* handleSaveBlackListApproval(action: PayloadAction<string>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId)
    const dedupeData :IDedupeBlacklist = yield select(getStorageDedupeList)
    const res: IApiResponse<unknown> = yield call(saveBlackListApproval, dedupeData, los_id);
    if (res.success) {
      yield put(notify('Lưu Blacklist thành công', { options: { variant: 'success' } }));
    } else {
      yield put(notify('Lưu Blacklist thất bại', { options: { variant: 'error' } }))
    }
  }
  catch (e) {
    console.log(e)
  }
  finally{
    yield put(closeAppBackdrop());
  }
}

function* handleCheckBlackList(action: PayloadAction<string>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId)
   
    const res: IApiResponse<IBlackList> = yield call(checkBlackListApproval, los_id);
    if (res.success) {
      if(res.data){
        yield put(updateBlackListApproval(res.data))
      }
      yield put(notify('Kiểm tra Blacklist thành công', { options: { variant: 'success' } }));
    } else {
      yield put(notify('Không có thông tin Blacklist', { options: { variant: 'warning' } }));
    }
  }
  catch (e) {
    yield put(notify('Có lỗi xảy ra', { options: { variant: 'error' } }));
    console.log(e)
  }
  finally{
    yield put(closeAppBackdrop());

  }
}

function* handleCheckDedupe(action: PayloadAction<string>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId)
   
    const res: IApiResponse<IDedupeList> = yield call(checkDedupeApproval, los_id);
    if (res.success) {
      if(res.data){
        yield put(updateDedupeApproval(res.data))
      }
      yield put(notify('Kiểm tra Dedupe thành công', { options: { variant: 'success' } }));
    } else {
      yield put(notify('Không có thông tin Dedupe', { options: { variant: 'warning' } }));
    }
  }
  catch (e) {
    yield put(notify('Có lỗi xảy ra', { options: { variant: 'error' } }));
    console.log(e)
  }
  finally{
    yield put(closeAppBackdrop());

  }
}


export default function* storageDedupeApprovalSaga() {
  yield takeEvery(postDedupeApproval.type, handleSaveDedupeApproval);
  yield takeEvery(postBlackListApproval.type, handleSaveBlackListApproval);
  yield takeLeading(checkBlackList.type, handleCheckBlackList)
  yield takeLeading(checkDedupe.type, handleCheckDedupe)
}