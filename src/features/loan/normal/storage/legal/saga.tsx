import { PayloadAction } from "@reduxjs/toolkit";
import {
  closeAppBackdrop,
  notify,
  setAppNavigate,
  showAppBackdrop
} from "features/app/store/slice";
import * as _ from 'lodash';
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IUser } from "types/models/Account";
import {
  CUSTOM_KEY_FILE,
  ILOANNormalAlertBlackListData,
  ILOANNormalChildFile,
  ILOANNormalLegalBor,
  ILOANNormalLegalBorrower,
  ILOANNormalLegalRelated,
  ILOANNormalLegalReLrt,
  ILOANNormalStorageLegalFile,
  ILOANNormalStorageLegalState,
  ILOANNormalStorageLegalValidate,
  ILOANNormalUpload,
  IParamDeleteLOANNormalStoredLegal
} from "types/models/loan/normal/storage/Legal";
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import { IMasterData } from "types/models/master-data";
import { generateLegalDeclareTypeName, PREFIX_LOCAL } from "utils";
import {
  declareMapTypeUrl,
  DeclareName,
  pathNameLegalStoredToUrl,
  pathUrlToDeclareLegalStored
} from "views/pages/LOAN/utils";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { updateLegalToCIC } from "../cic/actions";
import { getLOANNormalLOSuuid } from "../selectors";
import {
  clearForm, clearFormDELETE, 
  deleteDataChildFile,
  deleteDataFile,
  deleteDataLegalAllFile,
  deleteLegal,
  deleteLegalUserList,
  deleteLegalUserListByPersonUUID,
  deleteLegalUserListByPersonUUIDFull,
  downloadLegalFileMulti,
  fetchCif,
  mappingLegalDataFileAlterUpload,
  mapUploadDataStored,
  onChangeBack,
  onChangeContinue,
  onchangeUseList,
  saveLegalBorrower,
  saveLegalCoBorrower,
  saveLegalContact,
  saveLegalCoPayer,
  saveLegalMarriage,
  saveLegalOther,
  saveLegalRelated, setBlackListAlert, setLegalBorrowerDeclare, setLegalValidate,
  updateLegalDataFromCif,
  updateLegalResBorrower,
  updateLegalResListCoBorrower,
  updateLegalResListLegalContact,
  updateLegalResListLegalRelated,
  uploadLegalFileMulti
} from "./actions";
import {
  checkBlacklistApi,
  deleteLOANNormalLegalUserListByUUID, deleteLOANNormalStoredLegaAPI, downloadLegalFile, getCif, saveLegalBorrowerAPI,
  saveLegalCoBorrowerAPI,
  saveLegalContactAPI,
  saveLegalCoPayerAPI, saveLegalFile, saveLegalLegalRelatedAPI,
  saveLegalMarriageAPI,
  saveLegalOtherAPI
} from "./api";
import { ELegalTypeScreen } from "./case";
import {
  checkMarriageStatus,
  getBranchCodeUser,
  getLegalDataFullDeclare,
  getLOANNormalStorageLegalSave,
  isCheckPerionUuid,
  validateLOANNormalStorageLegal
} from "./selectors";
import { IMetadataConstantState } from "types/models/loan/normal/configs/metadata";
import { getLOANNormalConfigMetadataConstant } from "features/loan/normal/configs/metadata/selector";
import { METADATA_CONSTANT } from "utils/constants";
import { clearGuide } from "../../storageGuide/action";

function* handleSaveLegal(action: PayloadAction<boolean>){
  try {
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    const legalBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.BORROWER));
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)

    const isCheckValidate: boolean = legalBorrowerValidate?.valid ?? true;

    
    if(!isCheckValidate){
      yield put(setLegalValidate(legalBorrowerValidate));
      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else{
      yield put(showAppBackdrop());
      const checkBlacklist : IApiResponse<ILOANNormalAlertBlackListData[]> = yield call(checkBlacklistApi, params[0], ELegalTypeScreen.BORROWER);

      if(!!checkBlacklist.data && checkBlacklist.data.length > 0 ) {
        yield put(setBlackListAlert(checkBlacklist.data))
        yield put(closeAppBackdrop());
      }
      else {
        const r: IApiResponse<unknown> = yield call(saveLegalBorrowerAPI, ...params, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
        if(r.success){
          if(action.payload){
            yield put(notify('Lưu thành công thông tin người vay chính', { options: { variant: 'success' } }));
          }
          else {
            yield put(notify('Cập nhật thành công thông tin người vay chính', { options: { variant: 'success' } }));
          }
          yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "borrower"));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(updateLegalToCIC(r?.data as ILOANNormalLegalBorrower, "BORROWER"))
        }
        else{
          const  index =  r.errors.length;
          if(index === 0){
            yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
          }else {
            yield put(notify(`${r.errors[index-1].detail }`, { options: { variant: 'error' } }));
          }
        }
      }
    }

    yield put(closeAppBackdrop());
  } catch (error) {

    yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
}

function* handleSaveLegalMarriage(action: PayloadAction<boolean>){
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const legalBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.MARRIAGE));
    const isCheckValidate: boolean = legalBorrowerValidate?.valid ?? true;
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    
    yield put(showAppBackdrop());

    if(!isCheckValidate){
      yield put(setLegalValidate(legalBorrowerValidate));
      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else {

      const checkBlacklist : IApiResponse<ILOANNormalAlertBlackListData[]> = yield call(checkBlacklistApi, params[0], ELegalTypeScreen.MARRIAGE);
      if(!!checkBlacklist.data && checkBlacklist.data.length > 0 ) {
        yield put(setBlackListAlert(checkBlacklist.data))
        yield put(closeAppBackdrop());
      }
      else {
        const r: IApiResponse<unknown> = yield call(saveLegalMarriageAPI, ...params, "marriage");
        if(r.success){
          if(action.payload){
            yield put(notify('Lưu thành công thông tin người hôn phối', { options: { variant: 'success' } }));
          }
          else {
            yield put(notify('Cập nhật thành công thông tin người hôn phối', { options: { variant: 'success' } }));
          }
          yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "marriage"))
        
          yield put(fetchListDataHistoryLogs(los_uuid));

          yield put(updateLegalToCIC(r?.data as ILOANNormalLegalBorrower, "MARRIAGE"))
        
        }
        else{
          yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
          // const  index =  r.errors.length;
          // if(index === 0){
          //   yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
          // }else {
          //   yield put(notify(`${r.errors[index-1].detail }`, { options: { variant: 'error' } }));
          // }
        }
        yield put(closeAppBackdrop());
    }
  }
  } catch (error) {
      yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
  }
}

