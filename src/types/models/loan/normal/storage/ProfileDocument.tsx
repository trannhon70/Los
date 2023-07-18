
export interface IProfile{

    data:IProfileDocument[],
    structure:IProfileDocumentStructure[],
    getFile: IProfileDocumentGetFile[],
    getFilePage :IPageDocument,
    currentFile: ICurrentFile | null,
    file_extenstion: string;
    current_page:number,
    total_items:number,
    total_page:number,
    customerInfo: ICustomerInfo,
    breadcrumb: string[]
}
export interface ICurrentFile{
    uuid: string;
    file_url: string;
    file_name: string;
}
export interface IProfileDocument{
    id:string,
    name:string,
    total_file:number,
}

export interface IProfileDocumentStructure{
    id:string,
    name:string,
    group_type?: string,
    children:IProfileDocumentStructure[],
}
// export interface IProfileDocumentStructureChildren{
//     id:string,
//     name:string,
//     children:IProfileDocumentStructureChildrenName[]
// }
// export interface IProfileDocumentStructureChildrenName{
//     id:string,
//     name:string,
// }

export interface IProfileDocumentGetFile{
    // profile_id:string,
    // name:string,
    // note:string
    // display_order:number,
    // file_extension:string,
    // document_type_id:string,
    // created_by:string,
    // created_at:number,
    // modified_by:string,
    // modified_at:number,
    // uuid:string,

    profile_id:string,
    name:string,
    note:string,
    display_order:number,
    file_extension:string,
    document_type_id:string,
    created_by:string,
    created_by_name:string,
    created_at:number,
    modified_by:string,
    modified_by_name:string,
    modified_at:number,
    uuid:string,
}

export interface IPageDocument {
    los_id?:string,
    document_type_id :number,
    name?:string,
    date_start?: string,
    date_end?:string,
    page:number,
    limit:number
    fetching: boolean;
    fetched: boolean;
    total_page: number,
    total_item:number,
}

export interface ISearchDocument {
    name?: string ,
    date_start?:string,
    date_end?:string,
}
export interface IDownload{
    uuid: string,
    isDownload: boolean
}

export interface ICustomerInfo{
    full_name?:string,
    email?:string,
    telephone?:string,
    los_uuid?: string
}