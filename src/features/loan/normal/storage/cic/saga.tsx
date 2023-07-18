import { PayloadAction } from "@reduxjs/toolkit";
import {
  closeAppBackdrop,
  notify,
  setAppNavigate,
  showAppBackdrop
} from "features/app/store/slice";
import _ from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IUser } from "types/models/Account";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import {
  CUSTOM_KEY_FILE,
  ICICDataAPI,
  ICICDeclareDataAPI,
  ICICNormalStorageCICValidate,
  ICICNormalStorageLegalCustomDetail,
  ILOANNormalAllCreditDeleteInfo,
  ILOANNormalCICUpload,
  ILOANNormalCreditDeleteInfo,
  ILOANNormalCreditDetailDeleteInfo,
  ILOANNormalStorageCICDocumentChildFile,
  ILOANNormalStorageCICDocumentList,
  ILOANNormalStorageCICOther,
  ILOANNormalStorageCICState
} from "types/models/loan/normal/storage/CIC";
import { ILOANNormalStorageLegalState } from "types/models/loan/normal/storage/Legal";
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import { IMasterData } from "types/models/master-data";
import { checkIsLocalUUID, PREFIX_LOCAL } from "utils";
import { cicOrganRouter, cicRouterNormal } from "views/pages/LOAN/utils";
import { getRuleDisbled } from "../../storageGuide/selector";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getBranchCodeUser } from "../legal/selectors";
import { getLOANNormalLOSuuid } from "../selectors";
import {
  deleteAllCreditCIC, deleteAllCreditCICLocal, deleteAllCreditCICStoreFull, deleteChildFile,
  deleteCreditCIC,
  deleteCreditCICLocal,
  deleteCreditCICStoreFull,
  deleteCreditDetailCIC,
  deleteCreditDetailCICLocal,
  deleteCreditDetailCICStoreFull,
  deleteDocument,
  deleteDocumentGroup,
  deleteDocumentInfoList,
  fetchDataCICAfterSave, focusInvalidIdentity, handleContinueCIC,
  mappingCICDataFileAlterUpload,
  saveLOANNormalCIC,
  setCICDeclarePosition,
  setCICValidate, setHasCreditCIC, updateAPIStorageCIC,
  updateCICresponseSave,
  uploadCICFileMulti
} from "./actions";
import {
  deleteAllCreditCICAPI,
  deleteCreditCICAPI,
  deleteCreditDetailCICAPI,
  getFullCICAfterSaveAPI,
  saveCICAPI,
  saveCICFile
} from "./api";
import {
  checkHasSavedCreditCIC,
  getLOANNormalStorageCICDeclare,
  getLOANNormalStorageCICPosition,
  getLOANNormalStorageCICSave, validateLOANNormalStorageCIC
} from "./selectors";

