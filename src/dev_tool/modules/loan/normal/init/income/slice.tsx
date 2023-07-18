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
    AUTO_ALL_INCOME: {
      reducer(state, action: PayloadAction<string, string, string>){
        

      },
      prepare(payload: string, meta: string){
        return { payload, meta };
      }
    },
    INIT_LEGAL_fill_step(state, action: PayloadAction<string>){}
  }
});

export const devLOANNormalInitLegalFillAll = LOANNormalSlice.actions.INIT_LEGAL_fill_all;
export const devLOANNormalInitLegalFillSingle = LOANNormalSlice.actions.INIT_LEGAL_fill_single;
export const devLOANNormalInitLegalFillStep = LOANNormalSlice.actions.INIT_LEGAL_fill_step;
export const __start_auto_fill_legal = LOANNormalSlice.actions.__start_auto_fill_legal;
export const AUTO_ALL_INCOME = LOANNormalSlice.actions.AUTO_ALL_INCOME;