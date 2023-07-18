import { API_BASE_URL_S1, API_BASE_URL_S1_1, API_BASE_URL_S2 } from "utils/constants";

const AccountPaths = {
  // Login: API_BASE_URL_S1 + "/account/login/",
  
  Login: API_BASE_URL_S1_1 + "/account/login/",
  
  LoginSecurityS2: API_BASE_URL_S2 + "/account/login/login",

  getUserAccount: API_BASE_URL_S1 + "/account/",

  refreshToken: API_BASE_URL_S1 + "/account/token/refresh"

};

export default AccountPaths;
