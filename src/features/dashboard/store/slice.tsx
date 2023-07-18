import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagingFilter, ISearchFilter, RootState } from "types";
import { IDashboardState } from "types/models/dashboard";
import { ILOANMixed } from "types/models/dashboard/LOANs";

const initialState: IDashboardState = {
  LOAN: {
    fetched: false,
    fetching: false,
    data: [],
    page: 1,
    limit: 10,
    total_page: 0,
    order_by: 'desc'
  }
}

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchLOANList(state, action: PayloadAction<Partial<IPagingFilter>>){
      state.LOAN.fetching = true;
      state.LOAN.fetched = false;
      action.payload.page && (state.LOAN.page = action.payload.page);
      action.payload.limit && (state.LOAN.limit = action.payload.limit);
    },
    fetchLOANListDone: {
      reducer(state, action: PayloadAction<ILOANMixed[], string, Partial<IPagingFilter>>){
        state.LOAN.data = action.payload;
        state.LOAN.fetched = true;
        state.LOAN.fetching = false;
        action.meta.total_page && (state.LOAN.total_page = action.meta.total_page);
      },
      prepare(payload: ILOANMixed[], paging: Partial<IPagingFilter>){
        return { payload,  meta: paging };
      }
    },
    goToPage(state, action: PayloadAction<number>){
      if (action.payload > 0){
        state.LOAN.page = action.payload;
        state.LOAN.fetched = false;
      }
    },
    updateLOANLimit(state, action: PayloadAction<number>){
      state.LOAN.limit = action.payload;
      state.LOAN.fetched = false;
    },
    updateLOANSearch(state, action: PayloadAction<ISearchFilter>){
      state.LOAN.customer_name = action.payload.customer_name;
      state.LOAN.los_id = action.payload.los_id;
      state.LOAN.branch_code = action.payload.branch_code;
      state.LOAN.fetched = false;
    },
    clearStoreDashboard(state, action: PayloadAction<string>){
      state.LOAN.data = [];
      state.LOAN.fetched = false;
      state.LOAN.fetching = false;
      state.LOAN.page = 1;
      state.LOAN.limit = 10;
      state.LOAN.total_page = 0;
      state.LOAN.order_by = 'desc';
      state.LOAN.customer_name = "";
      state.LOAN.los_id = "";
      state.LOAN.branch_code = "";
    },
  }
});

// Actions
export const dashboardFetchLOANList = DashboardSlice.actions.fetchLOANList;
export const dashboardFetchLOANListDone = DashboardSlice.actions.fetchLOANListDone;
export const dashboardLOANGoToPage = DashboardSlice.actions.goToPage;
export const dashboardLOANUpdateLimit = DashboardSlice.actions.updateLOANLimit;
export const updateLOANSearch = DashboardSlice.actions.updateLOANSearch;
export const clearStoreDashboard = DashboardSlice.actions.clearStoreDashboard;


// Selectors
export const getFetchingLOANList = (state: RootState) => state.dashboard.LOAN.fetching;
export const getFetchedLOANList = (state: RootState) => state.dashboard.LOAN.fetched;
export const getDashboardLOANList = (state: RootState) => state.dashboard.LOAN.data;
export const getDashboardLOANPage = (state: RootState) => state.dashboard.LOAN.page;
export const getDashboardLOANLimit = (state: RootState) => state.dashboard.LOAN.limit;
export const getDashboardLOANLos_id = (state: RootState) => state.dashboard.LOAN.los_id;
export const getDashboardLOANBranch_code = (state: RootState) => state.dashboard.LOAN.branch_code;
export const getDashboardLOANCustomer_name = (state: RootState) => state.dashboard.LOAN.customer_name;
export const getDashboardLOANTotalPage = (state: RootState) => state.dashboard.LOAN.total_page;
export const getDashboardLOANOrderBy = (state: RootState) => state.dashboard.LOAN.order_by;

// Reducer
const DashboardReducer = DashboardSlice.reducer;
export default DashboardReducer;