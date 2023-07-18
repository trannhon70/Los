import { call, delay, put, takeEvery, takeLeading } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, setAppNavigate, showAppBackdrop } from "features/app/store/slice";
import { getLOANNormalConfigMetadataConstant } from "features/loan/normal/configs/metadata/selector";
import { updateLegalToCIC } from "features/loan/normal/storage/cic/actions";
import { fetchListDataHistoryLogs } from "features/loan/normal/storage/historyLogs/action";
import { updateLegalResBorrower,
  updateLegalResListCoBorrower,
  updateLegalResListLegalContact,
  updateLegalResListLegalRelated
} from "features/loan/normal/storage/legal/actions";
import { saveLegalBorrowerAPI,
  saveLegalCoBorrowerAPI,
  saveLegalContactAPI,
  saveLegalCoPayerAPI,
  saveLegalLegalRelatedAPI,
  saveLegalMarriageAPI,
  saveLegalOtherAPI
} from "features/loan/normal/storage/legal/api";
import { getLOANNormalStorageLegalSave } from "features/loan/normal/storage/legal/selectors";
import { getLOANNormalLOSuuid } from "features/loan/normal/storage/selectors";
import { select } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IMetadataConstantState } from "types/models/loan/normal/configs/metadata";
import { ILOANNormalLegalBorrower, ILOANNormalLegalRelated, ILOANNormalLegalReLrt, ILOANNormalStorageLegalState } from "types/models/loan/normal/storage/Legal";
import { IMasterData } from "types/models/master-data";
import { METADATA_CONSTANT } from "utils/constants";
import { __auto_fill_legal } from "./action";
import {
  AUTO_ALL_LEGAL,
  devLOANNormalInitLegalFillAll,
  devLOANNormalInitLegalFillSingle,
} from "./slice";

const names: Record<string, string> = {
  brw: 'borrower',
  mrg: 'marriage',
  cob: 'coborrower',
  cop: 'copayer',
  law: 'legalRelated',
  rlt: 'contact'
}

const codes: Record<string, string> = {
  brw: 'BORROWER',
  mrg: 'MARRIAGE',
  cob: 'CO_BRW',
  cop: 'CO_PAYER',
  law: 'LAW_RLT',
  rlt: 'RELATED'
}


function* handleSaveLegalAutoFill(action: PayloadAction<boolean>) {
  try {
    const params: [ILOANNormalStorageLegalState, string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)

    yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/legal/co-borrower`));
    yield delay(2000)
    yield put(showAppBackdrop());
    const rBorr: IApiResponse<unknown> = yield call(saveLegalBorrowerAPI, ...params,  metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
    const rMarr: IApiResponse<unknown> = yield call(saveLegalMarriageAPI, ...params, "marriage");
    const rCoborr: IApiResponse<unknown> = yield call(saveLegalCoBorrowerAPI, ...params);
    const rCopayer: IApiResponse<unknown> = yield call(saveLegalCoPayerAPI, ...params);
    const rRelated: IApiResponse<unknown> = yield call(saveLegalLegalRelatedAPI, ...params);
    const rContact: IApiResponse<unknown> = yield call(saveLegalContactAPI, ...params);
    const rOther: IApiResponse<unknown> = yield call(saveLegalOtherAPI, ...params);
    if (rBorr.success) {
      yield put(notify('Lưu thành công người vay chính', { options: { variant: 'success' } }));
      yield put(updateLegalResBorrower(rBorr?.data as ILOANNormalLegalBorrower, "borrower"));
      yield put(fetchListDataHistoryLogs(los_uuid));
      yield put(updateLegalToCIC(rBorr?.data as ILOANNormalLegalBorrower, "BORROWER"))
      yield delay(2000)
      yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/legal/marriage`));
      if(rMarr.success){
        yield put(notify('Lưu thành công người hôn phối', { options: { variant: 'success' } }));
        yield put(updateLegalResBorrower(rMarr?.data as ILOANNormalLegalBorrower, "marriage"))
        yield put(fetchListDataHistoryLogs(los_uuid));
        yield put(updateLegalToCIC(rMarr?.data as ILOANNormalLegalBorrower, "MARRIAGE"))
        yield delay(500)
        yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/legal/co-borrower`));
        if(rCoborr.success){
          yield put(notify('Lưu thành công người đồng vay', { options: { variant: 'success' } }));
          yield put(updateLegalResListCoBorrower(rCoborr?.data as ILOANNormalLegalBorrower[], "co-borrower"))
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(updateLegalToCIC(rCoborr?.data as ILOANNormalLegalBorrower[], "CO_BRW"))
          yield delay(500)
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/legal/co-payer`));
          if(rCopayer.success){
            yield put(notify('Lưu thành công người đồng trả nợ', { options: { variant: 'success' } }));
            yield put(updateLegalResListCoBorrower(rCopayer?.data as ILOANNormalLegalBorrower[], "co-payer"))
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(updateLegalToCIC(rCopayer?.data as ILOANNormalLegalBorrower[], "CO_PAYER"))
            if(rRelated.success){
              yield put(notify('Lưu thành công người liên quan theo quy định pháp luật', { options: { variant: 'success' } }));
              yield put(updateLegalResListLegalRelated(rRelated.data as ILOANNormalLegalReLrt[], 'legal-related'))
              yield put(updateLegalToCIC(rRelated?.data as ILOANNormalLegalReLrt[], "LAW_RLT"))
              yield put(fetchListDataHistoryLogs(los_uuid));
              if(rContact.success){
                yield put(notify('Lưu thành công người liên hệ', { options: { variant: 'success' } }));
                yield put(updateLegalResListLegalContact(rContact?.data as ILOANNormalLegalRelated, "contact"))
                yield put(fetchListDataHistoryLogs(los_uuid));
                if(rOther.success){
                  yield put(notify('Lưu thành công đối tượng khác', { options: { variant: 'success' } }));
                  yield put(updateLegalResListCoBorrower(rOther?.data as ILOANNormalLegalBorrower[], 'other'))
                  yield put(updateLegalToCIC(rOther?.data as ILOANNormalLegalBorrower[], "OTHER"))
                  yield put(closeAppBackdrop());
                  yield put(fetchListDataHistoryLogs(los_uuid));
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

function* legalFillAll() {
  yield delay(300);
  yield put(__auto_fill_legal('all', ''));
}

function* legalFillSingle(action: PayloadAction<string, string, boolean>) {
  if (action.meta) {
    // yield put(__start_auto_fill_legal());
    yield delay(300);
  }

  yield put(__auto_fill_legal(names[action.payload], codes[action.payload]));
}

export default function* devToolLOANNormalLegalSaga() {
  yield takeEvery(devLOANNormalInitLegalFillAll.type, legalFillAll);
  yield takeEvery(devLOANNormalInitLegalFillSingle.type, legalFillSingle);
  yield takeEvery(AUTO_ALL_LEGAL.type, handleSaveLegalAutoFill);
}