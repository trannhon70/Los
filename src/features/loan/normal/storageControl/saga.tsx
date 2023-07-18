import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, put, call, select } from "redux-saga/effects";
import { IApiResponse } from 'types';
import { IParamControl,
  IParamControlApply,
  IParamsApprovedDecision,
  IParamsApprovedDecisionIgnore,
  IParamsControlApply,
  IParamsControlApply1
}
from "types/models/loan/normal/storageControl";
import {
  apiStorageApply,
  apiStorageApplyControl1,
  apiStorageApporveICR,
  apiStorageApprovalApplyControlHQ,
  apiStorageApprovalBeHalfReturn,
  apiStorageApprovalControl1ApplyApproveHQ,
  apiStorageApprovalReturnReAppraise,
  apiStorageApprove,
  apiStorageApproveConfirm,
  apiStorageApprovedAppceptOfficial,
  apiStorageApprovedAppceptUnOfficial,
  apiStorageApproveReject,
  apiStorageApproveReturnControl,
  apiStorageApproveReturnControlHQ,
  apiStorageApproveReturnInit,
  apiStorageClose,
  apiStorageComplaint,
  apiStorageConfirm,
  apiStorageControlApply,
  apiStorageControlApprove,
  apiStorageControlReject,
  apiStorageControlReturnInit,
  apiStorageDecisionAcceptOfficial,
  apiStorageDecisionAcceptUnOfficial,
  apiStorageDecisionDenyOfficial,
  apiStorageDecisionDenyUnOfficial,
  apiStorageDisApproved,
  apiStorageDisconfirm,
  apiStorageModifyApprovalNotification,
  apiStorageModifyCredit,
  apiStorageSave
} from "./api";
import {
  callColtrolClose,
  callColtrolComplaint,
  callColtrolSave,
  callColtrolApprove,
  callInitApply,
  callColtrolModifyCredit,
  callColtrolApply,
  callControlComfirm,
  callControlApprove,
  callControlReject,
  callControlReturnInit,
  callApprovalComfirm,
  callApprovalApprove,
  callApprovalReject,
  callApprovalReturnInit,
  callApprovalReturnControl,
  callApprovalAcceptUnOfficial,
  callApprovalDenyOfficial,
  callApprovalDenyUnOfficial,
  callColtrolModifyNoti,
  callApprovalAcceptOfficial,
  callColtrolApprovedOfficial,
  callDisConfirm,
  callDisApproved,
  callICRApprove,
  callApprovalReturnReAppraise,
  callApprovalBeHalfReturn,
  callApprovalControl1ApplyApproveHQ,
  callApprovalApplyControl1,
  callApprovalControlToHQ,
  callApprovalReturnControlHQ
} from "./action";
import {
  closeAppBackdrop,
  notify,
  showAppBackdrop
} from "features/app/store/slice";
import { getLOANNormalLOSId, getLOANNormalLOSuuid } from "../storage/selectors";
import { fetchDataGuideState } from "..";
import { fetchListDataHistoryLogs } from "../storage/historyLogs/action";
import { fetchLOANNormalCustomerData, postCustomerComment } from "../storage/customer/actions";
import { getLoanNormalICRData } from "../storage/icr/selector";
import { ILOANNormalStorageICRData } from "types/models/loan/normal/storage/ICR";
import { getTemplateLOANNormal } from "../storage/forms/actions";
import { ETypeButton } from "./case";
// =========================init
function* handleCallStateApply(action: PayloadAction<IParamsControlApply>) {  // trình init to control
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSId);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageApply, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify('Trình hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id , position: action.payload.position }));  //
      yield put(postCustomerComment(action.payload.body.note))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Trình hồ sơ thất bại. Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateClose(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageClose, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify('Đóng hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Đóng hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    yield put(closeAppBackdrop());
  }
}

function* handleCllStateComplant(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(apiStorageComplaint, action.payload.title, action.payload.position);
    if (r.success) {
      yield put(notify('Khiếu nại hồ sơ thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Khiếu nại hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCllStateSave(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(apiStorageSave, action.payload.title, action.payload.position);
    if (r.success) {
      yield put(notify('Lưu hồ sơ thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Lưư hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateModifyNotification(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(apiStorageModifyApprovalNotification, action.payload.title, action.payload.position);
    if (r.success) {
      yield put(notify('Điều chỉnh TBPD thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Điều chỉnh TBPD thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateModifyCredit(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(apiStorageModifyCredit, action.payload.title, action.payload.position);
    if (r.success) {
      yield put(notify('Thay đổi nội dung CTD thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Thay đổi nội dung CTD thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

// ===================Control Confirm saga 
function* handleCallStateControlApply(action: PayloadAction<IParamsControlApply>) {  // trình control to approved
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageControlApply, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify("Trình hồ sơ thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(action.payload.body.note))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Trình hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallControlConfirm(action: PayloadAction<IParamControl>) {  // Control
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageConfirm, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify("Kiểm soát thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify("Kiểm soát thất bại", { options: { variant: 'error' } }));
    }
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }
}


function* handleCallStateApprove(action: PayloadAction<IParamControl>) { // Approved
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId);
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(apiStorageControlApprove, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify('Phê duyệt hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Phê duyệt hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }
  
}

function* handleCallStateApprovedDecision(action: PayloadAction<IParamsApprovedDecision>) {  // s1 to s2
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    if(action.payload.title === ETypeButton.apply_headquarter_official){
      const r: IApiResponse<unknown> = yield call(apiStorageApprovedAppceptOfficial, los_uuid, action.payload.position, action.payload.body);
      const los_id: string = yield select(getLOANNormalLOSId)
      if (r.success) {
        yield put(notify("Trình hồ sơ thành công đến phòng thẩm định phê duyệt", { options: { variant: 'success' } }));
        yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
        yield put(postCustomerComment(action.payload.body.note))
        yield put(fetchLOANNormalCustomerData(los_id))
        yield put(fetchListDataHistoryLogs(los_uuid));
      }
      else {
        yield put(notify('Trình hồ sơ thất bại', { options: { variant: 'error' } }));
      }
      yield put(closeAppBackdrop());
    }
    else if(action.payload.title === ETypeButton.apply_headquarter_unofficial) {
      const los_id: string = yield select(getLOANNormalLOSId)
      const r: IApiResponse<unknown> = yield call(apiStorageApprovedAppceptUnOfficial, los_id, action.payload.position, action.payload.body);
      if (r.success) {
        yield put(notify("Trình hồ sơ thành công đến phòng thẩm định phê duyệt", { options: { variant: 'success' } }));
        yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
        yield put(postCustomerComment(action.payload.body.note))
        yield put(fetchLOANNormalCustomerData(los_id))
        yield put(fetchListDataHistoryLogs(los_uuid));
      }
      else {
        yield put(notify('Trình hồ sơ thất bại', { options: { variant: 'error' } }));
      }
      yield put(closeAppBackdrop());
    }
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }
}


function* handleCallStateReject(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageControlReject, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify('Từ chối xử lý hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Từ chối xử lý hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateReturnInit(action: PayloadAction<IParamsControlApply>) {  // change api return
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageControlReturnInit, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify('Trả hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(action.payload.body.note))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Trả hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

// ========================APPROVAL ========================
function* handleCallStateApprovalConfirm(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApproveConfirm, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify("Xác nhận thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Xác nhận hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalApprove(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApprove, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify("Phê duyệt thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Phê duyệt hồ sơ thất bại', { options: { variant: 'error' } }));
    }
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalReject(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApproveReject, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify("Xác nhận thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Xác nhận hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalReturnInit(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApproveReturnInit, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify("Xác nhận thành công", { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Xác nhận hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalReturnControl(action: PayloadAction<IParamsControlApply>) { // change api return control
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(apiStorageApproveReturnControl, los_uuid, action.payload.position, action.payload.body);
    const los_id: string = yield select(getLOANNormalLOSId)

    if (r.success) {
      yield put(notify(`Trả hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(action.payload.body.note))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Trả hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}
// luồng nguyên tắc
function* handleCallStateApprovalDecisionAcceptOfficial(action: PayloadAction<IParamsApprovedDecisionIgnore>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDecisionAcceptOfficial, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Quyết định chính thức thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(`${action.payload.body.reason} ${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(getTemplateLOANNormal(los_uuid)); // call lại biểu mẫu
    }
    else {
      yield put(notify('Quyết định chính thức thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalDecisionAcceptUnOfficial(action: PayloadAction<IParamsApprovedDecisionIgnore>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDecisionAcceptUnOfficial, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Quyết định hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(`${action.payload.body.reason} ${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(getTemplateLOANNormal(los_uuid)); // call lại biểu mẫu
    }
    else {
      yield put(notify('Quyết định hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalDecisionDenyOfficial(action: PayloadAction<IParamsApprovedDecisionIgnore>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDecisionDenyOfficial, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Quyết định hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(`${action.payload.body.reason} ${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(getTemplateLOANNormal(los_uuid)); // call lại biểu mẫu
    }
    else {
      yield put(notify('Quyết định hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallStateApprovalDecisionDenyUnOfficial(action: PayloadAction<IParamsApprovedDecisionIgnore>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDecisionDenyUnOfficial, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Quyết định hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(postCustomerComment(`${action.payload.body.reason} ${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(getTemplateLOANNormal(los_uuid)); // call lại biểu mẫu
    }
    else {
      yield put(notify('Quyết định hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallDisConfirm(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDisconfirm, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify(`Hủy kiểm soát thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Hủy kiểm soát thất bại', { options: { variant: 'error' } }));
    }
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
  finally{
    // yield put(closeAppBackdrop());
  }
}

function* handleCallDisApproved(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageDisApproved, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify(`Hủy phê duyệt thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({ los_id, position: action.payload.position }));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Hủy phê duyệt thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}



function* handleCallApproveICR(action: PayloadAction<{position: string, type: string}>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId)
    const data: ILOANNormalStorageICRData = yield select(getLoanNormalICRData);
    const r: IApiResponse<unknown> = yield call(apiStorageApporveICR, los_id, action.payload.position,
      { ...data, business_employee: data.business_employee, risk_management: data.risk_management, approval_level: data.approval_level });
    if (r.success) {

      yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      if(action.payload.type === ETypeButton.approve){
         yield put(notify(`Phê duyệt thành công`, { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(`Hủy phê duyệt thành công`, { options: { variant: 'success' } }));
      }
    }
    else {
      if(action.payload.type === ETypeButton.approve){
        yield put(notify(`Phê duyệt thất bại`, { options: { variant: 'error' } }));
     }
     else {
       yield put(notify(`Hủy phê duyệt thất bại`, { options: { variant: 'error' } }));
     }
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}


function* handleCallReturnReAppraise(action: PayloadAction<IParamsControlApply>) { // return TTD
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageApprovalReturnReAppraise, los_uuid, action.payload.position,action.payload.body);
    if (r.success) {
      yield put(notify(`Trả hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      yield put(postCustomerComment(`${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
      yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('Trả hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}


function* handleCallReturnControlHQ(action: PayloadAction<IParamsControlApply>) { // return Control HQ
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId)
    const r: IApiResponse<unknown> = yield call(apiStorageApproveReturnControlHQ, los_uuid, action.payload.position,action.payload.body);
    if (r.success) {
      yield put(notify(`Trả hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(postCustomerComment(`${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
    }
    else {
      yield put(notify('Trả hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallBeHalfReturn(action: PayloadAction<IParamControl>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(apiStorageApprovalBeHalfReturn, los_uuid, action.payload.position);
    if (r.success) {
      yield put(notify(`thành công`, { options: { variant: 'success' } }));
      // yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      // yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallControl1ApplyApproveHQ(action: PayloadAction<IParamControlApply>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApprovalControl1ApplyApproveHQ, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Trình hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(postCustomerComment(`${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
    }
    else {
      yield put(notify('Trình hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallControlApply1Head(action: PayloadAction<IParamsControlApply1>) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const r: IApiResponse<unknown> = yield call(apiStorageApplyControl1, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`thành công`, { options: { variant: 'success' } }));
      // yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      // yield put(fetchListDataHistoryLogs(los_uuid));
    }
    else {
      yield put(notify('thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

function* handleCallApplyControlToHQ(action: PayloadAction<IParamControlApply>) { // S2 Reappraise to control
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const los_id: string = yield select(getLOANNormalLOSId);
    const r: IApiResponse<unknown> = yield call(apiStorageApprovalApplyControlHQ, los_uuid, action.payload.position, action.payload.body);
    if (r.success) {
      yield put(notify(`Trình hồ sơ thành công`, { options: { variant: 'success' } }));
      yield put(fetchDataGuideState({los_id ,position:action.payload.position}));  //
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(postCustomerComment(`${action.payload.body.note}`))
      yield put(fetchLOANNormalCustomerData(los_id))
    }
    else {
      yield put(notify('Trình hồ sơ thất bại', { options: { variant: 'error' } }));
    }
    yield put(closeAppBackdrop());
  }
  catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  }
}

export default function* storageControlStateSaga() {

  //S1 
  yield takeEvery(callInitApply.type, handleCallStateApply);
  yield takeEvery(callColtrolClose.type, handleCallStateClose);
  yield takeEvery(callColtrolComplaint.type, handleCllStateComplant);
  yield takeEvery(callColtrolSave.type, handleCllStateSave);
  yield takeEvery(callColtrolApprove.type, handleCallStateApprove);
  // INIT

  yield takeEvery(callColtrolClose.type, handleCallStateClose);
  yield takeEvery(callColtrolComplaint.type, handleCllStateComplant);
  yield takeEvery(callColtrolSave.type, handleCllStateSave);
  yield takeEvery(callColtrolModifyNoti.type, handleCallStateModifyNotification);
  yield takeEvery(callColtrolModifyCredit.type, handleCallStateModifyCredit);

  // CONTROL

  yield takeEvery(callColtrolApply.type, handleCallStateControlApply);
  yield takeEvery(callControlComfirm.type, handleCallControlConfirm);
  yield takeEvery(callControlApprove.type, handleCallStateApprove);
  yield takeEvery(callControlReject.type, handleCallStateReject);
  yield takeEvery(callControlReturnInit.type, handleCallStateReturnInit);

  // APPROVAL

  yield takeEvery(callApprovalAcceptOfficial.type, handleCallStateApprovalDecisionAcceptOfficial);
  yield takeEvery(callApprovalAcceptUnOfficial.type, handleCallStateApprovalDecisionAcceptUnOfficial);
  yield takeEvery(callApprovalDenyOfficial.type, handleCallStateApprovalDecisionDenyOfficial);
  yield takeEvery(callApprovalDenyUnOfficial.type, handleCallStateApprovalDecisionDenyUnOfficial);
  yield takeEvery(callColtrolApprovedOfficial.type, handleCallStateApprovedDecision);


  yield takeEvery(callApprovalComfirm.type, handleCallStateApprovalConfirm);
  yield takeEvery(callApprovalApprove.type, handleCallStateApprovalApprove);
  yield takeEvery(callApprovalReject.type, handleCallStateApprovalReject);
  yield takeEvery(callApprovalReturnInit.type, handleCallStateApprovalReturnInit);
  yield takeEvery(callApprovalReturnControl.type, handleCallStateApprovalReturnControl);

  // disconfirm and disapproved
  yield takeEvery(callDisConfirm.type, handleCallDisConfirm);
  yield takeEvery(callDisApproved.type, handleCallDisApproved);


  // Approve ICR
  yield takeEvery(callICRApprove.type, handleCallApproveICR)


  yield takeEvery(callApprovalBeHalfReturn.type,handleCallBeHalfReturn)
  yield takeEvery(callApprovalControl1ApplyApproveHQ.type,handleCallControl1ApplyApproveHQ)
  yield takeEvery(callApprovalApplyControl1.type,handleCallControlApply1Head)
  yield takeEvery(callApprovalControlToHQ.type,handleCallApplyControlToHQ)
  // S2 return 
  yield takeEvery(callApprovalReturnReAppraise.type,handleCallReturnReAppraise)
  yield takeEvery(callApprovalReturnControlHQ.type,handleCallReturnControlHQ)

}
