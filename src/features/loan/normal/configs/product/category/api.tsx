import { API_LOAN_NORMAL_CONFIG_PRODUCT_CATEGORY } from "features/loan/normal/APIPaths";
import { ILOANNormalProductCategory } from "types/models/loan/normal/configs/Product";
import { apiGet } from "utils/api";

export const fetchCategory = () => {
  return apiGet<ILOANNormalProductCategory[]>(API_LOAN_NORMAL_CONFIG_PRODUCT_CATEGORY);
}