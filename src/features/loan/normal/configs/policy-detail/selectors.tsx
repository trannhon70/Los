import { RootState } from "types/reducer"

export const getLOANNormalConfigPolicyDetail = (code: string) => (state: RootState) => {
    return state.LOANNormal.configs.policyDetail[code]
}
export const getFetchingLOANNormalConfigPolicyDetail =
  (state: RootState) => state.LOANNormal.configs.policyDetail.fetching;

export const getFetchedLOANNormalConfigPolicyDetail =
  (state: RootState) => state.LOANNormal.configs.policyDetail.fetched;