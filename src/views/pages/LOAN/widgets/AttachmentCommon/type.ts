export interface IAttachModalDocument {
  uuid: string;
  document_id: string | number;
  document_name: string;
  child_files: IAttachModalFile[];
}
export interface CUSTOM_KEY_FILE {
  doc_id: string;
  local_id: string;
  description?: string;
}
export interface IAttachModalFile {
  uuid: string;
  name: string;
  description: string;
  type: string;
  created_by: string,
  created_by_name: string,
  updated_at: number | null,
  updated_by: string,
  updated_by_name: string,
  created_at: number | null;
  file_upload: string;
  custom_keys?: CUSTOM_KEY_FILE;
  size?: number | null
} 