import { RootState } from "types";

export const getLOANNormalCustomerData = (state: RootState) => state.LOANNormal.storage.customer.discussions;

export const getLOANNormalCustomerQuery = (state: RootState) => state.LOANNormal.storage.customer.query;
export const getFetchingLOANNormalCustomerData = (state: RootState) => state.LOANNormal.storage.customer.fetching;
export const getFetchedLOANNormalCustomerData = (state: RootState) => state.LOANNormal.storage.customer.fetched;

