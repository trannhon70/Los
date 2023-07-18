import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, showAppBackdrop } from "features/app/store/slice";
import _ from "lodash";
import { call, select,put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { IUser } from "types/models/Account";
import { CUSTOM_KEY_FILE, ILOANNormalChildfile, ILOANNormalDocumentInfoList, ILOANNormalLOANUpload, ILOANNormalStorageICR, ILOANNormalStorageICRDataResponse } from "types/models/loan/normal/storage/ICR";
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import { /*getUuidRemovePrefix,*/ PREFIX_LOCAL } from "utils";
import { fetchHistoryLogs } from "../historyLogs/action";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getBranchCodeUser } from "../legal/selectors";
import { getLOANNormalStorageUuid } from "../loan/selectors";
import { mappingDataLOANNormalStorageICRModalAttachFile, mappingICRDataFileAlterUpload, removeAllLOANNormalStorageICRParentDoc, removeLOANNormalStorageICRDoc, removeLOANNormalStorageICRFile, removeLOANNormalStorageICRParentDoc, saveLOANNormalICR, saveLOANNormalStorageICRModalAttachFile, updateDataLOANNormalICR } from "./actions";
import { ApiPostLoanNormalInternalCreditRating, saveFileICR} from "./api";
import {  getLoanNormalICRStorage } from "./selector";


interface IUploadFileLOAN extends IUploadFile {
    custom_keys: CUSTOM_KEY_FILE;
  }
  

