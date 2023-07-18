import { ILOANNormalStorageCustomerState } from "types/models/loan/normal/storage/Customer";

export const customerState: ILOANNormalStorageCustomerState = {
  discussions: [], 
  query: {
    page: 1,
    size: 10,
    sort: "created_at(desc)"
  },
  fetched: false,
  fetching: false,
};
