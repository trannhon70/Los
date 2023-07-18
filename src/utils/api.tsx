import axios, { AxiosRequestConfig } from "axios";
import { IApiPaging, IApiResponse, IDataRequest, IError, IHeaderRequest, IResponse } from "types";
import { contentType, decodeToken, /*decodeToken,*/ getAuthHeader, removeStorage } from "utils";
import {
  API_BASE_URL,
  APP_AUTH_ENABLE,
  ON_FETCH_ERROR,
  ON_PARSE_ERROR,
  ON_RESPONSE_ERROR
} from "./constants";

export enum EMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  HEAD = "head",
  DELETE = "delete"
}

export enum EContentType {
  JSON = "application/json",
  BINARY = "multipart/form-data",
  TEXT = "plain/text",
  URLENCODED = "application/x-www-form-urlencoded"
}

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: EContentType.JSON, ...contentType(EContentType.JSON) },
  withCredentials: true
});

function logError(data: Record<string, any>){
  API.request({
    url: 'v2/bug-report/',
    method: 'POST',
    data
  })
}

function execApi<T>(
  method: EMethod,
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
){
  configs = configs ?? {};
  Object.assign(configs, { url: uri, method, headers, data: null });
  if (data) {
    if (configs.method === EMethod.GET) configs.method = EMethod.POST;

    if (data instanceof FormData) {
      headers = Object.assign(headers ?? {}, contentType(EContentType.BINARY));
      configs.data = data;
    } else {
      configs.data = data;//JSON.stringify(data);
    }
  }

  Object.assign(configs, { headers: configs.headers || {} });

  APP_AUTH_ENABLE
    && !configs.headers.Authorization
    && Object.assign(configs.headers, getAuthHeader(decodeToken().token))
   
    // && Object.assign(configs.headers, getAuthHeader('MTM0NDo0ZjIwN2M3Njg4ZWExNTdkNWIxNzU2NDRlOTQ5YTM3YTVlNjA2MTVm'))

  return API.request(configs)
    .then((response) => {
      const result: IApiResponse<T> = {
        data: null,
        success: false,
        errors: [],
      };

      const result1: IApiPaging<T> = {
        ...result,
        current_page: 1,
        total_items: 0,
        total_page: 0
      };

      let hasPaging = false;

      try {
        result.success = Math.floor(response.status / 200) === 1;

        if (result.success) {
          result.data = response.data.data;
          result.success = true;
          result.errors = [];

          if ('total_page' in response.data){
            hasPaging = true;
            result1.total_page = response.data.total_page ?? 0;
            result1.total_items = response.data.total_items ?? 0;
            result1.current_page = response.data.current_page ?? 1;
          }
        } else {
          result.errors = response.data.errors ?? ON_RESPONSE_ERROR;
         
          try{
            if(response?.status === 401){
              removeStorage("accessToken",true);
            }
            if(response?.status === 403){
              // Tạm thời xóa token bắt đăng nhập lại
              removeStorage("accessToken",true);
            }
            if(response?.status !== 204){
              logError({
                url: API_BASE_URL + '/' + uri,
                method: method.toUpperCase(),
                headers: configs?.headers,
                status_code: response?.status,
                body: configs?.data,
                response: response?.data,
                priority: 'MEDIUM',
                fe_env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PRO'
              })
            }
          }
          catch(e){}
        }
      } catch (e) {
        result.errors = ON_PARSE_ERROR;
        try{
          if(response?.status === 401){
            removeStorage("accessToken",true);
          }
          if(response?.status === 403){
            // Tạm thời xóa token bắt đăng nhập lại
            removeStorage("accessToken",true);
          }
          if(response?.status !== 204){
            logError({
              url: API_BASE_URL + '/' + uri,
              method: method.toUpperCase(),
              headers: configs?.headers,
              status_code: response?.status,
              body: configs?.data,
              response: response?.data,
              priority: 'HOTFIX',
              fe_env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PRO'
            })
          }
        }
        catch(e){}
      }

      return hasPaging ? { ...result1, ...result } as IApiPaging<T> : result;
    })
    .catch((error) => {
      try{
        if(error.response?.status === 401){
          removeStorage("accessToken",true);
        }
        if(error.response?.status === 403){
          // Tạm thời xóa token bắt đăng nhập lại
          removeStorage("accessToken",true);
        }
        if(error.response?.status !== 204){
          logError({
            url: API_BASE_URL + '/' + uri,
            method: method.toUpperCase(),
            headers: configs?.headers,
            status_code: error.response?.status,
            body: configs?.data,
            response: error.response?.data,
            priority: 'HIGH',
            fe_env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PRO'
          })
        }
      }
      catch(e){
      }
      if (error.response && error.response.data) {
        const response = error.response.data;
        response.success = false;
        return response;
      } else {
        return {
          success: false,
          data: null,
          errors: ON_FETCH_ERROR
        };
      }
    });
}

export function apiGet<T>(
  uri: string,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi<T>(EMethod.GET, uri, undefined, headers, configs);
}

export function apiPost<T>(
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.POST, uri, data, headers, configs);
}

export function apiPut<T>(
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.PUT, uri, data, headers, configs);
}

export function apiPatch<T>(
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.PATCH, uri, data, headers, configs);
}

export function apiDelete<T>(
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.DELETE, uri, data, headers, configs);
}

export function apiHead<T>(
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  return execApi(EMethod.HEAD, uri, data, headers, configs);
}

export function api<T>(
  method: EMethod,
  uri: string,
  data?: IDataRequest,
  headers?: IHeaderRequest,
  configs?: AxiosRequestConfig
): IResponse<T> {
  switch (method) {
    case EMethod.POST:
      return apiPost<T>(uri, data, headers, configs);

    case EMethod.PUT:
      return apiPut(uri, data, headers, configs);

    case EMethod.PATCH:
      return apiPatch(uri, data, headers, configs);

    case EMethod.HEAD:
      return apiHead(uri, data, headers, configs);

    case EMethod.DELETE:
      return apiDelete(uri, data, headers, configs);

    default:
      return apiGet<T>(uri, headers, configs);
  }
}

export const parseError = (errors: IError[]) => {
  return errors.map(error => {
    return {
      ...error,
      loc: error.loc
        .split(' -> ')
        .map(el => el.match(/^\d+$/) ? +el : el)
        .filter((_, i) => i !== 0)
    }
  })
}