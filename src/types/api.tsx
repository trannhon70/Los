export interface IError {
  loc: string;
  msg: string;
  detail: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
  errors: IError[];
}

export interface IListProp<T>{
  [code: string]: T;
}

export interface IListData<T>{
  data: T[];
}

export interface IListCode<T> extends IListData<T>{
  code: string;
}

export interface IListState<T>{
  list: IListProp<T[]>;
  fetched: IListProp<boolean>;
  fetching: boolean;
}

export interface IPostRequest{
  sending: boolean;
  sent: boolean;
}

export interface IPaginationResponse{
  total_items: number;
  total_page: number;
  current_page: number;
}

export type TAuthHeader = 'Bearer' | 'Basic';

export interface IApiPaging<T> extends IApiResponse<T>, IPaginationResponse{}

export type IHeaderRequest = HeadersInit | Record<string, any>;

export type IDataRequest = Record<string, any> | FormData;

export type IResponse<T> = Promise<IApiResponse<T>>;

export type IResponsePaging<T> = Promise<IApiPaging<T>>;

export type IResponseResult<T, P> = P extends boolean ? IApiPaging<T> : IApiResponse<T>;

export type IResponsePagination<T, P = undefined> = Promise<IResponseResult<T, P>>;

export interface IStoreModel<T>{
  fetched: boolean;
  fetching: boolean;
  started: boolean;
  data: T;
}