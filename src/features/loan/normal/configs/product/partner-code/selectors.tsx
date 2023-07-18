import { RootState } from "types";

export const getLOANNormalConfigProductPartnerCode = (state: RootState) => {
  return state.LOANNormal.configs.product.partnerCode.data[
    state.LOANNormal.storage.product.detail
  ] ?? []
}

export const fetchedLOANNormalConfigProductPartnerCode = (state: RootState) => {
  return state.LOANNormal.configs.product.partnerCode.fetched[
    state.LOANNormal.storage.product.detail
  ] ?? false
}

export const fetchingLOANNormalConfigProductPartnerCode = 
  (state: RootState) => state.LOANNormal.configs.product.partnerCode.fetching;