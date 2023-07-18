import { RootState } from "types";

export const getLOANCardConfigProductCardCategoryPartner =
  (state: RootState) => state.LOANCard.configs.product.partnerProduct.data[state.LOANCard.storage.product.partnerCode] ?? []

export const fetchedLOANCardConfigProductCardCategoryPartner =
  (state: RootState) => state.LOANCard.configs.product.partnerProduct.fetched[state.LOANCard.storage.product.partnerCode] ?? false

export const fetchingLOANCardConfigProductCardCategoryPartner =
  (state: RootState) => state.LOANCard.configs.product.partnerProduct.fetching