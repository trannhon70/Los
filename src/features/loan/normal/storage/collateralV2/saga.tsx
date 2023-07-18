import { PayloadAction } from "@reduxjs/toolkit";
import {
  closeAppBackdrop,
  notify,
  setAppNavigate,
  setScrollToBottom,
  showAppBackdrop,
} from "features/app/store/slice";
import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { IApiResponse } from "types";
// import { ILOANNormalState } from "types/models/loan/normal";
import { IMasterData } from "types/models/master-data";
import {
  ICollateralFormGet,
  ILOANNormalCollateralV2State,
  ITypeActionSaveDocumentCollateral,
} from "types/models/loan/normal/storage/CollaretalV2";
import {
  fetchDataUpdateAPIStorageCollateralType,
  fetchListCollateral,
  fetchListCollateralDone,
  mappingAfterUploadCollaretalCertificateDocument,
  postCollaterals,
  removeAllCollaretalCertificateDocument,
  removeCollaretalCertificateDocument,
  removeCollaretalCertificateFile,
  saveCollaretalCertificateDocument,
  setCollateralValidate,
  updateCollaterals,
  deleteAllCollateral,
  postCollateralsIgnore,
  saveCollaretalDocument,
  mappingAfterUploadCollaretalType,
  removeActionCollaretalDocument,
  deleteCollateralItem,
  mappingAfterUploadDataLandCTXD,
  mappingAfterUploadDataLandCTXDGCN,
  mappingAfterUploadSubItemDocument,
  deleleteSubtypeItem,
  removeCollaretalCertificate,
  removeCollaretalHasAuthor,
  removeCollaretalOwner,
  deleteLandGcnQsh,
  removeLandCTXD,
  removeLandAsset,
  removeLandInformationAsset,
  removeLandCTXDType,
  removeCollaretalDepartmentInfo,
  removeCollaretalCertificateDepartment,
  removeCollaretalCertificateMarket,
  removeCollaretalCertificatePerson,
  callRemoveCollaretalCertificatePerson,
  saveCollaretalFile,
  callRemoveLandCertificateInfoUsePurposes,
  removeLandCertificateInfoUsePurposes,
  setOnChangeCollaretalDetailHasAuthor,
  setOriginData,
  addNewItemTypeCollatetal,
  addCollaretalRPRO,
  setCollapseType,
  updateIgnore,
} from "./actions";
import {
  getLOANNormalStorageCollateralsSave,
  ValidateCollateralRestStorage,
  ValidateCollateralStorage,
} from "./selector";
import { 
  deleteCollaterals, 
  saveCollaterals, 
  saveCollateralsGOODS,
  IDeleteParams, 
  handleFetchListCollateral, 
  saveCollateralIgnore, 
  deleteCollateralsItem, 
  deleteCertificatesLandAssets, 
  deleteAuthPersonCertificatesLandAssets, 
  deleteOwnerPersonCertificatesLandAssets, 
  deleteCertificateLandAssetsWrapper, 
  deleteCTXDLandAssetsWrapper,
  deleteLandAssetsWrapper,
  deleteLandCertificatePurpose,
  deleteCTXDGCNLandAssetType,
  deleteApartmentRoom,
  deleteCertificatesApartment,
  deleteCertificatesMarket,
  deleteCertificatesOwnePersonApartment,
  deleteDepartmentCertificatePurpose} from "./api";
import { getLOANNormalLOSuuid } from "../selectors";
import { ILOANNormalStorageCollateralValidate } from "types/models/loan/normal/storage/CollaretalV2";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import {
  ICustom_Keys,
  ILOANNormalDocument,
  ILOANNormalFile,
} from "types/models/loan/normal/configs/Document";
import * as _ from 'lodash';
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import {saveMultipleFile} from 'features/loan/normal/storage/api';
import { PREFIX_LOCAL } from "utils";
import { IUser } from "types/models/Account";
import { getBranchCodeUser } from "../legal/selectors";
export interface IUpdateDeleteParams {
  losuuid: string;
  uuid: string;
}

