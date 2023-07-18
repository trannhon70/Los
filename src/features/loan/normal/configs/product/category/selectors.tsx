import { RootState } from "types";

export const getLOANNormalConfigProductCategories = 
  (state: RootState) => state.LOANNormal.configs.product.category.data;

export const fetchedLOANNormalConfigProductCategory = 
  (state: RootState) => state.LOANNormal.configs.product.category.fetched;

export const fetchingLOANNormalConfigProductCategory = 
  (state: RootState) => state.LOANNormal.configs.product.category.fetching;