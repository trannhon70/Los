import { RootState } from "types";
import { ILOANNormalHistoryListTimeLine } from "types/models/loan/normal/storage/Logs";

export const isFetchingLogs = (state: RootState) => state.LOANNormal.storage.logs.fetching;
export const isFetchedLogs = (state: RootState) => state.LOANNormal.storage.logs.fetched;
export const getDataHistoryLog = (state: RootState) => state.LOANNormal.storage.logs.data;
export const getListHistoryLog = (state: RootState) => state.LOANNormal.storage?.logs?.data?.list as ILOANNormalHistoryListTimeLine[];
export const getLOANNormalHistoryLogsQuery = (state: RootState) => state.LOANNormal.storage.logs.query
