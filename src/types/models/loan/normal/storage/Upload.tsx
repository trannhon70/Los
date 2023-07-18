
export interface IUploadFile{
  created_at: number;
  updated_at: number;
  created_by: string,
  created_by_name: string,
  updated_by: string,
  updated_by_name: string,
  type: number | null;
  uuid: string;
  name: string;
  content_type: string;
  size: number | null;
  version: number | null;
  
}
