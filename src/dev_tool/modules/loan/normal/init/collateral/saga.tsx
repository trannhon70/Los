import { call, put, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify } from "features/app/store/slice";
import { fetchDataUpdateAPIStorageCollateralType } from "features/loan/normal/storage/collateralV2/actions";
import { saveCollaterals, saveCollateralsGOODS } from "features/loan/normal/storage/collateralV2/api";
import { getLOANNormalStorageCollateralsSave } from "features/loan/normal/storage/collateralV2/selector";
import { select } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ICollateralFormGet, ILOANNormalCollateralV2State } from "types/models/loan/normal/storage/CollaretalV2";
import { IMasterData } from "types/models/master-data";
import { postCollateralsAutoFill } from "./action";


function* handleSaveCollateralsAutoFill(action: PayloadAction<string>) {
  try {
    const params: [
      ILOANNormalCollateralV2State,
      string,
      string,
      string,
      IMasterData
    ] = yield select(getLOANNormalStorageCollateralsSave);
  
    if(action.payload !== "REST"){
        const res: IApiResponse<ICollateralFormGet> = yield call(saveCollateralsGOODS, ...params, action.payload);
        if (res.success) {
          if (res.data) {
            yield put(
              notify(res.data.valuation_id ? "Đã lưu thành công MCT: " + res.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                res.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
          }
          yield put(closeAppBackdrop());
        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(res.errors[0].detail, { options: { variant: "error" } })
          );
        }
        
        const r: IApiResponse<ICollateralFormGet> = yield call(saveCollaterals, ...params, action.payload);
        if (r.success) {
          if (r.data) {
            yield put(
              notify(r.data.valuation_id ? "Đã lưu thành công MCT: " + r.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                r.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
          }
          yield put(closeAppBackdrop());
        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(r.errors[0].detail + r.errors[0].loc, {
              options: { variant: "error" },
            })
          );
        }
      }
  } catch (e) {
    console.log(e)
    yield put(closeAppBackdrop());
  } finally {
    yield put(closeAppBackdrop());
  }
}


export default function* devToolLOANNormalCollateralSaga() {
  yield takeEvery(postCollateralsAutoFill.type, handleSaveCollateralsAutoFill);
}