function* handleSaveCollaterals(action: PayloadAction<{
  type: string, 
  onContinue?: boolean, 
  addCollateral?: boolean,
  addItem?: boolean,
  collapseIndex?: number}>) {
  try {
    // yield put(setNormalStorageOtherValidate({ valid: true }));
    const params: [
      ILOANNormalCollateralV2State,
      string,
      string,
      string,
      IMasterData
      // string
    ] = yield select(getLOANNormalStorageCollateralsSave);

    const valid: ILOANNormalStorageCollateralValidate = yield select(
      ValidateCollateralStorage
    );
    const validRest: ILOANNormalStorageCollateralValidate = yield select(
      ValidateCollateralRestStorage
    );

    // post loai khac ko phai bat dong san
    // 6 type
    if(action.payload.type !== "REST"){
      if(valid.valid){
        const res: IApiResponse<ICollateralFormGet> = yield call(saveCollateralsGOODS, ...params, action.payload.type);
        if (res.success) {
          if (res.data) {
            yield put(
              notify(res.data.valuation_id ? "Đã lưu thành công MCT: " + res.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
            // yield put(updateAPIStorageCollateralType(res.data as ICollateralFormGet[]))
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                res.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
          }
          yield put(setCollateralValidate(valid));
          yield put(closeAppBackdrop());
          if(action.payload.onContinue){
            yield put(setAppNavigate(`/loan/normal/init/${params[3]}/other/exception`))
          }

          if(action.payload.addCollateral){
            yield put(setScrollToBottom(true))
            yield put(addNewItemTypeCollatetal(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.addItem){
            yield put(addCollaretalRPRO(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.collapseIndex !== undefined){
            yield put(setCollapseType(action.payload.collapseIndex))
          }

        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(res.errors[0].detail, { options: { variant: "error" } })
          );
        }
        yield put(setCollateralValidate({ valid: true }));
      } else {
        yield put(closeAppBackdrop());
        if (valid.field === "legal_document_types") {
          yield put(
            notify("Vui lòng chọn loại hồ sơ pháp lý", {
              options: { variant: "warning" },
            })
          );
        } else {
          yield put(
            notify(valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", 
            { options: { variant: "warning" } }
            )
          );
        }
        yield put(setCollateralValidate(valid));
      }
    }
    // type BDS
    else {
      if (validRest.valid) {
        const r: IApiResponse<ICollateralFormGet> = yield call(saveCollaterals, ...params, action.payload.type);
        if (r.success) {
          if (r.data) {
            yield put(
              notify(r.data.valuation_id ? "Đã lưu thành công MCT: " + r.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
            // yield put(updateAPIStorageCollateralType(res.data as ICollateralFormGet[]))
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                r.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
          }
          yield put(setCollateralValidate(validRest));
          yield put(closeAppBackdrop());
          if(action.payload.onContinue){
            yield put(setAppNavigate(`/loan/normal/init/${params[3]}/other/exception`))
          }
          if(action.payload.addCollateral){
            yield put(setScrollToBottom(true))
            yield put(addNewItemTypeCollatetal(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.addItem){
            yield put(addCollaretalRPRO(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.collapseIndex  !== undefined){
            yield put(setCollapseType(action.payload.collapseIndex))
          }

        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(r.errors[0].detail + r.errors[0].loc, {
              options: { variant: "error" },
            })
          );
        }
      } else {
        yield put(closeAppBackdrop());
        yield put(
          notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", {
            options: { variant: "warning" },
          })
        );
        
        yield put(setCollateralValidate(validRest));
      }
    }
  } catch (e) {
    console.log(e)
  } finally {
    yield put(closeAppBackdrop());
  }
}

//handle Save file
function* handleSaveFileCollaterals(action: PayloadAction<string,string, {
  listFile : ILOANNormalDocument[],
  type:'CollaretalType' | 'LandCTXD' | 'LandCTXDGCN' | 'No-RealEstate' | 'Certificate' | 'Authorize',
  extraData?:any,
  isDelete: boolean
}>) {
  const successMsg = action.meta.isDelete ? "Xóa thành công" : "Lưu thành công"
  const errorMsg = action.meta.isDelete ? "Xóa thất bại" : "Lưu thất bại"
  try {
    yield put(showAppBackdrop());
    yield handleSaveCollaretalDocument(
      {
        type: action.type,
        payload: action.meta.listFile,
        meta: _.omit(action.meta, "listFile")
      }
    )
    const params: [
      ILOANNormalCollateralV2State,
      string,
      string,
      string,
      IMasterData
    ] = yield select(getLOANNormalStorageCollateralsSave);
    
    if(action.payload !== "REST"){
      const res: IApiResponse<ICollateralFormGet> = yield call(saveCollateralsGOODS, ...params, action.payload);
      if (res.success) {
        if (res.data) {
          yield put(notify(successMsg, {options: { variant: "success" },}));
          yield put(
            fetchDataUpdateAPIStorageCollateralType(
              res.data as ICollateralFormGet,
              params[0].uuidActiveData
            )
          );
        }
      } else {
        yield put(
          notify(errorMsg, { options: { variant: "error" } })
        );
      }
    }
    // type BDS
    else {
      const r: IApiResponse<ICollateralFormGet> = yield call(saveCollaterals, ...params, action.payload);
      if (r.success) {
        if (r.data) {
          yield put(notify(successMsg, {options: { variant: "success" },}));
          yield put(
            fetchDataUpdateAPIStorageCollateralType(
              r.data as ICollateralFormGet,
              params[0].uuidActiveData
            )
          );
        }
      } else {
        yield put(notify(errorMsg, { options: { variant: "error" } }))
      }
    }
  } catch (e) {
    console.log(e)
    yield put(notify(errorMsg, { options: { variant: "error" } }))
  } finally {
    yield put(closeAppBackdrop());
  }
}

function* handleSaveCollaretalDocument(action:ITypeActionSaveDocumentCollateral){
  const totalDataUploadFile : ILOANNormalFile[] = []

  // eslint-disable-next-line require-yield
  yield uploadMultipleFile(action.payload, function* data(dataUploadFile){totalDataUploadFile.push(...dataUploadFile)});

  yield updateListDocumentAfterUpload(action, totalDataUploadFile)

}

function* uploadMultipleFile(listLocalFiles:ILOANNormalDocument[], callback:(responseData:ILOANNormalFile[])=>void) {
  const listFilesUpload: { docId: string | number | null; fileData: ILOANNormalFile;}[] = [];

  listLocalFiles.forEach((d) => {
    if (d.child_files?.length === 0) return;
    d.child_files?.forEach((file) => {
      if (file.uuid?.includes(PREFIX_LOCAL)) {
        listFilesUpload.push({ docId: d.document_id, fileData: file });
      }
    });
  });

  if (listFilesUpload.length === 0) return;

  yield uploadMultiCollateral(listFilesUpload, callback)

}

function spliceIntoChunks(arr:{docId: string | number | null;fileData: ILOANNormalFile;}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
}
  return res;
}

function* uploadMultiCollateral(listFilesUpload: {docId: string | number | null;fileData: ILOANNormalFile;}[], 
  callback:(data:ILOANNormalFile[])=>void){
  const arrayFile = [...listFilesUpload];
  const listChunkArray = spliceIntoChunks(arrayFile, 10);
  const custom_keys: { [key: number | string]: ICustom_Keys } = {};
  yield* listChunkArray.map(function*(fileAttach){
    let fileIndex = 0;
    let formDataFile = new FormData();
    yield* fileAttach.map(function* (file) {
      const docID = file.docId;
      const fileData = file.fileData;
      if (!fileData || !docID) return;
      try {
        if (fileData.content_type && fileData.name && fileData.file_upload) {
          const resBuf = yield call(fetch, fileData.file_upload ?? "");
          const buf = yield resBuf.arrayBuffer();
          const file: File = new File([buf], fileData.name ?? "", {
            type: fileData.content_type,
          });
          yield _.set(custom_keys, [fileIndex], {
            doc_id: docID ?? '',
            local_uuid: fileData.uuid ?? '',
            description: fileData.description ?? '',
          } as ICustom_Keys);
          yield fileIndex++;
          yield formDataFile.append("files", file);
        }
      } catch (error) {
        console.log("error FETCH FILE", error);
      }
    });
    yield formDataFile.append("custom_keys", JSON.stringify(custom_keys));
    try { 
      const r: IApiResponse<IUploadFileRes[]> = yield call(saveMultipleFile, formDataFile);
      if(r.success){
        const dataResponse: IUploadFileRes[] | null = r?.data ?? [];
        if(dataResponse?.length === 0) return;
        // const user:IUser | undefined = yield select(getBranchCodeUser);
        const dataUploadFile:ILOANNormalFile[]=dataResponse.map((file,index)=>{
          const result:ILOANNormalFile = {
            uuid:file.uuid,
            file_id: index,
            display_order:index,
            created_at: (Number(file.created_at?? 0)),
            name: decodeURI(file.name),
            description: file.custom_keys.description??'',
            content_type: file.content_type,
            created_by: file.created_by,
            created_by_name: file.created_by_name,
            updated_at: file.updated_at,
            updated_by: file.updated_by,
            updated_by_name: file.updated_by_name,
            file_upload: '',
            custom_keys:file.custom_keys,
          };
          return result;
        })
        yield callback(dataUploadFile);
        // const collaretalType = _.get(type,'collaretalType');
        // if(collaretalType){
        //   yield handleUpdateCollaterals({type:updateCollaterals.type,payload:collaretalType});
        // }
        
      }else{
        yield put(notify('Lưu file thất bại', { options: { variant: 'error' } }));
        return;
      }
      
    } catch (error) {
      console.log('error handle upload file legal',error);
      // yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
    }
  })
}

function* updateListDocumentAfterUpload(action: ITypeActionSaveDocumentCollateral, listUploadFile: ILOANNormalFile[]) {

  const newAction = {
    ...action,
    payload : action.payload.map(doc => {
      return {
        ...doc,
        child_files: doc.child_files?.map(file => {
          const newFile = listUploadFile.find(e => e.custom_keys?.local_uuid === file.uuid)
          if(newFile) {
            return newFile
          }
          else return file
        }) ?? null
      }
    })
  }

  switch (action.meta.type) {
    case 'CollaretalType':{
      const uuidActiveData = _.get(action.meta.extraData,'uuidActiveData');
      if(uuidActiveData){
        yield put(mappingAfterUploadCollaretalType(newAction.payload,{uuidActiveData}));
      }
      break;
    }
    case 'LandCTXD':{
      const meta = _.get(action,'meta.extraData');
      if(meta){
        yield put(mappingAfterUploadDataLandCTXD(newAction.payload,meta));
      }
      break;
    }
    case 'LandCTXDGCN':{
      const meta = _.get(action,'meta.extraData');
      if(meta){
        yield put(mappingAfterUploadDataLandCTXDGCN(newAction.payload,meta));
      }
      break;
    }
    case 'No-RealEstate':{
      const meta = _.get(action,'meta.extraData');
      if(meta){
        yield put(mappingAfterUploadSubItemDocument(newAction.payload,meta));
      }
      break;
    }
    case 'Certificate':{
      const meta = _.get(action,'meta.extraData');
      yield put(mappingAfterUploadCollaretalCertificateDocument(newAction.payload, meta));
      break;
    }

    case 'Authorize':{
      const meta = _.get(action,'meta.extraData');
      yield put(setOnChangeCollaretalDetailHasAuthor(newAction.payload, meta));
      break;
    }

    default:
      break;
  };
}

// End Save file

// cập nhật
function* handleUpdateCollaterals(action: PayloadAction<{
  type: string, 
  onContinue?: boolean, 
  addCollateral?: boolean,
  addItem?: boolean,
  collapseIndex?: number}>) {
  try {
    // yield put(setNormalStorageOtherValidate({ valid: true }));
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const params: [
      ILOANNormalCollateralV2State,
      string,
      string,
      string,
      IMasterData
    ] = yield select(getLOANNormalStorageCollateralsSave);
    const valid: ILOANNormalStorageCollateralValidate = yield select(
      ValidateCollateralStorage
    );
    const validRest: ILOANNormalStorageCollateralValidate = yield select(
      ValidateCollateralRestStorage
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // post loai khac ko phai bat dong san
    // update 6 type nho
    if (action.payload.type !== "REST") {
      if (valid.valid) {
        const res: IApiResponse<ICollateralFormGet> = yield call(
          saveCollateralsGOODS,
          ...params,
          action.payload.type
        );
        if (res.success) {
          if (res.data) {
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                res.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
            yield put(
              notify(res.data.valuation_id ? "Đã lưu thành công MCT: " + res.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
          }
          yield put(setCollateralValidate(valid));
          yield put(closeAppBackdrop());
          yield put(fetchListDataHistoryLogs(los_uuid));
          if(action.payload.onContinue){
            yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/other/exception`))
          }

          if(action.payload.addCollateral){
            yield put(setScrollToBottom(true))
            yield put(addNewItemTypeCollatetal(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.addItem){
            yield put(addCollaretalRPRO(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.collapseIndex !== undefined){
            yield put(setCollapseType(action.payload.collapseIndex))
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(res.errors[0].detail, { options: { variant: "error" } })
          );
        }
        yield put(setCollateralValidate({ valid: true }));
      } else {
        yield put(closeAppBackdrop());
        if (valid.field === "legal_document_types") {
          yield put(
            notify("Vui lòng chọn loại hồ sơ pháp lý", {
              options: { variant: "warning" },
            })
          );
        } else {
          yield put(
            notify(valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", 
            { options: { variant: "warning" } }
            )
          );
        }
        yield put(setCollateralValidate(valid));
      }
    } else {
      if (validRest.valid) {
        const r: IApiResponse<ICollateralFormGet> = yield call(
          saveCollaterals,
          ...params,
          action.payload.type
        );
        if (r.success) {
          if (r.data) {
            yield put(
              fetchDataUpdateAPIStorageCollateralType(
                r.data as ICollateralFormGet,
                params[0].uuidActiveData
              )
            );
            yield put(
              notify(r.data.valuation_id ? "Đã lưu thành công MCT: " + r.data.valuation_id : 'Đã lưu thành công TSBĐ', {
                options: { variant: "success" },
              })
            );
          }
          yield put(setCollateralValidate(validRest));
          yield put(closeAppBackdrop());
          yield put(fetchListDataHistoryLogs(los_uuid));
          if(action.payload.onContinue){
            yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/other/exception`))
          }
          if(action.payload.addCollateral){
            yield put(setScrollToBottom(true))
            yield put(addNewItemTypeCollatetal(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.addItem){
            yield put(addCollaretalRPRO(''))
            yield put(notify("Thêm tài sản thành công", {
              options: { variant: "success" },
            }));
          }

          if(action.payload.collapseIndex !== undefined){
            yield put(setCollapseType(action.payload.collapseIndex))
          }

        } else {
          yield put(closeAppBackdrop());
          yield put(
            notify(r.errors[0].detail, { options: { variant: "error" } })
          );
        }
      } else {
        yield put(closeAppBackdrop());
        yield put(
          notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", {
            options: { variant: "warning" },
          })
        );
        yield put(setCollateralValidate(validRest));


      }
    }
  } catch (e) {
    console.log(e);
    yield put(closeAppBackdrop());
  } finally {
    yield put(closeAppBackdrop());
  }
}
function* handleDeleteCollaterals(action: PayloadAction<IDeleteParams>) {
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try {
    if (action.payload.cert_uuid) {
      const rsDelete: IApiResponse<unknown> = yield call(
        deleteCollaterals,
        los_uuid,
        action.payload.cert_uuid
      );
      if (rsDelete.success) {
        yield put(
          notify("Xóa thành công tài sản", { options: { variant: "success" } })
        );
        yield put(setOriginData())
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
        yield put(closeAppBackdrop());
      }
    } else {
      yield put(
        notify("Xóa thành công tài sản", { options: { variant: "success" } })
      );
      yield put(closeAppBackdrop());
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleFetchListCollateralSaga() {
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  const res: IApiResponse<unknown> = yield call(
    handleFetchListCollateral,
    los_uuid
  );
  yield put(fetchListCollateralDone());
  try {
    if (res.success) {
      // yield put(fetchListCollateral())
    }
  } catch (e) {
    yield put(fetchListCollateralDone());
    console.log(e);
  }
}

type IActionUploadFile = PayloadAction<
  ILOANNormalDocument[],
  string,
  {
    uuidActiveData: string;
    uuidActiveSubtype: string;
    uuidActiveitems: string;
    uuidActiveCertificate: string;
  }
>;
interface IUploadFileRes extends IUploadFile{
  custom_keys:ICustom_Keys
}

type IActionSave = PayloadAction<any,string,{
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  uuidActiveCertificate: string;
}>;

function* handleSaveDocument(action:IActionSave){
  if(!action?.meta) return;
  const uuidActiveCertificate = _.get(action,'meta.uuidActiveCertificate','');
  if(uuidActiveCertificate.includes(PREFIX_LOCAL)) return;
  yield handleUpdateCollaterals({type:updateCollaterals.type,payload:{type: "REST"}})
}

function* handleUploadMultipleFileLegal(action: IActionUploadFile) {
  yield put(showAppBackdrop());
  yield uploadMultipleFile(action.payload,function* data(dataUploadFile){
    // yield put(mappingAfterUploadCollaretalCertificateDocument(dataUploadFile, action.meta));
  });
  yield handleSaveDocument(action as IActionSave);
  yield put(closeAppBackdrop());
}

function* handleRemoveDocument(action:PayloadAction<string,string,any>){
  if(action?.payload?.includes(PREFIX_LOCAL)) return;
  yield put(showAppBackdrop());
  yield handleSaveDocument(action);
  yield put(closeAppBackdrop());
}

function* handleSaveCollateralIgnore(action: PayloadAction<string>){
  const los_uuid:string = yield select(getLOANNormalLOSuuid)
  // const params: [
  //   ILOANNormalCollateralV2State,
  //   string,
  //   string,
  //   string,
  //   IMasterData,
  // ] = yield select(getLOANNormalStorageCollateralsSave);
  yield put(showAppBackdrop())
  const res: IApiResponse<unknown> = yield call(saveCollateralIgnore, action.payload,los_uuid);
  try{
    if(res.success){
      yield put(updateIgnore(action.payload))
      yield put(setOriginData())
      yield put( notify("Lưu thành công", { options: { variant: "success" } }) );
      yield put(closeAppBackdrop())
    }
    else {
      yield put( notify("Lưu thất bại", { options: { variant: "error" } }) );
      yield put(closeAppBackdrop())
    }
  }
  catch(e){
    yield put(fetchListCollateralDone())
    yield put(closeAppBackdrop())
    console.log(e);
  }
}

function* handleRemoveActionCollaretalDocument(action:{type:string,payload:string}){
  if(action.payload.includes(PREFIX_LOCAL)) return;
  yield put(showAppBackdrop());
  const collaretalType = _.get(action,'meta.extraData.collaretalType');
  if(collaretalType){
    yield handleUpdateCollaterals({type:updateCollaterals.type,payload:collaretalType});
  }
  yield put(closeAppBackdrop());
}

/// delete collateral item 

function* handleDeleteCollateralItem(action: PayloadAction<string,string, {
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  uuidData: string;
  uuidSubType: string;
}>) {
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try {
    if (action.payload) {
      const rsDeleteItem: IApiResponse<unknown> = yield call(deleteCollateralsItem, los_uuid,action.meta.price_cert_uuid, action.meta.price_cert_asset_uuid);
      if (rsDeleteItem.success) {
        yield put(deleleteSubtypeItem(action.payload,{ uuidData: action.meta.uuidData, uuidSubType: action.meta.uuidSubType}));
        yield put(
          notify("Xóa thành công tài sản", { options: { variant: "success" } })
        );
        yield put(setOriginData())
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
        yield put(closeAppBackdrop());
      }
    } 
  } catch (e) {
    console.log(e);
  }
}
//  Xóa giấy chứng trong BDS
function* handleDeleteCertificatedLandAsset(action:PayloadAction<string,string, {
  type: string;
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  land_const_uuid: string;
  land_const_item_cert_uuid: string;
  land_cert_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        && (action.meta.land_const_item_cert_uuid !== "" || action.meta.land_cert_uuid !== "")){
      const rs: IApiResponse<unknown> = yield call(deleteCertificatesLandAssets, 
        action.meta.type,
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_uuid,
        action.meta.land_const_item_cert_uuid,
        action.meta.land_cert_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.land_const_item_cert_uuid === "" || action.meta.land_cert_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}
//  Xóa Loaij ctxd gcn qsh
function* handleDeleteCertificatedLandAssetType(action:PayloadAction<string,string, {
  type: string;
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  land_const_uuid: string;
  land_const_item_uuid: string;
  land_const_item_detail_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    console.log(action.meta,'action.metaaaaaaaaaa')
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        && (action.meta.land_const_uuid !== "" || action.meta.land_const_item_uuid !== "") 
        && (action.meta.land_const_item_detail_uuid !== "" )){
      const rs: IApiResponse<unknown> = yield call(deleteCTXDGCNLandAssetType, 
        action.meta.type,
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_uuid,
        action.meta.land_const_item_uuid,
        action.meta.land_const_item_detail_uuid,
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.land_const_item_detail_uuid === "" || action.meta.land_const_item_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}
// Xóa người được ủy quyền trong đối tượng sở hữu CTXD có GCN QSH riêng
function* handleDeleteAuthPersonCertificatedLandAsset(action:PayloadAction<string,string, {
  type: string;
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  land_const_uuid: string;
  owner_uuid: string;
  owner_auth_uuid: string
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  console.log(action.meta,',metaaaaaa')
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        && action.meta.owner_auth_uuid !== ""){
      const rs: IApiResponse<unknown> = yield call(deleteAuthPersonCertificatesLandAssets, 
        action.meta.type,
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_uuid,
        action.meta.owner_uuid,
        action.meta.owner_auth_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.owner_auth_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

//Xóa người sở hữu CTXD có GCN QSH riêng
function* handleDeleteOwnerCertificatedLandAsset(action:PayloadAction<string,string, {
  type: string;
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  land_const_uuid: string;
  owner_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        // && action.meta.land_const_uuid !== "" 
        && action.meta.owner_uuid !== "" 
        ){
      const rs: IApiResponse<unknown> = yield call(deleteOwnerPersonCertificatesLandAssets, 
        action.meta.type,
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_uuid,
        action.meta.owner_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.owner_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa CTXD có GCN QSH riêng
function* handleDeleteCertificatedLandAssetWrapper(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  land_const_uuid: string;
  isNoti:boolean
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{

    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        && action.meta.land_const_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteCertificateLandAssetsWrapper, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_uuid,
        );
      if(rs.success){
        if(action.meta.isNoti){
          yield put(
            notify("Xóa thành công", { options: { variant: "success" } })
          );
        }
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.land_const_uuid === ""){
      if(action.meta.isNoti){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
      }
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa CTXD trên đất trong danh sách thông tin pháp lý CTXD(CUC 2)
function* handleDeleteCTXDLandAssetWrapper(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  land_const_item_uuid : string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" 
        && action.meta.land_const_item_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteCTXDLandAssetsWrapper, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.land_const_item_uuid,
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.land_const_item_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa đối tượng CTXD trên đất trong tài sản BDS
function* handleDeleteLandAssetWrapper(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  land_const_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    console.log(action.meta,'action.meta.action.meta.')
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== "" && action.meta.land_const_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteLandAssetsWrapper, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.land_const_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa mục đích sửa dụng đất trong thông tin đất
function* handleDeleteLandCertificatePurpose(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  re_land_used_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && action.meta.re_land_used_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteLandCertificatePurpose, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.re_land_used_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.re_land_used_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa căn hộ trong Thông tin căn hộ
function* handleDeleteApartmentRoom(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  apart_room_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && action.meta.apart_room_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteApartmentRoom, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.apart_room_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.apart_room_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}
// Xóa mục đích sửa dụng đất trong thông tin chung cư
function* handleDeleteDepartmentCertificatePurpose(action:PayloadAction<string,string, {
  uuidData: string;
  uuidSubType: string;
  uuidItem: string;
  price_cert_uuid: string;
  price_cert_asset_uuid: string;
  apart_land_used_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && action.meta.apart_land_used_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteDepartmentCertificatePurpose, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.apart_land_used_uuid
        );
      if(rs.success){
        yield put(removeLandCertificateInfoUsePurposes(action.payload,
          {
            uuidData: action.meta.uuidData,
            uuidSubType: action.meta.uuidSubType,
            uuidItem: action.meta.uuidItem,
          }
        ))
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.apart_land_used_uuid === ""){
      yield put(removeLandCertificateInfoUsePurposes(action.payload,
        {
          uuidData: action.meta.uuidData,
          uuidSubType: action.meta.uuidSubType,
          uuidItem: action.meta.uuidItem,
        }
      ))
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa giấy chứng nhận trong Thông tin pháp lý giấy chứng nhận Chung Cư
function* handleDeleteCertificateApartment(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  apart_owner_cert_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && action.meta.apart_owner_cert_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteCertificatesApartment, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.apart_owner_cert_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.apart_owner_cert_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa người sở hữu trong Thông Tin Pháp Lý Giấy Chứng Nhận Chung Cư
function* handleDeleteCertificateOwnerPersonApartment(action:PayloadAction<string,string, {
  type: string;
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  uuidActiveCer: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  apart_owner_cert_uuid: string;
  apart_owner_cert_item_uuid: string;
  market_cert_uuid: string;
  market_cert_item_uuid: string;
  land_const_uuid: string;
  land_const_item_cert_uuid: string;
  land_const_item_cert_item_uuid: string;
  land_cert_uuid: string;
  re_land_cert_item_uuid: string;

}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    console.log(action.meta, 'meetaa')
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && (action.meta.apart_owner_cert_item_uuid !== "" 
        || action.meta.market_cert_item_uuid !== ""
        || action.meta.land_const_item_cert_item_uuid !== ""
        || action.meta.re_land_cert_item_uuid !== "")
        ){
      const rs: IApiResponse<unknown> = yield call(deleteCertificatesOwnePersonApartment, 
        action.meta.type,
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.apart_owner_cert_uuid,
        action.meta.apart_owner_cert_item_uuid,
        action.meta.market_cert_uuid,
        action.meta.market_cert_item_uuid,
        action.meta.land_const_uuid,
        action.meta.land_const_item_cert_uuid,
        action.meta.land_const_item_cert_item_uuid,
        action.meta.land_cert_uuid,
        action.meta.re_land_cert_item_uuid
        );
      if(rs.success){
        yield put(removeCollaretalCertificatePerson(action.payload,
          {
            uuidActiveData: action.meta.uuidActiveData,
            uuidActiveSubtype: action.meta.uuidActiveSubtype,
            uuidActiveitems: action.meta.uuidActiveitems,
            uuidActiveCer: action.meta.uuidActiveCer
          }
        ))
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.apart_owner_cert_item_uuid === "" 
      || action.meta.market_cert_item_uuid === ""
      || action.meta.land_const_item_cert_item_uuid === ""
      || action.meta.re_land_cert_item_uuid === ""){
      yield put(removeCollaretalCertificatePerson(action.payload,
        {
          uuidActiveData: action.meta.uuidActiveData,
          uuidActiveSubtype: action.meta.uuidActiveSubtype,
          uuidActiveitems: action.meta.uuidActiveitems,
          uuidActiveCer: action.meta.uuidActiveCer
        }
      ))
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}

// Xóa giấy chứng nhận trong Thông tin pháp lý giấy chứng nhận Chợ
function* handleDeleteCertificateMarket(action:PayloadAction<string,string, {
  uuidActiveData: string;
  uuidActiveSubtype: string;
  uuidActiveitems: string;
  price_cert_uuid: string; 
  price_cert_asset_uuid: string;
  market_cert_uuid: string;
}>){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  try{
    if(action.meta.price_cert_uuid !== "" 
        && action.meta.price_cert_asset_uuid !== ""
        && action.meta.market_cert_uuid !== ""
        ){
      const rs: IApiResponse<unknown> = yield call(deleteCertificatesMarket, 
        los_uuid, 
        action.meta.price_cert_uuid, 
        action.meta.price_cert_asset_uuid,
        action.meta.market_cert_uuid
        );
      if(rs.success){
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(setOriginData())
      }else{
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
      }
    }else if(action.meta.market_cert_uuid === ""){
      yield put(
        notify("Xóa thành công", { options: { variant: "success" } })
      );
    }else{
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
  }catch(e){

  }
  finally{
    yield put(closeAppBackdrop());
  }
}
export default function* storageCollateralsSaga() {
  yield takeEvery(fetchListCollateral.type,handleFetchListCollateralSaga);
  yield takeEvery(fetchListCollateral.type, handleFetchListCollateralSaga);

  yield takeEvery(postCollaterals.type, handleSaveCollaterals);
  yield takeEvery(saveCollaretalFile.type, handleSaveFileCollaterals);
  
  yield takeEvery(saveCollaretalCertificateDocument.type,handleUploadMultipleFileLegal);
  yield takeLeading(postCollateralsIgnore.type,handleSaveCollateralIgnore);
  yield takeEvery(saveCollaretalDocument.type,handleSaveCollaretalDocument);
  
  yield takeEvery(updateCollaterals.type, handleUpdateCollaterals);

  yield takeLeading(removeActionCollaretalDocument.type,handleRemoveActionCollaretalDocument);
  yield takeLeading(deleteAllCollateral.type, handleDeleteCollaterals);
  yield takeLeading(removeCollaretalCertificateDocument.type,handleRemoveDocument);
  yield takeLeading(removeAllCollaretalCertificateDocument.type,handleRemoveDocument);
  yield takeLeading( removeCollaretalCertificateFile.type,handleRemoveDocument);
  yield takeLeading(deleteCollateralItem.type,handleDeleteCollateralItem);
  yield takeLeading(removeCollaretalCertificate.type,handleDeleteCertificatedLandAsset);
  yield takeLeading(removeCollaretalHasAuthor.type,handleDeleteAuthPersonCertificatedLandAsset);
  yield takeLeading(removeCollaretalOwner.type,handleDeleteOwnerCertificatedLandAsset);
  yield takeEvery(deleteLandGcnQsh.type,handleDeleteCertificatedLandAssetWrapper);
  yield takeLeading(removeLandCTXD.type,handleDeleteCTXDLandAssetWrapper);
  yield takeLeading(removeLandAsset.type,handleDeleteLandAssetWrapper);
  yield takeLeading(removeLandInformationAsset.type,handleDeleteLandCertificatePurpose);
  yield takeLeading(removeLandCTXDType.type,handleDeleteCertificatedLandAssetType)
  yield takeLeading(removeCollaretalDepartmentInfo.type,handleDeleteApartmentRoom)
  yield takeLeading(removeCollaretalCertificateDepartment.type,handleDeleteCertificateApartment)
  yield takeLeading(removeCollaretalCertificateMarket.type,handleDeleteCertificateMarket)
  yield takeLeading(callRemoveCollaretalCertificatePerson.type,handleDeleteCertificateOwnerPersonApartment)
  yield takeLeading(callRemoveLandCertificateInfoUsePurposes.type,handleDeleteDepartmentCertificatePurpose)
  
}
