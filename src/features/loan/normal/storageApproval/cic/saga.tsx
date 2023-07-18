import { PayloadAction } from '@reduxjs/toolkit';
import {
  closeAppBackdrop,
  notify,
  showAppBackdrop
} from 'features/app/store/slice';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'types';
import {
  ICICDocumentInfoAPI,
  ICICMainObjectAPISingle, ICICSummaryAPI, ILOANNormalApprovalStorageCICState,
  ILOANNormalApprovalStorageCICStateValidate, INormalAgreementDeletePosition
} from 'types/models/loan/normal/storageApproval/CIC';
import { checkIsLocalUUID } from 'utils';
import {
  deleteNormalAgreement,
  deleteNormalAgreementStoreFull, getSummaryCIC, saveLOANNormalApprovalCIC,
  setAprrovalCICValidate,
  updateApprovalCICresponseSave,
  updateApprovalCICSummaryResponseSave
} from './actions';
import { deleteAgreementCICAPI, getSummaryCICAPI, saveCICAPI, saveSummaryCICAPI } from './api';
import {
  getCurrentPersonDocumentListSoreFull,
  getLOANNormalApprovalStorageCICSave,
  validateLOANNormalStorageCIC
} from './selectors';

function* handleSaveCIC(
  action: PayloadAction<boolean, string, { type: string, position?: INormalAgreementDeletePosition, dataPosition: string }>
) {
  try {
    
    const params: [
      ILOANNormalApprovalStorageCICState,
      string,
    ] = yield select(getLOANNormalApprovalStorageCICSave);

    if(action.meta.type === 'delete' && action.meta.position) {
      if(!checkIsLocalUUID(action.meta.position.uuid)) {
        const deleteParams: [
          ILOANNormalApprovalStorageCICState,
          string,
          string,
          string
        ] = [...params, action.meta.position.uuid, action.meta.dataPosition]
        yield put(showAppBackdrop());
        const r : IApiResponse<unknown> = yield call(deleteAgreementCICAPI, ...deleteParams);
        if(r.success) {
          yield put(deleteNormalAgreementStoreFull(action.meta.position))
          yield put(deleteNormalAgreement(action.meta.position))
          yield put(
            notify(' Xóa thành công ', { options: { variant: 'success' } })
          );
          yield put(closeAppBackdrop());
        }
        else{
          yield put(
            notify(' Xóa không thành công ', { options: { variant: 'error' } })
          );
          yield put(closeAppBackdrop());
        }
      }
      else {
        yield put(deleteNormalAgreement(action.meta.position))
        yield put(
          notify(' Xóa thành công ', { options: { variant: 'success' } })
        );
        yield put(closeAppBackdrop());
      }
    }
    else if(action.meta.type === 'saveSummary'){
      yield put(showAppBackdrop());
      const r: IApiResponse<unknown> = yield call(saveSummaryCICAPI, params[1]);
      if (r.success) {
        yield put(
          notify(' Lưu thành công ', { options: { variant: 'success' } })
        );
        if (r.data) {
          yield put(
            updateApprovalCICresponseSave(r.data as ICICMainObjectAPISingle)
          );
        }
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify('Lưu thông tin CIC thất bại', {
            options: { variant: 'error' },
          })
        );
        yield put(closeAppBackdrop());
      }
    }
    else {
      const valid: ILOANNormalApprovalStorageCICStateValidate = yield select(
        validateLOANNormalStorageCIC
      );
      yield put(setAprrovalCICValidate(valid));
      yield put(showAppBackdrop());
      const documentListStoreFull: ICICDocumentInfoAPI[] = yield select(getCurrentPersonDocumentListSoreFull)
      if (valid.valid) {
        const r: IApiResponse<unknown> = yield call(saveCICAPI, ...params,documentListStoreFull, action.meta.dataPosition);
        if (r.success) {
          yield put(
            notify(' Lưu thành công ', { options: { variant: 'success' } })
          );
          if (r.data) {
            yield put(
              updateApprovalCICresponseSave(r.data as ICICMainObjectAPISingle)
            );
          }
          yield put(closeAppBackdrop());
        } else {
          yield put(
            notify('Lưu thông tin CIC thất bại', {
              options: { variant: 'error' },
            })
          );
          yield put(closeAppBackdrop());
        }
      } else {
        yield put(closeAppBackdrop());
        if (valid.role === 'over30Days') {
          yield put(
            notify(
              'CIC tra cứu đã quá thời hạn 30 ngày!. Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            )
          );
        } else {
          yield put(
            notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', {
              options: { variant: 'error' },
            })
          );
        }
      }
    }
    
  } catch (error) {
    console.log('error Try catch', error);
    yield put(
      notify('Lưu thông tin CIC thất bại', { options: { variant: 'error' } })
    );
    yield put(closeAppBackdrop());
  }
  finally{
    yield put(closeAppBackdrop());
  }

}
function* handleGetSummaryCIC(
  action: PayloadAction<string>
) {
  try {
    const params: [
      ILOANNormalApprovalStorageCICState,
      string,
    ] = yield select(getLOANNormalApprovalStorageCICSave);

    yield put(showAppBackdrop(true));
    const r: IApiResponse<unknown> = yield call(getSummaryCICAPI, params[1], action.payload);

    if(r.success) {
      if (r.data) {
        yield put(
          updateApprovalCICSummaryResponseSave(r.data as ICICSummaryAPI)
        );
      }
    }
  }
  catch(e) {
    console.log(e)
  }
  finally {
    yield put(closeAppBackdrop());
  }

}

export default function* storageCICApprovalSaga() {
  yield takeEvery(saveLOANNormalApprovalCIC.type, handleSaveCIC);
  yield takeEvery(getSummaryCIC.type, handleGetSummaryCIC)
}
