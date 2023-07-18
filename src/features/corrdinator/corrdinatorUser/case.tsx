import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ICorrdinatorState } from "types/models/corrdinator";
import { ICorrdinatorUserDataChange, ICorrdinatorUserQueryFillter } from "types/models/corrdinator/user";

export const CorrdinatorUserStoredCase = {
  fetchCorrdinatorUserList(state: Draft<ICorrdinatorState>, action: PayloadAction<Partial<ICorrdinatorUserQueryFillter>>) {
    state.users.fetched = true;
    state.users.fetching = true;
  },

  fetchCorrdinatorUserDone: {
    reducer(
      state: Draft<ICorrdinatorState>,
      action: PayloadAction<
        ICorrdinatorUserDataChange[],
        string,
        Partial<ICorrdinatorUserQueryFillter>
      >
    ) {
      state.users.fetched = true;
      state.users.fetching = false;
      state.users.data = action.payload;
    },
    prepare(payload: ICorrdinatorUserDataChange[], paging: Partial<ICorrdinatorUserQueryFillter>) {
      return { payload, meta: paging };
    }
  },

  updateFetchedCorrdinatorUser(state: Draft<ICorrdinatorState>, action: PayloadAction<boolean>) {
    state.users.fetched = action.payload;
    state.users.page = 1
  },

  updatePageCorrdinatorUser(state: Draft<ICorrdinatorState>, action: PayloadAction<number>) {
    state.users.page = action.payload;
    state.users.fetched = false;
  },

  updateLimitCorrdinatorUser(state: Draft<ICorrdinatorState>, action: PayloadAction<number>) {
    state.users.limit = action.payload;
    state.users.page = 1
    state.users.fetched = false;
  },

  updateSeachEmplName(state: Draft<ICorrdinatorState>, action: PayloadAction<string>) {
    state.users.employee_name = action.payload;
  },

  updateSeachUsername(state: Draft<ICorrdinatorState>, action: PayloadAction<string>) {
    state.users.username = action.payload;
  },

  resetSearch(state: Draft<ICorrdinatorState>, action: PayloadAction<undefined>) {
    state.users.username = "";
    state.users.employee_name = "";
    state.users.page = 1;
    state.users.fetched = false;
  },
}