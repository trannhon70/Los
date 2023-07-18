import { PayloadAction } from "@reduxjs/toolkit";
import {
  downloadAllAttachFile,
  downloadAllDynamicAttachFile,
  downloadSingleFile,
} from "../actions";
import { downloadMultiFile } from "./api";
import {
  ILOANNormalDocument,
  ILOANNormalDynamicDocument,
  ILOANNormalFile,
  TYPE_DOCUMENT_DYNAMIC,
} from "types/models/loan/normal/configs/Document";
import { call, put, select } from "redux-saga/effects";
import JSZip from "jszip";
import { takeEvery } from "redux-saga/effects";

import { closeAppBackdrop } from "features/app/store/slice";
import { IApiResponse } from "types";
import { notify } from "features/app/store/slice";
// import {getIncomeZipNameLegel} from 'features/loan/normal/storage/income/selector';
import { removeAccents } from "utils";
import moment from "moment";
import { useSelector } from "react-redux";
import { getLOANNormalLOSId } from "../../storage/selectors";
const saveAs = require("jszip/vendor/FileSaver.js");


type fileResDownload = {
  uuid: string;
  file_url: string;
  file_name: string;
  docName: string;
};
type fileResDownloadName = {
  docName: string;
  uuid: string;
  file_url: string;
  file_name: string;
};

const downloadAllLegel = async (
  urlsString: fileResDownloadName[],
  zipName: string
) => {
  const listFiles = urlsString.map((file) => ({
    ...file,
    file_url: file.file_url,
    docName: file.docName,
  }));
  const toFetchDataURL = (file: fileResDownload) =>
    fetch(file.file_url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({ baseData: reader.result, fileInfo: file });
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  try {
    const res = await Promise.all(
      listFiles.map((file) => toFetchDataURL(file))
    );
    const data =
      (res as { baseData: string; fileInfo: fileResDownload }[]) ?? [];
    const zip = new JSZip();
    data.forEach((file, index) => {
      const folder = zip.folder(`${file?.fileInfo?.docName}`);
      folder?.file(
        `${file.fileInfo.file_name}`,
        file.baseData.substr(file.baseData.indexOf(",") + 1),
        { base64: true, createFolders: true }
      );
    });
    const content = await zip.generateAsync({ type: "blob" });
    const blob = new Blob([content], { type: "octet/stream" });
    saveAs(blob, zipName);
  } catch (error) {
    console.log("error", error);
  }
};

function* handleDownloadAll(action: PayloadAction<ILOANNormalDocument[]>) {
  const data: {
    file_uuid: string;
    docName: string;
    created_by: string | number;
  }[] = [];

  action.payload.forEach((doc) => {
    doc?.child_files?.forEach((file) => {
      data.push({
        docName: doc?.document_name ?? "",
        file_uuid: file?.uuid ?? "",
        created_by: file?.created_by ?? "",
      });
    });
  });

  try {
    const r: IApiResponse<fileResDownload[]> = yield call(
      downloadMultiFile,
      data.map((file) => file.file_uuid)
    );
    const file: fileResDownloadName[] =
      r?.data?.map((item, i) => {
        return {
          docName: data[i]?.docName,
          file_name: item?.file_name,
          uuid: item?.uuid,
          file_url: item?.file_url,
        };
      }) ?? [];

    if (r.success) {
      const name = removeAccents(
        (data[0]?.created_by ?? "Legal").toString()
      ).toUpperCase();
      const currentDate = moment().format("YYYYMMDD");
      const activeType = action.payload[0]?.active?.toLocaleUpperCase();
      const zipName = name.replace(/\s/g, "_");
      yield downloadAllLegel(
        file,
        `${zipName}_${activeType}_${currentDate}.zip`
      );

      yield put(
        notify("Tải xuống tập tin thành công", {
          options: { variant: "success" },
        })
      );
      yield put(closeAppBackdrop());
    } else {
      yield put(
        notify("Tải xuống tập tin không thành công", {
          options: { variant: "error" },
        })
      );
    }
    yield put(closeAppBackdrop());
  } catch (error) {}
}

const download = ({
  filename = "",
  url = "",
}: {
  filename: string;
  url: string;
}) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
};

