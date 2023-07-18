import { RootState } from "types/reducer"

export const getLOANNormalConfigFinanceMetadata =
  (state: RootState) => state.LOANNormal.configs.financeMetadata.data;

export const getFetchingLOANNormalConfigFinanceMetadata =
  (state: RootState) => state.LOANNormal.configs.financeMetadata.fetching;

export const getFetchedLOANNormalConfigFinanceMetadata =
  (state: RootState) => state.LOANNormal.configs.financeMetadata.fetched;