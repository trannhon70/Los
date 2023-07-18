import { RootState } from "types";


export const getStoredCorrdinatorLOANUsers = (state: RootState) => state.corrdinatorLOAN.users.data;
export const isFetchingCorrdinatorLOANUsers = (state: RootState) => state.corrdinatorLOAN.users.fetching;
export const isFetchedCorrdinatorLOANUsers = (state: RootState) => state.corrdinatorLOAN.users.fetched;
export const corrdinatorLOANUsersPage = (state: RootState) => state.corrdinatorLOAN.users.page;
export const corrdinatorLOANUsersTotalPage = (state: RootState) => state.corrdinatorLOAN.users.total_page;
export const corrdinatorLOANUsersLimit = (state: RootState) => state.corrdinatorLOAN.users.limit;
export const corrdinatorLOANUsersEmplName = (state: RootState) => state.corrdinatorLOAN.users?.employee_name ?? "";
export const corrdinatorLOANUsersUsename = (state: RootState) => state.corrdinatorLOAN.users?.username ?? "";
