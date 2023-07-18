import { IStoreModel } from "types/api";

export const generateStoreModel = <T,>(data: T): IStoreModel<T> => {
  return {
    fetched: false,
    fetching: false,
    started: false,
    data
  }
}