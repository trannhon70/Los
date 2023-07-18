import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, put, select, call } from "redux-saga/effects";
import { existLOANApprovalData, shouldFetchLOANApprovalData } from './selectors';
import { startFetchLOANApprovalData, fetchLOANApprovalDataDone, fetchLOANApprovalData, setLOANApprovalStorageData, fetchApprovalFullDocument, fetchApprovalSourceIncome } from "features/loan/normal";
import { IApiResponse } from 'types';
import { fetchApprovalData, fetchApprovalDataDocument, fetchApprovalInCome } from "./api";
import { ILOANApprovalData } from "types/models/loan/normal/storageApproval";
import { updateAPIStorageGetIncomeApproval} from "./income/action";
import { updateApiStorageApprovalICR } from "./icr/actions";
import { getInfoFromLegalToCIC, updateAPIStorageApprovalCIC } from "./cic/actions";
import { ISourceIncomeForm } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { updateLOANApprovalStorage } from "./loan/action";
import { getLOANNormalLOSId } from "../storage/selectors";
import { notify } from "features/app/store/slice";
import { updateCollateralApprovalStorage } from "./collateral/actions";
import { updateAPIApprovalAdditional } from "./additionalApproval/actions";
import { updateOtherApprovalStorage } from "./Other/actions";
import { updateDedupeBlackListAproval } from "./dedupe/actions";
export interface IInterfaceLosID{
    los_id:string;
    los_uuid:string;
}
// fetch api get data s1
function* handleFetchApprovalData(action: PayloadAction<IInterfaceLosID>) {
    try {
        const los_id: string = yield select(getLOANNormalLOSId)
        // const data:ILOANApprovalData = yield select(existLOANApprovalData)
        const shouldFetch: boolean = yield select(shouldFetchLOANApprovalData);
        if (!shouldFetch) return;
        yield put(startFetchLOANApprovalData());
        
        const r: IApiResponse<ILOANApprovalData> = yield call(fetchApprovalData,action.payload.los_id, action.payload.los_uuid);
        // yield put(fetchLOANApprovalDataDone());
        if (r.success) {
            yield put(fetchApprovalFullDocument(los_id))
            if(r.data){
                yield put(setLOANApprovalStorageData(r.data));
            }

            // call api post document
            // if(r.data?.form.source_income_form){
            //     yield put(updateAPIStorageGetIncomeApproval(r.data?.form.source_income_form, r.data?.form.los_info.los_uuid));
            // }
            // if (r.data?.form.cic_form) {
            //     yield put(updateAPIStorageApprovalCIC(r.data?.form.cic_form, r.data?.form.los_info.los_uuid));
            // }
            // if(r.data?.form.internal_credit_rating?.result_internal_credit_rating){
            //     yield put(updateApiStorageApprovalICR(r.data?.form.internal_credit_rating.result_internal_credit_rating))
            // }
            // if(r.data?.form.loan_info_form){
            //     yield put(updateApprovalStorage(r.data?.form.loan_info_form))
            // }

            // if(r.data?.form.)

        }else{
            yield put(notify(
                "Hồ sơ chưa được trình. Vui lòng kiểm tra lại",
                { options: { variant: 'error' } }
            ));
        }

    }
    catch (e) {
        console.log(e);
        // yield put(setLOANNormalStorageData(null));
    }
}
function* handleFetchApprovalDataDocument(action: PayloadAction<string>) {
    try {        
        const r: IApiResponse<ILOANApprovalData> = yield call(fetchApprovalDataDocument, action.payload);
        yield put(setLOANApprovalStorageData(r.data));
        // yield put(fetchApprovalFullDocumentDone());
        if (r.success) {
            yield put(getInfoFromLegalToCIC());
            // check them save tab nao thi update tab do
            if(r.data?.form.source_income_form){
                yield put(updateAPIStorageGetIncomeApproval(r.data?.form.source_income_form, r.data?.form.los_info.los_uuid));
            }
            if (r.data?.form.cic_form) {
                yield put(updateAPIStorageApprovalCIC(r.data?.form.cic_form, r.data?.form.los_info.los_uuid));
            }
            if(r.data?.form.internal_credit_rating?.result_internal_credit_rating){
                yield put(updateApiStorageApprovalICR(r.data?.form.internal_credit_rating))
            }
            if(r.data?.form?.loan_info_form){
                yield put(updateLOANApprovalStorage(r.data?.form.loan_info_form))
            }
            if(r.data?.form?.collateral_form){
                yield put(updateCollateralApprovalStorage(r.data?.form.collateral_form.data))
            }
            if(r.data?.form?.additional_appraisal){
                yield put(updateAPIApprovalAdditional(r.data?.form.additional_appraisal, r.data?.form.los_info.los_uuid));
            }
            if(r.data?.form.other_profile){
                yield put(updateOtherApprovalStorage(r.data?.form.other_profile))
            }
            if(r.data?.form.dedupe_blacklist) {
                yield put(updateDedupeBlackListAproval(r.data?.form.dedupe_blacklist))
            }
        }else{
            yield put(notify(
                "Hồ sơ chưa được trình. Vui lòng kiểm tra lại",
                { options: { variant: 'error' } }
            ));
        }
    }
    catch(e){
        console.log(e);
    }
}
function* handleFetchApprovalSourceIncome(action: PayloadAction<string>){
    try {
    const r: IApiResponse<ISourceIncomeForm> = yield call(fetchApprovalInCome, action.payload); 
    if(r.success){
        //call api getData Approval S2
          if(r.data){
            yield put(updateAPIStorageGetIncomeApproval(r.data, action.payload));
        }
    }
    } catch (error) {
        
    }
}
export default function* storageApprovalSaga() {
    yield takeEvery(fetchLOANApprovalData.type, handleFetchApprovalData);
    yield takeEvery(fetchApprovalFullDocument.type, handleFetchApprovalDataDocument);
    yield takeEvery(fetchApprovalSourceIncome.type, handleFetchApprovalSourceIncome);

}

