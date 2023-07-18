import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { IDefaultFlag, IIdCodeName } from "types/base";
import { ProductCase } from "./product/case";
import { FinanceMetadataCase } from "./finance-metadata/case";
import { IDocumentType, IPolicyDetail } from 'types/models/master-data/state';
import { IPolicyParams } from "./policy-detail/api";
import { IDocumentParams } from "./document-type/api";
import { pathKeyStore } from "utils";
import { IVehicleDetail } from "types/models/loan/normal/configs/VehicleDetail";
import { ILOANNormalDocument, ILOANNormalDynamicDocument } from "types/models/loan/normal/configs/Document";
import { IValidateDateType } from "types/models/loan/normal/configs/ValidateDateType";
import { IMetadataBody, IMetadataConstant } from "types/models/loan/normal/configs/metadata";

export const ConfigCase = {
  ...ProductCase,
  ...FinanceMetadataCase,
  fetchConfigGender(state: Draft<ILOANNormalState>){
    state.configs.gender.fetched = false;
    state.configs.gender.fetching = true;
  },
  fetchConfigGenderDone(state: Draft<ILOANNormalState>, action: PayloadAction<(IIdCodeName & IDefaultFlag)[]>){
    state.configs.gender.fetched = true;
    state.configs.gender.fetching = false;
    state.configs.gender.data = action.payload;
  },
  fetchPolicyDetail(state: Draft<ILOANNormalState>, action: PayloadAction<IPolicyParams>){
    state.configs.policyDetail[action.payload.policy_group_id] = {
      ...(state.configs.policyDetail[action.payload.policy_group_id] ?? {}),
      fetching: true
    }
  },
  fetchPolicyDetailStarted(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.configs.policyDetail[action.payload].started = true;
  },
  fetchedPolicyDetail: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IPolicyDetail[], string, string>){
      state.configs.policyDetail[action.meta].fetched = true;
      state.configs.policyDetail[action.meta].fetching = false;
      state.configs.policyDetail[action.meta].started = false;
      state.configs.policyDetail[action.meta].data = action.payload.map(item => {
        return {
          ...item,
          code: item.code.trim()
        }
      })
    },
    prepare(payload: IPolicyDetail[], meta: string){
      return { payload, meta };
    }
  },
  fetchDataDocumentType(state: Draft<ILOANNormalState>, action: PayloadAction<IDocumentParams>){
    state.configs.documentType[pathKeyStore(action.payload)] = {
      ...(state.configs.documentType[pathKeyStore(action.payload)] ?? {}),
      fetching: true
    }
  },
  fetchDocumentTypeStarted(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.configs.documentType[action.payload].started = true;
  },
  fetchedDocumentType: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IDocumentType[], string, string>){
      state.configs.documentType[action.meta].fetched = true;
      state.configs.documentType[action.meta].fetching = false;
      state.configs.documentType[action.meta].started = false;
      state.configs.documentType[action.meta].data = action.payload.map(item => {
        return {
          ...item,
          code: item.code.trim()
        }
      })
    },
    prepare(payload: IDocumentType[], meta: string){
      return { payload, meta };
    }
  },
  fetchVehicleDetail(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.configs.vehicleDetail.fetching = true
  },
  fetchVehicleDetailStarted(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.configs.vehicleDetail.started = true;
  },
  fetchedVehicleDetail(state: Draft<ILOANNormalState>, action: PayloadAction<IVehicleDetail[]>){
    state.configs.vehicleDetail.fetched = true;
    state.configs.vehicleDetail.fetching = false;
    state.configs.vehicleDetail.started = false;
    state.configs.vehicleDetail.data = action.payload
  },
  downloadSingleFile(state: Draft<ILOANNormalState>, action: PayloadAction<string[]>){},
  downloadAllAttachFile(state: Draft<ILOANNormalState>,action:PayloadAction<ILOANNormalDocument[]>){
  },
  downloadAllDynamicAttachFile(state: Draft<ILOANNormalState>,action:PayloadAction<ILOANNormalDynamicDocument[]>){},
  fetchValidateDateType(state:Draft<ILOANNormalState>){
    state.configs.validateDateType.fetching = true
  },
  fetchValidateDateTypeStarted(state: Draft<ILOANNormalState>){
    state.configs.validateDateType.started = true;
  },
  fetchedValidateDateType(state: Draft<ILOANNormalState>, action: PayloadAction<IValidateDateType[]>){
    state.configs.validateDateType.fetched = true;
    state.configs.validateDateType.fetching = false;
    state.configs.validateDateType.started = false;
    state.configs.validateDateType.data = action.payload
  },
  fetchedFailValidateDateType(state: Draft<ILOANNormalState>){
    state.configs.validateDateType.fetched = true;
    state.configs.validateDateType.fetching = false;
    state.configs.validateDateType.started = false;
  },
  fetchMetadataConstant(state:Draft<ILOANNormalState>, action: PayloadAction<IMetadataBody>){
    state.configs.metadataConstant.fetching = true
  },
  fetchMetadataConstantStarted(state: Draft<ILOANNormalState>){
    state.configs.metadataConstant.started = true;
  },
  fetchedMetadataConstant(state: Draft<ILOANNormalState>, action: PayloadAction<IMetadataConstant>){
    state.configs.metadataConstant.fetched = true;
    state.configs.metadataConstant.fetching = false;
    state.configs.metadataConstant.started = false;
    const key = Object.keys(action.payload)
    for(let i of key){
      state.configs.metadataConstant.data[i] = action.payload[i]
    }
  },
  fetchedFailMetadataConstant(state: Draft<ILOANNormalState>){
    state.configs.metadataConstant.fetched = true;
    state.configs.metadataConstant.fetching = false;
    state.configs.metadataConstant.started = false;
  },
}