function* handleSaveLegalCoBorrower(action: PayloadAction<string>){
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const legalCoBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.CO_BRW));
    const isCheckValidate: boolean = legalCoBorrowerValidate?.valid ?? true;
    const params: [ ILOANNormalStorageLegalState ,string, IMasterData ] = yield select(getLOANNormalStorageLegalSave);

    yield put(showAppBackdrop());

    if(!isCheckValidate){
      yield put(setLegalValidate(legalCoBorrowerValidate));

      if (legalCoBorrowerValidate.position){
        yield put(
          onchangeUseList(legalCoBorrowerValidate.position, {
              declare: ELegalTypeScreen.CO_BRW
            }
          )
        )
      }

      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else{
      const checkBlacklist : IApiResponse<ILOANNormalAlertBlackListData[]> = yield call(checkBlacklistApi, params[0], ELegalTypeScreen.CO_BRW);
      if(!!checkBlacklist.data && checkBlacklist.data.length > 0 ) {
        yield put(setBlackListAlert(checkBlacklist.data))
        yield put(closeAppBackdrop());
      }
      else {
        const r: IApiResponse<unknown> = yield call(saveLegalCoBorrowerAPI, ...params);

        if(r.success){
          if(action.payload){
            yield put(notify('Lưu thành công thông tin người đồng vay', { options: { variant: 'success' } }));
          }
          else {
            yield put(notify('Cập nhật thành công thông tin người đồng vay', { options: { variant: 'success' } }));
          }
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-borrower"))
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(updateLegalToCIC(r?.data as ILOANNormalLegalBorrower[], "CO_BRW"))
        }
        else{
          yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
        }
        yield put(closeAppBackdrop());
      }
    }
  } catch (error) {
    yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
}

function* handleSaveLegalCoPayer(action: PayloadAction<boolean>){
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const legalBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.CO_PAYER));
    const isCheckValidate: boolean = legalBorrowerValidate?.valid ?? true;
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);

    yield put(showAppBackdrop());

    if(!isCheckValidate){
      yield put(setLegalValidate(legalBorrowerValidate));

      if (legalBorrowerValidate.position){
        yield put(
          onchangeUseList(legalBorrowerValidate.position, {
              declare: ELegalTypeScreen.CO_PAYER
            }
          )
        )
      }

      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else {
      const checkBlacklist : IApiResponse<ILOANNormalAlertBlackListData[]> = yield call(checkBlacklistApi, params[0], ELegalTypeScreen.CO_PAYER);
      if(!!checkBlacklist.data && checkBlacklist.data.length > 0 ) {
        yield put(setBlackListAlert(checkBlacklist.data))
        yield put(closeAppBackdrop());
      }
      else {
        const r: IApiResponse<unknown> = yield call(saveLegalCoPayerAPI, ...params);
    
        if(r.success){
          if(action.payload){
            yield put(notify('Lưu thành công thông tin người đồng trả nợ', { options: { variant: 'success' } }));
          }
          else {
            yield put(notify('Cập nhật thành công thông tin người đồng trả nợ', { options: { variant: 'success' } }));
          }
          yield put(closeAppBackdrop());
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-payer"))
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(updateLegalToCIC(r?.data as ILOANNormalLegalBorrower[], "CO_PAYER"))
        }
        else{
          yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
          yield put(closeAppBackdrop());
        }
      }
    }
  } catch (error) {
      yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
  }
}

function* handleSaveLegalLegalRelated(action: PayloadAction<boolean>){
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const legalBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.LAW_RLT));
    const isCheckValidate: boolean = legalBorrowerValidate?.valid ?? true;

    yield put(showAppBackdrop());

    if(!isCheckValidate){
      yield put(setLegalValidate(legalBorrowerValidate));

      if (legalBorrowerValidate.position){
        yield put(
          onchangeUseList(legalBorrowerValidate.position, {
              declare: ELegalTypeScreen.LAW_RLT
            }
          )
        )
      }

      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else{
      const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
      const r: IApiResponse<unknown> = yield call(saveLegalLegalRelatedAPI, ...params);
  
      if(r.success){
        if(action.payload){
          yield put(notify('Lưu thành công thông tin người liên quan', { options: { variant: 'success' } }));
        }
        else {
          yield put(notify('Cập nhật thành công thông tin người liên quan', { options: { variant: 'success' } }));
        }
        yield put(updateLegalResListLegalRelated(r.data as ILOANNormalLegalReLrt[], 'legal-related'))
        yield put(updateLegalToCIC(r?.data as ILOANNormalLegalReLrt[], "LAW_RLT"))
        
        yield put(setLegalValidate({valid: true}));
        yield put(fetchListDataHistoryLogs(los_uuid));
      }
      else{
        yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
      }
      yield put(closeAppBackdrop());
    }
  } catch (error) {
    yield put(closeAppBackdrop());
      yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
  }
}

function* handleSaveLegalContact(action: PayloadAction<boolean>){
  try {

    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const legalContactValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.REALTED));
    const isCheckValidate: boolean = legalContactValidate?.valid ?? true;

    yield put(showAppBackdrop());

    if(!isCheckValidate){
      yield put(setLegalValidate(legalContactValidate));

      if (legalContactValidate.position){
        yield put(
          onchangeUseList(legalContactValidate.position, {
              declare: ELegalTypeScreen.REALTED
            }
          )
        )
      }

      yield put(closeAppBackdrop());
      if(legalContactValidate?.field === 'contact'){
        yield put(notify('Phải có ít nhất một người liên hệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));

      }
      else {
        yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      }
      return;
    }
    else {
      const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
      const r: IApiResponse<unknown> = yield call(saveLegalContactAPI, ...params);
  
      if(r.success){

        if(action.payload){
          yield put(notify('Lưu thành công thông tin người liên hệ', { options: { variant: 'success' } }));
        }
        else {
          yield put(notify('Cập nhật thành công thông tin người liên hệ', { options: { variant: 'success' } }));
        }
        yield put(updateLegalResListLegalContact(r?.data as ILOANNormalLegalRelated, "contact"))
        yield put(setLegalValidate({valid: true}));
        yield put(closeAppBackdrop());
        yield put(fetchListDataHistoryLogs(los_uuid));
      }
      else{
        yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
        yield put(closeAppBackdrop());
      }
    }
  } catch (error) {
      yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
  }
}

