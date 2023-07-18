import { RootState } from "types/reducer"

export const getLOANNormalConfigGender =
  (state: RootState) => state.LOANNormal.configs.gender.data;

export const getFetchingLOANNormalConfigGender =
  (state: RootState) => state.LOANNormal.configs.gender.fetching;

export const getFetchedLOANNormalConfigGender =
  (state: RootState) => state.LOANNormal.configs.gender.fetched;