function* handleSaveCIC(
  action: PayloadAction<boolean, string, { organ: string, position: string }>
) {
  try {
    if (action.meta.organ === "rating-review") {
      yield put(showAppBackdrop());
      yield put(
        notify(" Lưu thành công ", { options: { variant: "success" } })
      );
      yield put(closeAppBackdrop());
    } else {
      const los_uuid: string = yield select(getLOANNormalLOSuuid);
      const params: [
        ILOANNormalStorageCICState,
        string[],
        string,
        IMasterData,
        ILOANNormalConfigState
      ] = yield select(getLOANNormalStorageCICSave);
      const valid: ICICNormalStorageCICValidate = yield select(
        validateLOANNormalStorageCIC
      );
      
      yield put(showAppBackdrop());
      if (valid.valid) {
        const r: IApiResponse<unknown> = yield call(saveCICAPI, ...params, action.meta.position);

        if (r.success) {
          yield put(
            notify(" Lưu thành công ", { options: { variant: "success" } })
          );
          yield put(setCICValidate(valid));

          if (r.data)
            yield put(updateCICresponseSave(r.data as ICICDeclareDataAPI));

          yield put(closeAppBackdrop());
          yield put(fetchListDataHistoryLogs(los_uuid));
        } else {
          yield put(
            notify("Vui lòng kiểm tra lại dữ liệu", {
              options: { variant: "error" },
            })
          );
          yield put(closeAppBackdrop());
        }
      } else {
        yield put(focusInvalidIdentity(valid))
        
        yield put(closeAppBackdrop());
        yield put(setCICValidate(valid));
        if (valid.role === "creditlength") {
          yield put(notify("Chưa có TCTD", { options: { variant: "error" } }));
        } else if (valid.role === "credit") {
          yield put(
            notify("Thông tin chi tiết CIC chưa có", {
              options: { variant: "error" },
            })
          );
        }
        // else if (valid.role === 'customer') {
        //   yield put(notify(
        //     'Chưa chọn phân loại khách hàng',
        //     { options: { variant: 'error' } }
        //   ));
        // }
        else {
          yield put(
            notify("Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.", {
              options: { variant: "error" },
            })
          );
        }
      }
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Lưu thông tin CIC thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}
export function* handleDeleteCreditCIC(
  action: PayloadAction<string, string, ILOANNormalCreditDeleteInfo>
) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);

    if (!checkIsLocalUUID(action.meta.creditUuid)) {
      const deleteParams: [string, string, string, string ,string, string, string] = [
        los_uuid, 
        action.meta.organ,
        action.meta.declare,
        action.meta.personUuid,
        action.meta.identityNum,
        action.meta.creditUuid,
        action.meta.position
      ];

      const r: IApiResponse<unknown> = yield call(
        deleteCreditCICAPI,
        ...deleteParams
      );
      if (r.success) {
        yield put(deleteCreditCICStoreFull(action.meta));
        yield put(deleteCreditCICLocal(action.meta.index));
        yield put(
          notify(" Xóa thành công ", { options: { variant: "success" } })
        );
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify(" Xóa không thành công ", { options: { variant: "error" } })
        );
        yield put(closeAppBackdrop());
      }
    } else {
      yield put(deleteCreditCICLocal(action.meta.index));
      yield put(closeAppBackdrop());
      yield put(
        notify(" Xóa thành công ", { options: { variant: "success" } })
      );
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Xóa thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}
export function* handleDeleteAllCreditCIC(
  action: PayloadAction<string, string, ILOANNormalAllCreditDeleteInfo>
) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const isCheckHasSavedCreditCIC: boolean = yield select(checkHasSavedCreditCIC(action.meta))
    if (isCheckHasSavedCreditCIC) {
      const deleteParams: [string, string, string, string ,string] = [
        los_uuid, 
        action.meta.organ,
        action.meta.declare,
        action.meta.personUuid,
        action.meta.identityNum,
      ];

      const r: IApiResponse<unknown> = yield call(
        deleteAllCreditCICAPI,
        ...deleteParams
      );
      if (r.success) {
        yield put(deleteAllCreditCICStoreFull(action.meta));
        yield put(deleteAllCreditCICLocal(action.meta));
        yield put(setHasCreditCIC(false, action.meta.organ))
        yield put(
          notify("Xóa thành công", { options: { variant: "success" } })
        );
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify("Xóa không thành công", { options: { variant: "error" } })
        );
        yield put(closeAppBackdrop());
      }
    } else {
      yield put(deleteAllCreditCICLocal(action.meta));
      yield put(setHasCreditCIC(false, action.meta.organ))
      yield put(closeAppBackdrop());
      yield put(
        notify(" Xóa thành công ", { options: { variant: "success" } })
      );
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Xóa thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}
export function* handleDeleteCreditDetailCIC(
  action: PayloadAction<string, string, ILOANNormalCreditDetailDeleteInfo>
) {
  try {
    yield put(showAppBackdrop());
    const los_uuid: string = yield select(getLOANNormalLOSuuid);

    if (action.meta.detailUuid && !checkIsLocalUUID(action.meta.detailUuid)) {
      const deleteParams: [
        string,
        string,
        string,
        string,
        string,
        string,
        number | null,
        string,
        string
      ] = [
        los_uuid,
        action.meta.type,
        action.meta.organ,
        action.meta.declare,
        action.meta.personUuid,
        action.meta.identityNum,
        action.meta.creditId,
        action.meta.detailUuid,
        action.meta.position
      ];

      const r: IApiResponse<unknown> = yield call(
        deleteCreditDetailCICAPI,
        ...deleteParams
      );
      if (r.success) {
        yield put(deleteCreditDetailCICStoreFull(action.meta));
        yield put(deleteCreditDetailCICLocal(action.meta));
        yield put(
          notify(" Xóa thành công ", { options: { variant: "success" } })
        );
        yield put(closeAppBackdrop());
      } else {
        yield put(
          notify(" Xóa không thành công ", { options: { variant: "error" } })
        );
        yield put(closeAppBackdrop());
      }
    } else {
      yield put(deleteCreditDetailCICLocal(action.meta));
      yield put(closeAppBackdrop());
      yield put(
        notify(" Xóa thành công ", { options: { variant: "success" } })
      );
    }
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Xóa thông tin thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}

export function* upLoadFileCIC(action: PayloadAction<ILOANNormalCICUpload>) {
  yield put(showAppBackdrop());
  yield* action.payload.dataFile?.map(function* (d) {
    let formDataFile = new FormData();
    let _fileId: number | null = null;

    yield* d.document_list.map(function* (dc) {
      if (dc.document_child_files.length === 0) return;
      yield* dc.document_child_files.map(function* (cf) {
        if (cf.file_upload.length > 0 && cf.file_upload !== null) {
          const file: File = new File(
            [cf.file_upload] as unknown as BlobPart[],
            cf?.name,
            { type: cf?.content_type }
          );
          yield (_fileId = Number(cf.file_id));
          yield formDataFile.append("files", file);
        }
      });
    });

    yield put(closeAppBackdrop());
    const r: IApiResponse<IUploadFile[]> = yield call(
      saveCICFile,
      formDataFile
    );
    if (r.success) {
      const dataUpMapStored: ILOANNormalStorageCICDocumentChildFile[] =
        r.data?.map((d, i) => ({
          file_id: i,
          uuid: d?.uuid ?? "",
          name: d?.name ?? "",
          display_order: 0,
          description: "",
          content_type: d?.content_type ?? "",
          created_by: d.created_by,
          created_by_name: d.created_by_name,
          updated_at: d.updated_at,
          updated_by: d.updated_by,
          updated_by_name: d.updated_by_name,
          created_at: d?.created_at,
          file_upload: "",
        })) ?? [];

      // yield put(mapUploadDataCICStored(dataUpMapStored, {
      //   index_group: action.payload.declare,
      //   index_type: action.payload.dataFile
      // }))
    } else {
      yield put(notify("Upload thất bại", { options: { variant: "error" } }));
    }
    yield put(closeAppBackdrop());
  });
  yield put(closeAppBackdrop());
}
interface IUploadFileCIC extends IUploadFile {
  custom_keys: CUSTOM_KEY_FILE;
}

function spliceIntoChunks(arr:{
  docId: string | number;
  docChildId: string | number;
  fileData: ILOANNormalStorageCICDocumentChildFile;
  credit: string;
  identity: string;
  identity_type: string;
}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
}
  return res;
}

