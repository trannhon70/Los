import { API_LOAN_CARD_CONFIG_PARTNER_PRODUCT } from "features/loan/card/APIPaths"
import { ILOANNormalPartnerProduct } from "types/models/loan/normal/configs/Product"
import { formatPath } from "utils"
import { apiGet } from "utils/api"

export const fetchPartnerProduct = (id: string) => {
  return apiGet<ILOANNormalPartnerProduct[]>(
    formatPath(API_LOAN_CARD_CONFIG_PARTNER_PRODUCT, id)
  )
}