import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify, setAppNavigate, showAppBackdrop } from "features/app/store/slice";
import JSZip from 'jszip';
import * as _ from 'lodash';
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { IMetadataConstantState } from "types/models/loan/normal/configs/metadata";
import { ILOANNormalFullState } from "types/models/loan/normal/storage";
import {
  CUSTOM_KEY_FILE_INCOME,
  DataFile,
  Document, ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomeState, ILOANNormalStorageIncomeValidate
} from "types/models/loan/normal/storage/Income";
import { ILOANNormalStorageLegalState } from "types/models/loan/normal/storage/Legal";
import { ILOANNormalStorageLOANState } from "types/models/loan/normal/storage/LOAN";
import { IUploadFile } from "types/models/loan/normal/storage/Upload";
import { IStateStorageGuide } from "types/models/loan/normal/storageGuide";
import { IMasterData } from "types/models/master-data";
import { PREFIX_LOCAL } from "utils";
import { METADATA_CONSTANT } from "utils/constants";
import { cicRouterNormal2, incomeMain, incomeSource } from "views/pages/LOAN/utils";
import { fetchLOANNormalDataBalanceAbility } from "../../configs/actions";
import { getLOANNormalConfigMetadataConstant } from "../../configs/metadata/selector";
import { checkRoleButtonBar, getRuleDisbled } from "../../storageGuide/selector";
import { fetchListDataHistoryLogs } from "../historyLogs/action";
import { getLOANNormalLOSuuid } from "../selectors";
import {
  downloadMultiAllFile, downloadMultiFile, handleContinueIncome, mappingDataFileAlterUpload, removeFile, removeIncomeSourceAssetRentType, removeIncomeSourceType, removeLocalFile, revertDataIncomeRemove, saveBeforeNextActionTabBalanceAbilityINCOME, saveLOANNormalINCOME, setIncomeSourceAssetRentActive,
  setIncomeSourceAssetRentRealEState,
  setIncomeSourceBussinessActive,
  setIncomeSourceCompanyActive,
  setIncomeSourceDepositActive,
  setIncomeSourceOtherActive, setIncomeSourceStockActive, setIncomeValidate, syncDataIncomeAfterSave
} from "./action";
import {
  deleteIncomeAssrentRent,
  deleteIncomeBusiness,
  deleteIncomeCompany, deleteIncomeDeposit,
  deleteINCOMEOther, deleteINCOMEPension,
  deleteIncomeSalary, deleteIncomeStock, downloadINCOMEMultiFile, saveINCOMEAbility, saveINCOMEAssrentRent, saveINCOMEBalance, saveINCOMEBusiness, saveINCOMECompany, saveINCOMEDeposit, saveINCOMEFile, saveINCOMEOther, saveINCOMEPension, saveINCOMESalary, saveINCOMEStock
} from "./api";
import {
  getIncomeZipName, getLOANNormalStorageCurrentDeclare, getLOANNormalStorageIncomeDelete, getLOANNormalStorageINCOMESave,
  validateLOANNormalStorageIncome
} from "./selector";

const saveAs = require('jszip/vendor/FileSaver.js');

