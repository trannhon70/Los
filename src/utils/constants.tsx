import { IError, ILanguage } from "types";

export const API_BASE_URL_S1 = '/v2';

export const API_BASE_URL_S1_1 = 'v2';

export const API_BASE_URL_S2 = 's2/v2';

export const API_BASE_URL = "/api";  // change api s2/v2

export const API_KEY = '';

export const APP_AUTH_ENABLE = true;

export const APP_COUNTRY_DEFAULT = 'VN';

export const APP_DATE_FORMAT = 'DD/MM/YYYY';

export const APP_NOTIFICATION_MAX_STACK = 5;

export const APP_NOTIFICATION_VERTICAL = 'top'; // top | bottom

export const APP_NOTIFICATION_HORIZONTAL = 'right'; // left | center | right

export const APP_VALIDATE_SKIP_WARD = false;

export const APP_SERVER_NAME = 'https://los.scb.com.vn';


export const APP_SESSION_TIMEOUT = 900000; // 15 minutes

export const APP_LANG_DEFAULT: ILanguage = {
  name: "Tiếng Việt",
  code: "vi", 
  country_code: "VN"
};

export const APP_LANGUAGES: ILanguage[] = [
  APP_LANG_DEFAULT,
  {
    name: 'English',
    code: 'en',
    country_code: 'US'
  }
];

export const APP_TOKEN_NAME = "accessToken";

export const ON_FETCH_ERROR = [
  {
    detail: "Cannot send request.",
    msg: "ERR_CANNOT_SEND_REQUEST",
    loc: "FETCH"
  }
] as IError[];

export const ON_FETCH_ERROR_MSG = [
  {
    detail: "Thông tin đăng nhập không hợp lệ",
    msg: "ERR_CANNOT_SEND_REQUEST",
    loc: "FETCH"
  }
] as IError[];

export const ON_PARSE_ERROR = [
  {
    loc: "PARSE",
    msg: "Parse_Response_failure",
    detail: "Parse response failure"
  }
] as IError[];

export const ON_RESPONSE_ERROR = [
  {
    loc: "RESPONSE",
    msg: "Result_Response_failure",
    detail: "Result response failure"
  }
] as IError[];

export const METADATA_CONSTANT = {
  TRANS_MODEL:"TRANS_MODEL",
  DOCUMENT_GROUP_TYPE: "DOCUMENT_GROUP_TYPE",
  COLLATERAL_LTV_MAX:"COLLATERAL_LTV_MAX",
  NGHE_NGHIEP:"NGHE_NGHIEP",
  MA_NGANH_NGHE: "MA_NGANH_NGHE",
  CONST_POLICY_GROUP: "CONST_POLICY_GROUP",
  CONST_POLICY_GROUP_DETAIL: "CONST_POLICY_GROUP_DETAIL"

}