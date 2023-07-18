import { IIdCodeName } from "../base";
import { IError } from "../api";

export interface IGlobal {
  countries: string;
}

export interface IBranchBase{
  branch_code: string;
  branch_name: string;
}

// export interface IBranch {
//   branch_address: string;
//   branch_code: string;
//   branch_name: string;
// }

export interface IBranch extends IBranchBase{
  branch_address: string;
  branch_parent_code: string;
  branch_phone: string;
  branch_region_code: string;
  branch_region_name: string;
  branch_status: string;
  branch_tax_code: string;
}

export interface IDepartment extends IIdCodeName{}

export interface IUser {
  avatar: string;
  branch: IBranch;
  department: IDepartment;
  user_id: string;
  user_name: string;
  full_name: string;
  hrm_position_code: string;
  hrm_position_id: string;
  hrm_position_name: string;
  hrm_title_code:string;
  hrm_title_id: string;
  hrm_title_name: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginForm extends ILogin {
  remember: boolean;
  state: unknown;
}

export interface IAccessToken{
  userid: string | number;
  state: unknown;
}
export interface ILoginResponse {
  user_info: IUser;
  access_token: string;
  global_config: IGlobal;
  menu_list: IMenuItem[];
}
export interface IMenuItem {
  child_list: IMenuItem[],
  parent_id: string,
  menu_id: string,
  menu_name: string,
  menu_code: string,
  is_activated: boolean,
  group_role_list : IGroupRole[]
}
export interface IGroupRole {
  group_role_id: string,
  group_role_code: string,
  group_role_name: string,
  permission_list: IPermission[],
  is_permission: boolean
}
export interface IPermission {
  permission_id: string,
  permission_name: string,
  permission_code: string,
  active_flag: number
}
export interface IAccountState {
  isAuth: boolean;
  isInitial: boolean;
  isFetching: boolean;
  isFetched: boolean;
  user?: IUser;
  menu_list: IMenuItem[];
  errors: IError[];
  sessionOut: boolean;
  sessionStartTime: number | null
}


export interface IAccessTokenBody{
  userid: string | number;
  token: string;
}


export interface IDecodeToken{
  exp: number | null;
  key_redis: string;
  token: string;
  user_info: IUser
}