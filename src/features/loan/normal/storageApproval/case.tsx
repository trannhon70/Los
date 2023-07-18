import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from 'types/models/loan/normal';
import { ILOANApprovalData } from "types/models/loan/normal/storageApproval";
import { CICCase } from "./cic/case";

import { otherApprovalCase } from './Other/case';
import { ICRApprovalCase } from './icr/case';
import {incomeCase} from './income/case';
import { ApprovalLOANCase } from "./loan/case";
import { CollateralApproveCaseV2 } from "./collateral/case";
import { AdditionalCase } from "./additionalApproval/case";
import { DedupeApproveCaseV2 } from "./dedupe/case";
export const StorageApprovalCase = {
    ...otherApprovalCase,
    ...ICRApprovalCase,
    ...CICCase,
    ...incomeCase,
    ...ApprovalLOANCase,
    ...CollateralApproveCaseV2,
    ...DedupeApproveCaseV2,
    ...AdditionalCase,
    setLOANNormalApprovalStorageData(
        state: Draft<ILOANNormalState>,
        action: PayloadAction<ILOANApprovalData | null>
    ) {
        state.storageApproval.full.data = action.payload;
        state.storageApproval.full.fetching = false;
        state.storageApproval.full.starting = false;
        state.storageApproval.full.fetched = true;
    },
    clearStorageApprovalFullData(state: Draft<ILOANNormalState>){
        state.storageApproval.full.fetched = false
        state.storageApproval.full.fetching = false
        state.storageApproval.full.starting = false
        state.storageApproval.full.data = null
    },
    fetchApprovalFullDocument(state: Draft<ILOANNormalState>, action: PayloadAction<string>){},
    fetchApprovalSourceIncome(state: Draft<ILOANNormalState>, action: PayloadAction<string>){},

}