function* updateDocumentListAfterUpload(fileListAfterUpload: ILOANNormalStorageCICDocumentChildFile[], documentList: ILOANNormalCICUpload){

  const newChildFileList: ILOANNormalStorageCICDocumentList[] = documentList.dataFile.map(docList => {
    return {
      ...docList,
      document_list: docList.document_list.map(doc => {
        return {
          ...doc,
          document_child_files: doc.document_child_files.map(file => {
            const newFile = fileListAfterUpload?.find(newFile => newFile.custom_keys?.local_id === file.uuid)
            if(newFile){
              return {
                ...file,
                created_by: newFile.created_by,
                created_by_name: newFile.created_by_name,
                updated_by: newFile.updated_by,
                updated_by_name: newFile.updated_by_name,
                updated_at: newFile.updated_at,
                created_at: newFile.created_at,
                uuid: newFile.uuid,
                custom_keys: newFile.custom_keys
              }
            }
            else return {...file}
          })
        }
      })
    }
  })

  yield put(
    mappingCICDataFileAlterUpload(newChildFileList, {
      declare: documentList.declare,
      uuid: documentList.uuid,
    })
  );
}

function* uploadMultiCIC(listFilesUpload: {
  docId: string | number;
  docChildId: string | number;
  fileData: ILOANNormalStorageCICDocumentChildFile;
  credit: string;
  identity: string;
  identity_type: string;
}[], payload: ILOANNormalCICUpload){
  const arrayFile = [...listFilesUpload];
  const listChunkArray = spliceIntoChunks(arrayFile, 10);

  const custom_keys: { [key: number | string]: CUSTOM_KEY_FILE } = {};
  // eslint-disable-next-line require-yield
  const listFilesUploadFinal: ILOANNormalStorageCICDocumentChildFile[] = []

  yield* listChunkArray.map(function* (fileAttach) {
    let formDataFile = new FormData();
    let fileIndex = 0;
    yield* fileAttach.map(function* (d){
      const docID = d.docId;
      const fileData = d.fileData;
      const docChildId = d.docChildId;
      const credit = !!d.credit ? d.credit : "NON_CREDIT";
      const identity = d.identity ?? "";
      const identity_type = d.identity_type ?? "";
      try {
        const resBuf = yield call(fetch, fileData.file_upload);
        const buf = yield resBuf.arrayBuffer();
        const file: File = new File([buf], fileData.name, {
          type: fileData.content_type,
        });
        yield _.set(custom_keys, [fileIndex], {
          idDoc: docID,
          idDocChild: docChildId,
          local_id: fileData.uuid,
          description: fileData.description,
          credit,
          identity,
          identity_type,
        });
        yield fileIndex++;
        yield formDataFile.append("files", file);
      } catch (error) {
        console.log("error FETCH FILE", error);
      }
    })

    yield formDataFile.append("custom_keys", JSON.stringify(custom_keys));

    try {
      const r: IApiResponse<IUploadFileCIC[]> = yield call(
        saveCICFile,
        formDataFile
      );
      const dataResponse: IUploadFileCIC[] | null = r?.data ?? [];
      
      // const user: IUser | undefined = yield select(getBranchCodeUser);
      const dataUploadDocument: ILOANNormalStorageCICDocumentChildFile[] =
        dataResponse.map((file, index) => ({
          uuid: file.uuid,
          display_order: index,
          created_at: file.created_at,
          file_id: 0,
          name: decodeURI(file.name),
          description: file.custom_keys.description ?? "",
          content_type: file.content_type,
          created_by: file.created_by,
          created_by_name: file.created_by_name,
          updated_at: file.updated_at,
          updated_by: file.updated_by,
          updated_by_name: file.updated_by_name,
          file_upload: "",
          custom_keys: file.custom_keys,
          isLocal: false,
          size: file.size,
          
        }));
      
      listFilesUploadFinal.push(...dataUploadDocument)
      
    } catch (error) {
      console.log("error handle upload file cic", error);
      yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
    }
  })

  yield updateDocumentListAfterUpload(listFilesUploadFinal, payload)

}
export function* handleUpLoadFileCIC(
  action: PayloadAction<ILOANNormalCICUpload>
) {
  if (action.payload.dataFile.length === 0) {
    yield updateDocumentListAfterUpload([], action.payload)
  }
  else {
    const listFilesUpload: {
      docId: string | number;
      docChildId: string | number;
      fileData: ILOANNormalStorageCICDocumentChildFile;
      credit: string;
      identity: string;
      identity_type: string;
    }[] = [];
    action.payload.dataFile.forEach((doc) => {
      doc.document_list.forEach((childDoc) => {
        childDoc.document_child_files.forEach((item) => {
          if (item.uuid.includes(PREFIX_LOCAL)) {
            listFilesUpload.push({
              docId: doc.document_type_code ?? "",
              docChildId: childDoc.document_code ?? "",
              fileData: item,
              credit: _.get(doc, "customKey.credit", ""),
              identity: _.get(doc, "customKey.identity", ""),
              identity_type: _.get(doc, "customKey.identity_type", ""),
            });
          }
        });
      });
    });
    
    yield uploadMultiCIC(listFilesUpload,action.payload)
  }
}

