import { generateLOCALUUID } from "utils"

export const LIST_ID_TABLE_A = [7,8,9,10,11,12,13]
export const LIST_ID_TABLE_B = [14,15,16,17,18,19,20,21,22,23]
export const LIST_ID_TABLE_D = [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38]

export const EmptyProduct = ()=>({
    corePurpose: "",
    loanType: "",
    productPurpose: "",
    realPurpose: ""
})
export const EmptyNeedAndPlan = ()=>({
    currency : "VND",
    need : null,
    ownCaptital : null,
    method : "",
    expiredCredit : null,
    expiredWithdraw : null,
    graceOrigin : null,
    interestRate : null,
    periodAdjust : "",
    marginAdjust : null,
    disbursementMethod : "",
    repayOriginMethod : "",
    repayinterestMethod : "",
    amountPaidEachPeriod : null,
    loanAmount: null,
    scb_percentage: null
})

export const EmptyFileLoan = () => ({
    uuid: generateLOCALUUID(),
    content_type: null,
    created_at: null,
    created_by: "",
    created_by_name: "",
    updated_by: "",
    updated_by_name: "",
    file_upload: null,
    name: null,
    size: null,
    type: null,
    updated_at: null,
    version: null,
    description: null,
})

export const EmptyMetadataValue = () => ({
    T2: null,
    T1: null,
    T: null,
    KH: null,
    NVKD: null, 
})

export const EmptyTableA = () => LIST_ID_TABLE_A.map(id => ({
    id,
    data: EmptyMetadataValue(),
    child: []
}))

export const EmptyTableB = () => LIST_ID_TABLE_B.map(id => ({
    id,
    data: EmptyMetadataValue(),
    child: []
}))

export const EmptyTableD = () => LIST_ID_TABLE_D.map(id => ({
    id,
    data: EmptyMetadataValue(),
    child: []
}))