import {
    Draft,
    PayloadAction
} from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { IInternalCreditRating, IResultInternalCreditRating } from "types/models/loan/normal/storageApproval/InternalCreditRating";
import { IApprovalLevel } from './../../../../../types/models/loan/normal/storageApproval/InternalCreditRating';

export const ICRApprovalCase = {
    saveLOANApprovalICR(state:Draft<ILOANNormalState>,action:PayloadAction<string>){},
    updateApiStorageApprovalICR(state:Draft<ILOANNormalState>,action:PayloadAction<IInternalCreditRating>){
        state.storageApproval.icr = {
            ...state.storageApproval.icr,
            document_info_list : action.payload.document_info_list,
            result_internal_credit_rating : action.payload.result_internal_credit_rating 
        }
    },
    clearStorageApprovalICR(state: Draft<ILOANNormalState>){
        state.storageApproval.icr.result_internal_credit_rating = null
        state.storage.icr.data.data = {
            ...state.storage.icr.data.data,
            business_employee:{
                score: 0,
                ranking: "",
                approval_date: "",
                description: "",
                uuid: null,
              },
              approval_level:{
                score: 0,
                ranking: "",
                approval_date: "", 
                description: "",
                uuid: null,
              },
              risk_management:{
                score: 0,
                ranking: "",
                approval_date: "",
                description: "",
                uuid: null,
              },
              document_info_list: []
        }
    },
    setApprovalICR:{
        reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string| number, string, 
            {key:keyof IApprovalLevel ; gr:keyof IResultInternalCreditRating}>) {
                if(state.storageApproval.icr.result_internal_credit_rating){
                    switch(action.meta.gr){
                        case 'business_employee':
                            state.storageApproval.icr.result_internal_credit_rating.business_employee = {
                                ...state.storageApproval.icr.result_internal_credit_rating.business_employee,[action.meta.key]:action.payload
                            }
                            break
                        case 'approval_level':
                            state.storageApproval.icr.result_internal_credit_rating.approval_level = {
                                ...state.storageApproval.icr.result_internal_credit_rating.approval_level,[action.meta.key]:action.payload
                            }
                            break
                        case 'risk_management':
                            state.storageApproval.icr.result_internal_credit_rating.risk_management = {
                                ...state.storageApproval.icr.result_internal_credit_rating.risk_management,[action.meta.key]:action.payload
                            }
                            break 
                    }
                }

        },
        prepare(payload: string | number, meta: {key:keyof IApprovalLevel; gr:keyof IResultInternalCreditRating},) {
            return { payload, meta };
        }
    },
}