export function* handleSaveFileCIC(
  action: PayloadAction<ILOANNormalCICUpload>
) {
  try {
    yield put(showAppBackdrop())
    yield handleUpLoadFileCIC(action);

    const params: [
      ILOANNormalStorageCICState,
      string[],
      string,
      IMasterData,
      ILOANNormalConfigState
      ] = yield select(getLOANNormalStorageCICSave);
    
    const rr: IApiResponse<any[]> = yield call(saveCICAPI, ...params, action.payload.position);
    if (rr.success) {
      if(action.payload.type === 'delete'){
        yield put(notify("Xóa thành công", { options: { variant: "success" } }));
      }
      else {
        yield put(notify("Lưu thành công", { options: { variant: "success" } }));
      }
    } else {
      if(action.payload.type === 'delete'){
        yield put(notify("Xóa thất bại", { options: { variant: "error" } }));
      }
      else {
        yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
      }
    }
  } catch (err) {
    yield put(closeAppBackdrop())
  } finally {
    yield put(closeAppBackdrop())
  }
  
}

export function* handleDeleteDocumentCIC(action: {
  payload: string;
  meta: {
    parentDoc_uuid: string;
    doc_uuid: string;
    file_uuid: string;
    position: string
  };
  type: string;
}) {
  if (action.payload?.includes(PREFIX_LOCAL)) return;
  
  try {
    const params: [
      ILOANNormalStorageCICState,
      string[],
      string,
      IMasterData,
      ILOANNormalConfigState
    ] = yield select(getLOANNormalStorageCICSave);
    yield put(showAppBackdrop());
    const r: IApiResponse<unknown> = yield call(saveCICAPI, ...params, action.meta.position);
    if (r.success) {
      yield put(notify("Xóa thành công", { options: { variant: "success" } }));
    } else {
      yield put(
        notify("Xóa không thành công", { options: { variant: "error" } })
      );
    }
    yield put(closeAppBackdrop());
  } catch (error) {
    yield put(closeAppBackdrop());
  }
}

