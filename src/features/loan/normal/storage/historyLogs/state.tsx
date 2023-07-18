import { ILOANNormalStorageHistoryState } from "types/models/loan/normal/storage/Logs";


export const historyLogState: ILOANNormalStorageHistoryState = {
  data: {
    list: [],
    total_items: null,
    total_page: null,
    current_page: null,
    warning: []
  },
  error: [],
  query:{
    uuid:"",
    page: 1,
    size: 10,
    sort: "created_at(desc)"
  },
  fetched: false,
  fetching: false,
}
