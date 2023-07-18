import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, setAppNavigate } from "features/app/store/slice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { ILOANCardState } from "types/models/loan/card";
import { ILOANCardProductForm } from "types/models/loan/card/configs/Product";
import { ILOANCardData } from "types/models/loan/card/storage";
import { fetchDataFullProductCardDone, saveLOANCardProduct, setDataLOSUUID, setLOANCardProductData, updateStorageDataCard } from "./action";
import { fetchProductData, saveProductCard } from "./api";
import { getLOANCard } from "./selector";

function* handleSaveProductCard(action: PayloadAction<boolean>){
  const storage: ILOANCardState = yield select(getLOANCard);
  const r: IApiResponse<ILOANCardData> = yield call(saveProductCard , storage);

  if (r.success){
    yield put(notify('Khởi tạo hồ sơ vay thẻ thành công', { options: { variant: 'success' } }));
    yield put(closeAppBackdrop());

    const los_uuid = r.data?.form.los_info.los_uuid
    const tab = action.payload ? 'legal-card/card-holder' : 'product-card';
    yield put(setAppNavigate(`/loan/card/init/${ los_uuid }/${ tab }`));
    yield put(setDataLOSUUID(r.data?.form.los_info.los_uuid ?? ''));
    yield put(updateStorageDataCard(r.data as ILOANCardData));


    // yield put(setStorageProductCardData(r.data as ILOANCardData));
    // yield put(fetchDataProductCardDone(""));
  }

  // const storage: ILOANNormalState = yield select(getLOANNormal);
  // const data = storage.storage.full?.data
  // if(data?.form?.los_info?.los_uuid){
  //   yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
  //   yield put(closeAppBackdrop());
  //   const los_uuid = data.form.los_info.los_uuid;
  //   const tab = action.payload ? 'legal/borrower' : 'product';
  //   yield put(setAppNavigate(`/loan/normal/init/${ los_uuid }/${ tab }`));
  //   yield put(setLOANNormalStorageData(data as ILOANNormalData));
  //   yield put(fetchLOANNormalDataDone());
  // }else{
  //   const r: IApiResponse<ILOANNormalData> = yield call(saveProduct, storage);
  //   if (r.success){
  //     yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
  //     yield put(closeAppBackdrop());
  //     const los_uuid = r.data?.form.los_info.los_uuid;
  //     const tab = action.payload ? 'legal/borrower' : 'product';
  //     yield put(setAppNavigate(`/loan/normal/init/${ los_uuid }/${ tab }`));
  //     yield put(setLOANNormalStorageData(r.data as ILOANNormalData));
  //     yield put(fetchLOANNormalDataDone());
  //   }else{
  //     yield put(closeAppBackdrop());
  //     yield put(notify('Khởi tạo hồ sơ không thành công', { options: { variant: 'error' } }));
  //   }
  // }

}

function* handleFetchProductData(action: PayloadAction<string>){
  try{
    const r: IApiResponse<ILOANCardProductForm> = yield call(fetchProductData, action.payload);
    yield put(setLOANCardProductData(r.data as ILOANCardProductForm));
  }
  catch(e){
    yield put(setLOANCardProductData(null));
  }
}

export default function* storageProductSagaCard(){
  yield takeEvery(saveLOANCardProduct.type, handleSaveProductCard);
  yield takeEvery(fetchDataFullProductCardDone.type, handleFetchProductData);
}