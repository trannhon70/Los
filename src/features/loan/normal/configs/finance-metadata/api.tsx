import { apiGet } from "utils/api"
import { API_LOAN_NORMAL_CONFIG_FINANCE_METADATA } from "features/loan/normal/APIPaths";
import { IFinanceMetadata } from "types/models/loan/normal/configs/FinanceMetadata";

export const fetchFinanceMetadata = () => {
  return apiGet<IFinanceMetadata[]>(API_LOAN_NORMAL_CONFIG_FINANCE_METADATA);
}