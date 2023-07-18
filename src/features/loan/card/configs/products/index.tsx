import { ILOANCardProductState } from "types/models/loan/card/configs/Product";
import { categoryState } from "./category/state";
import { partnerCodeState } from "./partner-code/state";
import { partnerProductState } from "./partner-product/state";

export const productState: ILOANCardProductState = {
  category: categoryState,
  partnerCode: partnerCodeState,
  partnerProduct: partnerProductState
}