function* handleSaveLegalOther(action: PayloadAction<boolean>){
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const otherValidate: ILOANNormalStorageLegalValidate = yield select(validateLOANNormalStorageLegal(ELegalTypeScreen.OTHER));
    const isCheckValidateOther: boolean = otherValidate?.valid ?? true;
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);

    yield put(showAppBackdrop());
    if(!isCheckValidateOther){
      yield put(setLegalValidate(otherValidate));

      if (otherValidate.position){
        yield put(
          onchangeUseList(otherValidate.position, {
              declare: ELegalTypeScreen.OTHER
            }
          )
        )
      }

      yield put(closeAppBackdrop());
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.', { options: { variant: 'error' } }));
      return;
    }
    else{
      const checkBlacklist : IApiResponse<ILOANNormalAlertBlackListData[]> = yield call(checkBlacklistApi, params[0], ELegalTypeScreen.OTHER);
      if(!!checkBlacklist.data && checkBlacklist.data.length > 0 ) {
        yield put(setBlackListAlert(checkBlacklist.data))
        yield put(closeAppBackdrop());
      }
      else {
        const r: IApiResponse<unknown> = yield call(saveLegalOtherAPI, ...params);
        yield put(showAppBackdrop());
        
        if(r.success){
          if(action.payload){
            yield put(notify('Lưu thành công thông tin đối tượng khác', { options: { variant: 'success' } }));
          }
          else {
            yield put(notify('Cập nhật thành công thông tin đối tượng khác', { options: { variant: 'success' } }));
          }
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], 'other'))
          yield put(updateLegalToCIC(r?.data as ILOANNormalLegalBorrower[], "OTHER"))

          yield put(closeAppBackdrop());
          yield put(setLegalValidate({valid: true}));
          yield put(fetchListDataHistoryLogs(los_uuid));
        }
        else{
          yield put(notify('Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
          yield put(closeAppBackdrop());
        }
      }
    }
  } catch (error) {
      yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
  }
}

function* callSuccessUpdateStoredDelete(data: unknown, declare: string){
  switch(declare){
    case ELegalTypeScreen.BORROWER:
      yield put(updateLegalResBorrower(data as ILOANNormalLegalBorrower, 'borrower'));
      break;

    case ELegalTypeScreen.MARRIAGE:
      yield put(updateLegalResBorrower(null as unknown as ILOANNormalLegalBorrower, 'marriage'));
      break;

    case ELegalTypeScreen.CO_BRW:
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[],'co-borrower'));
      break;

    case ELegalTypeScreen.CO_PAYER:
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[], 'co-payer'));
      break;

    case ELegalTypeScreen.LAW_RLT:
      yield put(updateLegalResListLegalRelated(data as ILOANNormalLegalReLrt[], 'legal-related'));
      break;

    case ELegalTypeScreen.REALTED:
      yield put(updateLegalResListLegalContact( data as ILOANNormalLegalRelated, 'contact'));
      break;

    case ELegalTypeScreen.OTHER:
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[], 'other'));
      break;
  }
}

