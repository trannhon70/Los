export interface IFinanceMetadataConfig{
  is_header: boolean;
  edit_flag: boolean;
  required_flag: boolean;
}

export interface IFinanceMetadataChild extends IFinanceMetadataConfig{
  metadata_child_id: number;
  metadata_child_name: number;
}

export interface IFinanceMetadataType extends IFinanceMetadataConfig{
  metadata_id: number;
  metadata_name: string;
  metadata_childes: IFinanceMetadataChild[] | null;
}

export interface IFinanceMetadataGroup  extends IFinanceMetadataConfig{
  metadata_type_id: number;
  metadata_type_name: string;
  metadata_type_childes: IFinanceMetadataType[] | null;
}

export interface IFinanceMetadata{
  group_id: number;
  group_name: string;
  metadata_group_childes: IFinanceMetadataGroup[];
}

export interface IFinanceMetadataState{
  fetched: boolean;
  fetching: boolean;
  data: IFinanceMetadata[];
}