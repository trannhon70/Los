import { IPagingFilter } from "types";

export interface ICorrdinatorUserLOANQueryFillter extends IPagingFilter {
  employee_code?: string;
  employee_name?: string;
  position_name?: string;
  search_alphabet?: string;
  title_name?: string;
  username?: string;
  size?: number;
  group_role_code?:string;
}
export interface ICorrdinatorLOANUserState extends ICorrdinatorUserLOANQueryFillter{
  fetching: boolean;
  fetched: boolean;
  data: ICorrdinatorLOANUserNewData[];
}

export interface ICorrdinatorLOANUserData{ // s1 
  username: string;
  employee_id: string;
  branch_department: string;
  employee_code: string;
  employee_name: string;
  title: string;
  title_code?: string;
  position: string;
  is_active: boolean;
}

export interface ICorrdinatorLOANUserNewData{
  title_code:string;
  title:string;
  users:ICorrdinatorLOANUserData[]
}
