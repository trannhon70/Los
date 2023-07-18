import { RootState } from "types";

export const getLoanNormalUUID = (state: RootState) => [
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
];

export const isFetchingApply = 
  (state: RootState) => state.LOANNormal.storageControl.apply.fetching;

export const isFetchedApply =
  (state: RootState ) => state.LOANNormal.storageControl.apply.fetched;


export const isFetchingClose = 
  (state: RootState) => state.LOANNormal.storageControl.close.fetching;

export const isFetchedClose =
  (state: RootState ) => state.LOANNormal.storageControl.close.fetched;


export const isFetchingComplaint = 
  (state: RootState) => state.LOANNormal.storageControl.complaint.fetching;

export const isFetchedComplaint =
  (state: RootState ) => state.LOANNormal.storageControl.complaint.fetched;


export const isFetchingSave = 
  (state: RootState) => state.LOANNormal.storageControl.save.fetching;

export const isFetchedSave =
  (state: RootState ) => state.LOANNormal.storageControl.save.fetched;