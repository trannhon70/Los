import { call, put, takeEvery, takeLeading } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, showAppBackdrop } from "features/app/store/slice";
import { fetchListDataHistoryLogs } from "features/loan/normal/storage/historyLogs/action";
import { syncDataIncomeAfterSave } from "features/loan/normal/storage/income/action";
import { getlistPersonUUID, getLOANNormalStorageINCOMESave } from "features/loan/normal/storage/income/selector";
import { getLOANNormalLOSuuid } from "features/loan/normal/storage/selectors";
import { select } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { ILOANNormalFullState } from "types/models/loan/normal/storage";
import { ILOANNormalStorageIncomeState } from "types/models/loan/normal/storage/Income";
import { ILOANNormalStorageLegalState } from "types/models/loan/normal/storage/Legal";
import { ILOANNormalStorageLOANState } from "types/models/loan/normal/storage/LOAN";
import { IMasterData } from "types/models/master-data";
import { saveINCOMEAssrentRent, saveINCOMEBusiness, saveINCOMECompany, saveINCOMEDeposit, saveINCOMEOther, saveINCOMEPension, saveINCOMESalary, saveINCOMEStock } from "./api";
import {
  AUTO_ALL_INCOME, __start_auto_fill_legal
} from "./slice";

function* __start() {

}

function* handleSaveIncomeAutoFill(action: PayloadAction<string,string,string>) {
  try {
    let params: [
      ILOANNormalStorageIncomeState,
      ILOANNormalStorageLOANState,
      ILOANNormalStorageLegalState,
      ILOANNormalFullState,
      ILOANNormalConfigState,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageINCOMESave);
    params = yield select(getLOANNormalStorageINCOMESave);
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    yield put(showAppBackdrop());
    const list_person:string[] = yield select(getlistPersonUUID);

    for(let i=0;i<list_person.length;i++){
      const rSal: IApiResponse<unknown> = yield call(saveINCOMESalary, ...params, "salary",list_person[i]);
      const rAss: IApiResponse<unknown> = yield call(saveINCOMEAssrentRent, ...params, "assetRent",list_person[i]);
      const rBus: IApiResponse<unknown> = yield call(saveINCOMEBusiness, ...params, "business",list_person[i]);
      const rCom: IApiResponse<unknown> = yield call(saveINCOMECompany, ...params, "company",list_person[i]);
      const rSto: IApiResponse<unknown> = yield call(saveINCOMEStock, ...params, "stock",list_person[i]);
      const rDep: IApiResponse<unknown> = yield call(saveINCOMEDeposit, ...params, "deposit",list_person[i]);
      const rPen: IApiResponse<unknown> = yield call(saveINCOMEPension, ...params, "pension",list_person[i]);
      const rOther: IApiResponse<unknown> = yield call(saveINCOMEOther, ...params, "other",list_person[i]);
      if(rSal.success){
        yield put(fetchListDataHistoryLogs(los_uuid));
        yield put(syncDataIncomeAfterSave("salary",{data:rSal.data}));
        if(rAss.success){
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave("assetRent",{data:rSal.data}));
          if(rBus.success){
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave("business",{data:rSal.data}));
            if(rCom.success){
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave("company",{data:rSal.data}));
              if(rSto.success){
                yield put(fetchListDataHistoryLogs(los_uuid));
                yield put(syncDataIncomeAfterSave("stock",{data:rSal.data}));
                if(rDep.success){
                  yield put(fetchListDataHistoryLogs(los_uuid));
                  yield put(syncDataIncomeAfterSave("deposit",{data:rSal.data}));
                  if(rPen.success){
                    yield put(fetchListDataHistoryLogs(los_uuid));
                    yield put(syncDataIncomeAfterSave("pension",{data:rSal.data}));
                    if(rOther.success){
                      yield put(fetchListDataHistoryLogs(los_uuid));
                      yield put(syncDataIncomeAfterSave("other",{data:rSal.data}));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    yield put(closeAppBackdrop());
} catch (error) {
  console.log(error)
  yield put(closeAppBackdrop());
}
}


export default function* devToolLOANNormalINCOMESaga() {
  yield takeLeading(__start_auto_fill_legal.type, __start);
  yield takeEvery(AUTO_ALL_INCOME.type, handleSaveIncomeAutoFill);
}