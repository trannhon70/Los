import { PayloadAction } from "@reduxjs/toolkit";
import { closeAppBackdrop, notify } from "features/app/store/slice";
import JSZip from 'jszip';
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "types";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { ILOANApprovalFullState } from "types/models/loan/normal/storageApproval";
import { ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeState, ILOANNormalStorageIncomeValidate } from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { IMasterData } from "types/models/master-data";
import {
  downloadMultiAllFileApproval, downloadMultiFileApproval, saveLOANApprovalINCOME, setIncomeApprovalValidate, setIncomeSourceApprovalAssetRentActive,
  setIncomeSourceApprovalAssetRentRealEState,
  setIncomeSourceApprovalBussinessActive, setIncomeSourceApprovalCompanyActive, setIncomeSourceApprovalDepositActive,
  setIncomeSourceApprovalOtherActive, setIncomeSourceApprovalSalaryActive, setIncomeSourceApprovalStockActive, syncDataIncomeApprovalAfterSave
} from "./action";
import {
  downloadINCOMEMultiFile, saveINCOMEAbilityS2, saveINCOMEAssrentRentS2, saveINCOMEBalanceS2, saveINCOMEBusinessS2, saveINCOMECompanyS2, saveINCOMEDepositS2,
  saveINCOMEOtherS2, saveINCOMEPensionS2, saveINCOMESalaryS2, saveINCOMEStockS2
} from "./api";
import { getIncomeZipName, getLOANNormalStorageApprovalINCOMESave, validateLOANNormalStorageApprovalIncome } from "./selector";
const saveAs = require('jszip/vendor/FileSaver.js');