function* handleSaveIncome(action: PayloadAction<string,string,{callback:(value:any)=>void}|undefined>) {
  try {
    yield put(showAppBackdrop())
    let params: [
      ILOANNormalStorageIncomeState,
      ILOANNormalStorageLOANState,
      ILOANNormalStorageLegalState,
      ILOANNormalFullState,
      ILOANNormalConfigState,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageINCOMESave);
    const loanProductValidate: ILOANNormalStorageIncomeValidate = yield select(validateLOANNormalStorageIncome);
    const declareActive: string = yield select(getLOANNormalStorageCurrentDeclare());
    const isCheckValidateForm = loanProductValidate?.valid ?? true;
    const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)

    yield put(setIncomeValidate(loanProductValidate));
    // const isCheckValidateForm =  true;
    if (!isCheckValidateForm) {
      // Check validate screen
      if(loanProductValidate.field === "differentValue" && loanProductValidate.declarePosition === 'balance') {
        yield put(notify('Cân đối thu nhập và chi phí không hợp lệ', { options: { variant: 'error' } }));
      }

      if(loanProductValidate.field === "differentValue" && loanProductValidate.declarePosition === 'ability') {
        yield put(notify('Giá trị thu nhập ròng không hợp lệ', { options: { variant: 'error' } }));
      }

      if (loanProductValidate.position && loanProductValidate.position.length > 0) {
        const declareType = loanProductValidate.declare as keyof ILOANNormalStorageIncomeDeclare;
     
        switch (loanProductValidate.declarePosition) {
          case 'salary':
            if(loanProductValidate.field === 'salary') {
              yield put(notify('Vui lòng thêm nguồn lương', { options: { variant: 'error' } }));
            }
            break;
          case 'stock':
            if(loanProductValidate.field === 'stock') {
              yield put(notify('Vui lòng thêm Cổ tức/Lợi nhuận', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceStockActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'company':
            if(loanProductValidate.field === 'company') {
              yield put(notify('Vui lòng thêm doanh nghiệp', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceCompanyActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'business':{
            if(loanProductValidate.field === 'business') {
              yield put(notify('Vui lòng thêm hộ kinh doanh', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceBussinessActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          }
          case 'deposit':
            if(loanProductValidate.field === 'deposit') {
              yield put(notify('Vui lòng thêm Lãi tiền gửi/GTCG', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceDepositActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'other':
            if(loanProductValidate.field === 'other') {
              yield put(notify('Vui lòng thêm nguồn thu', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceOtherActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case "assetRent":
            if (loanProductValidate.field === 'assetRent') {
              yield put(notify('Vui lòng thêm tài sản cho thuê', { options: { variant: 'error' } }));
            }
            if (loanProductValidate.field === 'assetDetailRealEstate') {
              yield put(notify('Vui lòng thêm loại tài sản cho thuê', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceAssetRentActive(loanProductValidate.position, {
              declare: declareType
            }))
            if (loanProductValidate.positionHorizontal) {
              yield put(setIncomeSourceAssetRentRealEState(loanProductValidate.positionHorizontal, {
                declare: declareType
              }))
            }
            break;
          default:
            break;
        }
      }
      yield put(closeAppBackdrop());
      return
    }
    else {
      // yield put(setIncomeValidate({valid: true}));
      // yield put(showAppBackdrop());
      // yield put(closeAppBackdrop());
      if(action.payload !== 'balance'  && action.payload !== 'ability-repay'){
        yield* upload(
          params[0] as ILOANNormalStorageIncomeState,
          declareActive,
          action.payload as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">
        );
      }
      // get new params data from store data after upload file
      params = yield select(getLOANNormalStorageINCOMESave);
      const los_uuid: string = yield select(getLOANNormalLOSuuid);
      if (action.payload === 'salary') {
        const r: IApiResponse<unknown> = yield call(saveINCOMESalary, ...params, action.payload, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
        // const test = Math.floor(Math.random() * 10);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        } else {
          yield put(notify(
            `${r.errors[0]?.detail}`,
            { options: { variant: 'error' } }
          ));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'assetRent') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEAssrentRent, ...params, action.payload);
    
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'business') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEBusiness, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'company') {
        const r: IApiResponse<unknown> = yield call(saveINCOMECompany, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.forEach((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'stock') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEStock, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.forEach((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'deposit') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEDeposit, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(closeAppBackdrop());
        }
        else {
          let msgError = "";
          r.errors.forEach((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'pension') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEPension, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.forEach((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'other') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEOther, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.forEach((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        yield put(closeAppBackdrop());
      }

      if (action.payload === 'balance') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEBalance, ...params, action.payload);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
        } else {
          yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
        }
        yield put(closeAppBackdrop());
      }

      //tab 3: ability
      if (action.payload === 'ability-repay') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEAbility, ...params, action.payload);

        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(fetchListDataHistoryLogs(los_uuid));
          yield put(closeAppBackdrop());
        }
        else {
          yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
        }
        yield put(closeAppBackdrop());
      }
    }
  }
  catch (e) { 
    console.log(e) 
    yield put(notify('Có lỗi xảy ra. Lưu thất bại',{ options: { variant: 'error' } }));
  }
  finally {
    yield put(closeAppBackdrop())
  }
}

function* upload(
  data: ILOANNormalStorageIncomeState,
  declare_type: string,
  activeIncomeSource: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">
) {
  try {
    const declare = declare_type as keyof ILOANNormalStorageIncomeDeclare;
    const activePosition = data?.income[declare]?.activePosition;
    const dataPosition = data?.income[declare]?.dataPosition?.find(dp => dp.uuidDeclare === activePosition);

    if (!dataPosition) {
      yield put(closeAppBackdrop());
      yield put(notify('Khởi tạo cân đối thu nhập - chi phí không thành công', { options: { variant: 'error' } }));
      return
    }
    switch (activeIncomeSource) {
      case "salary":
        yield* dataPosition?.salary?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;

      case "assetRent":
        console.log("assetRentassetRent",dataPosition)
        yield* dataPosition.assetRent.data?.map(function* (d) {

          yield* d.assetDetailRealEstate?.data?.map(function* (dre) {
            yield handleUploadFiles(declare, activeIncomeSource, dre.documents, `${d.uuid}<CHILD>${dre.uuid}`, "REAL_ESTATE");
          })

          yield* d.assetDetailTransport?.data?.map(function* (dts) {
            yield handleUploadFiles(declare, activeIncomeSource, dts.documents, `${d.uuid}<CHILD>${dts.uuid}`, "TRANSPORT");
          })

          yield* d.assetDetailOther.data.map(function* (sdo) {
          console.log("sdosdosdosdosdo",sdo)

            yield handleUploadFiles(declare, activeIncomeSource, sdo.documents, `${d.uuid}<CHILD>${sdo.uuid}`, "OTHER");
          })
        })
        break;
      case "business":
        yield* dataPosition?.business?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;
      case "company":
        yield* dataPosition?.company?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;

      case "stock":
        yield* dataPosition?.stock?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;

      case "deposit":
        yield* dataPosition?.deposit?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;

      case "pension":
        yield handleUploadFiles(declare, activeIncomeSource, dataPosition?.pension.documents, "");
        break;

      case "other":
        yield* dataPosition?.other?.data?.map(function* (d) {
          yield handleUploadFiles(declare, activeIncomeSource, d.documents, d.uuid);
        })
        break;

      default:
        break;
    }

    // yield put(closeAppBackdrop());
  }
  catch (e) { console.log("logggggggggggggggggg file ::::::::::: ", e) }

}

// export function* updateAndMapDocumentStored(
//   declare_type: keyof ILOANNormalStorageIncomeDeclare,
//   activeIncomeSource: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">,
//   document: Document[],
//   activeAssigDocument: string,
//   activeType?: string
// ) {
//   yield* document.map(function* (dc) {
//     let formDataFile = new FormData();
//     let _documentId: number | null = null;

//     if (dc.data_file.length === 0) {
//       return;
//     }

//     yield* dc.data_file.map(function* (df:DataFile) {
//       if (df.uuid.includes(PREFIX_LOCAL) && df.file_upload !== undefined) {
//         const buf  = yield fetch(df.file_upload)
//         .then((res)=>res.arrayBuffer());
//         const file: File = new File([buf], df?.name, { type: df?.content_type });
//         yield _documentId = Number(dc.document_id);
//         yield formDataFile.append("files", file);
//       }
//     })

//     const r: IApiResponse<IUploadFileIncome[]> = yield call(saveINCOMEFile, formDataFile);

//     const dataResponse: IUploadFileIncome[] | null = r?.data ?? null;
//     let dataUploadDocument: DataFile[] = [];
//     if (dataResponse && dataResponse?.length > 0) {
//       dataResponse?.map((dr, index) => {
//         dataUploadDocument.push({
//           uuid: dr.uuid,
//           created_at: dr.created_at,
//           content_type: dr.content_type,
//           name: decodeURI(dr.name),
//           created_by : dr.created_by, 
//           updated_at : dr.updated_at, 
//           updated_by: dr.updated_by, 
//           custom_keys: dr.custom_keys
//         })
//         return null;
//       })


//       yield put(mapUploadDocumentData(dataUploadDocument, {
//         declare: declare_type as keyof ILOANNormalStorageIncomeDeclare,
//         document_id: Number(_documentId),
//         activeType: activeIncomeSource,
//         activeAssigDocument: activeAssigDocument,
//         assetType: activeType
//       }));
//     }
//   });
// }
interface IUploadFileIncome extends IUploadFile{
  custom_keys:CUSTOM_KEY_FILE_INCOME
}

function spliceIntoChunks(arr:{fileData:DataFile,doc: Document}[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
}
  return res;
}

export function* handleUploadFiles( 
  declare_type: keyof ILOANNormalStorageIncomeDeclare,
  activeIncomeSource: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">,
  document: Document[],
  activeAssigDocument: string,
  activeType?: string
){
  
    const custom_keys:{[key:number|string]:CUSTOM_KEY_FILE_INCOME} = {};
    const arrayFileUpload:{fileData:DataFile,doc: Document}[] = [];
    document.forEach(doc => {
      doc.data_file.forEach((file:DataFile)=>{
        if(file.uuid.includes(PREFIX_LOCAL)){
          arrayFileUpload.push({fileData:file,doc});
        }
      })
    });

    const newArrayFileUpload = [...arrayFileUpload]
    const listChunkArray = spliceIntoChunks(newArrayFileUpload, 10);

    yield* listChunkArray.map(function* (fileAttach) {
      if(fileAttach.length>0){
        let formDataFile = new FormData();
        let fileIndex = 0;
        yield* fileAttach.map(function* (file){
          const df = file.fileData;
          const doc = file.doc;
          if (df.uuid.includes(PREFIX_LOCAL) && df.file_upload !== undefined) {
            try {
              const resBuf  = yield call(fetch,df.file_upload);
              const buf = yield resBuf.arrayBuffer();
              const file: File = new File([buf], df?.name, { type: df?.content_type });
              yield _.set(custom_keys,[fileIndex],{document_id :doc.document_id,local_id:df.uuid});
              yield fileIndex++;
              yield formDataFile.append("files", file);
            } catch (error) {
              console.log('error FETCH FILE',error);
            }
          }
        });
        yield formDataFile.append("custom_keys",JSON.stringify(custom_keys));
        try {
          const r: IApiResponse<IUploadFileIncome[]> = yield call(saveINCOMEFile, formDataFile);
          if(r.success){
            const dataResponse: IUploadFileIncome[] | null = r?.data ?? null;
            let dataUploadDocument: DataFile[] = [];
            if (dataResponse && dataResponse?.length > 0) {
              dataResponse?.map((dr, index) => {
                dataUploadDocument.push({
                  uuid: dr.uuid,
                  created_at: dr.created_at,
                  content_type: dr.content_type,
                  name: decodeURI(dr.name),
                  created_by : dr.created_by, 
                  updated_at : dr.updated_at, 
                  updated_by: dr.updated_by, 
                  updated_by_name: dr.updated_by_name,
                  created_by_name: dr.created_by_name,
                  custom_keys: dr.custom_keys
                })
                return null;
              })
        
              yield put(mappingDataFileAlterUpload(dataUploadDocument, {
                declare: declare_type as keyof ILOANNormalStorageIncomeDeclare,
                activeType: activeIncomeSource,
                activeAssigDocument: activeAssigDocument,
                assetType: activeType
              }));
            }
          }
        } catch (error) {
          console.log("error handle upload file income", error);
          yield put(notify('Lưu file không thành công', { options: { variant: 'error' } }));
          yield put(closeAppBackdrop());
        }
      };
    })
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
function* handleDownloadMulti(action: PayloadAction<string>) {
  const r: IApiResponse<{
    uuid: string;
    file_url: string;
    file_name: string;
  }[]> = yield call(downloadINCOMEMultiFile, action.payload);
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


type fileResDownload ={uuid: string, file_url:string, file_name: string};

const downloadAll2 = async (urlsString: fileResDownload[],zipName:string) => {
  const listFiles = urlsString.map(file=>({...file, file_url: file.file_url}));
  const toFetchDataURL = (file: fileResDownload) => 
    fetch(file.file_url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve({baseData: reader.result, fileInfo: file})
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));
    try {
      const res = await Promise.all(listFiles.map(file=> toFetchDataURL(file)));
      const data = res as {baseData:string, fileInfo:fileResDownload}[] ?? [];
      const zip = new JSZip(); 
      data.forEach(file=>{
        zip.file(file.fileInfo.file_name, file.baseData.substr(file.baseData.indexOf(',')+1), {base64: true});
      });
      const content = await zip.generateAsync({type: "blob"});
      const blob = new Blob([content], {type: "octet/stream"});
      saveAs(blob, zipName);

    } catch (error) {
      console.log('error',error);
    }
}

function* handleDownloadAll(action: PayloadAction<string>) {
  const r: IApiResponse<fileResDownload[]> = yield call(downloadINCOMEMultiFile, action.payload);
  if (r.success) {
  const nameFile:string = yield select(getIncomeZipName);
    yield downloadAll2(r.data ?? [],`${nameFile}.zip`);
    yield put(notify('Tải xuống tập tin thành công', { options: { variant: 'success' } }));
    yield put(closeAppBackdrop());
  }
  else {
    yield put(notify('Tải xuống tập tin không thành công', { options: { variant: 'error' } }));
  }
  yield put(closeAppBackdrop());
}

function* handleRemoveFile(action: PayloadAction<
  string,
  string,
  {
    declare: keyof ILOANNormalStorageIncomeDeclare;
    document_id: number;
    activeType: keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
  }>)
  {
    try {
      yield put(showAppBackdrop())
      if(action.payload.includes(PREFIX_LOCAL)){
        yield put(removeLocalFile(action.payload, action.meta))
        yield put(notify('Xóa tập tin thành công', { options: { variant: 'success' } }));
        yield put(closeAppBackdrop());
      }
      else {
        yield put(removeLocalFile(action.payload, action.meta))
        let params: [
          ILOANNormalStorageIncomeState,
          ILOANNormalStorageLOANState,
          ILOANNormalStorageLegalState,
          ILOANNormalFullState,
          ILOANNormalConfigState,
          string,
          IMasterData,
        ] = yield select(getLOANNormalStorageINCOMESave);
        const loanProductValidate: ILOANNormalStorageIncomeValidate = yield select(validateLOANNormalStorageIncome);
        const declareActive: string = yield select(getLOANNormalStorageCurrentDeclare());
        const isCheckValidateForm = loanProductValidate?.valid ?? true;
        // const isCheckValidateForm =  true;
        if (!isCheckValidateForm) {
          yield put(setIncomeValidate(loanProductValidate));
          yield put(closeAppBackdrop());
          // Check validate screen
          if (loanProductValidate.position && loanProductValidate.position.length > 0) {
            const declareType = loanProductValidate.declare as keyof ILOANNormalStorageIncomeDeclare;
         
            switch (loanProductValidate.declarePosition) {
              case 'salary':
                if(loanProductValidate.field === 'salary') {
                  yield put(notify('Vui lòng thêm nguồn lương', { options: { variant: 'error' } }));
                }
                break;
              case 'stock':
                if(loanProductValidate.field === 'stock') {
                  yield put(notify('Vui lòng thêm Cổ tức/Lợi nhuận', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceStockActive(loanProductValidate.position, {
                  declare: declareType
                }))
                break;
              case 'company':
                if(loanProductValidate.field === 'company') {
                  yield put(notify('Vui lòng thêm doanh nghiệp', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceCompanyActive(loanProductValidate.position, {
                  declare: declareType
                }))
                break;
              case 'business':{
                if(loanProductValidate.field === 'business') {
                  yield put(notify('Vui lòng thêm hộ kinh doanh', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceBussinessActive(loanProductValidate.position, {
                  declare: declareType
                }))
                break;
              }
              case 'deposit':
                if(loanProductValidate.field === 'deposit') {
                  yield put(notify('Vui lòng thêm Lãi tiền gửi/GTCG', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceDepositActive(loanProductValidate.position, {
                  declare: declareType
                }))
                break;
              case 'other':
                if(loanProductValidate.field === 'other') {
                  yield put(notify('Vui lòng thêm nguồn thu', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceOtherActive(loanProductValidate.position, {
                  declare: declareType
                }))
                break;
              case "assetRent":
                if (loanProductValidate.field === 'assetRent') {
                  yield put(notify('Vui lòng thêm tài sản cho thuê', { options: { variant: 'error' } }));
                }
                if (loanProductValidate.field === 'assetDetailRealEstate') {
                  yield put(notify('Vui lòng thêm loại tài sản cho thuê', { options: { variant: 'error' } }));
                }
                yield put(setIncomeSourceAssetRentActive(loanProductValidate.position, {
                  declare: declareType
                }))
                if (loanProductValidate.positionHorizontal) {
                  yield put(setIncomeSourceAssetRentRealEState(loanProductValidate.positionHorizontal, {
                    declare: declareType
                  }))
                }
                break;
              default:
                break;
            }
          }
          return
        }
        else {
          // yield put(setIncomeValidate({valid: true}));
          // yield put(showAppBackdrop());
          // yield put(closeAppBackdrop());
          yield* upload(
            params[0] as ILOANNormalStorageIncomeState,
            declareActive,
            action.meta.activeType as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">
          );
          // get new params data from store data after upload file
          params = yield select(getLOANNormalStorageINCOMESave);
          const los_uuid: string = yield select(getLOANNormalLOSuuid);
          if (action.meta.activeType === 'salary') {
            const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)
            const r: IApiResponse<unknown> = yield call(saveINCOMESalary, ...params, action.meta.activeType, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
            // const test = Math.floor(Math.random() * 10);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            } else {
              yield put(notify(
                `${r.errors[0]?.detail}`,
                { options: { variant: 'error' } }
              ));
              yield put(notify(
                'Xóa thất bại . Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'assetRent') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEAssrentRent, ...params, action.meta.activeType);
        
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              yield put(notify(
                  'Xóa thất bại . Vui lòng kiểm tra lại.',
                  { options: { variant: 'error' } }
                ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'business') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEBusiness, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              let msgError = "";
                r.errors.forEach((item: any) => {
                  msgError += `${item.detail} \n`;
                });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại . Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'company') {
            const r: IApiResponse<unknown> = yield call(saveINCOMECompany, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại . Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'stock') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEStock, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại . Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'deposit') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEDeposit, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(closeAppBackdrop());
            }
            else {
              let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại. Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'pension') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEPension, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại. Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
    
          if (action.meta.activeType === 'other') {
            const r: IApiResponse<unknown> = yield call(saveINCOMEOther, ...params, action.meta.activeType);
            if (r.success) {
              yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
              yield put(fetchListDataHistoryLogs(los_uuid));
              yield put(syncDataIncomeAfterSave(action.meta.activeType,{data:r.data}));
            }
            else {
              let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
              yield put(notify(msgError, { options: { variant: 'error' } }));
              yield put(notify(
                'Xóa thất bại. Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
            }
            yield put(closeAppBackdrop());
          }
        }
      }
    }
    catch (e) { 
      yield put(notify('Xóa tập tin không thành công', { options: { variant: 'error' } }));
      yield put(closeAppBackdrop());
      console.log(e)
    }

}

function* handleRemoveIncome(action: PayloadAction<string,string>, uuid: string, assetRentType?:string){
  const paramsPension: [
    ILOANNormalStorageIncomeState,
    ILOANNormalStorageLOANState,
    ILOANNormalStorageLegalState,
    ILOANNormalFullState,
    ILOANNormalConfigState,
    string,
    IMasterData,
  ] = yield select(getLOANNormalStorageINCOMESave);

  const params: [
    ILOANNormalStorageIncomeState,
    ILOANNormalFullState,
    string,
  ] = yield select(getLOANNormalStorageIncomeDelete);
  switch(action.payload){
    case 'salary':{
      const r: IApiResponse<unknown> = yield call(deleteIncomeSalary, ...params, uuid);

      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      } else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'salary' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    case 'assetRent':{
      console.log('assetRentType', assetRentType);
      if(assetRentType !== 'LOCAL'){
        const r: IApiResponse<unknown> = yield call(deleteIncomeAssrentRent, ...params, uuid, assetRentType ?? '');
        if (r.success) {
          yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
        }
        else {
          yield put(notify(
            'Không thể xóa, có lỗi xảy ra',
            { options: { variant: 'error' } }
          ));
          yield put(revertDataIncomeRemove(null, { incomeMain: 'asset-rent' }));
        }
        yield put(closeAppBackdrop());
      }
      break;
    }
    case 'business':{
      const r: IApiResponse<unknown> = yield call(deleteIncomeBusiness, ...params, uuid);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'business' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    case 'company':{
      const r: IApiResponse<unknown> = yield call(deleteIncomeCompany, ...params, uuid);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'company' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    case 'stock':{
      const r: IApiResponse<unknown> = yield call(deleteIncomeStock, ...params, uuid);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'stock' }));
      }
      yield put(closeAppBackdrop());

      break;
    }
    case 'deposit': {
      const r: IApiResponse<unknown> = yield call(deleteIncomeDeposit, ...params, uuid);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'deposit' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    case 'pension': {
      const r: IApiResponse<unknown> = yield call(deleteINCOMEPension, ...paramsPension, action.payload);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'pension' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    case 'other': {
      const r: IApiResponse<unknown> = yield call(deleteINCOMEOther, ...params, uuid);
      if (r.success) {
        yield put(notify('Xóa thành công', { options: { variant: 'success' } }));
      }
      else {
        yield put(notify(
          'Không thể xóa, có lỗi xảy ra',
          { options: { variant: 'error' } }
        ));
        yield put(revertDataIncomeRemove(null, { incomeMain: 'other' }));
      }
      yield put(closeAppBackdrop());
      break;
    }
    default: break;
  }
}

function* handleSaveContinueIncome(action: PayloadAction<string,string, {
  checkExistDataBeforeSave: boolean,
  delareData: {
    [key: string]: string[];
  },
  mainPath: string[],
  nextRuleDisabled: string[],
  current: number,
  current_MainIncome: string, 
  current_Income_declare: string,
  current_Income_source: string,
  checkDisabledUserList: boolean[]
}>) {
  try {
    if(action.meta.checkExistDataBeforeSave){
      yield put(showAppBackdrop())
      let params: [
        ILOANNormalStorageIncomeState,
        ILOANNormalStorageLOANState,
        ILOANNormalStorageLegalState,
        ILOANNormalFullState,
        ILOANNormalConfigState,
        string,
        IMasterData,
      ] = yield select(getLOANNormalStorageINCOMESave);
      const loanProductValidate: ILOANNormalStorageIncomeValidate = yield select(validateLOANNormalStorageIncome);
      const declareActive: string = yield select(getLOANNormalStorageCurrentDeclare());
      const isCheckValidateForm = loanProductValidate?.valid ?? true;
      // const isCheckValidateForm =  true;
      if (!isCheckValidateForm && action.payload !== 'balance'  && action.payload !== 'ability-repay') {
        yield put(setIncomeValidate(loanProductValidate));
        yield put(closeAppBackdrop());
        // Check validate screen
        if (loanProductValidate.position && loanProductValidate.position.length > 0) {
          const declareType = loanProductValidate.declare as keyof ILOANNormalStorageIncomeDeclare;
       
          switch (loanProductValidate.declarePosition) {
            case 'salary':
              if(loanProductValidate.field === 'salary') {
                yield put(notify('Vui lòng thêm nguồn lương', { options: { variant: 'error' } }));
              }
              break;
            case 'stock':
              if(loanProductValidate.field === 'stock') {
                yield put(notify('Vui lòng thêm Cổ tức/Lợi nhuận', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceStockActive(loanProductValidate.position, {
                declare: declareType
              }))
              break;
            case 'company':
              if(loanProductValidate.field === 'company') {
                yield put(notify('Vui lòng thêm doanh nghiệp', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceCompanyActive(loanProductValidate.position, {
                declare: declareType
              }))
              break;
            case 'business':{
              if(loanProductValidate.field === 'business') {
                yield put(notify('Vui lòng thêm hộ kinh doanh', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceBussinessActive(loanProductValidate.position, {
                declare: declareType
              }))
              break;
            }
            case 'deposit':
              if(loanProductValidate.field === 'deposit') {
                yield put(notify('Vui lòng thêm Lãi tiền gửi/GTCG', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceDepositActive(loanProductValidate.position, {
                declare: declareType
              }))
              break;
            case 'other':
              if(loanProductValidate.field === 'other') {
                yield put(notify('Vui lòng thêm nguồn thu', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceOtherActive(loanProductValidate.position, {
                declare: declareType
              }))
              break;
            case "assetRent":
              if (loanProductValidate.field === 'assetRent') {
                yield put(notify('Vui lòng thêm tài sản cho thuê', { options: { variant: 'error' } }));
              }
              if (loanProductValidate.field === 'assetDetailRealEstate') {
                yield put(notify('Vui lòng thêm loại tài sản cho thuê', { options: { variant: 'error' } }));
              }
              yield put(setIncomeSourceAssetRentActive(loanProductValidate.position, {
                declare: declareType
              }))
              if (loanProductValidate.positionHorizontal) {
                yield put(setIncomeSourceAssetRentRealEState(loanProductValidate.positionHorizontal, {
                  declare: declareType
                }))
              }
              break;
            default:
              break;
          }
        }
  
        return
      }
      else {
        // yield put(setIncomeValidate({valid: true}));
        // yield put(showAppBackdrop());
        // yield put(closeAppBackdrop());
        yield* upload(
          params[0] as ILOANNormalStorageIncomeState,
          declareActive,
          action.payload as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">
        );
        // get new params data from store data after upload file
        params = yield select(getLOANNormalStorageINCOMESave);
        const los_uuid: string = yield select(getLOANNormalLOSuuid);
        if (action.payload === 'salary') {
          const metadataConstant: IMetadataConstantState = yield select(getLOANNormalConfigMetadataConstant)
          const r: IApiResponse<unknown> = yield call(saveINCOMESalary, ...params, action.payload, metadataConstant?.data[METADATA_CONSTANT.NGHE_NGHIEP]);
          // const test = Math.floor(Math.random() * 10);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          } else {
            yield put(notify(
              `${r.errors[0]?.detail}`,
              { options: { variant: 'error' } }
            ));
            yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'assetRent') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEAssrentRent, ...params, action.payload);
      
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            yield put(notify(
                'Lưu thất bại . Vui lòng kiểm tra lại.',
                { options: { variant: 'error' } }
              ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'business') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEBusiness, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
              r.errors.forEach((item: any) => {
                msgError += `${item.detail} \n`;
              });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'company') {
          const r: IApiResponse<unknown> = yield call(saveINCOMECompany, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'stock') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEStock, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'deposit') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEDeposit, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(closeAppBackdrop());
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại. Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'pension') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEPension, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại. Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'other') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEOther, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(syncDataIncomeAfterSave(action.payload,{data:r.data}));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            let msgError = "";
            r.errors.forEach((item: any) => {
              msgError += `${item.detail} \n`;
            });
            yield put(notify(msgError, { options: { variant: 'error' } }));
            yield put(notify(
              'Lưu thất bại. Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
          }
          yield put(closeAppBackdrop());
        }
  
        if (action.payload === 'balance') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEBalance, ...params, action.payload);
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          } else {
            yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
        }
  
        //tab 3: ability
        if (action.payload === 'ability-repay') {
          const r: IApiResponse<unknown> = yield call(saveINCOMEAbility, ...params, action.payload);
  
          if (r.success) {
            yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
            yield put(fetchListDataHistoryLogs(los_uuid));
            yield put(closeAppBackdrop());
            yield callFuncSetNavigate(
              action.meta.delareData ,
              action.meta.mainPath ,
              action.meta.nextRuleDisabled ,
              action.meta.current ,
              action.meta.current_MainIncome ,
              action.meta.current_Income_declare ,
              action.meta.current_Income_source ,
              action.meta.checkDisabledUserList,
            )
          }
          else {
            yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
          }
          yield put(closeAppBackdrop());
        }
      }
    }
    else{
      yield callFuncSetNavigate(
        action.meta.delareData ,
        action.meta.mainPath ,
        action.meta.nextRuleDisabled ,
        action.meta.current ,
        action.meta.current_MainIncome ,
        action.meta.current_Income_declare ,
        action.meta.current_Income_source ,
        action.meta.checkDisabledUserList,
      )
    }
  }
  catch (e) { console.log(e) }
}

function* callFuncSetNavigate(
  // incomeOptions:string,
  delareData: {
    [key: string]: string[];
  },
  mainPath: string[],
  nextRuleDisabled: string[],
  current: number,
  current_MainIncome: string, 
  current_Income_declare: string,
  current_Income_source: string,
  checkDisabledUserList: boolean[]
  ){
  const los_uuid: string = yield select(getLOANNormalLOSuuid);
  const ruleDisabled: boolean = yield select(getRuleDisbled)
  const currentStateGuide: IStateStorageGuide | undefined = yield select(checkRoleButtonBar)
  
  const nextPosition = incomeMain.indexOf(current_MainIncome) + 1;
    
  const nextPositionCicRouterNormal = cicRouterNormal2.indexOf(current_Income_declare) + 1;
  const nextPositionIncomeSource = incomeSource.indexOf(current_Income_source) + 1;
  const nextPositionIncomeSourceRuleDisabled = nextRuleDisabled.indexOf(current_Income_source) + 1;

  if (current <= 0) { // main borrower // step 4 next
    const lastIndexIncomeSource = incomeSource.length - 1;
    if (nextPositionIncomeSource <= lastIndexIncomeSource) { // step 4 next not Rule
      if (!ruleDisabled) {
        yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${mainPath[0]}/${mainPath[1]}/${incomeSource[nextPositionIncomeSource]}`));
      }
      else { // step 4 next ruleDisabled
        yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${mainPath[0]}/${mainPath[1]}/${nextRuleDisabled[nextPositionIncomeSourceRuleDisabled]}`));
      }
    } else {
      let person = '-';
      const lastIndexCicRouterNormal = cicRouterNormal2.length - 1;
      const currentPerson = cicRouterNormal2[cicRouterNormal2.indexOf(current_Income_declare)];
      person = currentPerson;
      const currentData: string[] = delareData[currentPerson as string];
      const existCurrentPerson = currentData.indexOf(mainPath[1]);
      const nextPerson = cicRouterNormal2[nextPositionCicRouterNormal];
      const nextData: string[] = delareData[nextPerson as string];
      let route = '-';
      if (nextPositionCicRouterNormal <= lastIndexCicRouterNormal && existCurrentPerson === currentData.length - 1) {
        person = nextPerson;
        const exist = nextData.indexOf(mainPath[1]);
        if (exist === -1 && nextData.length > 0) {
          if (!ruleDisabled) {
            yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${person}/${nextData[0]}/${incomeSource[0]}`));
          }
          else {
            if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
              yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${person}/${nextData[0]}/${incomeSource[0]}`));
            }
            if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
              yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${person}/${nextData[0]}/${incomeSource[0]}`));
            }
          }
        } else {
          const index = cicRouterNormal2.indexOf(person);
          const dataNext = cicRouterNormal2.slice(index);
          const dataIdDelare = dataNext.map((item) => {
            return delareData[item as string];
          });
          // const isCheck = (arr: any) => arr?.length === 0;
          if (dataIdDelare?.every(arr => arr?.length === 0)) {
            if (!ruleDisabled) {
              yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`));
            }
            else {
              if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
                yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`));
              }
              if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
                yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`));
              }
            }
          } else {
            for (let index = 1; index <= (cicRouterNormal2.length - 1); index++) {
              const nextPersonNonData = cicRouterNormal2[index + 1]; // fix issue 8507
              const nextDataNonData = delareData[nextPersonNonData as string];
              if (nextDataNonData.length > 0) {
                if (!ruleDisabled) {
                  yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${nextPersonNonData}/${nextDataNonData[exist + 1]}/${incomeSource[0]}`))
                }
                else {
                  if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
                    yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${nextPersonNonData}/${nextDataNonData[exist + 1]}/${incomeSource[0]}`))
                  }
                  if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
                    yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${nextPersonNonData}/${nextDataNonData[exist + 1]}/${incomeSource[0]}`))
                  }
                }
                break;
              }
            }
          }
        }
      } else if (existCurrentPerson !== currentData.length - 1) {
        //case next by user
        const data_disavbled_person = currentData.map((item,idx)=>({
          checkRule:checkDisabledUserList[idx],
          person_id:item,
          hasDataIncome:nextRuleDisabled[idx]
        }))

        if (existCurrentPerson === -1 && currentData.length > 0) {
          route = currentData[0];
        } else if (currentData[existCurrentPerson + 1]) {
          route = currentData[existCurrentPerson + 1];
        }
        if (!ruleDisabled) {
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${person}/${route}/${incomeSource[0]}`))
        }
        else { // step  3 rule
          for(let k=0;k<data_disavbled_person.length;k++){
            const dataPerson_filter = data_disavbled_person.filter(item=>item.checkRule === false)
            console.log("dataPerson_filter",dataPerson_filter)
            if(data_disavbled_person[data_disavbled_person.length]?.checkRule === true){
              yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/co-payer/${route}/${incomeSource[0]}`))
            }
            else{
              yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${person}/${dataPerson_filter[k + 1].person_id}/${nextRuleDisabled[nextPositionIncomeSourceRuleDisabled]}`))
              break;
            }
          }
        }
      } else {
        if (!ruleDisabled) {
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
        }
        else {
          if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
            yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
          }
          if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
            yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
          }
        }
      }
    }
  } else {
    const lastIncomeMain = incomeMain.length - 1;
    if (nextPosition <= lastIncomeMain) {
      if (!ruleDisabled) {
        yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
      }
      else {
        if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
          // onConfirm("confirm")
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
        }
        if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
          // onConfirm("approve")
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/income/${incomeMain[nextPosition]}`))
        }
      }
    } else {
      if (!ruleDisabled) {
        yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/collateral`))
      }
      else {
        if (currentStateGuide?.current_state_group === "CONTROLLER_BRANCH") {
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/collateral`))
        }
        if (currentStateGuide?.current_state_group === "APPROVER_BRANCH") {
          yield put(setAppNavigate(`/loan/normal/init/${los_uuid}/collateral`))
        }
      }
    }
  }

}

function* handleSaveBeforeNextActionTabBalanceAbilityINCOME(action: PayloadAction<string,string,{callback:(value:any)=>void}|undefined>){
  yield handleSaveIncome(action);
  yield put(fetchLOANNormalDataBalanceAbility(_.get(action,'meta.los_uuid','')));
}
export default function* storageINCOMESaga() {
  yield takeEvery(removeIncomeSourceType.type, (action: {
    payload: string;
    type: string;
    meta: {
      declare: keyof ILOANNormalStorageIncomeDeclare;
      incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
      type?:string
    }
  }) => {
    return action.payload.includes(PREFIX_LOCAL)?()=>null:handleRemoveIncome({ payload: action.meta.incomeSource, type: action.type}, action.payload, action?.meta?.type);
  });
  yield takeEvery(removeIncomeSourceAssetRentType.type, (action: {
    payload: string;
    type: string;
    meta: {
      declare: keyof ILOANNormalStorageIncomeDeclare;
      incomeSource: keyof ILOANNormalStorageIncomeDeclareSalary;
    }
  }) => action.payload.includes(PREFIX_LOCAL)?()=>null:handleRemoveIncome({ payload: 'assetRent', type: removeIncomeSourceType.type}, action.payload, 'typeDetail' ));
  yield takeEvery(downloadMultiFile.type, handleDownloadMulti);
  yield takeEvery(downloadMultiAllFile.type, handleDownloadAll);

  yield takeEvery(saveLOANNormalINCOME.type, handleSaveIncome);
  yield takeEvery(saveBeforeNextActionTabBalanceAbilityINCOME.type, handleSaveBeforeNextActionTabBalanceAbilityINCOME);
  
  yield takeEvery(removeFile.type, handleRemoveFile);
  yield takeEvery(handleContinueIncome.type, handleSaveContinueIncome)
}
