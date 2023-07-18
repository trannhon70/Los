import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify } from "features/app/store/slice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import {
  ILOANNormalStorageOtherData,
  ILOANNormalStorageOtherState,
  ILOANNormalStorageOtherValidate,
  IOtherDocumentException
} from "types/models/loan/normal/storage/Other";
import { IMasterData } from "types/models/master-data";
import { fetchDataGuideState } from "../..";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getLOANNormalLOSId, getLOANNormalLOSuuid } from "../selectors";
import {
  deleteException,
  deleteExceptionDetail,
  deleteRiskType,
  saveLOANNormalOther,
  saveOtherControl,
  setNormalStorageOtherValidate,
  updateAPIStorageOtherException,
  updateFullStorageOtherException
} from "./action";
import {
  deleteOtherExceptionList,
  deleteOtherExceptionListDetail,
  deleteOtherRiskGroup,
  saveOther,
  saveOtherControlApproval
} from "./api";
import {
  getLOANNormalStorageOtherSave,
  validateNormalStorageOtherAnalysis,
  validateNormalStorageOtherException
} from "./selectors";

function* handleSaveOther(action: PayloadAction<number, string, string>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    yield put(setNormalStorageOtherValidate({ valid: true }));
    const params: [
      ILOANNormalStorageOtherState,
      string,
      IMasterData
    ] = yield select(getLOANNormalStorageOtherSave);
    const uuid = ''// LOANNormal.storage.full?.data?.form.los_info.los_uuid;

    switch (action.payload) {
      case 0:
          const validateOtherException: ILOANNormalStorageOtherValidate = yield select(validateNormalStorageOtherException);
          if(validateOtherException.valid){
            const r: IApiResponse<ILOANNormalStorageOtherData> = yield call(saveOther, ...params, action.payload);
            if (r.success) {
              yield put(updateFullStorageOtherException(r.data as ILOANNormalStorageOtherData));
              yield put(updateAPIStorageOtherException(r.data as ILOANNormalStorageOtherData, uuid as string));
              yield put(notify(
                'Lưu thành công',
                { options: { variant: 'success' } }
              ));
              yield put(fetchListDataHistoryLogs(los_uuid));
            }
            else {
              yield put(notify(
                r.errors[0].detail,
                { options: { variant: 'error' } }
              ));
            }
          }else{
            yield put(notify(
              'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
            yield put(setNormalStorageOtherValidate(validateOtherException));
          }

        break;
      case 1:
        const validateAnalysis: ILOANNormalStorageOtherValidate = yield select(validateNormalStorageOtherAnalysis);
        if (validateAnalysis.valid) {
          const res: IApiResponse<ILOANNormalStorageOtherData> = yield call(saveOther, ...params, action.payload);

          if (res.success) {

            if (action.meta !== 'delete') {
              yield put(notify(
                'Lưu thành công',
                { options: { variant: 'success' } }
              ));
            }
            yield put(fetchListDataHistoryLogs(los_uuid));
          }
          else {
            yield put(notify(
              res.errors[0].detail,
              { options: { variant: 'error' } }
            ));
          }
        } else {
          yield put(notify(
            'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
          yield put(setNormalStorageOtherValidate(validateAnalysis));
        }
        break;
      default: break;
    }
  }
  catch (e) { }
  finally {
    yield put(closeAppBackdrop())
  }
}


function* handleSaveOtherControl(action: PayloadAction<{currentState:string,position:string, item: string}>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const params: [
      ILOANNormalStorageOtherState,
      string,
      IMasterData
    ] = yield select(getLOANNormalStorageOtherSave);
    const r: IApiResponse<unknown> = yield call(saveOtherControlApproval, ...params, action.payload.currentState,action.payload.position);
    const los_id : string = yield select(getLOANNormalLOSId)

    const getSuccessMsg = (item: string) => {
      switch (item) {
        case 'confirm':
          return 'Kiểm soát thành công'
        case 'approve':
          return 'Phê duyệt thành công'
        case 'disconfirm':
          return 'Hủy Kiểm soát thành công';
        case 'disapprove':
          return 'Hủy Phê duyệt thành công'
        default:
          return "Lưu thành công";
      }
    }

    if (r.success) {
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(notify( getSuccessMsg(action.payload.item), { options: { variant: 'success' } } ));
    }
    else{
      yield put(notify(
        r.errors[0].detail,
        { options: { variant: 'error' } }
      ));
    }


  }
  catch (e) { }
  finally {
    yield put(closeAppBackdrop())
  }
}


function* handleDeleteOtherExceptionList(action: PayloadAction<string>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(deleteOtherExceptionList, los_uuid, action.payload);
    if (r.success) {
      yield put(notify(
        'Xóa thành công',
        { options: { variant: 'success' } }
      ));
    } else {
      yield put(notify(
        r.errors[0].msg,
        { options: { variant: 'error' } }
      ));
    }
  } catch (e) {

  }
  finally {
    yield put(closeAppBackdrop())
  }
}
function* handleDeleteOtherExceptionListDetail(action: PayloadAction<{ uuid_list: string, uuid_item: string }>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(deleteOtherExceptionListDetail, los_uuid, action.payload.uuid_list, action.payload.uuid_item);
    if (r.success) {
      yield put(notify(
        'Xóa thành công',
        { options: { variant: 'success' } }
      ));
    } else {
      yield put(notify(
        r.errors[0].msg,
        { options: { variant: 'error' } }
      ));
    }
  } catch (e) {

  }
  finally {
    yield put(closeAppBackdrop())
  }
}

function* handleDeleteOtherRisk(action: PayloadAction<string>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(deleteOtherRiskGroup, los_uuid, action.payload);
    if (r.success) {
      yield put(notify(
        'Xóa thành công',
        { options: { variant: 'success' } }
      ));
    } else {
      yield put(notify(
        r.errors[0].msg,
        { options: { variant: 'error' } }
      ));
    }
  } catch (e) {

  }
  finally {
    yield put(closeAppBackdrop())
  }
}
export default function* storageOtherSaga() {
  yield takeEvery(saveLOANNormalOther.type, handleSaveOther);
  yield takeEvery(saveOtherControl.type, handleSaveOtherControl);
  yield takeEvery(deleteException.type, handleDeleteOtherExceptionList)
  yield takeEvery(deleteExceptionDetail.type, handleDeleteOtherExceptionListDetail)
  yield takeEvery(deleteRiskType.type, handleDeleteOtherRisk)
}