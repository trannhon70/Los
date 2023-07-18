export interface IOtherProfile{
    exception_info:IExceptionInfo[],
    analysis_countermeasures:IAnalysisCounterMeasures
}

export interface IExceptionInfo{
    exception_type_id: number,
    exception_type_name: string,
    detail_info_list:IExceptionDetailInfo[]
}

export interface IExceptionDetailInfo{
    exception_detail_id: number,
    exception_detail_code: string,
    exception_detail_name: string,
    description: string,
    reality_description: string,
    uuid: string,
    display_order: number
}

export interface IAnalysisCounterMeasures{
    accept_credit_info: string,
    reason_credit: string,
    risks_group_list: IRiskGroupItem[]
}

export interface IRiskGroupItem{
    risk_type_info: string,
    measures_limit_risk: string,
    display_order: number,
    uuid: string,
}