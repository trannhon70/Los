import { FC, ReactNode } from 'react';
import { SvgIconProps } from "@mui/material/SvgIcon";
// import { StaticContext } from "react-router";
// import { RouteComponentProps } from "react-router-dom";

import { IError } from 'types';

export type IconComponent = FC<SvgIconProps>;

export type TDefaultFlag = "N" | "Y";

export interface IDefaultFlag{
  is_default: TDefaultFlag;
}

export interface IDefaultOtherFlag{
  other_value_flag: TDefaultFlag;
}

export interface ILanguage {
  code: string;
  name: string;
  country_code: string;
}

export interface ITokenLocal {
  token: string;
  userid: string | number;
}

export interface IValidate{
  message: string;
  params: Record<string, any>;
}

export interface IId<T = string>{
  id: T;
}

export interface IName<T = string>{
  name: T;
}
export interface IPolicyId<T = string>{
  policy_id: T;
}
export interface IType<T = string>{
  type: T;
}

export interface ICode<T = string>{
  code: T;
}

export interface IValue<V = string>{
  value: V;
}
export interface IDescription<T = string>{
  description: T;
}
export interface IIdName<T = string, N = string> extends IId<T>, IName<N>{
  [x: string]: any;
}

export interface IIdCodeName<I = string, C = string, N = string>
  extends IId<I>, ICode<C>, IName<N>{}

export interface IIdNameValue<I = string, C = string, N = number>
  extends IId<I>, IName<C>, IValue<N>{}
  export interface IICodeValue<I = string, C = string, N = number>
  extends IId<I>, ICode<C>, IValue<N>{}

export interface ICodeName<C = string, N = string> extends ICode<C>, IName<N>{}

export interface IIdCodeNameDefault extends IIdCodeName, IDefaultFlag{}
export interface IIdNameValueDesc extends IIdNameValue {
  desc: string;
}
export interface ISelectRef<T> {
  getValue(): T | undefined;
  setValue(value: string): void;
}

export interface ISelectProps {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: ReactNode;
  message?: string;
  onChange?(): void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export interface ISelectState<T> {
  list: T[];
  fetching: boolean;
  fetched: boolean;
  errors: IError[];
}

export interface RecordString{
  [key: string]: string;
}

export interface IValidateMessage<T>{
  message: IValidate;
  field: T;
  options: RecordString;
}

export interface IValidateMessageState<T> extends IValidateMessage<T>{}

export interface IPagingFilter{
  limit: number;
  total_page: number;
  page: number;
  order_by: string;
  los_id?: string;
  customer_name?: string;
  branch_code?: string;
}
export interface ISearchFilter{
  los_id?: string;
  customer_name?: string;
  branch_code?: string;
}