import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify } from "features/app/store/slice";
import { call, select,put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IResultInternalCreditRating } from "types/models/loan/normal/storageApproval/InternalCreditRating";
import { getLOANNormalLOSId } from "../../storage/selectors";
import { saveLOANApprovalICR } from "./actions";
import { ApiPostApprovalICR } from "./api";
import { getStorageApprovalICR } from "./selector";

function* handleUpdateLoanApprovalICR(action: PayloadAction<string>){
    try {
        const fullIcr:IResultInternalCreditRating = yield select(getStorageApprovalICR)
        const los_id:string = yield select(getLOANNormalLOSId)
        // if(fullIcr.approval_level||fullIcr.business_employee||fullIcr.risk_management){
        //     yield put(notify('Đã xếp hạng', { options: { variant: 'warning' } }));
        // }
        // else{
            const response: IApiResponse<unknown> = yield call(ApiPostApprovalICR,fullIcr,los_id);
            if (response.success){
                
                // yield put(updateDataLOANNormalICR(response.data as ILOANNormalStorageICRDataResponse))
                yield put(notify('Xếp hạng thành công', { options: { variant: 'success' } }));
            }
            else{
                yield put(notify(response.errors[0].detail, { options: { variant: 'error' } }));
            }
            yield put(closeAppBackdrop());
        // }
       
    } catch (error) {
        yield put(closeAppBackdrop());

        yield put(notify('Cập nhật XHTDNB thất bại', { options: { variant: 'error' } }));
    }
    finally{
        yield put(closeAppBackdrop());
      }
}


export default function* storageICRApprovalSaga(){
   yield takeEvery(saveLOANApprovalICR.type, handleUpdateLoanApprovalICR);
}
