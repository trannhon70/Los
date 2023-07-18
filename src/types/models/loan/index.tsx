import { ReactNode } from "react";

export interface ILOANURLParams{
  '*': string;
  stage: string;
  id: string;
  tab: string;
  organ?: string;
  declare?: string;
  user?: string;
  uuid?: string;
}

export type TLOANProductChange = 'category' | 'type' | 'product';

export interface ILOANOption{
  value: string | number;
  label?: ReactNode;
}

export interface ILOANProductCategory extends ILOANOption{
  type: (ILOANOption & { product: ILOANOption[] })[];
}

export type TLOANStepId = 
  | 'NHOM_SAN_PHAM'
  | 'THONG_TIN_PHAP_LY'
  | 'THONG_TIN_CIC'
  | 'NGUON_THU_NHAP'
  | 'HO_SO_KHAC'
  | 'TAI_SAN_BAO_DAM'

export type TLOANStepName = 
  | 'NHÓM SẢN PHẨM'
  | 'THÔNG TIN PHÁP LÝ'
  | 'THÔNG TIN CIC'
  | 'NGUỒN THU NHẬP'
  | 'HỒ SƠ KHÁC'
  | 'TÀI SẢN BẢO ĐẢM';
