import { ILOANNormalState } from "types/models/loan/normal";
import { Draft, PayloadAction } from "@reduxjs/toolkit"
import { ICurrentFile, ICustomerInfo, IDownload, IPageDocument, IProfileDocument, IProfileDocumentGetFile, IProfileDocumentStructure, ISearchDocument } from "types/models/loan/normal/storage/ProfileDocument";


export const ProfileDocumentSCase = {
  getProfileDocumentCustomerInfo(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},

  updateLOANNormalStorageProfileDocumentCustomerInfo(state: Draft<ILOANNormalState>, action: PayloadAction<ICustomerInfo>) {
    state.storage.profileDocument.customerInfo = action.payload
  },

  clearProfileDocument(state: Draft<ILOANNormalState>){
    state.storage.profileDocument.data = []
  },

  getProfileDocument(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},

  updateLOANNormalStorageProfileDocument(state: Draft<ILOANNormalState>, action: PayloadAction<IProfileDocument[]>) {
    state.storage.profileDocument.data = [
      ...action.payload,
    ]
  },

  getProfileDocumentStructure(state: Draft<ILOANNormalState>, action: PayloadAction<string>) { },
  updateLOANNormalStorageProfileDocumentStructure(state: Draft<ILOANNormalState>, action: PayloadAction<IProfileDocumentStructure[]>) {
    state.storage.profileDocument.structure = [
      ...action.payload,
    ]
  },

  getProfileDocumentGetfile(state: Draft<ILOANNormalState>, action: PayloadAction<IPageDocument>) {
    state.storage.profileDocument.getFilePage.fetched = true;
    state.storage.profileDocument.getFilePage.fetching = true;
    action.payload.page && (state.storage.profileDocument.getFilePage.page = action.payload.page);
    action.payload.limit && (state.storage.profileDocument.getFilePage.limit = action.payload.limit);
    action.payload.date_start && (state.storage.profileDocument.getFilePage.date_start = action.payload.date_start);
    action.payload.date_end && (state.storage.profileDocument.getFilePage.date_end = action.payload.date_end);
   },

  updateLOANNormalStorageProfileDocumentGetFile(state: Draft<ILOANNormalState>, action: PayloadAction<IProfileDocumentGetFile[]>) {
    state.storage.profileDocument.getFile = [
      ...action.payload,
    ];
  },

  //page
  documentGetfileToPage(state: Draft<ILOANNormalState>, action: PayloadAction<number>) {
    if(action.payload > 0){
      state.storage.profileDocument.getFilePage.page = action.payload;
      state.storage.profileDocument.getFilePage.fetched = false;
    }
  },

  updateDocumentTotalPage(state: Draft<ILOANNormalState>, action: PayloadAction<number>){
    if(action.payload > 0){
      state.storage.profileDocument.getFilePage.total_page = action.payload;
      
    }
  },

  updateDocumentTotalItem(state: Draft<ILOANNormalState>, action: PayloadAction<number>){
    if(action.payload > 0){
      state.storage.profileDocument.getFilePage.total_item = action.payload;
      
    }
  },

  updateDocumentLimit(state: Draft<ILOANNormalState>, action: PayloadAction<number>){
    state.storage.profileDocument.getFilePage.limit = action.payload;
},

  documentGetfileUpdateLimit(state: Draft<ILOANNormalState>, action: PayloadAction<number>){
    state.storage.profileDocument.getFilePage.limit = action.payload;
    state.storage.profileDocument.getFilePage.fetched = false;
  },

  documentGetfileList(state: Draft<ILOANNormalState>, action: PayloadAction<Partial<IPageDocument>>){
    state.storage.profileDocument.getFilePage.fetched = false;
    state.storage.profileDocument.getFilePage.fetching = true;
    action.payload.page && (state.storage.profileDocument.getFilePage.page = action.payload.page)
    action.payload.limit && (state.storage.profileDocument.getFilePage.limit = action.payload.limit)
    action.payload.total_item && (state.storage.profileDocument.getFilePage.total_item = action.payload.total_item)
  },

  documentFileListDone:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IProfileDocumentGetFile[], string , Partial<IPageDocument>>){
      state.storage.profileDocument.getFile = action.payload;
      state.storage.profileDocument.getFilePage.fetching = false;
      state.storage.profileDocument.getFilePage.fetched = true;
      action.meta.total_page && (state.storage.profileDocument.getFilePage.total_page = action.meta.total_page)
      action.meta.total_item && (state.storage.profileDocument.getFilePage.total_item = action.meta.total_item)
    },
    prepare(payload: IProfileDocumentGetFile[], paging:Partial<IPageDocument> ){
      return {payload, meta: paging}
    }
  },

  updateDocumentSearch(state: Draft<ILOANNormalState>, action: PayloadAction<ISearchDocument>){
    state.storage.profileDocument.getFilePage.name = action.payload.name;
    state.storage.profileDocument.getFilePage.date_start = action.payload.date_start;
    state.storage.profileDocument.getFilePage.date_end = action.payload.date_end;
    state.storage.profileDocument.getFilePage.fetched = true;
  },

  downloadDocumentFile(state: Draft<ILOANNormalState>, action: PayloadAction<IDownload>){},
  setDownloadDocumentFile(state: Draft<ILOANNormalState>, action: PayloadAction<ICurrentFile>){
    state.storage.profileDocument.currentFile = action.payload
  },
  setFileExtension(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storage.profileDocument.file_extenstion = action.payload
  },
  clearCurrentFile(state: Draft<ILOANNormalState>){
    state.storage.profileDocument.currentFile = null
  },
  setBreadScrumb(state: Draft<ILOANNormalState>, action: PayloadAction<string[]>){
    state.storage.profileDocument.breadcrumb = action.payload
  },

  clearDocumentsCabinet(state: Draft<ILOANNormalState>){
    state.storage.profileDocument.structure = []
    state.storage.profileDocument.getFile = []
    state.storage.profileDocument.customerInfo = {}
    state.storage.profileDocument.breadcrumb = []

  },

}