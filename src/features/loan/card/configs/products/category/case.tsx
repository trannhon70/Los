import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANCardCase, ILOANCardState } from "types/models/loan/card";
import { ILOANCardProductCategory } from "types/models/loan/card/configs/Product";

export const LOANCardProductCategoryCase = {
    fetchLOANCardConfigProductCategory(state : Draft<ILOANCardState>){
        state.configs.product.category.fetched = false;
        state.configs.product.category.fetching = true;
    },
    fetchLOANCardConfigProductCategoryDone(state: Draft<ILOANCardState>, action: PayloadAction<ILOANCardProductCategory[]>){
        state.configs.product.category.fetched = true;
        state.configs.product.category.fetching = false;
        state.configs.product.category.data = action.payload;
    },
}
