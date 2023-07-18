import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { IMasterData, TMasterDataProp, TMasterSplitData } from "types/models/master-data";

export const RootCase = {
  register: {
    reducer(
      _state: Draft<IMasterData>,
      _action: PayloadAction<TMasterDataProp | '@all', string, { param?: string; exclude?: (keyof IMasterData)[]; }>
    ){},
    prepare(payload: TMasterDataProp | '@all', meta: {
      param?: string;
      exclude?: (keyof IMasterData)[];
    }){
      return { payload, meta };
    }
  },
  registerMounted(state: Draft<IMasterData>){
    state.register.mounted = true;
  },
  // removeRegister(state: Draft<IMasterData>, action: PayloadAction<string>){
  //   state.register = state.register.filter(r => r.key !== action.payload);
  // },
  // clearRegister(state: Draft<IMasterData>){
  //   state.register = [];
  // },
  registerFetching: {
    reducer<T extends TMasterDataProp>(state: Draft<IMasterData>, action: PayloadAction<T, string, string>){
      const { payload, meta } = action;
      if ('data' in state[payload]){
        state[payload].fetching = true;
      }
      else if (meta){
        (state[payload] as TMasterSplitData<T>) = { ...state[payload], [meta]: {
            ...(state[payload]  as TMasterSplitData<T>)[meta],
            fetched: false,
            fetching: true,
            started: false
          }
        }
      }
    },
    prepare(payload: TMasterDataProp, meta: string){
      return { payload, meta };
    }
  },
  registerPassedFetch: {
    reducer<T extends TMasterDataProp>(state: Draft<IMasterData>, action: PayloadAction<T, string, string>){
      const { payload, meta } = action;
      if ('data' in state[payload]){
        state[payload].started = true;
      }
      else if (meta){
        (state[payload] as TMasterSplitData<T>) = { ...state[payload], [meta]: {
            ...(state[payload]  as TMasterSplitData<T>)[meta],
            fetched: false,
            fetching: true,
            started: true
          }
        }
      }
    },
    prepare(payload: TMasterDataProp, meta: string){
      return { payload, meta };
    }
  },
  registerDone: {
    reducer<T extends TMasterDataProp>(
      state: Draft<IMasterData>,
      action: PayloadAction<TMasterSplitData<T>[], string, { name: T, code: string }>
    ){
      const { payload, meta: { name, code } } = action;
      if ('data' in state[name]){
        state[name].fetched = true;
        state[name].fetching = false;
        state[name].started = false;
        (state[name].data as TMasterSplitData<T>[]) = payload;
      }
      else{
        (state[name] as TMasterSplitData<T>) = {
          ...state[name],
          [code]: {
            fetched: true,
            fetching: false,
            started: false,
            data: payload
          },
        }
      }
    },
    prepare<T extends TMasterDataProp>(payload: TMasterSplitData<T>[], meta: { name: T, code: string }){
      return { payload, meta }
    }
  }
}