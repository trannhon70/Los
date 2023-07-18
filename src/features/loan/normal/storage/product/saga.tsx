import { call, put, select, takeEvery } from "redux-saga/effects";
import { getLOANNormal } from "./selectors";
import { ILOANNormalState } from "types/models/loan/normal";
import { IApiResponse } from "types/api";
import { ILOANNormalData } from "types/models/loan/normal/storage";
import { saveProduct } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, setAppNavigate } from "features/app/store/slice";
import { fetchLOANNormalDataDone } from "features/loan/normal/configs/actions";
 import { fetchDataGuideState, saveLOANNormalProduct, setLOANNormalStorageData } from 'features/loan/normal'
import { clearGuide } from "../../storageGuide/action";
// import { ETypeButtonBarRole } from "../../storageControl/case";

function* handleSaveProduct(action: PayloadAction<boolean>) {
  const storage: ILOANNormalState = yield select(getLOANNormal);
  const data = storage.storage.full?.data
  if (data?.form?.los_info?.los_uuid) {
    yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
    yield put(closeAppBackdrop());
    const los_uuid = data.form.los_info.los_uuid;
    const tab = action.payload ? 'legal/borrower' : 'product';
    if(action.payload){
      yield put(clearGuide())
    } 
    yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/${tab}`));
    yield put(setLOANNormalStorageData(data as ILOANNormalData));
    yield put(fetchLOANNormalDataDone());
    // yield put(fetchDataGuideState({ los_uuid: los_uuid, position: ETypeButtonBarRole.PRODUCT_GROUP }));  //
  } else {
    const r: IApiResponse<ILOANNormalData> = yield call(saveProduct, storage);
    if (r.success) {
      yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(closeAppBackdrop());
      const los_uuid = r.data?.form.los_info.los_uuid;
      if(action.payload){
        yield put(clearGuide())
      } 
      const tab = action.payload ? 'legal/borrower' : 'product';
      yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/${tab}`));
      yield put(setLOANNormalStorageData(r.data as ILOANNormalData));
      yield put(fetchLOANNormalDataDone());
      // yield put(fetchDataGuideState({ los_uuid: los_uuid ?? "", position: ETypeButtonBarRole.PRODUCT_GROUP }));  //
    } else {
      yield put(closeAppBackdrop());
      yield put(notify('Khởi tạo hồ sơ không thành công', { options: { variant: 'error' } }));
    }
  }
}

export default function* storageProductSaga() {
  yield takeEvery(saveLOANNormalProduct.type, handleSaveProduct);
}