import { RootState } from "types/reducer"

export const getLOANNormalConfigMetadataConstant = (state: RootState) => {
    return state.LOANNormal.configs.metadataConstant
}
export const getFetchingLOANNormalConfigVehicleDetail =
  (state: RootState) => state.LOANNormal.configs.metadataConstant.fetching;

export const getFetchedLOANNormalConfigVehicleDetail =
  (state: RootState) => state.LOANNormal.configs.metadataConstant.fetched;