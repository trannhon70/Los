import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { configState } from "./configs";
import { storageState } from "./storage/state";
import { DevToolLegalCase } from "dev_tool/modules/loan/normal/init/legal/case";
import { ConfigCase } from "./configs/case";
import { StorageCase } from "./storage/case";
import { storageApprovalState } from './storageApproval/state';
import { StorageApprovalCase } from './storageApproval/case';
import { StorteStateGuideCase } from "./storageGuide/case";
import { storageGuideState } from "./storageGuide/state";
import { storageColtrolState } from "./storageControl/state";
import { StorteStateControlCase } from "./storageControl/case";
import { IInterfaceLosID } from "./storageApproval/saga";
import { IStateParamsControlGuide } from "types/models/loan/normal/storageGuide";

const initialState: ILOANNormalState = {
  configs: configState,
  storage: storageState,
  storageApproval: storageApprovalState,
  storageStateGuide:storageGuideState,
  storageControl: storageColtrolState
}

const NormalSlice = createSlice({
  name: 'loan/normal',
  initialState,
  reducers: {
    ...ConfigCase,
    ...StorageCase,
    ...StorageApprovalCase,
    ...StorteStateGuideCase,
    ...StorteStateControlCase,
    
    fetchData(state, action: PayloadAction<string>){
      state.storage.full.fetching = true;
    },
    fetchDataBalanceAbility(state, action: PayloadAction<string>){
      
    },
    startFetchData(state){
      state.storage.full.starting = true;
    },
    fetchDataDone(state){
      state.storage.full.fetching = false;
      state.storage.full.starting = false;
      state.storage.full.fetched = true;
    },
    fetchDataApproval(state, action: PayloadAction<IInterfaceLosID>){
      state.storageApproval.full.fetching = true;
    },
    startFetchDataApproval(state){
      state.storageApproval.full.starting = true;
    },
    fetchDataApprovalDone(state){
      state.storageApproval.full.fetching = false;
      state.storageApproval.full.starting = false;
      state.storageApproval.full.fetched = true;
    },

    fetchDataGuideState(state, action: PayloadAction<IStateParamsControlGuide>){
      state.storageStateGuide.fetching = true;
    },
    startFetchGuideState(state){
      state.storageStateGuide.starting = true;
    },
    fetchDataGuideStateDone(state){
      state.storageStateGuide.fetching = false;
      state.storageStateGuide.starting = false;
      state.storageStateGuide.fetched = true;
    },
    clearNormalData(state){
      state.storage = storageState;
      state.storageApproval = storageApprovalState;
      state.storageStateGuide = storageGuideState;
      state.storageControl = storageColtrolState;
    },

    ...DevToolLegalCase,
  }
});

// Actions

export const NormalActions = NormalSlice.actions;
export const setLOANNormalStorageProductCategory = NormalActions.setCategory;
export const setLOANNormalStorageProductType = NormalActions.setType;
export const setLOANNormalStorageProductDetail = NormalActions.setDetail;
export const setLOANNormalStorageProductPartnerCode = NormalActions.setPartnerCode;
export const setLOANNormalStorageProductPartnerProduct = NormalActions.setPartnerProduct;
export const setLOANNormalStorageProductCollateral = NormalActions.setCollateral;
export const setLOANNormalStorageProductLinkProject = NormalActions.setLinkProject;
export const setLOANNormalStorageProductException = NormalActions.setException;
export const saveLOANNormalProduct = NormalActions.saveProduct;
export const setLOANNormalStorageData = NormalActions.setStorageData;
export const clearLOANNormalStorageProduct = NormalActions.clearProduct;
export const clearLOANNormalStorageLegal = NormalActions.clearLOANNormalStorageLegal;
export const clearStateGuide = NormalActions.clearStateGuide;
export const startFetchLOANNormalData = NormalActions.startFetchData;
export const clearStorageCollateral = NormalActions.clearStorageCollateral
export const clearNormalData = NormalActions.clearNormalData


export const __auto_fill_legal = NormalActions.__auto_fill_legal;

// approval
export const startFetchLOANApprovalData = NormalActions.startFetchDataApproval;
export const fetchLOANApprovalDataDone = NormalActions.fetchDataApprovalDone;
export const setLOANApprovalStorageData = NormalActions.setLOANNormalApprovalStorageData;
export const fetchLOANApprovalData = NormalActions.fetchDataApproval;
export const clearStorageApprovalFullData = NormalActions.clearStorageApprovalFullData;

export const fetchApprovalFullDocument = NormalActions.fetchApprovalFullDocument;
export const fetchApprovalSourceIncome  = NormalActions.fetchApprovalSourceIncome;



//state guide 
export const fetchDataGuideState = NormalActions.fetchDataGuideState;
export const startFetchGuideState = NormalActions.startFetchGuideState;
export const fetchDataGuideStateDone = NormalActions.fetchDataGuideStateDone;

export const setLOANGuide = NormalActions.setLOANNormalteGuide;

// Reducer
const LOANNormalReducer = NormalSlice.reducer;
export default LOANNormalReducer;