import { IListProp } from "types/api";

export interface ILOANNormalProductDetailBase{
  product_detail_id: string;
  product_detail_code: string | null;
  product_detail_name: string;
}

export interface ILOANNormalProductTypeBase{
  product_type_id: string;
  product_type_code: string | null;
  product_type_name: string;
}

export interface ILOANNormalProductCategoryBase{
  product_category_id: string;
  product_category_code: string | null;
  product_category_name: string;
}

export interface ILOANNormalProductDetail extends ILOANNormalProductDetailBase{
  financial_analysis_flag: boolean;
}

export interface ILOANNormalProductType extends ILOANNormalProductTypeBase{
  loan_product_detail_info_list: ILOANNormalProductDetail[];
}

export interface ILOANNormalProductCategory extends ILOANNormalProductCategoryBase{
  loan_product_type_info_list: ILOANNormalProductType[];
}

export interface ILOANNormalProductInfo{
  loan_product_category_info: ILOANNormalProductCategoryBase;
  loan_product_type_info: ILOANNormalProductTypeBase;
  loan_product_detail_info: ILOANNormalProductDetail;
}

export interface ILOANNormalPartnerCode{
  loan_affiliate_partner_id: string;
  loan_affiliate_partner_code: string;
  loan_affiliate_partner_name: string;
}
export interface ILOANNormalPartnerCodeList{
  id: string;
  name: string;
}
export interface ILOANNormalPartnerProductBase{
  id: string;
  // loan_affiliate_partner_product_category_code: string;
  name: string;
}

export interface ILOANNormalPartnerProduct extends ILOANNormalPartnerProductBase{
  display_order: number | null;
}
export interface ILOANNormalPartnerProductList{
  loan_affiliate_partner_product_category_id: string;
  loan_affiliate_partner_product_category_code: string;
  loan_affiliate_partner_product_category_name: string;
  display_order: number | null;

}
export interface ILOANNormalPartnerCodeState{
  fetched: IListProp<boolean>;
  fetching: boolean;
  data: IListProp<ILOANNormalPartnerCodeList[]>;
}

export interface ILOANNormalPartnerProductState{
  fetched: IListProp<boolean>;
  fetching: boolean;
  data: IListProp<ILOANNormalPartnerProduct[]>
}

export interface ILOANNormalProductDocument{
  collateral_flag: boolean;
  exception_document_flag: boolean;
}

export interface ILOANNormalProductAffiliatePartner{
  loan_affiliate_partner_info: ILOANNormalPartnerCode | null;
  loan_affiliate_partner_product_category_info: ILOANNormalPartnerProductList | null;
}

export interface ILOANNormalProduct{
  loan_product_category_info: ILOANNormalProductCategoryBase;
  loan_product_type_info: ILOANNormalProductTypeBase;
  loan_product_detail_info: ILOANNormalProductDetailBase;
}

export interface ILOANNormalProductData{
  loan_document_info: ILOANNormalProductDocument;
  loan_product_affiliate_partner_info: ILOANNormalProductAffiliatePartner;
  loan_product_info: ILOANNormalProduct;
  is_business: string | null
}

export interface ILOANNormalProductForm{
  id: string;
  name: string;
  uuid: string;
  data: ILOANNormalProductData;
}

export interface ILOANNormalProductCategoryState{
  fetched: boolean;
  fetching: boolean;
  data: ILOANNormalProductCategory[];
}

export interface ILOANNormalProductState{
  category: ILOANNormalProductCategoryState;
  partnerCode: ILOANNormalPartnerCodeState;
  partnerProduct: ILOANNormalPartnerProductState;
}
