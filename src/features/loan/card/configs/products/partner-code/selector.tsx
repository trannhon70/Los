import { RootState } from "types";

export const getLOANCardConfigProductCategoryPartnerCode =
  (state: RootState) => state.LOANCard.configs.product.partnerCode.data[state.LOANCard.storage.product.detail] ?? []

export const fetchedLOANCardConfigProductCategoryPartnerCode =
  (state: RootState) => state.LOANCard.configs.product.partnerCode.fetched[state.LOANCard.storage.product.detail] ?? false

export const fetchingLOANCardConfigProductCategoryPartnerCode =
  (state: RootState) => state.LOANCard.configs.product.partnerCode.fetching