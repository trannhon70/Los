import { IPagingFilter } from "types";
import { ICorrdinatorLOANUserState } from "./user";

export interface ICorrdinatorLOANState{
  full: ICorrdinatorLOANFullState;
  document: ICorrdinatorLOANDocumentState;
  users: ICorrdinatorLOANUserState;
}

export interface ICorrdinatorLOANFullState{
  data: ICorrdinatorLOANForm;
}

export interface ICorrdinatorLOANForm{
  document: {
    LOAN: ICorrdinatorLOANDocumentList[],
    CREDIT: ICorrdinatorLOANDocumentList[]
  };
}

export interface ICorrdinatorLOANDocumentState{
  fetching: boolean;
  fetched: boolean;
  LOAN: {
    data: ICorrdinatorLOANDocumentList[];
  } & IPagingFilter;

  CREDIT: {
    data: ICorrdinatorLOANDocumentList[];
  } & IPagingFilter;
}

export interface ICorrdinatorLOANQueryFillter extends IPagingFilter {
  document_type: string;
  province?: string;
  district?: string;
  status?: string;
  size?: number;
}

export interface ICorrdinatorLOANDocumentList{
  display_order: number;
  document_los_uuid: string;
  document: string;
  customer_name: string;
  status: number | null;
  product_name: string;
  product_code: string;
  loan_amount: number | null;
  controller_1: ILOANUserApprove | null;
  controller_2: ILOANUserApprove | null;
  controller_3: ILOANUserApprove | null;
  approver: ILOANUserApprove | null;
  update_date: number;
  document_type: string;
  isEdit: boolean;
}

export interface ILOANUserApprove{
  branch_department: string;
  employee_code: string;
  employee_id: string;
  employee_name: string;
  is_active: boolean;
  position: string;
  title: string;
  username: string;
}