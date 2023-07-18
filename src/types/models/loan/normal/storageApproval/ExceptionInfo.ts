export interface IExceptionInfo {
    exception_info:           IExceptionInfo[];
    analysis_countermeasures: IAnalysisCountermeasures;
}

export interface IAnalysisCountermeasures {
    accept_credit_info: string;
    reason_credit:      string;
    risks_group_list:   IRisksGroupList[];
}

export interface IRisksGroupList {
    risk_type_info:      string;
    measures_limit_risk: string;
    display_order:       number;
    uuid:                string;
}

export interface IExceptionInfo {
    exception_type_id:   number;
    exception_type_name: string;
    detail_info_list:    IDetailInfoList[];
}

export interface IDetailInfoList {
    exception_detail_id:   number;
    exception_detail_code: string;
    exception_detail_name: string;
    description:           string;
    reality_description:   string;
    uuid:                  string;
    display_order:         number;
}
