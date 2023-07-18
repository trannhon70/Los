import { RootState } from "types";
import { ECorrdinator } from "./case";

export const getStoredCorrdinatorLOAN = (state: RootState) => state.corrdinatorLOAN;

export const corrdinatorLOANFetched = 
  (state: RootState) => state.corrdinatorLOAN.document.fetched;

export const corrdinatorLOANFetching = 
  (state: RootState) => state.corrdinatorLOAN.document.fetching;

export const getLOANCorrdinatorLOANList = (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN.data;
  }
  else if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT.data;
  }
  else{
    return [];
  }
}

export const corrdinatorLOANPage = (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN.page;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT.page;
  }
}

export const corrdinatorLOANTotalPage= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN.total_page;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT.total_page;
  }
}

export const corrdinatorLOANLimit= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN.limit;
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT.limit;
  }
}


export const corrdinatorLOANOrderBy= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN?.order_by ?? "";
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT?.order_by ?? "";
  }
}

export const corrdinatorLOANLOSID= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN?.los_id ?? "";
  }
  if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT?.los_id ?? "";
  }
}



export const corrdinatorLOANCustomerName= (documentType: string) => (state: RootState) =>{
  if(documentType === ECorrdinator.LOAN){
    return state.corrdinatorLOAN.document.LOAN?.customer_name ?? "";
  } else if (documentType === ECorrdinator.CREDIT){
    return state.corrdinatorLOAN.document.CREDIT?.customer_name ?? "";
  }
  else {
    return "";
  }
}




