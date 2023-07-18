import { RootState } from "types";

export const fetchingLOANCardData = 
  (state: RootState) => state.LOANCard.storage.full.fetching;

export const existLOANCardProductData = 
  (state: RootState) => !!state.LOANCard.storage.full.los_uuid ?? '-';

export const shouldFetchLOANCardData = (state: RootState) => {
  return fetchingLOANCardData(state) && !state.LOANCard.storage.full.starting;
} 