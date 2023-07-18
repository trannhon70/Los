import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ICorrdinatorLOANState } from "types/models/loan/corrdinator";
import { ICorrdinatorLOANUserNewData, ICorrdinatorUserLOANQueryFillter } from "types/models/loan/corrdinator/user";

export const CorrdinatorUserLOANStoredCase = {
  fetchCorrdinatorLOANUserList(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<Partial<ICorrdinatorUserLOANQueryFillter>>){
    state.users.fetched = false;
    state.users.fetching = true;
    action.payload.page && (state.users.page = action.payload.page);
    action.payload.limit && (state.users.limit = action.payload.limit);
  },
  fetchCorrdinatorLOANUserListNew(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<Partial<ICorrdinatorUserLOANQueryFillter>>){
    state.users.fetched = false;
    state.users.fetching = true;
    action.payload.page && (state.users.page = action.payload.page);
    action.payload.limit && (state.users.limit = action.payload.limit);
  },

  fetchCorrdinatorLOANUserDone: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
      ICorrdinatorLOANUserNewData[], 
        string, 
        Partial<ICorrdinatorUserLOANQueryFillter>
      >
    ){
      state.users.fetched = true;
      state.users.fetching = false;
      state.users.data = action.payload;
      action.meta.total_page && (state.users.total_page = action.meta.total_page);
    },
    prepare(payload: ICorrdinatorLOANUserNewData[], paging: Partial<ICorrdinatorUserLOANQueryFillter>){
      return { payload,  meta: paging };
    }
  },

  fetchCorrdinatorLOANUserNewDone: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        ICorrdinatorLOANUserNewData[], 
        string, 
        Partial<ICorrdinatorUserLOANQueryFillter>
      >
    ){
      state.users.fetched = true;
      state.users.fetching = false;
      state.users.data = action.payload;
      action.meta.total_page && (state.users.total_page = action.meta.total_page);
    },
    prepare(payload: ICorrdinatorLOANUserNewData[], paging: Partial<ICorrdinatorUserLOANQueryFillter>){
      return { payload,  meta: paging };
    }
  },

  updateFetchedCorrdinatorLOANUser(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<boolean>){
    state.users.fetched = action.payload;
    state.users.page = 1
  },
  
  updatePageCorrdinatorLOANUser(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<number>){
    state.users.page = action.payload;
    state.users.fetched = false;
  },

  updateLimitCorrdinatorLOANUser(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<number>){
    state.users.limit = action.payload;
    state.users.page = 1
    state.users.fetched = false;
  },

  updateSeachEmplName(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<string>){
    state.users.employee_name = action.payload;
  },

  updateSeachUsername(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<string>){
    state.users.username = action.payload;
  },

  resetSearch(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<undefined>){
    state.users.username = "";
    state.users.employee_name = "";
    state.users.page = 1;
    state.users.fetched = false;
  },
}