function* handleUpdateLoanNomalICR(action: PayloadAction<string>){
    try {
        const storage:ILOANNormalStorageICR = yield select(getLoanNormalICRStorage)
        // const fullIcr:ILOANNormalStorageICRData = yield select(getFullICR)
        const los_uuid:string = yield select(getLOANNormalStorageUuid)
        const response: IApiResponse<ILOANNormalStorageICRDataResponse> = yield call(ApiPostLoanNormalInternalCreditRating, storage, los_uuid);
        if (response.success) {
            yield put(fetchHistoryLogs({
                page: "1",
                size: "1000",
                sort: "",
                uuid: los_uuid
            }));
            yield put(updateDataLOANNormalICR(response.data as ILOANNormalStorageICRDataResponse))
            // yield put(updateDataLOANNormalICR(response.data as ILOANNormalStorageICRDataResponse))
            yield put(notify('Xếp hạng thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
        }
        else {
            yield put(notify(response.errors[0].detail, { options: { variant: 'error' } }));
        }
    } catch (error) {
        yield put(notify('Cập nhật XHTDNB thất bại', { options: { variant: 'error' } }));
    }
    finally{
      yield put(closeAppBackdrop());

    }
}
function spliceIntoChunks(arr:{
  parent_id: string | number | null;
  doc_id: string | number | null;
  fileData: any;
}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
}
  return res;
}

function* uploadMultiLOAN(listFilesUpload: {
  parent_id: string | number | null;
  doc_id: string | number | null;
  fileData: any;
}[], payload: ILOANNormalLOANUpload) {
  const arrayFile = [...listFilesUpload];
  const listFilesUploadFinal: ILOANNormalChildfile[] = []

  const listChunkArray = spliceIntoChunks(arrayFile, 10);
  const custom_keys: { [key: number | string]: CUSTOM_KEY_FILE } = {};
  yield* listChunkArray.map(function* (attachFile) {
    let fileIndex = 0;
    let formDataFile = new FormData();
    yield* attachFile.map(function* (file) {
      const { parent_id = null, doc_id = null } = file;
      const fileData = file.fileData;
      try {
        const resBuf = yield call(fetch, fileData.file_upload);
        const buf = yield resBuf.arrayBuffer();
        const file: File = new File([buf], fileData.name, {
          type: fileData.content_type,
        });
        yield _.set(custom_keys, [fileIndex], {
          parent_id,
          doc_id,
          local_id: fileData.uuid,
          description: fileData.description,
        });
        yield fileIndex++;
        yield formDataFile.append("files", file);
      } catch (error) {
        console.log("error FETCH FILE", error);
      }
    });
    yield formDataFile.append("custom_keys", JSON.stringify(custom_keys));
    try {
      const r: IApiResponse<IUploadFileLOAN[]> = yield call(
        saveFileICR,
        formDataFile
      );
      const dataResponse: IUploadFileLOAN[] | null = r?.data ?? [];
      if (dataResponse?.length === 0) return;
      const user: IUser | undefined = yield select(getBranchCodeUser);
      const dataUploadDocument: ILOANNormalChildfile[] = dataResponse.map(
        (file) => {
          const result: ILOANNormalChildfile = {
            ...file,
            created_at: (Number(file.created_at?? 0)),
            created_by: file.created_by,
            created_by_name: file.created_by_name,
            updated_at: file.updated_at,
            updated_by: file.updated_by ,
            updated_by_name: file.updated_by_name,
            name: decodeURI(file.name),
            file_upload: null,
            description: file.custom_keys.description
          };
          return result;
        }
      );
      listFilesUploadFinal.push(...dataUploadDocument)
      // yield put(
      //   mappingDataLOANNormalStorageLOANModalAttachFile(dataUploadDocument)
      // );
    } catch (error) {
      console.log("error handle upload file", error);
      yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
    }
  })
  yield updateDocumentListAfterUpload(listFilesUploadFinal, payload)
}

export function* handleUpLoadFileAttach(
    action: PayloadAction<ILOANNormalLOANUpload>
  ) {
    const listFilesUpload: {
      parent_id: string | number | null;
      doc_id: string | number | null;
      fileData: any;
    }[] = [];
    action.payload.dataFile.forEach((doc) => {
      if (doc.document_group.length === 0) return;
      doc.document_group.forEach((childDoc) => {
        childDoc?.child_files?.forEach((item) => {
          if (
            item.uuid?.includes(PREFIX_LOCAL)
          ) {
            listFilesUpload.push({
              parent_id: doc.document_id ?? "",
              doc_id: childDoc.document_id ?? "",
              fileData: item,
            });
          }
        });
      });
    });
    if (listFilesUpload.length === 0) {
      yield updateDocumentListAfterUpload([], action.payload)
    }
  
    yield uploadMultiLOAN(listFilesUpload, action.payload)
}

function* updateDocumentListAfterUpload(fileListAfterUpload: ILOANNormalChildfile[], documentList: ILOANNormalLOANUpload){
  const newChildFileList: ILOANNormalDocumentInfoList[] = documentList.dataFile.map(parentDoc => {
    return {
      ...parentDoc,
      document_group: parentDoc.document_group.map(doc => {
        return {
          ...doc,
          child_files: doc.child_files?.map(file => {
            const newFileUpload = fileListAfterUpload.find(e => e.custom_keys?.local_id === file.uuid)

            if(newFileUpload) return {...newFileUpload}
            else return {...file}
          }) ?? []
        }
      })
    }
  })

  yield put(mappingICRDataFileAlterUpload(newChildFileList))
}

function* handleSaveICRDoc(isDelete = false) {
    const storage:ILOANNormalStorageICR = yield select(getLoanNormalICRStorage)
    const los_uuid:string = yield select(getLOANNormalStorageUuid)
  
    try {
        const r: IApiResponse<ILOANNormalStorageICRDataResponse> = yield call(ApiPostLoanNormalInternalCreditRating, storage, los_uuid);
      if (r.success) {
        yield put(updateDataLOANNormalICR(r.data as ILOANNormalStorageICRDataResponse));

        if(isDelete){
          yield put(notify("Xóa thành công", { options: { variant: "success" } }));
        }
        else {
          yield put(notify("Lưu thành công", { options: { variant: "success" } }));
        }
        yield put(closeAppBackdrop());
       
      } else {
        yield put(closeAppBackdrop());
        yield put(notify(r.errors[0].detail, { options: { variant: "error" } }));
      }
    } catch (error) {
      if(isDelete){
        yield put(notify("Xóa thất bại", { options: { variant: "error" } }));
      }
      else {
        yield put(notify("Lưu thất bại", { options: { variant: "error" } }));
      }
      yield put(closeAppBackdrop());
    }
}

function* handleSaveLOANNormalStorageICRModalAttachFile(
    action: PayloadAction<ILOANNormalLOANUpload>
  ) {
    yield put(showAppBackdrop());
    yield handleUpLoadFileAttach(action);
    yield handleSaveICRDoc(action.payload.isDelete);
    yield put(closeAppBackdrop());
  }

function* handleRemoveLOANDocument(action: PayloadAction<string>) {
    if (action?.payload?.includes(PREFIX_LOCAL)) return;
    yield handleSaveICRDoc(false);
}

export default function* storageICRSaga(){
   yield takeEvery(saveLOANNormalICR.type, handleUpdateLoanNomalICR);
   yield takeEvery(
    removeAllLOANNormalStorageICRParentDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageICRParentDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageICRDoc.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    removeLOANNormalStorageICRFile.type,
    handleRemoveLOANDocument
  );
  yield takeEvery(
    saveLOANNormalStorageICRModalAttachFile.type,
    handleSaveLOANNormalStorageICRModalAttachFile
  );
}