function* handleGetFullCIC(action: PayloadAction<string>) {
  try {
    const params: [
      ILOANNormalStorageCICState,
      ILOANNormalStorageLegalState,
      string,
      IMasterData,
      ILOANNormalConfigState
    ] = yield select(getLOANNormalStorageCICSave);

    yield put(showAppBackdrop());
    const r: IApiResponse<any> = yield call(getFullCICAfterSaveAPI, params[2]);

    if (r.success) {
      // yield put(notify(' Đồng bộ dữ liệu thành công ', { options: { variant: 'success' } }));
      yield put(updateAPIStorageCIC(r.data as ICICDataAPI, params[2]));
      yield put(closeAppBackdrop());
    } else {
      // yield put(notify('Đồng bộ dữ liệu CIC thất bại.', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
    }
  } catch (error) {
    // yield put(notify('Đồng bộ dữ liệu CIC thất bại.', { options: { variant: 'error' } }));
    yield put(closeAppBackdrop());
  }
}

function* saveContinueCIC(
  action: PayloadAction<number, string, { organ: string, position: string }>
) {
  try {
    const los_uuid: string = yield select(getLOANNormalLOSuuid);
    const ruleDisabled: boolean = yield select(getRuleDisbled);
    const params: [
      ILOANNormalStorageCICState,
      string[],
      string,
      IMasterData,
      ILOANNormalConfigState
    ] = yield select(getLOANNormalStorageCICSave);
    const valid: ICICNormalStorageCICValidate = yield select(
      validateLOANNormalStorageCIC
    );
    const currentOrgan = cicOrganRouter.indexOf(action.meta.organ);
    let flagExistData: boolean = true;
    const declareName = cicRouterNormal[action.payload];
    let nextPosition = action.payload + 1;
    const lstEnableDeclareLegal = params[1];
    yield put(showAppBackdrop());
    flagExistData = yield checkExistData(params[0], currentOrgan, declareName);
    if(!ruleDisabled){
      if (!flagExistData) {
        yield* callFuncSetNavigate(
          action.payload,
          currentOrgan,
          params[2],
          nextPosition,
          lstEnableDeclareLegal
        );
        yield put(closeAppBackdrop());
      } else {
        if (valid.valid) {
          
          const r: IApiResponse<unknown> = yield call(saveCICAPI, ...params, action.meta.position);
          if (r.success) {
            yield put(
              notify(" Lưu thành công ", { options: { variant: "success" } })
            );
            yield put(setCICValidate(valid));
            yield* callFuncSetNavigate(
              action.payload,
              currentOrgan,
              params[2],
              nextPosition,
              lstEnableDeclareLegal
            );
            yield put(closeAppBackdrop());
            yield put(fetchListDataHistoryLogs(los_uuid));
          } else {
            yield put(
              notify("Vui lòng kiễm tra lại dữ liệu", {
                options: { variant: "error" },
              })
            );
            yield put(closeAppBackdrop());
          }
        } else {
          yield put(closeAppBackdrop());
          yield put(setCICValidate(valid));
          if (valid.role === "creditlength") {
            yield put(notify("Chưa có TCTD", { options: { variant: "error" } }));
          } else if (valid.role === "credit") {
            yield put(
              notify("Thông tin chi tiết CIC chưa có", {
                options: { variant: "error" },
              })
            );
          } else if (valid.role === "customer") {
            yield put(
              notify("Chưa chọn phân loại khách hàng", {
                options: { variant: "error" },
              })
            );
          } else {
            yield put(
              notify("Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại.", {
                options: { variant: "error" },
              })
            );
          }
        }
      }
    }else{
      yield* callFuncSetNavigate(
        action.payload,
        currentOrgan,
        params[2],
        nextPosition,
        lstEnableDeclareLegal
      );
      yield put(closeAppBackdrop());
    }
    
  } catch (error) {
    console.log("error Try catch", error);
    yield put(
      notify("Lưu thông tin CIC thất bại", { options: { variant: "error" } })
    );
    yield put(closeAppBackdrop());
  }
}
// eslint-disable-next-line require-yield
function* checkExistData(
  cicState: ILOANNormalStorageCICState,
  organ: number,
  declare: string
) {
  if (organ === 0) {
    const data = cicState.other.data[declare]?.data;
    const personIndexActive = data.findIndex(
      (e) => e.person_uuid === cicState.other.data[declare]?.position
    );
    if (personIndexActive !== -1) {
      for (let j = 0; j < data[personIndexActive].data.length; j++) {
        if (data[personIndexActive].data[j].credit.length > 0) {
          return true;
        }
      }
    }
  } 
  // else if (organ === 1) {
  //   return false
  //   // const data = cicState.scb.data[declare]?.data;
  //   // const personIndexActive = data.findIndex(
  //   //   (e) => e.person_uuid === cicState.scb.data[declare]?.position
  //   // );
  //   // if (personIndexActive !== -1) {
  //   //   for (let j = 0; j < data[personIndexActive].data.length; j++) {
  //   //     if (data[personIndexActive].data[j].credit.length > 0) {
  //   //       return true;
  //   //     }
  //   //   }
  //   // }
  // }
  return false;
}

