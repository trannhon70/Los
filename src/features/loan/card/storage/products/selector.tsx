import { RootState } from "types";

export const getLOANCardStorageProductCategory =
  (state: RootState) => state.LOANCard.storage.product.category;

export const getLOANCardStorageProductType =
  (state: RootState) => state.LOANCard.storage.product.type;

export const getLOANCardStorageProductDetail =
  (state: RootState) => state.LOANCard.storage.product.detail;

export const getLOANCardStorageProductPartnerCode =
  (state: RootState) => state.LOANCard.storage.product.partnerCode;

export const getLOANCardStorageProductPartnerProduct =
  (state: RootState) => state.LOANCard.storage.product.partnerProduct;

export const getLOANCardStorageProductCollateral =
  (state: RootState) => state.LOANCard.storage.product.collateral;

export const getLOANCardStorageProductException =
  (state: RootState) => state.LOANCard.storage.product.exception;

export const getLOANCard =
  (state: RootState) => state.LOANCard;

export const fetchingLOANCardProductData =
  (state: RootState) => state.LOANCard.storage.full.fetching;

export const shouldFetchLOANProductCardData = (state: RootState) => {
  return fetchingLOANCardProductData(state) && !state.LOANCard.storage.full.starting;
}

export const getLOANCardLOSuuid = 
  (state: RootState) => state.LOANCard.storage.full.los_uuid ?? '-';