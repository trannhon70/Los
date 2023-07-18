import { RootState } from "types/reducer"

export const getLOANNormalConfigValidateDateType= (state: RootState) => {
    return state.LOANNormal.configs.validateDateType.data
}
export const getFetchingLOANNormalConfigValidateDateType=
  (state: RootState) => state.LOANNormal.configs.validateDateType.fetching;

export const getFetchedLOANNormalConfigValidateDateType=
  (state: RootState) => state.LOANNormal.configs.validateDateType.fetched;