function* callFuncSetNavigate(
  currentPos: number,
  organ: number,
  uuid: string,
  nextPos: number,
  lstDecLegal: string[]
) {
  const positionActive: string = yield select(
    getLOANNormalStorageCICPosition(
      cicOrganRouter[organ] as keyof ILOANNormalStorageCICOther,
      cicRouterNormal[currentPos]
    )
  );
  const userList: ICICNormalStorageLegalCustomDetail[] = yield select(
    getLOANNormalStorageCICDeclare(cicRouterNormal[currentPos])
  );
  const positionActiveIndex = userList.findIndex((e) => e.uuid === positionActive);
  if (organ === 1) {
    yield put(setAppNavigate(`/loan/normal/init/${uuid}/loan/product`));
    return;
  }
  else if(positionActiveIndex < userList.length - 1){
    yield put(setCICDeclarePosition(userList[positionActiveIndex + 1].uuid, {
      organActive: cicOrganRouter[organ] as keyof ILOANNormalStorageCICOther,
      declareActive: cicRouterNormal[currentPos],
    }))
  }
  else{
    if (currentPos === 5) {
      if (organ === 1) {
        yield put(
          setAppNavigate(`/loan/normal/init/${uuid}/loan/product`)
        );
      } else if (organ === 0) {
        yield put(
          setAppNavigate(
            `/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}`
          )
        );
      }
      /// case declare is Other and don't have data
      /// if organ = scb go next to rating-reviews
    } else {
      for (let index = 0; index < cicRouterNormal.length; index++) {
        const declareActive = cicRouterNormal[nextPos];
        let value = "";
        switch (declareActive) {
          case "borrower":
            value = "BORROWER";
            break;
          case "marriage":
            value = "MARRIAGE";
            break;
          case "co-brw":
            value = "CO_BRW";
            break;
          case "co-payer":
            value = "CO_PAYER";
            break;
          case "law-rlt":
            value = "LAW_RLT";
            break;
          case "other":
            value = "OTHER";
            break;
        }
        
        if (lstDecLegal.includes(value)) {
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/cic/${cicOrganRouter[organ]}/${cicRouterNormal[nextPos]}`
            )
          );
          break;
        } else {
          if(nextPos < 5){
            nextPos += 1;
          }
          else {
            if (organ === 1) {
              yield put(setAppNavigate(`/loan/normal/init/${uuid}/loan/product}`));
              break;
            } else if (organ === 0) {
              yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}`));
              break;
            }
          }
        }
        // if (nextPos === 5) {
        //   /// case declare is Other and don't have data
        //   /// if organ = scb go next to rating-reviews
        //   if (organ === 1) {
        //     yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[2]}`));
        //     break;
        //   } else if (organ === 0) {
        //     yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}/borrower`));
        //     break;
        //   }
        // }
      }
    }
    ///check if next declare exist in list enable declare legal
  }
}

