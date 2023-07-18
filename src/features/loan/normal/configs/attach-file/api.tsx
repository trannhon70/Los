import { apiGet } from "utils/api"
import { formatPath } from 'utils';

export const downloadMultiFile = (listUuid: any) => {
  const queryParameters = new URLSearchParams(listUuid.map((x: string)=>['uuids',x]));
  return apiGet<unknown>(formatPath(`v2/configs/multi-download/?${queryParameters}`));
}
