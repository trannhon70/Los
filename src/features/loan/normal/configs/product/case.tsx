import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import {
  ILOANNormalPartnerCodeList,
  ILOANNormalPartnerProduct,
  ILOANNormalProductCategory,
} from "types/models/loan/normal/configs/Product";

export const ProductCase = {
  fetchConfigProductCategory(state: Draft<ILOANNormalState>) {
    state.configs.product.category.fetched = false;
    state.configs.product.category.fetching = true;
  },
  fetchConfigProductCategoryDone(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalProductCategory[]>
  ) {
    state.configs.product.category.fetched = true;
    state.configs.product.category.fetching = false;
    state.configs.product.category.data = action.payload;
  },
  fetchConfigProductPartnerCode(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.configs.product.partnerCode.fetching = true;
    state.configs.product.partnerCode.fetched = {
      ...state.configs.product.partnerCode.fetched,
      [action.payload]: false,
    };
    state.configs.product.partnerCode.data = {
      ...state.configs.product.partnerCode.data,
      [action.payload]: [],
    };
  },
  fetchConfigProductPartnerCodeDone: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ILOANNormalPartnerCodeList[], string, string>
    ) {
      state.configs.product.partnerCode.fetched[action.meta] = true;
      state.configs.product.partnerCode.fetching = false;
      state.configs.product.partnerCode.data[action.meta] = action.payload;
    },
    prepare(payload: ILOANNormalPartnerCodeList[], meta: string) {
      return { payload, meta };
    },
  },
  fetchConfigProductPartnerProduct(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.configs.product.partnerProduct.fetching = true;
    state.configs.product.partnerProduct.fetched = {
      ...state.configs.product.partnerProduct.fetched,
      [action.payload]: false,
    };
    state.configs.product.partnerProduct.data = {
      ...state.configs.product.partnerProduct.data,
      [action.payload]: [],
    };
  },
  fetchConfigProductPartnerProductDone: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ILOANNormalPartnerProduct[], string, string>
    ) {
      state.configs.product.partnerProduct.fetched[action.meta] = true;
      state.configs.product.partnerProduct.fetching = false;
      state.configs.product.partnerProduct.data[action.meta] = action.payload;
    },
    prepare(payload: ILOANNormalPartnerProduct[], meta: string) {
      return { payload, meta };
    },
  },
};
