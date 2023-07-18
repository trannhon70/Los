import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeEvery, select, put } from 'redux-saga/effects';
import { IApiResponse } from 'types';
import { IApprovalLOANBussinessActivities, IApprovalLOANCapitalNeedFull, IApprovalLOANState, IApprovalValidate, ILOANMethod, ILoanProduct, ILoanProgram, IProductLoanProgram } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import { getLOANNormalLOSId } from '../../storage/selectors';
import { saveApprovalLOAN, setLoanApprovalValidate, updateStoreFullLoanApprovalLoanMethod, updateStoreFullLoanApprovalNeedPlan, updateStoreFullLoanApprovalProBus, updateStoreFullLoanApprovalProduct } from './action';
import { getLOANApprovalProduct, getLOANApprovalSourceBorrowerUuid } from 'features/loan/normal/storageApproval/selectors';
import { getApprovalLOANProgram, getApprovalStorage, getLOANApprovalProductionAndBusiness, validateLOANApproval } from './selectors';
import { fetchApprovalFullDocument } from 'features/loan/normal';
import { closeAppBackdrop, notify } from 'features/app/store/slice';
import { fetchSaveApprovalLOAN } from './api';
import { setAppNavigate } from 'features/app/store/slice';
import { getLOANNormalLOSuuid } from 'features/loan/normal/storage/selectors';
import { stepsLOANAppraisalApproval } from 'views/pages/LOAN/utils';

function* handleSaveApprovalLOAN(action: PayloadAction<string[]>) {
    // payload 0 stepname, 1 action button
    const los_id: string = yield select(getLOANNormalLOSId)
    const los_uuid: string = yield select(getLOANNormalLOSuuid)

    const product: ILoanProduct = yield select(getLOANApprovalProduct)
    const program: ILoanProgram = yield select(getApprovalLOANProgram)
    const storage: IApprovalLOANState = yield select(getApprovalStorage)
    const valid: IApprovalValidate = yield select(validateLOANApproval(action.payload[0]))
    
    const currentStepIndex = stepsLOANAppraisalApproval.indexOf(action.payload[0])
    const getIsExistProductAndBusiness : IApprovalLOANBussinessActivities = yield select(getLOANApprovalProductionAndBusiness)
    const brw_uuid: string = yield select(getLOANApprovalSourceBorrowerUuid)
    try {
        if(valid.valid){
            const r: IApiResponse<unknown> = yield call(fetchSaveApprovalLOAN,storage,product,program,los_id,action.payload[0])
            if(r.success){
                switch (action.payload[0]) {
                    case 'product':
                        yield put(updateStoreFullLoanApprovalProduct(r.data as IProductLoanProgram));
                        break;

                    case 'need-and-plan':
                        yield put(updateStoreFullLoanApprovalNeedPlan(r.data as IApprovalLOANCapitalNeedFull));
                        break;

                    case 'pro-and-bus':
                        yield put(updateStoreFullLoanApprovalProBus(r.data as IApprovalLOANBussinessActivities));
                        break;

                    case 'loan-method':
                        yield put(updateStoreFullLoanApprovalLoanMethod(r.data as ILOANMethod));
                        break;

                    default:
                        break;
                }
                yield put(fetchApprovalFullDocument(los_id))
                yield put(notify(
                    "Lưu thành công",
                    { options: { variant: 'success' } }
                ));
                // action continue
                if(action.payload[1] === 'continue'){
                    // console.log(currentStepIndex + 1,stepsLOANAppraisalApproval.length,'11111111111');
                    if(currentStepIndex === 1 && !getIsExistProductAndBusiness){
                        yield put(setAppNavigate(`/loan/normal/appraisal-approval/${los_uuid}/loan/${stepsLOANAppraisalApproval[currentStepIndex + 2]}`));
                    }
                    else if(currentStepIndex + 1 < stepsLOANAppraisalApproval.length){
                        yield put(setAppNavigate(`/loan/normal/appraisal-approval/${los_uuid}/loan/${stepsLOANAppraisalApproval[currentStepIndex +1]}`));
                    }else{
                        yield put(setAppNavigate(`/loan/normal/appraisal-approval/${los_uuid}/income/borrower/${brw_uuid}/salary`));
                    }
                }
            }else{
                yield put(notify(
                    r.errors[0].detail,
                    { options: { variant: 'error' } }
                ));
            }
        }else{
            yield put(notify(
                valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại",
                { options: { variant: 'error' } }
            ));
        }
    }
    catch(e){
        yield put(notify(
            "Đã xảy ra lỗi",
            { options: { variant: 'error' } }
        ));
        yield put(closeAppBackdrop())

    }
    finally{
        yield put(setLoanApprovalValidate(valid))
        yield put(closeAppBackdrop())
    }
}

export default function* storageApprovalLOANSaga() {
    yield takeEvery(saveApprovalLOAN.type, handleSaveApprovalLOAN);
  
  }