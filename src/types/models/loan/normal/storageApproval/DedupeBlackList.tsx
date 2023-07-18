export interface IDedupeBlacklist {
    dedupe_table: IDedupeList;
    black_list: IBlackList;
}
export interface IDedupeList {
    last_update_date: number;
    dedupe_rows: IDedupeRow[]
}
export interface IDedupeRow {
    name: string,
    customer_type: string,
    dedupe_contents : IDedupeContent[]
}

export interface IDedupeContent {
    los_id: string,
    los_uuid: string,
    name: string,
    identity_num: string,
    cif: string | null,
    product_name: string,
    profile_status: string,
    created_at: number,
    warning_content: string
}
export interface IBlackList {
    black_list_info : IBlackListInfo;
    update_at: number | null
}
export interface IBlackListInfo {
    borrower : IBlackListDetail[] | null;
    marriage: IBlackListDetail[] | null;
    co_brw: IBlackListDetail[] | null;
    co_payer: IBlackListDetail[] | null;
    others: IBlackListDetail[] | null;
    law_rlt: IBlackListDetail[] | null;
}
export interface IBlackListDetail {
    name: string,
    identity_num: string,
    cif_num: string,
    reason: string,
    job_content: string,
    update_at: number | null
}