function* handleDeleteLegal(action: PayloadAction<IParamDeleteLOANNormalStoredLegal, string,
  {
    valueChangeDeclare: string[];
    valueDeclare: string[];
  }>) {
  try {
    const isCheckCall: boolean = yield select(isCheckPerionUuid(action.payload.declare_type));
    const isCheckMarriageStatus: boolean = yield select(checkMarriageStatus);
    const textSuccessRemoveDeclareType: string = generateLegalDeclareTypeName(action.payload.declare_type);
    if (!isCheckCall) {
      yield call(clearForm, action.payload.declare_type);
      yield put(notify(`Xóa ${textSuccessRemoveDeclareType} thành công`, { options: { variant: 'success' } }))
      yield put (setLegalBorrowerDeclare(action.meta.valueChangeDeclare));
      return
    }
    // if(action.payload.declare_type === "MARRIAGE" && isCheckMarriageStatus){
    //   yield put(notify(`Tình trạng hôn nhân ổn định. Không thể xóa người hôn phối`, { options: { variant: 'warning' } }))
    //   yield put(setLegalBorrowerDeclare(action.meta.valueDeclare));
    //   return
    // }
    let rSave: IApiResponse<unknown> = {
      data: [],
      errors: [],
      success: false
    }
    const r: IApiResponse<unknown> = yield call(deleteLOANNormalStoredLegaAPI, action.payload.los_uuid, action.payload.declare_type);
  
    // if(r.errors){
    //   const index = r.errors.length;
    //   if (index === 0) {
    //     yield put(notify('Xóa không thành công. Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
    //   } else {
    //     yield put(notify(`${r.errors[index - 1].detail}`, { options: { variant: 'error' } }));
    //     yield put(setLegalBorrowerDeclare(action.meta.valueDeclare));
    //   }
    //   return
    // }else
    // if(action.payload.declare_type === "MARRIAGE" && isCheckMarriageStatus){
    //   yield put(notify(`Tình trạng hôn nhân ổn định. Không thể xóa người hôn phối`, { options: { variant: 'warning' } }))
    //   yield put(setLegalBorrowerDeclare(action.meta.valueDeclare));
    //   return
    // }else
    if (r.success ) {
      yield call(clearForm, action.payload.declare_type);
      yield put(notify(`Xóa ${textSuccessRemoveDeclareType} thành công`, { options: { variant: 'success' } }))
      yield put (setLegalBorrowerDeclare(action.meta.valueChangeDeclare));
      yield put (clearFormDELETE(action.payload.declare_type));
      yield callSuccessUpdateStoredDelete(rSave?.data,action.payload.declare_type);

      yield put(updateLegalToCIC([], action.payload.declare_type))

      return

    }
    else {
      const index = r.errors.length;
      if (index === 0) {
        yield put(notify('Xóa không thành công. Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
      } else {
        yield put(notify(`${r.errors[index - 1].detail}`, { options: { variant: 'error' } }));
        yield put(setLegalBorrowerDeclare(action.meta.valueDeclare));
      }
    }

  }
  catch (error) {
    yield put(closeAppBackdrop());
  }
}


function* handleLegalDeleteUserLists(action: PayloadAction<IParamDeleteLOANNormalStoredLegal, string,
  {
    valueChangeDeclare: string[];
    valueDeclare: string[];
    person_uuid:string;
  }>) {
  try {
    yield put(showAppBackdrop());
    const isCheckCall: boolean = yield select(isCheckPerionUuid(action.payload.declare_type));
    const textSuccessRemoveDeclareType: string = generateLegalDeclareTypeName(action.payload.declare_type);
    if (!isCheckCall) {
      yield call(clearForm, action.payload.declare_type);
      yield put(notify(`Xóa ${textSuccessRemoveDeclareType} thành công`, { options: { variant: 'success' } }))
      return
    }
    const r: IApiResponse<unknown> = yield call(deleteLOANNormalLegalUserListByUUID, action.payload.los_uuid, action.payload.declare_type,action.meta.person_uuid);

    if (r.success ) {
      yield call(clearForm, action.payload.declare_type);
      yield put(deleteLegalUserList( action.meta.person_uuid, {declare:action.payload.declare_type}));
      yield put(deleteLegalUserListByPersonUUIDFull({los_uuid:action.payload.los_uuid ,declare_type:action.payload.declare_type},{ valueDeclare: [], person_uuid: action.meta.person_uuid, valueChangeDeclare: [] }));
      yield put(notify(`Xóa ${textSuccessRemoveDeclareType} thành công`, { options: { variant: 'success' } }))
      
      const newLegalData : ILOANNormalLegalBorrower | ILOANNormalLegalBorrower[] | ILOANNormalLegalReLrt[] = yield select(getLegalDataFullDeclare(action.payload.declare_type))
      
      yield put(updateLegalToCIC(newLegalData, action.payload.declare_type))
      yield put(closeAppBackdrop());
      
    }
    else {
      const index = r.errors.length;
      if (index === 0) {
        yield put(notify('Xóa không thành công. Vui lòng kiểm tra lại dữ liệu', { options: { variant: 'error' } }));
      } else {
        yield put(notify(`${r.errors[index - 1].detail}`, { options: { variant: 'error' } }));
      }
      yield put(closeAppBackdrop());
    }
  }
  catch (error) {
    console.log(error);
    yield put(notify('Lưu thông tin pháp lý thất bại', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
}


export function* upLoadFileLegal(
  action: PayloadAction<ILOANNormalUpload>
){
  yield put(showAppBackdrop());

  yield* action.payload.dataFile?.map(function* (d) {
    let formDataFile = new FormData();
    let _fileId: number | null = null;

    if (d.child_files.length === 0) {
      return;
    }

    yield* d.child_files.map(function* (cf){
      if (cf.file_upload.length > 0 && cf.file_upload !== null) {
        const file: File = new File([cf.file_upload] as unknown as BlobPart[], cf?.name, { type: cf?.content_type });
        yield _fileId = Number(cf.file_id);
        yield formDataFile.append("files", file);
      }
    })
    yield put(closeAppBackdrop());
     const r: IApiResponse<IUploadFile[]> = yield call(saveLegalFile, formDataFile);
     if(r.success){
        const dataUpMapStored:ILOANNormalChildFile[] = r.data?.map(d => ({
          file_id: null,
          uuid: d?.uuid ?? "",
          name: d?.name ?? "",
          display_order: null,
          description: "",
          content_type: d?.content_type ?? "",
          created_by: "",
          created_by_name: "",
          updated_at: null,
          updated_by: "",
          updated_by_name: "",
          created_at: null,
          file_upload: ""
        })) ?? []

        yield put(mapUploadDataStored(dataUpMapStored, {
          declare: action.payload?.declare ?? "", 
          uuid_user: action.payload?.uuidUser ?? "", 
          uuid_document_info_list: d?.uuidActiveFile ?? ""
        }))
     }
     yield put(closeAppBackdrop());
  })
  yield put(closeAppBackdrop());
}

interface IUploadFileLegal extends IUploadFile{
  custom_keys:CUSTOM_KEY_FILE
}
function spliceIntoChunks(arr:{docId:string|number, fileData:ILOANNormalChildFile}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
}
  return res;
}

function* updateDocumentListAfterUpload(fileListAfterUpload: ILOANNormalChildFile[], documentList: ILOANNormalUpload){
  const newChildFileList: ILOANNormalStorageLegalFile[] = documentList.dataFile.map(file => {
    return {
      ...file,
      child_files: file.child_files.map(child => {
        const newFileUpload = fileListAfterUpload.find(e => e.custom_keys?.local_id === child.uuid)
        if(newFileUpload) return {...newFileUpload}
        else return {...child}
      })
    }
  })

  yield put(mappingLegalDataFileAlterUpload(newChildFileList, {
    declare: documentList?.declare ?? "", 
    uuid_user: documentList?.uuidUser ?? "", 
  }));
}

function* uploadMultiLegal(listFilesUpload: {docId:string|number, fileData:ILOANNormalChildFile}[], payload: ILOANNormalUpload){
  const arrayFile = [...listFilesUpload];
  const listChunkArray = spliceIntoChunks(arrayFile, 10);
  const custom_keys:{[key:number|string]:CUSTOM_KEY_FILE} = {};

  const listFilesUploadFinal: ILOANNormalChildFile[] = []

  yield* listChunkArray.map(function*(fileAttach){
    let fileIndex = 0;
    let formDataFile = new FormData();
    yield* fileAttach.map(function* (file){
      const docID = file.docId;
      const fileData = file.fileData;
      if(!fileData || !docID) return;
      try {
        const resBuf = yield call(fetch,fileData.file_upload);
        const buf = yield resBuf.arrayBuffer();
        const file: File = new File([buf], fileData.name, { type: fileData.content_type });
        yield _.set(custom_keys,[fileIndex],{idDoc:docID,local_id:fileData.uuid,description:fileData.description});
        yield fileIndex++;
        yield formDataFile.append("files", file);
      } catch (error) {
        console.log('error FETCH FILE',error);
      }
    });
    yield formDataFile.append("custom_keys",JSON.stringify(custom_keys));
    try { 
      const r: IApiResponse<IUploadFileLegal[]> = yield call(saveLegalFile, formDataFile);
      const dataResponse: IUploadFileLegal[] | null = r?.data ?? [];
      if(dataResponse?.length === 0) return;
      const user:IUser | undefined = yield select(getBranchCodeUser);
  
      const dataUploadDocument:ILOANNormalChildFile[] = dataResponse.map((file,index)=>({
        uuid: file.uuid,
        display_order:index,
        created_at: (Number(file.created_at?? 0)),
        file_id: 0,
        name: decodeURI(file.name),
        description: file.custom_keys.description??'',
        content_type: file.content_type,
        created_by: file.created_by,
        created_by_name: file.created_by_name,
        updated_at: file.updated_at,
        updated_by: file.updated_by ,
        updated_by_name: file.updated_by_name,
        file_upload: '',
        custom_keys:file.custom_keys,
      }));

      listFilesUploadFinal.push(...dataUploadDocument)
      
    } catch (error) {
      console.log('error handle upload file legal',error);
    }
  })
  yield updateDocumentListAfterUpload(listFilesUploadFinal, payload)

}

export function* uploadMultipleFileLegal(action: PayloadAction<ILOANNormalUpload>){

  try {
    const listFilesUpload:{docId:string|number, fileData:ILOANNormalChildFile}[] =  [];
    action.payload.dataFile.forEach(doc=>{
      if(doc.child_files.length === 0) return;
      doc.child_files.forEach(file=>{
        if(file.uuid.includes(PREFIX_LOCAL)){
          listFilesUpload.push({docId:doc.document_id,fileData:file});
        }
      })
    });
  
    if(listFilesUpload.length === 0) {
      yield updateDocumentListAfterUpload([], action.payload)
    };
    yield uploadMultiLegal(listFilesUpload, action.payload)
  } catch (error) {
    yield put(notify('Lưu thông tin tập tin thất bại', { options: { variant: 'error' } }));
  }
 
}

function* handleContinue(action: PayloadAction<number>){
  try{
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)
    
    const lostUuid = params[1];
    const declareSteptLegal = ["BORROWER", "MARRIAGE","CO_BRW", "CO_PAYER", "LAW_RLT", "RELATED", "OTHER"];
    const declareCheckedStored = params[0].data.BORROWER?.info[0]?.declare.concat("BORROWER") ?? ["BORROWER"];

    let r: IApiResponse<unknown> = {
      data: [],
      errors: [],
      success: false
    }
    let isCheckSteptFinal = false;
    let isDeclareNameCheked = true;
    let isCheckActiveFinal: boolean = true;
    let declateNameNext = "";
    const declareNameCurrent = DeclareName[action.payload - 1];;
    
    yield put(showAppBackdrop());

    let i = action.payload;
    do{
      declateNameNext = declareSteptLegal[i];

      if (declateNameNext){
        isDeclareNameCheked = declareCheckedStored?.indexOf(declateNameNext.replaceAll("-", "_")) === -1 ? false : true;
      }
      else{
        isDeclareNameCheked = true;
      }

      isCheckActiveFinal = yield isCheckDataUserActiveFinal(
        pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_")), params[0]
      );
      

      if(!declateNameNext && isCheckActiveFinal){

        /*
        * Stept cuối cùng sẻ dung lại chuyển qua CIC
        * Nếu stept có user kiểm active cuối chưa
        * Nếu chưa sẻ di chuyển đến user tiếp theo
        */
        isCheckSteptFinal = true;
        break;
      }
      else if(isDeclareNameCheked && !isCheckActiveFinal){
        /**
         * Tồn tại stept được check
         * Nếu stept có user kiểm active cuối chưa
         * Nếu chưa sẻ di chuyển đến user tiếp theo
         * 
         */
        break;
      }
      else if(isDeclareNameCheked){
        break;
      }
      else{
        i = i + 1;
      }

    }while(i <= declareSteptLegal.length)


    /**
     * Check validate stept hien tai
     * 
     */
    const isValid: ILOANNormalStorageLegalValidate = yield setValidate(
      pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_"))
    )

    if(!isValid.valid){
      yield put(closeAppBackdrop());
      return;
    }

    /**
     * Call api update
     * 
     */
    switch(declareNameCurrent){
      case "borrower":
        r = yield call(saveLegalBorrowerAPI, ...params, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
        break;
      case "marriage":
        r = yield call(saveLegalMarriageAPI, ...params, declareNameCurrent);
        break;
      case "co-borrower":
        r = yield call(saveLegalCoBorrowerAPI, ...params);
        break;
      case "co-payer":
        r = yield call(saveLegalCoPayerAPI, ...params);
        break;
      case "legal-related":
        r = yield call(saveLegalLegalRelatedAPI, ...params);
        break;
      case "contact":
        r = yield call(saveLegalContactAPI, ...params);
        break;
      case "other":
        r = yield call(saveLegalOtherAPI, ...params);
        break;
    }

    if(!r.success){
      yield put(closeAppBackdrop());
      yield put(notify('Có lỗi xãy ra', { options: { variant: 'error' } }));
      return
    }

    if(!declateNameNext && isCheckSteptFinal){
      yield callSuccessUpdateStored(r?.data, pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_")));
      yield put(clearGuide())
      yield put(setAppNavigate(`/loan/normal/init/${lostUuid}/cic/other/borrower`));
    }
    else if(!isCheckActiveFinal){
      /**
       * Change active user tiếp theo
       * 
       */
      const declareNameChangeActive = pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_"));
      const activeUserList: string | undefined = yield changeActiveUserList( declareNameChangeActive, params[0]);

      if(activeUserList){
        yield put(onchangeUseList(activeUserList, {declare: declareNameChangeActive} ));
        yield callSuccessUpdateStored(r?.data, pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_")));
      }
    }
    else{
      yield callSuccessUpdateStored(r?.data, pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_")));
      yield put(clearGuide())
      yield put(setAppNavigate(`/loan/normal/init/${lostUuid}/legal/${pathNameLegalStoredToUrl(declateNameNext)}`));
    }

    yield put(closeAppBackdrop());
  }
  catch(error){
    yield put(closeAppBackdrop());
  }
}

// eslint-disable-next-line require-yield
function* isCheckDataUserActiveFinal(declare: string, dataStored: ILOANNormalStorageLegalState){
  const activeUser = dataStored.data[declare].uuidActiveLocal;
  const dataInfo = dataStored.data[declare].info;
  const checkData = dataInfo.find((data, ind) => ind === dataInfo.length - 1)?.uuidActiveLocal ?? "";
  
  if (activeUser === checkData){
    return true;
  }
  else {
    return false
  }
}

function* setValidate(declare: string){
  let isValid: ILOANNormalStorageLegalValidate = { valid: true, field: '', role: '', declare: ''};
  switch(declare){
    case declareMapTypeUrl.borrower:
      const legalBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.BORROWER)
      );

      isValid = legalBorrowerValidate;
      yield put(setLegalValidate(legalBorrowerValidate));
      break;

    case declareMapTypeUrl.marriage:
      const legalMarriageValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.MARRIAGE)
      );
      isValid = legalMarriageValidate;
      yield put(setLegalValidate(legalMarriageValidate));
      break;

    case declareMapTypeUrl.co_borrower:
      const legalCoBorrowerValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.CO_BRW)
      );
      isValid = legalCoBorrowerValidate;

      yield put(setLegalValidate(legalCoBorrowerValidate));

      if (legalCoBorrowerValidate.position){
        yield put(
          onchangeUseList(legalCoBorrowerValidate.position, {
              declare: ELegalTypeScreen.CO_BRW
            }
          )
        )
      }
      break;

    case declareMapTypeUrl.co_payer:
      const legalCoPayerValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.CO_PAYER)
      );
      isValid = legalCoPayerValidate;
      yield put(setLegalValidate(legalCoPayerValidate));

      if (legalCoPayerValidate.position){
        yield put(
          onchangeUseList(legalCoPayerValidate.position, {
              declare: ELegalTypeScreen.CO_PAYER
            }
          )
        )
      }
      break;

    case declareMapTypeUrl.legal_related:
      const legalLrtValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.LAW_RLT)
      );
      isValid = legalLrtValidate;
      yield put(setLegalValidate(legalLrtValidate));

      if (legalLrtValidate.position){
        yield put(
          onchangeUseList(legalLrtValidate.position, {
              declare: ELegalTypeScreen.LAW_RLT
            }
          )
        )
      }

      break;

    case declareMapTypeUrl.contact:
      const legalContactValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.REALTED)
      );
      isValid = legalContactValidate;
      yield put(setLegalValidate(legalContactValidate));

      if (legalContactValidate.position){
        yield put(
          onchangeUseList(legalContactValidate.position, {
              declare: ELegalTypeScreen.REALTED
            }
          )
        )
      }
      break;

    case declareMapTypeUrl.other:
      const otherValidate: ILOANNormalStorageLegalValidate = yield select(
        validateLOANNormalStorageLegal(ELegalTypeScreen.OTHER)
      );
      isValid = otherValidate;
      yield put(setLegalValidate(otherValidate));

      if (otherValidate.position){
        yield put(
          onchangeUseList(otherValidate.position, {
              declare: ELegalTypeScreen.OTHER
            }
          )
        )
      }
      break;
    default: 
      isValid = {valid: true}
      break;
  }

  return isValid;
}

