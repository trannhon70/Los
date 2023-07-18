import { API_LOAN_NORMAL_CONFIG_PARTNER_CODE } from "features/loan/normal/APIPaths"
import { ILOANNormalPartnerCode } from "types/models/loan/normal/configs/Product"
import { formatPath } from "utils"
import { apiGet } from "utils/api"

export const fetchPartnerCode = (id: string) => {
  return apiGet<ILOANNormalPartnerCode[]>(
    formatPath(API_LOAN_NORMAL_CONFIG_PARTNER_CODE, id)
  )
}