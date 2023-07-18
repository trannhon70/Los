import { IPagingFilter } from "types";
import { ICorrdinatorUserS2State } from "./user";

export interface ICorrdinatorState{
  full: ICorrdinatorFullState;
  profile: ICorrdinatorProfileState;
  users: ICorrdinatorUserS2State;
}

export interface ICorrdinatorFullState{
  data: ICorrdinatorForm;
}

export interface ICorrdinatorForm{
  profile: {
    LOAN: ICorrdinatorDocumentList[],
    CREDIT: ICorrdinatorDocumentList[]
  };
}

export interface ICorrdinatorProfileState{
  fetching: boolean;
  fetched: boolean;
  LOAN: {
    data: ICorrdinatorDocumentList[];
  } & IPagingFilter;

  CREDIT: {
    data: ICorrdinatorDocumentList[];
  } & IPagingFilter;
}

export interface ICorrdinatorQueryFillter extends IPagingFilter {
  document_type: string;
  province?: string;
  district?: string;
  status?: string;
  size?: number;
}

export interface ICorrdinatorDocumentList{
  display_order: number;
  document_los_uuid: string;
  los_id?:string;
  reappraise_headquarter?:IUserApprove;
  product?:string;
  document: string;
  customer_name: string;
  status: number | null;
  product_name: string;
  product_code: string;
  loan_amount: number | null;
  controller_1: IUserApprove | null;
  controller_2: IUserApprove | null;
  controller_3: IUserApprove | null;
  approver: IUserApprove | null;
  update_date: number;
  document_type: string;
  isEdit: boolean;
  state_name:string;
}

export interface IUserApprove{
  branch_department: string;
  employee_code: string;
  employee_id: string;
  employee_name: string;
  is_active: boolean;
  position: string;
  title: string;
  username: string;
}