import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { IFinanceMetadata } from "types/models/loan/normal/configs/FinanceMetadata";

export const FinanceMetadataCase = {
  fetchFinanceMetadata(state: Draft<ILOANNormalState>){
    state.configs.financeMetadata.fetched = false;
    state.configs.financeMetadata.fetching = true;
  },
  fetchFinanceMetadataDone(state: Draft<ILOANNormalState>, action: PayloadAction<IFinanceMetadata[]>){
    state.configs.financeMetadata.fetched = true;
    state.configs.financeMetadata.fetching = false;
    state.configs.financeMetadata.data = action.payload;
  }
}