import { RootState } from "types";

export const getStorageDedupeList = ( state: RootState) =>state.LOANNormal.storageApproval.full.data?.form.dedupe_blacklist