
export interface ILOANNormalStorageICRDataBusinessCommon {
    score: number,
    ranking: string,
    approval_date: string,
    description: string,
    uuid: string | null,
}
export interface ILOANNormalStorageICRData {
    business_employee:ILOANNormalStorageICRDataBusinessCommon ,
    approval_level: ILOANNormalStorageICRDataBusinessCommon,
    risk_management: ILOANNormalStorageICRDataBusinessCommon,
    info:ILOANNormalStorageICRInfo,
    document_info_list:ILOANNormalDocumentInfoList[]
}
export interface ILOANNormalDocumentInfoList extends Omit<IResLOANNormalDocumentInfo, "document_group"> {
    uuid: string | null;
    document_group: ILOANNormalDocumentGroup[];
}

export interface ILOANNormalDocumentGroup extends Omit<IResLOANNormalDocumentGroup, "child_files"> {
    uuid: string | null;
    child_files: ILOANNormalChildfile[] | null;
}

export interface ILOANNormalChildfile extends IResLOANNormalRESChildFile {
    file_upload: string | null;
}
export interface IResLOANNormalDocumentInfo {
    document_id: string | number | null;
    document_name: string | null;
    document_group: IResLOANNormalDocumentGroup[] | null;
}
export interface IResLOANNormalDocumentInfoICR {
    document_id: string | number | null;
    document_name: string | null;
    data_file: IResLOANNormalDocumentGroup[] | null;
}
export interface IResLOANNormalDocumentGroup {
    document_id: string | number | null;
    document_name: string | null;
    child_files: IResLOANNormalRESChildFile[] | null;
}
export interface IResLOANNormalRESChildFile {
    created_at: number | null;
    created_by: string,
    created_by_name: string,
    updated_by: string,
    updated_by_name: string,
    updated_at: number | null;
    type: number | null;
    uuid: string | null;
    name: string | null;
    content_type: string | null;
    size: number | null;
    version: number | null;
    description?: string | null;
    custom_keys?: CUSTOM_KEY_FILE | null;
}
export interface ILOANNormalLOANUpload{
  declare: string;
  uuid: string;
  dataFile: ILOANNormalDocumentInfoList[],
  isDelete?: boolean
}
export interface CUSTOM_KEY_FILE{
    parent_id:string | number | null;
    doc_id:string | number | null;
    local_id:string;
    description?:string;
  }
export interface ILOANNormalICRApprovalBody{
    business_employee:ILOANNormalStorageICRDataBusinessCommon ,
    approval_level: ILOANNormalStorageICRDataBusinessCommon,
    risk_management: ILOANNormalStorageICRDataBusinessCommon,
}
export interface ILOANNormalStorageICRInfo{
    year_of_birth: string;
    education: string;
    num_people_depend: number;
    marriage_status: string;
    owner_property: string;
    address_current: string;
    position: string;
    card_scb_use: string;
    receive_salary: string;
    qhtd_scb_other_bank: string;
    reputation: string;
    after_tax_income: number;
    spending: number;
}
export interface ILOANNormalStorageICRDataState{
    id: string,
    name: string,
    data:ILOANNormalStorageICRData,
    errors: any,
}


export interface ILOANNormalStorageICRDataUpdateRequest {
    los_uuid : string,
    data:ILOANNormalStorageICRData,
}
export interface ILOANNormalStorageICRDataResponse {
    business_employee:ILOANNormalStorageICRDataBusinessCommon ,
    approval_level: ILOANNormalStorageICRDataBusinessCommon,
    risk_management: ILOANNormalStorageICRDataBusinessCommon,
    document_info_list:ILOANNormalDocumentInfoList[]
}
export interface ICICNormalStorageICRValidate{
    valid: boolean;
    bussines_core:number|string;
    bussines_rank:string;
    bussines_date: number|string;
    level_of_approval_core:number|string;
    level_of_approval_rank:string; 
    level_of_approval_date: number|string;
    risk_management_core:string|number;
    risk_management_rank:string;
    risk_management_note: string;
    risk_management_date: number|string;
}

export interface ILOANNormalStorageICR {
    validate: ICICNormalStorageICRValidate,
    data: ILOANNormalStorageICRDataState,
}