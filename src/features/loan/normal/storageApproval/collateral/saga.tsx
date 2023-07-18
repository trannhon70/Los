
import { PayloadAction } from "@reduxjs/toolkit";
import { select, takeEvery, call, put } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IDataCollateral, IDataPostCollateralS2, ILOANNormalApprovalCollateralV2State } from "types/models/loan/normal/storageApproval/Collateral";
import { IMasterData } from "types/models/master-data";
import { deleteLOCALSpreadSheetCollateralApproval, deleteSpreadSheetCollateralApproval, postCollateralsApproval,postCollateralsApprovalLVT, setCollateralApproveValidate, updateDataLogs } from "./actions";
import { saveCollateralApprovalLVT,saveCollateralApproval, deleteSpreadSheetCollateralApprovalApi } from "./api";
import { getChangeAppraiseResult, getLOANNormalStorageCollateralsSave, validateCollateralApproval, validateCollateralApprovalSpreadsheet } from "./selector";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import { IApprovalValidate } from "types/models/loan/normal/storageApproval/LoanInfoForm";
import { PREFIX_LOCAL } from "utils";

function* handleSaveCollateralsApprovalLVT(action: PayloadAction<string>) {
  try {
    const params: [
      ILOANNormalApprovalCollateralV2State,
      string,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageCollateralsSave);

    const validate: IApprovalValidate = yield select(validateCollateralApprovalSpreadsheet);
    yield put(showAppBackdrop());

    if (!validate.valid){
      yield put(setCollateralApproveValidate(validate));
      yield put(closeAppBackdrop());
    }else{
      yield put(setCollateralApproveValidate(validate));
      const res: IApiResponse<unknown> = yield call(saveCollateralApprovalLVT, ...params, action.payload);
      if (res.success) {
        if(action.payload !== "DELETE"){
          yield put(notify('Lưu LVT thành công ', { options: { variant: 'success' } }));
        }
        else {
          yield put(notify('Xóa thành công ', { options: { variant: 'success' } }));
        }
        yield put(updateDataLogs(res.data as IDataCollateral));
        yield put(closeAppBackdrop());
      } else {
        yield put(notify('Lưu LVT thất bại', { options: { variant: 'error' } }));
        yield put(closeAppBackdrop());
      }
    }
  
  }
  catch (e) {

  }
  finally{
    yield put(closeAppBackdrop());
  }

}

function* handleSaveCollateralsApproval(action: PayloadAction<string>) {
  try {
    const params: [
      ILOANNormalApprovalCollateralV2State,
      string,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageCollateralsSave);

    const validate: IApprovalValidate = yield select(validateCollateralApproval);
    yield put(showAppBackdrop());

    if(!validate.valid){
      yield put(setCollateralApproveValidate(validate));
      yield put(closeAppBackdrop());
    }
    else{
      yield put(setCollateralApproveValidate(validate));
      const dataPost: IDataPostCollateralS2[] = yield select(getChangeAppraiseResult)
      
      yield* dataPost.map(function* (collateral) {
        const res: IApiResponse<unknown> = yield call(saveCollateralApproval, params[1], collateral);
      })
      yield put(notify('Xử lý thẩm định thành công ', { options: { variant: 'success' } }));
      yield put(closeAppBackdrop());
    
    //   if (res.success) {
    //   } else {
    //     yield put(notify('Xử lý thẩm định thất bại', { options: { variant: 'error' } }));
    //     yield put(closeAppBackdrop());
    //   }
    }
  }
  catch (e) {
    yield put(notify('Xử lý thẩm định thất bại', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }

}

function* handleDeleteSpreadSheetCollateralApproval(action: PayloadAction<string>) {
  try {
    const params: [
      ILOANNormalApprovalCollateralV2State,
      string,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageCollateralsSave);

    yield put(showAppBackdrop());
    if(action.payload.includes(PREFIX_LOCAL)){
      yield put(deleteLOCALSpreadSheetCollateralApproval(action.payload))
      yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
    }
    else {
      const res: IApiResponse<unknown> = yield call(deleteSpreadSheetCollateralApprovalApi, params[1], action.payload);
      if(res.success){
        yield put(deleteLOCALSpreadSheetCollateralApproval(action.payload))
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify('Xóa thất bại', { options: { variant: 'error' } }));
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
export default function* storageCollateralApprovalSaga() {
  yield takeEvery(postCollateralsApprovalLVT.type, handleSaveCollateralsApprovalLVT);
  yield takeEvery(postCollateralsApproval.type,handleSaveCollateralsApproval)
  yield takeEvery(deleteSpreadSheetCollateralApproval.type,handleDeleteSpreadSheetCollateralApproval)
  
  // yield takeEvery(updateCollaterals.type,handleUpdateCollaterals)
  // yield takeEvery(fetchListCollateral.type,handleFetchListCollateralSaga)
}