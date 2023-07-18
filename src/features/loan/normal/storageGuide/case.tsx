import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from 'types/models/loan/normal';

export const StorteStateGuideCase = {
  setLOANNormalteGuide(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<any | null>
  ) {
    state.storageStateGuide.data = {
      ...state.storageStateGuide.data,
      ...action.payload
    }
  },
  clearLOANNormalGuide(state: Draft<ILOANNormalState>){
    state.storageStateGuide.starting = false
    state.storageStateGuide.fetching = false
    state.storageStateGuide.fetched = false
    state.storageStateGuide.data = undefined
  },
  clearGuide(state: Draft<ILOANNormalState>){
    if(state.storageStateGuide.data){
      state.storageStateGuide.data.guide = {}
    } 
  }
}