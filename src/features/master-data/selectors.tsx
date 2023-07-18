import { RootState } from "types";
import { TMasterDataProp } from "types/models/master-data";

export const getMasterData = (state: RootState) => state.masterData;

export const getFetchCondition = (name: TMasterDataProp, prop: string) => (state: RootState) => {
  const store = state.masterData[name];
  
  if ('data' in store) return !store.fetched && store.fetching && !store.started;
  if ('mounted' in store) return false;
  if (!store[prop]) return true;

  return !store[prop].fetched && store[prop].fetching && !store[prop].started;
}

export const registerMounted = (state: RootState) => {
  return state.masterData.register.mounted;
}