import { RootState } from "types";

export const shouldFetchLOANStateGuideData = (state: RootState) => {
    return fetchingLOANStateGuideData(state) && !state.LOANNormal.storageStateGuide.starting;
}

export const fetchingLOANStateGuideData =
    (state: RootState) => state.LOANNormal.storageStateGuide.fetching;
export const fetchedLOANStateGuideData =
    (state: RootState) => state.LOANNormal.storageStateGuide.fetched;

export const getGuide =
    (state: RootState) => state.LOANNormal.storageStateGuide.data

export const checkRoleButtonBar =
    (state: RootState) => state.LOANNormal.storageStateGuide.data



export const getRuleDisbled = (state: RootState) => {
    if (state?.LOANNormal.storageStateGuide?.data && 
        state?.LOANNormal?.storageStateGuide?.data?.current_state_group !== 'INITIALIZER') {
        return true
    }
    if (state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'INITIALIZER'
        && (state?.LOANNormal.storageStateGuide?.data?.current_state_id.includes("s1_b"))) { // return luồng nguyên tắc , theo BE 
        return false
    }
    if (state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'INITIALIZER'
        && (state?.LOANNormal.storageStateGuide?.data?.current_state_id.includes("s1_c"))) { // return luồng chính thức , theo BE 
        return true
    }
    if (state?.LOANNormal.storageStateGuide?.data && state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'INITIALIZER') {
        return false
    }
    return false
}

export const getRuleDisbledReappraise = (state: RootState) => {
    // REAPPRAISE_HEADQUARTER => đang thầm định S2 
    // CONTROLLER_HEADQUARTER => KS S2 
    // APPROVER_HEADQUARTER => PD S2 
    const currentUsername = state.auth.user?.user_name 
    const reappraiseUser = state.LOANNormal.storageStateGuide.data?.roles?.reappraise_headquarter?.username ?? ""
    if (state?.LOANNormal.storageStateGuide?.data && 
        state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'REAPPRAISE_HEADQUARTER' && currentUsername === reappraiseUser) {
        return false
    }
    return true;

}

export const checkRuleICR = (state: RootState) => {
    // if(state?.LOANNormal.storageStateGuide?.data){
    //     return false
    // }
    if (state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'CONTROLLER_BRANCH'
        || state?.LOANNormal?.storageStateGuide?.data?.current_state_group === 'APPROVER_BRANCH') {
        return true
    }
    return false
}

export const getPassPositionList = (state: RootState) => {
    return state.LOANNormal.storageStateGuide?.data?.last_log
}
export const getLegalBorrower = (state: RootState) => {
    return state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.borrower?.basic_info?.full_name
}

export const checkRuleInit = (state: RootState) => {
    if (state.LOANNormal.storageStateGuide?.data?.roles?.initializer?.username === state.auth.user?.user_name || state.LOANNormal.storageStateGuide?.data === undefined) {
        return false;
    }
    return true;
}

export const titleRuleApply = (state: RootState) => {
    if (state.LOANNormal.storageStateGuide.data?.current_state_group === "INITIALIZER") {
        return {
            titleModal: "TRÌNH HỒ SƠ CẤP KIỂM SOÁT",
            titleName: "Người kiểm soát",
            current_Group: "CONTROLLER_BRANCH",
        }
    }
    if (state.LOANNormal.storageStateGuide.data?.current_state_group === "CONTROLLER_BRANCH") {
        return {
            titleModal: "TRÌNH HỒ SƠ CẤP PHÊ DUYỆT",
            titleName: "Người phê duyệt",
            current_Group: "APPROVER_BRANCH",
        }
    }
}

export const userReturnInit = (state: RootState) => state.LOANNormal.storageStateGuide.data?.prev_allocate?.initializer?.username
export const userReturnControl = (state: RootState) => state.LOANNormal.storageStateGuide.data?.prev_allocate?.controller_branch?.username


