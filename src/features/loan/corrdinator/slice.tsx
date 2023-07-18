import { createSlice } from "@reduxjs/toolkit";
import { StorageCorrdinatorLOANCase } from "./case";
import { corrdinatorLOANState } from "./state";

const CorrdinatorLOANSlice = createSlice({
    name: 'corrdinator-loan',
    initialState: corrdinatorLOANState,
    reducers: {
        ...StorageCorrdinatorLOANCase,
        
    }
})

//Selector
export const CorrdinatorLOANActions = CorrdinatorLOANSlice.actions;

// Reducer
const CorrdinatorLOANReducer = CorrdinatorLOANSlice.reducer;

export default CorrdinatorLOANReducer;