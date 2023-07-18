import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalApprovalOtherState, IApprovalExceptionInfo, ILOANNormalApprovalOtherValidate } from "types/models/loan/normal/storageApproval/OtherProFile";
import { PREFIX_LOCAL } from "utils";
import { getLOANNormalLOSId } from "../../storage/selectors";
import { deleteAllApprovalException, deleteAllExceptionStorage, deleteApprovalException, deleteApprovalExceptionDetail, deleteExceptionDetailStorage, deleteExceptionStorage, saveLOANApprovalOther, setOtherApprovalValidate, updateOtherApprovalStorageAfterSave } from "./actions";
import { deleteExceptionAPI, deleteExceptionDetailAPI, saveApprovalOther } from "./api";
import { getLOANApprovalStorageOtherSave, ValidateOtherExceptionApproval } from "./selectors";

function* handleSaveApprovalOther(action: PayloadAction<number>) {
    try {
      yield put(showAppBackdrop());
      const params: [
        ILOANNormalApprovalOtherState,
        string
      ] = yield select(getLOANApprovalStorageOtherSave)
        const validateException : ILOANNormalApprovalOtherValidate = yield select(ValidateOtherExceptionApproval)
        yield put(setOtherApprovalValidate(validateException))
        
        if(!validateException.valid){
          yield put(notify("Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", { options: { variant: 'error' } } ));
        }
        else {
          const r: IApiResponse<unknown> = yield call(saveApprovalOther, ...params, action.payload);
          if(r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } } ));
            if(action.payload === 0 && r.data){
              yield put(updateOtherApprovalStorageAfterSave(r.data as IApprovalExceptionInfo[]))
            }
          }
          else {
            yield put(notify( r.errors[0].detail, { options: { variant: 'error' } } ));
          }
        }
    }
    catch (e) { 
      console.log(e)
      yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
    }
    finally{
      yield put(closeAppBackdrop());
    }
  }

  function* handleDeleteAllApprovalException(action: PayloadAction<undefined>) {
    try {
      yield put(showAppBackdrop());
      const params: [
        ILOANNormalApprovalOtherState,
        string
      ] = yield select(getLOANApprovalStorageOtherSave)
      
        const r: IApiResponse<unknown> = yield call(saveApprovalOther, ...params, 0, true);
        if(r.success) {
          yield put(notify('Xóa thành công', { options: { variant: 'success' } } ));
          yield put(deleteAllExceptionStorage())
          yield put(closeAppBackdrop());
        }
        else {
          yield put(closeAppBackdrop());
          yield put(notify( r.errors[0].detail, { options: { variant: 'error' } } ));
        }
    }
    catch (e) { 
      console.log(e)
      yield put(notify('Xóa thất bại', { options: { variant: 'error' } }));
    }
    finally{
      yield put(closeAppBackdrop());
    }
  }

  function* handleDeleteApprovalException(action: PayloadAction<{
    id: number | null,
		index: number,
		isLocal: boolean}>) {
    try {
        yield put(showAppBackdrop());

        if(action.payload.isLocal){
          yield put(deleteExceptionStorage(action.payload))
          yield put(notify('Xóa thành công', { options: { variant: 'success' } } ));
          yield put(closeAppBackdrop());
        }
        else if(action.payload.id !== null){
          const los_id :string = yield select(getLOANNormalLOSId)
          const r: IApiResponse<unknown> = yield call(deleteExceptionAPI, los_id, action.payload.id);
          if(r.success) {
            yield put(deleteExceptionStorage(action.payload))
            yield put(notify('Xóa thành công', { options: { variant: 'success' } } ));
            yield put(closeAppBackdrop());
          }
          else {
            yield put(closeAppBackdrop());
            yield put(notify( r.errors[0].detail, { options: { variant: 'error' } } ));
          }
        }
        
    }
    catch (e) { 
      console.log(e)
      yield put(notify('Xóa thất bại', { options: { variant: 'error' } }));
    }
    finally{
      yield put(closeAppBackdrop());
    }
  }
  function* handleDeleteApprovalExceptionDetail(action: PayloadAction<{
    groupId: number | null,
		uuid: string,
    index: number, 
		groupIndex : number
  }>) {
    try {
        yield put(showAppBackdrop());

        if(action.payload.uuid.includes(PREFIX_LOCAL)){
          yield put(deleteExceptionDetailStorage(action.payload))
          yield put(notify('Xóa thành công', { options: { variant: 'success' } } ));
          yield put(closeAppBackdrop());
        }
        else if(action.payload.groupId !== null){
          const los_id :string = yield select(getLOANNormalLOSId)
          const r: IApiResponse<unknown> = yield call(deleteExceptionDetailAPI, los_id, action.payload.groupId, action.payload.uuid);
          if(r.success) {
            yield put(deleteExceptionDetailStorage(action.payload))
            yield put(notify('Xóa thành công', { options: { variant: 'success' } } ));
            yield put(closeAppBackdrop());
          }
          else {
            yield put(closeAppBackdrop());
            yield put(notify( r.errors[0].detail, { options: { variant: 'error' } } ));
          }
        }
        
    }
    catch (e) { 
      console.log(e)
      yield put(notify('Xóa thất bại', { options: { variant: 'error' } }));
    }
    finally{
      yield put(closeAppBackdrop());
    }
  }
  
  export default function* storageOtherApprovalSaga() {
    yield takeEvery(saveLOANApprovalOther.type, handleSaveApprovalOther);
    yield takeEvery(deleteAllApprovalException.type, handleDeleteAllApprovalException);
    yield takeEvery(deleteApprovalException.type, handleDeleteApprovalException);
    yield takeEvery(deleteApprovalExceptionDetail.type, handleDeleteApprovalExceptionDetail);
    
  }