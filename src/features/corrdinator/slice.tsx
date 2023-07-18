import { createSlice } from "@reduxjs/toolkit";
import { StorageCorrdinatorCase } from "./case";
import { corrdinatorState } from "./state";

const CorrdinatorSlice = createSlice({
    name: 'corrdinator',
    initialState: corrdinatorState,
    reducers: {
        ...StorageCorrdinatorCase,
    }
})

//Selector
export const CorrdinatorActions = CorrdinatorSlice.actions;

// Reducer
const CorrdinatorReducer = CorrdinatorSlice.reducer;

export default CorrdinatorReducer;