function* handleSaveIncome(action: PayloadAction<string,string,{callback:(value:any)=>void}|undefined>) {
  try {
    let params: [
      ILOANNormalStorageIncomeState,
      ILOANApprovalFullState,
      ILOANNormalConfigState,
      string,
      IMasterData,
    ] = yield select(getLOANNormalStorageApprovalINCOMESave);
    const loanProductValidate: ILOANNormalStorageIncomeValidate = yield select(validateLOANNormalStorageApprovalIncome);
    const isCheckValidateForm = loanProductValidate?.valid ?? true;
    // const isCheckValidateForm =  true;
    if (!isCheckValidateForm && action.payload !== 'balance'  && action.payload !== 'ability-repay') {
      yield put(setIncomeApprovalValidate(loanProductValidate));
      yield put(notify('Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại', { options: { variant: 'error' } }));
      // Check validate screen
      if (loanProductValidate.position && loanProductValidate.position.length > 0) {
        const declareType = loanProductValidate.declare as keyof ILOANNormalStorageIncomeDeclare;
     
        switch (loanProductValidate.declarePosition) {
          case 'salary':
            if(loanProductValidate.field === 'salary') {
              yield put(notify('Vui lòng thêm nguồn lương', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalSalaryActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'stock':
            if(loanProductValidate.field === 'stock') {
              yield put(notify('Vui lòng thêm Cổ tức/Lợi nhuận', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalStockActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'company':
            if(loanProductValidate.field === 'company') {
              yield put(notify('Vui lòng thêm doanh nghiệp', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalCompanyActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'business':{
            if(loanProductValidate.field === 'business') {
              yield put(notify('Vui lòng thêm hộ kinh doanh', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalBussinessActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          }
          case 'deposit':
            if(loanProductValidate.field === 'deposit') {
              yield put(notify('Vui lòng thêm Lãi tiền gửi/GTCG', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalDepositActive(loanProductValidate.position, {
              declare: declareType
            }))
            break;
          case 'other':
            if(loanProductValidate.field === 'other') {
              yield put(notify('Vui lòng thêm nguồn thu', { options: { variant: 'error' } }));
            }
            yield put(setIncomeSourceApprovalOtherActive(loanProductValidate.position, {
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
            yield put(setIncomeSourceApprovalAssetRentActive(loanProductValidate.position, {
              declare: declareType
            }))
            if (loanProductValidate.positionHorizontal) {
              yield put(setIncomeSourceApprovalAssetRentRealEState(loanProductValidate.positionHorizontal, {
                declare: declareType
              }))
            }
            break;
          default:
            break;
        }
      }
      // yield put(closeAppBackdrop());
      return
    }
    else {
      
      // get new params data from store data after upload file
      params = yield select(getLOANNormalStorageApprovalINCOMESave);

      if (action.payload === 'salary') {
        const r: IApiResponse<unknown> = yield call(saveINCOMESalaryS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
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
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'assetRent') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEAssrentRentS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          yield put(notify(
              'Lưu thất bại . Vui lòng kiểm tra lại.',
              { options: { variant: 'error' } }
            ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'business') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEBusinessS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
            r.errors.map((item: any) => {
              msgError += `${item.detail} \n`;
            });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'company') {
        const r: IApiResponse<unknown> = yield call(saveINCOMECompanyS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.map((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'stock') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEStockS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.map((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại . Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'deposit') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEDepositS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
          // yield put(closeAppBackdrop());
        }
        else {
          let msgError = "";
          r.errors.map((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'pension') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEPensionS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.map((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'other') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEOtherS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          yield put(syncDataIncomeApprovalAfterSave(action.payload,{data:r.data}));
        }
        else {
          let msgError = "";
          r.errors.map((item: any) => {
            msgError += `${item.detail} \n`;
          });
          yield put(notify(msgError, { options: { variant: 'error' } }));
          yield put(notify(
            'Lưu thất bại. Vui lòng kiểm tra lại.',
            { options: { variant: 'error' } }
          ));
        }
        // yield put(closeAppBackdrop());
      }

      if (action.payload === 'balance') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEBalanceS2, ...params);
        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
        } else {
          yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
        }
        // yield put(closeAppBackdrop());
      }

      //tab 3: ability
      if (action.payload === 'ability-repay') {
        const r: IApiResponse<unknown> = yield call(saveINCOMEAbilityS2, ...params);

        if (r.success) {
          yield put(notify('Lưu thành công', { options: { variant: 'success' } }));
          // yield put(closeAppBackdrop());
        }
        else {
          yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
        }
        // yield put(closeAppBackdrop());
      }
    
    }
  }
  catch (e) { 
    console.log(e) 
    yield put(notify('Lưu thất bại', { options: { variant: 'error' } }));
  }
  finally{
    yield put(closeAppBackdrop());
  }
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
  const payload = action.payload as string;
  const payloadArr = payload.toString().split("<PREFIX>");
  const type = payloadArr[0];
  const uuid = payloadArr[1]
  const r: IApiResponse<{
    uuid: string;
    file_url: string;
    file_name: string;
  }[]> = yield call(downloadINCOMEMultiFile, [uuid] );
  if (r.success) {
    r.data?.forEach((file) => {
      let nameFile = '' as string;
      const acceptFileDocument = '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt';
      if(acceptFileDocument.includes(type)){
        nameFile = `${file.file_name}.${type}`;
      } else if (type === 'img/png' || type === 'img/jpg' || type === 'img/jpeg'){
        const png = type.split("/");
        nameFile = `${file.file_name}.${png[1]}`;
      } else {
        nameFile = file.file_name;
      }
      download({ filename: decodeURI(nameFile), url: file.file_url });
      
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

const downloadAll2 = async (urlsString: fileResDownload[],zipName:string, type: string) => {
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
        let nameFile = '' as string;
        const acceptFileDocument = '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt';
        if(acceptFileDocument.includes(type)){
          nameFile = `${file.fileInfo.file_name}.${type}`;
        } else if (type === 'img/png' || type === 'img/jpg' || type === 'img/jpeg'){
          const png = type.split("/");
          nameFile = `${file.fileInfo.file_name}.${png[1]}`;
        } else {
          nameFile = file.fileInfo.file_name;
        }

        zip.file(nameFile, file.baseData.substr(file.baseData.indexOf(',')+1), {base64: true});
      });
      const content = await zip.generateAsync({type: "blob"});
      const blob = new Blob([content], {type: "octet/stream"});
      saveAs(blob, zipName);

    } catch (error) {
      console.log('error',error);
    }
}

function* handleDownloadAll(action: PayloadAction<string>) {
  const payload = action.payload as string;
  const payloadArr = payload.toString().split("<PREFIX>");
  const type = payloadArr[0];
  const uuid =  payloadArr[1];
  const r: IApiResponse<fileResDownload[]> = yield call(downloadINCOMEMultiFile, [uuid]);
  if (r.success) {
  const nameFile:string = yield select(getIncomeZipName);
    yield downloadAll2(r.data ?? [],`${nameFile}.zip`, type);
    yield put(notify('Tải xuống tập tin thành công', { options: { variant: 'success' } }));
    yield put(closeAppBackdrop());
  }
  else {
    yield put(notify('Tải xuống tập tin không thành công', { options: { variant: 'error' } }));
  }
  yield put(closeAppBackdrop());
}

export default function* storageINCOMESagaApproval() {
  yield takeEvery(downloadMultiFileApproval.type, handleDownloadMulti);
  yield takeEvery(downloadMultiAllFileApproval.type, handleDownloadAll);
  yield takeEvery(saveLOANApprovalINCOME.type, handleSaveIncome);
}

