import { RootState } from "types";

export const isCheckCreateProduct = 
  (state: RootState) => state.LOANNormal.storage.full.data !== null

export const getLOANNormalStorageProductCategory = 
  (state: RootState) => state.LOANNormal.storage.product.category;

export const getLOANNormalStorageProductType =
  (state: RootState) => state.LOANNormal.storage.product.type;

export const getLOANNormalStorageProductDetail =
  (state: RootState) => state.LOANNormal.storage.product.detail;

export const getLOANNormalStorageProductPartnerCode =
  (state: RootState) => state.LOANNormal.storage.product.partnerCode;

export const getLOANNormalStorageProductPartnerProduct =
  (state: RootState) => state.LOANNormal.storage.product.partnerProduct;

export const getLOANNormalStorageProductCollateral =
  (state: RootState) => state.LOANNormal.storage.product.collateral;

export const getLOANNormalStorageProductLinkProject =
  (state: RootState) => state.LOANNormal.storage.product.linkProject;

export const getLOANNormalStorageProductException =
  (state: RootState) => state.LOANNormal.storage.product.exception;

export const getLOANNormalStoragePartnerCode = (key:string) =>
  (state: RootState) =>{
    if(state.LOANNormal.storage.product?.partnerCode?.length > 0 ){
      return true
    }
    return false
  }
export const getLOANNormalStorageProductIsBusiness =
(state: RootState) => state.LOANNormal.storage.product.is_business;

export const getLOANNormal =
  (state: RootState) => state.LOANNormal;

export const checkHasCollateralProduct = (state:RootState) =>{
  return state.LOANNormal.storage.full.data?.form?.product_group_form?.data?.loan_document_info?.collateral_flag
}