import { IHeaderRequest } from "types";
import { ILogin, IUser, ILoginResponse } from "types/models/Account";
import { formatPath, stringToBase64 } from "utils";
import { apiGet, apiPost } from "utils/api";
import { API_KEY, APP_AUTH_ENABLE } from "utils/constants";

import AccountPaths from "./paths";

export const authLogin = (data: ILogin) => {
  const { username, password } = data;
  const headers: IHeaderRequest = {
    //'MNV-LANGUAGE': 'vn'
  };

  if (APP_AUTH_ENABLE){
    const token = stringToBase64(username + ':' + password);
    headers.Authorization = 'Basic ' + token;
    headers.apikey = API_KEY;
    headers['MNV-encode'] = 0;
    headers['Content-Type'] = 'application/json; charset=utf-8';
  }

  return apiPost<ILoginResponse>(AccountPaths.Login, { username, password }, headers);
};

export const authLoginS2 = (data: ILogin) => {
  const { username, password } = data;
  const headers: IHeaderRequest = {
    //'MNV-LANGUAGE': 'vn'
  };

  if (APP_AUTH_ENABLE){
    const token = stringToBase64(username + ':' + password);
    headers.Authorization = 'Basic ' + token;
    headers.apikey = API_KEY;
    headers['MNV-encode'] = 0;
    headers['Content-Type'] = 'application/json; charset=utf-8';
  }

  return apiPost<ILoginResponse>(AccountPaths.LoginSecurityS2, { username, password }, headers);
};


export const authToken = (id: string | number) => {
  return apiGet<IUser>(
    formatPath(AccountPaths.getUserAccount, id)
  );
}

export const refreshTokenApi = () => {
  return apiPost<any>(formatPath(AccountPaths.refreshToken))
}