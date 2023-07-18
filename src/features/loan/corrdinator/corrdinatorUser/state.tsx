import { ICorrdinatorUserState } from "types/models/corrdinator/user"

export const corrdinatorLOANUserState: ICorrdinatorUserState = {
  fetched: false,
  fetching: false,
  limit: 10,
  total_page: 0,
  order_by: 'desc',
  
  is_same_branch: false,
  page: 1,
  data: [],
  dataCorr:[] // waiting api prams
}