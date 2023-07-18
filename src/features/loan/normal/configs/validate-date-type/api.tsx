import { API_CONFIG_V2_ENV_GLOBAL } from "features/master-data/ApiPath";
import { formatPath } from "utils";
import { apiGet } from "utils/api";


export const fetchValidateDateType = () => {
    return apiGet<unknown>(formatPath(API_CONFIG_V2_ENV_GLOBAL));
}