function* callFuncSetNavigateRuleDisabled(
  currentPos: number,
  organ: number,
  uuid: string,
  nextPos: number,
  lstDecLegal: string[]
) {
  const positionActive: string = yield select(
    getLOANNormalStorageCICPosition(
      cicOrganRouter[organ] as keyof ILOANNormalStorageCICOther,
      cicRouterNormal[currentPos]
    )
  );
  const userList: ICICNormalStorageLegalCustomDetail[] = yield select(
    getLOANNormalStorageCICDeclare(cicRouterNormal[currentPos])
  );
  const positionActiveIndex = userList.findIndex(
    (e) => e.uuid === positionActive
  );
  if (organ === 2) {
    yield put(setAppNavigate(`/loan/normal/init/${uuid}/loan/product`));
    return;
  }
  else if(positionActiveIndex < userList.length - 1){
    yield put(setCICDeclarePosition(userList[positionActiveIndex + 1].uuid, {
      organActive: cicOrganRouter[organ] as keyof ILOANNormalStorageCICOther,
      declareActive: cicRouterNormal[currentPos],
    }))
  }
  else{
    if (currentPos === 5) {
      if (organ === 1) {
        yield put(
          setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[2]}`)
        );
      } else if (organ === 0) {
        yield put(
          setAppNavigate(
            `/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}/borrower`
          )
        );
      }
    } else {
      for (let index = 0; index < cicRouterNormal.length; index++) {
        const declareActive = cicRouterNormal[nextPos];
        let value = "";
        switch (declareActive) {
          case "borrower":
            value = "BORROWER";
            break;
          case "marriage":
            value = "MARRIAGE";
            break;
          case "co-brw":
            value = "CO_BRW";
            break;
          case "co-payer":
            value = "CO_PAYER";
            break;
          case "law-rlt":
            value = "LAW_RLT";
            break;
          case "other":
            value = "OTHER";
            break;
        }
        
        if (lstDecLegal.includes(value)) {
          yield put(
            setAppNavigate(
              `/loan/normal/init/${uuid}/cic/${cicOrganRouter[organ]}/${cicRouterNormal[nextPos]}`
            )
          );
          break;
        } else {
          if(nextPos < 5){
            nextPos += 1;
          }
          else {
            if (organ === 1) {
              yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[2]}`));
              break;
            } else if (organ === 0) {
              yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}/borrower`));
              break;
            }
          }
        }
        // if (nextPos === 5) {
        //   /// case declare is Other and don't have data
        //   /// if organ = scb go next to rating-reviews
        //   if (organ === 1) {
        //     yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[2]}`));
        //     break;
        //   } else if (organ === 0) {
        //     yield put(setAppNavigate(`/loan/normal/init/${uuid}/cic/${cicOrganRouter[1]}/borrower`));
        //     break;
        //   }
        // }
      }
    }
    ///check if next declare exist in list enable declare legal
  }
}

export default function* storageCICSaga() {
  yield takeEvery(saveLOANNormalCIC.type, handleSaveCIC);
  // yield takeEvery(uploadCICFileMulti.type, upLoadFileCIC);
  yield takeEvery(uploadCICFileMulti.type, handleSaveFileCIC);
  yield takeEvery(deleteDocumentInfoList.type, handleDeleteDocumentCIC);
  yield takeEvery(deleteDocumentGroup.type, handleDeleteDocumentCIC);
  yield takeEvery(deleteDocument.type, handleDeleteDocumentCIC);
  yield takeEvery(deleteChildFile.type, handleDeleteDocumentCIC);
  yield takeEvery(fetchDataCICAfterSave.type, handleGetFullCIC);
  yield takeEvery(handleContinueCIC.type, saveContinueCIC);
  yield takeEvery(deleteCreditCIC.type, handleDeleteCreditCIC);
  yield takeEvery(deleteAllCreditCIC.type, handleDeleteAllCreditCIC);

  yield takeEvery(deleteCreditDetailCIC.type, handleDeleteCreditDetailCIC);
}
