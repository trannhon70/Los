import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANCardState } from "types/models/loan/card";
import { ILOANCardProductForm } from "types/models/loan/card/configs/Product";
import { ILOANCardData } from "types/models/loan/card/storage";

export const LOANCardProductStorageCase = {
  setCategory(state: Draft<ILOANCardState>, action: PayloadAction<string>) {
    state.storage.product.category = action.payload;
    state.storage.product.type = "";
    state.storage.product.detail = "";
    state.storage.product.partnerCode = "";
    state.storage.product.partnerProduct = "";
  },
  setType(state: Draft<ILOANCardState>, action: PayloadAction<string>) {
    state.storage.product.type = action.payload;
    state.storage.product.detail = "";
    state.storage.product.partnerCode = "";
    state.storage.product.partnerProduct = "";
  },
  setDetail(state: Draft<ILOANCardState>, action: PayloadAction<string>) {
    state.storage.product.detail = action.payload;
    state.storage.product.partnerCode = "";
    state.storage.product.partnerProduct = "";
  },
  setPartnerCode(state: Draft<ILOANCardState>, action: PayloadAction<string>) {
    state.storage.product.partnerCode = action.payload;
    state.storage.product.partnerProduct = "";
  },
  setPartnerProduct(
    state: Draft<ILOANCardState>,
    action: PayloadAction<string>
  ) {
    state.storage.product.partnerProduct = action.payload;
  },
  setCollateral(state: Draft<ILOANCardState>, action: PayloadAction<boolean>) {
    state.storage.product.collateral = action.payload;
  },
  setException(state: Draft<ILOANCardState>, action: PayloadAction<boolean>) {
    state.storage.product.exception = action.payload;
  },

  fetchDataFullProductCardDone(
    state: Draft<ILOANCardState>,
    action: PayloadAction<string>
  ) {
    state.storage.full.fetching = false;
    state.storage.full.starting = false;
  },
  setLOANCardProductData(
    state: Draft<ILOANCardState>,
    action: PayloadAction<ILOANCardProductForm | null>
  ) {
    state.storage.product.category =
      action.payload?.data.loan_product_info.loan_product_category_info
        .product_category_code ?? "";

    state.storage.product.type =
      action.payload?.data.loan_product_info.loan_product_type_info
        .product_type_code ?? "";

    state.storage.product.detail =
      action.payload?.data.loan_product_info.loan_product_detail_info
        .product_detail_code ?? "";

    state.storage.product.partnerCode =
      action.payload?.data.loan_product_affiliate_partner_info
        .loan_affiliate_partner_info?.loan_affiliate_partner_code ?? "";

    state.storage.product.partnerProduct =
      action.payload?.data.loan_product_affiliate_partner_info
        .loan_affiliate_partner_product_category_info
        ?.loan_affiliate_partner_product_category_code ?? "";

    state.storage.product.collateral =
      action.payload?.data.loan_document_info.collateral_flag ?? true;

    state.storage.product.exception =
      action.payload?.data.loan_document_info.exception_document_flag ?? true;
  },
  clearProductCard(state: Draft<ILOANCardState>) {
    state.storage.full.los_uuid = "";
    state.storage.product.category = "";
    state.storage.product.type = "";
    state.storage.product.detail = "";
    state.storage.product.partnerCode = "";
    state.storage.product.partnerProduct = "";
    state.storage.product.product_uuid = "";
  },
  saveProduct(state: Draft<ILOANCardState>, action: PayloadAction<boolean>) {},
  setDataLOSUUID(state: Draft<ILOANCardState>, action: PayloadAction<string>) {
    state.storage.full.los_uuid = action.payload;
  },
  updateStorageDataCard(
    state: Draft<ILOANCardState>,
    action: PayloadAction<ILOANCardData | null>
  ) {
    state.storage.full.data = action.payload;

    state.storage.product.category =
      action.payload?.form.product_group_form?.data?.loan_product_info
        ?.loan_product_category_info?.product_category_code ?? "";

    state.storage.product.type =
      action.payload?.form?.product_group_form.data.loan_product_info
        ?.loan_product_type_info?.product_type_code ?? "";

    state.storage.product.detail =
      action.payload?.form?.product_group_form?.data?.loan_product_info
        ?.loan_product_detail_info?.product_detail_code ?? "";

    state.storage.product.partnerCode =
      action.payload?.form?.product_group_form?.data
        .loan_product_affiliate_partner_info?.loan_affiliate_partner_info
        ?.loan_affiliate_partner_id ?? "";

    state.storage.product.partnerProduct =
      action.payload?.form.product_group_form.data
        .loan_product_affiliate_partner_info
        .loan_affiliate_partner_product_category_info
        ?.loan_affiliate_partner_product_category_id ?? "";

    state.storage.product.collateral =
      action.payload?.form.product_group_form.data.loan_document_info
        .collateral_flag ?? true;

    state.storage.product.exception =
      action.payload?.form.product_group_form.data.loan_document_info
        .exception_document_flag ?? false;
  },
};
