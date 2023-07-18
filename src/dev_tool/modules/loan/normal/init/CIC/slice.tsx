import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LOANNormalSlice = createSlice({
  name: '@@dev/tool/loan/normal',
  initialState: {},
  reducers: {
    __start_auto_fill_legal(){},
    INIT_LEGAL_fill_all(){},
    INIT_LEGAL_fill_single: {
      reducer(state, action: PayloadAction<string, string, boolean>){},
      prepare(payload: string, meta: boolean){
        return { payload, meta };
      }
    },
    INIT_LEGAL_fill_step(state, action: PayloadAction<string>){},
    AUTOFILLCIC: {
      reducer(state, action: PayloadAction<string, string,  { organ: string, position: string }>){
        

      },
      prepare(payload: string, meta:  { organ: string, position: string }){
        return { payload, meta };
      }
    },
  }
});

export const devLOANNormalInitLegalFillAll = LOANNormalSlice.actions.INIT_LEGAL_fill_all;
export const devLOANNormalInitLegalFillSingle = LOANNormalSlice.actions.INIT_LEGAL_fill_single;
export const devLOANNormalInitLegalFillStep = LOANNormalSlice.actions.INIT_LEGAL_fill_step;
export const __start_auto_fill_legal = LOANNormalSlice.actions.__start_auto_fill_legal;
export const AUTOFILLCIC = LOANNormalSlice.actions.AUTOFILLCIC;