import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse } from "types";

import { fetchLOANCardData, fetchLOANCardDataDone } from "./action";
import { closeAppBackdrop, notify, setAppNavigate } from "features/app/store/slice";
import { ILOANCardState } from "types/models/loan/card";
import { getLOANCard } from "./products/selector";

function* handleFetchData(action: PayloadAction<string>) {
  try {

    const storage: ILOANCardState = yield select(getLOANCard);
    const data = storage.storage.full?.data
    if (data?.form?.los_info?.los_uuid) {
      yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
      yield put(closeAppBackdrop());
      const los_uuid = data.form.los_info.los_uuid;
      const tab = action.payload ? 'legal-card/card-holder' : 'product-card';
      yield put(setAppNavigate(`/loan/card/init/${los_uuid}/${tab}`));
      // yield put(setLOANNormalStorageData(data as ILOANNormalData));
      yield put(fetchLOANCardDataDone());
    }
    // else {
    //     const r: IApiResponse<ILOANNormalData> = yield call(saveProduct, storage);
    //     if (r.success){
    //       yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
    //       yield put(closeAppBackdrop());
    //       const los_uuid = r.data?.form.los_info.los_uuid;
    //       const tab = action.payload ? 'legal/borrower' : 'product';
    //       yield put(setAppNavigate(`/loan/normal/init/${ los_uuid }/${ tab }`));
    //       yield put(setLOANNormalStorageData(r.data as ILOANNormalData));
    //       yield put(fetchLOANNormalDataDone());
    //   } else {
    //     yield put(closeAppBackdrop());
    //     yield put(notify('Khởi tạo hồ sơ không thành công', { options: { variant: 'error' } }));
    //   }
    // }
  } catch (e) {
    console.log(e);
  }
  finally {
    yield put(closeAppBackdrop());
  }
}

export default function* storageSaga() {
  yield takeEvery(fetchLOANCardData.type, handleFetchData);
}