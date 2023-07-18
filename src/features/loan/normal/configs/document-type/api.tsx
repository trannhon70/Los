import { apiGet } from "utils/api"
import { formatPath } from 'utils';
import { IDocumentType } from "types/models/master-data/state";
import { API_BASE_URL_S1 } from "utils/constants";

export interface IDocumentParams {
  document_group_type: string;
  type_loan: string;
}

export const fetchDocumentType = (params: IDocumentParams) => {
  return apiGet<IDocumentType[]>(formatPath(API_BASE_URL_S1 + "/configs/document_type/:document_group_type/?type_loan=:type_loan",params.document_group_type,params.type_loan));
}

