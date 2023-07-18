import { apiGet } from "utils/api"
import { API_MASTER_V2_VEHICLE_DETAIL } from "features/master-data/ApiPath";
import { formatPath } from 'utils';

export const fetchVehicleDetail = (vehicle_type: string) => {
  return apiGet<unknown[]>(formatPath(API_MASTER_V2_VEHICLE_DETAIL,vehicle_type));
}