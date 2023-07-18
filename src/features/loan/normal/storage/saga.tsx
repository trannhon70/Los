import { call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse } from "types";
import { ILOANNormalData, IIncomeSourceData } from "types/models/loan/normal/storage";
import { fetchData, fetchDataBalanceAbility } from "./api";
//import { updateLOANNormalStorageLegalAPI } from "features/loan/normal/storage/legal/actions";
import { shouldFetchLOANNormalData } from "./selectors";
import {
  fetchLOANNormalData,
  fetchLOANNormalDataBalanceAbility,
  fetchLOANNormalDataDone
} from "features/loan/normal/configs/actions";
import { setLOANNormalStorageData, startFetchLOANNormalData } from "features/loan/normal";
// import { findAllLocationCodeFromLegalData } from "views/pages/LOAN/utils";
// import { registerMasterData } from "features/master-data/actions";
// import { updateAPIStorageCIC } from "./cic/actions";
import { updateAPIStorageLOANProductAPI, updateAPIStorageLOANNeededPlan, updateAPIStorageLOANBusinessLegal, updateAPIStorageLOANFinance } from "./loan/actions";
// import { ICollateralAPIState } from "types/models/loan/normal/storage/Collateral";
import { updateAPIStorageOtherException, updateAPIStorageOtherRisk } from "./other/action";
import { updateAPIStorageCollateralType } from "./collateralV2/actions";
import { updateDataLOANNormalICR } from "./icr/actions";
import { fetchDeclareIncomeDataWithLegal, updateApiGetIncome , updateDataIncomeBalanceAbility} from "./income/action";
import { updateLegalFullData } from "./legal/actions";
import { mapIdentityToCIC, updateAPIStorageCIC } from "./cic/actions";
import { notify } from "features/app/store/slice";


function* handleFetchData(action: PayloadAction<string>) {
  try {
    const shouldFetch: boolean = yield select(shouldFetchLOANNormalData);
    if (!shouldFetch) return;

    yield put(startFetchLOANNormalData());

    const r: IApiResponse<ILOANNormalData> = yield call(fetchData, action.payload);
    // const resCollateral: IApiResponse<ICollateralAPIState> = yield call(fetchDataCollateral, action.payload);
    yield put(setLOANNormalStorageData(r.data));
    yield put(fetchLOANNormalDataDone());

    if (r.success) {

      // if (r.data?.form.legal_info_form) {
      //   console.log(r.data,'r.data');
      //   const allCodes = findAllLocationCodeFromLegalData(r?.data?.form?.legal_info_form);
      //   yield* allCodes.country.filter(c => c).map(function* (c) {
      //     yield put(registerMasterData('province', { param: c }))
      //   });
      //   yield* allCodes.province.filter(p => p).map(function* (p) {
      //     yield put(registerMasterData('district', { param: p }))
      //   });
      //   yield* allCodes.district.filter(d => d).map(function* (d) {
      //     yield put(registerMasterData('ward', { param: d }));
      //   });
      //   yield put(updateLOANNormalStorageLegalAPI(r.data.form.legal_info_form, r.data.form.los_info.los_uuid));
      // }
      // if (r.data?.form.cic_form) {

      //   yield put(updateAPIStorageCIC(r.data.form.cic_form, r.data.form.los_info.los_uuid));
      // }
      // if (r.data?.form.loan_info_form.) { // check legal person_uui
      //   yield put(updateAPIStorageLOANProductAPI(r.data?.form.loan_info_form.product_loan_program_info, r.data.form.los_info.los_uuid));
      // }
      // update du lieu len UI khi load lai trang

      if(r.data?.form.legal_info_form){
        yield put(updateLegalFullData(r.data?.form.legal_info_form, r.data.form.los_info.los_uuid));
        yield put(mapIdentityToCIC(r.data?.form.legal_info_form))
      }
      if (r.data?.form.cic_form) {
        yield put(updateAPIStorageCIC(r.data?.form.cic_form, r.data?.form.los_info.los_uuid));
      }

      if (r.data?.form.loan_info_form.product_loan_program_info) {
        yield put(updateAPIStorageLOANProductAPI(r.data?.form.loan_info_form.product_loan_program_info, r.data.form.los_info.los_uuid));
      }
      if (r.data?.form.loan_info_form.capital_need_loan_plan_info) {
        yield put(updateAPIStorageLOANNeededPlan(r.data?.form.loan_info_form.capital_need_loan_plan_info, r.data.form.los_info.los_uuid))
      }
      if (r.data?.form.loan_info_form.operation_business.business_household_info) {
        yield put(updateAPIStorageLOANBusinessLegal(r.data?.form.loan_info_form.operation_business.business_household_info, r.data.form.los_info.los_uuid))
      }

      if (r.data?.form.loan_info_form.operation_business.financial_analysis_info) {
        yield put(updateAPIStorageLOANFinance(r.data?.form.loan_info_form.operation_business.financial_analysis_info, r.data.form.los_info.los_uuid))
      }
      if(r.data?.form.other_profile.data.exception_list){
        yield put(updateAPIStorageOtherException(r.data?.form.other_profile.data, r.data.form.los_info.los_uuid))
      }
      if(r.data?.form.other_profile.data.analysis_measures_risk_info){
        yield put(updateAPIStorageOtherRisk(r.data?.form.other_profile.data.analysis_measures_risk_info, r.data.form.los_info.los_uuid))
      }
      if(r.data?.form.collateral_form.data.collaterals){
        yield put(updateAPIStorageCollateralType(r.data?.form.collateral_form))
      }
      if(r.data?.form.internal_credit_rating.data){
        yield put(updateDataLOANNormalICR(r.data?.form.internal_credit_rating.data))
      }
      if (r.data?.form.source_income_form) {
        yield put(updateApiGetIncome(r.data?.form.source_income_form, r.data?.form.los_info.los_uuid));
        // yield put (computingDataBalance('',null));
      }

      yield put(fetchDeclareIncomeDataWithLegal('',null));
      // if(resCollateral.data?.)
      // {
      //   yield put(updateLOANNormalStorageCollateralAPI(resCollateral.data.form.collateral_form.data.collaterals));
      // }

    }
    else {
      yield put(notify('Tải thông tin hồ sơ thất bại', { options: { variant: 'error' } } ));
    }
  }
  catch (e) {
    console.log(e);
    yield put(notify('Tải thông tin hồ sơ thất bại', { options: { variant: 'error' } } ));
    // yield put(setLOANNormalStorageData(null));
    yield put(fetchLOANNormalDataDone());
  }
}

function* handleFetchDataBalanceAbility(action: PayloadAction<string>) {
  try {
    const r: IApiResponse<IIncomeSourceData> = yield call(fetchDataBalanceAbility, action.payload);
    if (r.success) {
      if(r.data) yield put(updateDataIncomeBalanceAbility(r.data,''));
    }
  } catch (error) {
    console.log(error);
  }
}


export default function* storageSaga() {
  yield takeEvery(fetchLOANNormalData.type, handleFetchData);
  yield takeEvery(fetchLOANNormalDataBalanceAbility.type, handleFetchDataBalanceAbility);

}