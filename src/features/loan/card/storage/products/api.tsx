import { ILOANCardState } from "types/models/loan/card";
import { ILOANCardProductForm } from "types/models/loan/card/configs/Product";
import { ILOANCardData } from "types/models/loan/card/storage";
import { formatPath } from "utils";
import { apiGet, apiPost } from "utils/api";
import { removeFlag } from "views/pages/LOAN/utils";
import {
  API_LOAN_CARD_PRODUCT_GET_BY_LOS_UUID,
  API_LOAN_CARD_SAVE_PRODUCT,
} from "../../APIPaths";

export const saveProductCard = (store: ILOANCardState) => {
  
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

  const SelectedCategory = Categories.find(c => c.product_category_code === category);
  const { loan_product_type_info_list, ..._cate } = SelectedCategory || {};

  const SelectedType = loan_product_type_info_list?.find(t => t.product_type_code === type);
  const { loan_product_detail_info_list, ..._type } = SelectedType || {};

  const SelectedProduct = loan_product_detail_info_list?.find(d => d.product_detail_code === detail);
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
    data: {
      loan_product_type_info: {
        product_category_info: { ..._cate },
        product_type_info: { ..._type },
        product_detail_info: { ..._detail },
      },
      loan_product_info: {
        partner_code_info: SelectedPartnerCode ?? null,
        product_partner_info: SelectedPartnerProduct ?? null,
      },
      collateral_info: {
        collateral_flag: collateral,
      },
      exception_info: {
        exception_document_flag: exception,
      }
    },
  };
  return apiPost<ILOANCardData>(API_LOAN_CARD_SAVE_PRODUCT, body);
};

export const fetchProductData = (id: string) => {
  return apiGet<ILOANCardProductForm>(
    formatPath(API_LOAN_CARD_PRODUCT_GET_BY_LOS_UUID, id)
  );
};
