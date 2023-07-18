import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import {
  call,
  put,
  select,
  takeEvery,
  takeLeading
} from "redux-saga/effects";
import { IApiResponse, IError } from "types";
import { ICategoryProfile, IConditions, ICreditTerm, IFormsData, IPostRequestForms, ITemplateFile } from "types/models/loan/normal/storage/Forms";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getLOANNormalLOSId, getLOANNormalLOSuuid } from "../selectors";
import {
  deleteLOANNormalCreditTerm,
  deleteLOANNormalStorageCreditTerm, fetchLOANNormalFormCategoryProfile, fetchLOANNormalFormCategoryProfileDone, fetchLOANNormalFormsData, getInitialCreditTerm, getTemplateLOANNormal, getTemplateLOANNormalDone, postLOANNormalForm,
  postLOANNormalFormSuccess, saveLOANNormalStorageCreditTerm, setLOANNormalFormCategoryProfile, setStorageTemplateFile, updateCreditTermAfterSave, updateLOANNormalStorageCreditTerm, updateLOANNormalStorageFormsData
} from "./actions";
import {
  deleteCreditTerm, fetchCreditTerm, fetchFormsData,
  getFormCategoryProfile,
  getTemplate,
  IQueryParamsFormData, postCreditTerm, postFormsData,
  saveFormtoDatabase
} from "./api";

function* handleFetchFormsData(action: PayloadAction<IQueryParamsFormData>) {
  yield put(showAppBackdrop());
  try{
    const r: IApiResponse<IFormsData> = yield call(fetchFormsData, action.payload);
    if(r.success) {
      yield call(saveFormtoDatabase, action.payload, r.data?.fill_data_history_id ?? null);
      if (r.data) {
        yield put(updateLOANNormalStorageFormsData(r.data))
      }
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    console.log(e);
  }
  finally {
    yield put(closeAppBackdrop());
  }
}

function* hadnleGetInitialCreditTerm(action: PayloadAction<string>) {
  const los_id: string = yield select(getLOANNormalLOSId)
  try{
    const r: IApiResponse<ICreditTerm> = yield call(fetchCreditTerm, los_id);
    if(r.success) {
      if (r.data) {
        yield put(updateLOANNormalStorageCreditTerm(r.data))
      }
    }
  }
  catch(e) {
    console.log(e);
  }
}

function* handleFetchFormCategoryProfile() {
  try {
    const res: IApiResponse<ICategoryProfile> = yield call(getFormCategoryProfile);
    yield put(fetchLOANNormalFormCategoryProfileDone());
    if(res.success) {
      yield put(setLOANNormalFormCategoryProfile(res.data));
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    yield put(fetchLOANNormalFormCategoryProfileDone());
  }
  finally {
    yield put(closeAppBackdrop());
  }
}

function* handlePostFormsData(action: PayloadAction<IPostRequestForms>) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const res: IApiResponse<{
      fill_data_history_id: number,
      preview_file_url: string,
      errors: IError[]
    }> = yield call(postFormsData, action.payload);
    
    if(res.success) {
      yield put(postLOANNormalFormSuccess(res.data?.preview_file_url));
      yield put(closeAppBackdrop())
      yield put(notify('Áp dụng biểu mẫu thành công.', { options: { variant: 'success' } }));

      yield call(saveFormtoDatabase, {
        los_uuid: action.payload.los_uuid,
        // id?: string;
        template_type: action.payload.template_type,
        fill_data_history_id: action.payload.fill_data_history_id,
        template_uuid: action.payload.template_uuid,
        actived_flag: action.payload.actived_flag,
        approved_flag: action.payload.approved_flag 
      }, res.data?.fill_data_history_id ?? null);

      yield put(fetchListDataHistoryLogs(los_uuid));
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    yield put(notify('Áp dụng biểu mẫu không thành công!', { options: { variant: 'error' } }));
  }
  finally {
    yield put(closeAppBackdrop());
  }
}

function* handleSaveCreditTerm(action: PayloadAction<string, string, {data: IConditions, role: string}>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId);
   
    const res: IApiResponse<IConditions> = yield call(postCreditTerm, action.meta.data, action.meta.role, los_id);
    if(res.success) {
      if(res.data) {
        yield put(updateCreditTermAfterSave({conditions: res.data, role: action.meta.role}))
      }
      yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
    }
  }
  catch(e) {
    console.log(e)
  }
  finally {
    yield put(closeAppBackdrop());
  }
}

function* handleDeleteCreditTerm(action: PayloadAction<{
  role: string,
  conType: string,
  index: number,
  uuid: string
}>) {
  try {
    yield put(showAppBackdrop());
    const los_id: string = yield select(getLOANNormalLOSId);
    const res: IApiResponse<IConditions> = yield call(deleteCreditTerm, action.payload.uuid, los_id);
    
    if(res.success) {
      yield put(deleteLOANNormalStorageCreditTerm(action.payload)) 
      yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
    }
  }
  catch(e) {
    yield put(closeAppBackdrop());
    yield put(notify('Xóa thất bại', { options: { variant: 'error' } }));
  }
  finally {
    yield put(closeAppBackdrop());
  }
}


function* handleFetchTemplate(action: PayloadAction<string>) {
  try{
    const r: IApiResponse<ITemplateFile> = yield call(getTemplate, action.payload);
    const los_uuid: string = yield select(getLOANNormalLOSuuid);

    yield put(getTemplateLOANNormalDone())

    if (r.data) {
      yield put(setStorageTemplateFile(r.data))
      yield put(showAppBackdrop())
      yield put(fetchLOANNormalFormsData(
        {
          los_uuid: los_uuid,
          template_type: r.data.folder[0].children[0].template_code,
          template_uuid: r.data.folder[0].children[0].id,
          actived_flag: r.data.folder[0].children[0].actived_flag,
          approved_flag: r.data.folder[0].children[0].approved_flag,
          fill_data_history_id: r.data.folder[0].children[0].fill_data_history_id
        } as IQueryParamsFormData))
    }
    yield put(closeAppBackdrop())

  }
  catch(e) {
    yield put(getTemplateLOANNormalDone())
    console.log(e);
  }  
  finally {
    yield put(closeAppBackdrop());
  }
}

export default function* storageFormsSaga() {
  // yield takeEvery(saveLOANNormalCIC.type, handleSaveLegal);
  yield takeLeading(fetchLOANNormalFormsData.type, handleFetchFormsData);
  yield takeEvery(fetchLOANNormalFormCategoryProfile.type, handleFetchFormCategoryProfile);
  yield takeEvery(postLOANNormalForm.type, handlePostFormsData);
  yield takeEvery(getTemplateLOANNormal.type, handleFetchTemplate);
  yield takeEvery(getInitialCreditTerm.type, hadnleGetInitialCreditTerm);
  yield takeEvery(saveLOANNormalStorageCreditTerm.type, handleSaveCreditTerm);
  yield takeEvery(deleteLOANNormalCreditTerm.type, handleDeleteCreditTerm);
  
}
