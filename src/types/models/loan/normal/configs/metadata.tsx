import { IIdCodeName,TDefaultFlag } from 'types';


export interface IMetadataConstantState{
    fetching: boolean;
    fetched: boolean;
    started: boolean;
    data: IMetadataConstant
}

export interface IMetadataConstant{
    [key:string]: IMetadataTransModel[];
    // DOCUMENT_GROUP_TYPE: IMetadataDocumentGroupType[]
}
export interface IMetadataTransModel{
    id: string,
    name: string,
    value: number,
    other_flag: boolean,
    tran_type_parent_id?: string,
    tran_type_id?: string,
    display_order?: number,
    policy_id? :number,
    description? :string,
    policy_group_id?: number

}
export interface IMetadataDocumentGroupType{
    id: string,
    name: string,
    is_default: boolean,
    other_value_flag: boolean
}
export interface IMetadataBody{

    [key: string]: {
        tran_type_parent_id?: string,
        tran_type_id?: string
    }
}