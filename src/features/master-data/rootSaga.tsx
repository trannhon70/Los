import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types/api";
import { TMasterSplitData } from "types/models/master-data";
import { IMasterData, TMasterDataProp } from "types/models/master-data/state";
import { apiMasterData } from "./api";
import { config } from "./config";
import { getFetchCondition, getMasterData, registerMounted } from "./selectors";
import {
  registerMasterData,
  registerMasterDataDone,
  registerMasterDataFetching,
  registerMasterDataMounted,
  registerMasterDataPassedFetch
} from "./actions";
import { measure } from "utils";

function* handleStarted<T extends TMasterDataProp>(action: PayloadAction<T, string, string>){
  try{
    const r: IApiResponse<TMasterSplitData<T>[]> = yield call(
      apiMasterData, 
      config[action.payload]?.path as string, 
      action.meta
    );
    yield put(registerMasterDataDone(r.data ?? [], { name: action.payload, code: action.meta?.toString() ?? '' }))
  }
  catch(e){
    
  }

}

function* handleFetching(action: PayloadAction<TMasterDataProp, string, string>){
  const shouldFetch: boolean = yield select(getFetchCondition(action.payload, action.meta));
  if (!shouldFetch) return;
  yield put(registerMasterDataPassedFetch(action.payload, action.meta));
}

function* handleRegister(action: PayloadAction<TMasterDataProp | '@all', string, { param?: string, exclude?: (keyof IMasterData)[] }>){
  try{
    if (action.payload === '@all'){
      const mounted: boolean = yield select(registerMounted);
      if (mounted) return;

      measure.exec('MASTER_DATA_START_FETCH_ALL')

      yield put(registerMasterDataMounted());
      const MasterData: IMasterData = yield select(getMasterData);

      yield* Object.keys(MasterData).map(function*(name){
        if (name !== 'register' && (!action.meta.exclude || action.meta.exclude.indexOf(name as TMasterDataProp) === -1)){
          yield put(registerMasterDataFetching(name as TMasterDataProp, action.meta.param ?? ''))
        }
      });
      measure.execEnd('MASTER_DATA_START_FETCH_ALL')
    }
    else{
      yield put(registerMasterDataFetching(action.payload, action.meta.param ?? ''))
    }
  }
  catch(e){}
}

export default function* rootMasterDataSaga(){
  yield takeEvery(registerMasterData.type, handleRegister);
  yield takeEvery(registerMasterDataFetching.type, handleFetching);
  yield takeEvery(registerMasterDataPassedFetch.type, handleStarted);
}