function* callSuccessUpdateStored(data: unknown, declare: string){
  switch(declare){
    case declareMapTypeUrl.borrower:
      yield put(notify('Lưu thành công thông tin người vay chính', { options: { variant: 'success' } }));
      yield put(updateLegalResBorrower(data as ILOANNormalLegalBorrower, declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalBorrower, "BORROWER"))
      yield put(setLegalValidate({valid: true}));
      break;

    case declareMapTypeUrl.marriage:
      yield put(notify('Lưu thành công thông tin người hôn phối', { options: { variant: 'success' } }));
      yield put(updateLegalResBorrower(data as ILOANNormalLegalBorrower, declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalBorrower, "MARRIAGE"))

      yield put(setLegalValidate({valid: true}));
      break;

    case declareMapTypeUrl.co_borrower:
      yield put(notify('Lưu thành công thông tin người đồng vay', { options: { variant: 'success' } }));
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[], declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalBorrower[], "CO_BRW"))

      yield put(setLegalValidate({valid: true}));
      break;

    case declareMapTypeUrl.co_payer:
      yield put(notify('Lưu thành công thông tin người đồng trả nợ', { options: { variant: 'success' } }));
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[], declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalBorrower[], "CO_PAYER"))

      break;

    case declareMapTypeUrl.legal_related:
      yield put(notify('Lưu thành công thông tin người liên quan', { options: { variant: 'success' } }));
      yield put(updateLegalResListLegalRelated(data as ILOANNormalLegalReLrt[], declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalReLrt[], "LAW_RLT"))

      yield put(setLegalValidate({valid: true}));
      break;

    case declareMapTypeUrl.contact:
      yield put(notify('Lưu thành công thông tin người liên hệ', { options: { variant: 'success' } }));
      yield put(updateLegalResListLegalContact( data as ILOANNormalLegalRelated, declare));
      yield put(setLegalValidate({valid: true}));
      break;

    case declareMapTypeUrl.other:
      yield put(notify('Lưu thành công thông tin đối tượng khác', { options: { variant: 'success' } }));
      yield put(updateLegalResListCoBorrower(data as ILOANNormalLegalBorrower[], declare));
      yield put(updateLegalToCIC(data as ILOANNormalLegalBorrower[], "OTHER"))
    
      yield put(setLegalValidate({valid: true}));
      break;
  }
}

