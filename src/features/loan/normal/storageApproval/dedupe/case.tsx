import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { IBlackList, IDedupeBlacklist, IDedupeList } from "types/models/loan/normal/storageApproval/DedupeBlackList";

export const DedupeApproveCaseV2 = {

  postDedupeApproval(state: Draft<ILOANNormalState>, action: PayloadAction<string>) { },
  postBlackListApproval(state: Draft<ILOANNormalState>, action: PayloadAction<string>) { },
  updateDedupeBlackListAproval(state: Draft<ILOANNormalState>, action: PayloadAction<IDedupeBlacklist>) {
      if(state.storageApproval.full.data){
        state.storageApproval.full.data.form.dedupe_blacklist = action.payload
      }
   },
  checkBlackList(state: Draft<ILOANNormalState>) { },
  updateBlackListApproval(state: Draft<ILOANNormalState>, action: PayloadAction<IBlackList>) {
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.dedupe_blacklist.black_list = action.payload
    }
  },
  checkDedupe(state: Draft<ILOANNormalState>) { },
  updateDedupeApproval(state: Draft<ILOANNormalState>, action: PayloadAction<IDedupeList>) {
    if(state.storageApproval.full.data){
      state.storageApproval.full.data.form.dedupe_blacklist.dedupe_table = action.payload
    }
  },
  
};
