import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import {
  IAAApprovalNotice,
  IAAStatement, IAAValidate, IAdditionalDataAPI, IConditionDeleteInfo, IPhoneDeleteInfo
} from "types/models/loan/normal/storageApproval/AdditionalAppraisal";
import { getLOANNormalLOSId } from "../../storage/selectors";
import {
  deleteCondition,
  deleteConditionStoreFull,
  deleteLocalCondition, deletePhoneNumber, deletePhoneNumberLocal, deletePhoneNumberStoreFull, fetchApprovalAdditional, saveAANotice, saveAAStatement,
  saveAATemplate,
  setAAValidate, updateAANoticeResponseSave, updateAAStatementResponseSave
} from './actions';
import {
  deleteConditionAPI, deletePhoneNumberAPI, getAdditionalApproval, saveAANoticeAPI,
  saveAAStatementAPI,
  saveAATemplateAPI
} from './api';
import {
  getLOANNormalApprovalStorageAANoticeSave,
  getLOANNormalApprovalStorageAAStatementSave, getLOANNormalApprovalStorageLosId, validateAANotice,
  validateAAStatement
} from "./selectors";


function* handleSaveAAStatement(action: PayloadAction<string>) {
  try {
    
    const params: [
      IAAStatement,
      string,
    ] = yield select(getLOANNormalApprovalStorageAAStatementSave);
    const valid: IAAValidate = yield select(
      validateAAStatement
    );

    yield put(setAAValidate(valid));
    yield put(showAppBackdrop());
    
    if(valid.valid){
      const r: IApiResponse<unknown> = yield call(saveAAStatementAPI, ...params);
      if (r.success) {
        yield put(notify(' Lưu thành công ', { options: { variant: 'success' } }));
        if(r.data){
          yield put(updateAAStatementResponseSave(r.data as IAAStatement));
        }
        yield put(closeAppBackdrop());
      }
      else {
        yield put(notify('Lưu thông tin thất bại', { options: { variant: 'error' } }));
        yield put(closeAppBackdrop());
      }
    }
    else {
      yield put(closeAppBackdrop());
      yield put(notify(
        'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.',
        { options: { variant: 'error' } }
      ));
      
    } 
    
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Lưu thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}
function* handleSaveAATemplate(action: PayloadAction<string>) {
  try {
    
   const los_id: string = yield select(getLOANNormalLOSId)

    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(saveAATemplateAPI, los_id);
    if (r.success) {
      yield put(notify(' Lưu thành công ', { options: { variant: 'success' } }));
     
      yield put(closeAppBackdrop());
    }
    else {
      yield put(notify('Lưu thông tin thất bại', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
    }
    
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Lưu thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}

function* handleSaveAANotice(action: PayloadAction<string>) {
  try {
    const params: [
      IAAApprovalNotice,
      string,
    ] = yield select(getLOANNormalApprovalStorageAANoticeSave);
    const valid: IAAValidate = yield select(
      validateAANotice
    );

    yield put(setAAValidate(valid));
    yield put(showAppBackdrop());
    
    if(valid.valid){
      const r: IApiResponse<unknown> = yield call(saveAANoticeAPI, ...params);
      if (r.success) {
        yield put(notify(' Lưu thành công ', { options: { variant: 'success' } }));
        if(r.data){
          yield put(updateAANoticeResponseSave(r.data as IAAApprovalNotice));
        }
        yield put(closeAppBackdrop());
      }
      else {
        yield put(notify('Lưu thông tin thất bại', { options: { variant: 'error' } }));
        yield put(closeAppBackdrop());
      }
    }
    else {
      yield put(closeAppBackdrop());
      yield put(notify(
        'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.',
        { options: { variant: 'error' } }
      ));
      
    } 
    
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Lưu thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}

function* handleDeleteCondition(action: PayloadAction<
  boolean, string,{
    info : IConditionDeleteInfo
  }
  >) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalApprovalStorageLosId);
    if(action.meta.info.uuid !== null) {
      const deleteParams: [
        string,
        string,
        string
      ] = [los_id, action.meta.info.tab, action.meta.info.uuid]
      
      const r : IApiResponse<unknown> = yield call(deleteConditionAPI, ...deleteParams);
      if(r.success) {
        yield put(deleteConditionStoreFull(action.meta.info))
        yield put(deleteLocalCondition(action.meta.info))
        yield put(
          notify(' Xóa thành công ', { options: { variant: 'success' } })
        );
        yield put(closeAppBackdrop());
      }
      else{
        yield put(
          notify(' Xóa không thành công ', { options: { variant: 'error' } })
        );
        yield put(closeAppBackdrop());
      }
    }
    else {
      yield put(deleteLocalCondition(action.meta.info))
      yield put(closeAppBackdrop());
      yield put(
        notify(' Xóa thành công ', { options: { variant: 'success' } })
      );
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Xóa thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}

function* handleDeletePhoneNumber(action: PayloadAction<
  boolean, string,{
    info : IPhoneDeleteInfo
  }
  >) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalApprovalStorageLosId);
    console.log(action.meta.info.uuid);
    
    if(action.meta.info.uuid !== null) {
      const deleteParams: [
        string,
        string
      ] = [los_id , action.meta.info.uuid]
      
      const r : IApiResponse<unknown> = yield call(deletePhoneNumberAPI, ...deleteParams);
      if(r.success) {
        yield put(deletePhoneNumberStoreFull(action.meta.info))
        yield put(deletePhoneNumberLocal(action.meta.info))
        yield put(
          notify(' Xóa thành công ', { options: { variant: 'success' } })
        );
        yield put(closeAppBackdrop());
      }
      else{
        yield put(
          notify(' Xóa không thành công ', { options: { variant: 'error' } })
        );
        yield put(closeAppBackdrop());
      }
    }
    else {
      yield put(deletePhoneNumberLocal(action.meta.info))
      yield put(closeAppBackdrop());
      yield put(
        notify(' Xóa thành công ', { options: { variant: 'success' } })
      );
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Xóa thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}

function* handleFetchApprovalAdditional() {
  try {
    yield put(showAppBackdrop());
    const los_id : string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<IAdditionalDataAPI> = yield call(getAdditionalApproval, los_id);
    if (r.success) {
      if(r.data){
        yield put(updateAAStatementResponseSave(r.data.statement));
        if(r.data.approval_notice !== null){
          yield put(updateAANoticeResponseSave(r.data.approval_notice));
        }
      }
      yield put(closeAppBackdrop());
    }
    else {
      yield put(notify('Tải thông tin thất bại', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Tải thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}


export default function* storageAdditionalAppraisalSaga() {
  yield takeEvery(saveAAStatement.type, handleSaveAAStatement);
  yield takeEvery(saveAANotice.type, handleSaveAANotice);
  yield takeEvery(saveAATemplate.type, handleSaveAATemplate);
  yield takeEvery(deleteCondition.type, handleDeleteCondition);
  yield takeEvery(deletePhoneNumber.type, handleDeletePhoneNumber);
  yield takeEvery(fetchApprovalAdditional.type, handleFetchApprovalAdditional);
  
}