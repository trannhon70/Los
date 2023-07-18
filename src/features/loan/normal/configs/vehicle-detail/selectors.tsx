import { RootState } from "types/reducer"

export const getLOANNormalConfigVehicleDetail = (state: RootState) => {
    return state.LOANNormal.configs.vehicleDetail
}
export const getFetchingLOANNormalConfigVehicleDetail =
  (state: RootState) => state.LOANNormal.configs.vehicleDetail.fetching;

export const getFetchedLOANNormalConfigVehicleDetail =
  (state: RootState) => state.LOANNormal.configs.vehicleDetail.fetched;