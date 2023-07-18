import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { IIdCodeName } from "types";
import { ILOANCardState } from "types/models/loan/card";
import {
  ILOANCardPartnerCodeList,
  ILOANCardPartnerProduct,
  ILOANCardProductCategory,
} from "types/models/loan/card/configs/Product";

export const ProductCase = {
  fetchLOANCardConfigProductCategory(state: Draft<ILOANCardState>) {
    state.configs.product.category.fetched = false;
    state.configs.product.category.fetching = true;
  },
  fetchLOANCardConfigProductCategoryDone(
    state: Draft<ILOANCardState>,
    action: PayloadAction<ILOANCardProductCategory[]>
  ) {
    state.configs.product.category.fetched = true;
    state.configs.product.category.fetching = false;
    state.configs.product.category.data = action.payload;
  },

  fetchConfigProductCardPartnerCode(
    state: Draft<ILOANCardState>,
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

  fetchConfigProductCardPartnerCodeDone: {
    reducer(
      state: Draft<ILOANCardState>,
      action: PayloadAction<ILOANCardPartnerCodeList[], string, string>
    ) {
      state.configs.product.partnerCode.fetched[action.meta] = true;
      state.configs.product.partnerCode.fetching = false;
      state.configs.product.partnerCode.data[action.meta] = action.payload;
    },
    prepare(payload: ILOANCardPartnerCodeList[], meta: string) {
      return { payload, meta };
    },
  },

  fetchConfigProductPartnerProduct(
    state: Draft<ILOANCardState>,
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
      state: Draft<ILOANCardState>,
      action: PayloadAction<ILOANCardPartnerProduct[], string, string>
    ) {
      state.configs.product.partnerProduct.fetched[action.meta] = true;
      state.configs.product.partnerProduct.fetching = false;
      state.configs.product.partnerProduct.data[action.meta] = action.payload;
    },
    prepare(payload: ILOANCardPartnerProduct[], meta: string) {
      return { payload, meta };
    },
  },
};
