import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { getLOANNormalStorageCollateralSave, validateLOANNormalStorageCollateral } from "./selector";
import { saveCollaterals } from "./api";
import { closeAppBackdrop, notify, setAppNavigate } from "features/app/store/slice";
import { IMasterData } from "types/models/master-data";
import {  ICollateralAPIState, ILOANNormalStorageCollateralState, ILOANNormalStorageCollateralValidate } from "types/models/loan/normal/storage/Collateral";
import { saveCollateral, setLOANNormalStorageCollateralValidate, updateLOANNormalStorageCollateralAPI } from "./action";
// import { ILOANNormalState } from "types/models/loan/normal";
// import { legalGetLOANNormal } from "../legal/selectors";



function* handleSaveCollateral(action: PayloadAction<boolean>) {
  try{
    // const LOANNormal: ILOANNormalState = yield select(legalGetLOANNormal);
    const los_uuid = '' //LOANNormal.storage.full.data?.form.los_info.los_uuid;
    yield put(setLOANNormalStorageCollateralValidate({ valid: true}));
    const validate:ILOANNormalStorageCollateralValidate = yield select(validateLOANNormalStorageCollateral(0));
    if(validate.valid){

      const params: [
        ILOANNormalStorageCollateralState,
        string,
        IMasterData
      ] = yield select(getLOANNormalStorageCollateralSave);

      console.log('params==>', params);

      const r: IApiResponse<ICollateralAPIState> & {
        body: ILOANNormalStorageCollateralState
      } = yield call(saveCollaterals, ...params,);


      if (r.success) {
        yield put(updateLOANNormalStorageCollateralAPI(r.data as ICollateralAPIState));
        yield put(notify('Khởi tạo hồ sơ thành công', { options: { variant: 'success' } }));
        if (action.payload){
          yield put(setAppNavigate(`/loan/normal/init/${ los_uuid }/collateral`));
        }
      } else {
        yield put(closeAppBackdrop());
      }
    } else {
      yield put(setLOANNormalStorageCollateralValidate(validate));
      if(validate.role === 'apartment'){
        yield put(notify(
          'Vui lòng nhập thông tin Nhà/Căn hộ chung cư',
          { options: { variant: 'error' } }
        ));
      }else{
        yield put(notify(
          'Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.',
          { options: { variant: 'error' } }
        ));
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    yield put(closeAppBackdrop());
  }

  yield put(closeAppBackdrop());
}

export default function* storageCollateralSaga() {
  yield takeEvery(saveCollateral.type, handleSaveCollateral);
}