function* handleDownloadSingleFile(action: PayloadAction<string>) {
  const r: IApiResponse<
    {
      uuid: string;
      file_url: string;
      file_name: string;
    }[]
  > = yield call(downloadMultiFile, action.payload);
  if (r.success) {
    r.data?.forEach((file) => {
      download({
        filename: decodeURI(file.file_name),
        url: file.file_url,
      });
    });
    yield put(
      notify("Tải xuống tập tin thành công", {
        options: { variant: "success" },
      })
    );
    yield put(closeAppBackdrop());
  } else {
    yield put(
      notify("Tải xuống tập tin không thành công", {
        options: { variant: "error" },
      })
    );
  }
  yield put(closeAppBackdrop());
}
type IResultPayloadFile = {
  file: ILOANNormalFile;
  docName: string[];
  created_by: string;
};
interface fileResDownloadData extends Omit<fileResDownload, "docName"> {
  docName: string[];
}
interface fileResDownloadDataBase64 extends fileResDownloadData {
  baseData: string;
}
interface FileResFolderData {
  folder_id: string;
  folder_name: string;
  dataMapping: string[];
  files?: fileResDownloadDataBase64[];
  data: FileResFolderData[];
}
const excuteDataFolder = (inputData: fileResDownloadDataBase64[]) => {
  const mapping =
    (levels: string[], file: fileResDownloadDataBase64) =>
    (level: string, index: number) => {
      const [folder_id, folder_name] = level.split("</DOCNAME>");
      const item: FileResFolderData = {
        folder_id,
        folder_name,
        dataMapping: levels
          .slice(index + 1, levels.length)
          .filter((it) => it !== level),
        data: [],
      };
      const result = item.dataMapping.map(mapping(item.dataMapping, file))[0];
      if (item.dataMapping.length === 0) {
        item.files = [file];
      }
      item.data = result ? [result] : [];
      return item;
    };

  const handleExist =
    (exist: FileResFolderData) => (item: FileResFolderData) => {
      const existChild = exist.data.find(
        (it) => it.folder_id === item.folder_id
      );
      if (existChild) {
        if (item.data.length === 0) {
          existChild.files = [
            ...(existChild?.files ?? []),
            ...(item?.files ?? []),
          ];
        } else {
          item.data.forEach(handleExist(existChild));
        }
      } else {
        exist.data.push(item);
      }
    };
  const masterData: FileResFolderData[] = [];
  inputData.forEach((file) => {
    const dataItem = file.docName.map(mapping(file.docName, file))[0];

    if (dataItem) {
      const exist = masterData.find(
        (it) => it.folder_id === dataItem.folder_id
      );
      if (exist) {
        if(dataItem.data.length === 0){
          exist.files = [...(exist.files??[]),...(dataItem.files??[])]
        }else{
          dataItem.data.forEach(handleExist(exist));
        }
        dataItem.data.forEach(handleExist(exist));
      } else {
        masterData.push(dataItem);
      }
    }
  });
  return masterData;
};


const handleZipFile = async (listFiles: fileResDownloadData[],nameFolder:string) => {

  const toFetchDataURL = (file: fileResDownloadData) =>
    /**
     * fetch(APP_SERVER_NAME_DOWLOAD+file.file_url)
     * use this method when you want test download in localhost
     */
      fetch(file.file_url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({ ...file, baseData: reader.result });
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  const res = await Promise.all(listFiles.map((file) => toFetchDataURL(file)));
  const data: fileResDownloadDataBase64[] =
    (res as fileResDownloadDataBase64[]) ?? [];
  const zip = new JSZip();

  const mappingData = excuteDataFolder(data);
  const mappingFile = (Gfolder:JSZip)=>(file:fileResDownloadDataBase64)=>{
    Gfolder?.file(
      `${file.file_name}`,
      file.baseData.substr(file.baseData.indexOf(",") + 1),
      { base64: true, createFolders: true }
    )
  };
  const mappingFolder = (Gfolder:JSZip)=>(doc:FileResFolderData)=>{
    const folder = Gfolder?.folder(doc.folder_name?.replace(/\//g,'-'));
    if(!folder) return;
    if(doc.data.length > 0){
      doc.data.map(mappingFolder(folder));
    }else{
      doc.files?.map(mappingFile(folder))
    }
  }
  mappingData.map((doc) => {
    const folder = zip.folder(doc.folder_name?.replace(/\//g,'-'));
    if(!folder) return;
    if(doc.data.length > 0){
      doc.data.map(mappingFolder(folder));
    }else{
      doc.files?.map(mappingFile(folder))
    }
  })

  const content = await zip.generateAsync({ type: "blob" });
    const blob = new Blob([content], { type: "octet/stream" });
    saveAs(blob, `${nameFolder}.zip`);
};

function* handleDownloadAllDynamicAttachFile(
  action: PayloadAction<ILOANNormalDynamicDocument[]>
) {
  const list: IResultPayloadFile[] = [];
  const mappingFile =(docName:string)=> (file:ILOANNormalFile)=>{
    const result = {
        file,
        created_by: file?.created_by?.toString() ?? "",
        docName: (docName.split("</>") ?? []).filter((n) => !!n),
      };
      list.push(result);
  };
  const mappingDoc =(docNameParam:string) => (doc:ILOANNormalDynamicDocument)=>{
      let docName = (doc.document_id || "OTHER") +
      "</DOCNAME>" +
      (doc.document_name || "KHÁC");
      const tempDocName =docNameParam + "</>"+ docName;
      if(doc.hasSubDoc){
        (doc.childs as ILOANNormalDynamicDocument[]).map(mappingDoc(tempDocName));
      }else{
        (doc.childs as ILOANNormalFile[]).map(mappingFile(tempDocName));
      }
  };
  yield (action.payload).map(mappingDoc(''));
  if(list.length === 0) {
    yield put(
      notify("Vui lòng lưu file trước khi tải", {
        options: { variant: "warning" },
      })
    );
    return;
  }
  try {
    const r: IApiResponse<fileResDownload[]> = yield call(
      downloadMultiFile,
      list.map((item) => item?.file?.uuid ?? "")
    );

    const dataRespone: fileResDownloadData[] =
      r.data?.map((file, index) => ({
        docName: list[index].docName,
        file_name: file.file_name,
        file_url: file.file_url,
        uuid: file.uuid,
      })) ?? [];

  const los_id: string = yield select(getLOANNormalLOSId);
  const currentDate = moment().format('YYYYMMDD');
    handleZipFile(dataRespone,`${los_id}_${currentDate}`);
  } catch (error) {
    console.log(error);
  }
  console.log("list", { inputData: action, outputData: list });
}

export default function* configAttachFileSaga() {
  yield takeEvery(downloadSingleFile.type, handleDownloadSingleFile);
  yield takeEvery(downloadAllAttachFile.type, handleDownloadAll);
  yield takeEvery(
    downloadAllDynamicAttachFile.type,
    handleDownloadAllDynamicAttachFile
  );
}
