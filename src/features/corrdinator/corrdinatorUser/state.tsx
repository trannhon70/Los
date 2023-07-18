import { ICorrdinatorUserS2State } from "types/models/corrdinator/user"

export const corrdinatorUserState: ICorrdinatorUserS2State = {
  fetched: false,
  fetching: false,
  limit: 10,
  total_page: 0,
  order_by: 'desc',
  page: 1,
  is_same_branch: false,
  data: [],
}