import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import { ICustomerGroupActivity } from "types/models/loan/normal/storage/Customer";
import { timestampToDate } from "utils/date";
import { generateEmptyCustomerState } from "./generateEmptyCustomerData";
export const CustomerCase = {

  updateStorageCustomerData(state: Draft<ILOANNormalState>, action: PayloadAction<ICustomerGroupActivity[]>) {
    let DayList : string[] = []
    
   action.payload?.forEach(e => {
     const day = timestampToDate(e.created_at)
      if(!DayList.includes(day)){
        DayList.push(day)
      }
   })
   
    const newData = DayList.map(day => ({
      date: day,
      activities: [...action.payload.filter(activity => (timestampToDate(activity.created_at) === day))]
    }))
   
    state.storage.customer.discussions = [...newData]
    
  },

  fetchCustomerData(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    // state.storage.Customer.isLoadDonePdf = false;
  },

  clearCustomerStoreData(state: Draft<ILOANNormalState>){
    state.storage.customer = {...generateEmptyCustomerState()}
  },

  postCustomerComment(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    
  },
  updateCustomerQuery(state: Draft<ILOANNormalState>) {
    state.storage.customer.query = {
      ...state.storage.customer.query,
      size: state.storage.customer.query.size + 5
      }
  },
  fetchMoreCustomerData(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},
  
  startFetchCustomerData(state: Draft<ILOANNormalState>) {
    state.storage.customer.fetching = true;
  },
  fetchCustomerDataSuccess(state: Draft<ILOANNormalState>) {
    state.storage.customer.fetched = true
    state.storage.customer.fetching = false;
  },
  
}