function* changeActiveUserList(declare: string, dataStored: ILOANNormalStorageLegalState){
  let uuidUserActive: string | undefined = undefined;
  switch(declare){
    case declareMapTypeUrl.borrower:
      uuidUserActive = undefined;
      break;

    case declareMapTypeUrl.marriage:
      uuidUserActive = undefined;
      break;

    case declareMapTypeUrl.co_borrower:
      const activeUser = dataStored.data.CO_BRW.uuidActiveLocal;
      const dataInfo = dataStored.data.CO_BRW.info;
      if(dataInfo.length > 1){
        const index = dataInfo.findIndex(d => d.uuidActiveLocal === activeUser);

        if(index < dataInfo.length){
          uuidUserActive = dataInfo.find((d, ind ) => {
            if(ind === index + 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }
      }
      break;

    case declareMapTypeUrl.co_payer:
      const activeUserCoPayer = dataStored.data.CO_PAYER.uuidActiveLocal;
      const dataInfoCoPayer = dataStored.data.CO_PAYER.info;
      if(dataInfoCoPayer.length > 1){
        const index = dataInfoCoPayer.findIndex(d => d.uuidActiveLocal === activeUserCoPayer);

        if(index < dataInfoCoPayer.length){
          uuidUserActive = dataInfoCoPayer.find((d, ind ) => {
            if(ind === index + 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserCoPayer, { declare:declare }));
      }
      break;

    case declareMapTypeUrl.legal_related:
      const activeUserLawRlt = dataStored.data.LAW_RLT.uuidActiveLocal;
      const dataInfoLawRlt = dataStored.data.LAW_RLT.info;
      if(dataInfoLawRlt.length > 1){
        const index = dataInfoLawRlt.findIndex(d => d.uuidActiveLocal === activeUserLawRlt);

        if(index < dataInfoLawRlt.length){
          uuidUserActive = dataInfoLawRlt.find((d, ind ) => {
            if(ind === index + 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserLawRlt, { declare:declare }));
      }
      break;

    case declareMapTypeUrl.contact:
      const activeUserRelated = dataStored.data.RELATED.uuidActiveLocal;
      const dataInfoRelated = dataStored.data.RELATED.info;
      if(dataInfoRelated.length > 1){
        const index = dataInfoRelated.findIndex(d => d.uuidActiveLocal === activeUserRelated);

        if(index < dataInfoRelated.length){
          uuidUserActive = dataInfoRelated.find((d, ind ) => {
            if(ind === index + 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserRelated, { declare: declare }));
      }
      break;

    case declareMapTypeUrl.other:
      const activeUserOther = dataStored.data.OTHER.uuidActiveLocal;
      const dataInfoOther = dataStored.data.OTHER.info;
      if(dataInfoOther.length > 1){
        const index = dataInfoOther.findIndex(d => d.uuidActiveLocal === activeUserOther);

        if(index < dataInfoOther.length){
          uuidUserActive = dataInfoOther.find((d, ind ) => {
            if(ind === index + 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ?? "", { declare:declare }));
      }
      break;
  }

  return uuidUserActive
}

// eslint-disable-next-line require-yield
function* isCheckDataUserActiveFinalBack(declare: string, dataStored: ILOANNormalStorageLegalState){
  const activeUser = dataStored.data[declare].uuidActiveLocal;
  const dataInfo = dataStored.data[declare].info;
  const checkData = dataInfo.find((data, ind) => ind === 0)?.uuidActiveLocal ?? "";
  
  if (activeUser === checkData){
    return true;
  }
  else {
    return false
  }
}

function* changeActiveUserListBack(declare: string, dataStored: ILOANNormalStorageLegalState){
  let uuidUserActive: string | undefined = undefined;
  switch(declare){
    case declareMapTypeUrl.borrower:
      uuidUserActive = undefined;
      break;

    case declareMapTypeUrl.marriage:
      uuidUserActive = undefined;
      break;

    case declareMapTypeUrl.co_borrower:
      const activeUser = dataStored.data.CO_BRW.uuidActiveLocal;
      const dataInfo = dataStored.data.CO_BRW.info;
      if(dataInfo.length > 1){
        const index = dataInfo.findIndex(d => d.uuidActiveLocal === activeUser);

        if(index < dataInfo.length){
          uuidUserActive = dataInfo.find((d, ind ) => {
            if(ind === index - 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }
      }
      break;

    case declareMapTypeUrl.co_payer:
      const activeUserCoPayer = dataStored.data.CO_PAYER.uuidActiveLocal;
      const dataInfoCoPayer = dataStored.data.CO_PAYER.info;
      if(dataInfoCoPayer.length > 1){
        const index = dataInfoCoPayer.findIndex(d => d.uuidActiveLocal === activeUserCoPayer);

        if(index < dataInfoCoPayer.length){
          uuidUserActive = dataInfoCoPayer.find((d, ind ) => {
            if(ind === index - 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserCoPayer, { declare:declare }));
      }
      break;

    case declareMapTypeUrl.legal_related:
      const activeUserLawRlt = dataStored.data.LAW_RLT.uuidActiveLocal;
      const dataInfoLawRlt = dataStored.data.LAW_RLT.info;
      if(dataInfoLawRlt.length > 1){
        const index = dataInfoLawRlt.findIndex(d => d.uuidActiveLocal === activeUserLawRlt);

        if(index < dataInfoLawRlt.length){
          uuidUserActive = dataInfoLawRlt.find((d, ind ) => {
            if(ind === index - 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserLawRlt, { declare:declare }));
      }
      break;

    case declareMapTypeUrl.contact:
      const activeUserRelated = dataStored.data.RELATED.uuidActiveLocal;
      const dataInfoRelated = dataStored.data.RELATED.info;
      if(dataInfoRelated.length > 1){
        const index = dataInfoRelated.findIndex(d => d.uuidActiveLocal === activeUserRelated);

        if(index < dataInfoRelated.length){
          uuidUserActive = dataInfoRelated.find((d, ind ) => {
            if(ind === index - 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ? uuidUserActive : activeUserRelated, { declare: declare }));
      }
      break;

    case declareMapTypeUrl.other:
      const activeUserOther = dataStored.data.OTHER.uuidActiveLocal;
      const dataInfoOther = dataStored.data.OTHER.info;
      if(dataInfoOther.length > 1){
        const index = dataInfoOther.findIndex(d => d.uuidActiveLocal === activeUserOther);

        if(index < dataInfoOther.length){
          uuidUserActive = dataInfoOther.find((d, ind ) => {
            if(ind === index - 1){
              return d
            }
            return undefined
          })?.uuidActiveLocal ?? undefined
        }

        yield put(onchangeUseList(uuidUserActive ?? "", { declare:declare }));
      }
      break;
  }

  return uuidUserActive
}

function* handleBack(action: PayloadAction<number>){
  try{
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    
    const lostUuid = params[1];
    const declareSteptLegal = ["BORROWER", "MARRIAGE","CO_BRW", "CO_PAYER", "LAW_RLT", "RELATED", "OTHER"];
    const declareCheckedStored = params[0].data.BORROWER?.info[0]?.declare.concat("BORROWER") ?? ["BORROWER"];

    let isCheckSteptFinal = false;
    
    let isDeclareNameCheked = true;
    let isCheckActiveFinal: boolean = true;
    let declateNameBack = "";
    const declareNameCurrent = DeclareName[action.payload + 1];;
    
    yield put(showAppBackdrop());

    let i = action.payload;
    do{
      declateNameBack = declareSteptLegal[i];

      if (declateNameBack){
        isDeclareNameCheked = declareCheckedStored?.indexOf(declateNameBack.replaceAll("-", "_")) === -1 ? false : true;
      }
      else{
        isDeclareNameCheked = true;
      }

      isCheckActiveFinal = yield isCheckDataUserActiveFinalBack(
        pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_")), params[0]
      );
      

      if(!declateNameBack && isCheckActiveFinal){

        /*
        * Stept cuối cùng sẻ dung lại chuyển qua CIC
        * Nếu stept có user kiểm active cuối chưa
        * Nếu chưa sẻ di chuyển đến user tiếp theo
        */
        isCheckSteptFinal = true;
        break;
      }
      else if(isDeclareNameCheked && !isCheckActiveFinal){
        /**
         * Tồn tại stept được check
         * Nếu stept có user kiểm active cuối chưa
         * Nếu chưa sẻ di chuyển đến user tiếp theo
         * 
         */
        break;
      }
      else if(isDeclareNameCheked){
        break;
      }
      else{
        i = i - 1;
      }

    }while(i <= declareSteptLegal.length)



    if(!declateNameBack && isCheckSteptFinal){
      yield put(setAppNavigate(`/loan/normal/init/${lostUuid}/cic/other/borrower`));
    }
    else if(!isCheckActiveFinal){
      /**
       * Change active user tiếp theo
       * 
       */
      const declareNameChangeActive = pathUrlToDeclareLegalStored(declareNameCurrent.replaceAll("-", "_"));
      const activeUserList: string | undefined = yield changeActiveUserListBack( declareNameChangeActive, params[0]);

      if(activeUserList){
        yield put(onchangeUseList(activeUserList, {declare: declareNameChangeActive} ));
      }
    }
    else{
      yield put(setAppNavigate(`/loan/normal/init/${lostUuid}/legal/${pathNameLegalStoredToUrl(declateNameBack)}`));
    }

    yield put(closeAppBackdrop());
  }
  catch(error){
    yield put(closeAppBackdrop());
  }
}

function* handleDeleteFile (action:{
  payload: string,
  type: string,
  meta: { declare:string, uuidFileActive:string}}
  ){
    try{
      yield put(showAppBackdrop());
      const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)
      if(action.payload.includes(PREFIX_LOCAL)) return;
      const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
     
      switch (action.meta.declare) {
        case "BORROWER":{
          const r: IApiResponse<unknown> = yield call(saveLegalBorrowerAPI, ...params, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "borrower"))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "MARRIAGE":{
          const r: IApiResponse<unknown> = yield call(saveLegalMarriageAPI, ...params, "marriage");
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "marriage"))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "CO_BRW":{
          const r: IApiResponse<unknown> = yield call(saveLegalCoBorrowerAPI, ...params);
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-borrower"))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "CO_PAYER":{
          const r: IApiResponse<unknown> = yield call(saveLegalCoPayerAPI, ...params);
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-payer"))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "LAW_RLT":{
          const r: IApiResponse<unknown> = yield call(saveLegalLegalRelatedAPI, ...params);
    
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResListLegalRelated(r.data as ILOANNormalLegalReLrt[], 'legal-related'))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "RELATED":{
          const r: IApiResponse<unknown> = yield call(saveLegalContactAPI, ...params);
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResListLegalContact(r?.data as ILOANNormalLegalRelated, "contact"))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        case "OTHER":{
          const r: IApiResponse<unknown> = yield call(saveLegalOtherAPI, ...params);
          yield put(showAppBackdrop());
          
          if(r.success){
            yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
            yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], 'other'))
          }
          else{
            yield put(notify('Xóa không thành công', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
          break;
        }
        default: return null;
      }
    }
    catch(e){
      yield put(closeAppBackdrop());
    }
    finally{
      yield put(closeAppBackdrop());
    }
};
function* handleSaveUploadFileLegal(action:PayloadAction<ILOANNormalUpload>){
  try {
    const params: [ILOANNormalStorageLegalState ,string, IMasterData] = yield select(getLOANNormalStorageLegalSave);
    const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)
    // let r: IApiResponse<unknown> | null =null;
    const isDelete = action.payload.type === 'delete'
    const successMsg = isDelete ? 'Xóa thành công' : 'Lưu thành công';
    const errorMsg = isDelete ? 'Xóa thất bại' : 'Lưu thất bại'
    switch(action.payload?.declare?.toLocaleUpperCase()){
      case "BORROWER":{
        const r: IApiResponse<unknown> = yield call(saveLegalBorrowerAPI, ...params, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "borrower"))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "MARRIAGE":{
        const r: IApiResponse<unknown> = yield call(saveLegalMarriageAPI, ...params, "marriage");
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResBorrower(r?.data as ILOANNormalLegalBorrower, "marriage"))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "CO_BRW":{
        const r: IApiResponse<unknown> = yield call(saveLegalCoBorrowerAPI, ...params);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-borrower"))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "CO_PAYER":{
        const r: IApiResponse<unknown> = yield call(saveLegalCoPayerAPI, ...params);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], "co-payer"))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "LAW_RLT":{
        const r: IApiResponse<unknown> = yield call(saveLegalLegalRelatedAPI, ...params);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResListLegalRelated(r.data as ILOANNormalLegalReLrt[], 'legal-related'))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "RELATED":{
        const r: IApiResponse<unknown> = yield call(saveLegalContactAPI, ...params);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResListLegalContact(r?.data as ILOANNormalLegalRelated, "contact"))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      case "OTHER":{
        const r: IApiResponse<unknown> = yield call(saveLegalOtherAPI, ...params);
        if(r.success){
          yield put(notify(successMsg, { options: { variant: 'success' } }));
          yield put(updateLegalResListCoBorrower(r?.data as ILOANNormalLegalBorrower[], 'other'))
        }
        else{
          yield put(notify(errorMsg, { options: { variant: 'error' } }));
        }
        break;
      }
      default: return null;
    }
  } catch (error) {
    console.log(error)
  }
}
function* handleUploadMultipleFileLegal(action:PayloadAction<ILOANNormalUpload>){
  yield put(showAppBackdrop());
  yield uploadMultipleFileLegal(action); 
  yield handleSaveUploadFileLegal(action);
  yield put(closeAppBackdrop());
}

const download = ({ filename = '', url = '' }: { filename: string, url: string }) => {
  fetch(url)
  .then(response => response.blob())
  .then(blob => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  })
  .catch(console.error);
}

function* handleDownloadFile(action: PayloadAction<string>) {
  const r: IApiResponse<{
    uuid: string;
    file_url: string;
    file_name: string;
  }[]> = yield call(downloadLegalFile, action.payload);
  if (r.success) {
    r.data?.forEach((file) => {
      download({ filename: decodeURI(file.file_name), url: file.file_url });
    });
    yield put(notify('Tải xuống tập tin thành công', { options: { variant: 'success' } }));
    yield put(closeAppBackdrop());
  }
  else {
    yield put(notify('Tải xuống tập tin không thành công', { options: { variant: 'error' } }));
  }
  yield put(closeAppBackdrop());
}

function* handleFetchCIF(action: PayloadAction<string>) {

  try {
    yield put(showAppBackdrop());
    const r: IApiResponse<ILOANNormalLegalBor> = yield call(getCif, action.payload);
    if(r.success && r.data && !!r.data?.basic_info?.full_name){
      yield put(updateLegalDataFromCif("", { data: r?.data,cif: action.payload}));
      yield put(notify('Tải dữ liệu thành công', { options: { variant: 'success' } }));
    }
    else {
      yield put(notify('Không tìm thấy mã CIF', { options: { variant: 'error' } }));
    }

  } catch (error) {
    console.log(error);
    yield put(notify('Không tìm thấy mã CIF', { options: { variant: 'error' } }));
  }
  finally {
    yield put(closeAppBackdrop());
  }
  // if (r.success) {
  //   r.data?.forEach((file) => {
  //     download({ filename: decodeURI(file.file_name), url: file.file_url });
  //   });
  //   yield put(notify('Tải xuống tập tin thành công', { options: { variant: 'success' } }));
  //   yield put(closeAppBackdrop());
  // }
  // else {
  //   yield put(notify('Tải xuống tập tin không thành công', { options: { variant: 'error' } }));
  // }
  yield put(closeAppBackdrop());
}


export default function* storageLegalSaga() {
  yield takeEvery(deleteDataLegalAllFile.type, handleDeleteFile);
  yield takeEvery(deleteDataChildFile.type, handleDeleteFile);
  yield takeEvery(deleteDataFile.type, handleDeleteFile);
  yield takeEvery(saveLegalBorrower.type, handleSaveLegal);
  yield takeEvery(saveLegalMarriage.type, handleSaveLegalMarriage);
  yield takeEvery(saveLegalCoBorrower.type, handleSaveLegalCoBorrower);
  yield takeEvery(saveLegalCoPayer.type, handleSaveLegalCoPayer);
  yield takeEvery(saveLegalRelated.type, handleSaveLegalLegalRelated);
  yield takeEvery(saveLegalContact.type, handleSaveLegalContact);
  yield takeEvery(saveLegalOther.type, handleSaveLegalOther);
  yield takeEvery(deleteLegal.type, handleDeleteLegal);
  yield takeEvery(deleteLegalUserListByPersonUUID.type, handleLegalDeleteUserLists);
  yield takeEvery(onChangeContinue.type, handleContinue);
  yield takeEvery(uploadLegalFileMulti.type, handleUploadMultipleFileLegal);
  yield takeEvery(downloadLegalFileMulti.type, handleDownloadFile);
  yield takeEvery(onChangeBack.type, handleBack);
  yield takeEvery(fetchCif.type, handleFetchCIF);
  
};

