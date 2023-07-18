export interface IResFile {
  file_id: number | null;
  uuid: string | null;
  name: string | null;
  display_order: number | null;
  description: string | null;
  content_type: string | null;
  created_by: string,
  created_by_name: string,
  updated_at: number | null;
  updated_by: string,
  updated_by_name: string,
  created_at: number | null;
  custom_keys?:ICustom_Keys;
}

export interface IResDocument {
  document_id: string | number | null;
  document_name: string | null;
  child_files: IResFile[] | null;
}
export interface ICustom_Keys{
    doc_id:string | null | number;
    local_uuid:string;
    description:string;
}

export enum TYPE_DOCUMENT_DYNAMIC {
  FILE = 'FILE',
  DOCUMENT = 'DOCUMENT',
}
export interface ILOANNormalFile extends IResFile {
  file_upload?: string | null | undefined;
}
export interface ILOANNormalDocument extends Omit<IResDocument, "child_files"> {
  uuid: string;
  child_files: ILOANNormalFile[] | null;
  active?: string;
}
export interface ILOANNormalDynamicDocument {
  document_id: string | number | null;
  document_name: string | null;
  childs?:ILOANNormalDynamicDocument[] | ILOANNormalFile[];
  hasSubDoc?:boolean;
};

// inteface form
export interface ILOANModalDynamicFile extends ILOANNormalFile{};
export interface ILOANModalDynamicDocument extends Omit<ILOANNormalDynamicDocument,"childs"> {
  uuid: string;
  childs:ILOANModalDynamicDocument[] | ILOANModalDynamicFile[];
}