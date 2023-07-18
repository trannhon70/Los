import { ILOANNormalProductState } from "types/models/loan/normal/configs/Product";
import { categoryState } from "./category/state";
import { partnerCodeState } from "./partner-code/state";
import { partnerProductState } from "./partner-product/state";

export const productState: ILOANNormalProductState = {
  category: categoryState,
  partnerCode: partnerCodeState,
  partnerProduct: partnerProductState
}