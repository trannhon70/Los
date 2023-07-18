import { Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  ICorrdinatorDocumentList,
  ICorrdinatorQueryFillter,
  ICorrdinatorState,
  IUserApprove
} from "types/models/corrdinator";

export enum ECorrdinator{
  LOAN = "LOAN",
  CREDIT = "CREDIT"
}

export enum ESortFillter{
  ASC = "ASC",
  DESC = "DESC"
}

export const CorrdinatorProfileStoredCase = {

  fetchCorrdinatorList(state: Draft<ICorrdinatorState>, action: PayloadAction<Partial<ICorrdinatorQueryFillter>>){
    state.profile.fetched = true;
    state.profile.fetching = true;

    if (action.payload.document_type === ECorrdinator.LOAN){
      action.payload.page && (state.profile.LOAN.page = action.payload.page);
      action.payload.limit && (state.profile.LOAN.limit = action.payload.limit);
    }

    if (action.payload.document_type === ECorrdinator.CREDIT){
      action.payload.page && (state.profile.CREDIT.page = action.payload.page);
      action.payload.limit && (state.profile.CREDIT.limit = action.payload.limit);
    }
  },

  fetchCorrdinatorListDone: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        ICorrdinatorDocumentList[], 
        string, 
        Partial<ICorrdinatorQueryFillter>
      >
    ){
      state.profile.fetched = true;
      state.profile.fetching = false;

      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.data = action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        });
        action.meta.total_page && (state.profile.LOAN.total_page = action.meta.total_page);

      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.data = action.payload;
        action.meta.total_page && (state.profile.CREDIT.total_page = action.meta.total_page);
      }
    },
    prepare(payload: ICorrdinatorDocumentList[], paging: Partial<ICorrdinatorQueryFillter>){
      return { payload,  meta: paging };
    }
  },

  updateDataFullStored: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        ICorrdinatorDocumentList[], 
        string, 
        Partial<ICorrdinatorQueryFillter>
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.full.data.profile.LOAN =  action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        }) ?? null;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT && state.full){
        state.full.data.profile.CREDIT =  action.payload.map(d => {
          return {
            ...d,
            isEdit: false
          }
        });
      }
    },
    prepare(payload: ICorrdinatorDocumentList[], paging: Partial<ICorrdinatorQueryFillter>){
      return { payload,  meta: paging };
    }
  },


  updateCorrdinatorListLimit: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        number, 
        string, 
        {
          document_type: string
        }
      >
    ){
      state.profile.fetched = false;
      
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.limit = action.payload;
      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.limit = action.payload;
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

  updateCorrdinatorSearchCustomerName: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        string, 
        string, 
        {
          document_type: string
        }
      >
    ){
      state.profile.fetched = false;
      
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.customer_name = action.payload;
      }
      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.customer_name = action.payload;
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


  updateCorrdinatorListPage: {
    reducer(
      state: Draft<ICorrdinatorState>, 
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

      state.profile.fetched = false;

      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.page = action.payload;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.page = action.payload;
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


  updateCorrdinatorListData: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        ICorrdinatorDocumentList[], 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.data = action.payload;
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.data = action.payload;
      }
    },
    prepare(
      payload: ICorrdinatorDocumentList[], 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },


  updateFidleCorrdinatorListData: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        number | string | null | undefined | boolean, 
        string, 
        {
          key: keyof ICorrdinatorDocumentList,
          document: string,
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.data = state.profile.LOAN.data.map(d => {
          if(d.document === action.meta.document){
            
            if (action.meta.key === "approver" || action.meta.key === "controller_1" || action.meta.key === "controller_2" || action.meta.key === "controller_3"){
              // const empl = state.users.data?.find(e => e.employee_code === action.payload) ?? null;
              // const emplData: IUserApprove | null= empl !== null ? {
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
        key: keyof ICorrdinatorDocumentList,
        document: string,
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  postGrandRole(state: Draft<ICorrdinatorState>, action: PayloadAction<ICorrdinatorDocumentList[]>){},

  updateGranRoleData: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        ICorrdinatorDocumentList[], 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.data = state.profile.LOAN.data.map(d => {
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
        state.profile.CREDIT.data = state.profile.CREDIT.data.map(dc => {
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
      payload: ICorrdinatorDocumentList[], 
      meta: { 
        document_type: string,
      }
    ){
      return { payload,  meta };
    }
  },

  updateDisiableEdit: {
    reducer(
      state: Draft<ICorrdinatorState>, 
      action: PayloadAction<
        boolean, 
        string, 
        {
          document_type: string
        }
      >
    ){
      if (action.meta.document_type === ECorrdinator.LOAN){
        state.profile.LOAN.data = state.profile.LOAN.data.map(d => {
          d.isEdit = action.payload;
          return d;
        });
      }

      if (action.meta.document_type === ECorrdinator.CREDIT){
        state.profile.CREDIT.data = state.profile.CREDIT.data.map(dc => {
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

  refreshData(state: Draft<ICorrdinatorState>, action: PayloadAction<string>){
    if (action.payload === ECorrdinator.LOAN){
      const dataRefest: ICorrdinatorDocumentList[] = state.full.data.profile.LOAN;
      state.profile.LOAN.data = dataRefest;
    }

    if (action.payload === ECorrdinator.CREDIT){
      const dataRefest: ICorrdinatorDocumentList[] = state.full.data.profile.CREDIT;
      state.profile.CREDIT.data = dataRefest;
    }
  }
}