import { IPagingFilter } from "types";
import { ICorrdinatorLOANUserData, ICorrdinatorLOANUserNewData } from "../loan/corrdinator/user";


export interface ICorrdinatorUserQueryFillter extends IPagingFilter {
  is_same_branch: boolean;
  branch_name?: string;
  employee_code?: string;
  employee_name?: string;
  position_name?: string;
  search_alphabet?: string;
  title_name?: string;
  username?: string;
  size?: number;
}
export interface ICorrdinatorUserState extends ICorrdinatorUserQueryFillter{
  fetching: boolean;
  fetched: boolean;
  data: ICorrdinatorLOANUserNewData[];
  dataCorr:ICorrdinatorLOANUserData[] // tạm thời chờ luồng 
}

export interface ICorrdinatorUserS2State extends ICorrdinatorUserQueryFillter{
  fetching: boolean;
  fetched: boolean;
  data: ICorrdinatorUserDataChange[];
}


export interface ICorrdinatorUserData{
  username: string;
  employee_id: string;
  branch_department: string;
  employee_code: string;
  employee_name: string;
  title: string;
  position: string;
  is_active: boolean;
  branch_name:string;
}

export interface ICorrdinatorUserDataChange{
  title:string;
  title_code:string;
  users:ICorrdinatorUserData[]
}

