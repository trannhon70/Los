import { RootState } from "types";

export const getLOANNormalConfigProductPartnerProduct = (state: RootState) => {
  return state.LOANNormal.configs.product.partnerProduct.data[
    state.LOANNormal.storage.product.partnerCode
  ] ?? []
}

export const fetchedLOANNormalConfigProductPartnerProduct = (state: RootState) => {
  return state.LOANNormal.configs.product.partnerProduct.fetched[
    state.LOANNormal.storage.product.partnerCode
  ] ?? false
}

export const fetchingLOANNormalConfigProductPartnerProduct = 
  (state: RootState) => state.LOANNormal.configs.product.partnerProduct.fetching;