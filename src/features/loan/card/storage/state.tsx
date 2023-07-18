import { ILOANCardStorageState } from "types/models/loan/card/storage";
import { legalCardState } from "./legal/state";
import { productsState } from "./products/state";

export const storageState: ILOANCardStorageState = {
  full: {
    fetched: false,
    fetching: false,
    starting: false,
    data: null,
    los_uuid:''
  },
  product: productsState,
  legal: legalCardState,
}
