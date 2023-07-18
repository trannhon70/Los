// import { ILOANCardState } from "types/models/loan/card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILOANCardState } from "types/models/loan/card";
import { configState } from "./configs";
import { ConfigCase } from "./configs/case";
import StorageCase from "./storage/case";
import { storageState } from "./storage/state";

const initialState: ILOANCardState = {
    configs: configState,
    storage: storageState,
}

const CardSlice = createSlice({
    name: 'loan/card',
    initialState,
    reducers: {
        ...ConfigCase,
        ...StorageCase,
        fetchData(state, action: PayloadAction<string>) {
            state.storage.full.fetching = true;
        },
        startFetchData(state) {
            state.storage.full.starting = true;
        },
        fetchDataDone(state) {
            state.storage.full.fetching = false;
            state.storage.full.starting = false;
            state.storage.full.fetched = true;
        },
    }
})


//Selector
export const LOANCardActions = CardSlice.actions;
// Reducer
const LOANCardReducer = CardSlice.reducer;

export default LOANCardReducer;