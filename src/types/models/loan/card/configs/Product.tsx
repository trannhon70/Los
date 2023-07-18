import { IListProp } from "types/api";

export interface ILOANCardProductDetailBase{
  product_detail_id: string;
  product_detail_code: string | null;
  product_detail_name: string;
}

export interface ILOANCardProductTypeBase{
  product_type_id: string;
  product_type_code: string | null;
  product_type_name: string;
}

export interface ILOANCardProductCategoryBase{
  product_category_id: string;
  product_category_code: string | null;
  product_category_name: string;
}

export interface ILOANCardProductDetail extends ILOANCardProductDetailBase{
  financial_analysis_flag: boolean;
}

export interface ILOANCardProductType extends ILOANCardProductTypeBase{
  loan_product_detail_info_list: ILOANCardProductDetail[];
}

export interface ILOANCardProductCategory extends ILOANCardProductCategoryBase{
  loan_product_type_info_list: ILOANCardProductType[];
}

export interface ILOANCardProductInfo{
  loan_product_category_info: ILOANCardProductCategoryBase;
  loan_product_type_info: ILOANCardProductTypeBase;
  loan_product_detail_info: ILOANCardProductDetail;
}

export interface ILOANCardPartnerCode{
  loan_affiliate_partner_id: string;
  loan_affiliate_partner_code: string;
  loan_affiliate_partner_name: string;
}
export interface ILOANCardPartnerCodeList{
  id: string;
  name: string;
}
export interface ILOANCardPartnerProductBase{
  id: string;
  // loan_affiliate_partner_product_category_code: string;
  name: string;
}

export interface ILOANCardPartnerProduct extends ILOANCardPartnerProductBase{
  display_order: number | null;
}
export interface ILOANCardPartnerProductList{
  loan_affiliate_partner_product_category_id: string;
  loan_affiliate_partner_product_category_code: string;
  loan_affiliate_partner_product_category_name: string;
  display_order: number | null;

}
export interface ILOANCardPartnerCodeState{
  fetched: IListProp<boolean>;
  fetching: boolean;
  data: IListProp<ILOANCardPartnerCodeList[]>;
}

export interface ILOANCardPartnerProductState{
  fetched: IListProp<boolean>;
  fetching: boolean;
  data: IListProp<ILOANCardPartnerProduct[]>
}

export interface ILOANCardProductDocument{
  collateral_flag: boolean;
  exception_document_flag: boolean;
}

export interface ILOANCardProductAffiliatePartner{
  loan_affiliate_partner_info: ILOANCardPartnerCode | null;
  loan_affiliate_partner_product_category_info: ILOANCardPartnerProductList | null;
}

export interface ILOANCardProduct{
  loan_product_category_info: ILOANCardProductCategoryBase;
  loan_product_type_info: ILOANCardProductTypeBase;
  loan_product_detail_info: ILOANCardProductDetailBase;
}

export interface ILOANCardProductData{
  loan_document_info: ILOANCardProductDocument;
  loan_product_affiliate_partner_info: ILOANCardProductAffiliatePartner;
  loan_product_info: ILOANCardProduct;
}

export interface ILOANCardProductForm{
  id: string;
  name: string;
  uuid: string;
  data: ILOANCardProductData;
}

export interface ILOANCardProductCategoryState{
  fetched: boolean;
  fetching: boolean;
  data: ILOANCardProductCategory[];
}

export interface ILOANCardProductState{
  category: ILOANCardProductCategoryState;
  partnerCode: ILOANCardPartnerCodeState;
  partnerProduct: ILOANCardPartnerProductState;
}