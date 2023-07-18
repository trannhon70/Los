import { ICorrdinatorProfileState } from "types/models/corrdinator";

export const corrdinatorProfileState: ICorrdinatorProfileState = {
  fetched: false,
  fetching: false,
  LOAN: {
    data: [],
    page: 1,
    limit: 50,
    total_page: 0,
    order_by: 'desc'
  },
  CREDIT: {
    data: [],
    page: 1,
    limit: 10,
    total_page: 0,
    order_by: 'desc'
  }
}