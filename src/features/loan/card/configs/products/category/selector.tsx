import { RootState } from "types";

export const getLOANCardConfigProductCategories =
  (state: RootState) => state.LOANCard.configs.product.category.data

export const fetchedLOANCardConfigProductCategory =
  (state: RootState) => state.LOANCard.configs.product.category.fetched

export const fetchingLOANCardConfigProductCategory =
  (state: RootState) => state.LOANCard.configs.product.category.fetching