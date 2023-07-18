import { RootState } from "types";


export const getStoredCorrdinatorUsers = (state: RootState) => state.corrdinator.users.data;
export const isFetchingCorrdinatorUsers = (state: RootState) => state.corrdinator.users.fetching;
export const isFetchedCorrdinatorUsers = (state: RootState) => state.corrdinator.users.fetched;
export const corrdinatorUsersPage = (state: RootState) => state.corrdinator.users.page;
export const corrdinatorUsersTotalPage = (state: RootState) => state.corrdinator.users.total_page;
export const corrdinatorUsersLimit = (state: RootState) => state.corrdinator.users.limit;
export const corrdinatorUsersEmplName = (state: RootState) => state.corrdinator.users?.employee_name ?? "";
export const corrdinatorUsersUsename = (state: RootState) => state.corrdinator.users?.username ?? "";