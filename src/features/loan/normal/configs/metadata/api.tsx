import { apiPost } from "utils/api"
import { formatPath } from 'utils';
import { API_METADATA } from "../../APIPathsS2";
import { IMetadataBody } from "types/models/loan/normal/configs/metadata";

export const apiFetchMetadataConstant = (body: IMetadataBody) => {
  return apiPost<unknown>(formatPath(API_METADATA),body);
}