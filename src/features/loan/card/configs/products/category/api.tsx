import { API_LOAN_CARD_CONFIG_PRODUCT_CATEGORY } from "features/loan/card/APIPaths";
import { ILOANCardProductCategory } from "types/models/loan/card/configs/Product";
import { apiGet } from "utils/api";

export const fetchCategoryCard = () => {
  return apiGet<ILOANCardProductCategory[]>(API_LOAN_CARD_CONFIG_PRODUCT_CATEGORY);
}