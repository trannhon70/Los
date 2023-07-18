import { Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  ICorrdinatorLOANDocumentList,
  ICorrdinatorLOANQueryFillter,
  ICorrdinatorLOANState,
  ILOANUserApprove
} from "types/models/loan/corrdinator";

export enum ECorrdinator{
  LOAN = "LOAN",
  CREDIT = "CREDIT"
}

export enum ESortFillter{
  ASC = "ASC",
  DESC = "DESC"
}

export const CorrdinatorProfileStoredCase = {

  fetchCorrdinatorLOANList(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<Partial<ICorrdinatorLOANQueryFillter>>){
    state.document.fetched = true;
    state.document.fetching = true;

    if (action.payload.document_type === ECorrdinator.LOAN){
      action.payload.page && (state.document.LOAN.page = action.payload.page);
      action.payload.limit && (state.document.LOAN.limit = action.payload.limit);
    }

    if (action.payload.document_type === ECorrdinator.CREDIT){
      action.payload.page && (state.document.CREDIT.page = action.payload.page);
      action.payload.limit && (state.document.CREDIT.limit = action.payload.limit);
    }
  },

  fetchCorrdinatorLOANListDone: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        ICorrdinatorLOANDocumentList[], 
        string, 
        Partial<ICorrdinatorLOANQueryFillter>
      >
    ){
      state.document.fetched = true;
      state.document.fetching = false;

      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.data = action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        });
        action.meta.total_page && (state.document.LOAN.total_page = action.meta.total_page);

      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.data = action.payload;
        action.meta.total_page && (state.document.CREDIT.total_page = action.meta.total_page);
      }
    },
    prepare(payload: ICorrdinatorLOANDocumentList[], paging: Partial<ICorrdinatorLOANQueryFillter>){
      return { payload,  meta: paging };
    }
  },

  updateDataFullLOANStored: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        ICorrdinatorLOANDocumentList[], 
        string, 
        Partial<ICorrdinatorLOANQueryFillter>
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.full.data.document.LOAN =  action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        }) ?? null;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT && state.full){
        state.full.data.document.CREDIT =  action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        });
      }
    },
    prepare(payload: ICorrdinatorLOANDocumentList[], paging: Partial<ICorrdinatorLOANQueryFillter>){
      return { payload,  meta: paging };
    }
  },


  updateCorrdinatorLOANListLimit: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        number, 
        string, 
        {
          document_type: string
        }
      >
    ){
      state.document.fetched = false;
      
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.limit = action.payload;
      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.limit = action.payload;
      }
    },
    prepare(
      payload: number, 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  updateCorrdinatorLOANSearchCustomerName: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        string, 
        string, 
        {
          document_type: string
        }
      >
    ){
      state.document.fetched = false;
      
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.los_id = action.payload;
      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.los_id = action.payload;
      }
    },
    prepare(
      payload: string, 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },


  updateCorrdinatorLOANListPage: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        number, 
        string, 
        {
          document_type: string
        }
      >
    ){
      if(action.payload <= 0){
        return;
      }

      state.document.fetched = false;

      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.page = action.payload;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.page = action.payload;
      }
    },
    prepare(
      payload: number, 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },


  updateCorrdinatorLOANListData: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        ICorrdinatorLOANDocumentList[], 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.data = action.payload;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.data = action.payload;
      }
    },
    prepare(
      payload: ICorrdinatorLOANDocumentList[], 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },


  updateFidleCorrdinatorLOANListData: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        number | string | null | undefined | boolean, 
        string, 
        {
          key: keyof ICorrdinatorLOANDocumentList,
          document: string,
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.data = state.document.LOAN.data.map(d => {
          if(d.document === action.meta.document){
            if (action.meta.key === "approver" || action.meta.key === "controller_1" || action.meta.key === "controller_2" || action.meta.key === "controller_3"){
              // const empl = state.users.data.find(e => e.employee_code === action.payload) ?? null;
              // const emplData: ILOANUserApprove | null= empl !== null ? {
              //   branch_department: empl?.branch_department,
              //   employee_code: empl?.employee_code,
              //   employee_id: empl?.employee_id,
              //   employee_name: empl?.employee_name,
              //   is_active: empl?.is_active,
              //   position: empl?.position,
              //   title: empl?.title,
              //   username: empl?.username,
              // } : null;
             
              return {
                ...d,
              }
            }
            else{
              return {
                ...d,
                [action.meta.key]: action.payload
              }
            }
          }
          return d;
        })
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
      }
    },
    prepare(
      payload: number | string | null | undefined | boolean, 
      meta: { 
        key: keyof ICorrdinatorLOANDocumentList,
        document: string,
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  postLOANGrandRole(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<string>){},

  updateLOANGranRoleData: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        ICorrdinatorLOANDocumentList[], 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.data = state.document.LOAN.data.map(d => {
          let isExist = action.payload.find(pl => pl.document === d.document);
          if(isExist){
            d = {
              ...isExist,
              isEdit: false
            }
          }
          return d;
        });
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.data = state.document.CREDIT.data.map(dc => {
          let isExist = action.payload.find(pl => pl.document === dc.document);
          if(isExist){
            dc = {
              ...isExist,
              isEdit: false
            }
          }
          return dc
        });
      }
    },
    prepare(
      payload: ICorrdinatorLOANDocumentList[], 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  updateLOANDisiableEdit: {
    reducer(
      state: Draft<ICorrdinatorLOANState>, 
      action: PayloadAction<
        boolean, 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.document.LOAN.data = state.document.LOAN.data.map(d => {
          d.isEdit = action.payload;
          return d;
        });
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.document.CREDIT.data = state.document.CREDIT.data.map(dc => {
          dc.isEdit = action.payload;
          return dc
        });
      }
    },
    prepare(
      payload: boolean, 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  refreshDataLOAN(state: Draft<ICorrdinatorLOANState>, action: PayloadAction<string>){
    if (action.payload === ECorrdinator.LOAN){
      const dataRefest: ICorrdinatorLOANDocumentList[] = state.full.data.document.LOAN;
      state.document.LOAN.data = dataRefest;
    }

    if (action.payload === ECorrdinator.CREDIT){
      const dataRefest: ICorrdinatorLOANDocumentList[] = state.full.data.document.CREDIT;
      state.document.CREDIT.data = dataRefest;
    }
  }
}