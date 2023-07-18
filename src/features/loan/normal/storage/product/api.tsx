import { API_LOAN_NORMAL_SAVE_PRODUCT } from "features/loan/normal/APIPaths";
import { ILOANNormalData } from "types/models/loan/normal/storage";
import { ILOANNormalState } from "types/models/loan/normal";
import { apiPost } from "utils/api";

export const saveProduct = (store: ILOANNormalState) => {

  const {
    configs: {
      product: {
        category: {
          data: Categories
        },
        partnerCode: {
          data: PartnerCode
        },
        partnerProduct: {
          data: PartnerProduct
        }
      }
    },
    storage: {
      product: {
        category,
        type,
        detail,
        partnerCode,
        partnerProduct,
        collateral,
        exception
      }
    }
  } = store;

  const SelectedCategory = Categories.find(c => c.product_category_id === category);
  const { loan_product_type_info_list, ..._cate } = SelectedCategory || {};

  const SelectedType = loan_product_type_info_list?.find(t => t.product_type_id === type);
  const { loan_product_detail_info_list, ..._type } = SelectedType || {};

  const SelectedProduct = loan_product_detail_info_list?.find(d => d.product_detail_id === detail);
  const { financial_analysis_flag, ..._detail } = SelectedProduct || {};

  const SelectedPartnerCode = PartnerCode[detail]?.find(
    p => p.id === partnerCode
  );

  const SelectedPartnerProduct = PartnerProduct[partnerCode]?.find(
    p => p.id === partnerProduct
  )

  
  const body = {
    id: "NHOM_SAN_PHAM",
    name: "NHÓM SẢN PHẨM",
    uuid: null,
    data: {
      loan_product_info: {
        loan_product_category_info: { ..._cate,product_category_code: category},
        loan_product_type_info: { ..._type,product_type_code: type},
        loan_product_detail_info: { ..._detail,product_detail_code:detail }
      },
      loan_product_affiliate_partner_info: {
        loan_affiliate_partner_info: SelectedPartnerCode?.id?{
          loan_affiliate_partner_id:SelectedPartnerCode?.id,
          loan_affiliate_partner_code:SelectedPartnerCode?.id,
          loan_affiliate_partner_name:SelectedPartnerCode?.name
        }: null,
        loan_affiliate_partner_product_category_info: SelectedPartnerProduct?.id ? {
          loan_affiliate_partner_product_category_id: SelectedPartnerProduct?.id,
          loan_affiliate_partner_product_category_code: SelectedPartnerProduct?.id,
          loan_affiliate_partner_product_category_name: SelectedPartnerProduct?.name
        } : null
      } ?? null,
      loan_document_info: {
        collateral_flag: collateral,
        exception_document_flag: exception
      }
    }
  }

  return apiPost<ILOANNormalData>(API_LOAN_NORMAL_SAVE_PRODUCT, body);
}