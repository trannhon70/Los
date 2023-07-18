import { API_LOAN_CARD_FULL_DATA } from 'features/loan/card/APIPaths';
import { ILOANCardData } from "types/models/loan/card/storage";
import { formatPath } from "utils"
import { apiGet } from "utils/api"

export const fetchData = (id: string) => {
  return apiGet<ILOANCardData>(
    formatPath(API_LOAN_CARD_FULL_DATA, id)
  )
}